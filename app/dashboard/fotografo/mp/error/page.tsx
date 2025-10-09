"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function MpErrorPage() {
  const router = useRouter();
  const [count, setCount] = useState(5);

  useEffect(() => {
    if (count === 0) {
      router.replace("/dashboard");
    } else {
      const timer = setTimeout(() => setCount((c) => c - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [count, router]);

  return (
    <div className="h-screen flex flex-col justify-center items-center">
      <div className="bg-white p-8 rounded-xl shadow-lg text-center space-y-4">
        <h1 className="text-2xl font-bold text-red-600">
          ❌ Error al vincular MercadoPago
        </h1>
        <p className="text-gray-700">
          Serás redirigido a tu perfil en {count} segundos...
        </p>
        <button
          onClick={() => router.replace("/dashboard")}
          className="mt-4 px-6 py-2 bg-cyan-600 text-white rounded-lg hover:bg-cyan-700 transition"
        >
          Ir ahora
        </button>
      </div>
    </div>
  );
}
