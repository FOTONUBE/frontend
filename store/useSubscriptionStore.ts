import { create } from "zustand";
import { toast } from "sonner";
import claraApi from "@/lib/axios";
import {
  SubscriptionPlan,
  ActiveSubscription,
  SubscriptionOrder,
} from "@/interfaces/subscription/subscription.interface";

interface SubscriptionState {
  plans: SubscriptionPlan[];
  activeSubscription?: ActiveSubscription;
  orders: SubscriptionOrder[];
  loading: boolean;
  error?: string;

  loadPlans: () => Promise<void>;
  loadActiveSubscription: () => Promise<void>;
  loadOrders: () => Promise<void>;
  createOrder: (planId: string) => Promise<SubscriptionOrder | null>;
  payOrder: (orderId: string) => Promise<void>;
}

export const useSubscriptionStore = create<SubscriptionState>((set, get) => ({
  plans: [],
  activeSubscription: undefined,
  orders: [],
  loading: false,
  error: undefined,

  loadPlans: async () => {
    set({ loading: true, error: undefined });
    try {
      const { data } = await claraApi.get("/subscriptions/plans");
      set({ plans: data, loading: false });
    } catch (err: any) {
      set({
        error: err?.response?.data?.message || "Error al cargar planes",
        loading: false,
      });
      toast.error("Error al cargar planes ❌");
    }
  },

  loadActiveSubscription: async () => {
    set({ loading: true, error: undefined });
    try {
      const { data } = await claraApi.get("/subscriptions/me");
      set({ activeSubscription: data, loading: false });
    } catch (err: any) {
      set({
        error: err?.response?.data?.message || "Error al cargar suscripción",
        loading: false,
      });
      toast.error("Error al cargar suscripción ❌");
    }
  },

  loadOrders: async () => {
    set({ loading: true, error: undefined });
    try {
      const { data } = await claraApi.get("/subscriptions/orders");
      set({ orders: data, loading: false });
    } catch (err: any) {
      set({
        error: err?.response?.data?.message || "Error al cargar órdenes",
        loading: false,
      });
      toast.error("Error al cargar órdenes ❌");
    }
  },

  createOrder: async (planId: string) => {
    set({ loading: true, error: undefined });
    try {
      const { data } = await claraApi.post("/subscriptions/orders", { planId });
      set((state) => ({ orders: [data, ...state.orders], loading: false }));
      toast.success("Orden creada ✅");
      return data;
    } catch (err: any) {
      set({
        error: err?.response?.data?.message || "Error al crear orden",
        loading: false,
      });
      toast.error("Error al crear orden ❌");
      return null;
    }
  },

  payOrder: async (orderId: string) => {
    set({ loading: true, error: undefined });
    try {
      const { data } = await claraApi.post(
        `/subscriptions/orders/${orderId}/pay`
      );
      // Redirigir al checkout de MercadoPago
      window.location.href = data.init_point;
    } catch (err: any) {
      set({
        error: err?.response?.data?.message || "Error al generar pago",
        loading: false,
      });
      toast.error("Error al generar pago ❌");
    } finally {
      set({ loading: false });
    }
  },
}));
