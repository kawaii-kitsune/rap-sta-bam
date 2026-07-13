import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { Container } from "@/components/Container";
import { EpisodeCard } from "@/components/EpisodeCard";
import { SectionHeading } from "@/components/SectionHeading";
import { SocialLinks } from "@/components/SocialLinks";
import { getAllArtists, getArtistBySlug, getEpisodesByArtist } from "@/lib/content";
import { createMetadata } from "@/lib/metadata";
import type { SocialLink } from "@/types/content";

type Props = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return getAllArtists().map((artist) => ({ slug: artist.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const artist = getArtistBySlug(slug);

  if (!artist) {
    return createMetadata({ title: "Δεν βρέθηκε καλλιτέχνης" });
  }

  return createMetadata({
    title: artist.name,
    description: artist.shortBio,
    path: `/artists/${artist.slug}`,
    image: artist.image
  });
}

export default async function ArtistPage({ params }: Props) {
  const { slug } = await params;
  const artist = getArtistBySlug(slug);

  if (!artist) {
    notFound();
  }

  const episodes = getEpisodesByArtist(artist.slug);
  const socialLinks: SocialLink[] = [
    { platform: "instagram", label: "Instagram", url: artist.instagramUrl ?? "" },
    { platform: "tiktok", label: "TikTok", url: artist.tiktokUrl ?? "" },
    { platform: "spotify", label: "Spotify", url: artist.spotifyUrl ?? "" },
    { platform: "youtube", label: "YouTube", url: artist.youtubeUrl ?? "" }
  ];

  return (
    <Container className="py-10">
      <Breadcrumbs items={[{ href: "/artists", label: "Καλλιτέχνες" }, { label: artist.name }]} />
      <div className="grid gap-8 lg:grid-cols-[.8fr_1.2fr] lg:items-end">
        <div className="relative aspect-[4/5] overflow-hidden border border-[var(--line)] bg-black hard-shadow">
          <Image src={artist.image} alt={`Πορτρέτο / placeholder για ${artist.name}`} fill priority sizes="(min-width: 1024px) 40vw, 100vw" className="object-cover" />
        </div>
        <div>
          <p className="text-xs font-black uppercase tracking-[0.18em] text-[var(--accent)]">{artist.location ?? "Artist"}</p>
          <h1 className="display-font poster-title mt-3 text-[clamp(4rem,12vw,10rem)]">{artist.name}</h1>
          <p className="mt-4 max-w-2xl text-xl font-bold leading-8">{artist.shortBio}</p>
          <div className="mt-6">
            <SocialLinks links={socialLinks} />
          </div>
        </div>
      </div>

      <section className="mt-14">
        <SectionHeading title="Bio" />
        <div className="prose-rsb max-w-3xl text-lg leading-8 text-[var(--muted)]">
          {artist.bio.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
        </div>
      </section>

      <section className="mt-14">
        <SectionHeading title="Σχετικά επεισόδια" />
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {episodes.map((episode) => <EpisodeCard key={episode.slug} episode={episode} />)}
        </div>
      </section>
    </Container>
  );
}
