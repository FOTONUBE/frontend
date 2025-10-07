// store/adminLeadsStore.ts
import { create } from "zustand";
import {
  adminGetNewsletter,
  LeadsResponse,
} from "@/actions/admin/newsletter/admin-newsletter.action";

interface AdminLeadsState {
  leads: LeadsResponse[];
  loading: boolean;
  error?: string;
  fetchLeads: () => Promise<void>;
}

export const useAdminLeadsStore = create<AdminLeadsState>((set) => ({
  leads: [],
  loading: true,
  error: undefined,
  fetchLeads: async () => {
    set({ loading: true, error: undefined });
    try {
      const res = await adminGetNewsletter();
      if (!res.success) throw new Error("Error al obtener leads");
      set({ leads: res.data || [], loading: false });
    } catch (err: any) {
      set({ leads: [], loading: false, error: err.message });
    }
  },
}));
