import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Play } from "lucide-react";
import { Container } from "@/components/Container";
import type { Episode } from "@/types/content";

type PromoTeaserProps = {
  episode?: Episode;
  compact?: boolean;
};

export function PromoTeaser({ episode, compact = false }: PromoTeaserProps) {
  const videoSrc = episode?.teaserVideo ?? (!episode ? "/assets/promo/episode-001-teaser.mp4" : undefined);
  const posterSrc = episode?.teaserPoster ?? episode?.thumbnail ?? "/assets/episodes/001-tzimos-thumbnail-real.jpg";
  const title = episode ? episode.artistName + " μπαίνει στο session" : "Ο Τζίμος μπαίνει στο πρώτο session";
  const copy = episode
    ? "Λίγο πριν ανοίξει ολόκληρο το επεισόδιο: " + episode.excerpt
    : "Λίγο πριν ανοίξει ολόκληρο το επεισόδιο: κουβέντα, beat, πρώτες γραμμές και η ενέργεια του δωματίου χωρίς πολλή βιτρίνα.";
  const href = episode ? "/episodes/" + episode.slug : "/episodes/001-tzimos";

  const media = (
    <div className="teaser-frame relative overflow-hidden border border-[var(--line)] bg-black">
      {videoSrc ? (
        <video
          className="aspect-[9/16] w-full bg-black object-cover"
          src={videoSrc}
          poster={posterSrc}
          controls
          muted
          playsInline
          preload="none"
          aria-label={title}
        />
      ) : (
        <div className="relative aspect-[4/5] w-full bg-black">
          <Image src={posterSrc} alt={"Preview εικόνα για " + title} fill sizes="(min-width: 1024px) 360px, 100vw" className="object-cover grayscale" />
          <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/85 to-transparent p-4">
            <p className="text-xs font-black uppercase tracking-[0.16em] text-[var(--accent)]">Trailer σύντομα</p>
          </div>
        </div>
      )}
    </div>
  );

  if (compact) {
    return media;
  }

  return (
    <section id="next-episode" className="section-space preview-section scroll-mt-24 border-b border-[var(--line)]">
      <Container>
        <div className="grid gap-8 md:grid-cols-[minmax(220px,320px)_1fr] md:items-center lg:gap-20">
          {media}
          <div>
            <p className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-[0.18em] text-[var(--accent)]">
              <Play className="h-4 w-4" aria-hidden="true" /> Πρώτη εικόνα
            </p>
            <h2 className="display-font mt-5 max-w-3xl text-5xl leading-[1.02] lg:text-7xl">{title}</h2>
            <p className="mt-4 max-w-2xl text-lg leading-8 text-[var(--muted)]">{copy}</p>
            <div className="mt-7 flex flex-wrap gap-3">
              <Link href={href} className="rsb-button-secondary">
                Άνοιξε τη σελίδα επεισοδίου <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
              <span className="inline-flex min-h-12 items-center border border-[var(--line)] px-5 py-3 font-black text-[var(--dim)]">
                Δηλώσεις σύντομα
              </span>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
