import { ExternalLink, Mail } from "lucide-react";
import { Container } from "@/components/Container";
import { ContactForm } from "@/components/ContactForm";
import { SectionHeading } from "@/components/SectionHeading";
import { SocialLinks } from "@/components/SocialLinks";
import { projectSocialLinks, siteConfig } from "@/config/site";
import { isValidHttpUrl } from "@/lib/content";

export function ContactSection() {
  const contactEmail = siteConfig.contactEmail.trim();
  const visibleSocialLinks = projectSocialLinks.filter((link) => isValidHttpUrl(link.url));

  return (
    <section id="contact" className="border-b border-[var(--line)] py-14">
      <Container>
        <SectionHeading
          eyebrow="Επικοινωνία"
          title="Μίλα μαζί μας"
          copy="Για συνεργασίες, ερωτήσεις, προτάσεις και κάθε επαφή γύρω από το Ραπ Στα Μπαμ."
        />

        <div className="grid gap-8 lg:grid-cols-[.82fr_1.18fr]">
          <div className="border-y border-[var(--line)]">
            <div className="border-b border-[var(--line)] px-4 py-5 sm:px-5">
              <p className="text-xs font-black uppercase tracking-[0.18em] text-[var(--accent)]">Email</p>
              {contactEmail ? (
                <a href={`mailto:${contactEmail}`} className="mt-3 inline-flex items-center gap-2 text-lg font-black text-[var(--foreground)] hover:text-[var(--accent)]">
                  <Mail className="h-4 w-4" aria-hidden="true" />
                  {contactEmail}
                </a>
              ) : (
                <p className="mt-3 max-w-md text-sm leading-6 text-[var(--muted)]">
                  Δημόσιο inbox δεν έχει οριστεί ακόμα. Αν χρειάζεται άμεση επαφή, στείλε DM στα social links ή χρησιμοποίησε τη φόρμα επικοινωνίας.
                </p>
              )}
            </div>

            <div className="border-b border-[var(--line)] px-4 py-5 sm:px-5">
              <p className="text-xs font-black uppercase tracking-[0.18em] text-[var(--accent)]">Socials</p>
              {visibleSocialLinks.length ? (
                <SocialLinks links={visibleSocialLinks} className="mt-3" />
              ) : (
                <p className="mt-3 text-sm leading-6 text-[var(--muted)]">Οι επίσημοι λογαριασμοί του project θα μπουν εδώ μόλις οριστούν.</p>
              )}
            </div>

            <div className="border-b border-[var(--line)] px-4 py-5 sm:px-5">
              <p className="text-xs font-black uppercase tracking-[0.18em] text-[var(--accent)]">Google Form</p>
              <p className="mt-3 text-sm leading-6 text-[var(--muted)]">Η φόρμα του site στέλνει δωρεάν τις απαντήσεις στο Google Forms. Μπορείς να την ανοίξεις και απευθείας.</p>
              <a href={siteConfig.googleContactForm.viewUrl} target="_blank" rel="noreferrer" className="mt-4 inline-flex min-h-11 items-center gap-2 border border-[var(--accent)] px-4 py-2 text-sm font-black uppercase tracking-[0.14em] text-[var(--accent)] hover:bg-[var(--accent)] hover:text-black">
                Άνοιγμα φόρμας
                <ExternalLink className="h-4 w-4" aria-hidden="true" />
              </a>
            </div>

            <div className="px-4 py-5 sm:px-5">
              <p className="text-xs font-black uppercase tracking-[0.18em] text-[var(--accent)]">Συμμετοχή</p>
              <p className="mt-3 text-sm leading-6 text-[var(--muted)]">Οι δηλώσεις συμμετοχής δεν είναι ανοιχτές ακόμα. Προς το παρόν δεχόμαστε μόνο γενικά μηνύματα και συνεργασίες από τη φόρμα επικοινωνίας.</p>
            </div>
          </div>

          <ContactForm />
        </div>
      </Container>
    </section>
  );
}
