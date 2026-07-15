import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { Container } from "@/components/Container";
import { SectionHeading } from "@/components/SectionHeading";
import { getGuestArtists, getTeamArtists } from "@/lib/content";
import { createMetadata } from "@/lib/metadata";
import type { Artist } from "@/types/content";

export const metadata: Metadata = createMetadata({
  title: "Πρόσωπα",
  description: "Οι καλεσμένοι καλλιτέχνες και οι συντελεστές του Ραπ Στα Μπαμ.",
  path: "/artists"
});

function PersonRow({ person, label }: { person: Artist; label: string }) {
  return (
    <Link href={`/artists/${person.slug}`} className="grid gap-4 border-b border-[var(--line)] px-4 py-5 last:border-b-0 sm:grid-cols-[96px_160px_1fr_32px] sm:items-center sm:px-5">
      <div className="relative aspect-square overflow-hidden bg-black">
        <Image src={person.image} alt={person.name} fill sizes="96px" className="object-cover grayscale" />
      </div>
      <div>
        <p className="meta-font text-[0.7rem] font-bold uppercase tracking-[0.12em] text-[var(--accent)]">{label}</p>
        <p className="mt-1 text-xs text-[var(--dim)]">{person.location ?? "Ραπ Στα Μπαμ"}</p>
      </div>
      <div>
        <h3 className="display-font text-3xl leading-none">{person.name}</h3>
        <p className="mt-2 max-w-2xl text-sm leading-6 text-[var(--muted)]">{person.shortBio}</p>
      </div>
      <ArrowUpRight className="hidden h-5 w-5 text-[var(--accent)] sm:block" aria-hidden="true" />
    </Link>
  );
}

export default function ArtistsPage() {
  const guests = getGuestArtists();
  const team = getTeamArtists();

  return (
    <Container className="py-10">
      <Breadcrumbs items={[{ label: "Πρόσωπα" }]} />
      <SectionHeading eyebrow="Archive" title="Καλεσμένοι και team" copy="Οι rappers που μπαίνουν στο session ξεχωριστά από τους ανθρώπους που κρατούν παραγωγή, ήχο, εικόνα και ταυτότητα." />

      <section className="mt-10">
        <div className="mb-4 flex items-baseline justify-between border-b border-[var(--line)] pb-2">
          <h2 className="display-font text-4xl leading-none">Καλεσμένοι / artists</h2>
          <span className="meta-font text-xs text-[var(--dim)]">LOG [{guests.length}]</span>
        </div>
        <div className="border-y border-[var(--line)]">
          {guests.map((person) => <PersonRow key={person.slug} person={person} label="Καλεσμένος" />)}
        </div>
      </section>

      <section className="mt-14">
        <div className="mb-4 flex items-baseline justify-between border-b border-[var(--line)] pb-2">
          <h2 className="display-font text-4xl leading-none">Team / συντελεστές</h2>
          <span className="meta-font text-xs text-[var(--dim)]">LOG [{team.length}]</span>
        </div>
        <div className="border-y border-[var(--line)]">
          {team.map((person) => <PersonRow key={person.slug} person={person} label="Team" />)}
        </div>
      </section>
    </Container>
  );
}
