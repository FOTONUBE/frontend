import { AdminDashboardStats } from "@/interfaces/admin/admin-get-dashboard.interface";
import claraApi from "@/lib/axios";

export const adminGetDashboardStats = async () => {
  try {
    const { data } = await claraApi.get<AdminDashboardStats>("/admin/stats");
    return { success: true, data };
  } catch (error: any) {
    const message =
      error?.response?.data?.message ||
      "Error al obtener estadísticas del dashboard.";
    return { success: false, error: message };
  }
};
