import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Container } from "@/components/Container";
import { SectionHeading } from "@/components/SectionHeading";

export default function NotFound() {
  return (
    <Container className="py-20">
      <div className="mx-auto max-w-xl">
        <SectionHeading as="h1" eyebrow="Σφάλμα 404" title="Η σελίδα δεν βρέθηκε" copy="Το link μπορεί να άλλαξε ή το περιεχόμενο να μην έχει δημοσιευτεί ακόμα." />
        <div className="flex flex-wrap gap-3">
          <Link href="/" className="rsb-button-secondary"><ArrowLeft className="h-4 w-4" aria-hidden="true" />Επιστροφή στην αρχική</Link>
          <Link href="/episodes" className="rsb-button">Δες τα επεισόδια</Link>
        </div>
      </div>
    </Container>
  );
}
