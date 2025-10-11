"use client";

import { useBuyerStore } from "@/store/useBuyerStore";
import { useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { CreditCard, XCircle, CheckCircle } from "lucide-react";

export default function BuyerOrdersPage() {
  const { orders, loading, loadBuyerOrders } = useBuyerStore();

  useEffect(() => {
    loadBuyerOrders();
  }, []);

  if (loading)
    return <p className="text-center p-6 text-gray-600">Cargando pedidos...</p>;

  if (!orders.length)
    return (
      <p className="text-center p-6 text-gray-500">
        No tienes pedidos realizados.
      </p>
    );

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "approved":
        return (
          <span className="flex items-center gap-1 px-3 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">
            <CheckCircle className="w-3 h-3" /> Pagado
          </span>
        );
      case "pending":
        return (
          <span className="flex items-center gap-1 px-3 py-1 text-xs font-semibold rounded-full bg-yellow-100 text-yellow-800">
            <CreditCard className="w-3 h-3" /> Pendiente
          </span>
        );
      default:
        return (
          <span className="flex items-center gap-1 px-3 py-1 text-xs font-semibold rounded-full bg-red-100 text-red-800">
            <XCircle className="w-3 h-3" /> Rechazado
          </span>
        );
    }
  };

  return (
    <div className="container mx-auto px-4">
      <h1 className="text-3xl font-extrabold mb-10 text-gray-900 text-center">
        Mis Compras
      </h1>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {orders.map((order, i) => (
          <motion.div
            key={order.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05, duration: 0.5 }}
          >
            <Link
              href={`/dashboard/comprador/pedidos/${order.id}`}
              className="group block bg-white rounded-2xl shadow-md p-6 hover:shadow-lg transition relative overflow-hidden"
            >
              {/* Álbum y fecha */}
              <div className="mb-4">
                <h2 className="text-lg font-semibold text-gray-800 group-hover:text-cyan-600 transition">
                  Album: {order.album.title}
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
                {getStatusBadge(order.status)}
              </div>

              {/* Hover effect con overlay sutil */}
              <div className="absolute top-0 left-0 w-full h-full rounded-2xl bg-black/5 opacity-0 group-hover:opacity-10 transition"></div>
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
