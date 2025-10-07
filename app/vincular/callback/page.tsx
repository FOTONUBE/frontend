// app/test/callback/page.tsx
import { Suspense } from "react";
import MpCallbackClient from "./MpCallbackClient";

export default function Page() {
  return (
    <Suspense
      fallback={
        <div className="h-screen w-full flex justify-center items-center">
          <p>Cargando...</p>
        </div>
      }
    >
      <MpCallbackClient />
    </Suspense>
  );
}
