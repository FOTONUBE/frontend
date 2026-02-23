"use client";

import { motion } from "framer-motion";
import { CreditCard, Download, Image, ShoppingCart, Users } from "lucide-react";

const steps = [
  {
    title: "Accede al álbum",
    description:
      "Usa tu usuario y contraseña proporcionados para ingresar al álbum.",
    icon: <Users className="w-10 h-10 text-cyan-600" />,
    color: "bg-cyan-50",
  },
  {
    title: "Explora y selecciona fotos",
    description:
      "Navega por las fotos disponibles y elige las que quieras comprar.",
    icon: <Image className="w-10 h-10 text-cyan-600" />,
    color: "bg-cyan-50",
  },
  {
    title: "Elige formato",
    description:
      "Selecciona entre foto digital o fotos impresas, en sus diferentes tamaños.",
    icon: <ShoppingCart className="w-10 h-10 text-cyan-600" />,
    color: "bg-cyan-50",
  },
  {
    title: "Finaliza tu compra",
    description:
      "Agrega al carrito tus fotos y completa la compra, abonando con Mercado Pago.",
    icon: <CreditCard className="w-10 h-10 text-cyan-600" />,
    color: "bg-cyan-50",
  },
  {
    title: "Recibe tus fotos",
    description: "Coordina con tu fotógrafo el método de envío de las fotos que compraste.",
    icon: <Download className="w-10 h-10 text-cyan-600" />,
    color: "bg-cyan-50",
  },
];

export default function HowToBuyPage() {
  return (
    <div className="px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
      <h1 className="text-3xl font-extrabold text-gray-900 text-center mb-12">
        Como comprar fotos en FOTONUBE
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {steps.map((step, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1, duration: 0.5 }}
            className={`rounded-2xl p-6 ${step.color} shadow hover:shadow-lg transition`}
          >
            <div className="flex items-center justify-center mb-4">
              {step.icon}
            </div>
            <h2 className="text-xl font-semibold text-gray-900 mb-2">
              {step.title}
            </h2>
            <p className="text-gray-700 text-sm">{step.description}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
