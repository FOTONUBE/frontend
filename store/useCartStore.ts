"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";

export type CartItem = {
  cartItemId: string; // id interno (uuid o timestamp)
  photoId: string;
  albumId: string;
  title: string;
  image: string;
  size: string;
  unitPrice: number;
  quantity: number;
};

type CartState = {
  items: CartItem[];
  addItem: (
    payload: Omit<CartItem, "cartItemId"> & { cartItemId?: string }
  ) => void;
  removeItem: (cartItemId: string) => void;
  clearCart: () => void;
  updateQuantity: (cartItemId: string, quantity: number) => void;
  subtotal: () => number;
};

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      addItem: (payload) => {
        const { photoId, size, quantity } = payload;
        // buscar si ya existe el mismo photoId + size
        const existing = get().items.find(
          (i) => i.photoId === photoId && i.size === size
        );

        if (existing) {
          // si existe, actualizamos cantidad
          set({
            items: get().items.map((i) =>
              i.photoId === photoId && i.size === size
                ? { ...i, quantity: i.quantity + quantity }
                : i
            ),
          });
        } else {
          // generar cartItemId (uuid si está disponible)
          const cartItemId =
            payload.cartItemId ||
            (typeof crypto !== "undefined" && "randomUUID" in crypto
              ? (crypto as any).randomUUID()
              : `${photoId}-${size}-${Date.now()}`);

          set({ items: [...get().items, { ...payload, cartItemId }] });
        }
      },
      removeItem: (cartItemId) =>
        set({ items: get().items.filter((i) => i.cartItemId !== cartItemId) }),
      clearCart: () => set({ items: [] }),
      updateQuantity: (cartItemId, quantity) =>
        set({
          items: get().items.map((i) =>
            i.cartItemId === cartItemId ? { ...i, quantity } : i
          ),
        }),
      subtotal: () =>
        get().items.reduce((acc, i) => acc + i.unitPrice * i.quantity, 0),
    }),
    { name: "cart-storage" }
  )
);
