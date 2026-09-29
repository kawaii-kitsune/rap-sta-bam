import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { EpisodeStatus } from "@/components/EpisodeStatus";
import { isEpisodeLive } from "@/lib/content";
import type { Episode } from "@/types/content";

export function SessionArchive({ episodes, locale = "el" }: { episodes: Episode[]; locale?: string }) {
  const isEn = locale === "en";

  return (
    <ol className="session-tracklist" aria-label={isEn ? "Sessions Archive" : "Αρχείο sessions"}>
      {episodes.map((episode) => {
        const producer = episode.credits.find((credit) =>
          credit.role.toLowerCase().includes("παραγωγή") || credit.role.toLowerCase().includes("production")
        );
        const live = isEpisodeLive(episode);

        return (
          <li key={episode.slug}>
            <Link href={`/${locale}/episodes/${episode.slug}`} className={`session-row ${live ? "" : "session-row-upcoming"}`}>
              <span className="session-row-number">#{String(episode.number).padStart(3, "0")}</span>
              <div className="session-row-image">
                <Image src={episode.thumbnail} alt="" fill sizes="(min-width: 768px) 160px, 88px" className="object-cover" />
              </div>
              <div className="session-row-info">
                <h3>{episode.artistName}</h3>
                {producer ? <p className="session-row-credit">{isEn ? `Production / ${producer.name}` : `Παραγωγή / ${producer.name}`}</p> : null}
              </div>
              <div className="session-row-meta">
                <time dateTime={episode.publishedAt}>{episode.publishedAt.split("-").reverse().join(".")}</time>
                <EpisodeStatus live={live} locale={locale} />
              </div>
              <ArrowUpRight className="session-row-arrow" aria-hidden="true" />
            </Link>
          </li>
        );
      })}
    </ol>
  );
}
