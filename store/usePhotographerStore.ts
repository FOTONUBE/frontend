import { toast } from "sonner";
import { create } from "zustand";

import {
  fetchPhotographerOrderById,
  fetchPhotographerOrders,
  fetchPhotographerOrdersByAlbum,
  PhotographerOrdersResult,
} from "@/actions/order/photographer-order.action";
import { PhotographerOrder } from "@/interfaces/order/order-photographer.interface";
import { updateDeliveryStatus } from "@/actions/order/update-delivery-status.action";

interface PhotographerState {
  loading: boolean;
  error?: string;
  orders: PhotographerOrder[];
  currentOrder?: PhotographerOrder | null;

  // Órdenes
  loadPhotographerOrders: () => Promise<void>;
  loadOrdersByAlbum: (albumId: string) => Promise<void>;
  loadOrderById: (orderId: string) => Promise<void>;
  updateCurrentOrderDeliveryStatus: (
    deliveryStatus: "pending" | "in_progress" | "delivered"
  ) => Promise<void>;
}

export const usePhotographerStore = create<PhotographerState>((set, get) => ({
  loading: true,
  error: undefined,
  orders: [],
  currentOrder: null,

  // 🔹 Todas las órdenes del fotógrafo
  loadPhotographerOrders: async () => {
    set({ loading: true, error: undefined });

    const result: PhotographerOrdersResult = await fetchPhotographerOrders();

    if (!result.success) {
      set({ loading: false, error: result.error });
      toast.error(result.error || "No se pudieron cargar las órdenes ❌");
      return;
    }

    set({ orders: result.data as PhotographerOrder[], loading: false });
  },

  // 🔹 Órdenes de un álbum específico
  loadOrdersByAlbum: async (albumId) => {
    set({ loading: true, error: undefined });

    const result = await fetchPhotographerOrdersByAlbum(albumId);

    if (!result.success) {
      set({ loading: false, error: result.error });
      toast.error(
        result.error || "No se pudieron cargar las órdenes del álbum ❌"
      );
      return;
    }

    set({ orders: result.data as PhotographerOrder[], loading: false });
  },

  // 🔹 Una orden específica
  loadOrderById: async (orderId) => {
    set({ loading: true, error: undefined });

    const result = await fetchPhotographerOrderById(orderId);

    if (!result.success) {
      set({ loading: false, currentOrder: null, error: result.error });
      toast.error(result.error || "No se pudo cargar la orden ❌");
      return;
    }

    set({ currentOrder: result.data as PhotographerOrder, loading: false });
  },

  updateCurrentOrderDeliveryStatus: async (
    deliveryStatus: "pending" | "in_progress" | "delivered"
  ) => {
    const currentOrder = get().currentOrder;
    if (!currentOrder) return;

    const result = await updateDeliveryStatus(currentOrder.id, deliveryStatus);

    if (!result.success) {
      toast.error(
        result.error || "No se pudo actualizar el estado de entrega."
      );
      return;
    }

    set({ currentOrder: result.data });

    await get().loadPhotographerOrders();

    toast.success("Estado de entrega actualizado correctamente ✅");
  },
}));
