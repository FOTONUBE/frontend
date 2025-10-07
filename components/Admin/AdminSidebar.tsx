"use client";

import { motion } from "framer-motion";
import {
  BarChart2,
  Cloud,
  CreditCard,
  FileText,
  Mail,
  ShoppingCart,
  Users,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function AdminSidebar() {
  const pathname = usePathname();

  const adminLinks = [
    { href: "/admin/dashboard", text: "Dashboard", icon: BarChart2 },
    { href: "/admin/users", text: "Usuarios", icon: Users },
    { href: "/admin/newsletter", text: "Newsletter", icon: Mail },
    { href: "/admin/orders", text: "Pedidos", icon: ShoppingCart },
    { href: "/admin/photographers", text: "Fotógrafos", icon: CreditCard },
  ];

  return (
    <aside className="hidden md:flex fixed top-0 left-0 h-screen w-2/12 flex-col justify-between pb-16 bg-white border-r border-gray-200 pl-4">
      <nav className="flex flex-col px-4 space-y-6 pt-24">
        {adminLinks.map((link) => {
          const isActive = pathname.startsWith(link.href);
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

      {/* Footer con logo animado */}
      <div className="flex flex-col items-center">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: [0, -5, 0] }}
          transition={{ duration: 3, repeat: Infinity }}
          className="mb-4 flex justify-center"
        >
          <Cloud size={40} className="text-cyan-600" />
        </motion.div>

        <div className="p-3 mt-3 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-xl shadow-md text-center text-white text-sm font-semibold">
          Rick Admin
        </div>
      </div>
    </aside>
  );
}
