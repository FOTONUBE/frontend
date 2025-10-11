"use client";

import Image from "next/image";
import { Trash2 } from "lucide-react";
import { useCartStore } from "@/store/useCartStore";
import React from "react";

export const CartTable = () => {
  const { items, removeItem, updateQuantity } = useCartStore();

  if (items.length === 0) {
    return (
      <div className="text-center py-12 text-gray-600">
        <p className="text-lg mb-4">Tu carrito está vacío 🛒</p>
        <a
          href="/dashboard/comprador/ver-album"
          className="inline-block bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
        >
          Explorar fotos
        </a>
      </div>
    );
  }

  return (
    <div className="grid gap-4 sm:gap-6">
      {items.map((item) => (
        <div
          key={item.cartItemId}
          className="flex flex-col sm:flex-row items-center sm:items-start justify-between gap-4 border rounded-lg bg-white p-4 shadow-sm hover:shadow-md transition"
        >
          {/* Imagen */}
          <div className="flex-shrink-0">
            <Image
              src={item.image}
              alt={item.title}
              width={100}
              height={100}
              className="rounded-md object-cover w-56 h-36 sm:w-28 sm:h-28"
            />
          </div>

          {/* Info del producto */}
          <div className="flex-1 w-full sm:w-auto text-center sm:text-left">
            <h3 className="font-semibold text-gray-800">{item.title}</h3>
            <p className="text-sm text-gray-500 mb-2">
              Precio unitario: ${item.unitPrice.toFixed(2)}
            </p>

            {/* Cantidad */}
            <div className="flex items-center justify-center sm:justify-start gap-2 mt-2">
              <label className="text-sm text-gray-700">Cantidad:</label>
              <input
                type="number"
                min={1}
                value={item.quantity}
                onChange={(e) =>
                  updateQuantity(item.cartItemId, Number(e.target.value))
                }
                className="w-16 border rounded-md p-1 text-center focus:ring focus:ring-blue-300"
              />
            </div>
          </div>

          {/* Total + acciones */}
          <div className="flex flex-col items-center sm:items-end justify-between h-full">
            <p className="font-semibold text-gray-800 mb-2">
              Total: ${(item.unitPrice * item.quantity).toFixed(2)}
            </p>

            <button
              onClick={() => removeItem(item.cartItemId)}
              className="flex items-center gap-1 text-red-500 hover:text-red-700 transition text-sm"
            >
              <Trash2 className="w-4 h-4" />
              Eliminar
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};
