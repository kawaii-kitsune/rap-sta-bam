"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { EmptyState } from "@/components/EmptyState";
import { formatGreekDate, isEpisodeLive } from "@/lib/content";
import type { Episode } from "@/types/content";

export function EpisodeFilter({ episodes }: { episodes: Episode[] }) {
  const [artist, setArtist] = useState("all");
  const artists = useMemo(() => Array.from(new Set(episodes.map((episode) => episode.artistName))), [episodes]);
  const filtered = artist === "all" ? episodes : episodes.filter((episode) => episode.artistName === artist);

  return (
    <div className="border-t border-[var(--line)]">
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[var(--line)] py-5">
        <div>
          <p className="archive-label text-[var(--dim)]" role="status" aria-live="polite">Αρχείο / {String(filtered.length).padStart(2, "0")} επεισόδια</p>
          <p className="mt-1 text-sm text-[var(--muted)]">Δες το αρχείο ανά καλεσμένο.</p>
        </div>
        <select id="artist-filter" value={artist} onChange={(event) => setArtist(event.target.value)} aria-label="Φίλτρο καλλιτέχνη" className="min-h-12 border border-[var(--line-strong)] bg-[var(--panel)] px-4 text-sm text-[var(--foreground)]">
          <option value="all">Όλοι οι καλεσμένοι</option>
          {artists.map((name) => <option key={name} value={name}>{name}</option>)}
        </select>
      </div>
      {filtered.length ? (
        <div>
          {filtered.map((episode) => {
            const live = isEpisodeLive(episode);
            return (
              <Link key={episode.slug} href={`/episodes/${episode.slug}`} className="archive-episode group">
                <div className="archive-episode-image">
                  <Image src={episode.thumbnail} alt={episode.artistName} fill sizes="(min-width: 640px) 240px, 100vw" className="object-cover grayscale" />
                  <span className="episode-card-number archive-label">{String(episode.number).padStart(3, "0")}</span>
                </div>
                <div className="min-w-0">
                  <div className="archive-label mb-3 flex flex-wrap gap-x-4 gap-y-1 text-[var(--muted)]">
                    <span className={!live ? "text-[var(--accent)]" : ""}>{live ? "Ανοιχτό" : "Έρχεται"}</span>
                    <time dateTime={episode.publishedAt}>{formatGreekDate(episode.publishedAt)}</time>
                  </div>
                  <h2 className="display-font">{episode.artistName}</h2>
                  <p className="mt-3 line-clamp-2 max-w-2xl text-sm leading-6 text-[var(--muted)]">{episode.excerpt}</p>
                  <p className="mt-4 text-xs font-semibold">{live ? "Άνοιγμα επεισοδίου" : "Προεπισκόπηση"}</p>
                </div>
                <ArrowUpRight className="h-6 w-6" aria-hidden="true" />
              </Link>
            );
          })}
        </div>
      ) : <EmptyState title="Κανένα επεισόδιο" copy="Δεν υπάρχει επεισόδιο για το συγκεκριμένο φίλτρο." />}
    </div>
  );
}
