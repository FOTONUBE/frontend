// CartSummary.tsx
"use client";

import { useBuyerStore } from "@/store/useBuyerStore";
import { useCartStore } from "@/store/useCartStore";

import { useRouter } from "next/navigation";
import { toast } from "sonner";

export const CartSummary = () => {
  const { items, subtotal, clearCart } = useCartStore();
  const { createOrder } = useBuyerStore();
  const router = useRouter();

  const handleCheckout = async () => {
    if (items.length === 0) return;

    // 🔹 Validar que todas las fotos pertenezcan al mismo álbum
    const uniqueAlbumIds = [...new Set(items.map((i) => i.albumId))];
    if (uniqueAlbumIds.length > 1) {
      toast.error(
        "No puedes mezclar fotos de distintos álbumes en una orden ❌"
      );
      return;
    }

    const albumId = uniqueAlbumIds[0]; // único álbum permitido

    const payloadItems = items.map((i) => ({
      photoId: i.photoId,
      size: i.size,
      quantity: i.quantity,
      unitPrice: i.unitPrice,
    }));

    // ✅ createOrder devuelve la orden creada o undefined si falla
    const newOrder = await createOrder(albumId, payloadItems);

    if (!newOrder) return; // si algo falló, no hacemos nada más

    // 🔹 Borrar carrito y localStorage
    clearCart();

    // 🔹 Redirigir al checkout
    router.push(`/dashboard/comprador/pedidos/${newOrder.id}`);
  };

  return (
    <div className="p-6 border rounded-lg shadow-md bg-white w-full max-w-sm ml-auto">
      <h2 className="text-lg font-semibold mb-4">Resumen</h2>
      <p className="flex justify-between mb-2">
        <span className="text-sm">Subtotal:</span>
        <span className="text-sm">${subtotal().toFixed(2)}</span>
      </p>
      <p className="flex justify-between font-bold text-lg mb-4">
        <span className="text-base">Total:</span>
        <span className="text-base">${subtotal().toFixed(2)}</span>
      </p>
      <button
        onClick={handleCheckout}
        className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
      >
        Continuar compra
      </button>
      <button
        onClick={clearCart}
        className="w-full mt-3 bg-gray-200 text-gray-700 py-2 rounded-lg hover:bg-gray-300 transition"
      >
        Vaciar carrito
      </button>
    </div>
  );
};
