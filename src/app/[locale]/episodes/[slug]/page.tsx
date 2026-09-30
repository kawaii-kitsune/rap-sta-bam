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
import { ShareLinks } from "@/components/ShareLinks";
import { SocialLinks } from "@/components/SocialLinks";
import { VideoEmbed } from "@/components/VideoEmbed";
import { JsonLd } from "@/components/JsonLd";
import { defaultLocale, locales } from "@/config/i18n";
import { siteConfig } from "@/config/site";
import {
  formatDate,
  getAdjacentEpisodes,
  getArtistBySlug,
  getEpisodeBySlug,
  getVisibleEpisodes,
  isEpisodeLive,
  isReleased,
  isValidHttpUrl
} from "@/lib/content";
import { createMetadata } from "@/lib/metadata";
import type { SocialLink } from "@/types/content";

export const dynamic = "force-dynamic";

type Props = {
  params: Promise<{ locale: string; slug: string }>;
};

export function generateStaticParams() {
  const episodes = getVisibleEpisodes();
  return locales.flatMap((locale) =>
    episodes.map((episode) => ({ locale, slug: episode.slug }))
  );
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale = defaultLocale, slug } = await params;
  const episode = getEpisodeBySlug(slug, locale);

  if (!episode) {
    return createMetadata({
      title: locale === "en" ? "Episode Not Found" : "Δεν βρέθηκε επεισόδιο",
      locale
    });
  }

  const live = isEpisodeLive(episode);

  return createMetadata({
    title: episode.title,
    description: episode.excerpt,
    path: `/${locale}/episodes/${episode.slug}`,
    image: episode.thumbnail,
    locale,
    audio:
      live && episode.audio
        ? {
            url: `${siteConfig.baseUrl}/episodes/${episode.slug}/audio`,
            type: episode.audio.mimeType ?? "audio/mpeg"
          }
        : undefined
  });
}

