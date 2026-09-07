"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { SocialLinks } from "@/components/SocialLinks";
import { projectSocialLinks } from "@/config/site";
import { trapDialogFocus } from "@/lib/dialog";

const navItems = [
  { href: "/", label: "Αρχική" },
  { href: "/episodes", label: "Επεισόδια" },
  { href: "/artists", label: "Πρόσωπα" },
  { href: "/products", label: "Releases" },
  { href: "/about", label: "Σχετικά" },
  { href: "/#contact", label: "Επικοινωνία" }
];

export function MobileMenu() {
  const pathname = usePathname();
  const dialog = useRef<HTMLDialogElement>(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const desktop = window.matchMedia("(min-width: 768px)");
    const closeOnDesktop = () => { if (desktop.matches) dialog.current?.close(); };
    desktop.addEventListener("change", closeOnDesktop);
    closeOnDesktop();
    return () => {
      document.body.style.overflow = previousOverflow;
      desktop.removeEventListener("change", closeOnDesktop);
    };
  }, [open]);

  return (
    <div className="md:hidden">
      <button type="button" aria-expanded={open} aria-controls="mobile-navigation" aria-haspopup="dialog"
        onClick={() => { dialog.current?.showModal(); setOpen(true); }}
        className="inline-flex min-h-12 items-center justify-center gap-3 border border-[var(--line)] px-4">
        <span className="archive-label">Μενού</span><Menu className="h-5 w-5" aria-hidden="true" />
      </button>
      <dialog ref={dialog} id="mobile-navigation" className="mobile-dialog" aria-labelledby="mobile-menu-title" onKeyDown={trapDialogFocus}
        onClose={() => setOpen(false)} onClick={(event) => { if (event.target === event.currentTarget) dialog.current?.close(); }}>
        <div className="mobile-dialog-content">
          <div className="mb-8 flex items-center justify-between gap-4">
            <p id="mobile-menu-title" className="archive-label">Ραπ Στα Μπαμ / Μενού</p>
            <button type="button" aria-label="Κλείσιμο μενού" onClick={() => dialog.current?.close()} className="icon-button"><X className="h-5 w-5" aria-hidden="true" /></button>
          </div>
          <nav aria-label="Κύρια πλοήγηση κινητού">
            {navItems.map((item, index) => {
              const active = item.href === "/" ? pathname === "/" : !item.href.includes("#") && pathname.startsWith(item.href);
              return (
                <Link key={item.href} href={item.href} aria-current={active ? "page" : undefined} onClick={() => dialog.current?.close()} className={`mobile-nav-link ${active ? "is-active" : ""}`}>
                  <span className="archive-label text-[var(--dim)]">0{index + 1}</span>
                  <span className="display-font">{item.label}</span><ArrowUpRight className="h-5 w-5" aria-hidden="true" />
                </Link>
              );
            })}
          </nav>
          <div className="mt-auto pt-10">
            <Link href="/participate" onClick={() => dialog.current?.close()} className="rsb-button-secondary mb-6">Συμμετοχή <ArrowUpRight className="h-4 w-4" aria-hidden="true" /></Link>
            <SocialLinks links={projectSocialLinks} iconOnly />
            <p className="archive-label mt-6 text-[var(--dim)]">DIY hip hop sessions / Ηράκλειο Κρήτης</p>
          </div>
        </div>
      </dialog>
    </div>
  );
}
