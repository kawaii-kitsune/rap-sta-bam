"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, RotateCcw } from "lucide-react";
import { EmptyState } from "@/components/EmptyState";
import { EpisodeStatus } from "@/components/EpisodeStatus";
import { formatGreekDate, isEpisodeLive } from "@/lib/content";
import type { Episode } from "@/types/content";

export function EpisodeFilter({ episodes }: { episodes: Episode[] }) {
  const [artist, setArtist] = useState("all");
  const artists = useMemo(() => Array.from(new Set(episodes.map((episode) => episode.artistName))), [episodes]);
  const filtered = artist === "all" ? episodes : episodes.filter((episode) => episode.artistName === artist);

  return (
    <div>
      <div className="archive-toolbar">
        <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
          <p className="text-sm text-[var(--muted)]" role="status">{filtered.length} {filtered.length === 1 ? "επεισόδιο" : "επεισόδια"}{artist !== "all" ? ` · ${artist}` : " στο αρχείο"}</p>
          {artist !== "all" ? <button type="button" className="text-link text-xs" onClick={() => setArtist("all")}><RotateCcw className="h-3.5 w-3.5" aria-hidden="true" />Καθαρισμός φίλτρου</button> : null}
        </div>
        <div>
          <label htmlFor="artist-filter" className="field-label text-xs text-[var(--dim)]">Καλεσμένος</label>
          <select id="artist-filter" value={artist} onChange={(event) => setArtist(event.target.value)} className="form-control sm:min-w-56">
            <option value="all">Όλοι οι καλεσμένοι</option>
            {artists.map((name) => <option key={name} value={name}>{name}</option>)}
          </select>
        </div>
      </div>
      {filtered.length ? (
        <div>
          {filtered.map((episode) => {
            const live = isEpisodeLive(episode);
            return (
              <Link key={episode.slug} href={`/episodes/${episode.slug}`} className="archive-episode">
                <div className="archive-episode-image">
                  <Image src={episode.thumbnail} alt={episode.artistName} fill sizes="(min-width: 640px) 220px, 112px" className="object-cover" />
                  <span className="episode-card-number">#{String(episode.number).padStart(3, "0")}</span>
                </div>
                <div className="min-w-0">
                  <div className="archive-episode-meta mb-2 flex flex-wrap gap-x-4 gap-y-1 text-xs text-[var(--dim)]">
                    <EpisodeStatus live={live} /><time dateTime={episode.publishedAt}>{formatGreekDate(episode.publishedAt)}</time>
                  </div>
                  <h2 className="font-semibold">{episode.artistName}</h2>
                  <p className="archive-episode-excerpt mt-2 line-clamp-2 max-w-2xl text-sm leading-6 text-[var(--muted)]">{episode.excerpt}</p>
                  <p className="mt-3 text-xs font-medium">{live ? "Μέσα στο επεισόδιο" : "Προεπισκόπηση"}</p>
                </div>
                <ArrowUpRight className="h-5 w-5 text-[var(--dim)]" aria-hidden="true" />
              </Link>
            );
          })}
        </div>
      ) : <EmptyState title="Κανένα επεισόδιο" copy="Δεν υπάρχει επεισόδιο για το συγκεκριμένο φίλτρο." action={artist !== "all" ? <button type="button" className="rsb-button-secondary" onClick={() => setArtist("all")}>Όλα τα επεισόδια</button> : undefined} />}
    </div>
  );
}
