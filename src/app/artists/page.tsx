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
    <Link href={`/artists/${person.slug}`} className="person-archive-row">
      <div className="person-archive-image relative aspect-square overflow-hidden bg-black">
        <Image src={person.image} alt={person.name} fill sizes="(min-width: 768px) 88px, 72px" className="object-cover" />
      </div>
      <div>
        <p className="text-xs text-[var(--dim)]">{label}</p>
        <p className="mt-1 text-xs text-[var(--dim)]">{person.location ?? "Ραπ Στα Μπαμ"}</p>
      </div>
      <div>
        <h3 className="card-title">{person.name}</h3>
        <p className="mt-2 max-w-2xl text-sm leading-6 text-[var(--muted)]">{person.shortBio}</p>
      </div>
      <ArrowUpRight className="h-5 w-5 text-[var(--dim)]" aria-hidden="true" />
    </Link>
  );
}

export default function ArtistsPage() {
  const guests = getGuestArtists();
  const team = getTeamArtists();

  return (
    <Container className="page-shell">
      <Breadcrumbs items={[{ label: "Πρόσωπα" }]} />
      <div className="page-heading"><SectionHeading as="h1" eyebrow="Το project" title="Τα πρόσωπα" copy="Οι καλεσμένοι που φέρνουν τις ιστορίες τους και η ομάδα που δίνει στα sessions ήχο και εικόνα." /></div>

      <section className="mt-10">
        <div className="mb-4 flex flex-wrap items-baseline justify-between gap-3">
          <h2 className="section-title">Καλεσμένοι</h2>
          <span className="meta-font text-xs text-[var(--dim)]">{guests.length} πρόσωπα</span>
        </div>
        <div className="border-y border-[var(--line)]">
          {guests.map((person) => <PersonRow key={person.slug} person={person} label="Καλεσμένος" />)}
        </div>
      </section>

      <section className="mt-14">
        <div className="mb-4 flex flex-wrap items-baseline justify-between gap-3">
          <h2 className="section-title">Ομάδα παραγωγής</h2>
          <span className="meta-font text-xs text-[var(--dim)]">{team.length} πρόσωπα</span>
        </div>
        <div className="border-y border-[var(--line)]">
          {team.map((person) => <PersonRow key={person.slug} person={person} label="Team" />)}
        </div>
      </section>
    </Container>
  );
}
