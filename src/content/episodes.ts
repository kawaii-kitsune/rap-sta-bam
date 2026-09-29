import episodesDataEl from "@/content/episodes.json";
import episodesDataEn from "@/content/episodes.en.json";
import type { Episode } from "@/types/content";

export const episodesEl = episodesDataEl as Episode[];
export const episodesEn = episodesDataEn as Episode[];

export function getEpisodes(locale = "el"): Episode[] {
  return locale === "en" ? episodesEn : episodesEl;
}

export const episodes = episodesEl;
