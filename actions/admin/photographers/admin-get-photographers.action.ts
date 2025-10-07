// actions/admin/admin-get-photographers.action.ts
import { AdminPhotographer } from "@/interfaces/admin/admin-get-photographer.interface";
import claraApi from "@/lib/axios";

export const adminGetPhotographers = async () => {
  try {
    const { data } = await claraApi.get<AdminPhotographer[]>(
      "/admin/photographers"
    );
    return { success: true, data };
  } catch (error: any) {
    const message =
      error?.response?.data?.message || "Error al obtener los fotógrafos.";
    return { success: false, error: message };
  }
};
