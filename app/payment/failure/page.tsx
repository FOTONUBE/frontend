import { Suspense } from "react";

import PaymentDetails from "@/components/MP/PaymentDetails";
import { XCircle } from "lucide-react";

export default function PaymentFailurePage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <Suspense fallback={<div>Cargando...</div>}>
        <PaymentDetails
          title="¡Pago fallido!"
          description="Hubo un problema procesando tu compra. Inténtalo de nuevo."
          icon={<XCircle className="text-red-500 w-16 h-16 mx-auto mb-4" />}
        />
      </Suspense>
    </div>
  );
}
