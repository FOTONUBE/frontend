import claraApi from "@/lib/axios";

export interface LeadsResponse {
  id: string;
  email: string;
  createdAt: string;
}

export const adminGetNewsletter = async () => {
  try {
    const { data } = await claraApi.get<LeadsResponse[]>("/leads");
    return { success: true, data };
  } catch (error: any) {
    const message =
      error?.response?.data?.message || "Error al obtener los usuarios.";
    return { success: false, error: message };
  }
};
