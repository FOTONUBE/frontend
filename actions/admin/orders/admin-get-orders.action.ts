// actions/admin/admin-get-orders.action.ts
import claraApi from "@/lib/axios";
import { AdminOrdersResponse } from "@/interfaces/admin/admin-get-orders.interface";
import { AdminOrderID } from "@/interfaces/admin/admin-get-order-by-ID.interface";

interface FetchOrdersParams {
  status?: string;
  photographerId?: string;
  clientId?: string;
  page?: number;
  limit?: number;
}

export const adminGetOrders = async (params?: FetchOrdersParams) => {
  try {
    const { data } = await claraApi.get<AdminOrdersResponse>("/admin/orders", {
      params,
    });
    return { success: true, data };
  } catch (error: any) {
    const message =
      error?.response?.data?.message || "Error al obtener las órdenes.";
    return { success: false, error: message };
  }
};

export const adminGetOrderStats = async () => {
  try {
    const { data } = await claraApi.get("/admin/orders/stats/dashboard");
    return { success: true, data };
  } catch (error: any) {
    const message =
      error?.response?.data?.message ||
      "Error al obtener las estadísticas de órdenes.";
    return { success: false, error: message };
  }
};

export const adminGetOrderById = async (id: string) => {
  try {
    const { data } = await claraApi.get<AdminOrderID>(`/admin/orders/${id}`);
    return { success: true, data };
  } catch (error: any) {
    const message =
      error?.response?.data?.message || "Error al obtener la orden.";
    return { success: false, error: message };
  }
};
