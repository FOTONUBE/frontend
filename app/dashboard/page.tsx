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
      router.replace("/dashboard/general");
    } else {
      router.replace("/dashboard/ingresar-album");
    }
  }, [user]);

  return <p>Cargando...</p>;
}
