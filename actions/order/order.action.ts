// actions/order/order.action.ts
import claraApi from "@/lib/axios";

export type BuyerOrdersResult =
  | { success: true; data: any[] } // podés tipar más adelante con tu interfaz Order
  | { success: false; error: string };

export const fetchBuyerOrders = async (): Promise<BuyerOrdersResult> => {
  try {
    const { data } = await claraApi.get("/buyer/orders");
    if (data) {
      return { success: true, data };
    }
    return { success: false, error: "No se pudieron cargar las órdenes" };
  } catch (error: any) {
    const message =
      error?.response?.data?.message || "Error al cargar las órdenes.";
    return { success: false, error: message };
  }
};

export const createBuyerOrder = async (payload: {
  albumId: string;
  items: {
    photoId: string;
    size: string;
    quantity: number;
    unitPrice: number;
  }[];
}) => {
  try {
    const { data } = await claraApi.post("/buyer/orders", payload);
    return { success: true, data };
  } catch (error: any) {
    const message =
      error?.response?.data?.message || "Error al crear la orden.";
    return { success: false, error: message };
  }
};

export const fetchBuyerOrderById = async (orderId: string) => {
  try {
    const { data } = await claraApi.get(`/buyer/orders/${orderId}`);
    return { success: true, data };
  } catch (error: any) {
    const message =
      error?.response?.data?.message || "Error al cargar la orden.";
    return { success: false, error: message };
  }
};

export const cancelBuyerOrder = async (orderId: string) => {
  try {
    const { data } = await claraApi.delete(`/buyer/orders/${orderId}`);
    return { success: true, data };
  } catch (error: any) {
    const message =
      error?.response?.data?.message || "Error al cancelar la orden.";
    return { success: false, error: message };
  }
};
