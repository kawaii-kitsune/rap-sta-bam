import type { Metadata } from "next";
import { IBM_Plex_Sans, Roboto_Condensed } from "next/font/google";
import Script from "next/script";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { siteConfig } from "@/config/site";
import "./globals.css";

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

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s | ${siteConfig.name}`
  },
  description: siteConfig.description,
  metadataBase: new URL(siteConfig.baseUrl),
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

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CreativeWorkSeries",
    name: siteConfig.name,
    description: siteConfig.description,
    inLanguage: "el",
    locationCreated: {
      "@type": "Place",
      name: siteConfig.location
    }
  };

  return (
    <html lang="el" className={`${display.variable} ${body.variable}`}>
      <body className="font-[var(--font-body)] antialiased">
        <Script
          id="project-json-ld"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <Header />
        <main id="main-content">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
