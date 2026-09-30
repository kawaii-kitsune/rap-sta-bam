import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Container } from "@/components/Container";
import { TextureOverlay } from "@/components/TextureOverlay";
import { isEpisodeLive } from "@/lib/content";
import type { Episode } from "@/types/content";

export function SessionContactSheet({
  episodes,
  locale = "el"
}: {
  episodes: Episode[];
  locale?: string;
}) {
  const isEn = locale === "en";
  const photographedEpisodes = episodes.filter(
    (episode) => episode.status !== "draft" && (episode.gallery?.length ?? 0) > 0
  );

  if (!photographedEpisodes.length) return null;

  // Build 3 shots without duplicating artists if 3 distinct episodes have galleries
  const shots: { episode: Episode; image: string; frame: number }[] = [];

  if (photographedEpisodes.length >= 3) {
    const ep1 = photographedEpisodes[0];
    const ep2 = photographedEpisodes[1];
    const ep3 = photographedEpisodes[2];
    shots.push({ episode: ep1, image: ep1.gallery![0], frame: 1 });
    shots.push({ episode: ep2, image: ep2.gallery![Math.min(1, ep2.gallery!.length - 1)], frame: 2 });
    shots.push({ episode: ep3, image: ep3.gallery![Math.min(2, ep3.gallery!.length - 1)], frame: 3 });
  } else if (photographedEpisodes.length === 2) {
    const ep1 = photographedEpisodes[0];
    const ep2 = photographedEpisodes[1];
    shots.push({ episode: ep1, image: ep1.gallery![0], frame: 1 });
    shots.push({ episode: ep2, image: ep2.gallery![0], frame: 1 });
    if (ep1.gallery!.length > 1) {
      shots.push({ episode: ep1, image: ep1.gallery![1], frame: 2 });
    }
  } else {
    const ep = photographedEpisodes[0];
    ep.gallery!.slice(0, 3).forEach((img, i) => {
      shots.push({ episode: ep, image: img, frame: i + 1 });
    });
  }

  return (
    <section className="session-sheet section-space" aria-labelledby="session-sheet-title">
      <TextureOverlay />
      <Container>
        <div className="section-topline">
          <div>
            <p className="rsb-kicker">
              {isEn ? "FROM OUR CAMERAS" : "ΑΠΟ ΤΙΣ ΚΑΜΕΡΕΣ ΜΑΣ"}
            </p>
            <h2 id="session-sheet-title" className="sheet-title">
              {isEn ? "INSIDE THE SESSION." : "ΜΕΣΑ ΣΤΟ SESSION."}
            </h2>
          </div>
          <p className="sheet-note">
            {isEn ? (
              <>
                Dialogue. Beatmaking. Live takes.
                <br />
                The crew behind the sound.
              </>
            ) : (
              <>
                Κουβέντες. Δοκιμές. Κουπλέ.
                <br />
                Η παρέα πίσω από το κομμάτι.
              </>
            )}
          </p>
        </div>
        <div className="session-photo-grid">
          {shots.map(({ episode, image, frame }, index) => (
            <Link
              key={`${episode.slug}-${frame}-${index}`}
              href={`/${locale}/episodes/${episode.slug}#session-gallery`}
              className="session-photo-link"
            >
              <figure className="session-photo">
                <div className="session-photo-image">
                  <Image
                    src={image}
                    alt={
                      isEn
                        ? `${episode.artistName}, frame from session #${String(episode.number).padStart(3, "0")}`
                        : `${episode.artistName}, καρέ από το session #${String(episode.number).padStart(3, "0")}`
                    }
                    fill
                    sizes="(min-width: 1024px) 400px, (min-width: 640px) 45vw, 90vw"
                    className="object-cover"
                  />
                  {index === 2 ? <TextureOverlay variant="halftone" /> : null}
                </div>
                <figcaption>
                  <span>
                    <span className="session-photo-meta">
                      {isEpisodeLive(episode)
                        ? "SESSION"
                        : isEn
                          ? "COMING SOON"
                          : "ΠΡΟΣΕΧΩΣ"}{" "}
                      #{String(episode.number).padStart(3, "0")} /{" "}
                      {isEn ? "FRAME" : "ΚΑΡΕ"} {String(frame).padStart(2, "0")}
                    </span>
                    <strong>{episode.artistName}</strong>
                  </span>
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
