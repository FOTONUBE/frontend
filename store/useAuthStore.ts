import { create } from "zustand";
import Cookies from "js-cookie";
import { authLogin, authRegister } from "@/actions/auth/auth";
import { getCurrentUser, updateUser } from "@/actions/user/user";

import { GetUserResponse } from "@/interfaces/user/get-user.interface";
import { UpdateUserPayload } from "@/interfaces/user/update-user.interface";
import { toast } from "sonner";
import {
  authRequestPasswordReset,
  authResetPassword,
} from "@/actions/auth/reset-password";

type AuthStatus = "authenticated" | "unauthenticated" | "checking";

interface AuthState {
  user?: GetUserResponse;
  status: AuthStatus;
  loading?: boolean; // 👈 agregado
  error?: string;

  login: (email: string, password: string) => Promise<boolean>;
  register: (
    email: string,
    password: string,
    role: "buyer" | "photographer"
  ) => Promise<boolean>;
  logout: () => void;
  checkAuthStatus: () => Promise<void>;
  updateUser: (payload: UpdateUserPayload) => Promise<boolean>;
  resetPassword: (token: string, newPassword: string) => Promise<boolean>;
  requestPasswordReset: (email: string) => Promise<boolean>;
  setUserData: (userData: GetUserResponse) => void;
}

export const useAuthStore = create<AuthState>((set, get) => ({
  user: undefined,
  status: "unauthenticated",
  loading: false,
  error: undefined,

  login: async (email, password) => {
    set({ status: "checking", error: undefined });

    const result = await authLogin(email, password);

    if (!result.success) {
      set({ status: "unauthenticated", error: result.error });
      toast.error(result.error || "Error al iniciar sesión ❌");
      return false;
    }

    try {
      const user = await getCurrentUser();
      set({ user, status: "authenticated", error: undefined });
      toast.success("Bienvenido de nuevo 👋");
      return true;
    } catch {
      set({ status: "unauthenticated", error: "Error al obtener el usuario" });
      toast.error("Error al obtener la información del usuario ❌");
      return false;
    }
  },

  register: async (email, password, role) => {
    set({ status: "checking", error: undefined });

    const result = await authRegister(email, password, role);

    if (!result.success) {
      set({ status: "unauthenticated", error: result.error });
      toast.error(result.error || "Error al registrarse ❌");
      return false;
    }

    try {
      const user = await getCurrentUser();
      set({ user, status: "authenticated", error: undefined });
      toast.success("Registro exitoso 👏");
      return true;
    } catch {
      set({ status: "unauthenticated", error: "Error al obtener el usuario" });
      toast.error("Error al obtener la información del usuario ❌");
      return false;
    }
  },

  logout: () => {
    Cookies.remove("token");
    set({
      user: undefined,
      status: "unauthenticated",
      loading: false,
      error: undefined,
    });
    // toast.success("Sesión cerrada ✅");
  },

  checkAuthStatus: async () => {
    set({ status: "checking", error: undefined });

    const token = Cookies.get("token");
    if (!token) {
      get().logout();
      return;
    }

    try {
      const user = await getCurrentUser();
      set({ user, status: "authenticated", error: undefined });
    } catch {
      get().logout();
    }
  },

  updateUser: async (payload: UpdateUserPayload) => {
    set({ loading: true, error: undefined });

    const result = await updateUser(payload);

    if (!result.success) {
      set({ loading: false, error: result.error });
      toast.error(result.error || "No se pudo actualizar el usuario ❌");
      return false;
    }

    get().logout();
    toast.success(
      "Usuario actualizado correctamente. Por favor, vuelve a iniciar sesión ✅"
    );

    window.location.href = "/login";

    return true;
  },

  resetPassword: async (token, newPassword) => {
    set({ loading: true, error: undefined });

    const result = await authResetPassword(token, newPassword);

    if (!result.success) {
      set({ loading: false, error: result.error });
      toast.error(result.error || "Error al resetear la contraseña ❌");
      return false;
    }

    set({ loading: false, error: undefined });
    toast.success("Contraseña actualizada correctamente ✅");
    return true;
  },

  requestPasswordReset: async (email) => {
    set({ loading: true, error: undefined });

    const result = await authRequestPasswordReset(email);

    if (!result.success) {
      set({ loading: false, error: result.error });
      toast.error(result.error || "Error al enviar el correo ❌");
      return false;
    }

    set({ loading: false, error: undefined });
    toast.success(result.message || "Correo enviado correctamente ✅");
    return true;
  },

  setUserData: (userData) => set({ user: userData }),
}));
