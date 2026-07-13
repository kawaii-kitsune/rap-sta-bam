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
        className="object-cover opacity-70 contrast-125 grayscale"
      />
      <div aria-hidden="true" className="absolute inset-0 bg-[linear-gradient(90deg,rgba(8,7,6,.98)_0%,rgba(8,7,6,.78)_42%,rgba(8,7,6,.18)_100%)]" />
      <div aria-hidden="true" className="absolute inset-0 opacity-20 mix-blend-screen [background:repeating-linear-gradient(0deg,rgba(255,255,255,.18)_0_1px,transparent_1px_5px)]" />
      <div className="absolute right-4 top-5 z-10 rotate-[-4deg] sm:right-6 lg:right-10 lg:top-8">
        <Image
          src="/assets/logo/logo-white-red.png"
          alt="Ραπ Στα Μπαμ logo"
          width={180}
          height={167}
          priority
          className="h-20 w-auto opacity-95 drop-shadow-[8px_8px_0_#000] sm:h-24 lg:h-32"
        />
      </div>

      <div className="relative mx-auto flex min-h-[calc(100svh-4rem)] max-w-7xl flex-col justify-end px-4 py-8 sm:px-6 lg:px-8">
        <div className="mb-6 flex flex-wrap items-center gap-3">
          <span className="border border-[var(--accent)] bg-black/70 px-3 py-2 text-xs font-black uppercase tracking-[0.16em] text-[var(--accent)]">
            ΑΝΕΞΑΡΤΗΤΗ ΜΟΥΣΙΚΗ ΣΕΙΡΑ — ΗΡΑΚΛΕΙΟ ΚΡΗΤΗΣ
          </span>
          <span className="border border-[var(--foreground)] bg-[var(--foreground)] px-3 py-2 text-xs font-black uppercase tracking-[0.16em] text-black">
            {releaseCadence}
          </span>
        </div>

        <div className="grid gap-8 lg:grid-cols-[1fr_340px] lg:items-end">
          <div>
            <h1 className="display-font poster-title max-w-5xl text-[clamp(5rem,18vw,15rem)] text-[var(--foreground)] drop-shadow-[8px_8px_0_#000]">
              ΡΑΠ ΣΤΑ ΜΠΑΜ
            </h1>
            <p className="mt-5 max-w-2xl text-xl font-semibold leading-8 text-[var(--foreground)] sm:text-2xl">
              Καλούμε rappers να πουν την ιστορία τους και να χτίσουμε μαζί beat, κουπλέ και recording σε ένα session.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href={`/episodes/${latestEpisode.slug}`} className="inline-flex min-h-12 items-center gap-2 bg-[var(--accent)] px-5 py-3 font-black text-black transition hover:bg-[var(--foreground)]">
                {isLive ? "Δες το πρώτο επεισόδιο" : "Δες τι ετοιμάζεται"} <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>

          <aside className="border border-[var(--line)] bg-[#0b0a09]/90 p-5 hard-shadow">
            <p className="display-font text-7xl leading-none text-[var(--accent)]">#{String(latestEpisode.number).padStart(3, "0")}</p>
            <h2 className="display-font mt-3 text-4xl leading-none">{latestEpisode.artistName}</h2>
            <p className="mt-3 text-sm leading-6 text-[var(--muted)]">{isLive ? latestEpisode.title : "Πρώτη πρεμιέρα"}</p>
            <p className="mt-5 inline-flex items-center gap-2 border-t border-[var(--line)] pt-4 text-sm font-bold text-[var(--foreground)]">
              <CalendarDays className="h-4 w-4 text-[var(--accent)]" aria-hidden="true" />
              {formatGreekDate(latestEpisode.publishedAt)}
            </p>
          </aside>
        </div>
      </div>
    </section>
  );
}
