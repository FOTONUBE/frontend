"use client";

import { create } from "zustand";

import claraApi from "@/lib/axios";
import Cookies from "js-cookie";
import { useAuthStore } from "@/store/useAuthStore";
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

      // ✅ 1️⃣ Pedimos nuevo token actualizado
      const { data } = await claraApi.get("/auth/refresh-token");

      // ✅ 2️⃣ Guardamos nuevo token en cookies
      Cookies.set("token", data.response.access_token, {
        expires: 1,
        path: "/",
        secure: true,
        sameSite: "None",
      });

      // ✅ 3️⃣ Refrescamos el estado del usuario
      await useAuthStore.getState().checkAuthStatus?.();

      set({ status: "success" });
    } catch (err) {
      console.error("Error al vincular MP:", err);
      set({ status: "error" });
    }
  },
  clear: () => set({ status: "idle" }),
}));
