import type { MetadataRoute } from "next";
import { locales } from "@/config/i18n";
import { siteConfig } from "@/config/site";
import { getAllArtists, getVisibleEpisodes } from "@/lib/content";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = siteConfig.baseUrl;
  const staticPaths = [
    "",
    "/episodes",
    "/artists",
    "/products",
    "/about",
    "/privacy",
    "/participate"
  ];
  const episodes = getVisibleEpisodes();
  const artists = getAllArtists();

  const entries: MetadataRoute.Sitemap = [];

  for (const locale of locales) {
    for (const route of staticPaths) {
      entries.push({
        url: `${base}/${locale}${route}`,
        lastModified: new Date(),
        alternates: {
          languages: {
            el: `${base}/el${route}`,
            en: `${base}/en${route}`
          }
        }
      });
    }

    for (const episode of episodes) {
      entries.push({
        url: `${base}/${locale}/episodes/${episode.slug}`,
        lastModified: new Date(episode.publishedAt),
        alternates: {
          languages: {
            el: `${base}/el/episodes/${episode.slug}`,
            en: `${base}/en/episodes/${episode.slug}`
          }
        }
      });
    }

    for (const artist of artists) {
      entries.push({
        url: `${base}/${locale}/artists/${artist.slug}`,
        lastModified: new Date(),
        alternates: {
          languages: {
            el: `${base}/el/artists/${artist.slug}`,
            en: `${base}/en/artists/${artist.slug}`
          }
        }
      });
    }
  }

  return entries;
}
