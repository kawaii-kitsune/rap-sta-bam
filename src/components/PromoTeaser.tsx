import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, CalendarDays } from "lucide-react";
import { Container } from "@/components/Container";
import { EpisodeStatus } from "@/components/EpisodeStatus";
import { formatDate } from "@/lib/content";
import type { Episode } from "@/types/content";

export function PromoTeaser({
  episode,
  compact = false,
  locale = "el"
}: {
  episode?: Episode;
  compact?: boolean;
  locale?: string;
}) {
  const isEn = locale === "en";
  const videoSrc = episode?.teaserVideo ?? (!episode ? "/assets/promo/episode-001-teaser.mp4" : undefined);
  const posterSrc = episode?.teaserPoster ?? episode?.thumbnail ?? "/assets/episodes/001-tzimos-thumbnail-real.jpg";
  const title = episode
    ? isEn
      ? `${episode.artistName} steps into the session`
      : `${episode.artistName} μπαίνει στο session`
    : isEn
      ? "Tzimos steps into the first session"
      : "Ο Τζίμος μπαίνει στο πρώτο session";

  const media = (
    <div className="teaser-frame">
      {videoSrc ? (
        <video
          className="aspect-[9/16] w-full object-cover"
          src={videoSrc}
          poster={posterSrc}
          controls
          muted
          playsInline
          preload="none"
          aria-label={title}
        />
      ) : (
        <div className="relative aspect-[4/5]">
          <Image
            src={posterSrc}
            alt={isEn ? `Preview: ${title}` : `Προεπισκόπηση: ${title}`}
            fill
            sizes="320px"
            className="object-cover"
          />
          <p className="absolute inset-x-0 bottom-0 bg-[#121315]/95 px-4 py-3 text-xs text-[var(--muted)]">
            {episode?.youtubeVideoId
              ? isEn
                ? "Full session unlocks upon premiere"
                : "Ολόκληρο το session στην πρεμιέρα"
              : isEn
                ? "Trailer coming soon"
                : "Το trailer έρχεται σύντομα"}
          </p>
        </div>
      )}
    </div>
  );
  if (compact) return media;

  return (
    <section id="next-episode" className="section-space preview-section">
      <Container>
        <div className="preview-layout">
          {media}
          <div>
            <div className="mb-3 flex items-center gap-3">
              <p className="rsb-kicker">
                {isEn ? "COMING TO THE SESSION" : "ΕΡΧΕΤΑΙ ΣΤΟ SESSION"}
              </p>
              <EpisodeStatus live={false} locale={locale} />
            </div>
            <h2 className="section-title">{episode?.artistName ?? "Tzimos"}</h2>
            {episode ? (
              <p className="mt-4 flex items-center gap-2 text-sm text-[var(--warning)]">
                <CalendarDays className="h-4 w-4" aria-hidden="true" />
                <time dateTime={episode.publishedAt}>
                  {isEn
                    ? `Premiere: ${formatDate(episode.publishedAt, locale)}`
                    : `Πρεμιέρα ${formatDate(episode.publishedAt, locale)}`}
                </time>
              </p>
            ) : null}
            <p className="mt-4 max-w-2xl text-sm leading-7 text-[var(--muted)]">
              {episode?.excerpt ??
                (isEn
                  ? "Dialogue, beatmaking, raw bars, and spontaneous room energy."
                  : "Κουβέντα, beat, πρώτες γραμμές και η ενέργεια του δωματίου.")}
            </p>
            <Link
              href={episode ? `/${locale}/episodes/${episode.slug}` : `/${locale}/episodes/001-tzimos`}
              className="text-link mt-4"
            >
              {isEn ? "View session preview" : "Δες την προεπισκόπηση"}{" "}
              <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </Container>
    </section>
  );
}
