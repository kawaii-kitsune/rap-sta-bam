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
    { platform: "youtube", label: `${artist.name} YouTube`, url: artist.youtubeUrl ?? "" },
    { platform: "twitch", label: `${artist.name} Twitch`, url: artist.twitchUrl ?? "" }
  ];
}

export function ArtistCard({ artist, locale = "el" }: { artist: Artist; locale?: string }) {
  const isEn = locale === "en";
  const relatedEpisode = getEpisodesByArtist(artist.slug, locale)[0];

  return (
    <article className="artist-card">
      <Link href={`/${locale}/artists/${artist.slug}`} className="group block">
        <div className="artist-card-image">
          <Image src={artist.image} alt={isEn ? `Portrait: ${artist.name}` : `Πορτρέτο: ${artist.name}`} fill sizes="(min-width: 1024px) 33vw, 100vw" className="object-cover" />
        </div>
        <div className="p-4">
          <p className="text-xs text-[var(--dim)]">{artist.location ?? (isEn ? "Artist" : "Καλλιτέχνης")}</p>
          <h3 className="card-title mt-2">{artist.name}</h3>
          <p className="mt-3 text-sm leading-6 text-[var(--muted)]">{artist.shortBio}</p>
          {relatedEpisode ? <p className="mt-4 text-xs font-bold text-[var(--foreground)]">{isEn ? "Episode" : "Επεισόδιο"}: {relatedEpisode.title}</p> : null}
          <span className="mt-4 inline-flex items-center gap-2 text-sm font-bold">
            {isEn ? "View profile" : "Άνοιγμα προφίλ"} <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
          </span>
        </div>
      </Link>
      <div className="px-4 pb-4">
        <SocialLinks links={artistSocials(artist)} iconOnly />
      </div>
    </article>
  );
}
