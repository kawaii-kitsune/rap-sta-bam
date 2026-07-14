import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { Episode } from "@/types/content";

export function Hero({ latestEpisode }: { latestEpisode: Episode }) {
  return (
    <section className="relative min-h-[calc(100svh-4rem)] overflow-hidden border-b border-[var(--line)] bg-black">
      <Image
        src={latestEpisode.thumbnail}
        alt={`Τελευταίο επεισόδιο: ${latestEpisode.title}`}
        fill
        priority
        sizes="100vw"
        className="object-cover opacity-60 grayscale"
      />
      <div aria-hidden="true" className="absolute inset-0 bg-[linear-gradient(90deg,rgba(8,7,6,.96)_0%,rgba(8,7,6,.72)_54%,rgba(8,7,6,.28)_100%)]" />
      <div className="absolute right-4 top-5 z-10 sm:right-6 lg:right-10 lg:top-8">
        <Image
          src="/assets/logo/logo-white-red.png"
          alt="Ραπ Στα Μπαμ logo"
          width={180}
          height={167}
          priority
          className="h-16 w-auto opacity-95 sm:h-20 lg:h-24"
        />
      </div>

      <div className="relative mx-auto flex min-h-[calc(100svh-4rem)] max-w-7xl flex-col justify-end px-4 py-8 sm:px-6 lg:px-8">
        <div className="max-w-3xl">
          <h1 className="sr-only">Ραπ Στα Μπαμ</h1>
          <p className="meta-font text-xs font-bold uppercase tracking-[0.14em] text-[var(--accent)]">Ανεξάρτητη σειρά / Ηράκλειο Κρήτης</p>
          <p className="mt-5 text-2xl font-semibold leading-9 text-[var(--foreground)] sm:text-4xl sm:leading-[1.15]">
            Rappers μπαίνουν στο δωμάτιο χωρίς έτοιμο κομμάτι. Λένε την ιστορία τους και χτίζουμε beat, κουπλέ και recording σε ένα session.
          </p>
          <p className="mt-5 max-w-2xl text-base leading-7 text-[var(--muted)]">
            Η κάμερα κρατάει τη διαδικασία, όχι μόνο το τελικό αποτέλεσμα: ιδέες, δοκιμές, λάθη, γνώμες και την στιγμή που κάτι αρχίζει να ακούγεται σαν κομμάτι.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="#first-episode" className="inline-flex min-h-12 items-center gap-2 bg-[var(--accent)] px-5 py-3 font-black text-black transition hover:bg-[var(--foreground)]">
              Δες το πρώτο επεισόδιο <ArrowRight className="h-4 w-4" />
            </Link>
            <Link href="/about" className="inline-flex min-h-12 items-center border border-[var(--line)] px-5 py-3 font-black text-[var(--foreground)] transition hover:border-[var(--accent)] hover:text-[var(--accent)]">
              Το concept
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
