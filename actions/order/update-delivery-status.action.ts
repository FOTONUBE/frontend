import claraApi from "@/lib/axios";
import { PhotographerOrder } from "@/interfaces/order/order-photographer.interface";

export type UpdateDeliveryStatusResult =
  | { success: true; data: PhotographerOrder }
  | { success: false; error: string };

export const updateDeliveryStatus = async (
  orderId: string,
  deliveryStatus: "pending" | "in_progress" | "delivered"
): Promise<UpdateDeliveryStatusResult> => {
  try {
    const { data } = await claraApi.patch(
      `/photographer/orders/${orderId}/delivery-status`,
      {
        deliveryStatus,
      }
    );
    return { success: true, data };
  } catch (error: any) {
    const message =
      error?.response?.data?.message ||
      "Error al actualizar el estado de entrega.";
    return { success: false, error: message };
  }
};
