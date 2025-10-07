"use client";

import { usePathname } from "next/navigation";
import Header from "@/components/header";
import Footer from "@/components/footer";

export default function HomeLayoutWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isDashboardOrAdmin =
    pathname.startsWith("/dashboard") || pathname.startsWith("/admin");

  return (
    <>
      {!isDashboardOrAdmin && <Header />}
      {children}
      {/* <Footer /> */}
      {!isDashboardOrAdmin && <Footer />}
    </>
  );
}
