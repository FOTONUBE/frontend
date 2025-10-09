// components/dashboard/ui/SidebarPhotographer.tsx
"use client";

import { useAuthStore } from "@/store/useAuthStore";
import { motion } from "framer-motion";
import {
  Cloud,
  CreditCard,
  Folder,
  PlusSquare,
  ShoppingCart,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function SidebarPhotographer() {
  const { user } = useAuthStore();
  const pathname = usePathname();

  if (!user) return null;

  const links = [
    { href: "/dashboard/fotografo/general", text: "General", icon: Folder },
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

  return (
    <aside className="hidden md:flex fixed top-0 left-0 h-screen w-2/12 flex-col justify-between pb-16 bg-white border-r border-gray-200 pl-4">
      <nav className="flex flex-col px-4 space-y-6 pt-24">
        {links.map(({ href, text, icon: Icon }) => {
          const isActive = pathname === href;
          return (
            <Link
              key={href}
              href={href}
              className={`flex items-center gap-2 font-medium ${
                isActive
                  ? "text-cyan-600 border-l-4 border-cyan-600 pl-2 text-sm"
                  : "text-gray-500 hover:text-cyan-600 text-sm"
              }`}
            >
              <Icon size={20} />
              {text}
            </Link>
          );
        })}
      </nav>

      <div className="flex flex-col items-center space-y-3">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: [0, -5, 0] }}
          transition={{ duration: 3, repeat: Infinity }}
        >
          <Cloud size={36} className="text-cyan-600" />
        </motion.div>

        <div className="p-2 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-lg text-white text-sm font-semibold">
          FotoNube
        </div>
      </div>
    </aside>
  );
}
