"use client";

import { useRouter } from "next/navigation";

export function NavbarFotografo() {
  const router = useRouter();

  return (
    <nav className="bg-white border-b p-4 flex justify-between items-center">
      <div className="flex items-center gap-2">
        <img src="/logo.svg" alt="Fotonube Logo" className="h-8" />
        <span className="font-bold text-lg">FOTONUBE</span>
      </div>

      <div className="flex items-center gap-2">
        <button className="bg-gray-200 px-4 py-2 rounded">
          Iniciar Sesión
        </button>
        <button className="bg-gray-400 text-white px-4 py-2 rounded">
          Cerrar Sesión
        </button>
        <div className="w-5 h-5 bg-blue-600 rounded-full flex justify-center items-center text-white text-xs">
          ⚙️
        </div>
      </div>

      <div className="absolute left-0 w-full bg-cyan-600 py-3 mt-4 flex justify-center gap-3">
        <button className="bg-gray-700 text-white px-4 py-2 rounded">
          Nuevo Álbum
        </button>
        <button className="bg-white px-4 py-2 rounded">Subir Fotos</button>
        <button className="bg-white px-4 py-2 rounded">Álbumes</button>
        <button className="bg-white px-4 py-2 rounded">Pedidos</button>
        <button className="bg-white px-4 py-2 rounded">Suscripción</button>
      </div>
    </nav>
  );
}
