import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { Container } from "@/components/Container";
import { EpisodeFilter } from "@/components/EpisodeFilter";
import { SectionHeading } from "@/components/SectionHeading";
import { defaultLocale } from "@/config/i18n";
import { getVisibleEpisodes } from "@/lib/content";
import { createMetadata } from "@/lib/metadata";

export const dynamic = "force-dynamic";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale = defaultLocale } = await params;
  const isEn = locale === "en";

  return createMetadata({
    title: isEn ? "Sessions" : "Επεισόδια",
    description: isEn
      ? "The complete archive of all Rap Sta Bam sessions."
      : "Το αρχείο όλων των επεισοδίων του Ραπ Στα Μπαμ.",
    path: `/${locale}/episodes`,
    locale
  });
}

export default async function EpisodesPage({ params }: Props) {
  const { locale = defaultLocale } = await params;
  const isEn = locale === "en";
  const episodes = getVisibleEpisodes(locale);

  return (
    <Container className="page-shell">
      <Breadcrumbs items={[{ label: isEn ? "Sessions" : "Επεισόδια" }]} />
      <div className="page-heading">
        <SectionHeading
          as="h1"
          eyebrow={isEn ? "Archive" : "Αρχείο"}
          title={isEn ? "All Sessions" : "Όλα τα επεισόδια"}
          copy={
            isEn
              ? "Watch the sessions, meet our guest artists, and dive behind the scenes into real-time studio production."
              : "Δες τα sessions, γνώρισε τους καλεσμένους και εξερεύνησε όσα συμβαίνουν μέσα στο στούντιο."
          }
        />
      </div>
      <EpisodeFilter episodes={episodes} locale={locale} />
    </Container>
  );
}
