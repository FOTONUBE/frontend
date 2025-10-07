import PaymentDetailsSubscription from "@/components/Subscription/PaymentDetailsSubscription";
import { CheckCircle } from "lucide-react";
import { Suspense } from "react";

export default function SubscriptionSuccessPage() {
  return (
    <div className="min-h-screen flex flex-col items-center">
      <Suspense
        fallback={<div>Cargando la información de tu suscripción...</div>}
      >
        <PaymentDetailsSubscription
          title="¡Suscripción activada!"
          description="Tu suscripción se ha procesado correctamente en FotoNube."
          icon={
            <CheckCircle className="text-green-500 w-16 h-16 mx-auto mb-4" />
          }
        />
      </Suspense>
    </div>
  );
}
