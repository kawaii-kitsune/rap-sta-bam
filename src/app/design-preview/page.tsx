import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, CalendarDays, Disc3, Lock, Music2, Play, Radio } from "lucide-react";
import { Container } from "@/components/Container";
import { releaseSchedule } from "@/config/site";
import { getLatestEpisode } from "@/lib/content";
import { createMetadata } from "@/lib/metadata";

export const metadata: Metadata = createMetadata({
  title: "Design Preview",
  description: "Alternative framework-style layout preview for Ραπ Στα Μπαμ.",
  path: "/design-preview"
});

const stats = [
  { label: "Session", value: "#001" },
  { label: "Guest", value: "Τζίμος" },
  { label: "Audio", value: "21/07" }
];

export default function DesignPreviewPage() {
  const episode = getLatestEpisode();

  return (
    <Container className="py-10">
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3 border-y border-[var(--line)] py-4">
        <div>
          <p className="rsb-kicker">Framework-style preview</p>
          <h1 className="display-font mt-2 text-5xl leading-none sm:text-6xl">Ραπ Στα Μπαμ</h1>
        </div>
        <Link href="/" className="rsb-button-secondary">Current site <ArrowRight className="h-4 w-4" aria-hidden="true" /></Link>
      </div>

      <section className="grid gap-4 lg:grid-cols-[1.2fr_.8fr]">
        <div className="rsb-surface relative min-h-[520px] overflow-hidden">
          <Image src="/assets/real/episode-001-hero.jpg" alt="Ραπ Στα Μπαμ session" fill priority sizes="(min-width: 1024px) 60vw, 100vw" className="object-cover opacity-70 grayscale contrast-110" />
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(8,7,6,.2),rgba(8,7,6,.9))]" />
          <div className="absolute inset-x-0 bottom-0 p-5 sm:p-8">
            <span className="rsb-chip rsb-chip-accent">Episode preview</span>
            <h2 className="mt-5 max-w-2xl text-4xl font-black leading-[1.02] sm:text-6xl">Ένας rapper, ένα beat, ένα session από το μηδέν.</h2>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link href={`/episodes/${episode.slug}`} className="rsb-button">Open session <Play className="h-4 w-4" aria-hidden="true" /></Link>
              <Link href="/products" className="rsb-button-secondary">Releases <Disc3 className="h-4 w-4" aria-hidden="true" /></Link>
            </div>
          </div>
        </div>

        <aside className="grid gap-4">
          <div className="rsb-surface p-5">
            <p className="rsb-kicker">Status</p>
            <h2 className="display-font mt-2 text-4xl leading-none">Premiere locked</h2>
            <p className="mt-3 text-sm leading-6 text-[var(--muted)]">Video page, teaser, release info and session context are available before the full audio opens.</p>
            <div className="mt-5 grid gap-2">
              {["Full episode", "Audio player", "Synced captions"].map((item) => (
                <div key={item} className="flex items-center justify-between border-t border-[var(--line)] py-3 text-sm font-bold">
                  <span>{item}</span>
                  <Lock className="h-4 w-4 text-[var(--accent)]" aria-hidden="true" />
                </div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-3 border-y border-[var(--line)]">
            {stats.map((stat) => (
              <div key={stat.label} className="border-r border-[var(--line)] p-4 last:border-r-0">
                <p className="text-[0.65rem] font-black uppercase tracking-[0.14em] text-[var(--dim)]">{stat.label}</p>
                <p className="display-font mt-2 text-3xl leading-none text-[var(--accent)]">{stat.value}</p>
              </div>
            ))}
          </div>
        </aside>
      </section>

      <section className="mt-10 grid gap-8 lg:grid-cols-[320px_1fr]">
        <div>
          <p className="rsb-kicker">Monthly sessions</p>
          <h2 className="display-font mt-2 text-5xl leading-none">Schedule</h2>
          <p className="mt-4 text-sm leading-6 text-[var(--muted)]">A denser component layout for scanning dates, status and next sessions.</p>
        </div>
        <div className="rsb-surface">
          {releaseSchedule.slice(0, 4).map((item) => (
            <div key={item.date} className="rsb-row grid gap-3 p-4 sm:grid-cols-[120px_1fr_auto] sm:items-center">
              <time dateTime={item.date} className="display-font text-3xl leading-none text-[var(--accent)]">{item.label}</time>
              <span className="font-black">{item.title}</span>
              <span className="rsb-chip"><CalendarDays className="mr-2 h-3.5 w-3.5" aria-hidden="true" /> Session</span>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-10 grid gap-4 sm:grid-cols-3">
        {[
          { title: "Episode", copy: episode.title, icon: Radio },
          { title: "Audio", copy: "Unlocks at premiere", icon: Music2 },
          { title: "Releases", copy: "Bandcamp / ElasticStage / Spotify", icon: Disc3 }
        ].map((card) => {
          const Icon = card.icon;
          return (
            <div key={card.title} className="rsb-surface p-5">
              <Icon className="h-5 w-5 text-[var(--accent)]" aria-hidden="true" />
              <h3 className="mt-4 display-font text-3xl leading-none">{card.title}</h3>
              <p className="mt-3 text-sm leading-6 text-[var(--muted)]">{card.copy}</p>
            </div>
          );
        })}
      </section>
    </Container>
  );
}
