import claraApi from "@/lib/axios";

export type SubscribeResult =
  | { success: true; data: any }
  | { success: false; error: string };

export const subscribeToMasterclass = async (
  email: string
): Promise<SubscribeResult> => {
  try {
    const { data } = await claraApi.post("/leads", { email });

    return { success: true, data };
  } catch (error: any) {
    console.error("Error en subscribeToMasterclass:", error);

    const message =
      error.response?.data?.message ||
      error.message ||
      "Error al suscribir email";

    return { success: false, error: message };
  }
};
