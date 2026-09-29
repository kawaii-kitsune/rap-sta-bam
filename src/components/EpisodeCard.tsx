import Image from "next/image";
import Link from "next/link";
import { EpisodeStatus } from "@/components/EpisodeStatus";
import { ArrowUpRight } from "lucide-react";
import { formatDate, isEpisodeLive } from "@/lib/content";
import type { Episode } from "@/types/content";

export function EpisodeCard({ episode, locale = "el" }: { episode: Episode; locale?: string }) {
  const live = isEpisodeLive(episode);
  const isEn = locale === "en";

  return (
    <article className="episode-card">
      <Link href={`/${locale}/episodes/${episode.slug}`} className="episode-card-link group">
        <div className="episode-card-image">
          <Image src={episode.thumbnail} alt={episode.artistName} fill sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw" className="object-cover" />
          <span className="episode-card-number archive-label">SESSION {String(episode.number).padStart(3, "0")}</span>
        </div>
        <div className="episode-card-meta archive-label">
          <time dateTime={episode.publishedAt}>{formatDate(episode.publishedAt, locale)}</time>
          <EpisodeStatus live={live} locale={locale} />
        </div>
        <div className="episode-card-body">
          <h3 className="font-semibold">{episode.artistName}</h3>
          <p className="mt-2 line-clamp-2 text-sm leading-6 text-[var(--muted)]">{episode.excerpt}</p>
          <span className="episode-card-cta">
            {live ? (isEn ? "Watch Session" : "Μέσα στο επεισόδιο") : (isEn ? "Preview" : "Προεπισκόπηση")}
            <ArrowUpRight className="h-5 w-5" aria-hidden="true" />
          </span>
        </div>
      </Link>
    </article>
  );
}
