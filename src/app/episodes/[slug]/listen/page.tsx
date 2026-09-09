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
    return createMetadata({ title: "Δεν βρέθηκε audio" });
  }

  return createMetadata({
    title: `Audio - ${episode.title}`,
    description: episode.audio?.captions ? `Άκουσε το πλήρες audio του ${episode.title} με συγχρονισμένα captions.` : `Άκουσε το πλήρες audio του ${episode.title}.`,
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
    <Container className="page-shell">
      <Breadcrumbs items={[{ href: "/episodes", label: "Επεισόδια" }, { href: `/episodes/${episode.slug}`, label: episode.title }, { label: "Audio" }]} />
      <div className="mx-auto max-w-4xl">
        <Link href={`/episodes/${episode.slug}`} className="text-link mb-6 text-[var(--muted)]">
          <ArrowLeft className="h-4 w-4" aria-hidden="true" /> Πίσω στο επεισόδιο
        </Link>
        <SectionHeading as="h1" eyebrow={`#${String(episode.number).padStart(3, "0")} / ${formatGreekDate(episode.publishedAt)}`} title={episode.artistName} copy={episode.audio.captions ? "Άκουσε ολόκληρο το session με συγχρονισμένους υπότιτλους." : "Άκουσε ολόκληρο το session, όπου κι αν βρίσκεσαι."} />
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
