import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { Container } from "@/components/Container";
import { EpisodeAudioPlayer } from "@/components/EpisodeAudioPlayer";
import { JsonLd } from "@/components/JsonLd";
import { SectionHeading } from "@/components/SectionHeading";
import { defaultLocale, locales } from "@/config/i18n";
import { siteConfig } from "@/config/site";
import { formatDate, getEpisodeBySlug, getVisibleEpisodes } from "@/lib/content";
import { createMetadata } from "@/lib/metadata";

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
  const isEn = locale === "en";
  const episode = getEpisodeBySlug(slug, locale);

  if (!episode) {
    return createMetadata({
      title: isEn ? "Audio Not Found" : "Δεν βρέθηκε audio",
      locale
    });
  }

  return createMetadata({
    title: `Audio - ${episode.title}`,
    description: isEn
      ? `Listen to the full audio of ${episode.title} with synchronized captions.`
      : `Άκουσε το πλήρες audio του ${episode.title} με συγχρονισμένα captions.`,
    path: `/${locale}/episodes/${episode.slug}/listen`,
    image: episode.thumbnail,
    locale
  });
}

export default async function EpisodeListenPage({ params }: Props) {
  const { locale = defaultLocale, slug } = await params;
  const isEn = locale === "en";
  const episode = getEpisodeBySlug(slug, locale);

  if (!episode?.audio) {
    notFound();
  }

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
      },
      {
        "@type": "ListItem",
        position: 4,
        name: "Audio",
        item: `${siteConfig.baseUrl}/${locale}/episodes/${episode.slug}/listen`
      }
    ]
  };

  const audioJsonLd = {
    "@context": "https://schema.org",
    "@type": "AudioObject",
    name: `${episode.title} - Audio`,
    contentUrl: `${siteConfig.baseUrl}/episodes/${episode.slug}/audio`,
    encodingFormat: "audio/mpeg",
    description: episode.excerpt,
    datePublished: `${episode.publishedAt}T12:00:00+03:00`
  };

  return (
    <Container className="page-shell">
      <JsonLd data={breadcrumbJsonLd} />
      <JsonLd data={audioJsonLd} />
      <Breadcrumbs
        items={[
          { href: `/${locale}/episodes`, label: isEn ? "Sessions" : "Επεισόδια" },
          { href: `/${locale}/episodes/${episode.slug}`, label: episode.title },
          { label: "Audio" }
        ]}
      />
      <div className="mx-auto max-w-4xl">
        <Link href={`/${locale}/episodes/${episode.slug}`} className="text-link mb-6 text-[var(--muted)]">
          <ArrowLeft className="h-4 w-4" aria-hidden="true" />{" "}
          {isEn ? "Back to session" : "Πίσω στο επεισόδιο"}
        </Link>
        <SectionHeading
          as="h1"
          eyebrow={`#${String(episode.number).padStart(3, "0")} / ${formatDate(episode.publishedAt, locale)}`}
          title={episode.artistName}
          copy={
            episode.audio.captions
              ? isEn
                ? "Listen to the entire session with synchronized captions."
                : "Άκουσε ολόκληρο το session με συγχρονισμένους υπότιτλους."
              : isEn
                ? "Listen to the entire session anywhere."
                : "Άκουσε ολόκληρο το session, όπου κι αν βρίσκεσαι."
          }
        />
        <EpisodeAudioPlayer
          src={`/episodes/${episode.slug}/audio`}
          label={episode.audio.label ?? (isEn ? "Audio File" : "Audio αρχείο")}
          availableAt={episode.audio.availableAt}
          publishedAt={episode.publishedAt}
          captionsSrc={episode.audio.captions}
        />
      </div>
    </Container>
  );
}
