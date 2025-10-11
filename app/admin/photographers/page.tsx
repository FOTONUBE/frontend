"use client";

import { useEffect } from "react";
import { useAdminPhotographersStore } from "@/store/admin/useAdminPhotographersStore";
import Image from "next/image";
import Link from "next/link";

export default function AdminPhotographersPage() {
  const { photographers, loading, error, fetchPhotographers } =
    useAdminPhotographersStore();

  useEffect(() => {
    if (photographers.length === 0) {
      fetchPhotographers();
    }
  }, [photographers, fetchPhotographers]);

  if (loading)
    return <p className="text-center mt-10">Cargando fotógrafos...</p>;
  if (error)
    return <p className="text-center mt-10 text-red-500">Error: {error}</p>;

  return (
    <div className="px-6">
      <h1 className="text-3xl font-bold mb-6 text-center">Fotógrafos</h1>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {photographers.map((p) => {
          const displayName = p.name?.trim() || "Fotógrafo sin nombre";
          const displayEmail = p.email || "Sin email registrado";

          return (
            <Link
              key={p.id}
              href={`/admin/photographers/${p.id}`}
              className="bg-white rounded-2xl shadow-md p-5 flex flex-col items-center text-center hover:shadow-xl transition-shadow duration-300"
            >
              {/* Imagen o placeholder */}
              <div className="w-40 h-40 mb-4 relative">
                {p.image ? (
                  <Image
                    src={p.image}
                    alt={displayName}
                    fill
                    className="object-cover rounded-full border-2 border-gray-200"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-gray-100 rounded-full text-gray-400 font-semibold">
                    Sin imagen
                  </div>
                )}
              </div>

              {/* Nombre y email */}
              <h2 className="text-lg font-semibold min-h-[28px]">
                {displayName}
              </h2>
              <p className="text-sm text-gray-500 mb-4 min-h-[20px]">
                {displayEmail}
              </p>

              {/* Contadores de órdenes */}
              <div className="w-full mt-4">
                <h3 className="text-sm font-semibold text-gray-500 mb-2">
                  Órdenes
                </h3>
                <div className="flex justify-around bg-gray-50 p-3 rounded-xl shadow-inner">
                  <div className="flex flex-col items-center">
                    <span className="text-xl font-bold text-cyan-600">
                      {p.totalOrders ?? 0}
                    </span>
                    <span className="text-xs text-gray-500">Totales</span>
                  </div>
                  <div className="flex flex-col items-center">
                    <span className="text-xl font-bold text-yellow-500">
                      {p.pendingOrders ?? 0}
                    </span>
                    <span className="text-xs text-gray-500">Pendientes</span>
                  </div>
                  <div className="flex flex-col items-center">
                    <span className="text-xl font-bold text-green-500">
                      {p.approvedOrders ?? 0}
                    </span>
                    <span className="text-xs text-gray-500">Aprobadas</span>
                  </div>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
