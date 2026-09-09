import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { Container } from "@/components/Container";
import { SectionHeading } from "@/components/SectionHeading";
import { createMetadata } from "@/lib/metadata";

export const metadata: Metadata = createMetadata({
  title: "Συμμετοχή",
  description: "Οι δηλώσεις συμμετοχής για το Ραπ Στα Μπαμ δεν είναι ανοιχτές ακόμα.",
  path: "/participate"
});

export default function ParticipatePage() {
  return (
    <Container className="page-shell">
      <Breadcrumbs items={[{ label: "Συμμετοχή" }]} />
      <div className="max-w-3xl">
        <SectionHeading as="h1"
          eyebrow="Συμμετοχή"
          title="Οι δηλώσεις δεν είναι ανοιχτές ακόμα"
          copy="Προς το παρόν το Ραπ Στα Μπαμ δεν δέχεται δημόσιες αιτήσεις για επόμενα sessions."
        />
        <div className="quiet-aside text-sm leading-7 text-[var(--muted)]">
          <p>Θα ανοίξουμε τη διαδικασία όταν είμαστε έτοιμοι να καλέσουμε νέους rappers για επόμενα επεισόδια.</p>
          <p className="mt-4 font-bold text-[var(--foreground)]">Για γενικές ερωτήσεις, συνεργασίες ή επικοινωνία με την ομάδα, χρησιμοποίησε τη φόρμα επικοινωνίας.</p>
          <Link href="/#contact" className="rsb-button mt-5">
            Επικοινωνία
          </Link>
        </div>
      </div>
    </Container>
  );
}
