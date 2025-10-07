import { AdminUsersResponse } from "@/interfaces/admin/admin-get-users.interface";
import claraApi from "@/lib/axios";

export const adminGetUsers = async () => {
  try {
    const { data } = await claraApi.get<AdminUsersResponse[]>("/admin/users");
    return { success: true, data };
  } catch (error: any) {
    const message =
      error?.response?.data?.message || "Error al obtener los usuarios.";
    return { success: false, error: message };
  }
};

export const adminToggleUser = async (id: string, active: boolean) => {
  try {
    const url = active
      ? `/admin/users/${id}/activate`
      : `/admin/users/${id}/deactivate`;

    const { data } = await claraApi.post(url);
    return { success: true, data };
  } catch (error: any) {
    const message =
      error?.response?.data?.message ||
      "Error al actualizar el estado del usuario.";
    return { success: false, error: message };
  }
};

export const adminRequestPasswordReset = async (email: string) => {
  try {
    await claraApi.post("/auth/request-password-reset", { email });
    return { success: true };
  } catch (error: any) {
    const message =
      error?.response?.data?.message ||
      "Error al solicitar el reseteo de contraseña.";
    return { success: false, error: message };
  }
};
