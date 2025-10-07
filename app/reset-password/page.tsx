"use client";

import ResetPasswordForm from "@/components/ResetPassword/ResetPasswordForm";
import { Suspense } from "react";

export default function ResetPasswordPageWrapper() {
  return (
    <Suspense fallback={<div>Cargando...</div>}>
      <ResetPasswordForm />
    </Suspense>
  );
}
