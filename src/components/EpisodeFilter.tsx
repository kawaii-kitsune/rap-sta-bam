"use client";

import { useMemo, useState } from "react";
import { EmptyState } from "@/components/EmptyState";
import { EpisodeCard } from "@/components/EpisodeCard";
import type { Episode } from "@/types/content";

export function EpisodeFilter({ episodes }: { episodes: Episode[] }) {
  const [artist, setArtist] = useState("all");
  const artists = useMemo(() => Array.from(new Set(episodes.map((episode) => episode.artistName))), [episodes]);
  const filtered = artist === "all" ? episodes : episodes.filter((episode) => episode.artistName === artist);

  return (
    <div>
      <div className="mb-6 flex flex-wrap items-center gap-3 border-y border-[var(--line)] py-4">
        <label htmlFor="artist-filter" className="text-sm font-bold text-[var(--muted)]">Φίλτρο καλλιτέχνη</label>
        <select
          id="artist-filter"
          value={artist}
          onChange={(event) => setArtist(event.target.value)}
          className="min-h-11 border border-[var(--line)] bg-[var(--panel)] px-3 text-sm font-bold text-[var(--foreground)]"
        >
          <option value="all">Όλοι</option>
          {artists.map((name) => (
            <option key={name} value={name}>{name}</option>
          ))}
        </select>
      </div>

      {filtered.length ? (
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((episode) => <EpisodeCard key={episode.slug} episode={episode} />)}
        </div>
      ) : (
        <EmptyState title="Κανένα επεισόδιο" copy="Δεν υπάρχει επεισόδιο για το συγκεκριμένο φίλτρο." />
      )}
    </div>
  );
}
