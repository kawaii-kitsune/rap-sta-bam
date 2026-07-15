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
  description: "Πληροφορίες για privacy, cookies, analytics, φόρμες, embeds και τρίτους παρόχους στο Ραπ Στα Μπαμ.",
  path: "/privacy"
});

const updatedAt = "15/07/2026";

const sections = [
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
    title: "Formspree fallback",
    body: [
      "Ο κώδικας του site υποστηρίζει Formspree endpoint ως εναλλακτικό τρόπο αποστολής φόρμας, αν ενεργοποιηθεί σχετική ρύθμιση περιβάλλοντος στο μέλλον.",
      "Στην τρέχουσα ρύθμιση χρησιμοποιούμε Google Forms για την επικοινωνία. Αν αλλάξει ο πάροχος φόρμας, αυτή η σελίδα πρέπει να ενημερωθεί."
    ]
  },
  {
    title: "YouTube embeds και thumbnails",
    body: [
      "Το site μπορεί να φορτώνει YouTube thumbnails από img.youtube.com και video embeds από youtube-nocookie.com. Χρησιμοποιούμε youtube-nocookie για πιο περιορισμένη λειτουργία embed σε σχέση με το κανονικό youtube.com embed.",
      "Αν πατήσεις play ή αλληλεπιδράσεις με YouTube embed, η Google/YouTube μπορεί να λάβει τεχνικά δεδομένα σύμφωνα με τις δικές της πολιτικές."
    ]
  },
  {
    title: "Instagram embeds",
    body: [
      "Σε σελίδες επεισοδίων μπορεί να εμφανιστούν Instagram embeds. Για να λειτουργήσουν, φορτώνεται script από instagram.com όταν υπάρχει τέτοιο embed στη σελίδα.",
      "Αν αλληλεπιδράσεις με Instagram embed, το Instagram/Meta μπορεί να επεξεργαστεί δεδομένα σύμφωνα με τις δικές του πολιτικές."
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
    title: "Fonts και scripts",
    body: [
      "Τα fonts φορτώνονται μέσω next/font κατά το build και σερβίρονται από το ίδιο το site, όχι απευθείας από Google Fonts στον browser σου.",
      "Το site περιλαμβάνει JSON-LD structured data για βασικό metadata του project. Αυτό δεν αποθηκεύει προσωπικά δεδομένα και δεν χρησιμοποιείται για tracking."
    ]
  },
  {
    title: "Ποια δικαιώματα έχεις",
    body: [
      "Μπορείς να ζητήσεις πρόσβαση, διόρθωση ή διαγραφή στοιχείων που έχεις στείλει μέσω φόρμας, επικοινωνώντας στο email του project.",
      "Μπορείς επίσης να αλλάξεις οποιαδήποτε στιγμή την επιλογή analytics από τις Ρυθμίσεις cookies στο footer ή να καθαρίσεις localStorage/cookies για το site από τις ρυθμίσεις του browser σου."
    ]
  },
  {
    title: "Αλλαγές σε αυτή τη σελίδα",
    body: [
      "Αν αλλάξει κάτι σημαντικό στον τρόπο που χρησιμοποιούμε analytics, φόρμες, embeds ή τρίτους παρόχους, αυτή η σελίδα πρέπει να ενημερωθεί.",
      `Τελευταία ενημέρωση: ${updatedAt}.`
    ]
  }
];

const providers = [
  ["Vercel", "Hosting, deployment, optional Web Analytics, technical logs"],
  ["Google Forms", "Contact form submissions"],
  ["Google / YouTube", "YouTube thumbnails and youtube-nocookie embeds"],
  ["Instagram / Meta", "Instagram embed script and external links"],
  ["TikTok", "External profile links"],
  ["Spotify", "External artist/profile links"],
  ["Bandcamp", "External album/product links"],
  ["ElasticStage", "External physical/product release links"],
  ["Behance", "External contributor links"],
  ["Partner websites", "External contributor/portfolio links"]
];

export default function PrivacyPage() {
  return (
    <Container className="py-10">
      <Breadcrumbs items={[{ label: "Privacy & Cookies" }]} />
      <div className="grid gap-10 lg:grid-cols-[1fr_340px]">
        <div>
          <SectionHeading
            eyebrow="Privacy / Cookies"
            title="Πολιτική privacy και cookies"
            copy="Τι αποθηκεύει, τι μετράει και ποιες τρίτες υπηρεσίες χρησιμοποιεί το site."
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
            <p className="text-xs font-black uppercase tracking-[0.16em] text-[var(--accent)]">Πάροχοι / third parties</p>
            <dl className="mt-3 grid gap-3">
              {providers.map(([name, use]) => (
                <div key={name} className="border-t border-[var(--line)] pt-3">
                  <dt className="text-sm font-black text-[var(--foreground)]">{name}</dt>
                  <dd className="mt-1 text-xs leading-5 text-[var(--muted)]">{use}</dd>
                </div>
              ))}
            </dl>
          </div>

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
