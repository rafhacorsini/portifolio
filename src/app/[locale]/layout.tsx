import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { hasLocale, NextIntlClientProvider } from "next-intl";
import { IBM_Plex_Mono, Inter, Syne } from "next/font/google";
import "../globals.css";

import { routing } from "@/i18n/routing";
import { LenisProvider } from "@/context/LenisContext";

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

const SITE_METADATA = {
  pt: {
    title: "Rafhael Corsini — Creative Developer",
    description:
      "Portfólio de Rafhael Corsini, desenvolvedor criativo especializado em design de interface, motion e experiências digitais imersivas.",
    locale: "pt_BR",
  },
  en: {
    title: "Rafhael Corsini — Creative Developer",
    description:
      "Portfolio of Rafhael Corsini, a creative developer specializing in interface design, motion and immersive digital experiences.",
    locale: "en_US",
  },
} as const;

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const meta = hasLocale(routing.locales, locale) ? SITE_METADATA[locale] : SITE_METADATA.pt;
  const path = locale === routing.defaultLocale ? "" : `/${locale}`;

  return {
    metadataBase: new URL("https://www.rcorsini.com"),
    title: meta.title,
    description: meta.description,
    alternates: {
      canonical: path || "/",
      languages: {
        pt: "/",
        en: "/en",
        "x-default": "/",
      },
    },
    openGraph: {
      title: meta.title,
      description: meta.description,
      url: `https://www.rcorsini.com${path}`,
      siteName: "Rafhael Corsini",
      locale: meta.locale,
      type: "website",
    },
    twitter: {
      card: "summary",
      title: meta.title,
      description: meta.description,
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>) {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  return (
    <html
      lang={locale}
      className={`${inter.variable} ${ibmPlexMono.variable} ${syne.variable} font-sans antialiased`}
    >
      <body className="min-h-screen flex flex-col">
        <NextIntlClientProvider>
          <LenisProvider>
            {children}
          </LenisProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
