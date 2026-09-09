import Link from "next/link";
import { ArrowUpRight, Headphones, MapPin } from "lucide-react";
import { Container } from "@/components/Container";
import { EpisodeStatus } from "@/components/EpisodeStatus";
import { PromoTeaser } from "@/components/PromoTeaser";
import { SocialLinks } from "@/components/SocialLinks";
import { VideoEmbed } from "@/components/VideoEmbed";
import { formatGreekDate, isReleased } from "@/lib/content";
import type { Episode, SocialLink } from "@/types/content";

export function Hero({ episode, isUpcoming = false }: { episode: Episode; isUpcoming?: boolean }) {
  const links: SocialLink[] = [
    { platform: "youtube", label: "YouTube", url: episode.youtubeUrl ?? "" },
    { platform: "spotify", label: "Spotify", url: episode.spotifyUrl ?? "" },
    { platform: "instagram", label: "Instagram", url: episode.instagramUrl ?? "" },
    { platform: "tiktok", label: "TikTok", url: episode.tiktokUrl ?? "" }
  ];

  return (
    <section className="home-hero" aria-labelledby="hero-title">
      <Container>
        <div className="hero-intro">
          <div>
            <p className="rsb-kicker">Η μουσική όπως συμβαίνει.</p>
            <h1 id="hero-title" className="hero-title">Ένας rapper. Ένα beat.<br />Ένα session <span>από το μηδέν.</span></h1>
          </div>
          <div>
            <p className="hero-description">Ιστορία, γράψιμο, recording και performance όπως συμβαίνουν στη ζωή. Μια ανεξάρτητη DIY μουσική σειρά, μέσα από το στούντιο.</p>
            <p className="mt-3 flex items-center gap-2 text-xs text-[var(--dim)]"><MapPin className="h-3.5 w-3.5" aria-hidden="true" /> Ηράκλειο Κρήτης</p>
          </div>
        </div>
        <div id="first-episode" className="hero-feature">
          <div className="hero-media">
            {isUpcoming ? <PromoTeaser episode={episode} compact /> : <VideoEmbed videoId={episode.youtubeVideoId} title={episode.title} poster={episode.thumbnail} priority />}
            <div className="hero-footer">
              <span>Session #{String(episode.number).padStart(3, "0")} · {isUpcoming ? "Προεπισκόπηση" : "Ολόκληρο το επεισόδιο"}</span>
              <time dateTime={episode.publishedAt}>{formatGreekDate(episode.publishedAt)}</time>
            </div>
          </div>
          <div className="hero-details">
            <div className="flex flex-wrap items-center gap-3">
              <p className="rsb-kicker">{isUpcoming ? "Προσεχώς στο στούντιο" : "Το τελευταίο session"}</p>
              <EpisodeStatus live={!isUpcoming} />
            </div>
            <h2 className="display-font">{episode.artistName}</h2>
            <p className="hero-details-copy">{episode.excerpt}</p>
            <div className="mt-5 flex flex-wrap gap-3">
              <Link href={`/episodes/${episode.slug}`} className="rsb-button">{isUpcoming ? "Δες το preview" : "Μέσα στο επεισόδιο"}<ArrowUpRight className="h-4 w-4" aria-hidden="true" /></Link>
              {!isUpcoming && episode.audio && isReleased(episode.audio.availableAt) ? <Link href={`/episodes/${episode.slug}/listen`} className="rsb-button-secondary"><Headphones className="h-4 w-4" aria-hidden="true" />Άκουσέ το</Link> : null}
            </div>
            <SocialLinks links={links} iconOnly className="mt-5" />
          </div>
        </div>
      </Container>
    </section>
  );
}
