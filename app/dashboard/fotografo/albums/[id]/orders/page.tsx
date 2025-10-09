"use client";

import { Order } from "@/interfaces/album/get-album-by-ID.interface";
import { useAlbumStore } from "@/store/useAlbumStore";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function AlbumOrdersPage() {
  const { id } = useParams() as { id: string };
  const { currentAlbum, getAlbumById, loading, error } = useAlbumStore();
  const [orders, setOrders] = useState<Order[]>([]); // Tipo explícito seguro

  // Traer álbum al montar el componente
  useEffect(() => {
    if (id) getAlbumById(id);
  }, [id, getAlbumById]);

  // Actualizar orders cuando cambie currentAlbum
  useEffect(() => {
    if (currentAlbum?.orders) {
      setOrders(currentAlbum.orders);
    } else {
      setOrders([]); // Evitar estado antiguo si currentAlbum se vuelve null
    }
  }, [currentAlbum]);

  if (loading) return <p className="px-6">Cargando...</p>;
  if (error) return <p className="px-6 text-red-600">{error}</p>;
  if (!currentAlbum)
    return <p className="px-6 text-gray-500">Álbum no encontrado</p>;

  return (
    <div className="px-6">
      <h1 className="text-2xl font-bold mb-4">
        Pedidos del Álbum "{currentAlbum.title}"
      </h1>

      {orders.length === 0 ? (
        <p className="text-gray-500">No hay pedidos para este álbum.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 border border-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-2 text-left text-sm font-medium text-gray-500 uppercase">
                  ID Pedido
                </th>
                <th className="px-4 py-2 text-left text-sm font-medium text-gray-500 uppercase">
                  Telefono
                </th>
                <th className="px-4 py-2 text-left text-sm font-medium text-gray-500 uppercase">
                  Email
                </th>
                <th className="px-4 py-2 text-left text-sm font-medium text-gray-500 uppercase">
                  Total
                </th>
                <th className="px-4 py-2 text-left text-sm font-medium text-gray-500 uppercase">
                  Estado
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {orders.map((order) => (
                <tr key={order.id}>
                  <td className="px-4 py-2">{order.id}</td>
                  <td className="px-4 py-2">{order.buyer.phone}</td>
                  <td className="px-4 py-2">{order.buyer.email}</td>
                  <td className="px-4 py-2">${order.total}</td>
                  <td className="px-4 py-2">{order.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
