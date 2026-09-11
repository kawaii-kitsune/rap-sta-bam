import Link from "next/link";
import { ArrowUpRight, ExternalLink, Mail } from "lucide-react";
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
    <section id="contact" className="contact-section section-space">
      <Container className="contact-layout">
        <div>
          <SectionHeading eyebrow="Η ΓΡΑΜΜΗ ΕΙΝΑΙ ΑΝΟΙΧΤΗ" title="ΠΕΣ ΤΟ." copy="Έχεις μια ιδέα; Θες να συνεργαστούμε; Στείλε μας." />
          {contactEmail ? <a href={`mailto:${contactEmail}`} className="contact-email text-link"><Mail className="h-4 w-4 text-[var(--dim)]" aria-hidden="true" />{contactEmail}</a> : <p className="text-sm text-[var(--muted)]">Επικοινώνησε μαζί μας από τη φόρμα ή τα social.</p>}
          <div className="mt-6"><p className="mb-3 text-xs text-[var(--dim)]">Ακολούθησε το project</p><SocialLinks links={visibleSocialLinks} iconOnly /></div>
          <div className="mt-8 border-t border-[var(--line)] pt-6">
            <h3 className="text-sm font-semibold">Θέλεις να μπεις στο session;</h3>
            <p className="mt-2 max-w-md text-sm leading-7 text-[var(--muted)]">Οι δηλώσεις συμμετοχής δεν είναι ανοιχτές ακόμα. Θα ανακοινώσουμε εδώ πότε ξεκινά η διαδικασία.</p>
            <Link href="/participate" className="text-link mt-2">Πληροφορίες συμμετοχής <ArrowUpRight className="h-4 w-4" aria-hidden="true" /></Link>
          </div>
          <a href={siteConfig.googleContactForm.viewUrl} target="_blank" rel="noreferrer" className="text-link mt-4 text-xs text-[var(--dim)]">Άνοιγμα φόρμας στο Google Forms <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" /></a>
        </div>
        <ContactForm />
      </Container>
    </section>
  );
}
