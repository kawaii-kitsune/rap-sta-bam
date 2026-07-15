import type { Metadata } from "next";
import { ArrowUpRight, Disc3, ExternalLink, Music2, ShoppingBag } from "lucide-react";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { Container } from "@/components/Container";
import { SectionHeading } from "@/components/SectionHeading";
import { products, spotifyArtist, spotifyReleases, spotifyTopTracks } from "@/content/products";
import { createMetadata } from "@/lib/metadata";

export const metadata: Metadata = createMetadata({
  title: "Products & Releases",
  description: "Phone Memo product links, Bandcamp releases, ElasticStage products and Spotify catalog entries.",
  path: "/products"
});

function platformTone(platform: string) {
  return platform === "ElasticStage" ? "rsb-chip rsb-chip-accent" : "rsb-chip text-[var(--muted)]";
}

export default function ProductsPage() {
  const featured = products.find((product) => product.featured);
  const otherProducts = products.filter((product) => product.slug !== featured?.slug);

  return (
    <Container className="py-10">
      <Breadcrumbs items={[{ label: "Products & Releases" }]} />

      <div className="grid gap-10 lg:grid-cols-[1fr_340px]">
        <main>
          <SectionHeading
            eyebrow="Phone Memo catalog"
            title="Products & releases"
            copy="Official product links, Bandcamp pages and Spotify releases for Phone Memo. Buying, streaming and payments happen on the external platforms."
          />
          <p className="mt-4 text-xs font-bold uppercase tracking-[0.14em] text-[var(--dim)]">Spotify data checked on 15/07/2026.</p>

          {featured ? (
            <section className="mt-8 border-y border-[var(--line)] px-4 py-6 sm:px-5">
              <div className="grid gap-6 md:grid-cols-[1fr_220px] md:items-end">
                <div>
                  <span className={`inline-flex min-h-8 items-center px-3 text-xs font-black uppercase tracking-[0.16em] ${platformTone(featured.platform)}`}>
                    {featured.platform}
                  </span>
                  <h2 className="display-font mt-5 text-5xl leading-none sm:text-7xl">{featured.title}</h2>
                  <p className="mt-3 text-lg font-bold text-[var(--foreground)]">{featured.artist}</p>
                  <p className="mt-4 max-w-2xl text-base leading-7 text-[var(--muted)]">{featured.description}</p>
                </div>
                <a
                  href={featured.url}
                  target="_blank"
                  rel="noreferrer"
                  className="rsb-button"
                >
                  Open product <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                </a>
              </div>
            </section>
          ) : null}

          <section className="mt-10">
            <SectionHeading eyebrow="Buy / support" title="Bandcamp / ElasticStage" copy="Direct product and support links for people who want to buy or support the releases." />
            <div className="mt-5 grid gap-0 border-y border-[var(--line)]">
              {otherProducts.map((product, index) => (
                <article key={product.slug} className="rsb-row grid gap-4 py-5 last:border-b-0 sm:grid-cols-[4rem_1fr_auto] sm:items-center">
                  <div className="display-font text-4xl text-[var(--accent)]">{String(index + 1).padStart(2, "0")}</div>
                  <div>
                    <div className="flex flex-wrap items-center gap-2">
                      <span className={`inline-flex min-h-7 items-center px-2 text-[0.68rem] font-black uppercase tracking-[0.14em] ${platformTone(product.platform)}`}>
                        {product.platform}
                      </span>
                      {product.releaseDate ? <span className="text-xs font-bold uppercase tracking-[0.14em] text-[var(--dim)]">{product.releaseDate}</span> : null}
                    </div>
                    <h2 className="mt-3 display-font text-4xl leading-none">{product.title}</h2>
                    <p className="mt-2 text-sm font-bold text-[var(--muted)]">{product.artist} · {product.format}</p>
                    <p className="mt-3 max-w-2xl text-sm leading-6 text-[var(--muted)]">{product.description}</p>
                  </div>
                  <a
                    href={product.url}
                    target="_blank"
                    rel="noreferrer"
                    className="rsb-button-secondary"
                  >
                    Open <ExternalLink className="h-4 w-4" aria-hidden="true" />
                  </a>
                </article>
              ))}
            </div>
          </section>

          <section className="mt-12">
            <SectionHeading eyebrow="Listen" title="Spotify releases" copy="Current releases listed on the Phone Memo Spotify artist page." />
            <div className="mt-5 grid gap-0 border-y border-[var(--line)]">
              {spotifyReleases.map((release, index) => (
                <article key={release.url} className="rsb-row grid gap-4 py-5 last:border-b-0 sm:grid-cols-[4rem_1fr_auto] sm:items-center">
                  <div className="display-font text-4xl text-[var(--accent)]">{String(index + 1).padStart(2, "0")}</div>
                  <div>
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="rsb-chip rsb-chip-spotify">Spotify</span>
                      <span className="text-xs font-bold uppercase tracking-[0.14em] text-[var(--dim)]">{release.kind} · {release.year}</span>
                    </div>
                    <h2 className="mt-3 display-font text-4xl leading-none">{release.title}</h2>
                  </div>
                  <a
                    href={release.url}
                    target="_blank"
                    rel="noreferrer"
                    className="rsb-button-secondary hover:border-[#1db954] hover:text-[#1db954]"
                  >
                    Listen <Music2 className="h-4 w-4" aria-hidden="true" />
                  </a>
                </article>
              ))}
            </div>
          </section>

          <section className="mt-12">
            <SectionHeading eyebrow="Listen" title="Popular tracks" />
            <div className="mt-5 grid gap-0 border-y border-[var(--line)]">
              {spotifyTopTracks.map((track, index) => (
                <a
                  key={track.url}
                  href={track.url}
                  target="_blank"
                  rel="noreferrer"
                  className="rsb-row grid gap-3 py-4 last:border-b-0 hover:text-[#1db954] sm:grid-cols-[3rem_1fr_auto] sm:items-center"
                >
                  <span className="font-black text-[var(--accent)]">{String(index + 1).padStart(2, "0")}</span>
                  <span>
                    <span className="block font-black">{track.title}</span>
                    <span className="mt-1 block text-sm text-[var(--muted)]">{track.album} · {track.plays} plays</span>
                  </span>
                  <span className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-[0.14em]">Open <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" /></span>
                </a>
              ))}
            </div>
          </section>
        </main>

        <aside>
          <div className="sticky top-24 border-y border-[var(--line)] px-4 py-5 sm:px-5">
            <h2 className="display-font text-4xl leading-none">Catalog note</h2>
            <div className="mt-5 grid gap-4 text-sm leading-6 text-[var(--muted)]">
              <p className="flex gap-3">
                <ShoppingBag className="mt-1 h-4 w-4 shrink-0 text-[var(--accent)]" aria-hidden="true" />
                Product links open external checkout or release pages. This site does not process payments.
              </p>
              <p className="flex gap-3">
                <Disc3 className="mt-1 h-4 w-4 shrink-0 text-[var(--accent)]" aria-hidden="true" />
                Spotify artist page: {spotifyArtist.monthlyListeners} monthly listeners, {spotifyArtist.followers} followers. Data checked on 15/07/2026.
              </p>
              <a href={spotifyArtist.url} target="_blank" rel="noreferrer" className="rsb-button-secondary border-[#1db954]/60 text-[#1db954] hover:bg-[#1db954] hover:text-black">
                Open Spotify artist <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
              </a>
            </div>
          </div>
        </aside>
      </div>
    </Container>
  );
}
