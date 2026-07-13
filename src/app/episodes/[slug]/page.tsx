import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight } from "lucide-react";
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
    { platform: "instagram", label: "Instagram", url: episode.instagramUrl ?? "" }
  ];

  return (
    <Container className="py-10">
      <Breadcrumbs items={[{ href: "/episodes", label: "Επεισόδια" }, { label: episode.title }]} />
      <article>
        <header className="grid gap-6 lg:grid-cols-[.9fr_1.1fr] lg:items-end">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.18em] text-[var(--accent)]">#{String(episode.number).padStart(3, "0")} / {live ? formatGreekDate(episode.publishedAt) : `Πρεμιέρα ${formatGreekDate(episode.publishedAt)}`}</p>
            <h1 className="display-font poster-title mt-3 text-[clamp(4rem,11vw,9rem)]">{episode.title}</h1>
            <p className="mt-4 text-xl font-bold">{episode.artistName}</p>
          </div>
          <div className="relative aspect-video overflow-hidden border border-[var(--line)] bg-black hard-shadow">
            <Image src={episode.thumbnail} alt={`Thumbnail για ${episode.title}`} fill priority sizes="(min-width: 1024px) 50vw, 100vw" className="object-cover" />
          </div>
        </header>

        <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_340px]">
          <div className="grid gap-10">
            {live ? <VideoEmbed videoId={episode.youtubeVideoId} title={episode.title} /> : (
              <div className="grid gap-5 md:grid-cols-[minmax(220px,320px)_1fr] md:items-center">
                <PromoTeaser compact />
                <div className="border border-[var(--line)] bg-[var(--panel)] p-5 sm:p-6">
                  <p className="text-xs font-black uppercase tracking-[0.18em] text-[var(--accent)]">Premiere locked</p>
                  <h2 className="display-font mt-3 text-4xl leading-none">Το επεισόδιο ανοίγει στις {formatGreekDate(episode.publishedAt)}</h2>
                  <p className="mt-4 leading-7 text-[var(--muted)]">Μέχρι τότε μπορείς να δεις το teaser και να κρατήσεις τη σελίδα για το πλήρες video, audio, clips και links της πρεμιέρας.</p>
                </div>
              </div>
            )}

            <section>
              <SectionHeading title="Περιγραφή" />
              <div className="prose-rsb max-w-3xl text-lg leading-8 text-[var(--muted)]">
                {episode.description.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
              </div>
            </section>

            {episode.sessionFacts?.length ? (
              <section>
                <SectionHeading eyebrow="Session" title="Facts από τη δημιουργία" copy="Τα βασικά στοιχεία της πρώτης session, από το format μέχρι την πρεμιέρα." />
                <SessionFacts facts={episode.sessionFacts} />
              </section>
            ) : null}


            {live && (episode.youtubeUrl || episode.spotifyUrl) ? (
              <section>
                <SectionHeading title="Τελικό κομμάτι" />
                <SocialLinks links={socialLinks} />
              </section>
            ) : null}

            {episode.audio ? (
              <section>
                <SectionHeading title="Ολόκληρο επεισόδιο" />
                <div className="grid gap-3">
                  <Link href={`/episodes/${episode.slug}/listen`} className="inline-flex min-h-11 w-fit items-center border border-[var(--accent)] px-4 py-2 text-sm font-black uppercase tracking-[0.14em] text-[var(--accent)] hover:bg-[var(--accent)] hover:text-black">
                    Άνοιγμα dedicated audio page
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
                <SectionHeading title="Short clips" />
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
                <SectionHeading title="Instagram reels" />
                <div className="grid gap-5">
                  {episode.instagramEmbeds.map((embed) => (
                    isValidHttpUrl(embed.url) ? <InstagramEmbed key={embed.url} url={embed.url} /> : null
                  ))}
                </div>
              </section>
            ) : null}

            {episode.gallery?.length ? (
              <section>
                <SectionHeading eyebrow="Gallery" title="Μέσα στη session" copy="Στιγμές από το δωμάτιο, τη συζήτηση, το beatmaking και το performance." />
                <EpisodeGallery images={episode.gallery} title={episode.title} />
              </section>
            ) : null}
          </div>

          <aside className="grid content-start gap-6">
            <section>
              <h2 className="display-font mb-3 text-3xl">Credits</h2>
              <CreditsList credits={episode.credits} />
            </section>
            {episode.gear?.length ? (
              <section>
                <h2 className="display-font mb-3 text-3xl">Equipment</h2>
                <GearList gear={episode.gear} />
              </section>
            ) : null}
            <section>
              <h2 className="display-font mb-3 text-3xl">Links</h2>
              <SocialLinks links={socialLinks} />
            </section>
            {artist ? (
              <section>
                <h2 className="display-font mb-3 text-3xl">Related artist</h2>
                <ArtistCard artist={artist} />
              </section>
            ) : null}
          </aside>
        </div>

        <nav aria-label="Προηγούμενο και επόμενο επεισόδιο" className="mt-12 grid gap-3 border-t border-[var(--line)] pt-6 sm:grid-cols-2">
          {adjacent.previous ? (
            <Link href={`/episodes/${adjacent.previous.slug}`} className="inline-flex items-center gap-2 border border-[var(--line)] p-4 font-bold hover:border-[var(--accent)]">
              <ArrowLeft className="h-4 w-4" /> {adjacent.previous.title}
            </Link>
          ) : <span />}
          {adjacent.next ? (
            <Link href={`/episodes/${adjacent.next.slug}`} className="inline-flex items-center justify-end gap-2 border border-[var(--line)] p-4 text-right font-bold hover:border-[var(--accent)]">
              {adjacent.next.title} <ArrowRight className="h-4 w-4" />
            </Link>
          ) : null}
        </nav>
      </article>
    </Container>
  );
}
