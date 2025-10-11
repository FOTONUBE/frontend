// services/file.action.ts
import claraApi from "@/lib/axios";

export type UploadFileResult =
  | { success: true; url: string }
  | { success: false; error: string };

export const uploadFile = async (file: File): Promise<UploadFileResult> => {
  try {
    const formData = new FormData();
    formData.append("file", file);

    const { data } = await claraApi.post("/files/upload", formData);
    return { success: true, url: data.url };
  } catch (error: any) {
    console.error("Error en uploadFile:", error?.response?.data || error);
    return {
      success: false,
      error:
        error?.response?.data?.message ||
        error?.message ||
        "Error al subir el archivo",
    };
  }
};
