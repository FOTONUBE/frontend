"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useEffect } from "react";
import { useMpStore } from "@/store/useMPStore";

export default function MpCallbackClient() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { linkAccount, status } = useMpStore();

  useEffect(() => {
    const code = searchParams.get("code");
    if (!code) {
      router.replace("/dashboard/mp/error");
      return;
    }
    linkAccount(code);
  }, [searchParams, linkAccount, router]);

  useEffect(() => {
    if (status === "success") {
      router.replace("/dashboard/mp/success");
    } else if (status === "error") {
      router.replace("/mp/error");
    }
  }, [status, router]);

  return (
    <div className="h-screen w-full flex justify-center items-center">
      <p>Procesando vinculación con MercadoPago...</p>
    </div>
  );
}
