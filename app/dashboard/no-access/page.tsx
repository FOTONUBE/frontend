// app/dashboard/no-access/page.tsx
"use client";

import Link from "next/link";

export default function NoAccessPage() {
  return (
    <div className="flex flex-col items-center justify-center h-screen text-center px-6">
      <h1 className="text-4xl font-bold mb-4 text-red-600">
        🚫 Acceso Denegado
      </h1>
      <p className="text-gray-700 mb-6">
        No tenés permisos para acceder a esta sección.
      </p>
      <Link
        href="/dashboard"
        className="bg-cyan-600 text-white px-6 py-3 rounded-lg hover:bg-cyan-700 transition"
      >
        Volver al Dashboard
      </Link>
    </div>
  );
}
