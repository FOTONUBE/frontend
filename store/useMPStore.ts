"use client";

import { create } from "zustand";
import { linkMercadoPago } from "@/actions/mercado-pago/mp.action";

type MpState = {
  status: "idle" | "loading" | "success" | "error";
  linkAccount: (code: string) => Promise<void>;
  clear: () => void;
};

export const useMpStore = create<MpState>((set) => ({
  status: "idle",

  linkAccount: async (code: string) => {
    set({ status: "loading" });
    try {
      const result = await linkMercadoPago(code);

      if (!result.success) throw new Error(result.error);

      set({ status: "success" });
    } catch (error) {
      console.error("❌ Error al vincular MercadoPago:", error);
      set({ status: "error" });
    }
  },

  clear: () => set({ status: "idle" }),
}));
