// /app/payment/success/page.tsx
"use client";

import { Suspense } from "react";
import PaymentDetails from "@/components/MP/PaymentDetails";

export default function PaymentSuccessPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center mt-10">
      <Suspense fallback={<div>Cargando...</div>}>
        <PaymentDetails />
      </Suspense>
    </div>
  );
}
