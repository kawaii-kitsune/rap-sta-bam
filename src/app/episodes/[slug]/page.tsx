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
          <div className="relative aspect-video overflow-hidden border border-[var(--line)] bg-black shadow-[10px_10px_0_#000]">
            <Image src={episode.thumbnail} alt={`Thumbnail για ${episode.title}`} fill priority sizes="(min-width: 1024px) 50vw, 100vw" className="object-cover" />
          </div>
        </header>

        <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_340px]">
          <div className="grid gap-10">
            {live ? <VideoEmbed videoId={episode.youtubeVideoId} title={episode.title} /> : (
              <div className="grid gap-5 md:grid-cols-[minmax(220px,320px)_1fr] md:items-center">
                <PromoTeaser compact />
                <div className="border-y border-[var(--line)] px-4 py-5 sm:px-5 sm:py-6">
                  <p className="text-xs font-black uppercase tracking-[0.18em] text-[var(--accent)]">Κλειδωμένο μέχρι την πρεμιέρα</p>
                  <h2 className="display-font mt-3 text-4xl leading-none">Το επεισόδιο ανοίγει στις {formatGreekDate(episode.publishedAt)}</h2>
                  <p className="mt-4 leading-7 text-[var(--muted)]">Μέχρι τότε μένει διαθέσιμο μόνο το teaser. Στην πρεμιέρα ανοίγουν όλα τα βασικά κομμάτια του επεισοδίου.</p>
                  <div className="mt-5 grid gap-2 sm:grid-cols-2">
                    <UnlockItem icon={<PlaySquare className="h-4 w-4" />} label="Full YouTube episode" />
                    <UnlockItem icon={<Headphones className="h-4 w-4" />} label="Audio player" />
                    <UnlockItem icon={<Captions className="h-4 w-4" />} label="Captions / listen page" />
                    <UnlockItem icon={<CalendarClock className="h-4 w-4" />} label={`Πρεμιέρα ${formatGreekDate(episode.publishedAt)}`} />
                  </div>
                </div>
              </div>
            )}

            <section>
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
              <section>
                <SectionHeading title="Audio επεισοδίου" />
                <div className="grid gap-3">
                  <Link href={`/episodes/${episode.slug}/listen`} className="inline-flex min-h-11 w-fit items-center border border-[var(--accent)] px-4 py-2 text-sm font-black uppercase tracking-[0.14em] text-[var(--accent)] hover:bg-[var(--accent)] hover:text-black">
                    Άνοιγμα audio σελίδας
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
              <section>
                <SectionHeading eyebrow="Φωτογραφίες" title="Μέσα στο δωμάτιο" copy="Στιγμές από τη συζήτηση, το beatmaking και το performance χωρίς να χρειάζεται να μοιάζουν όλες ίδιες." />
                <EpisodeGallery images={episode.gallery} title={episode.title} />
              </section>
            ) : null}
          </div>

          <aside className="grid content-start gap-8 border-t border-[var(--line)] pt-6 lg:border-t-0 lg:pt-0">
            <section>
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


function UnlockItem({ icon, label }: { icon: ReactNode; label: string }) {
  return (
    <div className="flex min-h-11 items-center gap-2 border border-[var(--line)] bg-[var(--panel)] px-3 py-2 text-sm font-bold text-[var(--foreground)]">
      <span className="text-[var(--accent)]" aria-hidden="true">{icon}</span>
      <span>{label}</span>
    </div>
  );
}
