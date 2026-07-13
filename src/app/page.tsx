import Image from "next/image";
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
          <SectionHeading eyebrow={latestIsLive ? "Τελευταίο επεισόδιο" : "Πρώτη πρεμιέρα"} title={latestIsLive ? "Η session που τρέχει τώρα" : "Το πρώτο επεισόδιο έρχεται"} copy={latestIsLive ? "Το πρώτο επεισόδιο συγκεντρώνει τη διαδικασία, το τελικό performance και τα βασικά links σε ένα σημείο." : "Η σελίδα είναι έτοιμη για την πρεμιέρα με video, audio, credits και υλικό από τη session μόλις ανοίξει η δημοσίευση."} />
          <div className="grid gap-6 lg:grid-cols-[1.05fr_.95fr]">
            <div>
              <VideoEmbed videoId={latestEpisode.youtubeVideoId} title={latestEpisode.title} />
            </div>
            <div className="border border-[var(--line)] bg-[var(--panel)] p-5 sm:p-6">
              <p className="text-xs font-black uppercase tracking-[0.18em] text-[var(--accent)]">#{String(latestEpisode.number).padStart(3, "0")} / {latestIsLive ? formatGreekDate(latestEpisode.publishedAt) : `Πρεμιέρα ${formatGreekDate(latestEpisode.publishedAt)}`}</p>
              <h2 className="display-font mt-3 text-5xl leading-none">{latestEpisode.title}</h2>
              <p className="mt-2 text-lg font-bold text-[var(--foreground)]">{latestEpisode.artistName}</p>
              <p className="mt-4 leading-7 text-[var(--muted)]">{latestEpisode.excerpt}</p>
              <div className="mt-5">
                <SocialLinks links={latestLinks} />
              </div>
              <Link href={`/episodes/${latestEpisode.slug}`} className="mt-6 inline-flex min-h-12 items-center gap-2 bg-[var(--accent)] px-5 py-3 font-black text-black">
                {latestIsLive ? "Πλήρες επεισόδιο" : "Σελίδα επεισοδίου"} <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </Container>
      </section>

      <section className="border-b border-[var(--line)] py-14">
        <Container>
          <div className="grid gap-5 lg:grid-cols-[360px_1fr]">
            <div className="border border-[var(--accent)] bg-[var(--accent)] p-5 text-black">
              <p className="text-xs font-black uppercase tracking-[0.18em]">Next release</p>
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
          <SectionHeading eyebrow="People" title="Συμμετέχοντες & συνεργάτες" copy="Οι άνθρωποι μπροστά και πίσω από τη session: rap, παραγωγή, εικόνα, ήχος και ταυτότητα." />
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {featuredArtists.map((artist) => <ArtistCard key={artist.slug} artist={artist} />)}
          </div>
        </Container>
      </section>

      <section className="border-b border-[var(--line)] py-14">
        <Container>
          <div className="grid gap-6 border border-[var(--line)] bg-[var(--panel)] p-6 md:grid-cols-[360px_1fr] md:items-center">
            <div className="flex min-h-64 items-center justify-center bg-black p-8">
              <Image src="/assets/logo/logo-white-red.png" alt="Λογότυπο Ραπ Στα Μπαμ" width={420} height={390} className="h-auto w-full max-w-72" />
            </div>
            <div>
              <p className="text-xs font-black uppercase tracking-[0.18em] text-[var(--accent)]">Logo appreciation</p>
              <h2 className="display-font mt-2 text-5xl leading-none sm:text-6xl">Η ταυτότητα του Ραπ Στα Μπαμ</h2>
              <p className="mt-4 max-w-3xl text-lg leading-8 text-[var(--muted)]">
                Το logo του Ραπ Στα Μπαμ δίνει στο project την πρώτη του σφραγίδα: άμεσο, σκληρό, αναγνωρίσιμο και φτιαγμένο για να στέκεται δίπλα στη μουσική.
              </p>
              <p className="mt-4 max-w-3xl text-base leading-7 text-[var(--muted)]">
                Ευχαριστούμε το Ego Designs / Αντώνης Ντοβίνος για τη σημαντική προσφορά του στη μοναδική ταυτότητα του project.
              </p>
              <a href="https://www.behance.net/dovi_made_this" target="_blank" rel="noreferrer" className="mt-6 inline-flex min-h-12 items-center border border-[var(--accent)] px-5 py-3 text-sm font-black uppercase tracking-[0.14em] text-[var(--accent)] hover:bg-[var(--accent)] hover:text-black">
                Ego Designs Behance
              </a>
            </div>
          </div>
        </Container>
      </section>

      <ContactSection />

      <section className="bg-[var(--accent)] py-14 text-black">
        <Container>
          <p className="display-font max-w-6xl text-[clamp(2.7rem,8vw,7rem)] leading-[0.9]">
            Δεν μας ενδιαφέρει μόνο το τελικό κομμάτι. Μας ενδιαφέρει η ιστορία του rapper και η DIY διαδικασία: οι ιδέες, οι γνώμες στο δωμάτιο, τα λάθη, η ενέργεια και όλα όσα συμβαίνουν μέχρι ένα beat να γίνει κουπλέ.
          </p>
        </Container>
      </section>
    </>
  );
}
