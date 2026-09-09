import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, CalendarDays } from "lucide-react";
import { Container } from "@/components/Container";
import { EpisodeStatus } from "@/components/EpisodeStatus";
import { formatGreekDate } from "@/lib/content";
import type { Episode } from "@/types/content";

export function PromoTeaser({ episode, compact = false }: { episode?: Episode; compact?: boolean }) {
  const videoSrc = episode?.teaserVideo ?? (!episode ? "/assets/promo/episode-001-teaser.mp4" : undefined);
  const posterSrc = episode?.teaserPoster ?? episode?.thumbnail ?? "/assets/episodes/001-tzimos-thumbnail-real.jpg";
  const title = episode ? `${episode.artistName} μπαίνει στο session` : "Ο Τζίμος μπαίνει στο πρώτο session";
  const media = (
    <div className="teaser-frame">
      {videoSrc ? <video className="aspect-[9/16] w-full object-cover" src={videoSrc} poster={posterSrc} controls muted playsInline preload="none" aria-label={title} /> : (
        <div className="relative aspect-[4/5]">
          <Image src={posterSrc} alt={`Προεπισκόπηση: ${title}`} fill sizes="320px" className="object-cover" />
          <p className="absolute inset-x-0 bottom-0 bg-[#121315]/95 px-4 py-3 text-xs text-[var(--muted)]">Το trailer έρχεται σύντομα</p>
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
            <div className="mb-3 flex items-center gap-3"><p className="rsb-kicker">Το επόμενο session</p><EpisodeStatus live={false} /></div>
            <h2 className="section-title">{title}</h2>
            {episode ? <p className="mt-4 flex items-center gap-2 text-sm text-[var(--warning)]"><CalendarDays className="h-4 w-4" aria-hidden="true" /><time dateTime={episode.publishedAt}>Πρεμιέρα {formatGreekDate(episode.publishedAt)}</time></p> : null}
            <p className="mt-4 max-w-2xl text-sm leading-7 text-[var(--muted)]">{episode?.excerpt ?? "Κουβέντα, beat, πρώτες γραμμές και η ενέργεια του δωματίου."}</p>
            <Link href={episode ? `/episodes/${episode.slug}` : "/episodes/001-tzimos"} className="text-link mt-4">Δες την προεπισκόπηση <ArrowUpRight className="h-4 w-4" aria-hidden="true" /></Link>
          </div>
        </div>
      </Container>
    </section>
  );
}
