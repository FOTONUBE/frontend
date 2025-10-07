// store/admin/useAdminOrdersStore.ts
import { create } from "zustand";

import {
  adminGetOrderById,
  adminGetOrders,
  adminGetOrderStats,
} from "@/actions/admin/orders/admin-get-orders.action";
import { AdminOrder } from "@/interfaces/admin/admin-get-orders.interface";
import { AdminOrderID } from "@/interfaces/admin/admin-get-order-by-ID.interface";

interface AdminOrdersState {
  orders: AdminOrder[];
  currentOrder: AdminOrderID | null; // nueva propiedad
  stats: any;
  total: number;
  page: number;
  limit: number;
  loading: boolean;
  error?: string;

  fetchOrders: (params?: {
    status?: string;
    photographer?: string;
    clientId?: string;
    page?: number;
    limit?: number;
  }) => Promise<void>;
  fetchStats: () => Promise<void>;
  fetchOrderById: (id: string) => Promise<void>; // ya no devuelve nada, solo setea
}

export const useAdminOrdersStore = create<AdminOrdersState>((set) => ({
  orders: [],
  currentOrder: null,
  stats: null,
  total: 0,
  page: 1,
  limit: 10,
  loading: true,
  error: undefined,

  fetchOrders: async (params) => {
    set({ loading: true, error: undefined });
    const res = await adminGetOrders(params);
    if (res.success) {
      set({
        orders: res.data?.orders ?? [],
        total: res.data?.total ?? 0,
        page: res.data?.page ?? 1,
        limit: res.data?.limit ?? 10,
        loading: false,
      });
    } else {
      set({ error: res.error, loading: false });
    }
  },

  fetchStats: async () => {
    set({ loading: true, error: undefined });
    const res = await adminGetOrderStats();
    if (res.success) {
      set({ stats: res.data, loading: false });
    } else {
      set({ error: res.error, loading: false });
    }
  },

  fetchOrderById: async (id: string) => {
    set({ loading: true, error: undefined, currentOrder: null });
    const res = await adminGetOrderById(id);
    if (res.success && res.data) {
      set({ currentOrder: res.data, loading: false });
    } else if (res.success && !res.data) {
      set({ error: "Orden no encontrada", loading: false });
    } else {
      set({ error: res.error, loading: false });
    }
  },
}));
