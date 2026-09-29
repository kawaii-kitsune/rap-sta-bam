import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { Container } from "@/components/Container";
import { SectionHeading } from "@/components/SectionHeading";
import { defaultLocale } from "@/config/i18n";
import { getGuestArtists, getTeamArtists } from "@/lib/content";
import { createMetadata } from "@/lib/metadata";
import type { Artist } from "@/types/content";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale = defaultLocale } = await params;
  const isEn = locale === "en";

  return createMetadata({
    title: isEn ? "Crew & Artists" : "Πρόσωπα",
    description: isEn
      ? "Guest artists and the production team behind Rap Sta Bam."
      : "Οι καλεσμένοι καλλιτέχνες και οι συντελεστές του Ραπ Στα Μπαμ.",
    path: `/${locale}/artists`,
    locale
  });
}

function PersonRow({
  person,
  label,
  locale
}: {
  person: Artist;
  label: string;
  locale: string;
}) {
  return (
    <Link href={`/${locale}/artists/${person.slug}`} className="person-archive-row">
      <div className="person-archive-image relative aspect-square overflow-hidden bg-black">
        <Image
          src={person.image}
          alt={person.name}
          fill
          sizes="(min-width: 768px) 88px, 72px"
          className="object-cover"
        />
      </div>
      <div>
        <p className="text-xs text-[var(--dim)]">{label}</p>
        <p className="mt-1 text-xs text-[var(--dim)]">{person.location ?? "Rap Sta Bam"}</p>
      </div>
      <div>
        <h3 className="card-title">{person.name}</h3>
        <p className="mt-2 max-w-2xl text-sm leading-6 text-[var(--muted)]">{person.shortBio}</p>
      </div>
      <ArrowUpRight className="h-5 w-5 text-[var(--dim)]" aria-hidden="true" />
    </Link>
  );
}

export default async function ArtistsPage({ params }: Props) {
  const { locale = defaultLocale } = await params;
  const isEn = locale === "en";

  const guests = getGuestArtists(locale);
  const team = getTeamArtists(locale);

  return (
    <Container className="page-shell">
      <Breadcrumbs items={[{ label: isEn ? "Crew & Artists" : "Πρόσωπα" }]} />
      <div className="page-heading">
        <SectionHeading
          as="h1"
          eyebrow={isEn ? "The Project" : "Το project"}
          title={isEn ? "The Crew & Guests" : "Τα πρόσωπα"}
          copy={
            isEn
              ? "The guest artists who bring their stories and the creative crew giving sound and vision to the sessions."
              : "Οι καλεσμένοι που φέρνουν τις ιστορίες τους και η ομάδα που δίνει στα sessions ήχο και εικόνα."
          }
        />
      </div>

      <section className="mt-10">
        <div className="mb-4 flex flex-wrap items-baseline justify-between gap-3">
          <h2 className="section-title">{isEn ? "Guest Artists" : "Καλεσμένοι"}</h2>
          <span className="meta-font text-xs text-[var(--dim)]">
            {guests.length} {isEn ? "artists" : "πρόσωπα"}
          </span>
        </div>
        <div className="border-y border-[var(--line)]">
          {guests.map((person) => (
            <PersonRow
              key={person.slug}
              person={person}
              label={isEn ? "Guest" : "Καλεσμένος"}
              locale={locale}
            />
          ))}
        </div>
      </section>

      <section className="mt-14">
        <div className="mb-4 flex flex-wrap items-baseline justify-between gap-3">
          <h2 className="section-title">{isEn ? "Production Team" : "Ομάδα παραγωγής"}</h2>
          <span className="meta-font text-xs text-[var(--dim)]">
            {team.length} {isEn ? "members" : "πρόσωπα"}
          </span>
        </div>
        <div className="border-y border-[var(--line)]">
          {team.map((person) => (
            <PersonRow
              key={person.slug}
              person={person}
              label={isEn ? "Team" : "Team"}
              locale={locale}
            />
          ))}
        </div>
      </section>
    </Container>
  );
}
