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
  metadataBase: new URL("https://www.rcorsini.com"),
  title: "Rafhael Corsini — Creative Developer",
  description:
    "Portfolio of Rafhael Corsini, a creative developer specializing in interface design, motion and immersive digital experiences.",
  openGraph: {
    title: "Rafhael Corsini — Creative Developer",
    description:
      "Portfolio of Rafhael Corsini, a creative developer specializing in interface design, motion and immersive digital experiences.",
    url: "https://www.rcorsini.com",
    siteName: "Rafhael Corsini",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Rafhael Corsini — Creative Developer",
    description:
      "Portfolio of Rafhael Corsini, a creative developer specializing in interface design, motion and immersive digital experiences.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
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
