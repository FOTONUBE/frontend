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

export default function PaymentDetails({
  title,
  description,
  icon,
}: PaymentDetailsProps) {
  const searchParams = useSearchParams();
  const paymentId = searchParams.get("payment_id");
  const status = searchParams.get("status");
  // const externalRef = searchParams.get("external_reference");

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="rounded-2xl shadow-lg p-8 max-w-md text-center"
    >
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.3, type: "spring", stiffness: 150 }}
      >
        {icon}
      </motion.div>
      <h1 className="text-2xl font-bold text-gray-800 mb-2">{title}</h1>
      <p className="text-gray-600 mb-6">{description}</p>
      <div className="bg-gray-50 rounded-lg p-4 text-left mb-6 text-sm">
        <p>
          <span className="font-semibold">ID de pago: </span>
          {paymentId}
        </p>
        <p>
          <span className="font-semibold">Estado: </span> {status}
        </p>
        {/*       <p>
          <span className="font-semibold">Referencia:</span> {externalRef}
        </p> */}
      </div>
      <Link
        href={`/dashboard/pedidos`}
        className="inline-block px-6 py-3 rounded-xl bg-cyan-600 text-white font-semibold hover:bg-cyan-700 transition"
      >
        Ir a pedidos
      </Link>
    </motion.div>
  );
}
