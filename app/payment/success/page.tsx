// /app/payment/success/page.tsx
import { Suspense } from "react";
import { CheckCircle } from "lucide-react";
import PaymentDetails from "@/components/MP/PaymentDetails";

export default function PaymentSuccessPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <Suspense fallback={<div>Cargando la información de tu pago...</div>}>
        <PaymentDetails
          title="¡Pago exitoso!"
          description="Tu compra fue procesada correctamente en FotoNube."
          icon={
            <CheckCircle className="text-green-500 w-16 h-16 mx-auto mb-4" />
          }
        />
      </Suspense>
    </div>
  );
}
