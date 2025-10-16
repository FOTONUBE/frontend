// store/useBuyerStore.ts
import { toast } from "sonner";
import { create } from "zustand";

import {
  accessAlbum,
  accessAlbumId,
} from "@/actions/album-buyer/album-buyer.action";
import { getCurrentUser } from "@/actions/user/user";
import { useAuthStore } from "@/store/useAuthStore";
import { AlbumAccessById } from "@/interfaces/album-access/get-album-access-ID.interface";
import {
  BuyerOrdersResult,
  fetchBuyerOrders,
  createBuyerOrder,
  cancelBuyerOrder,
  fetchBuyerOrderById,
} from "@/actions/order/order.action";
import { Order } from "@/interfaces/order/order.interface";

// Definimos la estructura del store
interface BuyerState {
  loading: boolean;
  error?: string;
  currentAlbum?: AlbumAccessById;
  orders: Order[];
  currentOrder?: Order | null; // orden individual seleccionada

  // álbum
  fetchAlbumAccess: (
    userEvent: string,
    passwordEvent: string
  ) => Promise<boolean>;

  fetchAlbumById: (id: string) => Promise<void>;

  // órdenes
  loadBuyerOrders: () => Promise<void>;
  loadOrderById: (orderId: string) => Promise<void>;
  createOrder: (
    albumId: string,
    items: {
      photoId: string;
      size: string;
      quantity: number;
      unitPrice: number;
    }[]
  ) => Promise<Order | undefined>;
  cancelOrder: (orderId: string) => Promise<void>;
}

export const useBuyerStore = create<BuyerState>((set, get) => ({
  loading: false,
  error: undefined,
  currentAlbum: undefined,
  orders: [],
  currentOrder: null,

  // 🔹 Álbum
  fetchAlbumAccess: async (userEvent, passwordEvent) => {
    set({ loading: true, error: undefined });

    const result = await accessAlbum({ userEvent, passwordEvent });

    if (!result.success) {
      set({ loading: false, error: result.error });
      toast.error(result.error || "No se pudo acceder al álbum ❌");
      return false; // 👈 en lugar de return;
    }

    try {
      const updatedUser = await getCurrentUser();
      useAuthStore.getState().setUserData(updatedUser);
      toast.success("Acceso al álbum concedido ✅");
    } catch (err) {
      console.error(err);
      toast.error("No se pudo actualizar la info del usuario ❌");
    }

    set({ loading: false });
    return true;
  },

  fetchAlbumById: async (id) => {
    set({ loading: true, error: undefined });

    const result = await accessAlbumId(id);

    if (!result.success) {
      set({ loading: false, error: result.error });
      toast.error(result.error || "No se pudo cargar el álbum ❌");
      return;
    }

    set({ currentAlbum: result.data, loading: false });
  },

  // 🔹 Órdenes
  loadBuyerOrders: async () => {
    set({ loading: true, error: undefined });

    const result: BuyerOrdersResult = await fetchBuyerOrders();

    if (!result.success) {
      set({ loading: false, error: result.error });
      toast.error(result.error || "No se pudieron cargar las órdenes ❌");
      return;
    }

    set({ orders: result.data as Order[], loading: false });
  },

  loadOrderById: async (orderId: string) => {
    set({ loading: true, error: undefined });

    const result = await fetchBuyerOrderById(orderId);

    if (!result.success) {
      set({ loading: false, currentOrder: null, error: result.error });
      toast.error(result.error || "No se pudo cargar la orden ❌");
      return;
    }

    set({ currentOrder: result.data as Order, loading: false });
  },

  createOrder: async (albumId, items) => {
    const result = await createBuyerOrder({ albumId, items });

    if (!result.success) {
      toast.error(result.error || "No se pudo crear la orden ❌");
      return undefined;
    }

    set({ currentOrder: result.data as Order });
    toast.success("Orden creada ✅");
    return result.data as Order;
  },

  cancelOrder: async (orderId) => {
    const result = await cancelBuyerOrder(orderId);

    if (!result.success) {
      toast.error(result.error || "No se pudo cancelar la orden ❌");
      return;
    }

    if (get().currentOrder?.id === orderId) {
      set({ currentOrder: null });
    }

    toast.success("Orden cancelada ✅");
  },
}));
