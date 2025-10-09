"use client";
import { useAuthStore } from "@/store/useAuthStore";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function DashboardPage() {
  const { user } = useAuthStore();
  const router = useRouter();

  useEffect(() => {
    if (!user) return; // todavía no cargó
    if (user.role === "photographer") {
      router.replace("/dashboard/fotografo/general");
    } else {
      router.replace("/dashboard/comprador/ingresar-album");
    }
  }, [user]);

  return <p>Cargando...</p>;
}
