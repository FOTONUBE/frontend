"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useAuthStore } from "@/store/useAuthStore";

export default function MpSuccessPage() {
  const router = useRouter();
  const { logout } = useAuthStore();
  const [count, setCount] = useState(3);

  useEffect(() => {
    logout();

    if (count === 0) {
      router.replace("/login");
    } else {
      const timer = setTimeout(() => setCount((c) => c - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [count, logout, router]);

  return (
    <div className="h-full flex flex-col justify-center items-center">
      <div className="bg-white p-8 rounded-xl shadow-lg text-center space-y-4">
        <h1 className="text-2xl font-bold text-green-600">
          ✅ Cuenta vinculada correctamente
        </h1>
        <p className="text-gray-700">
          Para completar la vinculación, volvé a iniciar sesión. Redirigiendo en{" "}
          {count} segundos...
        </p>
        <button
          onClick={() => router.replace("/login")}
          className="mt-4 px-6 py-2 bg-cyan-600 text-white rounded-lg hover:bg-cyan-700 transition"
        >
          Ir ahora
        </button>
      </div>
    </div>
  );
}
