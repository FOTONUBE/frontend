"use client";

import { useEffect } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import { motion } from "framer-motion";
import { useAdminPhotographersStore } from "@/store/admin/useAdminPhotographersStore";
import { ShoppingCart, CheckCircle, XCircle, Clock } from "lucide-react";
import Link from "next/link";

export default function AdminPhotographerDetailPage() {
  const { id } = useParams<{ id: string }>();
  const { fetchPhotographerByID, loading, error, photographerByID } =
    useAdminPhotographersStore();

  useEffect(() => {
    if (id) fetchPhotographerByID(id);
  }, [id, fetchPhotographerByID]);

  if (loading)
    return (
      <p className="text-center mt-10 text-gray-500">Cargando fotógrafo...</p>
    );
  if (error)
    return <p className="text-center mt-10 text-red-500">Error: {error}</p>;
  if (!photographerByID) return null;

  const metrics = [
    {
      label: "Total",
      value: photographerByID.totalOrders,
      icon: <ShoppingCart className="w-6 h-6 text-gray-500" />,
    },
    {
      label: "Pendientes",
      value: photographerByID.pendingOrders,
      icon: <Clock className="w-6 h-6 text-yellow-500" />,
    },
    {
      label: "Aprobadas",
      value: photographerByID.approvedOrders,
      icon: <CheckCircle className="w-6 h-6 text-green-500" />,
    },
    {
      label: "Rechazadas",
      value: photographerByID.rejectedOrders,
      icon: <XCircle className="w-6 h-6 text-red-500" />,
    },
  ];

  return (
    <motion.div
      className="px-6 py-8 max-w-7xl mx-auto"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Sección superior */}
      <div className="flex flex-col md:flex-row items-center md:items-start gap-10 mb-12">
        <motion.div
          className="relative w-40 h-40 md:w-48 md:h-48 flex-shrink-0"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          {photographerByID.image ? (
            <Image
              src={photographerByID.image}
              alt={photographerByID.name}
              fill
              className="rounded-full object-cover border-4 border-gray-200"
            />
          ) : (
            <div className="w-full h-full bg-gray-100 rounded-full flex items-center justify-center text-gray-400 font-semibold">
              Sin imagen
            </div>
          )}
        </motion.div>

        <div className="flex-1 flex flex-col justify-center gap-6 w-full">
          <div>
            <h1 className="text-3xl font-bold">{photographerByID.name}</h1>
            <p className="text-gray-500 mt-1">{photographerByID.email}</p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {metrics.map((metric) => (
              <motion.div
                key={metric.label}
                className="bg-gray-50 rounded-lg p-4 flex flex-col items-center justify-center shadow-sm hover:shadow-md transition-shadow"
                whileHover={{ scale: 1.02 }}
              >
                {metric.icon}
                <p className="text-xl font-semibold mt-2">{metric.value}</p>
                <p className="text-sm text-gray-400">{metric.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Álbumes */}
      <h2 className="text-2xl font-semibold mb-6">Álbumes</h2>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {photographerByID.albums.map((album, i) => (
          <Link key={album.id} href={`/admin/album/${album.id}`} passHref>
            <motion.div
              className="relative bg-white rounded-xl shadow-md overflow-hidden cursor-pointer"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              whileHover={{ scale: 1.03 }}
            >
              {album.coverUrl ? (
                <Image
                  src={album.coverUrl}
                  alt={album.title}
                  width={400}
                  height={250}
                  className="object-cover w-full h-48"
                />
              ) : (
                <div className="w-full h-48 bg-gray-100 flex items-center justify-center text-gray-400">
                  Sin portada
                </div>
              )}
              <div className="p-4 flex flex-col justify-between relative">
                <h3 className="text-lg font-semibold truncate">
                  {album.title}
                </h3>
                <p className="text-sm text-gray-400 truncate">
                  {album.description || "Sin descripción"}
                </p>
                <motion.div
                  className="absolute top-2 right-2 bg-black/50 text-white text-xs px-2 py-1 rounded"
                  initial={{ opacity: 0 }}
                  whileHover={{ opacity: 1 }}
                >
                  {album.totalOrders} órdenes
                </motion.div>
              </div>
            </motion.div>
          </Link>
        ))}
      </div>
    </motion.div>
  );
}
