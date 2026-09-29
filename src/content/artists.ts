import artistsDataEl from "@/content/artists.json";
import artistsDataEn from "@/content/artists.en.json";
import type { Artist } from "@/types/content";

export const artistsEl = artistsDataEl as Artist[];
export const artistsEn = artistsDataEn as Artist[];

export function getArtists(locale = "el"): Artist[] {
  return locale === "en" ? artistsEn : artistsEl;
}

export const artists = artistsEl;
