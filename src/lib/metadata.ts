import type { Metadata } from "next";
import { siteConfig } from "@/config/site";

type MetadataInput = {
  title?: string;
  description?: string;
  path?: string;
  image?: string;
};

export function createMetadata({ title, description, path = "", image }: MetadataInput): Metadata {
  const resolvedTitle = title ? `${title} | ${siteConfig.name}` : siteConfig.name;
  const resolvedDescription = description ?? siteConfig.description;
  const url = `${siteConfig.baseUrl}${path}`;
  const resolvedImage = image ?? siteConfig.defaultOgImage;

  return {
    title: resolvedTitle,
    description: resolvedDescription,
    alternates: {
      canonical: url
    },
    openGraph: {
      title: resolvedTitle,
      description: resolvedDescription,
      url,
      siteName: siteConfig.name,
      locale: "el_GR",
      type: "website",
      images: [{ url: resolvedImage, alt: resolvedTitle }]
    },
    twitter: {
      card: "summary_large_image",
      title: resolvedTitle,
      description: resolvedDescription,
      images: [resolvedImage]
    }
  };
}
