// components/dashboard/ui/DashboardSidebar.tsx
"use client";

import { useState } from "react";
import Link from "next/link";
import { useAuthStore } from "@/store/useAuthStore";
import { usePathname, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  Cloud,
  PlusSquare,
  Folder,
  ShoppingCart,
  CreditCard,
  Key,
  FolderOpen,
  HelpCircle,
  Menu,
  X,
  User,
  LogOut,
  BarChart2,
} from "lucide-react";

export default function DashboardSidebar({ showLinks = true }) {
  // Hooks siempre al principio
  const { user, logout } = useAuthStore();
  const pathname = usePathname();
  const router = useRouter();
  const [open, setOpen] = useState(false);

  // Condición de renderizado después de los hooks
  if (!user || !showLinks) return null;

  const photographerLinks = [
    { href: "/dashboard/fotografo/general", text: "General", icon: BarChart2 },
    {
      href: "/dashboard/fotografo/newalbum",
      text: "Nuevo Álbum",
      icon: PlusSquare,
    },
    { href: "/dashboard/fotografo/albums", text: "Álbumes", icon: Folder },
    {
      href: "/dashboard/fotografo/orders",
      text: "Pedidos",
      icon: ShoppingCart,
    },
    {
      href: "/dashboard/fotografo/subscription",
      text: "Suscripción",
      icon: CreditCard,
    },
  ];

  const buyerLinks = [
    {
      href: "/dashboard/comprador/ingresar-album",
      text: "Acceder a Álbum",
      icon: Key,
    },
    {
      href: "/dashboard/comprador/ver-album",
      text: "Mis Álbumes",
      icon: FolderOpen,
    },
    {
      href: "/dashboard/comprador/como-comprar",
      text: "Cómo Comprar",
      icon: HelpCircle,
    },
    {
      href: "/dashboard/comprador/pedidos",
      text: "Mis Compras",
      icon: ShoppingCart,
    },
  ];

  const linksToShow =
    user.role === "photographer" ? photographerLinks : buyerLinks;

  const handleLogout = () => {
    logout();
    router.push("/login");
  };

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="hidden md:flex fixed top-0 left-0 h-screen w-2/12 flex-col justify-between pb-16 bg-white border-r border-gray-200 pl-4">
        <nav className="flex flex-col px-4 space-y-6 pt-24">
          {linksToShow.map((link) => {
            const isActive = pathname === link.href;
            const Icon = link.icon;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`flex items-center gap-2 font-medium ${
                  isActive
                    ? "text-cyan-600 border-l-4 border-cyan-600 pl-2 text-sm"
                    : "text-gray-500 hover:text-cyan-600 text-sm"
                }`}
              >
                <Icon size={20} />
                {link.text}
              </Link>
            );
          })}
        </nav>

        {/* Logo + Ícono animado */}
        <div className="flex flex-col items-center">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: [0, -5, 0] }}
            transition={{ duration: 3, repeat: Infinity }}
            className="mb-4 flex justify-center"
          >
            <Cloud size={40} className="text-cyan-600" />
          </motion.div>

          <div className="p-3 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-xl shadow-md text-center text-white text-sm font-semibold">
            FotoNube
          </div>
        </div>
      </aside>

      {/* Mobile Hamburger */}
      <button
        onClick={() => setOpen(true)}
        className="md:hidden fixed top-3 left-6 z-50 bg-white p-2 rounded-md shadow-md"
      >
        <Menu size={24} />
      </button>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {open && (
          <>
            {/* Overlay */}
            <motion.div
              className="fixed inset-0 bg-black/40 z-40"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setOpen(false)}
            />
            {/* Drawer */}
            <motion.aside
              className="fixed top-0 left-0 h-full w-64 bg-white shadow-lg z-50 flex flex-col justify-between"
              initial={{ x: -300 }}
              animate={{ x: 0 }}
              exit={{ x: -300 }}
              transition={{ stiffness: 200, damping: 20 }}
            >
              {/* Close button */}
              <button
                onClick={() => setOpen(false)}
                className="absolute top-4 right-4 p-2 rounded-md hover:bg-gray-100"
              >
                <X size={24} />
              </button>

              {/* Links */}
              <nav className="flex flex-col px-6 space-y-6 pt-24">
                {linksToShow.map((link) => {
                  const isActive = pathname === link.href;
                  const Icon = link.icon;
                  return (
                    <Link
                      key={link.href}
                      href={link.href}
                      onClick={() => setOpen(false)}
                      className={`flex items-center gap-2 font-medium ${
                        isActive
                          ? "text-cyan-600 border-l-4 border-cyan-600 pl-2 text-sm"
                          : "text-gray-500 hover:text-cyan-600 text-sm"
                      }`}
                    >
                      <Icon size={20} />
                      {link.text}
                    </Link>
                  );
                })}
              </nav>

              {/* Footer con menú de usuario */}
              <div className="flex flex-col items-center pb-6 space-y-3">
                {/* Menú usuario */}
                <div className="w-full border-t pt-3 px-6">
                  <Link
                    href="/dashboard/profile"
                    onClick={() => setOpen(false)}
                    className="flex items-center gap-2 px-2 py-2 rounded-md hover:bg-gray-100 text-gray-700 text-sm"
                  >
                    <User size={18} />
                    Mi perfil
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="flex items-center gap-2 px-2 py-2 rounded-md hover:bg-gray-100 text-gray-700 text-sm w-full text-left"
                  >
                    <LogOut size={18} />
                    Cerrar sesión
                  </button>
                </div>

                {/* Logo animado */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: [0, -5, 0] }}
                  transition={{ duration: 3, repeat: Infinity }}
                  className="mb-2 flex justify-center"
                >
                  <Cloud size={36} className="text-cyan-600" />
                </motion.div>
                <div className="p-2 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-lg shadow-md text-center text-white text-sm font-semibold">
                  FotoNube
                </div>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
