"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Lock, Radio } from "lucide-react";
import { EmptyState } from "@/components/EmptyState";
import { formatGreekDate, isEpisodeLive } from "@/lib/content";
import type { Episode } from "@/types/content";

export function EpisodeFilter({ episodes }: { episodes: Episode[] }) {
  const [artist, setArtist] = useState("all");
  const artists = useMemo(() => Array.from(new Set(episodes.map((episode) => episode.artistName))), [episodes]);
  const filtered = artist === "all" ? episodes : episodes.filter((episode) => episode.artistName === artist);

  return (
    <div className="border-t border-[var(--line)]">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[var(--line)] py-4">
        <div>
          <p className="meta-font text-xs font-bold uppercase tracking-[0.16em] text-[var(--accent)]">Database filter</p>
          <p className="mt-1 text-sm text-[var(--muted)]">Δες το αρχείο ανά καλεσμένο.</p>
        </div>
        <select
          id="artist-filter"
          value={artist}
          onChange={(event) => setArtist(event.target.value)}
          aria-label="Φίλτρο καλλιτέχνη"
          className="meta-font min-h-11 border border-[var(--line)] bg-[var(--panel)] px-3 text-sm font-bold text-[var(--foreground)]"
        >
          <option value="all">Όλοι</option>
          {artists.map((name) => (
            <option key={name} value={name}>{name}</option>
          ))}
        </select>
      </div>

      {filtered.length ? (
        <div>
          {filtered.map((episode) => {
            const live = isEpisodeLive(episode);
            const locked = !live || episode.status === "draft";
            const statusLabel = live ? "Ανοιχτό" : episode.status === "draft" ? "Πρόχειρο" : "Έρχεται";

            return (
              <Link
                key={episode.slug}
                href={`/episodes/${episode.slug}`}
                className="group grid gap-4 border-b border-[var(--line)] py-5 transition hover:border-[var(--accent)] hover:bg-[var(--panel)]/45 md:grid-cols-[5rem_1fr_7rem]"
              >
                <div className="meta-font text-sm text-[var(--dim)]">#{String(episode.number).padStart(3, "0")}</div>
                <div className="min-w-0">
                  <div className="mb-2 flex flex-wrap items-center gap-2">
                    <span className={`meta-font inline-flex items-center gap-1 border px-2 py-1 text-[0.65rem] font-bold uppercase tracking-[0.12em] ${live ? "border-[var(--accent)] bg-[var(--accent)] text-black" : "border-[var(--line)] text-[var(--muted)]"}`}>
                      {live ? <Radio className="h-3 w-3" /> : locked ? <Lock className="h-3 w-3" /> : null}
                      {statusLabel}
                    </span>
                    <span className="meta-font text-xs font-bold uppercase tracking-[0.12em] text-[var(--muted)]">
                      {live ? formatGreekDate(episode.publishedAt) : `Πρεμιέρα ${formatGreekDate(episode.publishedAt)}`}
                    </span>
                  </div>
                  <h3 className="display-font text-4xl leading-none text-[var(--foreground)] transition group-hover:translate-x-1 group-hover:text-[var(--accent)] md:text-5xl">
                    {episode.artistName}
                  </h3>
                  <p className="mt-2 line-clamp-2 max-w-2xl text-sm leading-6 text-[var(--muted)]">{episode.excerpt}</p>
                  <div className="mt-3 flex flex-wrap items-center gap-3">
                    <span className="meta-font text-xs font-bold uppercase tracking-[0.12em] text-[var(--dim)]">{episode.title}</span>
                    <span className="hidden h-px w-8 bg-[var(--line)] sm:block" />
                    <span className="meta-font text-xs font-bold uppercase tracking-[0.12em] text-[var(--accent)]">
                      {live ? "Άνοιγμα επεισοδίου" : "Προεπισκόπηση"}
                    </span>
                  </div>
                </div>
                <div className="relative h-24 w-24 overflow-hidden border border-[var(--line)] bg-black md:justify-self-end">
                  <Image src={episode.thumbnail} alt={`Thumbnail για ${episode.title}`} fill sizes="7rem" className="object-cover grayscale transition duration-300 group-hover:grayscale-0" />
                  <div className="absolute inset-0 border border-black/40" />
                  {locked ? (
                    <div className="absolute inset-0 grid place-items-center bg-black/45 text-[var(--accent)]">
                      <Lock className="h-5 w-5" />
                    </div>
                  ) : (
                    <div className="absolute bottom-1 right-1 bg-[var(--accent)] p-1 text-black">
                      <ArrowUpRight className="h-4 w-4" />
                    </div>
                  )}
                </div>
              </Link>
            );
          })}
        </div>
      ) : (
        <EmptyState title="Κανένα επεισόδιο" copy="Δεν υπάρχει επεισόδιο για το συγκεκριμένο φίλτρο." />
      )}
    </div>
  );
}
