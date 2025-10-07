"use client";

import { useEffect, useState } from "react";
import { useAdminOrdersStore } from "@/store/admin/useAdminOrdersStore";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";

export default function AdminOrdersPage() {
  const router = useRouter();
  const { orders, loading, error, total, limit, fetchOrders } =
    useAdminOrdersStore();

  const [currentPage, setCurrentPage] = useState(1);
  const [statusFilter, setStatusFilter] = useState<string | undefined>();
  const [photographerSearch, setPhotographerSearch] = useState("");

  const statusMap: Record<string, string> = {
    pending: "Pendiente",
    approved: "Aprobada",
    rejected: "Rechazada",
    authorized: "Autorizada",
    in_process: "En proceso",
    in_mediation: "En mediación",
    cancelled: "Cancelada",
    refunded: "Reembolsada",
    charged_back: "Devolución",
  };

  const statusColors: Record<string, string> = {
    pending: "text-yellow-600 bg-yellow-100",
    approved: "text-green-600 bg-green-100",
    rejected: "text-red-600 bg-red-100",
    authorized: "text-blue-600 bg-blue-100",
    in_process: "text-purple-600 bg-purple-100",
    in_mediation: "text-orange-600 bg-orange-100",
    cancelled: "text-gray-600 bg-gray-100",
    refunded: "text-pink-600 bg-pink-100",
    charged_back: "text-red-700 bg-red-200",
  };

  const deliveryMap: Record<string, string> = {
    pending: "Pendiente",
    in_progress: "En progreso",
    delivered: "Entregado",
  };

  const deliveryColors: Record<string, string> = {
    pending: "text-yellow-700 bg-yellow-50",
    in_progress: "text-purple-700 bg-purple-50",
    delivered: "text-green-700 bg-green-50",
  };

  useEffect(() => {
    fetchOrders({
      page: currentPage,
      status: statusFilter,
    });
  }, [currentPage, statusFilter]);

  const filteredOrders = orders.filter((o) => {
    if (!photographerSearch) return true;
    const name = o.album.photographer.name ?? "";
    return name.toLowerCase().includes(photographerSearch.toLowerCase());
  });

  const totalPages = Math.max(Math.ceil(total / limit), 1);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4 text-cyan-600">Órdenes</h1>

      {/* Filtros */}
      <div className="flex gap-4 mb-4 flex-wrap">
        <select
          value={statusFilter}
          onChange={(e) => {
            setStatusFilter(e.target.value || undefined);
            setCurrentPage(1);
          }}
          className="border px-3 py-2 rounded"
        >
          <option value="">Todos los estados</option>
          {Object.entries(statusMap).map(([key, label]) => (
            <option key={key} value={key}>
              {label}
            </option>
          ))}
        </select>

        <input
          type="text"
          placeholder="Filtrar por fotógrafo (nombre o email)"
          value={photographerSearch}
          onChange={(e) => {
            setPhotographerSearch(e.target.value);
            setCurrentPage(1);
          }}
          className="border px-3 py-2 rounded flex-1 min-w-[200px]"
        />
      </div>

      {loading ? (
        <div className="flex justify-center py-10">
          <Loader2 className="animate-spin w-12 h-12 text-cyan-600" />
        </div>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : filteredOrders.length === 0 ? (
        <p className="text-gray-500">No se encontraron órdenes</p>
      ) : (
        <>
          <div className="overflow-x-auto border rounded shadow-sm">
            <table className="w-full">
              <thead className="bg-cyan-50">
                <tr>
                  {[
                    "ID",
                    "Comprador",
                    "Fotógrafo",
                    "Total",
                    "Estado",
                    "Entrega",
                    "Fecha",
                  ].map((h) => (
                    <th key={h} className="px-4 py-2 text-left text-cyan-600">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filteredOrders.map((o) => (
                  <tr
                    key={o.id}
                    className="border-t hover:bg-gray-50 cursor-pointer"
                    onClick={() => router.push(`/admin/orders/${o.id}`)}
                  >
                    <td className="px-4 py-2">{o.id}</td>
                    <td className="px-4 py-2">{o.buyer.email}</td>
                    <td className="px-4 py-2">
                      {o.album.photographer.name || o.album.photographer.email}
                    </td>
                    <td className="px-4 py-2">${o.total}</td>
                    <td className="px-4 py-2">
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-semibold ${
                          statusColors[o.status]
                        }`}
                      >
                        {statusMap[o.status]}
                      </span>
                    </td>
                    <td className="px-4 py-2">
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-semibold ${
                          deliveryColors[o.deliveryStatus]
                        }`}
                      >
                        {deliveryMap[o.deliveryStatus]}
                      </span>
                    </td>
                    <td className="px-4 py-2">
                      {new Date(o.createdAt).toLocaleDateString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Paginado */}
          <div className="flex justify-center items-center gap-2 mt-4">
            <button
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((p) => p - 1)}
              className="px-3 py-1 bg-cyan-50 text-cyan-600 rounded disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Anterior
            </button>
            <span className="text-cyan-600 font-medium">
              Página {currentPage} de {totalPages}
            </span>
            <button
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage((p) => p + 1)}
              className="px-3 py-1 bg-cyan-50 text-cyan-600 rounded disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Siguiente
            </button>
          </div>
        </>
      )}
    </div>
  );
}
