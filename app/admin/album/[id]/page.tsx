"use client";

import { useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import { motion } from "framer-motion";
import { useAdminPhotographersStore } from "@/store/admin/useAdminPhotographersStore";

export default function AdminAlbumDetailPage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const { fetchAlbumByID, loading, error, albumByID } =
    useAdminPhotographersStore();

  useEffect(() => {
    if (id) fetchAlbumByID(id);
  }, [id, fetchAlbumByID]);

  if (loading)
    return <p className="text-center mt-10 text-gray-500">Cargando álbum...</p>;
  if (error)
    return <p className="text-center mt-10 text-red-500">Error: {error}</p>;
  if (!albumByID) return null;

  const statusColors: Record<string, string> = {
    pending: "text-yellow-700 bg-yellow-100",
    approved: "text-green-700 bg-green-100",
    rejected: "text-red-700 bg-red-100",
    authorized: "text-blue-700 bg-blue-100",
    in_process: "text-purple-700 bg-purple-100",
    in_mediation: "text-orange-700 bg-orange-100",
    cancelled: "text-gray-700 bg-gray-100",
    refunded: "text-pink-700 bg-pink-100",
    charged_back: "text-red-800 bg-red-200",
  };

  const deliveryColors: Record<string, string> = {
    pending: "text-yellow-700 bg-yellow-50",
    in_progress: "text-purple-700 bg-purple-50",
    delivered: "text-green-700 bg-green-50",
  };

  const translateStatus = (status: string) => {
    const map: Record<string, string> = {
      pending: "Pendiente",
      approved: "Aprobado",
      rejected: "Rechazado",
      authorized: "Autorizado",
      in_process: "En proceso",
      in_mediation: "En mediación",
      cancelled: "Cancelado",
      refunded: "Reembolsado",
      charged_back: "Contracargo",
    };
    return map[status] || status;
  };

  const translateDelivery = (delivery: string) => {
    const map: Record<string, string> = {
      pending: "Pendiente",
      in_progress: "En progreso",
      delivered: "Entregado",
    };
    return map[delivery] || delivery;
  };

  return (
    <motion.div
      className="px-6 max-w-6xl mx-auto"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Header */}
      <div className="flex flex-col md:flex-row gap-8 items-center md:items-start mb-10">
        {/* Portada */}
        <motion.div
          className="relative w-64 h-64 md:w-72 md:h-72 flex-shrink-0 rounded-xl overflow-hidden shadow-md"
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          {albumByID.portada ? (
            <Image
              src={albumByID.portada}
              alt={albumByID.title}
              fill
              className="object-cover w-full h-full"
            />
          ) : (
            <div className="w-full h-full bg-gray-100 flex items-center justify-center text-gray-400">
              Sin portada
            </div>
          )}
        </motion.div>

        {/* Info */}
        <div className="flex-1 flex flex-col gap-4 w-full">
          <h1 className="text-3xl font-bold truncate">{albumByID.title}</h1>
          <p className="text-gray-500">
            Descripción: {albumByID.description || "Sin descripción"}
          </p>
          <p className="text-gray-500">
            Evento: {new Date(albumByID.eventDate).toLocaleDateString()}
          </p>
          <p className="text-gray-500">
            Cliente: {albumByID.clientEmail} - {albumByID.clientPhoneNumber}
          </p>

          {/* Prices */}
          <div className="flex flex-col gap-2 mt-3">
            <span className="font-semibold text-gray-700">Precios:</span>
            <div className="flex flex-wrap gap-3">
              {albumByID.prices.map((p) => (
                <div
                  key={p.size}
                  className="bg-gray-50 px-3 py-1 rounded-full text-sm font-semibold shadow-sm"
                >
                  {p.size}: <span className="text-gray-800">${p.price}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Órdenes */}
      <h2 className="text-2xl font-semibold mb-4">
        Órdenes ({albumByID.totalOrders})
      </h2>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {albumByID.orders.map((o, i) => (
          <motion.div
            key={o.id}
            className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow cursor-pointer space-y-4"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            onClick={() => router.push(`/admin/orders/${o.id}`)}
          >
            <p className="font-semibold truncate">Orden #{o.id}</p>
            <p className="text-gray-500 font-medium">Total: ${o.total}</p>
            <p className="text-sm text-gray-400">
              {new Date(o.createdAt).toLocaleString()}
            </p>

            <div className="flex gap-2 mt-3 flex-wrap">
              <span
                className={`px-2 py-1 rounded-full text-xs font-semibold ${
                  statusColors[o.status]
                }`}
              >
                Pago: {translateStatus(o.status)}
              </span>
              <span
                className={`px-2 py-1 rounded-full text-xs font-semibold ${
                  deliveryColors[o.deliveryStatus]
                }`}
              >
                Entrega: {translateDelivery(o.deliveryStatus)}
              </span>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
