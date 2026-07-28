import Image from "next/image";
import Link from "next/link";
import { ArrowRight, CalendarDays } from "lucide-react";
import { Container } from "@/components/Container";
import { ContactSection } from "@/components/ContactSection";
import { Hero } from "@/components/Hero";
import { SectionHeading } from "@/components/SectionHeading";
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
      <Hero latestEpisode={latestEpisode} />

      <section id="first-episode" className="scroll-mt-24 border-b border-[var(--line)] py-16">
        <Container>
          <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_380px] lg:items-start">
            <div>
              <SectionHeading eyebrow={latestIsLive ? "Τώρα" : "Πρώτο επεισόδιο"} title={latestEpisode.title} copy="Η πρώτη καταγραφή του project: ιστορία, beatmaking, γράψιμο, ηχογράφηση και performance χωρίς έτοιμο κομμάτι." />
              <div className="mt-8">
                <VideoEmbed videoId={latestEpisode.youtubeVideoId} title={latestEpisode.title} />
              </div>
            </div>

            <aside className="rsb-panel py-5">
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
            </aside>
          </div>
        </Container>
      </section>

      <section className="border-b border-[var(--line)] py-16">
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
                <li key={item.date} className="rsb-row grid gap-2 py-4 last:border-b-0 sm:grid-cols-[120px_1fr]">
                  <time dateTime={item.date} className="display-font text-3xl leading-none text-[var(--accent)]">{item.label}</time>
                  <span className="font-bold text-[var(--foreground)]">{item.title}</span>
                </li>
              ))}
            </ol>
          </div>
        </Container>
      </section>

      <section className="border-b border-[var(--line)] py-16">
        <Container>
          <SectionHeading eyebrow="Μαζί μας στα sessions" title="Καλεσμένος και team" copy="Ο Τζίμος είναι ο καλεσμένος artist του #001. Οι υπόλοιποι είναι οι άνθρωποι της παραγωγής, της εικόνας, του ήχου και της ταυτότητας." />
          <div className="rsb-panel">
            {featuredArtists.map((artist) => (
              <Link key={artist.slug} href={`/artists/${artist.slug}`} className="rsb-row grid gap-4 py-5 last:border-b-0 sm:grid-cols-[96px_1fr] sm:items-center">
                <div className="relative aspect-square overflow-hidden bg-black">
                  <Image src={artist.image} alt={artist.name} fill sizes="96px" className="object-cover grayscale" />
                </div>
                <div>
                  <p className="meta-font text-[0.7rem] font-bold uppercase tracking-[0.12em] text-[var(--accent)]">{artist.kind === "team" ? "Team" : "Καλεσμένος"}</p>
                  <h3 className="display-font mt-1 text-3xl leading-none">{artist.name}</h3>
                  <p className="mt-2 max-w-2xl text-sm leading-6 text-[var(--muted)]">{artist.shortBio}</p>
                </div>
              </Link>
            ))}
          </div>
        </Container>
      </section>

      <ContactSection />

      <section className="border-b border-[var(--line)] py-16">
        <Container>
          <p className="max-w-4xl text-2xl font-semibold leading-10 text-[var(--foreground)] sm:text-4xl sm:leading-[1.15]">
            Δεν κυνηγάμε μόνο το τελικό κομμάτι. Καλούμε rappers να μας αφηγηθούν την ιστορία τους και κρατάμε τη DIY διαδικασία όπως συμβαίνει: ιδέες, γνώμες στο δωμάτιο, λάθη, ενέργεια και όλα όσα χρειάζονται μέχρι ένα beat να γίνει κουπλέ.
          </p>
        </Container>
      </section>
    </>
  );
}
