import {
  createAlbum,
  deleteAlbumID,
  findAlbumByID,
  findAlbums,
  updateAlbum,
} from "@/actions/album/album.action";
import { AlbumData } from "@/interfaces/album/create-album.interface";
import { AlbumIDResponse } from "@/interfaces/album/get-album-by-ID.interface";
import { AlbumResponse } from "@/interfaces/album/get-all-album.interface";
import { create } from "zustand";
import { toast } from "sonner";

interface AlbumState {
  albums: AlbumResponse[];
  currentAlbum?: AlbumIDResponse;
  loading: boolean;
  error?: string;

  getAlbums: () => Promise<void>;
  getAlbumById: (id: string) => Promise<void>;
  addAlbum: (album: AlbumData) => Promise<void>;
  updateAlbum: (id: string, payload: Partial<AlbumIDResponse>) => Promise<void>;
  removeAlbum: (id: string) => Promise<void>;
}

export const useAlbumStore = create<AlbumState>((set, get) => ({
  albums: [],
  currentAlbum: undefined,
  loading: true,
  error: undefined,

  getAlbums: async () => {
    set({ loading: true, error: undefined });
    const result = await findAlbums();

    if (!result.success) {
      set({ error: result.error, loading: false });
      toast.error(result.error || "Error al cargar álbumes ❌");
      return;
    }

    set({ albums: result.data, loading: false });
  },

  getAlbumById: async (id: string) => {
    set({ loading: true, error: undefined });
    const result = await findAlbumByID(id);

    if (!result.success) {
      set({ error: result.error, loading: false });
      toast.error(result.error || "Error al cargar álbum ❌");
      return;
    }

    set({ currentAlbum: result.data, loading: false });
  },

  addAlbum: async (album: AlbumData) => {
    set({ loading: true, error: undefined });
    const result = await createAlbum(album);

    if (!result.success) {
      set({ error: result.error, loading: false });
      toast.error(result.error || "Error al crear álbum ❌");
      return;
    }

    set((state) => ({
      albums: [...state.albums, result.data],
      loading: false,
    }));

    toast.success("Álbum creado correctamente ✅");
  },

  updateAlbum: async (id, payload) => {
    set({ loading: true, error: undefined });
    const result = await updateAlbum(id, payload);

    if (!result.success) {
      set({ error: result.error, loading: false });
      toast.error(result.error || "Error al actualizar álbum ❌");
      return;
    }

    await get().getAlbumById(id);

    set({ loading: false });
    toast.success("Álbum actualizado correctamente ✅");
  },

  removeAlbum: async (id: string) => {
    set({ loading: true, error: undefined });
    const result = await deleteAlbumID(id);

    if (!result.success) {
      set({ error: result.error, loading: false });
      toast.error(result.error || "Error al eliminar álbum ❌");
      return;
    }

    await get().getAlbums();
    set({ loading: false });
    toast.success("Álbum eliminado ✅");
  },
}));
