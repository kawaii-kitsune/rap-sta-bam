import type { Metadata } from "next";
import { defaultLocale, locales } from "@/config/i18n";
import { siteConfig } from "@/config/site";

type MetadataInput = {
  title?: string;
  description?: string;
  path?: string;
  image?: string;
  locale?: string;
  audio?: {
    url: string;
    type?: string;
  };
};

export function createMetadata({
  title,
  description,
  path = "",
  image,
  locale = defaultLocale,
  audio
}: MetadataInput): Metadata {
  const isEn = locale === "en";
  const siteName = isEn ? "Rap Sta Bam" : siteConfig.name;
  const resolvedTitle = title ? `${title} | ${siteName}` : siteName;
  const resolvedDescription =
    description ??
    (isEn
      ? "Independent DIY hip-hop documentary and studio session series from Heraklion, Crete."
      : siteConfig.description);

  const cleanPath = path.replace(/^\/(el|en)/, "");
  const canonicalUrl = `${siteConfig.baseUrl}/${locale}${cleanPath}`;
  const resolvedImage = image ?? siteConfig.defaultOgImage;

  const languages: Record<string, string> = {};
  locales.forEach((loc) => {
    languages[loc] = `${siteConfig.baseUrl}/${loc}${cleanPath}`;
  });
  languages["x-default"] = `${siteConfig.baseUrl}/el${cleanPath}`;

  return {
    title: resolvedTitle,
    description: resolvedDescription,
    alternates: {
      canonical: canonicalUrl,
      languages
    },
    openGraph: {
      title: resolvedTitle,
      description: resolvedDescription,
      url: canonicalUrl,
      siteName,
      locale: isEn ? "en_US" : "el_GR",
      type: "website",
      images: [{ url: resolvedImage, alt: resolvedTitle }],
      ...(audio ? { audio: [{ url: audio.url, type: audio.type ?? "audio/mpeg" }] } : {})
    },
    twitter: {
      card: "summary_large_image",
      title: resolvedTitle,
      description: resolvedDescription,
      images: [resolvedImage]
    }
  };
}
