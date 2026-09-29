import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { Container } from "@/components/Container";
import { EpisodeCard } from "@/components/EpisodeCard";
import { SectionHeading } from "@/components/SectionHeading";
import { SocialLinks } from "@/components/SocialLinks";
import { JsonLd } from "@/components/JsonLd";
import { defaultLocale, locales } from "@/config/i18n";
import { siteConfig } from "@/config/site";
import { getAllArtists, getArtistBySlug, getEpisodesByArtist } from "@/lib/content";
import { createMetadata } from "@/lib/metadata";
import type { SocialLink } from "@/types/content";

type Props = {
  params: Promise<{ locale: string; slug: string }>;
};

export function generateStaticParams() {
  const artists = getAllArtists();
  return locales.flatMap((locale) =>
    artists.map((artist) => ({ locale, slug: artist.slug }))
  );
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale = defaultLocale, slug } = await params;
  const artist = getArtistBySlug(slug, locale);

  if (!artist) {
    return createMetadata({
      title: locale === "en" ? "Artist Not Found" : "Δεν βρέθηκε πρόσωπο",
      locale
    });
  }

  return createMetadata({
    title: artist.name,
    description: artist.shortBio,
    path: `/${locale}/artists/${artist.slug}`,
    image: artist.image,
    locale
  });
}

export default async function ArtistPage({ params }: Props) {
  const { locale = defaultLocale, slug } = await params;
  const isEn = locale === "en";

  const artist = getArtistBySlug(slug, locale);

  if (!artist) {
    notFound();
  }

  const episodes = getEpisodesByArtist(artist.slug, locale);
  const socialLinks: SocialLink[] = [
    { platform: "instagram", label: "Instagram", url: artist.instagramUrl ?? "" },
    { platform: "tiktok", label: "TikTok", url: artist.tiktokUrl ?? "" },
    { platform: "spotify", label: "Spotify", url: artist.spotifyUrl ?? "" },
    { platform: "youtube", label: "YouTube", url: artist.youtubeUrl ?? "" },
    { platform: "twitch", label: "Twitch", url: artist.twitchUrl ?? "" }
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
        name: isEn ? "Crew & Artists" : "Πρόσωπα",
        item: `${siteConfig.baseUrl}/${locale}/artists`
      },
      {
        "@type": "ListItem",
        position: 3,
        name: artist.name,
        item: `${siteConfig.baseUrl}/${locale}/artists/${artist.slug}`
      }
    ]
  };

  const sameAs = [
    artist.spotifyUrl,
    artist.instagramUrl,
    artist.youtubeUrl,
    artist.tiktokUrl,
    artist.twitchUrl
  ].filter(Boolean) as string[];

  const artistJsonLd = {
    "@context": "https://schema.org",
    "@type": artist.kind === "team" ? "Person" : "MusicGroup",
    name: artist.name,
    description: artist.shortBio,
    image: `${siteConfig.baseUrl}${artist.image}`,
    ...(sameAs.length > 0 ? { sameAs } : {})
  };

  return (
    <Container className="page-shell">
      <JsonLd data={breadcrumbJsonLd} />
      <JsonLd data={artistJsonLd} />
      <Breadcrumbs
        items={[
          { href: `/${locale}/artists`, label: isEn ? "Crew & Artists" : "Πρόσωπα" },
          { label: artist.name }
        ]}
      />
      <div className="profile-layout">
        <div className="profile-image">
          <Image
            src={artist.image}
            alt={isEn ? `Portrait: ${artist.name}` : `Πορτρέτο: ${artist.name}`}
            fill
            priority
            sizes="(min-width: 1024px) 40vw, 100vw"
            className="object-cover"
          />
        </div>
        <div>
          <p className="rsb-kicker">
            {artist.kind === "team"
              ? isEn
                ? "Team / Contributor"
                : "Team / συντελεστής"
              : isEn
                ? "Guest Artist"
                : "Καλεσμένος / artist"}
          </p>
          {artist.location ? (
            <p className="mt-2 text-sm text-[var(--dim)]">{artist.location}</p>
          ) : null}
          <h1 className="profile-title display-font">{artist.name}</h1>
          <p className="mt-4 max-w-2xl text-base leading-8 text-[var(--muted)]">{artist.shortBio}</p>
          <div className="mt-6">
            <SocialLinks links={socialLinks} />
          </div>
          {artist.slug === "phone-memo" ? (
            <Link href={`/${locale}/products`} className="rsb-button-secondary mt-5">
              {isEn ? "Products & Releases" : "Products & releases"}
            </Link>
          ) : null}
        </div>
      </div>

      <section className="mt-14">
        <SectionHeading
          title={
            artist.kind === "team"
              ? isEn
                ? "Role & Focus"
                : "Ρόλος"
              : isEn
                ? "Biography"
                : "Bio"
          }
        />
        <div className="prose-rsb max-w-3xl text-lg leading-8 text-[var(--muted)]">
          {artist.bio.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>
      </section>

      {episodes.length ? (
        <section className="mt-14">
          <SectionHeading
            title={
              artist.kind === "team"
                ? isEn
                  ? "Participations & Credits"
                  : "Συμμετοχές / credits"
                : isEn
                  ? "Related Sessions"
                  : "Σχετικά επεισόδια"
            }
          />
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {episodes.map((episode) => (
              <EpisodeCard key={episode.slug} episode={episode} locale={locale} />
            ))}
          </div>
        </section>
      ) : null}
    </Container>
  );
}
