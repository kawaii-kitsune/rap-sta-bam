import type { MetadataRoute } from "next";
import { siteConfig } from "@/config/site";
import { getAllArtists, getVisibleEpisodes } from "@/lib/content";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = siteConfig.baseUrl;
  const staticRoutes = ["", "/episodes", "/artists", "/products", "/about", "/privacy"];

  return [
    ...staticRoutes.map((route) => ({
      url: `${base}${route}`,
      lastModified: new Date()
    })),
    ...getVisibleEpisodes().map((episode) => ({
      url: `${base}/episodes/${episode.slug}`,
      lastModified: new Date(episode.publishedAt)
    })),
    ...getAllArtists().map((artist) => ({
      url: `${base}/artists/${artist.slug}`,
      lastModified: new Date()
    }))
  ];
}
