import type { Metadata } from "next";
import { ArtistCard } from "@/components/ArtistCard";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { Container } from "@/components/Container";
import { SectionHeading } from "@/components/SectionHeading";
import { getAllArtists } from "@/lib/content";
import { createMetadata } from "@/lib/metadata";

export const metadata: Metadata = createMetadata({
  title: "Καλλιτέχνες",
  description: "Οι συμμετέχοντες καλλιτέχνες και συνεργάτες του Ραπ Στα Μπαμ.",
  path: "/artists"
});

export default function ArtistsPage() {
  const artists = getAllArtists();

  return (
    <Container className="py-10">
      <Breadcrumbs items={[{ label: "Καλλιτέχνες" }]} />
      <SectionHeading eyebrow="Roster" title="Καλλιτέχνες και συνεργάτες" copy="Προφίλ συμμετεχόντων, social links και τα επεισόδια που συνδέονται με κάθε πρόσωπο." />
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {artists.map((artist) => <ArtistCard key={artist.slug} artist={artist} />)}
      </div>
    </Container>
  );
}
