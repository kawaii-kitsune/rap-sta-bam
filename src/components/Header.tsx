"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Container } from "@/components/Container";
import { MobileMenu } from "@/components/MobileMenu";
import { SocialLinks } from "@/components/SocialLinks";
import { projectSocialLinks } from "@/config/site";

const navItems = [
  { href: "/", label: "Αρχική" },
  { href: "/episodes", label: "Επεισόδια" },
  { href: "/artists", label: "Καλλιτέχνες" },
  { href: "/about", label: "Σχετικά" },
  { href: "/#contact", label: "Επικοινωνία" }
];

export function Header() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-40 border-b border-[var(--line)] bg-[#0b0a09]/95 backdrop-blur">
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
                className={`px-3 py-2 text-sm font-bold transition ${active ? "bg-[var(--accent)] text-black" : "text-[var(--muted)] hover:text-[var(--foreground)]"}`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="hidden lg:block">
          <SocialLinks links={projectSocialLinks} iconOnly />
        </div>

        <MobileMenu />
      </Container>
    </header>
  );
}
