"use client";

import { useBuyerStore } from "@/store/useBuyerStore";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import confetti from "canvas-confetti";
import { ArrowLeft, CreditCard, XCircle } from "lucide-react";
import { toast } from "sonner";

export default function OrderDetailPage() {
  const { orderId } = useParams<{ orderId: string }>();
  const { currentOrder, loading, loadOrderById, cancelOrder } = useBuyerStore();
  const router = useRouter();
  const [confettiFired, setConfettiFired] = useState(false);
  const [showCancelModal, setShowCancelModal] = useState(false);

  useEffect(() => {
    if (orderId) loadOrderById(orderId);
  }, [orderId]);

  useEffect(() => {
    if (currentOrder?.status === "approved" && !confettiFired) {
      const timer = setTimeout(() => {
        confetti({ particleCount: 120, spread: 80, origin: { y: 0.6 } });
        setConfettiFired(true);
      }, 600);
      return () => clearTimeout(timer);
    }
  }, [currentOrder?.status, confettiFired]);

  if (loading)
    return <p className="p-6 text-center text-gray-600">Cargando orden...</p>;
  if (!currentOrder)
    return <p className="p-6 text-center text-gray-500">Orden no encontrada</p>;

  const handleCancel = async () => {
    try {
      await cancelOrder(currentOrder.id);
      setShowCancelModal(false);
      toast.success("Orden cancelada correctamente.");
      router.push("/dashboard/pedidos");
    } catch (error) {
      // console.error(error);
      toast.error("Error al cancelar la orden.");
    }
  };

  const handlePay = async () => {
    try {
      const backendUrl = process.env.NEXT_PUBLIC_API_URL;
      const res = await fetch(
        `${backendUrl}/buyer/orders/${currentOrder.id}/pay`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
        }
      );
      if (!res.ok) throw new Error("Error al generar el pago.");
      const data = await res.json();
      window.location.href = data.init_point;
    } catch (error) {
      console.error(error);
      alert("Error al procesar el pago.");
    }
  };

  const shortId = `${currentOrder.id.slice(0, 6)}...${currentOrder.id.slice(
    -4
  )}`;

  return (
    <div className="container mx-auto px-4 pb-10">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 mb-8">
        <h1 className="text-2xl font-bold text-gray-900">
          Orden <span className="text-cyan-600">#{shortId}</span>
        </h1>
        <button
          onClick={() => router.push("/dashboard/pedidos")}
          className="flex items-center gap-2 text-sm font-medium text-cyan-600 hover:text-cyan-700 transition"
        >
          <ArrowLeft size={16} />
          Volver a mis pedidos
        </button>
      </div>

      {/* Banner */}
      {currentOrder.status === "approved" && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4 }}
          className="bg-green-50 border border-green-200 rounded-2xl p-6 mb-8 text-center shadow-sm"
        >
          <h2 className="text-lg font-semibold text-green-700 mb-1">
            ¡Pago confirmado! 🎉
          </h2>
          <p className="text-gray-700 text-sm">
            El fotógrafo te contactará pronto con la entrega de tus fotos.
          </p>
        </motion.div>
      )}

      {/* Info cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-10">
        {[
          { label: "Álbum", value: currentOrder.album.title },
          {
            label: "Fecha",
            value: new Date(currentOrder.createdAt).toLocaleDateString("es-AR"),
          },
          { label: "Total", value: `$${currentOrder.total}` },
          {
            label: "Estado",
            value:
              currentOrder.status === "pending"
                ? "Pendiente"
                : currentOrder.status === "approved"
                ? "Pagado"
                : "Cancelado",
            color:
              currentOrder.status === "pending"
                ? "text-yellow-600"
                : currentOrder.status === "approved"
                ? "text-green-600"
                : "text-red-600",
          },
        ].map((info, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            className="bg-white shadow-sm border border-gray-100 rounded-2xl p-4 flex flex-col items-center justify-center text-center"
          >
            <p className="text-xs text-gray-500">{info.label}</p>
            <p
              className={`text-sm font-semibold ${
                info.color || "text-gray-800"
              }`}
            >
              {info.value}
            </p>
          </motion.div>
        ))}
      </div>

      {/* Buttons */}
      {currentOrder.status === "pending" && (
        <div className="flex flex-col sm:flex-row justify-center gap-4 mb-12">
          <button
            onClick={handlePay}
            className="flex items-center justify-center gap-2 bg-blue-600 text-white font-medium py-3 px-6 rounded-xl hover:bg-blue-700 shadow transition w-full sm:w-auto"
          >
            <CreditCard size={18} />
            Pagar con MercadoPago
          </button>
          <button
            onClick={() => setShowCancelModal(true)}
            className="flex items-center justify-center gap-2 bg-gray-100 text-gray-700 font-medium py-3 px-6 rounded-xl hover:bg-gray-200 shadow-sm transition w-full sm:w-auto"
          >
            <XCircle size={18} />
            Cancelar orden
          </button>
        </div>
      )}

      {/* Fotos */}
      <h2 className="text-lg font-semibold mb-4 text-gray-900">
        Fotos de tu orden
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 gap-6">
        {currentOrder.items.map((item: any, i: number) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            className="bg-white rounded-2xl shadow-sm hover:shadow-md transition overflow-hidden border"
          >
            <img
              src={item.photo?.url}
              alt={`Foto ${item.photo?.id}`}
              className="w-full h-40 object-cover"
            />
            <div className="p-3">
              <p className="text-sm font-medium text-gray-800 truncate">
                Tamaño: {item.size}
              </p>
              <p className="text-sm text-gray-600">Cantidad: {item.quantity}</p>
              <p className="text-sm font-semibold text-blue-600 mt-1">
                ${item.subtotal}
              </p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Cancel Modal */}
      {showCancelModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.2 }}
            className="w-10/12 mx-auto bg-white rounded-2xl p-6 max-w-sm text-center"
          >
            <h2 className="text-lg font-semibold text-gray-800 mb-4">
              ¿Deseas cancelar esta orden?
            </h2>
            <p className="text-gray-600 mb-6">
              Una vez cancelada, no podrás revertir la acción.
            </p>
            <div className="flex justify-center gap-4">
              <button
                onClick={handleCancel}
                className="text-sm px-6 py-3 bg-red-500 text-white rounded-xl font-semibold hover:bg-red-600 transition"
              >
                Sí, cancelar
              </button>
              <button
                onClick={() => setShowCancelModal(false)}
                className="text-sm px-6 py-3 bg-gray-100 text-gray-700 rounded-xl font-semibold hover:bg-gray-200 transition"
              >
                No, volver
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}
