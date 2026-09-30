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
import { defaultLocale } from "@/config/i18n";
import { releaseCadence, releaseSchedule } from "@/config/site";
import {
  getAthensDateKey,
  getFeaturedArtists,
  getLatestEpisode,
  getVisibleEpisodes,
  isEpisodeLive,
  isReleased
} from "@/lib/content";
import "../home.css";

export const dynamic = "force-dynamic";

export default async function HomePage({
  params
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale = defaultLocale } = await params;
  const isEn = locale === "en";

  const latestEpisode = getLatestEpisode(locale);
  const featuredArtists = getFeaturedArtists(locale);
  const nextRelease = releaseSchedule.find((item) => item.date >= getAthensDateKey());
  const visibleEpisodes = getVisibleEpisodes(locale);
  const upcomingEpisode = visibleEpisodes
    .filter((episode) => !isReleased(episode.publishedAt))
    .sort((a, b) => a.number - b.number)[0];

  return (
    <div className="home-page">
      <Hero episode={latestEpisode} isUpcoming={!isEpisodeLive(latestEpisode)} locale={locale} />

      <section id="sessions" className="home-archive section-space" aria-labelledby="sessions-title">
        <Container>
          <div className="section-topline">
            <div>
              <p className="rsb-kicker">
                {isEn ? "EVERY SESSION TELLS A STORY" : "ΚΑΘΕ SESSION ΚΑΙ ΜΙΑ ΙΣΤΟΡΙΑ"}
              </p>
              <h2 id="sessions-title" className="home-section-title">
                {isEn ? "THE SESSIONS" : "ΤΑ SESSIONS"}
                <span className="section-count">[{String(visibleEpisodes.length).padStart(3, "0")}]</span>
              </h2>
            </div>
            <Link href={`/${locale}/episodes`} className="text-link">
              {isEn ? "Full Archive" : "Όλο το αρχείο"} <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>
          <SessionArchive episodes={visibleEpisodes.slice(0, 6)} locale={locale} />
          <p className="archive-footnote">
            {isEn
              ? "RAP STA BAM / INDEPENDENT PRODUCTION / HERAKLION CRETE"
              : "ΡΑΠ ΣΤΑ ΜΠΑΜ / ΑΝΕΞΑΡΤΗΤΗ ΠΑΡΑΓΩΓΗ / ΗΡΑΚΛΕΙΟ ΚΡΗΤΗΣ"}
          </p>
        </Container>
      </section>

      {upcomingEpisode && upcomingEpisode.slug !== latestEpisode.slug ? (
        <PromoTeaser episode={upcomingEpisode} locale={locale} />
      ) : null}

      <SessionContactSheet episodes={visibleEpisodes} locale={locale} />

      <section className="home-crew section-space" aria-label={isEn ? "The crew" : "Το crew"}>
        <Container>
          <div className="section-topline">
            <SectionHeading
              eyebrow={isEn ? "IN FRONT & BEHIND THE LENS" : "ΜΠΡΟΣΤΑ ΚΑΙ ΠΙΣΩ ΑΠΟ ΤΗΝ ΚΑΜΕΡΑ"}
              title={isEn ? "THE CREW" : "ΤΟ CREW"}
              copy={
                isEn
                  ? "The voices, the beats, the visuals. The people making it happen."
                  : "Οι φωνές, τα beats, η εικόνα. Η παρέα που το κάνει να συμβαίνει."
              }
            />
            <Link href={`/${locale}/artists`} className="text-link">
              {isEn ? "Meet the crew" : "Γνώρισε την παρέα"} <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>
          <div className="people-grid">
            {featuredArtists.map((artist, index) => (
              <Link key={artist.slug} href={`/${locale}/artists/${artist.slug}`} className="person-tile">
                <div className="person-tile-image">
                  <Image
                    src={artist.image}
                    alt={artist.name}
                    fill
                    sizes="(min-width: 1100px) 190px, (min-width: 640px) 30vw, 45vw"
                  />
                  <TextureOverlay variant="halftone" />
                  <span className="person-tile-number" aria-hidden="true">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <ArrowUpRight className="person-tile-arrow" aria-hidden="true" />
                </div>
                <p className="person-role">
                  {artist.kind === "team"
                    ? isEn
                      ? "PRODUCTION"
                      : "ΠΑΡΑΓΩΓΗ"
                    : isEn
                      ? "ON THE MIC"
                      : "ΣΤΟ ΜΙΚΡΟΦΩΝΟ"}
                </p>
                <h3 className="card-title">{artist.name.split(" / ")[0]}</h3>
                <p className="person-bio">{artist.shortBio}</p>
              </Link>
            ))}
          </div>
        </Container>
      </section>

      <section className="home-project section-space" aria-labelledby="project-manifesto-title">
        <Container className="project-grid">
          <div className="project-manifesto">
            <p className="rsb-kicker">
              {isEn ? "FORGED BY THE CREW" : "ΦΤΙΑΓΜΕΝΟ ΑΠΟ ΤΗΝ ΠΑΡΕΑ"}
            </p>
            <h2 id="project-manifesto-title" className="home-section-title">
              {isEn ? (
                <>
                  FROM SAMPLE.<br />
                  <span>DOWN TO THE TAKE.</span>
                </>
              ) : (
                <>
                  ΑΠΟ ΤΟ SAMPLE.<br />
                  <span>ΜΕΧΡΙ ΤΟ TAKE.</span>
                </>
              )}
            </h2>
            <p className="project-copy">
              {isEn
                ? "We link up in Heraklion, Crete. Sharing stories, building beats, writing bars, and testing ideas on the fly. We keep the mistakes, the debates, and the energy until the spark turns into a recorded track."
                : "Μαζευόμαστε στο Ηράκλειο. Μοιραζόμαστε ιστορίες, χτίζουμε beats, γράφουμε και δοκιμάζουμε. Κρατάμε τα λάθη και την ενέργεια, μέχρι η ιδέα να γίνει κομμάτι."}
            </p>
            <Link href={`/${locale}/about`} className="text-link">
              {isEn ? "This is Rap Sta Bam" : "Αυτό είναι το Ραπ Στα Μπαμ"}{" "}
              <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>
          <div className="release-board">
            <div className="release-board-heading">
              <h2>{isEn ? "THE RELEASES" : "ΟΙ ΚΥΚΛΟΦΟΡΙΕΣ"}</h2>
              <span className="meta-font">{releaseSchedule[0].date.slice(0, 4)}</span>
            </div>
            <p className="release-cadence">
              {isEn ? "One new session every month" : releaseCadence}
            </p>
            <ol className="rsb-panel">
              {releaseSchedule.map((item) => {
                const isNext = item.date === nextRelease?.date;
                return (
                  <li
                    key={item.date}
                    className={`rsb-row release-row grid grid-cols-[3.5rem_minmax(0,1fr)] items-center gap-4 py-4 last:border-b-0 ${isNext ? "is-next" : ""}`}
                  >
                    <time dateTime={item.date} className="meta-font text-sm text-[var(--dim)]">
                      {item.label}
                    </time>
                    <div>
                      <span className="text-sm font-medium">
                        {isEn ? item.title.replace("Τζίμος", "Tzimos") : item.title}
                      </span>
                      {isNext ? (
                        <span className="mt-1 block text-xs text-[var(--accent)] font-semibold">
                          {isEn ? "Next Premiere" : "Επόμενη πρεμιέρα"}
                        </span>
                      ) : null}
                    </div>
                  </li>
                );
              })}
            </ol>
          </div>
        </Container>
      </section>

      <ContactSection />
    </div>
  );
}
