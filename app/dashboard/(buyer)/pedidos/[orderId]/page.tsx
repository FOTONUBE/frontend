"use client";

import { useBuyerStore } from "@/store/useBuyerStore";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import confetti from "canvas-confetti";

export default function OrderDetailPage() {
  const { orderId } = useParams<{ orderId: string }>();
  const { currentOrder, loading, loadOrderById, cancelOrder } = useBuyerStore();
  const router = useRouter();

  // Estado para disparar confetti solo una vez
  const [confettiFired, setConfettiFired] = useState(false);

  useEffect(() => {
    if (orderId) loadOrderById(orderId);
  }, [orderId]);

  useEffect(() => {
    if (currentOrder?.status === "approved" && !confettiFired) {
      // Disparar confetti después de que el componente ya esté montado y visible
      setTimeout(() => {
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 },
        });
        setConfettiFired(true);
      }, 700); // Pequeño delay para que se renderice todo
    }
  }, [currentOrder?.status, confettiFired]);

  if (loading)
    return <p className="p-6 text-center text-gray-600">Cargando orden...</p>;
  if (!currentOrder)
    return <p className="p-6 text-center text-gray-500">Orden no encontrada</p>;

  const handleCancel = async () => {
    if (!currentOrder) return;
    const confirm = window.confirm(
      "¿Estás seguro de que deseas cancelar esta orden?"
    );
    if (!confirm) return;

    await cancelOrder(currentOrder.id);
    router.push("/dashboard/pedidos");
  };

  const handlePay = async () => {
    if (!currentOrder) return;

    try {
      const res = await fetch(
        `https://backend-4bkl.onrender.com/api/buyer/orders/${currentOrder.id}/pay`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
        }
      );

      if (!res.ok) throw new Error("Error al generar la preferencia");

      const data = await res.json();
      window.location.href = data.init_point;
    } catch (err) {
      console.error(err);
      alert("Error al procesar el pago, intenta nuevamente.");
    }
  };

  return (
    <div className="container mx-auto px-4">
      {/* Título */}
      <h1 className="text-2xl font-extrabold mb-6 text-gray-900">
        Orden #{currentOrder.id}
      </h1>

      {/* Banner de éxito con animación */}
      {currentOrder.status === "approved" && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="bg-green-50 border border-green-200 rounded-xl p-6 mb-8 text-center shadow"
        >
          <h2 className="text-xl font-bold text-green-700 mb-2">
            ¡Tu pago fue confirmado! 🎉
          </h2>
          <p className="text-gray-700">
            Pronto recibirás una notificación del fotógrafo con la entrega de
            tus fotos. Mientras tanto, puedes revisar los detalles de tu pedido
            aquí.
          </p>
        </motion.div>
      )}

      {/* Info general en cards animadas */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0 }}
          className="bg-white shadow rounded-lg p-4 text-center"
        >
          <p className="text-sm text-gray-500">Álbum</p>
          <p className="font-semibold">{currentOrder.album.title}</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white shadow rounded-lg p-4 text-center"
        >
          <p className="text-sm text-gray-500">Fecha</p>
          <p className="font-semibold">
            {new Date(currentOrder.createdAt).toLocaleDateString("es-AR")}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white shadow rounded-lg p-4 text-center"
        >
          <p className="text-sm text-gray-500">Total</p>
          <p className="font-semibold">${currentOrder.total}</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white shadow rounded-lg p-4 text-center"
        >
          <p className="text-sm text-gray-500">Estado</p>
          <p
            className={`font-semibold ${
              currentOrder.status === "pending"
                ? "text-yellow-600"
                : currentOrder.status === "approved"
                ? "text-green-600"
                : "text-red-600"
            }`}
          >
            {currentOrder.status === "pending"
              ? "Pendiente"
              : currentOrder.status === "approved"
              ? "Pagado"
              : "Fallido"}
          </p>
        </motion.div>
      </div>

      {/* Acciones */}
      {currentOrder.status === "pending" && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="flex justify-center gap-6 mb-12"
        >
          <button
            onClick={handlePay}
            className="bg-blue-600 text-white py-3 px-8 rounded-lg hover:bg-blue-700 transition shadow"
          >
            Pagar con MercadoPago
          </button>
          <button
            onClick={handleCancel}
            className="bg-red-500 text-white py-3 px-8 rounded-lg hover:bg-red-600 transition shadow"
          >
            Cancelar Orden
          </button>
        </motion.div>
      )}

      {/* Fotos de la orden */}
      <h2 className="text-xl font-semibold mb-6 text-gray-900">
        Fotos de tu orden
      </h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
        {currentOrder.items.map((item: any, index: number) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            className="bg-white rounded-xl shadow hover:shadow-lg transition-transform transform hover:scale-105 p-4 flex flex-col items-center"
          >
            <img
              src={item.photo?.url}
              alt={`Foto ${item.photo?.id}`}
              className="w-full h-40 object-cover rounded-md"
            />

            <p className="text-sm font-medium text-gray-700 mb-1">
              Tamaño: {item.size}
            </p>
            <p className="text-sm text-gray-600 mb-1">
              Cantidad: {item.quantity}
            </p>
            <p className="text-sm font-semibold text-gray-800">
              ${item.subtotal}
            </p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
