import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/Container";
import { CookieSettingsButton } from "@/components/CookieSettingsButton";
import { SocialLinks } from "@/components/SocialLinks";
import { projectSocialLinks, siteConfig } from "@/config/site";

const footerLinks = [
  { href: "/", label: "Αρχική" },
  { href: "/episodes", label: "Επεισόδια" },
  { href: "/artists", label: "Πρόσωπα" },
  { href: "/products", label: "Releases" },
  { href: "/about", label: "Σχετικά" },
  { href: "/participate", label: "Συμμετοχή" },
  { href: "/#contact", label: "Επικοινωνία" },
  { href: "/privacy", label: "Privacy / Cookies" }
];

export function Footer() {
  return (
    <footer className="border-t border-[var(--line)] bg-[#080706]">
      <Container><p className="footer-wordmark display-font" aria-hidden="true">Ραπ Στα <span>Μπαμ.</span></p></Container>
      <Container className="grid gap-8 py-10 md:grid-cols-[1.2fr_.8fr_.8fr]">
        <div>
          <Image src="/assets/logo/logo-white-red.png" alt={siteConfig.name} width={160} height={149} className="h-20 w-auto" />
          <p className="mt-3 max-w-xl text-sm leading-6 text-[var(--muted)]">{siteConfig.description}</p>
        </div>
        <nav aria-label="Πλοήγηση footer" className="grid grid-cols-2 content-start gap-x-4 text-sm font-bold text-[var(--muted)]">
          {footerLinks.map((link) => (
            <Link key={link.href} href={link.href} className="inline-flex min-h-11 items-center hover:text-[var(--foreground)]">
              {link.label}
            </Link>
          ))}
        </nav>
        <div>
          <SocialLinks links={projectSocialLinks} iconOnly />
          <p className="mt-5 text-xs text-[var(--dim)]">© 2026 {siteConfig.name}</p>
          <CookieSettingsButton />
        </div>
      </Container>
    </footer>
  );
}
