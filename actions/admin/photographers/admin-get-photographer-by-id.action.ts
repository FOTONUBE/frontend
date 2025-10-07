"use server";

import { AdminPhotographerByIdResponse } from "@/interfaces/admin/admin-get-photographer-by-ID.interface";
import claraApi from "@/lib/axios";

export async function adminGetPhotographerById(
  id: string
): Promise<AdminPhotographerByIdResponse> {
  try {
    const { data } = await claraApi.get<AdminPhotographerByIdResponse>(
      `/admin/photographers/${id}`
    );
    return data;
  } catch (error: any) {
    console.error("❌ Error fetching photographer:", error);
    throw new Error(
      error.response?.data?.message || "Error al obtener fotógrafo"
    );
  }
}
