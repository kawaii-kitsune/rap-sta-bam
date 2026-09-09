import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, CalendarDays } from "lucide-react";
import { Container } from "@/components/Container";
import { ContactSection } from "@/components/ContactSection";
import { EpisodeCard } from "@/components/EpisodeCard";
import { Hero } from "@/components/Hero";
import { PromoTeaser } from "@/components/PromoTeaser";
import { SectionHeading } from "@/components/SectionHeading";
import { releaseCadence, releaseSchedule } from "@/config/site";
import { getAthensDateKey, getFeaturedArtists, getLatestEpisode, getVisibleEpisodes, isEpisodeLive, isReleased } from "@/lib/content";

export const dynamic = "force-dynamic";

export default function HomePage() {
  const latestEpisode = getLatestEpisode();
  const featuredArtists = getFeaturedArtists();
  const nextRelease = releaseSchedule.find((item) => item.date >= getAthensDateKey());
  const visibleEpisodes = getVisibleEpisodes();
  const upcomingEpisode = visibleEpisodes.filter((episode) => !isReleased(episode.publishedAt)).sort((a, b) => a.number - b.number)[0];

  return (
    <>
      <Hero episode={latestEpisode} isUpcoming={!isEpisodeLive(latestEpisode)} />
      <section className="section-space border-b border-[var(--line)]">
        <Container>
          <div className="section-topline">
            <SectionHeading eyebrow="Το αρχείο" title="Κάθε session, μια νέα ιστορία" />
            <Link href="/episodes" className="text-link">Όλα τα επεισόδια <ArrowUpRight className="h-4 w-4" aria-hidden="true" /></Link>
          </div>
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {visibleEpisodes.slice(0, 3).map((episode) => <EpisodeCard key={episode.slug} episode={episode} />)}
          </div>
        </Container>
      </section>
      {upcomingEpisode ? <PromoTeaser episode={upcomingEpisode} /> : null}
      <section className="section-space border-b border-[var(--line)]">
        <Container>
          <div className="section-topline">
            <SectionHeading eyebrow="Μαζί στο στούντιο" title="Τα πρόσωπα πίσω από τα sessions" copy="Οι καλεσμένοι και η ομάδα της παραγωγής, της εικόνας και του ήχου." />
            <Link href="/artists" className="text-link">Όλα τα πρόσωπα <ArrowUpRight className="h-4 w-4" aria-hidden="true" /></Link>
          </div>
          <div className="people-grid">
            {featuredArtists.map((artist) => (
              <Link key={artist.slug} href={`/artists/${artist.slug}`} className="person-tile">
                <div className="person-tile-image">
                  <Image src={artist.image} alt={artist.name} fill sizes="(min-width: 1024px) 280px, (min-width: 640px) 30vw, 45vw" />
                  <ArrowUpRight className="person-tile-arrow" aria-hidden="true" />
                </div>
                <p className="text-xs text-[var(--dim)]">{artist.kind === "team" ? "Ομάδα" : "Καλεσμένος"}</p>
                <h3 className="card-title mt-1">{artist.name}</h3>
                <p className="mt-2 line-clamp-3 text-sm leading-6 text-[var(--muted)]">{artist.shortBio}</p>
              </Link>
            ))}
          </div>
        </Container>
      </section>
      <section className="section-space">
        <Container className="grid gap-10 lg:grid-cols-2 lg:gap-20">
          <div>
            <SectionHeading eyebrow="Το project" title="Από το πρώτο sample στο τελικό take" />
            <p className="text-base leading-8 text-[var(--muted)]">Δεν κυνηγάμε μόνο το τελικό κομμάτι. Καλούμε rappers να μας αφηγηθούν την ιστορία τους και κρατάμε τη DIY διαδικασία όπως συμβαίνει: ιδέες, γνώμες στο δωμάτιο, λάθη, ενέργεια και όλα όσα χρειάζονται μέχρι ένα beat να γίνει κουπλέ.</p>
            <Link href="/about" className="text-link mt-4">Γνώρισε το Ραπ Στα Μπαμ <ArrowUpRight className="h-4 w-4" aria-hidden="true" /></Link>
          </div>
          <div>
            <div className="mb-5 flex items-center gap-3"><CalendarDays className="h-5 w-5 text-[var(--dim)]" aria-hidden="true" /><h2 className="card-title">{releaseCadence}</h2></div>
            <ol className="rsb-panel">
              {releaseSchedule.map((item) => (
                <li key={item.date} className={`rsb-row release-row grid grid-cols-[3.5rem_minmax(0,1fr)] items-center gap-4 py-4 last:border-b-0 ${item.date === nextRelease?.date ? "is-next" : ""}`}>
                  <time dateTime={item.date} className="meta-font text-sm text-[var(--dim)]">{item.label}</time>
                  <div><span className="text-sm font-medium">{item.title}</span>{item.date === nextRelease?.date ? <span className="mt-1 block text-xs text-[var(--accent)]">Επόμενη πρεμιέρα</span> : null}</div>
                </li>
              ))}
            </ol>
          </div>
        </Container>
      </section>
      <ContactSection />
    </>
  );
}
