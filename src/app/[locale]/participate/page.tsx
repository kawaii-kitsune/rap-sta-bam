import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { Container } from "@/components/Container";
import { SectionHeading } from "@/components/SectionHeading";
import { defaultLocale } from "@/config/i18n";
import { createMetadata } from "@/lib/metadata";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale = defaultLocale } = await params;
  const isEn = locale === "en";

  return createMetadata({
    title: isEn ? "Participate" : "Συμμετοχή",
    description: isEn
      ? "Submissions for Rap Sta Bam sessions are not open yet."
      : "Οι δηλώσεις συμμετοχής για το Ραπ Στα Μπαμ δεν είναι ανοιχτές ακόμα.",
    path: `/${locale}/participate`,
    locale
  });
}

export default async function ParticipatePage({ params }: Props) {
  const { locale = defaultLocale } = await params;
  const isEn = locale === "en";

  return (
    <Container className="page-shell">
      <Breadcrumbs items={[{ label: isEn ? "Participate" : "Συμμετοχή" }]} />
      <div className="max-w-3xl">
        <SectionHeading
          as="h1"
          eyebrow={isEn ? "Participate" : "Συμμετοχή"}
          title={
            isEn
              ? "Submissions are not currently open"
              : "Οι δηλώσεις δεν είναι ανοιχτές ακόμα"
          }
          copy={
            isEn
              ? "Rap Sta Bam is not accepting open submissions for upcoming sessions at this moment."
              : "Προς το παρόν το Ραπ Στα Μπαμ δεν δέχεται δημόσιες αιτήσεις για επόμενα sessions."
          }
        />
        <div className="quiet-aside text-sm leading-7 text-[var(--muted)]">
          <p>
            {isEn
              ? "We will open the application call when we are ready to invite guest MCs for future episodes."
              : "Θα ανοίξουμε τη διαδικασία όταν είμαστε έτοιμοι να καλέσουμε νέους rappers για επόμενα επεισόδια."}
          </p>
          <p className="mt-4 font-bold text-[var(--foreground)]">
            {isEn
              ? "For general inquiries, collaborations, or reaching out to the crew, please use the contact form."
              : "Για γενικές ερωτήσεις, συνεργασίες ή επικοινωνία με την ομάδα, χρησιμοποίησε τη φόρμα επικοινωνίας."}
          </p>
          <Link href={`/${locale}/#contact`} className="rsb-button mt-5">
            {isEn ? "Contact Us" : "Επικοινωνία"}
          </Link>
        </div>
      </div>
    </Container>
  );
}
