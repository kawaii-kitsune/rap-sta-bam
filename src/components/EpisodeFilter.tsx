"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, RotateCcw, Search } from "lucide-react";
import { EmptyState } from "@/components/EmptyState";
import { EpisodeStatus } from "@/components/EpisodeStatus";
import { getDictionary } from "@/config/i18n";
import { formatDate, isEpisodeLive } from "@/lib/content";
import type { Episode } from "@/types/content";

export function EpisodeFilter({
  episodes,
  locale = "el"
}: {
  episodes: Episode[];
  locale?: string;
}) {
  const [artist, setArtist] = useState("all");
  const [query, setQuery] = useState("");
  const isEn = locale === "en";
  const dict = getDictionary(locale);

  const artists = useMemo(
    () => Array.from(new Set(episodes.map((episode) => episode.artistName))),
    [episodes]
  );

  const filtered = useMemo(() => {
    return episodes.filter((episode) => {
      const matchArtist = artist === "all" || episode.artistName === artist;
      if (!matchArtist) return false;

      if (!query.trim()) return true;
      const q = query.toLowerCase().trim();
      const matchTitle = episode.title.toLowerCase().includes(q);
      const matchName = episode.artistName.toLowerCase().includes(q);
      const matchExcerpt = episode.excerpt.toLowerCase().includes(q);
      const matchGear = episode.gear?.some((g) => g.toLowerCase().includes(q));

      return matchTitle || matchName || matchExcerpt || matchGear;
    });
  }, [episodes, artist, query]);

  const hasActiveFilters = artist !== "all" || query.trim().length > 0;

  function resetFilters() {
    setArtist("all");
    setQuery("");
  }

  return (
    <div>
      <div className="archive-toolbar flex-col items-stretch gap-4 sm:flex-row sm:items-end">
        <div className="flex flex-1 flex-wrap items-center gap-x-4 gap-y-2">
          <p className="text-sm text-[var(--muted)]" role="status">
            {filtered.length}{" "}
            {isEn
              ? filtered.length === 1
                ? "session"
                : "sessions"
              : filtered.length === 1
                ? "επεισόδιο"
                : "επεισόδια"}
            {hasActiveFilters
              ? isEn
                ? " found"
                : " βρέθηκαν"
              : isEn
                ? " in archive"
                : " στο αρχείο"}
          </p>
          {hasActiveFilters ? (
            <button
              type="button"
              className="text-link text-xs"
              onClick={resetFilters}
            >
              <RotateCcw className="h-3.5 w-3.5" aria-hidden="true" />
              {isEn ? "Reset filters" : "Καθαρισμός φίλτρων"}
            </button>
          ) : null}
        </div>
        <div className="grid grid-cols-1 gap-3 sm:flex sm:items-end">
          <div className="relative">
            <label htmlFor="search-filter" className="field-label text-xs text-[var(--dim)]">
              {dict.common.searchLabel}
            </label>
            <div className="relative">
              <input
                id="search-filter"
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder={dict.common.searchPlaceholder}
                className="form-control pl-9 sm:min-w-64"
              />
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[var(--dim)]" aria-hidden="true" />
            </div>
          </div>
          <div>
            <label htmlFor="artist-filter" className="field-label text-xs text-[var(--dim)]">
              {isEn ? "Guest Artist" : "Καλεσμένος"}
            </label>
            <select
              id="artist-filter"
              value={artist}
              onChange={(event) => setArtist(event.target.value)}
              className="form-control sm:min-w-52"
            >
              <option value="all">{isEn ? "All Artists" : "Όλοι οι καλεσμένοι"}</option>
              {artists.map((name) => (
                <option key={name} value={name}>
                  {name}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
      {filtered.length ? (
        <div>
          {filtered.map((episode) => {
            const live = isEpisodeLive(episode);
            return (
              <Link
                key={episode.slug}
                href={`/${locale}/episodes/${episode.slug}`}
                className="archive-episode"
              >
                <div className="archive-episode-image">
                  <Image
                    src={episode.thumbnail}
                    alt={episode.artistName}
                    fill
                    sizes="(min-width: 640px) 220px, 112px"
                    className="object-cover"
                  />
                  <span className="episode-card-number">
                    #{String(episode.number).padStart(3, "0")}
                  </span>
                </div>
                <div className="min-w-0">
                  <div className="archive-episode-meta mb-2 flex flex-wrap gap-x-4 gap-y-1 text-xs text-[var(--dim)]">
                    <EpisodeStatus live={live} locale={locale} />
                    <time dateTime={episode.publishedAt}>
                      {formatDate(episode.publishedAt, locale)}
                    </time>
                  </div>
                  <h2 className="font-semibold">{episode.artistName}</h2>
                  <p className="archive-episode-excerpt mt-2 line-clamp-2 max-w-2xl text-sm leading-6 text-[var(--muted)]">
                    {episode.excerpt}
                  </p>
                  <p className="mt-3 text-xs font-medium">
                    {live
                      ? isEn
                        ? "Watch Session"
                        : "Μέσα στο επεισόδιο"
                      : isEn
                        ? "Preview"
                        : "Προεπισκόπηση"}
                  </p>
                </div>
                <ArrowUpRight className="h-5 w-5 text-[var(--dim)]" aria-hidden="true" />
              </Link>
            );
          })}
        </div>
      ) : (
        <EmptyState
          title={isEn ? "No sessions found" : "Κανένα επεισόδιο"}
          copy={
            isEn
              ? "No session matches your search or selected filter."
              : "Δεν υπάρχει επεισόδιο που να ταιριάζει στην αναζήτησή σου."
          }
          action={
            hasActiveFilters ? (
              <button
                type="button"
                className="rsb-button-secondary"
                onClick={resetFilters}
              >
                {isEn ? "Reset filters" : "Επαναφορά φίλτρων"}
              </button>
            ) : undefined
          }
        />
      )}
    </div>
  );
}
