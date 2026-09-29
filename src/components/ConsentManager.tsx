"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Analytics } from "@vercel/analytics/next";
import { getDictionary } from "@/config/i18n";
import { getAnalyticsConsent, setAnalyticsConsent, type AnalyticsConsent, cookieSettingsEvent } from "@/lib/consent";

export function ConsentManager() {
  const pathname = usePathname();
  const locale = pathname?.startsWith("/en") ? "en" : "el";
  const dict = getDictionary(locale);

  const [consent, setConsent] = useState<AnalyticsConsent | null>(null);
  const [ready, setReady] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const syncInitialConsent = () => {
      const saved = getAnalyticsConsent();
      setConsent(saved);
      setOpen(saved === null);
      setReady(true);
    };

    const timer = window.setTimeout(syncInitialConsent, 0);

    const openSettings = () => {
      setConsent(getAnalyticsConsent());
      setOpen(true);
      setReady(true);
    };

    window.addEventListener(cookieSettingsEvent, openSettings);
    return () => {
      window.clearTimeout(timer);
      window.removeEventListener(cookieSettingsEvent, openSettings);
    };
  }, []);

  function choose(value: AnalyticsConsent) {
    setAnalyticsConsent(value);
    setConsent(value);
    setOpen(false);
  }

  return (
    <>
      {ready && consent === "accepted" ? <Analytics /> : null}
      {ready && open ? (
        <section className="cookie-banner" aria-label={dict.cookie.title}>
          <h2 className="text-sm font-semibold">{dict.cookie.title}</h2>
          <p className="mt-2 text-sm leading-6 text-[var(--muted)]">
            {dict.cookie.copy}{" "}
            <Link href={`/${locale}/privacy`} className="underline underline-offset-4 hover:text-[var(--foreground)]">
              {dict.cookie.more}
            </Link>
          </p>
          <div className="cookie-actions">
            <button type="button" onClick={() => choose("rejected")} className="rsb-button-secondary">
              {dict.cookie.necessary}
            </button>
            <button type="button" onClick={() => choose("accepted")} className="rsb-button-secondary">
              {dict.cookie.accept}
            </button>
          </div>
        </section>
      ) : null}
    </>
  );
}
