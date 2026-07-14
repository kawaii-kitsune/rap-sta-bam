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
    <Container className="py-10">
      <Breadcrumbs items={[{ label: "Συμμετοχή" }]} />
      <div className="max-w-3xl">
        <SectionHeading
          eyebrow="Συμμετοχή"
          title="Οι δηλώσεις δεν είναι ανοιχτές ακόμα"
          copy="Προς το παρόν το Ραπ Στα Μπαμ δεν δέχεται δημόσιες αιτήσεις για επόμενα sessions."
        />
        <div className="border border-[var(--line)] bg-[var(--panel)] p-5 text-sm leading-7 text-[var(--muted)] sm:p-6">
          <p>Θα ανοίξουμε τη διαδικασία όταν είμαστε έτοιμοι να καλέσουμε νέους rappers για επόμενα επεισόδια.</p>
          <p className="mt-4 font-bold text-[var(--foreground)]">Για γενικές ερωτήσεις, συνεργασίες ή επικοινωνία με την ομάδα, χρησιμοποίησε τη φόρμα επικοινωνίας.</p>
          <Link href="/#contact" className="mt-5 inline-flex min-h-11 items-center border border-[var(--accent)] px-4 py-2 text-sm font-black uppercase tracking-[0.14em] text-[var(--accent)] hover:bg-[var(--accent)] hover:text-black">
            Επικοινωνία
          </Link>
        </div>
      </div>
    </Container>
  );
}
