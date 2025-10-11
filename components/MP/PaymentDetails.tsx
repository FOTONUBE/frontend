"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { CheckCircle, XCircle, AlertTriangle } from "lucide-react";

interface PaymentDetailsProps {
  title?: string;
  description?: string;
  icon?: React.ReactNode;
  statusOverride?: string;
}

const STATUS_MAP = {
  approved: {
    title: "¡Pago exitoso!",
    description: "Tu compra fue procesada correctamente en FotoNube.",
    icon: <CheckCircle className="w-16 h-16 mx-auto mb-4" />,
    color: "text-green-500",
  },
  pending: {
    title: "Pago pendiente",
    description:
      "El pago todavía no se ha completado. Por favor, revisa tu método de pago.",
    icon: <AlertTriangle className="w-16 h-16 mx-auto mb-4" />,
    color: "text-yellow-500",
  },
  failed: {
    title: "Pago fallido o información inválida",
    description:
      "No se pudo procesar tu pago. Por favor, contacta soporte o intenta nuevamente.",
    icon: <XCircle className="w-16 h-16 mx-auto mb-4" />,
    color: "text-red-500",
  },
  default: {
    title: "Estado desconocido",
    description: "No se pudo determinar el estado del pago.",
    icon: <AlertTriangle className="w-16 h-16 mx-auto mb-4" />,
    color: "text-gray-500",
  },
};

export default function PaymentDetails({
  title,
  description,
  icon,
  statusOverride,
}: PaymentDetailsProps) {
  const searchParams = useSearchParams();
  const paymentId = searchParams.get("payment_id");
  const statusFromParams = searchParams.get("status") || statusOverride;
  const status = statusFromParams as keyof typeof STATUS_MAP | undefined;

  const {
    title: mappedTitle,
    description: mappedDesc,
    icon: mappedIcon,
    color,
  } = STATUS_MAP[status || "default"];

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="rounded-2xl shadow-lg m-8 p-6 max-w-sm text-center bg-white"
    >
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.2, type: "spring", stiffness: 140 }}
        className={color}
      >
        {icon || mappedIcon}
      </motion.div>

      <h1 className="text-2xl font-bold text-gray-800 mb-2">
        {title || mappedTitle}
      </h1>
      <p className="text-gray-600 mb-6">{description || mappedDesc}</p>

      <div className="bg-gray-50 rounded-lg p-4 text-left mb-6 text-sm">
        <p>
          <span className="font-semibold">ID de pago: </span>
          {paymentId || "No disponible"}
        </p>
        <p>
          <span className="font-semibold">Estado: </span>
          {statusFromParams || "Desconocido"}
        </p>
      </div>

      <div className="flex justify-center gap-4">
        <Link
          href={`/dashboard/comprador/pedidos`}
          className="inline-block px-6 py-3 rounded-xl bg-cyan-600 text-white font-semibold hover:bg-cyan-700 transition"
        >
          Ir a pedidos
        </Link>
      </div>
    </motion.div>
  );
}
