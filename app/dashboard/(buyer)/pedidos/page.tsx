"use client";

import { useBuyerStore } from "@/store/useBuyerStore";
import { useEffect } from "react";
import Link from "next/link";

export default function BuyerOrdersPage() {
  const { orders, loading, loadBuyerOrders } = useBuyerStore();

  useEffect(() => {
    loadBuyerOrders();
  }, []);

  if (loading)
    return <p className="text-center p-4 text-gray-600">Cargando pedidos...</p>;

  if (!orders.length)
    return (
      <p className="text-center p-4 text-gray-500">
        No tienes pedidos realizados.
      </p>
    );

  return (
    <div className="container mx-auto px-4">
      <h1 className="text-3xl font-bold mb-8">Mis Compras</h1>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {orders.map((order) => (
          <Link
            key={order.id}
            href={`/dashboard/pedidos/${order.id}`}
            className="group block bg-white rounded shadow-md  transition-shadow duration-300 p-6 relative"
          >
            {/* Álbum y fecha */}
            <div className="mb-4">
              <h2 className="text-lg font-semibold text-gray-800 group-hover:text-cyan-600 transition">
                {order.album.title}
              </h2>
              <p className="text-sm text-gray-500">
                {new Date(order.createdAt).toLocaleDateString("es-AR", {
                  day: "2-digit",
                  month: "2-digit",
                  year: "numeric",
                })}
              </p>
            </div>

            {/* Total y estado */}
            <div className="flex justify-between items-center">
              <span className="text-xl font-bold text-gray-800">
                ${order.total}
              </span>
              <span
                className={`px-3 py-1 text-xs font-semibold rounded-full ${
                  order.status === "approved"
                    ? "bg-green-100 text-green-800"
                    : order.status === "pending"
                    ? "bg-yellow-100 text-yellow-800"
                    : "bg-red-100 text-red-800"
                }`}
              >
                {order.status === "approved"
                  ? "Pagado"
                  : order.status === "pending"
                  ? "Pendiente"
                  : "Rechazado"}
              </span>
            </div>

            {/* Hover effect */}
            <div className="absolute top-0 left-0 w-full h-full rounded bg-black/80 opacity-0 group-hover:opacity-5 transition-opacity"></div>
          </Link>
        ))}
      </div>
    </div>
  );
}
