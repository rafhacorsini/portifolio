import type { Metadata } from "next";
import { IBM_Plex_Mono, Inter, Syne } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const ibmPlexMono = IBM_Plex_Mono({
  variable: "--font-ibm-mono",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
});

const syne = Syne({
  variable: "--font-syne",
  subsets: ["latin"],
});

import { LenisProvider } from "@/context/LenisContext";

export const metadata: Metadata = {
  title: "Rafhael Corsini — Creative Developer",
  description: "Portfolio",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="pt-BR"
      className={`${inter.variable} ${ibmPlexMono.variable} ${syne.variable} font-sans antialiased`}
    >
      <body className="min-h-screen flex flex-col">
        <LenisProvider>
          {children}
        </LenisProvider>
      </body>
    </html>
  );
}
