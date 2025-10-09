"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useEffect } from "react";
import { useMpStore } from "@/store/useMPStore";

export default function MpCallbackClient() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { linkAccount, status, clear } = useMpStore();

  useEffect(() => {
    const code = searchParams.get("code");

    if (!code) {
      router.replace("/dashboard/fotografo/mp/error");
      return;
    }

    const handleLink = async () => {
      await linkAccount(code);

      if (useMpStore.getState().status === "success") {
        router.replace("/dashboard/fotografo/mp/success");
      } else {
        router.replace("/dashboard/fotografo/mp/error");
      }

      clear();
    };

    handleLink();
  }, [searchParams, linkAccount, router, clear]);

  return (
    <div className="h-screen w-full flex justify-center items-center">
      <p>Procesando vinculación con MercadoPago...</p>
    </div>
  );
}
