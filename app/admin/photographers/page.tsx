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

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {photographers.map((p) => (
          <Link
            key={p.id}
            href={`/admin/photographers/${p.id}`}
            className="bg-white rounded-2xl shadow-md p-5 flex flex-col items-center text-center hover:shadow-xl transition-shadow"
          >
            <div className="w-40 h-40 mb-4 relative">
              {p.image ? (
                <Image
                  src={p.image}
                  alt={p.name}
                  fill
                  className="object-cover rounded-full border-2 border-gray-200"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-gray-100 rounded-full text-gray-400 font-semibold">
                  Sin imagen
                </div>
              )}
            </div>

            <h2 className="text-lg font-semibold">{p.name}</h2>
            <p className="text-sm text-gray-500 mb-4">{p.email}</p>

            <div className="w-full flex justify-between mt-auto">
              <div className="flex flex-col items-center">
                <span className="text-xl font-bold">{p.totalOrders}</span>
                <span className="text-xs text-gray-500">Total</span>
              </div>
              <div className="flex flex-col items-center">
                <span className="text-xl font-bold text-yellow-500">
                  {p.pendingOrders}
                </span>
                <span className="text-xs text-gray-500">Pendientes</span>
              </div>
              <div className="flex flex-col items-center">
                <span className="text-xl font-bold text-green-500">
                  {p.approvedOrders}
                </span>
                <span className="text-xs text-gray-500">Aprobadas</span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
