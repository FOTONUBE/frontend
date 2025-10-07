// store/admin/useAdminPhotographersStore.ts
import { adminGetAlbumById } from "@/actions/admin/album/admin-get-album-by-id.action";
import { adminGetPhotographerById } from "@/actions/admin/photographers/admin-get-photographer-by-id.action";
import { adminGetPhotographers } from "@/actions/admin/photographers/admin-get-photographers.action";
import { AdminAlbumByIdDto } from "@/interfaces/admin/admin-get-album-by-id.dto";
import { AdminPhotographerByIdResponse } from "@/interfaces/admin/admin-get-photographer-by-ID.interface";
import { AdminPhotographer } from "@/interfaces/admin/admin-get-photographer.interface";
import { create } from "zustand";

interface AdminPhotographersState {
  photographers: AdminPhotographer[];
  photographerByID?: AdminPhotographerByIdResponse;
  albumByID?: AdminAlbumByIdDto;
  loading: boolean;
  error?: string;

  fetchPhotographers: () => Promise<void>;
  fetchPhotographerByID: (id: string) => Promise<void>;
  fetchAlbumByID: (id: string) => Promise<void>;
}

export const useAdminPhotographersStore = create<AdminPhotographersState>(
  (set) => ({
    photographers: [],
    photographerByID: undefined,
    albumByID: undefined,
    loading: false,
    error: undefined,

    fetchPhotographers: async () => {
      set({ loading: true, error: undefined });
      const response = await adminGetPhotographers();
      if (response.success) {
        set({ photographers: response.data, loading: false });
      } else {
        set({ error: response.error, loading: false });
      }
    },

    fetchPhotographerByID: async (id: string) => {
      set({ loading: true, error: undefined });
      try {
        const data = await adminGetPhotographerById(id);
        set({ photographerByID: data, loading: false });
      } catch (error: any) {
        set({ error: error.message, loading: false });
      }
    },

    fetchAlbumByID: async (id: string) => {
      set({ loading: true, error: undefined });
      try {
        const album = await adminGetAlbumById(id);
        set({ albumByID: album, loading: false });
      } catch (err: any) {
        set({
          error: err?.response?.data?.message || "Error al cargar álbum",
          loading: false,
        });
      }
    },
  })
);
