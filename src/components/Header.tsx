"use client";

import Image from "next/image";
import Link from "next/link";
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
      <Container className="relative flex min-h-16 items-center justify-between gap-4 py-3">
        <Link href="/" className="inline-flex items-center">
          <Image src="/assets/logo/logo-white-red.png" alt="Ραπ Στα Μπαμ" width={56} height={52} priority className="h-10 w-auto" />
        </Link>

        <nav aria-label="Κύρια πλοήγηση" className="hidden items-center gap-1 md:flex">
          {navItems.map((item) => {
            const active = item.href === "/" ? pathname === "/" : !item.href.includes("#") && pathname.startsWith(item.href);

            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={active ? "page" : undefined}
                className={`px-3 py-2 text-sm font-bold transition ${active ? "bg-[var(--panel)] text-[var(--accent)]" : "text-[var(--muted)] hover:bg-[var(--panel)] hover:text-[var(--foreground)]"}`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <MobileMenu />
      </Container>
    </header>
  );
}
