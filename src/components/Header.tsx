"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Container } from "@/components/Container";
import { MobileMenu } from "@/components/MobileMenu";
import { isNavActive, navItems } from "@/config/navigation";

export function Header() {
  const pathname = usePathname();
  return (
    <header className="site-header">
      <Container className="header-inner">
        <Link href="/" className="site-brand" aria-label="Ραπ Στα Μπαμ — Αρχική">
          <Image src="/assets/logo/logo-white-red.png" alt="" width={76} height={72} priority className="header-logo" />
          <span><span className="brand-name">ΡΑΠ ΣΤΑ ΜΠΑΜ</span><span className="brand-caption">Ανεξάρτητα. Από το Ηράκλειο.</span></span>
        </Link>
        <nav aria-label="Κύρια πλοήγηση" className="hidden items-center gap-1 lg:flex">
          {navItems.map((item) => {
            const active = isNavActive(pathname, item.href);
            return <Link key={item.href} href={item.href} aria-current={active ? "page" : undefined} className={`nav-link ${active ? "is-active" : ""}`}>{item.label}</Link>;
          })}
        </nav>
        <MobileMenu />
      </Container>
    </header>
  );
}
