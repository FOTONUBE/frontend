// components/ClientProgressProvider.tsx
"use client";

import React from "react";
import { ProgressProvider } from "@bprogress/next/app";

interface ClientProgressProps {
  children: React.ReactNode;
  height?: string;
  color?: string;
  options?: Record<string, any>;
  shallowRouting?: boolean;
}

export default function ClientProgressProvider({
  children,
  height = "4px",
  color = "#fffd00",
  options = { showSpinner: false },
  shallowRouting = true,
}: ClientProgressProps) {
  return (
    <ProgressProvider
      height={height}
      color={color}
      options={options}
      shallowRouting={shallowRouting}
    >
      {children}
    </ProgressProvider>
  );
}
