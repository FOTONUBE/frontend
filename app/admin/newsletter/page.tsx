"use client";

import { useAdminLeadsStore } from "@/store/admin/useAdminLeadsStore";
import { useEffect, useState } from "react";

export default function AdminLeadsPage() {
  const { leads, loading, error, fetchLeads } = useAdminLeadsStore();

  const [currentPage, setCurrentPage] = useState(1);
  const leadsPerPage = 10;

  useEffect(() => {
    if (leads.length === 0) fetchLeads();
  }, [leads]);

  // Paginado
  const totalPages = Math.max(Math.ceil(leads.length / leadsPerPage), 1);
  const paginatedLeads = leads.slice(
    (currentPage - 1) * leadsPerPage,
    currentPage * leadsPerPage
  );

  // Exportar a CSV
  const exportToCSV = () => {
    if (leads.length === 0) return;

    const header = ["Email", "Fecha de suscripción"];
    const rows = leads.map((l) => [
      l.email,
      new Date(l.createdAt).toLocaleDateString(),
    ]);
    const csvContent = [header, ...rows].map((e) => e.join(",")).join("\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "leads_newsletter.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4 text-cyan-600">
        Suscriptores al newsletter
      </h1>

      {loading && <p className="text-cyan-600">Cargando...</p>}
      {error && <p className="text-red-500">{error}</p>}

      {!loading && !error && paginatedLeads.length > 0 && (
        <>
          <div className="mb-4">
            <button
              onClick={exportToCSV}
              className="px-4 py-2 bg-cyan-600 text-white rounded hover:bg-cyan-700 transition"
            >
              Exportar a CSV
            </button>
          </div>

          {/* Contenedor scrollable */}
          <div className="overflow-x-auto max-h-[400px] overflow-y-auto border border-gray-200 rounded shadow-sm">
            <table className="w-full">
              <thead className="bg-cyan-50 sticky top-0 z-10">
                <tr>
                  <th className="px-4 py-2 text-left text-cyan-600">Email</th>
                  <th className="px-4 py-2 text-left text-cyan-600">
                    Fecha de suscripción
                  </th>
                </tr>
              </thead>
              <tbody>
                {paginatedLeads.map((lead) => (
                  <tr
                    key={lead.id}
                    className="border-t hover:bg-gray-50 transition"
                  >
                    <td className="px-4 py-2">{lead.email}</td>
                    <td className="px-4 py-2">
                      {new Date(lead.createdAt).toLocaleDateString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Paginado fijo */}
          <div className="flex justify-center items-center gap-2 mt-4">
            <button
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((p) => p - 1)}
              className="px-3 py-1 bg-cyan-50 text-cyan-600 rounded hover:bg-cyan-100 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Anterior
            </button>
            <span className="text-cyan-600 font-medium">
              Página {currentPage} de {totalPages}
            </span>
            <button
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage((p) => p + 1)}
              className="px-3 py-1 bg-cyan-50 text-cyan-600 rounded hover:bg-cyan-100 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Siguiente
            </button>
          </div>
        </>
      )}

      {!loading && !error && paginatedLeads.length === 0 && (
        <p className="text-gray-500">No hay leads registrados</p>
      )}
    </div>
  );
}
