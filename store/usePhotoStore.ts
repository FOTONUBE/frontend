import {
  deleteAllPhotosByAlbum,
  deletePhotoById,
  getPhotos,
  uploadMultiplePhotos,
} from "@/actions/photo/photo.action";
import { PhotoResponse } from "@/interfaces/photo/photo.interface";
import { toast } from "sonner";
import { create } from "zustand";

interface PhotoState {
  photos: PhotoResponse[];
  loading: boolean;
  error?: string;

  setPhotos: (photos: PhotoResponse[]) => void;
  fetchPhotos: () => Promise<void>;
  uploadPhotos: (
    files: File[],
    albumId: string,
    totalSizeMb: number
  ) => Promise<void>;
  deletePhoto: (id: string) => Promise<void>;
  deleteAllPhotos: (albumId: string) => Promise<void>;
}

export const usePhotoStore = create<PhotoState>((set, get) => ({
  photos: [],
  loading: false,
  error: undefined,

  setPhotos: (photos) => set({ photos }),

  fetchPhotos: async () => {
    set({ loading: true, error: undefined });
    const result = await getPhotos();

    if (!result.success) {
      set({ error: result.error, loading: false });
      toast.error(result.error || "Error al cargar fotos ❌");
      return;
    }

    set({ photos: result.data, loading: false });
  },

  /*   uploadPhotos: async (files, albumId) => {
    set({ loading: true, error: undefined });

    const uploadPromises = files.map((file) => uploadPhoto(file, albumId));
    const results = await Promise.all(uploadPromises);

    // Filtrar los que fallaron
    const failed = results.find((r) => !r.success);
    if (failed) {
      toast.error(failed.error || "Error al subir fotos ❌");
      return;
    }

    // Todos OK, safe acceder a data
    const uploaded = results.map(
      (r) => (r as { success: true; data: any }).data
    );

    set((state) => ({
      photos: [...state.photos, ...uploaded],
      loading: false,
    }));

    toast.success("Fotos subidas correctamente ✅");
  }, */

  uploadPhotos: async (files, albumId, totalSizeMb) => {
    set({ loading: true, error: undefined });

    const result = await uploadMultiplePhotos(files, albumId, totalSizeMb);

    if (!result.success) {
      toast.error(result.error || "Error al subir fotos ❌");
      set({ loading: false, error: result.error });
      return;
    }

    // TypeScript ahora reconoce todos los campos de PhotoResponse
    set((state) => ({
      photos: [...state.photos, ...result.data],
      loading: false,
    }));

    toast.success("Fotos subidas correctamente ✅");
  },

  deletePhoto: async (id) => {
    set({ loading: true, error: undefined });
    const result = await deletePhotoById(id);

    if (!result.success) {
      set({ error: result.error, loading: false });
      toast.error(result.error || "Error al eliminar foto ❌");
      return;
    }

    set((state) => ({
      photos: state.photos.filter((p) => p.id !== id),
      loading: false,
    }));

    toast.success("Foto eliminada ✅");
  },

  deleteAllPhotos: async (albumId) => {
    const { setPhotos } = get();
    set({ loading: true, error: undefined });

    const result = await deleteAllPhotosByAlbum(albumId); // Llama al endpoint seguro
    if (!result.success) {
      set({ loading: false, error: result.error });
      toast.error(result.error || "Error al eliminar fotos ❌");
      return;
    }

    // Limpiar fotos del store
    setPhotos([]);
    set({ loading: false });
    toast.success("Todas las fotos fueron eliminadas ✅");
  },
}));
