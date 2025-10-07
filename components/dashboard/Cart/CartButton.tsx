"use client";

import Link from "next/link";
import { ShoppingCart } from "lucide-react";
import { useCartStore } from "@/store/useCartStore";

export const CartButton = () => {
  const items = useCartStore((state) => state.items);
  const totalQuantity = items.reduce((acc, i) => acc + i.quantity, 0);

  return (
    <Link
      href="/dashboard/cart"
      className="relative p-2 rounded-full hover:bg-gray-100"
    >
      <ShoppingCart className="w-6 h-6 text-gray-700" />
      {totalQuantity > 0 && (
        <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
          {totalQuantity}
        </span>
      )}
    </Link>
  );
};
