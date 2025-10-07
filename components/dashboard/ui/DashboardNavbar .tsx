"use client";

import { useAuthStore } from "@/store/useAuthStore";
import { LogOut, Settings, Menu, X } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { NavbarLinks } from "../NavbarLinks/NavbarLinks";

export default function DashboardNavbar() {
  const { logout, user } = useAuthStore();
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    router.push("/login");
  };

  if (!user) return null;

  // Links según rol
  const photographerLinks = [
    { href: "/dashboard/newalbum", text: "Nuevo Álbum" },
    { href: "/dashboard/uploadphotos", text: "Subir Fotos" },
    { href: "/dashboard/albums", text: "Álbumes" },
    { href: "/dashboard/orders", text: "Pedidos" },
    { href: "/dashboard/subscription", text: "Suscripción" },
  ];

  const buyerLinks = [
    { href: "/dashboard/ver-album", text: "Ver Álbum" },
    { href: "/dashboard/como-comprar", text: "Cómo Comprar" },
    { href: "/dashboard/medios-de-pago", text: "Medios de Pago" },
    { href: "/dashboard/contacto", text: "Contacto" },
  ];

  const linksToShow =
    user.role === "photographer" ? photographerLinks : buyerLinks;

  return (
    <header className="fixed top-0 left-0 right-0 bg-white/95 backdrop-blur-md shadow-md z-50">
      <div className="container mx-auto flex items-center justify-between px-6 py-3">
        {/* Logo */}
        <Link href="/" className="flex items-center space-x-2 cursor-pointer">
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="flex items-center space-x-2"
          >
            <img
              src="/logoTop.png"
              alt="Logo Fotonube"
              className="w-9 h-8 rounded-full"
            />
            <span className="text-xl font-bold text-gray-900">FOTONUBE</span>
          </motion.div>
        </Link>

        {/* Desktop links */}
        <nav className="hidden md:block">
          <NavbarLinks links={linksToShow} />
        </nav>

        {/* Profile + Logout Desktop */}
        <div className="hidden md:flex items-center space-x-4">
          <motion.div
            whileHover={{ scale: 1.1 }}
            className="p-2 rounded-full cursor-pointer"
          >
            <Link href="/profile" title="Configuración">
              <Settings className="w-5 h-5 text-gray-600" />
            </Link>
          </motion.div>

          <motion.button
            onClick={handleLogout}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center px-3 py-1.5 text-sm bg-gray-200 hover:bg-gray-300 rounded-md text-gray-800 transition-colors"
            aria-label="Cerrar sesión"
          >
            <LogOut className="w-4 h-4 mr-2" />
            Cerrar sesión
          </motion.button>
        </div>

        {/* Mobile menu button */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-500"
          aria-label="Toggle menu"
        >
          {menuOpen ? (
            <X className="w-8 h-8 text-gray-900" />
          ) : (
            <Menu className="w-8 h-8 text-gray-900" />
          )}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.nav
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="md:hidden bg-white shadow-inner overflow-hidden"
          >
            <NavbarLinks
              links={linksToShow}
              containerClassName="flex flex-col space-y-3 px-6 py-4"
            />

            <div className="flex items-center space-x-4 px-6 py-4 border-t">
              <Link
                href="/profile"
                className="flex items-center space-x-2 text-gray-700 hover:text-cyan-600"
              >
                <Settings className="w-5 h-5" />
                <span>Configuración</span>
              </Link>

              <button
                onClick={() => {
                  setMenuOpen(false);
                  handleLogout();
                }}
                className="flex items-center px-3 py-1.5 text-sm bg-gray-200 hover:bg-gray-300 rounded-md text-gray-800 transition-colors"
              >
                <LogOut className="w-4 h-4 mr-2" />
                Cerrar sesión
              </button>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
