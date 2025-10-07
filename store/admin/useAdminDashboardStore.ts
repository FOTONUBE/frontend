import { create } from "zustand";
import { toast } from "sonner";
import { AdminDashboardStats } from "@/interfaces/admin/admin-get-dashboard.interface";
import { adminGetDashboardStats } from "@/actions/admin/dashboard/admin-dashboard.action";

interface AdminDashboardState {
  loading: boolean;
  error?: string;
  stats?: AdminDashboardStats;

  fetchStats: () => Promise<void>;
}

export const useAdminDashboardStore = create<AdminDashboardState>((set) => ({
  loading: true,
  error: undefined,
  stats: undefined,

  fetchStats: async () => {
    set({ loading: true, error: undefined });
    try {
      const result = await adminGetDashboardStats();
      if (!result.success) throw new Error(result.error);

      set({ stats: result.data, loading: false });
    } catch (err: any) {
      set({ loading: false, error: err.message });
      toast.error(err.message || "Error al cargar las estadísticas ❌");
    }
  },
}));
