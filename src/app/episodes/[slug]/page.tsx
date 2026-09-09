import type { Metadata } from "next";
import type { ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, CalendarClock, Captions, Headphones, PlaySquare } from "lucide-react";
import { ArtistCard } from "@/components/ArtistCard";
import { EpisodeAudioPlayer } from "@/components/EpisodeAudioPlayer";
import { EpisodeGallery } from "@/components/EpisodeGallery";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { Container } from "@/components/Container";
import { CreditsList } from "@/components/CreditsList";
import { GearList } from "@/components/GearList";
import { InstagramEmbed } from "@/components/InstagramEmbed";
import { PromoTeaser } from "@/components/PromoTeaser";
import { SectionHeading } from "@/components/SectionHeading";
import { SessionFacts } from "@/components/SessionFacts";
import { SocialLinks } from "@/components/SocialLinks";
import { VideoEmbed } from "@/components/VideoEmbed";
import { formatGreekDate, getAdjacentEpisodes, getArtistBySlug, getEpisodeBySlug, getVisibleEpisodes, isEpisodeLive, isReleased, isValidHttpUrl } from "@/lib/content";
import { createMetadata } from "@/lib/metadata";
import type { SocialLink } from "@/types/content";


export const dynamic = "force-dynamic";
type Props = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return getVisibleEpisodes().map((episode) => ({ slug: episode.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const episode = getEpisodeBySlug(slug);

  if (!episode) {
    return createMetadata({ title: "Δεν βρέθηκε επεισόδιο" });
  }

  return createMetadata({
    title: episode.title,
    description: episode.excerpt,
    path: `/episodes/${episode.slug}`,
    image: episode.thumbnail
  });
}

export default async function EpisodePage({ params }: Props) {
  const { slug } = await params;
  const episode = getEpisodeBySlug(slug);

  if (!episode) {
    notFound();
  }

  const artist = getArtistBySlug(episode.artistSlug);
  const live = isEpisodeLive(episode);
  const adjacent = getAdjacentEpisodes(episode.slug);
  const audioHref = `/episodes/${episode.slug}/audio`;
  const socialLinks: SocialLink[] = [
    { platform: "youtube", label: "YouTube", url: episode.youtubeUrl ?? "" },
    { platform: "spotify", label: "Spotify", url: episode.spotifyUrl ?? "" },
    { platform: "tiktok", label: "TikTok", url: episode.tiktokUrl ?? "" },
    { platform: "instagram", label: "Instagram", url: episode.instagramUrl ?? "" },
    { platform: "twitch", label: "Twitch", url: episode.twitchUrl ?? "" }
  ];

  return (
    <Container className="page-shell">
      <Breadcrumbs items={[{ href: "/episodes", label: "Επεισόδια" }, { label: episode.title }]} />
      <article>
        <header className="episode-cover">
          <Image src={episode.gallery?.[0] ?? episode.thumbnail} alt={`Μέσα στο session: ${episode.artistName}`} fill priority sizes="(min-width: 1280px) 1216px, 100vw" />
          <span className="episode-cover-number display-font" aria-hidden="true">{String(episode.number).padStart(3, "0")}</span>
          <div className="episode-cover-copy">
            <p className="archive-label">Ραπ Στα Μπαμ / Session {String(episode.number).padStart(3, "0")}</p>
            <h1 className="display-font" aria-label={episode.title}>{episode.artistName}</h1>
            <p className="archive-label mt-5">{live ? formatGreekDate(episode.publishedAt) : `Πρεμιέρα ${formatGreekDate(episode.publishedAt)}`}</p>
            <div className="mt-7 flex flex-wrap gap-3">
              <a href="#session-video" className="rsb-button"><PlaySquare className="h-4 w-4" aria-hidden="true" />{live ? "Δες το session" : "Δες το preview"}</a>
              {live && episode.audio && isReleased(episode.audio.availableAt) ? <Link href={`/episodes/${episode.slug}/listen`} className="rsb-button-secondary"><Headphones className="h-4 w-4" aria-hidden="true" />Άκου το επεισόδιο</Link> : null}
            </div>
          </div>
        </header>
        <nav aria-label="Περιεχόμενα επεισοδίου" className="episode-index">
          <span className="archive-label mr-auto text-[var(--dim)]">Μέσα στο session</span>
          <a href="#session-story">Η ιστορία</a>
          {episode.audio ? <a href="#session-audio">Audio</a> : null}
          {episode.gallery?.length ? <a href="#session-gallery">Φωτογραφίες</a> : null}
          <a href="#session-credits">Συντελεστές</a>
        </nav>

        <div className="episode-body">
          <div className="grid min-w-0 grid-cols-1 gap-10">
            <div id="session-video">
            {live ? <VideoEmbed videoId={episode.youtubeVideoId} title={episode.title} poster={episode.thumbnail} /> : (
              <div className="grid gap-5 md:grid-cols-[minmax(220px,320px)_1fr] md:items-center">
                <PromoTeaser episode={episode} compact />
                <div className="border-y border-[var(--line)] px-4 py-5 sm:px-5 sm:py-6">
                  <p className="text-xs font-medium text-[var(--warning)]">Η πρεμιέρα πλησιάζει</p>
                  <h2 className="section-title mt-3">Διαθέσιμο από {formatGreekDate(episode.publishedAt)}</h2>
                  <p className="mt-4 leading-7 text-[var(--muted)]">Μέχρι τότε, δες την προεπισκόπηση και γνώρισε τον καλεσμένο.</p>
                  <div className="mt-5 grid gap-2 sm:grid-cols-2">
                    <UnlockItem icon={<PlaySquare className="h-4 w-4" />} label={episode.youtubeVideoId ? "Full YouTube episode" : "Video link"} />
                    {episode.audio ? <UnlockItem icon={<Headphones className="h-4 w-4" />} label="Audio player" /> : null}
                    {episode.audio ? <UnlockItem icon={<Captions className="h-4 w-4" />} label={episode.audio.captions ? "Captions / listen page" : "Listen page"} /> : null}
                    <UnlockItem icon={<CalendarClock className="h-4 w-4" />} label={`Πρεμιέρα ${formatGreekDate(episode.publishedAt)}`} />
                  </div>
                </div>
              </div>
            )}
            </div>

            <section id="session-story">
              <SectionHeading title="Η ιστορία" />
              <div className="prose-rsb max-w-3xl text-lg leading-8 text-[var(--muted)]">
                {episode.description.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
              </div>
            </section>

            {episode.sessionFacts?.length ? (
              <section>
                <SectionHeading eyebrow="Σημειώσεις" title="Από το session" copy="Τα βασικά στοιχεία όπως τα κρατάμε στο αρχείο του επεισοδίου." />
                <SessionFacts facts={episode.sessionFacts} />
              </section>
            ) : null}


            {live && (episode.youtubeUrl || episode.spotifyUrl) ? (
              <section>
                <SectionHeading title="Το κομμάτι" />
                <SocialLinks links={socialLinks} />
              </section>
            ) : null}

            {episode.audio ? (
              <section id="session-audio">
                <SectionHeading title="Audio επεισοδίου" />
                <div className="grid gap-3">
                  <Link href={`/episodes/${episode.slug}/listen`} className="text-link w-fit">
                    Ακρόαση σε ξεχωριστή σελίδα
                  </Link>
                  <EpisodeAudioPlayer
                    src={audioHref}
                    label={episode.audio.label ?? "Audio αρχείο"}
                    availableAt={episode.audio.availableAt}
                    publishedAt={episode.publishedAt}
                    captionsSrc={episode.audio.captions}
                  />
                </div>
              </section>
            ) : null}

            {live && episode.shortClips?.length ? (
              <section>
                <SectionHeading title="Μικρά clips" />
                <div className="grid gap-3 sm:grid-cols-2">
                  {episode.shortClips.map((clip) => (
                    isValidHttpUrl(clip.url) ? (
                      <a key={clip.title} href={clip.url} target="_blank" rel="noreferrer" className="border border-[var(--line)] bg-[var(--panel)] p-4 font-bold hover:border-[var(--accent)]">
                        {clip.title}
                      </a>
                    ) : null
                  ))}
                </div>
              </section>
            ) : null}

            {live && episode.instagramEmbeds?.length ? (
              <section>
                <SectionHeading title="Reels" />
                <div className="grid gap-5">
                  {episode.instagramEmbeds.map((embed) => (
                    isValidHttpUrl(embed.url) ? <InstagramEmbed key={embed.url} url={embed.url} /> : null
                  ))}
                </div>
              </section>
            ) : null}

            {episode.gallery?.length ? (
              <section id="session-gallery">
                <SectionHeading eyebrow="Φωτογραφίες" title="Μέσα στο δωμάτιο" copy="Στιγμές από τη συζήτηση, το beatmaking και το performance. Πάτησε μια φωτογραφία για μεγέθυνση." />
                <EpisodeGallery images={episode.gallery} title={episode.title} />
              </section>
            ) : null}
          </div>

          <aside className="episode-sidebar grid min-w-0 content-start gap-8 border-t border-[var(--line)] pt-6 lg:border-t-0 lg:pt-0">
            <section id="session-credits">
              <h2 className="display-font mb-3 text-3xl">Συντελεστές</h2>
              <CreditsList credits={episode.credits} />
            </section>
            {episode.gear?.length ? (
              <section>
                <h2 className="display-font mb-3 text-3xl">Εξοπλισμός</h2>
                <GearList gear={episode.gear} />
              </section>
            ) : null}
            <section>
              <h2 className="display-font mb-3 text-3xl">Links επεισοδίου</h2>
              <SocialLinks links={socialLinks} />
            </section>
            {artist ? (
              <section>
                <h2 className="display-font mb-3 text-3xl">Ο καλεσμένος</h2>
                <ArtistCard artist={artist} />
              </section>
            ) : null}
          </aside>
        </div>

        <nav aria-label="Προηγούμενο και επόμενο επεισόδιο" className="mt-12 grid gap-3 border-t border-[var(--line)] pt-6 sm:grid-cols-2">
          {adjacent.previous ? (
            <Link href={`/episodes/${adjacent.previous.slug}`} className="adjacent-link">
              <ArrowLeft className="h-4 w-4" aria-hidden="true" /> {adjacent.previous.title}
            </Link>
          ) : <span />}
          {adjacent.next ? (
            <Link href={`/episodes/${adjacent.next.slug}`} className="adjacent-link justify-end text-right">
              {adjacent.next.title} <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          ) : null}
        </nav>
      </article>
    </Container>
  );
}


function UnlockItem({ icon, label }: { icon: ReactNode; label: string }) {
  return (
    <div className="flex min-h-11 items-center gap-2 text-sm text-[var(--muted)]">
      <span className="text-[var(--accent)]" aria-hidden="true">{icon}</span>
      <span>{label}</span>
    </div>
  );
}
