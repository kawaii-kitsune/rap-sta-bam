"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { SocialLinks } from "@/components/SocialLinks";
import { projectSocialLinks } from "@/config/site";
import { getDictionary } from "@/config/i18n";
import { getNavItems, isNavActive } from "@/config/navigation";
import { trapDialogFocus } from "@/lib/dialog";

export function MobileMenu() {
  const pathname = usePathname();
  const locale = pathname.startsWith("/en") ? "en" : "el";
  const dict = getDictionary(locale);
  const items = getNavItems(locale);
  const targetLanguageHref = pathname.startsWith("/en")
    ? `/el${pathname.replace(/^\/en/, "") || ""}`
    : `/en${pathname.replace(/^\/el/, "") || ""}`;

  const dialog = useRef<HTMLDialogElement>(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const desktop = window.matchMedia("(min-width: 1024px)");
    const closeOnDesktop = () => { if (desktop.matches) dialog.current?.close(); };
    desktop.addEventListener("change", closeOnDesktop);
    closeOnDesktop();
    return () => {
      document.body.style.overflow = previousOverflow;
      desktop.removeEventListener("change", closeOnDesktop);
    };
  }, [open]);

  return (
    <div className="lg:hidden">
      <button type="button" aria-expanded={open} aria-controls="mobile-navigation" aria-haspopup="dialog"
        onClick={() => { dialog.current?.showModal(); setOpen(true); }}
        className="icon-button" aria-label={locale === "en" ? "Open Menu" : "Άνοιγμα μενού"}>
        <Menu className="h-5 w-5" aria-hidden="true" />
      </button>
      <dialog ref={dialog} id="mobile-navigation" className="mobile-dialog" aria-labelledby="mobile-menu-title" onKeyDown={trapDialogFocus}
        onClose={() => setOpen(false)} onClick={(event) => { if (event.target === event.currentTarget) dialog.current?.close(); }}>
        <div className="mobile-dialog-content">
          <div className="mb-8 flex items-center justify-between gap-4">
            <p id="mobile-menu-title" className="archive-label">{dict.footer.aboutTitle} / {locale === "en" ? "Menu" : "Μενού"}</p>
            <button type="button" aria-label={locale === "en" ? "Close Menu" : "Κλείσιμο μενού"} onClick={() => dialog.current?.close()} className="icon-button"><X className="h-5 w-5" aria-hidden="true" /></button>
          </div>
          <nav aria-label={locale === "en" ? "Mobile main navigation" : "Κύρια πλοήγηση κινητού"}>
            {items.map((item) => {
              const active = isNavActive(pathname, item.href);
              return (
                <Link key={item.href} href={item.href} aria-current={active ? "page" : undefined} onClick={() => dialog.current?.close()} className={`mobile-nav-link ${active ? "is-active" : ""}`}>
                  <span>{item.label}</span><ArrowUpRight className="h-5 w-5" aria-hidden="true" />
                </Link>
              );
            })}
          </nav>
          <div className="mt-6 border-t border-[var(--line)] pt-4">
            <Link
              href={targetLanguageHref}
              onClick={() => dialog.current?.close()}
              className="rsb-button-secondary w-full justify-center !min-h-10 text-sm"
            >
              {locale === "en" ? "Αλλαγή σε Ελληνικά (EL)" : "Switch to English (EN)"}
            </Link>
          </div>
          <div className="mt-auto pt-8">
            <Link href={`/${locale}/participate`} onClick={() => dialog.current?.close()} className="rsb-button-secondary mb-6">
              {locale === "en" ? "Participate" : "Συμμετοχή"} <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
            </Link>
            <SocialLinks links={projectSocialLinks} iconOnly />
            <p className="archive-label mt-6 text-[var(--dim)]">{locale === "en" ? "DIY hip hop sessions / Heraklion, Crete" : "DIY hip hop sessions / Ηράκλειο Κρήτης"}</p>
          </div>
        </div>
      </dialog>
    </div>
  );
}
