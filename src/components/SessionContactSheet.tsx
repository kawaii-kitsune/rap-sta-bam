import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Container } from "@/components/Container";
import { TextureOverlay } from "@/components/TextureOverlay";
import { isEpisodeLive } from "@/lib/content";
import type { Episode } from "@/types/content";

export function SessionContactSheet({ episodes }: { episodes: Episode[] }) {
  const photographedEpisodes = episodes.filter((episode) => episode.status !== "draft" && (episode.gallery?.length ?? 0) > 1);
  const latest = photographedEpisodes[0];
  const previous = photographedEpisodes[1];
  const latestImages = latest?.gallery;
  const previousImages = previous?.gallery;

  if (!latest || !latestImages?.length) return null;

  const detailIndex = Math.min(3, latestImages.length - 1);
  const shots = [
    { episode: latest, image: latestImages[0], frame: 1 },
    ...(previous && previousImages?.length ? [{
      episode: previous,
      image: previousImages[Math.min(2, previousImages.length - 1)],
      frame: Math.min(3, previousImages.length)
    }] : []),
    ...(latestImages.length > 2 ? [{ episode: latest, image: latestImages[detailIndex], frame: detailIndex + 1 }] : [])
  ];

  return (
    <section className="session-sheet section-space" aria-labelledby="session-sheet-title">
      <TextureOverlay />
      <Container>
        <div className="section-topline">
          <div>
            <p className="rsb-kicker">ΑΠΟ ΤΙΣ ΚΑΜΕΡΕΣ ΜΑΣ</p>
            <h2 id="session-sheet-title" className="sheet-title">ΜΕΣΑ ΣΤΟ SESSION.</h2>
          </div>
          <p className="sheet-note">Κουβέντες. Δοκιμές. Κουπλέ.<br />Η παρέα πίσω από το κομμάτι.</p>
        </div>
        <div className="session-photo-grid">
          {shots.map(({ episode, image, frame }, index) => (
            <Link key={`${episode.slug}-${frame}`} href={`/episodes/${episode.slug}#session-gallery`} className="session-photo-link">
              <figure className="session-photo">
                <div className="session-photo-image">
                  <Image src={image} alt={`${episode.artistName}, καρέ από το session #${String(episode.number).padStart(3, "0")}`} fill sizes="(min-width: 1024px) 400px, (min-width: 640px) 45vw, 90vw" className="object-cover" />
                  {index === 2 ? <TextureOverlay variant="halftone" /> : null}
                </div>
                <figcaption>
                  <span><span className="session-photo-meta">{isEpisodeLive(episode) ? "SESSION" : "ΠΡΟΣΕΧΩΣ"} #{String(episode.number).padStart(3, "0")} / ΚΑΡΕ {String(frame).padStart(2, "0")}</span><strong>{episode.artistName}</strong></span>
                  <ArrowUpRight className="h-5 w-5" aria-hidden="true" />
                </figcaption>
              </figure>
            </Link>
          ))}
        </div>
      </Container>
    </section>
  );
}
