import Image from "next/image";
import Link from "next/link";
import { ArrowRight, CalendarDays } from "lucide-react";
import { releaseCadence } from "@/config/site";
import { formatGreekDate } from "@/lib/content";
import type { Episode } from "@/types/content";

export function Hero({ latestEpisode, isLive }: { latestEpisode: Episode; isLive: boolean }) {
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
        <div className="grid gap-8 lg:grid-cols-[1fr_320px] lg:items-end">
          <div>
            <h1 className="sr-only">Ραπ Στα Μπαμ</h1>
            <p className="text-xs font-black uppercase tracking-[0.18em] text-[var(--accent)]">Ανεξάρτητη σειρά / Ηράκλειο Κρήτης</p>
            <p className="mt-5 max-w-2xl text-2xl font-semibold leading-9 text-[var(--foreground)] sm:text-3xl">
              Rappers μπαίνουν στο δωμάτιο χωρίς έτοιμο κομμάτι. Λένε την ιστορία τους και χτίζουμε beat, κουπλέ και recording σε ένα session.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href={`/episodes/${latestEpisode.slug}`} className="inline-flex min-h-12 items-center gap-2 bg-[var(--accent)] px-5 py-3 font-black text-black transition hover:bg-[var(--foreground)]">
                {isLive ? "Άνοιξε το επεισόδιο" : "Δες το πρώτο session"} <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>

          <aside className="border-l border-[var(--line)] pl-5">
            <p className="text-xs font-black uppercase tracking-[0.18em] text-[var(--accent)]">#{String(latestEpisode.number).padStart(3, "0")}</p>
            <h2 className="display-font mt-2 text-4xl leading-none">{latestEpisode.artistName}</h2>
            <p className="mt-3 text-sm leading-6 text-[var(--muted)]">{isLive ? latestEpisode.title : "Πρώτη πρεμιέρα"}</p>
            <p className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-[var(--foreground)]">
              <CalendarDays className="h-4 w-4 text-[var(--accent)]" aria-hidden="true" />
              {formatGreekDate(latestEpisode.publishedAt)} / {releaseCadence}
            </p>
          </aside>
        </div>
      </div>
    </section>
  );
}
