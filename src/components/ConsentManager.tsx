"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Analytics } from "@vercel/analytics/next";
import { getAnalyticsConsent, setAnalyticsConsent, type AnalyticsConsent, cookieSettingsEvent } from "@/lib/consent";

export function ConsentManager() {
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
        <section className="cookie-banner" aria-label="Ρυθμίσεις cookies">
          <h2 className="text-sm font-semibold">Η επιλογή σου για τα cookies</h2>
          <p className="mt-2 text-sm leading-6 text-[var(--muted)]">Αποθηκεύουμε την επιλογή σου. Με τη συγκατάθεσή σου, χρησιμοποιούμε στατιστικά επισκέψεων και ακρόασης για να βελτιώνουμε το site. <Link href="/privacy" className="underline underline-offset-4 hover:text-[var(--foreground)]">Περισσότερα</Link></p>
          <div className="cookie-actions">
            <button type="button" onClick={() => choose("rejected")} className="rsb-button-secondary">Μόνο απαραίτητα</button>
            <button type="button" onClick={() => choose("accepted")} className="rsb-button-secondary">Αποδοχή στατιστικών</button>
          </div>
        </section>
      ) : null}
    </>
  );
}
