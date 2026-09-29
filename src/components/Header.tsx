"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Container } from "@/components/Container";
import { MobileMenu } from "@/components/MobileMenu";
import { getDictionary } from "@/config/i18n";
import { getNavItems, isNavActive } from "@/config/navigation";

export function Header() {
  const pathname = usePathname();
  const locale = pathname.startsWith("/en") ? "en" : "el";
  const dict = getDictionary(locale);
  const items = getNavItems(locale);
  const targetLanguageHref = pathname.startsWith("/en")
    ? `/el${pathname.replace(/^\/en/, "") || ""}`
    : `/en${pathname.replace(/^\/el/, "") || ""}`;

  return (
    <header className="site-header">
      <Container className="header-inner">
        <Link href={`/${locale}`} className="site-brand" aria-label={`${dict.footer.aboutTitle} — ${dict.nav.home}`}>
          <Image src="/assets/logo/logo-white-red.png" alt="" width={76} height={72} priority className="header-logo" />
          <span><span className="brand-name">ΡΑΠ ΣΤΑ ΜΠΑΜ</span><span className="brand-caption">{locale === "en" ? "Independent. From Heraklion." : "Ανεξάρτητα. Από το Ηράκλειο."}</span></span>
        </Link>
        <div className="flex items-center gap-3">
          <nav aria-label={locale === "en" ? "Main navigation" : "Κύρια πλοήγηση"} className="hidden items-center gap-1 lg:flex">
            {items.map((item) => {
              const active = isNavActive(pathname, item.href);
              return <Link key={item.href} href={item.href} aria-current={active ? "page" : undefined} className={`nav-link ${active ? "is-active" : ""}`}>{item.label}</Link>;
            })}
          </nav>
          <Link
            href={targetLanguageHref}
            className="rsb-button-secondary !min-h-9 !py-1 !px-2.5 !text-xs font-semibold"
            aria-label={locale === "en" ? "Αλλαγή σε Ελληνικά" : "Switch to English"}
          >
            {locale === "en" ? "ΕΛ" : "EN"}
          </Link>
          <MobileMenu />
        </div>
      </Container>
    </header>
  );
}
