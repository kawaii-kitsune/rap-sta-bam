import type { Metadata } from "next";
import Image from "next/image";
import { ArrowUpRight, ExternalLink, Music2 } from "lucide-react";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { Container } from "@/components/Container";
import { ReleaseRow } from "@/components/ReleaseRow";
import { SectionHeading } from "@/components/SectionHeading";
import { products, spotifyArtist, spotifyReleases, spotifyTopTracks } from "@/content/products";
import { createMetadata } from "@/lib/metadata";

export const metadata: Metadata = createMetadata({
  title: "Products & Releases",
  description: "Phone Memo product links, Bandcamp releases, ElasticStage products and Spotify catalog entries.",
  path: "/products"
});

export default function ProductsPage() {
  const featured = products.find((product) => product.featured);
  const otherProducts = products.filter((product) => product.slug !== featured?.slug);

  return (
    <Container className="page-shell">
      <Breadcrumbs items={[{ label: "Releases" }]} />
      <div className="page-heading"><SectionHeading as="h1" eyebrow="Phone Memo · Μουσική" title="Releases & δισκογραφία" copy="Albums, beats και συνεργασίες. Άκουσε τις κυκλοφορίες ή στήριξε τη μουσική απευθείας στις πλατφόρμες." /></div>
      <div className="catalog-layout">
        <div className="min-w-0">
          {featured ? (
            <section className="catalog-feature" aria-labelledby="featured-release-title">
              {featured.image ? <div className="catalog-cover"><Image src={featured.image} alt={`Εξώφυλλο: ${featured.title}`} fill sizes="(min-width: 640px) 200px, 240px" priority className="object-cover" /></div> : null}
              <div>
                <p className="rsb-kicker">Επιλεγμένη κυκλοφορία · {featured.platform}</p>
                <h2 id="featured-release-title" className="section-title mt-2">{featured.title}</h2>
                <p className="mt-2 text-sm text-[var(--muted)]">{featured.artist} · {featured.format}</p>
                <p lang="en" className="mt-3 text-sm leading-7 text-[var(--muted)]">{featured.description}</p>
                <a href={featured.url} target="_blank" rel="noreferrer" className="rsb-button mt-5">Δες στο {featured.platform}<ArrowUpRight className="h-4 w-4" aria-hidden="true" /></a>
              </div>
            </section>
          ) : null}
          <nav className="episode-index my-6" aria-label="Ενότητες δισκογραφίας"><a href="#catalog-products">Αγορά & στήριξη</a><a href="#catalog-spotify">Spotify releases</a><a href="#catalog-tracks">Κομμάτια</a></nav>
          <section id="catalog-products" className="mt-10">
            <SectionHeading title="Αγόρασε & στήριξε" copy="Ψηφιακές και φυσικές κυκλοφορίες στο Bandcamp και το ElasticStage." />
            <div className="border-t border-[var(--line)]">
              {otherProducts.map((product) => <ReleaseRow key={product.slug} title={product.title} image={product.image} subtitle={[product.artist, product.format, product.releaseDate].filter(Boolean).join(" · ")} description={product.description} platform={product.platform} url={product.url} action="Άνοιγμα" />)}
            </div>
          </section>
          <section id="catalog-spotify" className="mt-12">
            <SectionHeading title="Κυκλοφορίες στο Spotify" />
            <div className="border-t border-[var(--line)]">
              {spotifyReleases.map((release) => <ReleaseRow key={release.url} title={release.title} image={release.image} subtitle={`${release.kind} · ${release.year}`} platform="Spotify" url={release.url} action="Ακρόαση" />)}
            </div>
          </section>
          <section id="catalog-tracks" className="mt-12">
            <SectionHeading title="Δημοφιλή κομμάτια" copy="Στοιχεία ακρόασης από το Spotify · 15/07/2026." />
            <ol className="border-t border-[var(--line)]">
              {spotifyTopTracks.map((track, index) => (
                <li key={track.url}>
                  <a href={track.url} target="_blank" rel="noreferrer" className="catalog-track" aria-label={`Ακρόαση: ${track.title} στο Spotify`}>
                    <span className="meta-font text-xs text-[var(--dim)]">{String(index + 1).padStart(2, "0")}</span>
                    <span><span className="block text-sm font-medium">{track.title}</span><span className="mt-1 block text-xs text-[var(--dim)]">{track.album} · {track.plays} plays</span></span>
                    <ExternalLink className="h-4 w-4 text-[var(--dim)]" aria-hidden="true" />
                  </a>
                </li>
              ))}
            </ol>
          </section>
        </div>
        <aside className="quiet-aside lg:sticky lg:top-24">
          <Music2 className="mb-4 h-5 w-5 text-[var(--dim)]" aria-hidden="true" />
          <h2 className="card-title">Phone Memo</h2>
          <p className="mt-3 text-sm leading-7 text-[var(--muted)]">Οι αγορές και η ακρόαση γίνονται στις εξωτερικές πλατφόρμες. Το site δεν επεξεργάζεται πληρωμές.</p>
          <a href={spotifyArtist.url} target="_blank" rel="noreferrer" className="rsb-button-secondary mt-5 w-full">Προφίλ στο Spotify <ArrowUpRight className="h-4 w-4" aria-hidden="true" /></a>
          <dl className="mt-6 grid grid-cols-2 gap-4 border-t border-[var(--line)] pt-5">
            <div><dt className="text-xs text-[var(--dim)]">Ακροατές / μήνα</dt><dd className="mt-1 text-lg font-medium">{spotifyArtist.monthlyListeners}</dd></div>
            <div><dt className="text-xs text-[var(--dim)]">Followers</dt><dd className="mt-1 text-lg font-medium">{spotifyArtist.followers}</dd></div>
          </dl>
          <p className="mt-3 text-xs text-[var(--dim)]">Καταγραφή: 15/07/2026</p>
        </aside>
      </div>
    </Container>
  );
}
