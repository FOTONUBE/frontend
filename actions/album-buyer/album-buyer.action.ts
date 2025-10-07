import { AlbumAccessById } from "@/interfaces/album-access/get-album-access-ID.interface";
import claraApi from "@/lib/axios";

export type AlbumAccessResult =
  | { success: true; data: AlbumAccessById }
  | { success: false; error: string };

interface AlbumAccessPayload {
  userEvent: string;
  passwordEvent: string;
}

export const accessAlbum = async (
  payload: AlbumAccessPayload
): Promise<AlbumAccessResult> => {
  try {
    const { data } = await claraApi.post("/album-access/grant", payload);

    // data puede tener { success, album }
    if (data.success) {
      return { success: true, data: data.album };
    }

    return { success: false, error: "No se pudo acceder al álbum" };
  } catch (error: any) {
    const message =
      error?.response?.data?.message || "Error al acceder al álbum.";
    return { success: false, error: message };
  }
};

export const accessAlbumId = async (id: string): Promise<AlbumAccessResult> => {
  try {
    const { data } = await claraApi.get(`/album-access/${id}`);

    if (data) {
      return { success: true, data };
    }

    return { success: false, error: "No se pudo acceder al álbum" };
  } catch (error: any) {
    const message =
      error?.response?.data?.message || "Error al acceder al álbum.";
    return { success: false, error: message };
  }
};
