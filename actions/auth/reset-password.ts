import claraApi from "@/lib/axios";

type ResetPasswordResult =
  | { success: true; message: string }
  | { success: false; error: string };

export const authResetPassword = async (
  token: string,
  newPassword: string
): Promise<ResetPasswordResult> => {
  try {
    const { data } = await claraApi.post("/auth/reset-password", {
      token,
      newPassword,
    });

    return { success: true, message: data.message };
  } catch (error: any) {
    const message =
      error?.response?.data?.message || "No se pudo resetear la contraseña.";
    return { success: false, error: message };
  }
};

export const authRequestPasswordReset = async (email: string) => {
  try {
    const { data } = await claraApi.post("/auth/request-password-reset", {
      email,
    });

    return { success: true, message: data.message };
  } catch (error: any) {
    const message =
      error?.response?.data?.message ||
      "No se pudo enviar el correo de recuperación.";
    return { success: false, error: message };
  }
};
