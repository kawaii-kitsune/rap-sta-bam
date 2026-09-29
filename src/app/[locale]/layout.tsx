import type { Metadata } from "next";
import { IBM_Plex_Sans, JetBrains_Mono, Roboto_Condensed } from "next/font/google";
import Script from "next/script";
import { ConsentManager } from "@/components/ConsentManager";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { defaultLocale, locales } from "@/config/i18n";
import { siteConfig } from "@/config/site";
import "../globals.css";

const display = Roboto_Condensed({
  subsets: ["latin", "greek"],
  weight: "700",
  variable: "--font-display"
});

const body = IBM_Plex_Sans({
  subsets: ["latin", "greek"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-body"
});

const mono = JetBrains_Mono({
  subsets: ["latin", "greek"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-mono"
});

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s | ${siteConfig.name}`
  },
  description: siteConfig.description,
  metadataBase: new URL(siteConfig.baseUrl),
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "32x32" },
      { url: "/icon-192.png", type: "image/png", sizes: "192x192" }
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" }]
  },
  openGraph: {
    title: siteConfig.name,
    description: siteConfig.description,
    locale: "el_GR",
    siteName: siteConfig.name,
    type: "website",
    images: [{ url: siteConfig.defaultOgImage, alt: siteConfig.name }]
  },
  twitter: {
    card: "summary_large_image",
    images: [siteConfig.defaultOgImage]
  }
};

export default async function RootLayout({
  children,
  params
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale = defaultLocale } = await params;
  const isEn = locale === "en";

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CreativeWorkSeries",
    name: siteConfig.name,
    description: isEn
      ? "Independent DIY hip-hop documentary and studio session series from Heraklion, Crete."
      : siteConfig.description,
    inLanguage: locale,
    locationCreated: {
      "@type": "Place",
      name: siteConfig.location
    }
  };

  return (
    <html lang={locale} className={`${display.variable} ${body.variable} ${mono.variable}`}>
      <body className="antialiased">
        <Script
          id="project-json-ld"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <a href="#main-content" className="skip-link">
          {isEn ? "Skip to content" : "Μετάβαση στο περιεχόμενο"}
        </a>
        <Header />
        <main id="main-content" tabIndex={-1}>
          {children}
        </main>
        <Footer locale={locale} />
        <ConsentManager />
      </body>
    </html>
  );
}
