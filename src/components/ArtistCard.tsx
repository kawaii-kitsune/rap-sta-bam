import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { SocialLinks } from "@/components/SocialLinks";
import { getEpisodesByArtist } from "@/lib/content";
import type { Artist, SocialLink } from "@/types/content";

function artistSocials(artist: Artist): SocialLink[] {
  return [
    { platform: "instagram", label: `${artist.name} Instagram`, url: artist.instagramUrl ?? "" },
    { platform: "tiktok", label: `${artist.name} TikTok`, url: artist.tiktokUrl ?? "" },
    { platform: "spotify", label: `${artist.name} Spotify`, url: artist.spotifyUrl ?? "" },
    { platform: "youtube", label: `${artist.name} YouTube`, url: artist.youtubeUrl ?? "" }
  ];
}

export function ArtistCard({ artist }: { artist: Artist }) {
  const relatedEpisode = getEpisodesByArtist(artist.slug)[0];

  return (
    <article className="border-y border-[var(--line)] bg-transparent">
      <Link href={`/artists/${artist.slug}`} className="group block">
        <div className="relative aspect-[4/3] overflow-hidden border-b border-[var(--line)] bg-black">
          <Image src={artist.image} alt={`Πορτρέτο / placeholder για ${artist.name}`} fill sizes="(min-width: 1024px) 33vw, 100vw" className="object-cover grayscale transition group-hover:grayscale-0" />
        </div>
        <div className="p-4">
          <p className="text-xs font-bold uppercase tracking-[0.16em] text-[var(--accent)]">{artist.location ?? "Καλλιτέχνης"}</p>
          <h3 className="display-font mt-2 text-3xl leading-none">{artist.name}</h3>
          <p className="mt-3 text-sm leading-6 text-[var(--muted)]">{artist.shortBio}</p>
          {relatedEpisode ? <p className="mt-4 text-xs font-bold text-[var(--foreground)]">Επεισόδιο: {relatedEpisode.title}</p> : null}
          <span className="mt-4 inline-flex items-center gap-2 text-sm font-bold">
            Άνοιγμα προφίλ <ArrowUpRight className="h-4 w-4" />
          </span>
        </div>
      </Link>
      <div className="px-4 pb-4">
        <SocialLinks links={artistSocials(artist)} iconOnly />
      </div>
    </article>
  );
}
