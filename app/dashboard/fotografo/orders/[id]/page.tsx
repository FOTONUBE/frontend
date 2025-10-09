"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { usePhotographerStore } from "@/store/usePhotographerStore";
import { Card, CardContent } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { updateDeliveryStatus } from "../../../../../actions/order/update-delivery-status.action";

const statusMap = {
  pending: { label: "Pendiente", color: "yellow" },
  in_progress: { label: "En Progreso", color: "cyan" },
  delivered: { label: "Entregado", color: "green" },
};

// 🔹 Estados de pago con colores
const paymentStatusMap: Record<string, { label: string; color: string }> = {
  pending: { label: "Pendiente", color: "yellow" },
  approved: { label: "Aprobado", color: "green" },
  rejected: { label: "Rechazado", color: "red" },
};

export default function OrderDetailPage() {
  const params = useParams();
  const id = params?.id as string;

  const {
    currentOrder,
    loadOrderById,
    loading,
    updateCurrentOrderDeliveryStatus,
  } = usePhotographerStore();
  const [deliveryStatus, setDeliveryStatus] = useState<string>("pending");

  useEffect(() => {
    if (id) {
      loadOrderById(id);
    }
  }, [id, loadOrderById]);

  useEffect(() => {
    if (currentOrder?.deliveryStatus) {
      setDeliveryStatus(currentOrder.deliveryStatus);
    }
  }, [currentOrder]);

  if (loading)
    return <p className="p-6 text-center text-gray-500">Cargando orden...</p>;
  if (!currentOrder)
    return (
      <p className="p-6 text-center text-gray-500">
        No se encontró la orden ❌
      </p>
    );

  function getStatusInfo(status: string) {
    return statusMap[status as keyof typeof statusMap] ?? statusMap.pending;
  }

  // 🔹 Estado del pago con colores
  const paymentStatus =
    paymentStatusMap[currentOrder.status.toLowerCase()] ??
    paymentStatusMap.pending;

  // 🔹 Deshabilitar si el pago fue rechazado
  const isDeliveryFinalized = currentOrder.deliveryStatus === "delivered";
  const isPaymentRejected = currentOrder.status === "rejected";

  const disableDeliveryUpdate = isPaymentRejected || isDeliveryFinalized;

  const handleSave = () => {
    if (deliveryStatus) {
      updateCurrentOrderDeliveryStatus(
        deliveryStatus as "pending" | "in_progress" | "delivered"
      );
    }
  };

  return (
    <div className="px-6 space-y-6">
      <h1 className="text-2xl font-bold text-gray-600 mb-4">
        Orden #{currentOrder.id}
      </h1>

      {/* 🔹 Información general con badges */}
      <Card className="shadow-md">
        <CardContent className="py-4 space-y-4 p-4">
          <p className="font-semibold text-lg truncate">
            Álbum: {currentOrder.album?.title}
          </p>
          <p className="text-sm text-gray-600">
            Comprador: {currentOrder.buyer?.email}
          </p>
          <p className="text-sm text-gray-600">Total: ${currentOrder.total}</p>

          <div className="flex flex-wrap gap-6 items-center">
            {/* Entrega */}
            <div className="flex flex-col text-center">
              <span className="text-xs text-gray-500 font-medium">Entrega</span>
              <Badge
                className={`bg-${
                  getStatusInfo(currentOrder.deliveryStatus).color
                }-100 text-${
                  getStatusInfo(currentOrder.deliveryStatus).color
                }-700`}
              >
                {getStatusInfo(currentOrder.deliveryStatus).label}
              </Badge>
            </div>

            {/* Pago */}
            <div className="flex flex-col text-center">
              <span className="text-xs text-gray-500 font-medium">Pago</span>
              <Badge
                className={`bg-${paymentStatus.color}-100 text-${paymentStatus.color}-700`}
              >
                {paymentStatus.label}
              </Badge>
            </div>

            {/* Select para cambiar estado */}
            {!disableDeliveryUpdate ? (
              <div className="flex items-center gap-2">
                <Select
                  value={deliveryStatus}
                  onValueChange={(value) => setDeliveryStatus(value)}
                >
                  <SelectTrigger className="w-44">
                    <SelectValue placeholder="Selecciona estado" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="pending">Pendiente</SelectItem>
                    <SelectItem value="in_progress">En progreso</SelectItem>
                    <SelectItem value="delivered">Entregada</SelectItem>
                  </SelectContent>
                </Select>
                <Button
                  onClick={handleSave}
                  className="bg-cyan-600 text-white hover:bg-cyan-700"
                >
                  Guardar
                </Button>
              </div>
            ) : (
              <p className="text-xs text-red-600 mt-2">
                {isPaymentRejected
                  ? "No se puede actualizar el estado de entrega porque el pago fue rechazado."
                  : ""}
              </p>
            )}
          </div>

          {/* 🔹 Mensaje cuando el pago fue rechazado */}
          {isPaymentRejected && (
            <p className="text-xs text-red-600 mt-2">
              ⚠️ No se puede actualizar el estado de entrega porque el pago fue
              rechazado.
            </p>
          )}
        </CardContent>
      </Card>

      {/* 🔹 Items de la orden */}
      <section>
        <h2 className="text-lg font-semibold mb-4 text-gray-700">Items</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {currentOrder.items.map((item: any) => (
            <Card key={item.id} className="shadow-sm border">
              <CardContent className="p-3 space-y-2">
                <img
                  src={item.photoThumbnailUrl} // o item.photoUrl si quieres la full
                  alt={`Foto ${item.id}`} // no hay title, puedes usar id
                  className="w-full h-40 object-cover rounded-md"
                />
                <p className="font-medium">{item.id}</p>{" "}
                {/* o algún nombre que tengas */}
                <p className="text-sm text-gray-600">Tamaño: {item.size}</p>
                <p className="text-sm text-gray-600">
                  Cantidad: {item.quantity}
                </p>
                <p className="font-medium text-cyan-600">
                  Subtotal: ${item.subtotal}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
}
