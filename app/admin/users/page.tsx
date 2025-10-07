"use client";

import { useEffect, useState } from "react";
import { useAuthStore } from "@/store/useAuthStore";
import { Users, Trash2, Key, UserCheck } from "lucide-react";
import { useAdminUserStore } from "@/store/admin/useAdminStore";

export default function AdminUsersPage() {
  const { user: admin } = useAuthStore();
  const { users, loading, fetchUsers, toggleUser, resetPassword } =
    useAdminUserStore();

  const [search, setSearch] = useState("");
  const [filterRole, setFilterRole] = useState<string | undefined>();
  const [loadingButtons, setLoadingButtons] = useState<{
    [key: string]: boolean;
  }>({});
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 10;

  useEffect(() => {
    if (admin && users.length === 0) {
      fetchUsers();
    }
  }, [admin]);

  const filteredUsers = users
    .filter((u) => u.role !== "SUPER_ADMIN")
    .filter(
      (u) =>
        u.email.toLowerCase().includes(search.toLowerCase()) ||
        (u.name?.toLowerCase().includes(search.toLowerCase()) ?? false)
    )
    .filter((u) => !filterRole || u.role === filterRole);

  const totalPages = Math.max(
    Math.ceil(filteredUsers.length / usersPerPage),
    1
  );
  const paginatedUsers = filteredUsers.slice(
    (currentPage - 1) * usersPerPage,
    currentPage * usersPerPage
  );

  const handleToggleUser = async (id: string, status: boolean) => {
    setLoadingButtons((prev) => ({ ...prev, [id]: true }));
    try {
      await toggleUser(id, status);
    } finally {
      setLoadingButtons((prev) => ({ ...prev, [id]: false }));
    }
  };

  const handleResetPassword = async (email: string) => {
    setLoadingButtons((prev) => ({ ...prev, [email]: true }));
    try {
      await resetPassword(email);
    } finally {
      setLoadingButtons((prev) => ({ ...prev, [email]: false }));
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4 flex items-center gap-2 text-cyan-600">
        <Users /> Gestión de Usuarios
      </h1>

      {/* Filtros */}
      <div className="flex gap-4 mb-4">
        <input
          type="text"
          placeholder="Buscar por email o nombre"
          className="border border-gray-300 focus:border-cyan-600 focus:ring-1 focus:ring-cyan-600 px-3 py-2 rounded flex-1 transition"
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setCurrentPage(1);
          }}
        />
        <select
          value={filterRole}
          onChange={(e) => {
            setFilterRole(e.target.value || undefined);
            setCurrentPage(1);
          }}
          className="border border-gray-300 focus:border-cyan-600 focus:ring-1 focus:ring-cyan-600 px-3 py-2 rounded transition"
        >
          <option value="">Todos los roles</option>
          <option value="buyer">Comprador</option>
          <option value="photographer">Fotógrafo</option>
        </select>
      </div>

      {/* Tabla */}
      <div className="overflow-x-auto">
        <table className="w-full border border-gray-200 rounded shadow-sm">
          <thead className="bg-cyan-50">
            <tr>
              {["Email", "Nombre", "Rol", "Estado", "Acciones"].map((h) => (
                <th
                  key={h}
                  className="px-4 py-2 text-left text-cyan-600 font-medium"
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td
                  colSpan={5}
                  className="px-4 py-6 text-center text-cyan-600 font-medium"
                >
                  Cargando usuarios...
                </td>
              </tr>
            ) : paginatedUsers.length > 0 ? (
              paginatedUsers.map((u) => {
                const isButtonLoading =
                  !!loadingButtons[u.id] || !!loadingButtons[u.email];

                return (
                  <tr
                    key={u.id}
                    className="border-t hover:bg-gray-50 transition"
                  >
                    <td className="px-4 py-2">{u.email}</td>
                    <td className="px-4 py-2">{u.name || "-"}</td>
                    <td className="px-4 py-2 capitalize">{u.role}</td>
                    <td className="px-4 py-2">
                      <span
                        className={`px-2 py-1 rounded text-sm font-medium ${
                          u.isActive
                            ? "bg-green-100 text-green-800"
                            : "bg-red-100 text-red-800"
                        }`}
                      >
                        {u.isActive ? "Activo" : "Suspendido"}
                      </span>
                    </td>
                    <td className="px-4 py-2 flex gap-2 flex-wrap">
                      <button
                        disabled={!!loadingButtons[u.email]}
                        onClick={() => handleResetPassword(u.email)}
                        className={`flex items-center gap-1 px-2 py-1 rounded text-sm font-medium transition ${
                          loadingButtons[u.email]
                            ? "opacity-50 cursor-not-allowed bg-yellow-200"
                            : "bg-yellow-300 hover:bg-yellow-400"
                        }`}
                      >
                        {loadingButtons[u.email] ? (
                          "Cargando..."
                        ) : (
                          <>
                            <Key size={16} /> Resetear
                          </>
                        )}
                      </button>

                      <button
                        disabled={!!loadingButtons[u.id]}
                        onClick={() => handleToggleUser(u.id, !u.isActive)}
                        className={`flex items-center gap-1 px-2 py-1 rounded text-sm font-medium transition ${
                          u.isActive
                            ? "bg-red-300 hover:bg-red-400"
                            : "bg-cyan-600 text-white hover:bg-cyan-700"
                        } ${
                          loadingButtons[u.id]
                            ? "opacity-50 cursor-not-allowed"
                            : ""
                        }`}
                      >
                        {loadingButtons[u.id] ? (
                          "Cargando..."
                        ) : u.isActive ? (
                          <>
                            <Trash2 size={16} /> Suspender
                          </>
                        ) : (
                          <>
                            <UserCheck size={16} /> Activar
                          </>
                        )}
                      </button>
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td
                  colSpan={5}
                  className="px-4 py-6 text-center text-gray-500 font-medium"
                >
                  No se encontraron usuarios
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Paginado */}
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
    </div>
  );
}
