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
        className="object-cover opacity-72 grayscale contrast-110"
      />
      <div aria-hidden="true" className="absolute inset-0 bg-[linear-gradient(180deg,rgba(8,7,6,.22)_0%,rgba(8,7,6,.52)_46%,rgba(8,7,6,.95)_100%)]" />
      <div className="relative mx-auto flex min-h-[calc(100svh-4rem)] max-w-7xl flex-col justify-end px-4 py-8 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <Image
            src="/assets/logo/logo-white-red.png"
            alt="Ραπ Στα Μπαμ logo"
            width={180}
            height={167}
            priority
            className="mx-auto mb-6 h-24 w-auto opacity-95 sm:h-28 lg:h-32"
          />
          <h1 className="sr-only">Ραπ Στα Μπαμ</h1>
          <p className="rsb-kicker">DIY hip hop sessions / Ηράκλειο Κρήτης</p>
          <p className="mt-5 text-3xl font-semibold leading-tight text-[var(--foreground)] sm:text-5xl sm:leading-[1.05]">
            Ένας rapper. Ένα beat. Ένα session από το μηδέν.
          </p>
          <p className="mx-auto mt-4 max-w-xl text-base leading-7 text-[var(--muted)]">
            Ιστορία, γράψιμο, recording και performance όπως συμβαίνουν στη ζωή... Απλά πράγματα.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link href="#first-episode" className="rsb-button">
              Μπες στο πρώτο session <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
