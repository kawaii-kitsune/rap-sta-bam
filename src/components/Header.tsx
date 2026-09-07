"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { usePathname } from "next/navigation";
import { Container } from "@/components/Container";
import { MobileMenu } from "@/components/MobileMenu";

const navItems = [
  { href: "/", label: "Αρχική" },
  { href: "/episodes", label: "Επεισόδια" },
  { href: "/artists", label: "Πρόσωπα" },
  { href: "/products", label: "Releases" },
  { href: "/about", label: "Σχετικά" },
  { href: "/#contact", label: "Επικοινωνία" }
];

export function Header() {
  const pathname = usePathname();

  return (
    <header className="site-header sticky top-0 z-40 border-b border-[var(--line)]">
      <Container className="relative flex min-h-20 items-center justify-between gap-4 py-3">
        <Link href="/" className="site-brand inline-flex min-h-11 items-center gap-3">
          <Image src="/assets/logo/logo-white-red.png" alt="Ραπ Στα Μπαμ" width={56} height={52} priority className="h-12 w-auto" />
          <span aria-hidden="true" className="archive-label hidden border-l border-[var(--line)] pl-3 leading-5 xl:block">Από το μηδέν.</span>
        </Link>

        <nav aria-label="Κύρια πλοήγηση" className="hidden items-center gap-1 md:flex">
          {navItems.map((item) => {
            const active = item.href === "/" ? pathname === "/" : !item.href.includes("#") && pathname.startsWith(item.href);

            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={active ? "page" : undefined}
                className={`nav-link ${active ? "is-active" : ""}`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <Link href="/episodes" className="archive-label hidden min-h-11 items-center gap-3 border-l border-[var(--line)] pl-5 lg:inline-flex">Μπες στο session <ArrowUpRight className="h-4 w-4 text-[var(--accent)]" aria-hidden="true" /></Link>
        <MobileMenu />
      </Container>
    </header>
  );
}
