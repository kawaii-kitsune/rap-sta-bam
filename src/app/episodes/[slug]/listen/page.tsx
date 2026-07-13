import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { Container } from "@/components/Container";
import { EpisodeAudioPlayer } from "@/components/EpisodeAudioPlayer";
import { SectionHeading } from "@/components/SectionHeading";
import { formatGreekDate, getEpisodeBySlug, getVisibleEpisodes } from "@/lib/content";
import { createMetadata } from "@/lib/metadata";

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
    return createMetadata({ title: "Δεν βρέθηκε audio" });
  }

  return createMetadata({
    title: `Audio - ${episode.title}`,
    description: `Άκουσε το πλήρες audio του ${episode.title} με συγχρονισμένα captions.`,
    path: `/episodes/${episode.slug}/listen`,
    image: episode.thumbnail
  });
}

export default async function EpisodeListenPage({ params }: Props) {
  const { slug } = await params;
  const episode = getEpisodeBySlug(slug);

  if (!episode?.audio) {
    notFound();
  }

  return (
    <Container className="py-10">
      <Breadcrumbs items={[{ href: "/episodes", label: "Επεισόδια" }, { href: `/episodes/${episode.slug}`, label: episode.title }, { label: "Audio" }]} />
      <div className="mx-auto max-w-4xl">
        <Link href={`/episodes/${episode.slug}`} className="mb-6 inline-flex items-center gap-2 text-sm font-black uppercase tracking-[0.14em] text-[var(--accent)] hover:text-[var(--foreground)]">
          <ArrowLeft className="h-4 w-4" aria-hidden="true" /> Πίσω στο επεισόδιο
        </Link>
        <SectionHeading eyebrow={`#${String(episode.number).padStart(3, "0")} / ${formatGreekDate(episode.publishedAt)}`} title="Audio player" copy="Dedicated ακρόαση του επεισοδίου με captions που ακολουθούν το mp3 και το seek." />
        <EpisodeAudioPlayer
          src={`/episodes/${episode.slug}/audio`}
          label={episode.audio.label ?? "Audio αρχείο"}
          availableAt={episode.audio.availableAt}
          publishedAt={episode.publishedAt}
          captionsSrc={episode.audio.captions}
        />
      </div>
    </Container>
  );
}
