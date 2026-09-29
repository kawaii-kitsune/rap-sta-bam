import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { Container } from "@/components/Container";
import { CookieSettingsButton } from "@/components/CookieSettingsButton";
import { SectionHeading } from "@/components/SectionHeading";
import { defaultLocale } from "@/config/i18n";
import { siteConfig } from "@/config/site";
import { createMetadata } from "@/lib/metadata";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale = defaultLocale } = await params;
  const isEn = locale === "en";

  return createMetadata({
    title: isEn ? "Privacy & Cookies Policy" : "Privacy & Cookies",
    description: isEn
      ? "Information regarding privacy, cookies, analytics, forms, and third-party embeds on Rap Sta Bam."
      : "Πληροφορίες για privacy, cookies, analytics, φόρμες, embeds και τρίτους παρόχους στο Ραπ Στα Μπαμ.",
    path: `/${locale}/privacy`,
    locale
  });
}

const updatedAt = "15/07/2026";

const sectionsEl = [
  {
    title: "Ποιοι είμαστε",
    body: [
      `Το ${siteConfig.name} είναι ανεξάρτητη DIY μουσική σειρά με βάση το Ηράκλειο Κρήτης. Για θέματα privacy ή διαγραφής στοιχείων μπορείς να επικοινωνήσεις στο ${siteConfig.contactEmail}.`,
      "Αυτή η σελίδα περιγράφει πρακτικά τι χρησιμοποιεί το site. Δεν αντικαθιστά εξατομικευμένη νομική συμβουλή."
    ]
  },
  {
    title: "Απαραίτητη λειτουργία του site",
    body: [
      "Το site μπορεί να λειτουργήσει χωρίς analytics cookies. Για να θυμάται την επιλογή σου, αποθηκεύει μόνο μία απαραίτητη τιμή στο localStorage του browser σου: αν αποδέχτηκες ή απέρριψες τα στατιστικά.",
      "Το audio, τα captions, οι εικόνες και τα περισσότερα assets σερβίρονται από το ίδιο το site. Τα captions φορτώνονται από local JSON αρχείο και το audio από protected route του site μετά την πρεμιέρα."
    ]
  },
  {
    title: "Cookies, localStorage και επιλογή συγκατάθεσης",
    body: [
      "Χρησιμοποιούμε localStorage για την επιλογή cookies/analytics, ώστε να μη βλέπεις το banner σε κάθε επίσκεψη.",
      "Αν επιλέξεις “Μόνο απαραίτητα”, δεν φορτώνουμε Vercel Analytics και δεν στέλνουμε custom audio analytics events. Αν επιλέξεις “Αποδοχή στατιστικών”, ενεργοποιούνται τα στατιστικά χρήσης."
    ]
  },
  {
    title: "Vercel hosting και Vercel Analytics",
    body: [
      "Το site φιλοξενείται στο Vercel. Όπως συμβαίνει με κάθε hosting provider, το Vercel μπορεί να επεξεργάζεται τεχνικά request/server logs για ασφάλεια, debugging και λειτουργία της υπηρεσίας.",
      "Με συγκατάθεση, φορτώνουμε Vercel Web Analytics για συγκεντρωτικά στατιστικά, όπως προβολές σελίδων και βασική χρήση του site. Τα analytics φορτώνονται μόνο αφού πατήσεις αποδοχή στατιστικών."
    ]
  },
  {
    title: "Audio analytics events",
    body: [
      "Στο audio player, με συγκατάθεση, μπορεί να στείλουμε custom events στο Vercel Analytics: audio_play, audio_30_seconds, audio_50_percent και audio_complete.",
      "Τα events αυτά μάς βοηθούν να καταλάβουμε αν το επεισόδιο ακούγεται πραγματικά. Δεν εμφανίζονται δημόσια και δεν τα χρησιμοποιούμε για διαφημιστικό profiling."
    ]
  },
  {
    title: "Φόρμα επικοινωνίας και Google Forms",
    body: [
      "Η φόρμα επικοινωνίας στέλνει τις απαντήσεις στο Google Forms. Όταν τη χρησιμοποιείς, αποστέλλονται τα στοιχεία που συμπληρώνεις: όνομα, email, θέμα και μήνυμα.",
      "Τα στοιχεία χρησιμοποιούνται μόνο για να διαβάσουμε και να απαντήσουμε στο μήνυμά σου. Οι απαντήσεις αποθηκεύονται στο Google Forms/Google account που διαχειρίζεται το project μέχρι να διαγραφούν από εμάς ή να ζητήσεις διαγραφή.",
      "Μην στέλνεις κωδικούς, οικονομικά στοιχεία, ιατρικά δεδομένα ή άλλες ευαίσθητες πληροφορίες μέσα από τη φόρμα."
    ]
  },
  {
    title: "Social links και εξωτερικές σελίδες",
    body: [
      "Το site περιέχει links προς YouTube, TikTok, Instagram, Spotify, Bandcamp, ElasticStage, Behance και websites συνεργατών/συντελεστών. Τα links αυτά ανοίγουν εξωτερικές υπηρεσίες.",
      "Όταν ανοίγεις εξωτερικό link, φεύγεις από το δικό μας site και ισχύουν οι πολιτικές privacy/cookies του αντίστοιχου παρόχου."
    ]
  },
  {
    title: "Ποια δικαιώματα έχεις",
    body: [
      "Μπορείς να ζητήσεις πρόσβαση, διόρθωση ή διαγραφή στοιχείων που έχεις στείλει μέσω φόρμας, επικοινωνώντας στο email του project.",
      "Μπορείς να αλλάξεις την επιλογή σου για τα cookies/analytics ανά πάσα στιγμή χρησιμοποιώντας το κουμπί 'Ρυθμίσεις cookies' στο footer."
    ]
  }
];

