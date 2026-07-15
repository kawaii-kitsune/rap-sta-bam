import type { Metadata } from "next";
import { ArrowUpRight, Disc3, ExternalLink, ShoppingBag } from "lucide-react";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { Container } from "@/components/Container";
import { SectionHeading } from "@/components/SectionHeading";
import { products } from "@/content/products";
import { createMetadata } from "@/lib/metadata";

export const metadata: Metadata = createMetadata({
  title: "Products",
  description: "Official Phone Memo release links for Bandcamp and ElasticStage products.",
  path: "/products"
});

function platformTone(platform: string) {
  return platform === "ElasticStage" ? "bg-[var(--accent)] text-black" : "border border-[var(--line)] text-[var(--muted)]";
}

export default function ProductsPage() {
  const featured = products.find((product) => product.featured);
  const otherProducts = products.filter((product) => product.slug !== featured?.slug);

  return (
    <Container className="py-10">
      <Breadcrumbs items={[{ label: "Products" }]} />

      <div className="grid gap-10 lg:grid-cols-[1fr_340px]">
        <main>
          <SectionHeading
            eyebrow="Phone Memo releases"
            title="Products / δισκογραφία"
            copy="Μαζεμένα official links για releases του Phone Memo. Η αγορά, το streaming και τα payments γίνονται στις αντίστοιχες πλατφόρμες."
          />

          {featured ? (
            <section className="mt-8 border-y border-[var(--line)] py-6">
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
                  className="inline-flex min-h-12 items-center justify-center gap-2 bg-[var(--accent)] px-5 py-3 text-sm font-black uppercase tracking-[0.14em] text-black transition hover:bg-[var(--foreground)]"
                >
                  Open product <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                </a>
              </div>
            </section>
          ) : null}

          <section className="mt-10">
            <div className="grid gap-0 border-y border-[var(--line)]">
              {otherProducts.map((product, index) => (
                <article key={product.slug} className="grid gap-4 border-b border-[var(--line)] py-5 last:border-b-0 sm:grid-cols-[4rem_1fr_auto] sm:items-center">
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
                    className="inline-flex min-h-11 items-center justify-center gap-2 border border-[var(--line)] px-4 py-2 text-sm font-black uppercase tracking-[0.14em] text-[var(--foreground)] transition hover:border-[var(--accent)] hover:text-[var(--accent)]"
                  >
                    Open <ExternalLink className="h-4 w-4" aria-hidden="true" />
                  </a>
                </article>
              ))}
            </div>
          </section>
        </main>

        <aside>
          <div className="sticky top-24 border-y border-[var(--line)] py-5">
            <h2 className="display-font text-4xl leading-none">How it works</h2>
            <div className="mt-5 grid gap-4 text-sm leading-6 text-[var(--muted)]">
              <p className="flex gap-3">
                <ShoppingBag className="mt-1 h-4 w-4 shrink-0 text-[var(--accent)]" aria-hidden="true" />
                Τα product links ανοίγουν εξωτερικά checkout ή release pages. Δεν κρατάμε πληρωμές στο site.
              </p>
              <p className="flex gap-3">
                <Disc3 className="mt-1 h-4 w-4 shrink-0 text-[var(--accent)]" aria-hidden="true" />
                Bandcamp και ElasticStage έχουν δικούς τους όρους, privacy και cookies όταν τα ανοίξεις.
              </p>
            </div>
          </div>
        </aside>
      </div>
    </Container>
  );
}
