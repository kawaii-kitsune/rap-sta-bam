import Image from "next/image";
import Link from "next/link";
import { ArrowDown, ArrowUpRight, Headphones } from "lucide-react";
import { Container } from "@/components/Container";
import { EpisodeStatus } from "@/components/EpisodeStatus";
import { PromoTeaser } from "@/components/PromoTeaser";
import { SocialLinks } from "@/components/SocialLinks";
import { TextureOverlay } from "@/components/TextureOverlay";
import { VideoEmbed } from "@/components/VideoEmbed";
import { formatGreekDate, isReleased } from "@/lib/content";
import type { Episode, SocialLink } from "@/types/content";

export function Hero({ episode, isUpcoming = false }: { episode: Episode; isUpcoming?: boolean }) {
  const sessionNumber = String(episode.number).padStart(3, "0");
  const producer = episode.credits.find((credit) => credit.role.includes("Παραγωγή"));
  const links: SocialLink[] = [
    { platform: "youtube", label: "YouTube", url: episode.youtubeUrl ?? "" },
    { platform: "spotify", label: "Spotify", url: episode.spotifyUrl ?? "" },
    { platform: "instagram", label: "Instagram", url: episode.instagramUrl ?? "" },
    { platform: "tiktok", label: "TikTok", url: episode.tiktokUrl ?? "" }
  ];

  return (
    <section className="home-hero" aria-labelledby="hero-title">
      <TextureOverlay />
      <Container>
        <div className="hero-topline">
          <p className="rsb-kicker"><span className="recording-dot" aria-hidden="true" /> ΑΝΕΞΑΡΤΗΤΑ HIP HOP SESSIONS</p>
          <a href="#sessions" className="hero-archive-link">ΜΠΕΣ ΣΤΟ ΑΡΧΕΙΟ <ArrowDown className="h-3.5 w-3.5" aria-hidden="true" /></a>
        </div>
        <div className="hero-intro">
          <h1 id="hero-title" className="hero-title">
            <span>ΕΝΑΣ RAPPER.</span>
            <span>ΕΝΑ BEAT.</span>
            <span className="hero-title-ink">ΑΠΟ ΤΟ ΜΗΔΕΝ.</span>
          </h1>
          <div className="hero-identity">
            <Image src="/assets/logo/logo-white-red.png" alt="Ραπ Στα Μπαμ" width={220} height={208} priority className="hero-logo" />
            <p className="hero-description">Ιστορίες, beat, γράψιμο, recording.<br />Μια παρέα. Ένα session. Όπως βγει.</p>
            <p className="location-stamp">ΗΡΑΚΛΕΙΟ ΚΡΗΤΗΣ<span>DIY ΜΟΥΣΙΚΗ ΣΕΙΡΑ</span></p>
          </div>
        </div>
        <div id="first-episode" className="hero-feature">
          <div className="hero-media">
            <div className="hero-media-topline"><span>ΡΣΜ / SESSION {sessionNumber}</span><span>{isUpcoming ? "PREVIEW" : "ΠΑΤΑ PLAY"}</span></div>
            {isUpcoming ? (
              <PromoTeaser episode={episode} compact />
            ) : (
              <VideoEmbed videoId={episode.youtubeVideoId} title={episode.title} poster={episode.gallery?.[0] ?? episode.thumbnail} priority />
            )}
            <div className="hero-footer">
              <span>{isUpcoming ? "ΠΡΟΣΕΧΩΣ" : "ΟΛΟΚΛΗΡΟ ΤΟ ΕΠΕΙΣΟΔΙΟ"}</span>
              <time dateTime={episode.publishedAt}>{formatGreekDate(episode.publishedAt)}</time>
            </div>
          </div>
          <div className="hero-details">
            <div className="hero-release-label">
              <p className="rsb-kicker">{isUpcoming ? "ΕΡΧΕΤΑΙ ΣΤΟ SESSION" : "ΤΕΛΕΥΤΑΙΑ ΚΥΚΛΟΦΟΡΙΑ"}</p>
              <EpisodeStatus live={!isUpcoming} />
            </div>
            <p className="hero-session-number">#{sessionNumber}</p>
            <h2 className="display-font">{episode.artistName}</h2>
            {producer ? <p className="hero-credit">ΠΑΡΑΓΩΓΗ / {producer.name}</p> : null}
            <p className="hero-details-copy">{episode.excerpt}</p>
            <div className="hero-actions">
              <Link href={`/episodes/${episode.slug}`} className="rsb-button">{isUpcoming ? "Δες το preview" : "Μπες στο session"}<ArrowUpRight className="h-4 w-4" aria-hidden="true" /></Link>
              {!isUpcoming && episode.audio && isReleased(episode.audio.availableAt) ? <Link href={`/episodes/${episode.slug}/listen`} className="rsb-button-secondary"><Headphones className="h-4 w-4" aria-hidden="true" />Άκουσέ το</Link> : null}
            </div>
            <SocialLinks links={links} iconOnly className="hero-socials" />
          </div>
        </div>
      </Container>
    </section>
  );
}