const sectionsEn = [
  {
    title: "Who We Are",
    body: [
      `Rap Sta Bam is an independent DIY music series based in Heraklion, Crete. For inquiries regarding privacy, data access, or deletion, contact us at ${siteConfig.contactEmail}.`,
      "This document outlines how our website handles data and privacy."
    ]
  },
  {
    title: "Essential Site Functionality",
    body: [
      "The site operates without tracking or marketing cookies. To remember your consent choice, we only store a single key in your browser's localStorage indicating whether you accepted or declined analytics.",
      "Audio, captions, photography, and site assets are served directly from our project. Captions load from local JSON files and audio streams from a protected endpoint."
    ]
  },
  {
    title: "Cookies & localStorage",
    body: [
      "We use localStorage solely to store your cookie preferences so you do not see the banner on every visit.",
      "Selecting 'Essential Only' disables all analytics and custom audio telemetry. Selecting 'Accept Analytics' activates anonymous page view and listener metrics."
    ]
  },
  {
    title: "Hosting & Analytics",
    body: [
      "Our website is hosted on Vercel. Standard server logs are processed by Vercel for technical operations, security, and debugging.",
      "With your consent, Vercel Web Analytics records aggregate page views and session insights without cross-site tracking or advertising profiling."
    ]
  },
  {
    title: "Contact Form",
    body: [
      "Information submitted through our contact form (name, email, topic, and message) is used strictly to reply to your inquiry.",
      "Never submit sensitive passwords, financial information, or personal identifiers through the contact form."
    ]
  },
  {
    title: "External Services & Social Media",
    body: [
      "The site features links and embeds for YouTube, Instagram, Spotify, Bandcamp, and partner platforms.",
      "Interacting with external players or clicking external links transfers you to third-party domains governed by their respective privacy terms."
    ]
  },
  {
    title: "Your Rights",
    body: [
      "You have the right to request access to or deletion of messages submitted via our contact forms by emailing us directly.",
      "You may update your cookie preferences at any time by clicking 'Cookie Settings' in the footer."
    ]
  }
];

export default async function PrivacyPage({ params }: Props) {
  const { locale = defaultLocale } = await params;
  const isEn = locale === "en";
  const sections = isEn ? sectionsEn : sectionsEl;

  return (
    <Container className="page-shell">
      <Breadcrumbs items={[{ label: isEn ? "Privacy & Cookies" : "Privacy & Cookies" }]} />
      <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_300px]">
        <div>
          <div className="page-heading">
            <SectionHeading
              as="h1"
              eyebrow={isEn ? "Legal & Privacy" : "Όροι & Privacy"}
              title={isEn ? "Privacy, Cookies & Embeds" : "Privacy, cookies και embeds"}
              copy={
                isEn
                  ? "A clear, transparent breakdown of how this site handles data, analytics, audio players, and external platforms."
                  : "Πρακτική και καθαρή καταγραφή για το τι χρησιμοποιεί το site σε analytics, audio, φόρμες και εξωτερικές πλατφόρμες."
              }
            />
          </div>
          <p className="meta-font mb-8 text-xs text-[var(--dim)]">
            {isEn ? `Last updated: ${updatedAt}` : `Τελευταία ενημέρωση: ${updatedAt}`}
          </p>

          <div className="grid gap-8">
            {sections.map((section) => (
              <section key={section.title} className="border-t border-[var(--line)] pt-6">
                <h2 className="section-title mb-3">{section.title}</h2>
                <div className="prose-rsb text-sm leading-7 text-[var(--muted)]">
                  {section.body.map((paragraph) => (
                    <p key={paragraph}>{paragraph}</p>
                  ))}
                </div>
              </section>
            ))}
          </div>
        </div>

        <aside>
          <div className="quiet-aside lg:sticky lg:top-24">
            <h2 className="card-title">{isEn ? "Quick Actions" : "Γρήγορες ενέργειες"}</h2>
            <p className="mt-2 text-sm leading-6 text-[var(--muted)]">
              {isEn
                ? "You can review and change your cookie and analytics consent at any time."
                : "Μπορείς να αλλάξεις την επιλογή συγκατάθεσης για τα στατιστικά ανά πάσα στιγμή."}
            </p>
            <div className="mt-5">
              <CookieSettingsButton />
            </div>

            <div className="mt-8 border-t border-[var(--line)] pt-5">
              <p className="text-xs font-medium text-[var(--dim)]">
                {isEn ? "Questions?" : "Επικοινωνία"}
              </p>
              <a
                href={`mailto:${siteConfig.contactEmail}`}
                className="contact-email mt-2 block text-sm font-bold text-[var(--foreground)] hover:text-[var(--accent)]"
              >
                {siteConfig.contactEmail}
              </a>
            </div>
            <Link href={`/${locale}/#contact`} className="rsb-button-secondary mt-5">
              {isEn ? "Contact Form" : "Φόρμα επικοινωνίας"}
            </Link>
          </div>
        </aside>
      </div>
    </Container>
  );
}
