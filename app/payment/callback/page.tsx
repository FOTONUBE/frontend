// app/payment/callback/page.tsx
import MpCallbackLogic from "@/components/MP/MPCAllbackLogic";
import { Suspense } from "react";

export default function MpCallbackPage() {
  return (
    <div className="h-screen flex justify-center items-center">
      <Suspense fallback={<p>Cargando...</p>}>
        <MpCallbackLogic />
      </Suspense>
    </div>
  );
}