export default async function EpisodePage({ params }: Props) {
  const { locale = defaultLocale, slug } = await params;
  const isEn = locale === "en";

  const episode = getEpisodeBySlug(slug, locale);

  if (!episode) {
    notFound();
  }

  const artist = getArtistBySlug(episode.artistSlug, locale);
  const live = isEpisodeLive(episode);
  const adjacent = getAdjacentEpisodes(episode.slug, locale);
  const audioHref = `/episodes/${episode.slug}/audio`;

  const socialLinks: SocialLink[] = [
    { platform: "youtube", label: "YouTube", url: episode.youtubeUrl ?? "" },
    { platform: "spotify", label: "Spotify", url: episode.spotifyUrl ?? "" },
    { platform: "tiktok", label: "TikTok", url: episode.tiktokUrl ?? "" },
    { platform: "instagram", label: "Instagram", url: episode.instagramUrl ?? "" },
    { platform: "twitch", label: "Twitch", url: episode.twitchUrl ?? "" }
  ];

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: isEn ? "Home" : "Αρχική",
        item: `${siteConfig.baseUrl}/${locale}`
      },
      {
        "@type": "ListItem",
        position: 2,
        name: isEn ? "Sessions" : "Επεισόδια",
        item: `${siteConfig.baseUrl}/${locale}/episodes`
      },
      {
        "@type": "ListItem",
        position: 3,
        name: episode.title,
        item: `${siteConfig.baseUrl}/${locale}/episodes/${episode.slug}`
      }
    ]
  };

  const videoJsonLd = episode.youtubeVideoId
    ? {
        "@context": "https://schema.org",
        "@type": "VideoObject",
        name: episode.title,
        description: episode.excerpt,
        thumbnailUrl: [`${siteConfig.baseUrl}${episode.thumbnail}`],
        uploadDate: `${episode.publishedAt}T12:00:00+03:00`,
        embedUrl: `https://www.youtube.com/embed/${episode.youtubeVideoId}`
      }
    : null;

  return (
    <Container className="page-shell">
      <JsonLd data={breadcrumbJsonLd} />
      {videoJsonLd ? <JsonLd data={videoJsonLd} /> : null}
      <Breadcrumbs
        items={[
          { href: `/${locale}/episodes`, label: isEn ? "Sessions" : "Επεισόδια" },
          { label: episode.title }
        ]}
      />
      <article>
        <header className="episode-cover">
          <Image
            src={episode.gallery?.[0] ?? episode.thumbnail}
            alt={isEn ? `Inside the session: ${episode.artistName}` : `Μέσα στο session: ${episode.artistName}`}
            fill
            priority
            sizes="(min-width: 1280px) 1216px, 100vw"
          />
          <span className="episode-cover-number display-font" aria-hidden="true">
            {String(episode.number).padStart(3, "0")}
          </span>
          <div className="episode-cover-copy">
            <p className="archive-label">
              {isEn ? `Rap Sta Bam / Session ${String(episode.number).padStart(3, "0")}` : `Ραπ Στα Μπαμ / Session ${String(episode.number).padStart(3, "0")}`}
            </p>
            <h1 className="display-font" aria-label={episode.title}>
              {episode.artistName}
            </h1>
            <p className="archive-label mt-5">
              {live
                ? formatDate(episode.publishedAt, locale)
                : isEn
                  ? `Premiere: ${formatDate(episode.publishedAt, locale)}`
                  : `Πρεμιέρα ${formatDate(episode.publishedAt, locale)}`}
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <a href="#session-video" className="rsb-button">
                <PlaySquare className="h-4 w-4" aria-hidden="true" />
                {live ? (isEn ? "Watch Session" : "Δες το session") : (isEn ? "Watch Preview" : "Δες το preview")}
              </a>
              {live && episode.audio && isReleased(episode.audio.availableAt) ? (
                <Link href={`/${locale}/episodes/${episode.slug}/listen`} className="rsb-button-secondary">
                  <Headphones className="h-4 w-4" aria-hidden="true" />
                  {isEn ? "Listen to Audio" : "Άκου το επεισόδιο"}
                </Link>
              ) : null}
            </div>
          </div>
        </header>

        <nav aria-label={isEn ? "Episode table of contents" : "Περιεχόμενα επεισοδίου"} className="episode-index">
          <span className="archive-label mr-auto text-[var(--dim)]">
            {isEn ? "Inside the session" : "Μέσα στο session"}
          </span>
          <a href="#session-story">{isEn ? "Story" : "Η ιστορία"}</a>
          {episode.audio ? <a href="#session-audio">{isEn ? "Audio" : "Audio"}</a> : null}
          {episode.gallery?.length ? <a href="#session-gallery">{isEn ? "Photos" : "Φωτογραφίες"}</a> : null}
          <a href="#session-credits">{isEn ? "Credits" : "Συντελεστές"}</a>
        </nav>

        <div className="episode-body">
          <div className="grid min-w-0 grid-cols-1 gap-10">
            <div id="session-video">
              {live ? (
                <VideoEmbed
                  videoId={episode.youtubeVideoId}
                  title={episode.title}
                  poster={episode.thumbnail}
                />
              ) : (
                <div className="grid gap-5 md:grid-cols-[minmax(220px,320px)_1fr] md:items-center">
                  <PromoTeaser episode={episode} compact />
                  <div className="border-y border-[var(--line)] px-4 py-5 sm:px-5 sm:py-6">
                    <p className="text-xs font-medium text-[var(--warning)]">
                      {isEn ? "Premiere approaching" : "Η πρεμιέρα πλησιάζει"}
                    </p>
                    <h2 className="section-title mt-3">
                      {isEn
                        ? `Available from ${formatDate(episode.publishedAt, locale)}`
                        : `Διαθέσιμο από ${formatDate(episode.publishedAt, locale)}`}
                    </h2>
                    <p className="mt-4 leading-7 text-[var(--muted)]">
                      {isEn
                        ? "Until then, watch the preview and get to know the guest artist."
                        : "Μέχρι τότε, δες την προεπισκόπηση και γνώρισε τον καλεσμένο."}
                    </p>
                    <div className="mt-5 grid gap-2 sm:grid-cols-2">
                      <UnlockItem
                        icon={<PlaySquare className="h-4 w-4" />}
                        label={episode.youtubeVideoId ? "Full YouTube episode" : "Video link"}
                      />
                      {episode.audio ? (
                        <UnlockItem icon={<Headphones className="h-4 w-4" />} label="Audio player" />
                      ) : null}
                      {episode.audio ? (
                        <UnlockItem
                          icon={<Captions className="h-4 w-4" />}
                          label={episode.audio.captions ? (isEn ? "Captions / listen page" : "Captions / listen page") : "Listen page"}
                        />
                      ) : null}
                      <UnlockItem
                        icon={<CalendarClock className="h-4 w-4" />}
                        label={isEn ? `Premiere ${formatDate(episode.publishedAt, locale)}` : `Πρεμιέρα ${formatDate(episode.publishedAt, locale)}`}
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>

            <section id="session-story">
              <SectionHeading title={isEn ? "The Story" : "Η ιστορία"} />
              <div className="prose-rsb max-w-3xl text-lg leading-8 text-[var(--muted)]">
                {episode.description.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
            </section>

            {episode.sessionFacts?.length ? (
              <section>
                <SectionHeading
                  eyebrow={isEn ? "Notes" : "Σημειώσεις"}
                  title={isEn ? "From the Session" : "Από το session"}
                  copy={
                    isEn
                      ? "Key details documented from the episode's archive."
                      : "Τα βασικά στοιχεία όπως τα κρατάμε στο αρχείο του επεισοδίου."
                  }
                />
                <SessionFacts facts={episode.sessionFacts} />
              </section>
            ) : null}

            {live && (episode.youtubeUrl || episode.spotifyUrl) ? (
              <section>
                <SectionHeading title={isEn ? "The Track" : "Το κομμάτι"} />
                <SocialLinks links={socialLinks} />
              </section>
            ) : null}

            {episode.audio ? (
              <section id="session-audio">
                <SectionHeading title={isEn ? "Episode Audio" : "Audio επεισοδίου"} />
                <div className="grid gap-3">
                  <Link href={`/${locale}/episodes/${episode.slug}/listen`} className="text-link w-fit">
                    {isEn ? "Listen on dedicated page" : "Ακρόαση σε ξεχωριστή σελίδα"}
                  </Link>
                  <EpisodeAudioPlayer
                    src={audioHref}
                    label={episode.audio.label ?? (isEn ? "Audio File" : "Audio αρχείο")}
                    availableAt={episode.audio.availableAt}
                    publishedAt={episode.publishedAt}
                    captionsSrc={episode.audio.captions}
                  />
                </div>
              </section>
            ) : null}

            {live && episode.shortClips?.length ? (
              <section>
                <SectionHeading title={isEn ? "Short Clips" : "Μικρά clips"} />
                <div className="grid gap-3 sm:grid-cols-2">
                  {episode.shortClips.map((clip) =>
                    isValidHttpUrl(clip.url) ? (
                      <a
                        key={clip.title}
                        href={clip.url}
                        target="_blank"
                        rel="noreferrer"
                        className="border border-[var(--line)] bg-[var(--panel)] p-4 font-bold hover:border-[var(--accent)]"
                      >
                        {clip.title}
                      </a>
                    ) : null
                  )}
                </div>
              </section>
            ) : null}

            {live && episode.instagramEmbeds?.length ? (
              <section>
                <SectionHeading title="Reels" />
                <div className="grid gap-5">
                  {episode.instagramEmbeds.map((embed) =>
                    isValidHttpUrl(embed.url) ? (
                      <InstagramEmbed key={embed.url} url={embed.url} />
                    ) : null
                  )}
                </div>
              </section>
            ) : null}

            {episode.gallery?.length ? (
              <section id="session-gallery">
                <SectionHeading
                  eyebrow={isEn ? "Photos" : "Φωτογραφίες"}
                  title={isEn ? "Inside the Room" : "Μέσα στο δωμάτιο"}
                  copy={
                    isEn
                      ? "Moments from studio dialogue, beatmaking, and vocal performance. Tap any photo to enlarge."
                      : "Στιγμές από τη συζήτηση, το beatmaking και το performance. Πάτησε μια φωτογραφία για μεγέθυνση."
                  }
                />
                <EpisodeGallery images={episode.gallery} title={episode.title} />
              </section>
            ) : null}
          </div>

          <aside className="episode-sidebar grid min-w-0 content-start gap-8 border-t border-[var(--line)] pt-6 lg:border-t-0 lg:pt-0">
            <section id="session-credits">
              <h2 className="display-font mb-3 text-3xl">{isEn ? "Credits" : "Συντελεστές"}</h2>
              <CreditsList credits={episode.credits} />
            </section>
            {episode.gear?.length ? (
              <section>
                <h2 className="display-font mb-3 text-3xl">{isEn ? "Studio Gear" : "Εξοπλισμός"}</h2>
                <GearList gear={episode.gear} />
              </section>
            ) : null}
            <section>
              <h2 className="display-font mb-3 text-3xl">{isEn ? "Episode Links" : "Links επεισοδίου"}</h2>
              <SocialLinks links={socialLinks} />
              <ShareLinks title={episode.title} locale={locale} />
            </section>
            {artist ? (
              <section>
                <h2 className="display-font mb-3 text-3xl">{isEn ? "Featured Artist" : "Ο καλεσμένος"}</h2>
                <ArtistCard artist={artist} />
              </section>
            ) : null}
          </aside>
        </div>

        <nav
          aria-label={isEn ? "Previous and next episode" : "Προηγούμενο και επόμενο επεισόδιο"}
          className="mt-12 grid gap-3 border-t border-[var(--line)] pt-6 sm:grid-cols-2"
        >
          {adjacent.previous ? (
            <Link href={`/${locale}/episodes/${adjacent.previous.slug}`} className="adjacent-link">
              <ArrowLeft className="h-4 w-4" aria-hidden="true" /> {adjacent.previous.title}
            </Link>
          ) : (
            <span />
          )}
          {adjacent.next ? (
            <Link
              href={`/${locale}/episodes/${adjacent.next.slug}`}
              className="adjacent-link justify-end text-right"
            >
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
