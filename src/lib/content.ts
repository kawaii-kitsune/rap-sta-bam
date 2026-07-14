import { artists } from "@/content/artists";
import { episodes } from "@/content/episodes";
import type { Artist, Episode } from "@/types/content";

const byEpisodeNumberDesc = (a: Episode, b: Episode) => b.number - a.number;
const byEpisodeNumberAsc = (a: Episode, b: Episode) => a.number - b.number;

export function getAllEpisodes(): Episode[] {
  return [...episodes].sort(byEpisodeNumberDesc);
}

export function getPublishedEpisodes(): Episode[] {
  return getAllEpisodes().filter((episode) => episode.status === "published" && isReleased(episode.publishedAt));
}

export function getVisibleEpisodes(): Episode[] {
  return getAllEpisodes().filter((episode) => episode.status !== "draft");
}

export function getFeaturedEpisodes(): Episode[] {
  return getAllEpisodes().filter((episode) => episode.featured);
}

export function getLatestEpisode(): Episode {
  return getPublishedEpisodes()[0] ?? getVisibleEpisodes()[0] ?? getAllEpisodes()[0];
}

export function getEpisodeBySlug(slug: string): Episode | undefined {
  return episodes.find((episode) => episode.slug === slug);
}

export function getAdjacentEpisodes(slug: string): { previous?: Episode; next?: Episode } {
  const ordered = getVisibleEpisodes().sort(byEpisodeNumberAsc);
  const index = ordered.findIndex((episode) => episode.slug === slug);

  return {
    previous: index > 0 ? ordered[index - 1] : undefined,
    next: index >= 0 && index < ordered.length - 1 ? ordered[index + 1] : undefined
  };
}

export function getAllArtists(): Artist[] {
  return [...artists].sort((a, b) => a.name.localeCompare(b.name, "el"));
}

export function getFeaturedArtists(): Artist[] {
  return getAllArtists().filter((artist) => artist.featured);
}

export function getGuestArtists(): Artist[] {
  return getAllArtists().filter((artist) => (artist.kind ?? "guest") === "guest");
}

export function getTeamArtists(): Artist[] {
  return getAllArtists().filter((artist) => artist.kind === "team");
}

export function getArtistBySlug(slug: string): Artist | undefined {
  return artists.find((artist) => artist.slug === slug);
}

export function getEpisodesByArtist(artistSlug: string): Episode[] {
  return getVisibleEpisodes().filter((episode) => episode.artistSlug === artistSlug || episode.credits.some((credit) => credit.artistSlug === artistSlug));
}

export function formatGreekDate(date: string): string {
  return new Intl.DateTimeFormat("el-GR", {
    day: "numeric",
    month: "long",
    year: "numeric"
  }).format(new Date(date));
}

export function isReleased(date: string, reference = new Date()): boolean {
  const target = new Date(`${date}T00:00:00`);
  const now = new Date(reference);
  target.setHours(0, 0, 0, 0);
  now.setHours(0, 0, 0, 0);
  return target.getTime() <= now.getTime();
}

export function isEpisodeLive(episode: Episode, reference = new Date()): boolean {
  return episode.status === "published" && isReleased(episode.publishedAt, reference);
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
