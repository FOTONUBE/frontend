"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePhotographerStore } from "@/store/usePhotographerStore";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const statusMap = {
  pending: { label: "Pendiente", color: "yellow" },
  in_progress: { label: "En Progreso", color: "cyan" },
  delivered: { label: "Entregado", color: "green" },
};

// 🔹 Mapeo de estados de pago
const paymentStatusMap: Record<string, { label: string; color: string }> = {
  pending: { label: "Pendiente", color: "yellow" },
  approved: { label: "Aprobado", color: "green" },
  rejected: { label: "Rechazado", color: "red" },
};

export default function PhotographerOrdersPage() {
  const { loading, error, orders, loadPhotographerOrders } =
    usePhotographerStore();
  const [activeStatus, setActiveStatus] =
    useState<keyof typeof statusMap>("pending");

  useEffect(() => {
    if (orders.length === 0) loadPhotographerOrders();
  }, [orders.length, loadPhotographerOrders]);

  if (loading)
    return <p className="p-6 text-center text-gray-500">Cargando...</p>;
  if (error) return <p className="p-6 text-center text-red-600">{error}</p>;
  if (!loading && orders.length === 0)
    return (
      <p className="p-6 text-center text-gray-500 text-lg">
        No tienes órdenes todavía.
      </p>
    );

  const filteredOrders = orders.filter(
    (o) => (o.deliveryStatus ?? "pending") === activeStatus
  );

  return (
    <div className="px-6 space-y-8">
      <h1 className="text-2xl font-bold">Mis Órdenes</h1>

      {/* 🔹 Cards de estado */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {(Object.keys(statusMap) as (keyof typeof statusMap)[]).map(
          (status) => (
            <Card
              key={status}
              className={`cursor-pointer hover:shadow-lg transition ${
                activeStatus === status
                  ? `border-2 border-${statusMap[status].color}-600`
                  : ""
              }`}
              onClick={() => setActiveStatus(status)}
            >
              <CardContent className="text-center py-6 space-y-2">
                <p
                  className={`text-sm text-${statusMap[status].color}-600 font-semibold`}
                >
                  {statusMap[status].label}
                </p>
                <p className="text-2xl font-bold">
                  {orders.filter((o) => o.deliveryStatus === status).length}
                </p>
              </CardContent>
            </Card>
          )
        )}
      </div>

      {/* 🔹 Ordenes filtradas */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredOrders.map((order) => {
          const paymentStatus =
            paymentStatusMap[order.status.toLowerCase()] ??
            paymentStatusMap.pending;

          return (
            <Link key={order.id} href={`/dashboard/orders/${order.id}`}>
              <Card className="group hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer border rounded-lg overflow-hidden">
                {/* 🔹 Header con fecha, ID y estados */}
                <div className="flex justify-between items-center p-4 bg-gray-50 border-b">
                  {/* Fecha + ID */}
                  <div>
                    <p className="text-xs text-gray-400">
                      {new Date(order.createdAt).toLocaleDateString()}
                    </p>
                    <span className="text-sm text-gray-600 font-mono">
                      #{order.id.slice(0, 6)}
                    </span>
                  </div>

                  {/* Estados */}
                  <div className="flex gap-4">
                    {/* Entrega */}
                    <div className="flex flex-col items-center text-center">
                      <span className="text-xs text-gray-500 font-medium">
                        Entrega
                      </span>
                      <Badge
                        className={`bg-${
                          statusMap[order.deliveryStatus ?? "pending"].color
                        }-100 text-${
                          statusMap[order.deliveryStatus ?? "pending"].color
                        }-700 mt-1`}
                      >
                        {statusMap[order.deliveryStatus ?? "pending"].label}
                      </Badge>
                    </div>

                    {/* Pago */}
                    <div className="flex flex-col items-center text-center">
                      <span className="text-xs text-gray-500 font-medium">
                        Pago
                      </span>
                      <Badge
                        className={`bg-${paymentStatus.color}-100 text-${paymentStatus.color}-700 mt-1`}
                      >
                        {paymentStatus.label}
                      </Badge>
                    </div>
                  </div>
                </div>

                {/* 🔹 Contenido principal */}
                <CardContent className="p-4 space-y-4">
                  <div>
                    <p className="font-semibold text-lg truncate">
                      {order.album?.title}
                    </p>
                    <p className="text-sm text-gray-600 truncate">
                      Comprador: {order.buyer?.email}
                    </p>
                  </div>

                  {/* 🔹 Mini thumbnails de los items */}
                  <div className="flex gap-2 overflow-x-auto py-1">
                    {order.items.slice(0, 3).map((item) => (
                      <img
                        key={item.id}
                        src={item.photoUrl} // ✅ usa directamente el campo que devuelve el backend
                        alt={`Foto ${item.size}`} // no hay título, podés usar size o algún placeholder
                        className="w-16 h-16 object-cover rounded-md border"
                        title={`${item.size} - ${item.quantity}`}
                      />
                    ))}
                    {order.items.length > 4 && (
                      <div className="w-16 h-16 flex items-center justify-center bg-gray-200 text-gray-700 rounded-md border font-medium text-sm">
                        +{order.items.length - 3}
                      </div>
                    )}
                    {order.items.length === 4 && (
                      <img
                        key={order.items[3].id}
                        src={order.items[3].photoUrl}
                        alt={order.items[3].photoUrl}
                        className="w-16 h-16 object-cover rounded-md border"
                        title={`${order.items[3].photoUrl} - ${order.items[3].size}`}
                      />
                    )}
                  </div>

                  {/* 🔹 Info final */}
                  <div className="flex justify-between items-center">
                    <p className="text-sm text-gray-600">
                      Items: {order.items.length}
                    </p>
                    <p className="font-medium text-cyan-600 text-lg">
                      Total: ${order.total}
                    </p>
                  </div>
                </CardContent>
              </Card>
            </Link>
          );
        })}
        {filteredOrders.length === 0 && (
          <p className="col-span-full text-center text-gray-500 mt-6">
            No hay órdenes en este estado.
          </p>
        )}
      </section>
    </div>
  );
}
