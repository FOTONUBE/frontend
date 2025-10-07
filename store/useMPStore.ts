// src/stores/mp.store.ts
"use client";

import { create } from "zustand";
import {
  linkMercadoPago,
  MpLinkResponse,
} from "@/actions/mercado-pago/mp.action";

type MpState = {
  data: MpLinkResponse | null;
  status: "idle" | "loading" | "success" | "error";
  linkAccount: (code: string) => Promise<void>;
  clear: () => void;
};

export const useMpStore = create<MpState>((set) => ({
  data: null,
  status: "idle",
  linkAccount: async (code: string) => {
    set({ status: "loading" });
    try {
      const result = await linkMercadoPago(code);
      if (result.success) {
        set({ data: result.data, status: "success" });
      } else {
        console.error(result.error);
        set({ status: "error" });
      }
    } catch (err) {
      console.error(err);
      set({ status: "error" });
    }
  },
  clear: () => set({ data: null, status: "idle" }),
}));
