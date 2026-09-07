import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { formatGreekDate, isEpisodeLive } from "@/lib/content";
import type { Episode } from "@/types/content";

export function EpisodeCard({ episode }: { episode: Episode }) {
  const live = isEpisodeLive(episode);
  return (
    <article className="episode-card">
      <Link href={`/episodes/${episode.slug}`} className="episode-card-link group">
        <div className="episode-card-image">
          <Image src={episode.thumbnail} alt={episode.artistName} fill sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw" className="object-cover grayscale" />
          <span className="episode-card-number archive-label">SESSION {String(episode.number).padStart(3, "0")}</span>
        </div>
        <div className="episode-card-meta archive-label">
          <time dateTime={episode.publishedAt}>{formatGreekDate(episode.publishedAt)}</time>
          <span className={live ? "text-[var(--foreground)]" : "text-[var(--accent)]"}>{live ? "Στο αρχείο" : "Έρχεται"}</span>
        </div>
        <div className="episode-card-body">
          <h3 className="display-font">{episode.artistName}</h3>
          <p className="mt-3 line-clamp-3 text-sm leading-6 text-[var(--muted)]">{episode.excerpt}</p>
          <span className="episode-card-cta">{live ? "Άνοιγμα επεισοδίου" : "Προεπισκόπηση"}<ArrowUpRight className="h-5 w-5" aria-hidden="true" /></span>
        </div>
      </Link>
    </article>
  );
}
