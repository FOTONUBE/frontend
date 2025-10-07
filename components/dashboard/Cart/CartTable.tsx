"use client";

import Image from "next/image";
import { Trash2 } from "lucide-react";
import { useCartStore } from "@/store/useCartStore";
import React from "react";

export const CartTable = () => {
  const { items, removeItem, updateQuantity } = useCartStore();

  if (items.length === 0) {
    return <p className="text-center text-gray-600">Tu carrito está vacío</p>;
  }

  return (
    <table className="w-full border-collapse">
      <thead>
        <tr className="text-left border-b text-sm">
          <th className="p-2 text-sm">Foto</th>
          <th className="p-2 text-sm">Producto</th>
          <th className="p-2 text-sm">Precio</th>
          <th className="p-2 text-sm">Cantidad</th>
          <th className="p-2 text-sm">Total</th>
          <th className="p-2 text-sm"></th>
        </tr>
      </thead>
      <tbody>
        {items.map((item) => (
          <tr key={item.cartItemId} className="border-b">
            <td className="p-2">
              <Image
                src={item.image}
                alt={item.title}
                width={60}
                height={60}
                className="rounded w-16 h-16"
              />
            </td>
            <td className="p-2 text-sm">{item.title}</td>
            <td className="p-2 text-sm">${item.unitPrice.toFixed(2)}</td>
            <td className="p-2 text-sm">
              <input
                type="number"
                min={1}
                value={item.quantity}
                onChange={(e) =>
                  updateQuantity(item.cartItemId, Number(e.target.value))
                }
                className="w-16 border rounded p-1 text-center"
              />
            </td>
            <td className="p-2 text-sm">
              ${(item.unitPrice * item.quantity).toFixed(2)}
            </td>
            <td className="p-2">
              <button
                onClick={() => removeItem(item.cartItemId)}
                className="text-red-500 hover:text-red-700"
              >
                <Trash2 className="w-5 h-5" />
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
