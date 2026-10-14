"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { Container } from "@/components/Container";
import { SectionHeading } from "@/components/SectionHeading";

export default function NotFound() {
  const locale = usePathname().startsWith("/en") ? "en" : "el";
  const isEn = locale === "en";
  return (
    <Container className="py-20">
      <div className="mx-auto max-w-xl">
        <SectionHeading as="h1" eyebrow={isEn ? "Error 404" : "Σφάλμα 404"} title={isEn ? "Page not found" : "Η σελίδα δεν βρέθηκε"} copy={isEn ? "The link may have changed or the content may not have been published yet." : "Το link μπορεί να άλλαξε ή το περιεχόμενο να μην έχει δημοσιευτεί ακόμα."} />
        <div className="flex flex-wrap gap-3">
          <Link href={`/${locale}`} className="rsb-button-secondary"><ArrowLeft className="h-4 w-4" aria-hidden="true" />{isEn ? "Back to home" : "Επιστροφή στην αρχική"}</Link>
          <Link href={`/${locale}/episodes`} className="rsb-button">{isEn ? "Explore sessions" : "Δες τα επεισόδια"}</Link>
        </div>
      </div>
    </Container>
  );
}
