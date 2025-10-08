"use client";

import DashboardHeader from "@/components/dashboard/DashboardHeader/DashboardHeader";
import DashboardSidebar from "@/components/dashboard/Sidebar/Sidebar";
import { useAuthStore } from "@/store/useAuthStore";
import { AlertCircle } from "lucide-react";

type Props = {
  children: React.ReactNode;
};

export default function DashboardLayout({ children }: Props) {
  const { user } = useAuthStore();

  const needsOnboarding =
    user?.role === "photographer" &&
    (!user.name ||
      !user.phone ||
      !user.paymentAccounts?.some(
        (acc) => acc.provider === "mercadopago" && acc.accessToken
      ));

  return (
    <div className="flex flex-col h-screen">
      <DashboardHeader />
      {!needsOnboarding && <DashboardSidebar />}
      <main
        className={`flex-1 p-6 overflow-y-auto min-h-screen pt-24 ${
          !needsOnboarding ? "md:ml-[16.6667%]" : ""
        }`}
      >
        {/* Sticky onboarding alert */}
        {needsOnboarding && (
          <div className="sticky top-4 z-50 mb-4 bg-yellow-100 border-l-4 border-yellow-500 text-yellow-800 p-4 rounded shadow-md flex items-center gap-2">
            <AlertCircle className="w-5 h-5" />
            <span>
              Debes completar todos tus datos (nombre, teléfono y cuenta de
              MercadoPago) para poder continuar...
            </span>
          </div>
        )}

        {children}
      </main>
    </div>
  );
}
