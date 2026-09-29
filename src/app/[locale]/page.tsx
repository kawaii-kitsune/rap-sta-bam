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
        <PromoTeaser episode={upcomingEpisode} />
      ) : null}

      <SessionContactSheet episodes={visibleEpisodes} />

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

      <section className="home-schedule section-space" aria-labelledby="schedule-title">
        <Container>
          <div className="section-topline">
            <div>
              <p className="rsb-kicker">
                {isEn ? "MONTHLY TIMELINE" : "ΧΡΟΝΟΔΙΑΓΡΑΜΜΑ"}
              </p>
              <h2 id="schedule-title" className="home-section-title">
                {isEn ? "NEXT RELEASES" : "ΕΠΟΜΕΝΕΣ ΚΥΚΛΟΦΟΡΙΕΣ"}
              </h2>
            </div>
            <p className="section-meta">
              {isEn ? "One new session every month" : releaseCadence}
            </p>
          </div>
          <div className="schedule-grid">
            {releaseSchedule.map((item) => (
              <div
                key={item.date}
                className={`schedule-card ${nextRelease?.date === item.date ? "schedule-card-active" : ""}`}
              >
                <div className="schedule-date-chip">
                  <span className="schedule-date-number">{item.label}</span>
                  {nextRelease?.date === item.date ? (
                    <span className="schedule-next-badge">
                      {isEn ? "NEXT UP" : "ΕΠΟΜΕΝΟ"}
                    </span>
                  ) : null}
                </div>
                <p className="schedule-title">{item.title}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <ContactSection />
    </div>
  );
}
