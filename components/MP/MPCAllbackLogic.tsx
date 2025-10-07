"use client";

import { useMpStore } from "@/store/useMPStore";
import { useSearchParams } from "next/navigation";
import { useEffect } from "react";

export default function MpCallbackLogic() {
  const searchParams = useSearchParams();
  const { data, status, linkAccount } = useMpStore();

  useEffect(() => {
    const code = searchParams.get("code");
    if (!code) return;
    linkAccount(code);
  }, [searchParams, linkAccount]);

  if (status === "loading") {
    return <p className="text-lg">Procesando vinculación con MercadoPago...</p>;
  }

  if (status === "success") {
    return (
      <div>
        <h1 className="text-xl font-bold text-green-600">
          ✅ Tu cuenta de MercadoPago fue vinculada con éxito.
        </h1>
        <pre className="mt-4 bg-gray-100 p-2 rounded">
          {JSON.stringify(data, null, 2)}
        </pre>
      </div>
    );
  }

  if (status === "error") {
    return (
      <h1 className="text-xl font-bold text-red-600">
        ❌ Hubo un error al vincular tu cuenta de MercadoPago.
      </h1>
    );
  }

  return null;
}
