"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import React from "react";

interface PaymentDetailsProps {
  title: string;
  description: string;
  icon: React.ReactNode;
}

export default function PaymentDetailsSubscription({
  title,
  description,
  icon,
}: PaymentDetailsProps) {
  const searchParams = useSearchParams();
  const paymentId = searchParams.get("payment_id");
  const status = searchParams.get("status");
  const externalRef = searchParams.get("external_reference");

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="bg-white rounded-2xl shadow-md p-8 max-w-md w-full mx-auto text-center border border-gray-100"
    >
      {/* Icono */}
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.2, type: "spring", stiffness: 140 }}
        className="flex items-center justify-center w-16 h-16 mx-auto mb-4 rounded-xl bg-cyan-100 text-cyan-600"
      >
        {icon}
      </motion.div>

      {/* Título y descripción */}
      <h1 className="text-2xl font-bold text-gray-800 mb-2">{title}</h1>
      <p className="text-gray-600 mb-6">{description}</p>

      {/* Caja de detalles */}
      <div className="bg-gray-50 rounded-xl p-4 text-left mb-6 text-sm border border-gray-100">
        <p className="mb-2">
          <span className="font-semibold text-gray-800">ID de pago: </span>{" "}
          {paymentId}
        </p>
        <p className="mb-2">
          <span className="font-semibold text-gray-800">Estado: </span>{" "}
          <span
            className={`px-2 py-1 rounded-lg text-xs font-medium ${
              status === "approved"
                ? "bg-green-100 text-green-700"
                : status === "pending"
                ? "bg-yellow-100 text-yellow-700"
                : "bg-red-100 text-red-700"
            }`}
          >
            {status}
          </span>
        </p>
        {/*   <p>
          <span className="font-semibold text-gray-800">Referencia:</span>{" "}
          {externalRef}
        </p> */}
      </div>

      {/* Botón CTA */}
      <Link
        href={`/dashboard/general`}
        className="inline-block px-6 py-3 rounded-xl bg-cyan-600 text-white font-semibold shadow-sm hover:bg-cyan-700 transition"
      >
        Ir al Dashboard
      </Link>
    </motion.div>
  );
}
