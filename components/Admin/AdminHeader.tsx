"use client";

import { LogOut, Settings } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/useAuthStore";
import { useEffect } from "react";

export default function AdminHeader() {
  const { user, logout, checkAuthStatus } = useAuthStore();
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      checkAuthStatus();
    }
  }, [user, checkAuthStatus]);

  const handleLogout = () => {
    logout();
    router.push("/login");
  };

  return (
    <header className="fixed top-0 left-0 right-0 bg-white/95 backdrop-blur-md shadow-md z-50">
      <div className="px-10 flex items-center justify-between py-3">
        {/* Logo */}
        <Link
          href="/admin"
          className="flex items-center space-x-2 cursor-pointer"
        >
          <img
            src="/logoTop.png"
            alt="Logo Fotonube"
            className="w-9 h-8 rounded-full"
          />
          <span className="text-xl font-bold text-gray-900">
            FOTONUBE Admin
          </span>
        </Link>

        {/* Perfil + Logout */}
        <div className="flex items-center space-x-4">
          {/*   <Link
            href="/admin/settings"
            className="hidden lg:flex p-2 rounded-full hover:bg-gray-100"
          >
            <Settings className="w-5 h-5 text-gray-600" />
          </Link> */}

          <button
            onClick={handleLogout}
            className="hidden lg:flex items-center px-3 py-1.5 text-sm bg-gray-200 hover:bg-gray-300 rounded-md text-gray-800 transition-colors"
          >
            <LogOut className="w-4 h-4 mr-2" />
            Cerrar sesión
          </button>
        </div>
      </div>
    </header>
  );
}
