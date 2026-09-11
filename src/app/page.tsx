import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Container } from "@/components/Container";
import { ContactSection } from "@/components/ContactSection";
import { Hero } from "@/components/Hero";
import { PromoTeaser } from "@/components/PromoTeaser";
import { SectionHeading } from "@/components/SectionHeading";
import { SessionArchive } from "@/components/SessionArchive";
import { SessionContactSheet } from "@/components/SessionContactSheet";
import { TextureOverlay } from "@/components/TextureOverlay";
import { releaseCadence, releaseSchedule } from "@/config/site";
import { getAthensDateKey, getFeaturedArtists, getLatestEpisode, getVisibleEpisodes, isEpisodeLive, isReleased } from "@/lib/content";
import "./home.css";

export const dynamic = "force-dynamic";

export default function HomePage() {
  const latestEpisode = getLatestEpisode();
  const featuredArtists = getFeaturedArtists();
  const nextRelease = releaseSchedule.find((item) => item.date >= getAthensDateKey());
  const visibleEpisodes = getVisibleEpisodes();
  const upcomingEpisode = visibleEpisodes.filter((episode) => !isReleased(episode.publishedAt)).sort((a, b) => a.number - b.number)[0];

  return (
    <div className="home-page">
      <Hero episode={latestEpisode} isUpcoming={!isEpisodeLive(latestEpisode)} />
      <section id="sessions" className="home-archive section-space" aria-labelledby="sessions-title">
        <Container>
          <div className="section-topline">
            <div>
              <p className="rsb-kicker">ΚΑΘΕ SESSION ΚΑΙ ΜΙΑ ΙΣΤΟΡΙΑ</p>
              <h2 id="sessions-title" className="home-section-title">ΤΑ SESSIONS<span className="section-count">[{String(visibleEpisodes.length).padStart(3, "0")}]</span></h2>
            </div>
            <Link href="/episodes" className="text-link">Όλο το αρχείο <ArrowUpRight className="h-4 w-4" aria-hidden="true" /></Link>
          </div>
          <SessionArchive episodes={visibleEpisodes.slice(0, 6)} />
          <p className="archive-footnote">ΡΑΠ ΣΤΑ ΜΠΑΜ / ΑΝΕΞΑΡΤΗΤΗ ΠΑΡΑΓΩΓΗ / ΗΡΑΚΛΕΙΟ ΚΡΗΤΗΣ</p>
        </Container>
      </section>
      {upcomingEpisode && upcomingEpisode.slug !== latestEpisode.slug ? <PromoTeaser episode={upcomingEpisode} /> : null}
      <SessionContactSheet episodes={visibleEpisodes} />
      <section className="home-crew section-space" aria-label="Το crew">
        <Container>
          <div className="section-topline">
            <SectionHeading eyebrow="ΜΠΡΟΣΤΑ ΚΑΙ ΠΙΣΩ ΑΠΟ ΤΗΝ ΚΑΜΕΡΑ" title="ΤΟ CREW" copy="Οι φωνές, τα beats, η εικόνα. Η παρέα που το κάνει να συμβαίνει." />
            <Link href="/artists" className="text-link">Γνώρισε την παρέα <ArrowUpRight className="h-4 w-4" aria-hidden="true" /></Link>
          </div>
          <div className="people-grid">
            {featuredArtists.map((artist, index) => (
              <Link key={artist.slug} href={`/artists/${artist.slug}`} className="person-tile">
                <div className="person-tile-image">
                  <Image src={artist.image} alt={artist.name} fill sizes="(min-width: 1100px) 190px, (min-width: 640px) 30vw, 45vw" />
                  <TextureOverlay variant="halftone" />
                  <span className="person-tile-number" aria-hidden="true">{String(index + 1).padStart(2, "0")}</span>
                  <ArrowUpRight className="person-tile-arrow" aria-hidden="true" />
                </div>
                <p className="person-role">{artist.kind === "team" ? "ΠΑΡΑΓΩΓΗ" : "ΣΤΟ ΜΙΚΡΟΦΩΝΟ"}</p>
                <h3 className="card-title">{artist.name.split(" / ")[0]}</h3>
                <p className="person-bio">{artist.shortBio}</p>
              </Link>
            ))}
          </div>
        </Container>
      </section>
      <section className="home-project section-space">
        <Container className="project-grid">
          <div className="project-manifesto">
            <p className="rsb-kicker">ΦΤΙΑΓΜΕΝΟ ΑΠΟ ΤΗΝ ΠΑΡΕΑ</p>
            <h2 className="home-section-title">ΑΠΟ ΤΟ SAMPLE.<br /><span>ΜΕΧΡΙ ΤΟ TAKE.</span></h2>
            <p className="project-copy">Μαζευόμαστε στο Ηράκλειο. Μοιραζόμαστε ιστορίες, χτίζουμε beats, γράφουμε και δοκιμάζουμε. Κρατάμε τα λάθη και την ενέργεια, μέχρι η ιδέα να γίνει κομμάτι.</p>
            <Link href="/about" className="text-link">Αυτό είναι το Ραπ Στα Μπαμ <ArrowUpRight className="h-4 w-4" aria-hidden="true" /></Link>
          </div>
          <div className="release-board">
            <div className="release-board-heading"><h2>ΟΙ ΚΥΚΛΟΦΟΡΙΕΣ</h2><span className="meta-font">{releaseSchedule[0].date.slice(0, 4)}</span></div>
            <p className="release-cadence">{releaseCadence}</p>
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
    </div>
  );
}
