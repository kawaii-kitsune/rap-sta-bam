import Image from "next/image";
import Link from "next/link";
import { ArrowDown, ArrowUpRight, Play } from "lucide-react";
import { Container } from "@/components/Container";
import { formatGreekDate } from "@/lib/content";
import type { Episode } from "@/types/content";

type HeroProps = {
  episode: Episode;
  isUpcoming?: boolean;
};

export function Hero({ episode, isUpcoming = false }: HeroProps) {
  const number = String(episode.number).padStart(3, "0");
  const href = isUpcoming ? "#next-episode" : "#first-episode";

  return (
    <section className="home-hero" aria-labelledby="hero-title">
      <Container>
        <div className="hero-meta archive-label">
          <span className="inline-flex items-center gap-3"><span className="record-dot" /> DIY hip hop sessions</span>
          <span>Ηράκλειο Κρήτης</span>
        </div>
        <div className="hero-grid">
          <div className="hero-copy">
            <h1 id="hero-title" className="hero-title display-font">
              Ένας rapper.<br />Ένα beat.<br /><span>Ένα session</span><br />από το μηδέν.
            </h1>
            <p className="hero-description">Ιστορία, γράψιμο, recording και performance όπως συμβαίνουν στη ζωή... Απλά πράγματα.</p>
            <div className="mt-7 flex flex-wrap gap-3">
              <Link href={href} className="rsb-button">
                <Play className="h-4 w-4" aria-hidden="true" />
                {isUpcoming ? (episode.teaserVideo ? "Δες το trailer" : "Δες το preview") : "Δες το session"}
              </Link>
              <Link href="/episodes" className="rsb-button-secondary">Όλα τα επεισόδια <ArrowUpRight className="h-4 w-4" aria-hidden="true" /></Link>
            </div>
          </div>
          <Link href={`/episodes/${episode.slug}`} className="hero-session group" aria-label={`${isUpcoming ? "Επόμενο session" : "Τελευταίο επεισόδιο"}: ${episode.title}`}>
            <div className="hero-session-image">
              <Image src={episode.thumbnail} alt={episode.artistName} fill priority sizes="(min-width: 1024px) 52vw, 100vw" className="object-cover grayscale" />
              <div className="hero-image-shade" aria-hidden="true" />
              <div className="hero-frame" aria-hidden="true" />
              <span className="hero-image-label archive-label">ΡΣΜ / SESSION {number}</span>
              <span className="hero-image-number display-font" aria-hidden="true">{number}</span>
              <div className="hero-image-caption">
                <span className="archive-label">{isUpcoming ? "Επόμενο session" : "Τελευταίο επεισόδιο"}</span>
                <h2 className="display-font">{episode.artistName}</h2>
              </div>
              <span className="hero-session-arrow"><ArrowUpRight className="h-6 w-6" aria-hidden="true" /></span>
            </div>
            <div className="hero-session-footer archive-label">
              <span>{isUpcoming ? "Πρεμιέρα" : "Στο αρχείο"}</span>
              <time dateTime={episode.publishedAt}>{formatGreekDate(episode.publishedAt)}</time>
            </div>
          </Link>
        </div>
        <div className="hero-bottom archive-label">
          <span>Ραπ Στα Μπαμ <span className="text-[var(--dim)]">/ Ανεξάρτητη μουσική σειρά</span></span>
          <a href="#first-episode" className="inline-flex min-h-11 items-center gap-3">Μέσα στο session <ArrowDown className="h-4 w-4" aria-hidden="true" /></a>
        </div>
      </Container>
    </section>
  );
}
