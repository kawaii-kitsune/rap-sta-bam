import { getArtists } from "@/content/artists";
import { getEpisodes } from "@/content/episodes";
import type { Artist, Episode } from "@/types/content";

const byEpisodeNumberDesc = (a: Episode, b: Episode) => b.number - a.number;
const byEpisodeNumberAsc = (a: Episode, b: Episode) => a.number - b.number;

export function getAllEpisodes(locale = "el"): Episode[] {
  return [...getEpisodes(locale)].sort(byEpisodeNumberDesc);
}

export function getPublishedEpisodes(locale = "el"): Episode[] {
  return getAllEpisodes(locale).filter((episode) => episode.status !== "draft" && isReleased(episode.publishedAt));
}

export function getVisibleEpisodes(locale = "el"): Episode[] {
  return getAllEpisodes(locale).filter((episode) => episode.status !== "draft");
}

export function getFeaturedEpisodes(locale = "el"): Episode[] {
  return getAllEpisodes(locale).filter((episode) => episode.featured);
}

export function getLatestEpisode(locale = "el"): Episode {
  return getPublishedEpisodes(locale)[0] ?? getVisibleEpisodes(locale)[0] ?? getAllEpisodes(locale)[0];
}

export function getEpisodeBySlug(slug: string, locale = "el"): Episode | undefined {
  return getEpisodes(locale).find((episode) => episode.slug === slug);
}

export function getAdjacentEpisodes(slug: string, locale = "el"): { previous?: Episode; next?: Episode } {
  const ordered = getVisibleEpisodes(locale).sort(byEpisodeNumberAsc);
  const index = ordered.findIndex((episode) => episode.slug === slug);

  return {
    previous: index > 0 ? ordered[index - 1] : undefined,
    next: index >= 0 && index < ordered.length - 1 ? ordered[index + 1] : undefined
  };
}

export function getAllArtists(locale = "el"): Artist[] {
  return [...getArtists(locale)].sort((a, b) => a.name.localeCompare(b.name, locale));
}

export function getFeaturedArtists(locale = "el"): Artist[] {
  return getAllArtists(locale).filter((artist) => artist.featured);
}

export function getGuestArtists(locale = "el"): Artist[] {
  return getAllArtists(locale).filter((artist) => (artist.kind ?? "guest") === "guest");
}

export function getTeamArtists(locale = "el"): Artist[] {
  return getAllArtists(locale).filter((artist) => artist.kind === "team");
}

export function getArtistBySlug(slug: string, locale = "el"): Artist | undefined {
  return getArtists(locale).find((artist) => artist.slug === slug);
}

export function getEpisodesByArtist(artistSlug: string, locale = "el"): Episode[] {
  return getVisibleEpisodes(locale).filter((episode) => episode.artistSlug === artistSlug || episode.credits.some((credit) => credit.artistSlug === artistSlug));
}

export function formatDate(date: string, locale = "el"): string {
  const intlLocale = locale === "en" ? "en-US" : "el-GR";
  return new Intl.DateTimeFormat(intlLocale, {
    day: "numeric",
    month: "long",
    year: "numeric"
  }).format(new Date(date));
}

export function formatGreekDate(date: string): string {
  return formatDate(date, "el");
}

export function getAthensDateKey(reference = new Date()): string {
  return new Intl.DateTimeFormat("en-CA", {
    day: "2-digit",
    month: "2-digit",
    timeZone: "Europe/Athens",
    year: "numeric"
  }).format(reference);
}

export function isReleased(date: string, reference = new Date()): boolean {
  return date <= getAthensDateKey(reference);
}

export function isEpisodeLive(episode: Episode, reference = new Date()): boolean {
  return episode.status !== "draft" && isReleased(episode.publishedAt, reference);
}

export function isValidHttpUrl(url?: string): url is string {
  if (!url) {
    return false;
  }

  try {
    const parsed = new URL(url);
    return parsed.protocol === "http:" || parsed.protocol === "https:";
  } catch {
    return false;
  }
}

export function youtubeThumbnail(videoId?: string, fallback = "/assets/episodes/episode-placeholder.svg"): string {
  return videoId ? `https://img.youtube.com/vi/${videoId}/hqdefault.jpg` : fallback;
}
