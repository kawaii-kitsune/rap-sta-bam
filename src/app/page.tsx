import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowUpRight, CalendarDays, Headphones } from "lucide-react";
import { Container } from "@/components/Container";
import { ContactSection } from "@/components/ContactSection";
import { EpisodeCard } from "@/components/EpisodeCard";
import { Hero } from "@/components/Hero";
import { PromoTeaser } from "@/components/PromoTeaser";
import { SectionHeading } from "@/components/SectionHeading";
import { SocialLinks } from "@/components/SocialLinks";
import { VideoEmbed } from "@/components/VideoEmbed";
import { releaseCadence, releaseSchedule } from "@/config/site";
import { formatGreekDate, getAthensDateKey, getFeaturedArtists, getLatestEpisode, getVisibleEpisodes, isEpisodeLive, isReleased } from "@/lib/content";
import type { SocialLink } from "@/types/content";


export const dynamic = "force-dynamic";
function getNextRelease() {
  const today = getAthensDateKey();

  return releaseSchedule.find((item) => item.date >= today);
}

export default function HomePage() {
  const latestEpisode = getLatestEpisode();
  const featuredArtists = getFeaturedArtists();
  const nextRelease = getNextRelease();
  const latestIsLive = isEpisodeLive(latestEpisode);
  const visibleEpisodes = getVisibleEpisodes();
  const upcomingEpisode = getVisibleEpisodes()
    .filter((episode) => episode.status !== "draft" && !isReleased(episode.publishedAt))
    .sort((a, b) => a.number - b.number)[0];
  const heroEpisode = upcomingEpisode ?? latestEpisode;
  const latestLinks: SocialLink[] = [
    { platform: "youtube", label: "YouTube", url: latestEpisode.youtubeUrl ?? "" },
    { platform: "spotify", label: "Spotify", url: latestEpisode.spotifyUrl ?? "" },
    { platform: "tiktok", label: "TikTok", url: latestEpisode.tiktokUrl ?? "" },
    { platform: "instagram", label: "Instagram", url: latestEpisode.instagramUrl ?? "" }
  ];

  return (
    <>
      <Hero episode={heroEpisode} isUpcoming={Boolean(upcomingEpisode)} />

      {upcomingEpisode ? <PromoTeaser episode={upcomingEpisode} /> : null}

      <section id="first-episode" className="section-space scroll-mt-24 border-b border-[var(--line)]">
        <Container>
          <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_320px] lg:gap-14 lg:items-start">
            <div>
              <SectionHeading eyebrow={latestIsLive ? "Τώρα / Τελευταίο επεισόδιο" : "Πρώτο επεισόδιο"} title={latestEpisode.title} />
              <p className="max-w-2xl leading-7 text-[var(--muted)]">{latestEpisode.number === 1 ? "Η πρώτη καταγραφή του project: ιστορία, beatmaking, γράψιμο, ηχογράφηση και performance χωρίς έτοιμο κομμάτι." : latestEpisode.excerpt}</p>
              <div className="mt-8">
                {latestIsLive ? <VideoEmbed videoId={latestEpisode.youtubeVideoId} title={latestEpisode.title} poster={latestEpisode.thumbnail} /> : <PromoTeaser episode={latestEpisode} compact />}
              </div>
            </div>

            <aside className="session-notes">
              <p className="archive-label mb-8 text-[var(--dim)]">ΡΣΜ / Σημειώσεις session</p>
              <p className="text-xs font-black uppercase tracking-[0.18em] text-[var(--accent)]">
                #{String(latestEpisode.number).padStart(3, "0")} / {latestIsLive ? formatGreekDate(latestEpisode.publishedAt) : `Πρεμιέρα ${formatGreekDate(latestEpisode.publishedAt)}`}
              </p>
              <h2 className="display-font mt-3 text-5xl leading-none">{latestEpisode.artistName}</h2>
              <p className="mt-5 leading-7 text-[var(--muted)]">{latestEpisode.excerpt}</p>
              <div className="mt-6">
                <SocialLinks links={latestLinks} />
              </div>
              <Link href={`/episodes/${latestEpisode.slug}`} className="rsb-button mt-7">
                Άνοιξε τη σελίδα επεισοδίου <ArrowRight className="h-4 w-4" />
              </Link>
              {latestIsLive && latestEpisode.audio && isReleased(latestEpisode.audio.availableAt) ? <Link href={`/episodes/${latestEpisode.slug}/listen`} className="rsb-button-secondary mt-3 w-full"><Headphones className="h-4 w-4" aria-hidden="true" /> Άκου το επεισόδιο</Link> : null}
            </aside>
          </div>
        </Container>
      </section>

      <section className="section-space border-b border-[var(--line)]">
        <Container>
          <div className="section-topline">
            <SectionHeading eyebrow="Αρχείο / Sessions" title="Όλα τα επεισόδια" />
            <Link href="/episodes" className="text-link">Εξερεύνησε το αρχείο <ArrowUpRight className="h-4 w-4" aria-hidden="true" /></Link>
          </div>
          <div className="grid gap-7 md:grid-cols-2 lg:grid-cols-3">
            {visibleEpisodes.slice(0, 3).map((episode) => <EpisodeCard key={episode.slug} episode={episode} />)}
          </div>
        </Container>
      </section>

      <section className="section-space border-b border-[var(--line)]">
        <Container>
          <div className="grid gap-8 lg:grid-cols-[320px_1fr]">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.18em] text-[var(--accent)]">Πρεμιέρες</p>
              <h2 className="display-font mt-3 text-5xl leading-none">Ένα νέο session κάθε μήνα</h2>
              {nextRelease ? (
                <p className="mt-5 flex items-center gap-2 text-sm font-bold text-[var(--muted)]">
                  <CalendarDays className="h-4 w-4 text-[var(--accent)]" aria-hidden="true" />
                  Επόμενο: {nextRelease.label} / {nextRelease.title}
                </p>
              ) : null}
              <p className="mt-3 text-sm leading-6 text-[var(--muted)]">{releaseCadence}, με το audio να ανοίγει στην πρεμιέρα.</p>
            </div>

            <ol className="rsb-panel">
              {releaseSchedule.map((item) => (
                <li key={item.date} className={`rsb-row release-row grid gap-2 py-4 last:border-b-0 sm:grid-cols-[120px_1fr] ${item.date === nextRelease?.date ? "is-next" : ""}`}>
                  <time dateTime={item.date} className="display-font text-3xl leading-none">{item.label}</time>
                  <span className="font-bold text-[var(--foreground)]">{item.title}</span>
                </li>
              ))}
            </ol>
          </div>
        </Container>
      </section>

      <section className="section-space border-b border-[var(--line)]">
        <Container>
          <div className="section-topline">
            <SectionHeading eyebrow="Μαζί μας στα sessions" title="Καλεσμένος και team" copy="Οι καλεσμένοι artists και οι άνθρωποι της παραγωγής, της εικόνας, του ήχου και της ταυτότητας." />
            <Link href="/artists" className="text-link">Όλα τα πρόσωπα <ArrowUpRight className="h-4 w-4" aria-hidden="true" /></Link>
          </div>
          <div className="people-grid">
            {featuredArtists.map((artist) => (
              <Link key={artist.slug} href={`/artists/${artist.slug}`} className="person-tile group">
                <div className="person-tile-image">
                  <Image src={artist.image} alt={artist.name} fill sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw" className="object-cover grayscale" />
                  <ArrowUpRight className="person-tile-arrow" aria-hidden="true" />
                </div>
                <div>
                  <p className="meta-font text-[0.7rem] font-bold uppercase tracking-[0.12em] text-[var(--accent)]">{artist.kind === "team" ? "Team" : "Καλεσμένος"}</p>
                  <h3 className="display-font mt-1 text-3xl leading-none">{artist.name}</h3>
                  <p className="mt-2 line-clamp-3 text-sm leading-6 text-[var(--muted)]">{artist.shortBio}</p>
                </div>
              </Link>
            ))}
          </div>
        </Container>
      </section>

      <ContactSection />

      <section className="manifesto-section section-space border-b border-[var(--line)]">
        <Container>
          <p className="archive-label mb-7">Ραπ Στα Μπαμ / Από το μηδέν.</p>
          <p className="max-w-4xl text-2xl font-semibold leading-10 text-[var(--foreground)] sm:text-4xl sm:leading-[1.15]">
            Δεν κυνηγάμε μόνο το τελικό κομμάτι. Καλούμε rappers να μας αφηγηθούν την ιστορία τους και κρατάμε τη DIY διαδικασία όπως συμβαίνει: ιδέες, γνώμες στο δωμάτιο, λάθη, ενέργεια και όλα όσα χρειάζονται μέχρι ένα beat να γίνει κουπλέ.
          </p>
        </Container>
      </section>
    </>
  );
}
