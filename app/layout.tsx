import HomeLayoutWrapper from "@/components/HomeLayoutWrapper/HomeLayoutWrapper";
import ClientProgressProvider from "@/components/ProviderProgressBar/ProviderProgressBar";
import type { Metadata } from "next";
import { Rubik } from "next/font/google";
import { Toaster } from "sonner";
import { SpeedInsights } from "@vercel/speed-insights/next";

import "./globals.css";

const rubik = Rubik({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-rubik",
});

export const metadata: Metadata = {
  title: "FotoNube",
  description: "Hecho con amor por la comunidad de FotoNube",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={rubik.variable}>
      <head>
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body className="font-sans">
        <ClientProgressProvider
          height="4px"
          color="#06b6d4"
          options={{ showSpinner: false }}
          shallowRouting
        >
          <Toaster />
          <HomeLayoutWrapper>
            {children}
            <SpeedInsights />
          </HomeLayoutWrapper>
        </ClientProgressProvider>
      </body>
    </html>
  );
}
