import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { formatGreekDate, isEpisodeLive } from "@/lib/content";
import type { Episode } from "@/types/content";

export function EpisodeCard({ episode }: { episode: Episode }) {
  const live = isEpisodeLive(episode);
  const badge = live ? null : episode.status === "draft" ? "Πρόχειρο" : "Έρχεται";

  return (
    <article className="group grid h-full border-y border-[var(--line)] bg-transparent transition hover:border-[var(--accent)]">
      <Link href={`/episodes/${episode.slug}`} className="block">
        <div className="relative aspect-[4/3] overflow-hidden border-b border-[var(--line)] bg-black">
          <Image src={episode.thumbnail} alt={`Thumbnail για ${episode.title}`} fill sizes="(min-width: 1024px) 33vw, 100vw" className="object-cover grayscale transition duration-300 group-hover:grayscale-0" />
          <span className="absolute left-3 top-3 bg-[var(--accent)] px-2 py-1 text-xs font-black text-black">#{String(episode.number).padStart(3, "0")}</span>
          {badge ? <span className="absolute right-3 top-3 border border-[var(--foreground)] bg-black px-2 py-1 text-xs font-black">{badge}</span> : null}
        </div>
        <div className="p-4">
          <p className="text-xs font-bold uppercase tracking-[0.16em] text-[var(--accent)]">{episode.artistName} / {live ? formatGreekDate(episode.publishedAt) : `Πρεμιέρα ${formatGreekDate(episode.publishedAt)}`}</p>
          <h3 className="display-font mt-3 text-3xl leading-none">{episode.title}</h3>
          <p className="mt-3 line-clamp-3 text-sm leading-6 text-[var(--muted)]">{episode.excerpt}</p>
          <span className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-[var(--foreground)]">
            {live ? "Άνοιγμα επεισοδίου" : "Προεπισκόπηση"} <ArrowUpRight className="h-4 w-4" />
          </span>
        </div>
      </Link>
    </article>
  );
}
