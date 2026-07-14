import Link from "next/link";
import { ArrowRight, Play } from "lucide-react";
import { Container } from "@/components/Container";

export function PromoTeaser({ compact = false }: { compact?: boolean }) {
  const video = (
    <div className="relative overflow-hidden border border-[var(--line)] bg-black shadow-[10px_10px_0_#000]">
      <video
        className="aspect-[9/16] w-full bg-black object-cover"
        src="/assets/promo/episode-001-teaser.mp4"
        poster="/assets/episodes/001-tzimos-thumbnail-real.jpg"
        controls
        muted
        playsInline
        preload="metadata"
        autoPlay={!compact}
        loop={!compact}
      />
    </div>
  );

  if (compact) {
    return video;
  }

  return (
    <section className="border-b border-[var(--line)] py-14">
      <Container>
        <div className="grid gap-8 lg:grid-cols-[minmax(260px,360px)_1fr] lg:items-center">
          {video}
          <div>
            <p className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-[0.18em] text-[var(--accent)]">
              <Play className="h-4 w-4" aria-hidden="true" /> Πρώτη εικόνα
            </p>
            <h2 className="display-font mt-3 max-w-4xl text-6xl leading-none sm:text-7xl">Ο Τζίμος μπαίνει στο πρώτο session</h2>
            <p className="mt-4 max-w-2xl text-lg leading-8 text-[var(--muted)]">
              Λίγο πριν ανοίξει ολόκληρο το επεισόδιο: κουβέντα, beat, πρώτες γραμμές και η ενέργεια του δωματίου χωρίς πολλή βιτρίνα.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <Link href="/episodes/001-tzimos" className="inline-flex min-h-12 items-center gap-2 bg-[var(--accent)] px-5 py-3 font-black text-black transition hover:bg-[var(--foreground)]">
                Άνοιξε το επεισόδιο <ArrowRight className="h-4 w-4" aria-hidden="true" />
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
