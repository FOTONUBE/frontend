// src/actions/photo/photo.action.ts
import { PhotoResponse } from "@/interfaces/photo/photo.interface";
import claraApi from "@/lib/axios";

export type PhotoResult =
  | { success: true; data: any }
  | { success: false; error: string };

export const uploadPhoto = async (
  file: File,
  albumId: string
): Promise<PhotoResult> => {
  try {
    const formData = new FormData();
    formData.append("file", file);

    const { data } = await claraApi.post(`/photo/upload/${albumId}`, formData);

    return { success: true, data };
  } catch (error: any) {
    console.error("Error en uploadPhoto:", error);

    let message = "Unexpected error";

    if (error.response?.data?.message) {
      message = error.response.data.message;
    } else if (error.message) {
      message = error.message;
    }

    return { success: false, error: message };
  }
};

export const uploadMultiplePhotos = async (
  files: File[],
  albumId: string,
  totalSizeMb: number
): Promise<PhotoResult> => {
  try {
    const formData = new FormData();
    files.forEach((file) => formData.append("files", file));
    formData.append("totalSizeMb", totalSizeMb.toString());

    const { data } = await claraApi.post(
      `/photo/upload-multiple/${albumId}`,
      formData
    );

    return { success: true, data };
  } catch (error: any) {
    console.error("Error en uploadMultiplePhotos:", error);
    const message =
      error.response?.data?.message || error.message || "Error al subir fotos";
    return { success: false, error: message };
  }
};

export const getPhotos = async (): Promise<PhotoResult> => {
  try {
    const { data } = await claraApi.get<PhotoResponse[]>("/photo");
    return { success: true, data };
  } catch (error: any) {
    const message =
      error?.response?.data?.message || "Error al obtener las fotos.";
    return { success: false, error: message };
  }
};

export const deletePhotoById = async (
  photoId: string
): Promise<PhotoResult> => {
  try {
    const { data } = await claraApi.delete(`/photo/${photoId}`);
    return { success: true, data };
  } catch (error: any) {
    const message =
      error?.response?.data?.message || "Error al eliminar la foto.";
    return { success: false, error: message };
  }
};

export const deleteAllPhotosByAlbum = async (
  albumId: string
): Promise<PhotoResult> => {
  try {
    const { data } = await claraApi.delete(`/photo/album/${albumId}`);
    return { success: true, data };
  } catch (error: any) {
    const message =
      error?.response?.data?.message || "Error al eliminar fotos.";
    return { success: false, error: message };
  }
};
