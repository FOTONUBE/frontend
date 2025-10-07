import { create } from "zustand";
import { toast } from "sonner";
import { AdminUsersResponse } from "@/interfaces/admin/admin-get-users.interface";
import {
  adminGetUsers,
  adminRequestPasswordReset,
  adminToggleUser,
} from "@/actions/admin/users/admin-get-users.action";

interface AdminUserState {
  loading: boolean;
  error?: string;
  users: AdminUsersResponse[];

  fetchUsers: () => Promise<void>;
  toggleUser: (id: string, active: boolean) => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
}

export const useAdminUserStore = create<AdminUserState>((set, get) => ({
  loading: true,
  error: undefined,
  users: [],

  fetchUsers: async () => {
    set({ loading: true, error: undefined });
    try {
      const result = await adminGetUsers();
      if (!result.success) throw new Error(result.error);
      set({ users: result.data, loading: false });
    } catch (err: any) {
      set({ loading: false, error: err.message });
      toast.error(err.message || "Error al cargar los usuarios ❌");
    }
  },

  toggleUser: async (id, active) => {
    try {
      const result = await adminToggleUser(id, active);
      if (!result.success) throw new Error(result.error);

      set({
        users: get().users.map((u) =>
          u.id === id ? { ...u, isActive: active } : u
        ),
      });

      toast.success(
        `Usuario ${active ? "activado ✅" : "suspendido 🚫"} correctamente`
      );
    } catch (err: any) {
      toast.error(err.message || "Error al actualizar usuario ❌");
    }
  },

  resetPassword: async (email) => {
    try {
      const result = await adminRequestPasswordReset(email);
      if (!result.success) throw new Error(result.error);

      toast.success("Se envió el email de reseteo de contraseña 📧");
    } catch (err: any) {
      toast.error(err.message || "Error al enviar email ❌");
    }
  },
}));
