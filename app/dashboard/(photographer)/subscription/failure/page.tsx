import PaymentDetailsSubscription from "@/components/Subscription/PaymentDetailsSubscription";
import { XCircle } from "lucide-react";
import { Suspense } from "react";

export default function SubscriptionFailurePage() {
  return (
    <div className="min-h-screen flex flex-col items-center">
      <Suspense fallback={<div>Cargando...</div>}>
        <PaymentDetailsSubscription
          title="¡Pago fallido!"
          description="Hubo un problema procesando tu suscripción. Inténtalo de nuevo."
          icon={<XCircle className="text-red-500 w-16 h-16 mx-auto mb-4" />}
        />
      </Suspense>
    </div>
  );
}
