import Link from "next/link";
import { ArrowRight, CalendarDays } from "lucide-react";
import { ArtistCard } from "@/components/ArtistCard";
import { Container } from "@/components/Container";
import { ContactSection } from "@/components/ContactSection";
import { CountdownTimer } from "@/components/CountdownTimer";
import { Hero } from "@/components/Hero";
import { PromoTeaser } from "@/components/PromoTeaser";
import { SectionHeading } from "@/components/SectionHeading";
import { ShortClipsStrip } from "@/components/ShortClipsStrip";
import { SocialLinks } from "@/components/SocialLinks";
import { VideoEmbed } from "@/components/VideoEmbed";
import { releaseCadence, releaseSchedule } from "@/config/site";
import { formatGreekDate, getFeaturedArtists, getLatestEpisode, isEpisodeLive } from "@/lib/content";
import type { SocialLink } from "@/types/content";

function getNextRelease() {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  return releaseSchedule.find((item) => new Date(`${item.date}T00:00:00`) >= today) ?? releaseSchedule.at(-1);
}

export default function HomePage() {
  const latestEpisode = getLatestEpisode();
  const featuredArtists = getFeaturedArtists();
  const nextRelease = getNextRelease();
  const latestIsLive = isEpisodeLive(latestEpisode);
  const latestLinks: SocialLink[] = [
    { platform: "youtube", label: "YouTube", url: latestEpisode.youtubeUrl ?? "" },
    { platform: "spotify", label: "Spotify", url: latestEpisode.spotifyUrl ?? "" },
    { platform: "tiktok", label: "TikTok", url: latestEpisode.tiktokUrl ?? "" },
    { platform: "instagram", label: "Instagram", url: latestEpisode.instagramUrl ?? "" }
  ];

  return (
    <>
      <Hero latestEpisode={latestEpisode} isLive={latestIsLive} />

      <PromoTeaser />

      <ShortClipsStrip />

      <section className="border-b border-[var(--line)] py-14">
        <Container>
          <SectionHeading eyebrow={latestIsLive ? "Τώρα" : "Πρώτο επεισόδιο"} title={latestIsLive ? "Το session που ακούγεται τώρα" : "Το πρώτο session ανοίγει σύντομα"} copy={latestIsLive ? "Η ιστορία, η κουβέντα, το beatmaking και το τελικό performance μαζεμένα σε ένα επεισόδιο." : "Μέχρι την πρεμιέρα κρατάμε ανοιχτό το teaser και τη σελίδα του επεισοδίου. Το πλήρες audio και video ανοίγουν στην ημερομηνία τους."} />
          <div className="grid gap-7 lg:grid-cols-[1.12fr_.88fr] lg:items-start">
            <div className="-rotate-[.35deg]">
              <VideoEmbed videoId={latestEpisode.youtubeVideoId} title={latestEpisode.title} />
            </div>
            <div className="border-y border-[var(--line)] py-6 lg:py-8">
              <p className="text-xs font-black uppercase tracking-[0.18em] text-[var(--accent)]">#{String(latestEpisode.number).padStart(3, "0")} / {latestIsLive ? formatGreekDate(latestEpisode.publishedAt) : `Πρεμιέρα ${formatGreekDate(latestEpisode.publishedAt)}`}</p>
              <h2 className="display-font mt-3 text-5xl leading-none sm:text-6xl">{latestEpisode.title}</h2>
              <p className="mt-2 text-lg font-bold text-[var(--foreground)]">{latestEpisode.artistName}</p>
              <p className="mt-5 max-w-xl leading-7 text-[var(--muted)]">{latestEpisode.excerpt}</p>
              <div className="mt-6">
                <SocialLinks links={latestLinks} />
              </div>
              <Link href={`/episodes/${latestEpisode.slug}`} className="mt-7 inline-flex min-h-12 items-center gap-2 bg-[var(--accent)] px-5 py-3 font-black text-black">
                {latestIsLive ? "Άνοιξε το επεισόδιο" : "Πήγαινε στη σελίδα"} <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </Container>
      </section>

      <section className="border-b border-[var(--line)] py-14">
        <Container>
          <div className="grid gap-5 lg:grid-cols-[360px_1fr]">
            <div className="border border-[var(--accent)] bg-[var(--accent)] p-5 text-black">
              <p className="text-xs font-black uppercase tracking-[0.18em]">Πότε ανοίγει</p>
              {nextRelease ? (
                <>
                  <p className="display-font mt-4 text-7xl leading-none">{nextRelease.label}</p>
                  <p className="mt-3 text-lg font-black">{nextRelease.title}</p>
                  <CountdownTimer targetDate={nextRelease.date} />
                </>
              ) : null}
              <p className="mt-5 flex items-center gap-2 text-sm font-black">
                <CalendarDays className="h-4 w-4" aria-hidden="true" />
                {releaseCadence}
              </p>
            </div>
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {releaseSchedule.map((item) => (
                <time key={item.date} dateTime={item.date} className="border border-[var(--line)] bg-[var(--panel)] p-5">
                  <span className="display-font block text-4xl leading-none text-[var(--accent)]">{item.label}</span>
                  <span className="mt-3 block text-sm font-bold text-[var(--muted)]">{item.title}</span>
                </time>
              ))}
            </div>
          </div>
        </Container>
      </section>

      <section className="border-b border-[var(--line)] py-14">
        <Container>
          <SectionHeading eyebrow="Στο δωμάτιο" title="Ποιοι μπήκαν στο πρώτο session" copy="Ο καλεσμένος και οι άνθρωποι που κρατούν τον ήχο, την εικόνα, την παραγωγή και την ταυτότητα του project." />
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {featuredArtists.map((artist) => <ArtistCard key={artist.slug} artist={artist} />)}
          </div>
        </Container>
      </section>


      <ContactSection />

      <section className="bg-[var(--accent)] py-14 text-black">
        <Container>
          <p className="display-font max-w-6xl text-[clamp(2.7rem,8vw,7rem)] leading-[0.9]">
            Δεν κυνηγάμε μόνο το τελικό κομμάτι. Καλούμε rappers να μας αφηγηθούν την ιστορία τους και κρατάμε τη DIY διαδικασία όπως συμβαίνει: ιδέες, γνώμες στο δωμάτιο, λάθη, ενέργεια και όλα όσα χρειάζονται μέχρι ένα beat να γίνει κουπλέ.
          </p>
        </Container>
      </section>
    </>
  );
}
