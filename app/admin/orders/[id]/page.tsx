"use client";

import { useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { useAdminOrdersStore } from "@/store/admin/useAdminOrdersStore";
import { Loader2 } from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";

// Mapas de traducción y colores
const STATUS_LABELS: Record<string, { label: string; color: string }> = {
  pending: { label: "Pendiente", color: "bg-yellow-100 text-yellow-800" },
  approved: { label: "Aprobada", color: "bg-green-100 text-green-800" },
  authorized: { label: "Autorizada", color: "bg-blue-100 text-blue-800" },
  in_process: { label: "En proceso", color: "bg-purple-100 text-purple-800" },
  in_mediation: {
    label: "En mediación",
    color: "bg-indigo-100 text-indigo-800",
  },
  rejected: { label: "Rechazada", color: "bg-red-100 text-red-800" },
  cancelled: { label: "Cancelada", color: "bg-gray-100 text-gray-800" },
  refunded: { label: "Reembolsada", color: "bg-pink-100 text-pink-800" },
  charged_back: {
    label: "Contracargo",
    color: "bg-orange-100 text-orange-800",
  },
};

const DELIVERY_LABELS: Record<string, { label: string; color: string }> = {
  pending: { label: "Pendiente", color: "bg-yellow-100 text-yellow-800" },
  in_progress: { label: "En progreso", color: "bg-blue-100 text-blue-800" },
  delivered: { label: "Entregado", color: "bg-green-100 text-green-800" },
};

export default function AdminOrderDetailPage() {
  const { id } = useParams();
  const orderId = Array.isArray(id) ? id[0] : id;
  const { fetchOrderById, currentOrder, loading, error } =
    useAdminOrdersStore();

  useEffect(() => {
    if (orderId) fetchOrderById(orderId);
  }, [orderId]);

  if (loading)
    return (
      <div className="flex justify-center items-center h-64">
        <Loader2 className="animate-spin w-12 h-12 text-cyan-600" />
      </div>
    );

  if (error) return <p className="text-red-500">{error}</p>;
  if (!currentOrder) return <p className="text-red-500">Orden no encontrada</p>;

  const generalInfo = [
    { title: "Comprador", value: currentOrder.buyer.email },
    {
      title: "Fotógrafo",
      value: (
        <Link
          href={`/admin/photographers/${currentOrder.album.photographer.id}`}
          className="text-cyan-600 font-medium hover:underline"
        >
          {currentOrder.album.photographer.name ||
            currentOrder.album.photographer.email}
        </Link>
      ),
    },
    { title: "Total", value: `$${currentOrder.total}` },
    {
      title: "Estado",
      value: STATUS_LABELS[currentOrder.status]?.label || currentOrder.status,
      color: STATUS_LABELS[currentOrder.status]?.color,
    },
    {
      title: "Delivery",
      value:
        DELIVERY_LABELS[currentOrder.deliveryStatus]?.label ||
        currentOrder.deliveryStatus,
      color: DELIVERY_LABELS[currentOrder.deliveryStatus]?.color,
    },
  ];

  console.log(currentOrder.items);

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      <h1 className="text-2xl font-bold text-cyan-600 mb-4">
        Orden #{currentOrder.id}
      </h1>

      {/* Información general */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {generalInfo.map((info, i) => (
          <motion.div
            key={info.title}
            custom={i}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1, type: "spring", stiffness: 100 }}
            className="p-4 border rounded-lg shadow-sm bg-white flex flex-col justify-center items-start hover:shadow-md transition"
          >
            <span className="text-gray-500 text-sm">{info.title}</span>
            <span className="mt-1 font-medium">{info.value}</span>
          </motion.div>
        ))}
      </div>

      {/* Items */}
      <h2 className="text-xl font-semibold text-cyan-600 mt-6">Items</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {currentOrder.items.map((item, idx) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.05 }}
            className="bg-white border rounded-lg overflow-hidden shadow hover:shadow-md transition"
          >
            <img src={item.photoThumbnailUrl} alt="Foto" />
            <div className="p-3 space-y-1">
              <div className="flex justify-between text-sm">
                <span className="font-medium">Cantidad:</span>
                <span>{item.quantity}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="font-medium">Precio:</span>
                <span>${item.unitPrice}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="font-medium">Tamaño:</span>
                <span>{item.size}</span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
