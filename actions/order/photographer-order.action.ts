import { PhotographerOrder } from "@/interfaces/order/order-photographer.interface";
import claraApi from "@/lib/axios";

export type PhotographerOrdersResult =
  | { success: true; data: PhotographerOrder[] }
  | { success: false; error: string };

export const fetchPhotographerOrders =
  async (): Promise<PhotographerOrdersResult> => {
    try {
      const { data } = await claraApi.get("/photographer/orders/my-orders");
      if (data) {
        return { success: true, data };
      }
      return {
        success: false,
        error: "No se pudieron cargar las órdenes del fotógrafo",
      };
    } catch (error: any) {
      const message =
        error?.response?.data?.message ||
        "Error al cargar las órdenes del fotógrafo.";
      return { success: false, error: message };
    }
  };

export const fetchPhotographerOrdersByAlbum = async (
  albumId: string
): Promise<PhotographerOrdersResult> => {
  try {
    const { data } = await claraApi.get(
      `/photographer/orders/album/${albumId}`
    );
    if (data) {
      return { success: true, data };
    }
    return {
      success: false,
      error: "No se pudieron cargar las órdenes de este álbum",
    };
  } catch (error: any) {
    const message =
      error?.response?.data?.message ||
      "Error al cargar las órdenes del álbum.";
    return { success: false, error: message };
  }
};

export const fetchPhotographerOrderById = async (orderId: string) => {
  try {
    const { data } = await claraApi.get(`/photographer/orders/${orderId}`);
    return { success: true, data };
  } catch (error: any) {
    const message =
      error?.response?.data?.message || "Error al cargar la orden.";
    return { success: false, error: message };
  }
};
