import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { Container } from "@/components/Container";
import { EpisodeFilter } from "@/components/EpisodeFilter";
import { SectionHeading } from "@/components/SectionHeading";
import { getVisibleEpisodes } from "@/lib/content";
import { createMetadata } from "@/lib/metadata";

export const metadata: Metadata = createMetadata({
  title: "Επεισόδια",
  description: "Το archive όλων των επεισοδίων του Ραπ Στα Μπαμ.",
  path: "/episodes"
});

export default function EpisodesPage() {
  const episodes = getVisibleEpisodes();

  return (
    <Container className="py-10">
      <Breadcrumbs items={[{ label: "Επεισόδια" }]} />
      <SectionHeading eyebrow="Archive" title="Όλα τα επεισόδια" copy="Δημοσιευμένες sessions και upcoming καταχωρήσεις με υλικό, credits και links σε ένα σημείο." />
      <EpisodeFilter episodes={episodes} />
    </Container>
  );
}
