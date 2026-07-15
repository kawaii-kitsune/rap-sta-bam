import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { Container } from "@/components/Container";
import { CookieSettingsButton } from "@/components/CookieSettingsButton";
import { SectionHeading } from "@/components/SectionHeading";
import { siteConfig } from "@/config/site";
import { createMetadata } from "@/lib/metadata";

export const metadata: Metadata = createMetadata({
  title: "Privacy & Cookies",
  description: "Πληροφορίες για privacy, cookies, analytics και φόρμες επικοινωνίας στο Ραπ Στα Μπαμ.",
  path: "/privacy"
});

const sections = [
  {
    title: "Τι δεδομένα μπορεί να συλλεχθούν",
    body: [
      "Όταν χρησιμοποιείς το site, μπορεί να συλλεχθούν τεχνικά δεδομένα χρήσης, όπως σελίδες που προβλήθηκαν, βασικές πληροφορίες συσκευής/browser και ανώνυμα events χρήσης, μόνο εφόσον έχεις αποδεχτεί τα στατιστικά cookies.",
      "Όταν στέλνεις μήνυμα από τη φόρμα επικοινωνίας, αποθηκεύονται τα στοιχεία που συμπληρώνεις ο ίδιος: όνομα, email, θέμα και μήνυμα. Αυτά χρησιμοποιούνται μόνο για να απαντήσουμε στο μήνυμά σου."
    ]
  },
  {
    title: "Cookies και local storage",
    body: [
      "Το site αποθηκεύει απαραίτητα μόνο την επιλογή σου για cookies/analytics στο πρόγραμμα περιήγησης, ώστε να μη σε ρωτάει ξανά σε κάθε επίσκεψη.",
      "Αν αποδεχτείς τα στατιστικά, ενεργοποιούνται Vercel Analytics και custom audio events. Αν επιλέξεις μόνο απαραίτητα, τα analytics δεν φορτώνουν και τα audio events δεν αποστέλλονται."
    ]
  },
  {
    title: "Analytics και audio events",
    body: [
      "Χρησιμοποιούμε Vercel Analytics για βασικά, συγκεντρωτικά στατιστικά χρήσης του site.",
      "Στο audio player μπορεί να μετρηθούν events όπως play, 30 seconds, 50 percent και complete, ώστε να καταλαβαίνουμε αν το επεισόδιο ακούγεται πραγματικά. Αυτά τα events αποστέλλονται μόνο αν έχεις αποδεχτεί τα στατιστικά."
    ]
  },
  {
    title: "Google Forms",
    body: [
      "Η φόρμα επικοινωνίας στέλνει τις απαντήσεις στο Google Forms. Αυτό σημαίνει ότι τα στοιχεία που συμπληρώνεις περνούν και αποθηκεύονται στις υπηρεσίες της Google.",
      "Μην στέλνεις κωδικούς, οικονομικά στοιχεία ή ευαίσθητες πληροφορίες μέσα από τη φόρμα."
    ]
  },
  {
    title: "Embeds και εξωτερικά links",
    body: [
      "Το site μπορεί να εμφανίζει YouTube embeds μέσω youtube-nocookie.com και links προς κοινωνικά δίκτυα όπως YouTube, TikTok, Instagram και Spotify.",
      "Αν ανοίξεις εξωτερικό link ή αλληλεπιδράσεις με embed τρίτου παρόχου, ισχύουν και οι πολιτικές του αντίστοιχου παρόχου."
    ]
  },
  {
    title: "Πώς αλλάζεις επιλογή",
    body: [
      "Μπορείς οποιαδήποτε στιγμή να ανοίξεις ξανά τις ρυθμίσεις cookies από το footer και να αλλάξεις επιλογή.",
      "Αν θέλεις να διαγράψεις την αποθηκευμένη επιλογή από τον browser σου, μπορείς να καθαρίσεις το local storage/cookies για το site από τις ρυθμίσεις του browser."
    ]
  }
];

export default function PrivacyPage() {
  return (
    <Container className="py-10">
      <Breadcrumbs items={[{ label: "Privacy & Cookies" }]} />
      <div className="grid gap-10 lg:grid-cols-[1fr_320px]">
        <div>
          <SectionHeading
            eyebrow="Privacy / Cookies"
            title="Πολιτική privacy και cookies"
            copy="Σύντομη περιγραφή για το τι αποθηκεύει και τι μετράει το site. Δεν αντικαθιστά εξειδικευμένη νομική συμβουλή."
          />

          <div className="grid gap-8">
            {sections.map((section) => (
              <section key={section.title} className="border-t border-[var(--line)] pt-6">
                <h2 className="display-font text-3xl leading-none">{section.title}</h2>
                <div className="prose-rsb mt-4 max-w-3xl text-base leading-7 text-[var(--muted)]">
                  {section.body.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
                </div>
              </section>
            ))}
          </div>
        </div>

        <aside className="content-start border-y border-[var(--line)] py-5 lg:sticky lg:top-24">
          <h2 className="display-font text-3xl">Ρυθμίσεις</h2>
          <p className="mt-3 text-sm leading-6 text-[var(--muted)]">Άνοιξε ξανά το cookie banner για να αλλάξεις επιλογή στατιστικών.</p>
          <CookieSettingsButton />
          <div className="mt-6 border-t border-[var(--line)] pt-5">
            <p className="text-xs font-black uppercase tracking-[0.16em] text-[var(--accent)]">Επικοινωνία</p>
            <a href={`mailto:${siteConfig.contactEmail}`} className="mt-2 block text-sm font-bold text-[var(--foreground)] hover:text-[var(--accent)]">{siteConfig.contactEmail}</a>
          </div>
          <Link href="/#contact" className="mt-5 inline-flex min-h-11 items-center border border-[var(--accent)] px-4 py-2 text-sm font-black uppercase tracking-[0.14em] text-[var(--accent)] hover:bg-[var(--accent)] hover:text-black">
            Φόρμα επικοινωνίας
          </Link>
        </aside>
      </div>
    </Container>
  );
}
