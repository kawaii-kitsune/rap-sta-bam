import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/Container";
import { CookieSettingsButton } from "@/components/CookieSettingsButton";
import { SocialLinks } from "@/components/SocialLinks";
import { getDictionary } from "@/config/i18n";
import { getNavItems } from "@/config/navigation";
import { projectSocialLinks, siteConfig } from "@/config/site";

export function Footer({ locale = "el" }: { locale?: string }) {
  const dict = getDictionary(locale);
  const items = getNavItems(locale);
  const participateItem = {
    href: `/${locale}/participate`,
    label: locale === "en" ? "Participate" : "Συμμετοχή"
  };

  return (
    <footer className="site-footer">
      <Container>
        <div className="footer-grid">
          <div>
            <Link href={`/${locale}`} className="site-brand" aria-label={`${dict.footer.aboutTitle} — ${dict.nav.home}`}>
              <Image src="/assets/logo/logo-white-red.png" alt="" width={64} height={61} className="h-16 w-auto" />
              <span className="brand-name">{dict.footer.aboutTitle}</span>
            </Link>
            <p className="mt-4 max-w-sm text-sm leading-7 text-[var(--muted)]">
              {locale === "en"
                ? "Independent DIY music series from Heraklion, Crete where rappers build beats, lyrics, and recordings in a single session."
                : siteConfig.description}
            </p>
            <p className="footer-origin">{locale === "en" ? "HERAKLION CRETE / FROM SCRATCH." : "ΗΡΑΚΛΕΙΟ ΚΡΗΤΗΣ / ΑΠΟ ΤΟ ΜΗΔΕΝ."}</p>
          </div>
          <div>
            <p className="mb-3 text-sm font-semibold">{locale === "en" ? "Explore the project" : "Εξερεύνησε το project"}</p>
            <nav aria-label={locale === "en" ? "Footer navigation" : "Πλοήγηση footer"} className="grid grid-cols-2 gap-x-4 text-sm text-[var(--muted)]">
              {[...items, participateItem].map((link) => <Link key={link.href} href={link.href} className="text-link">{link.label}</Link>)}
            </nav>
          </div>
          <div>
            <p className="mb-4 text-sm font-semibold">{locale === "en" ? "Find us here" : "Βρες μας και εδώ"}</p>
            <SocialLinks links={projectSocialLinks} iconOnly />
            <p className="mt-4 text-sm leading-6 text-[var(--dim)]">{locale === "en" ? "Sessions, music and behind-the-scenes studio moments." : "Sessions, μουσική και στιγμές από το στούντιο."}</p>
          </div>
        </div>
        <div className="footer-bottom">
          <p>© 2026 {dict.footer.aboutTitle}. {dict.footer.rights}</p>
          <div className="flex flex-wrap items-center gap-x-6">
            <Link href={`/${locale}/privacy`} className="text-link text-xs">Privacy & Cookies</Link>
            <CookieSettingsButton />
          </div>
        </div>
      </Container>
    </footer>
  );
}
