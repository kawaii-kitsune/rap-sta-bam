import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/Container";
import { CookieSettingsButton } from "@/components/CookieSettingsButton";
import { SocialLinks } from "@/components/SocialLinks";
import { navItems } from "@/config/navigation";
import { projectSocialLinks, siteConfig } from "@/config/site";

export function Footer() {
  return (
    <footer className="site-footer">
      <Container>
        <div className="footer-grid">
          <div>
            <Link href="/" className="site-brand" aria-label="Ραπ Στα Μπαμ — Αρχική">
              <Image src="/assets/logo/logo-white-red.png" alt="" width={64} height={61} className="h-16 w-auto" />
              <span className="brand-name">Ραπ Στα Μπαμ</span>
            </Link>
            <p className="mt-4 max-w-sm text-sm leading-7 text-[var(--muted)]">{siteConfig.description}</p>
            <p className="footer-origin">ΗΡΑΚΛΕΙΟ ΚΡΗΤΗΣ / ΑΠΟ ΤΟ ΜΗΔΕΝ.</p>
          </div>
          <div>
            <p className="mb-3 text-sm font-semibold">Εξερεύνησε το project</p>
            <nav aria-label="Πλοήγηση footer" className="grid grid-cols-2 gap-x-4 text-sm text-[var(--muted)]">
              {[...navItems, { href: "/participate", label: "Συμμετοχή" }].map((link) => <Link key={link.href} href={link.href} className="text-link">{link.label}</Link>)}
            </nav>
          </div>
          <div>
            <p className="mb-4 text-sm font-semibold">Βρες μας και εδώ</p>
            <SocialLinks links={projectSocialLinks} iconOnly />
            <p className="mt-4 text-sm leading-6 text-[var(--dim)]">Sessions, μουσική και στιγμές από το στούντιο.</p>
          </div>
        </div>
        <div className="footer-bottom">
          <p>© 2026 {siteConfig.name}</p>
          <div className="flex flex-wrap items-center gap-x-6">
            <Link href="/privacy" className="text-link text-xs">Privacy & Cookies</Link>
            <CookieSettingsButton />
          </div>
        </div>
      </Container>
    </footer>
  );
}
