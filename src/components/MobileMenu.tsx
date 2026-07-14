"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import { SocialLinks } from "@/components/SocialLinks";
import { projectSocialLinks } from "@/config/site";

const navItems = [
  { href: "/", label: "Αρχική" },
  { href: "/episodes", label: "Επεισόδια" },
  { href: "/artists", label: "Πρόσωπα" },
  { href: "/about", label: "Σχετικά" },
  { href: "/#contact", label: "Επικοινωνία" }
];

export function MobileMenu() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <div className="md:hidden">
      <button
        type="button"
        aria-expanded={open}
        aria-controls="mobile-navigation"
        onClick={() => setOpen((value) => !value)}
        className="inline-flex min-h-11 min-w-11 items-center justify-center border border-[var(--line)] bg-[var(--panel)]"
      >
        {open ? <X className="h-5 w-5" aria-hidden="true" /> : <Menu className="h-5 w-5" aria-hidden="true" />}
        <span className="sr-only">{open ? "Κλείσιμο μενού" : "Άνοιγμα μενού"}</span>
      </button>

      {open ? (
        <div id="mobile-navigation" className="absolute left-0 right-0 top-full border-y border-[var(--line)] bg-[#0d0b0a] p-4 shadow-2xl">
          <nav aria-label="Κύρια πλοήγηση κινητού" className="grid gap-2">
            {navItems.map((item) => {
              const active = item.href === "/" ? pathname === "/" : !item.href.includes("#") && pathname.startsWith(item.href);

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  aria-current={active ? "page" : undefined}
                  onClick={() => setOpen(false)}
                  className={`border px-4 py-3 font-bold ${active ? "border-[var(--accent)] bg-[var(--accent)] text-black" : "border-[var(--line)] hover:border-[var(--accent)]"}`}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>
          <SocialLinks links={projectSocialLinks} iconOnly className="mt-4" />
        </div>
      ) : null}
    </div>
  );
}
