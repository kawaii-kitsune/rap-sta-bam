"use client";

import { useEffect, useState } from "react";
import { Analytics } from "@vercel/analytics/next";
import { getAnalyticsConsent, setAnalyticsConsent, type AnalyticsConsent, cookieSettingsEvent } from "@/lib/consent";

export function ConsentManager() {
  const [consent, setConsent] = useState<AnalyticsConsent | null>(null);
  const [ready, setReady] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const syncConsent = () => {
      const saved = getAnalyticsConsent();
      setConsent(saved);
      setOpen(saved === null);
      setReady(true);
    };

    syncConsent();
    window.addEventListener(cookieSettingsEvent, syncConsent);
    return () => window.removeEventListener(cookieSettingsEvent, syncConsent);
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
        <div className="fixed inset-x-3 bottom-3 z-[80] mx-auto max-w-3xl border border-[var(--line)] bg-[#080706] p-4 shadow-[8px_8px_0_#000] sm:bottom-5 sm:p-5" role="dialog" aria-live="polite" aria-label="Ρυθμίσεις cookies">
          <div className="grid gap-4 sm:grid-cols-[1fr_auto] sm:items-end">
            <div>
              <p className="meta-font text-xs font-bold uppercase tracking-[0.16em] text-[var(--accent)]">Cookies / analytics</p>
              <p className="mt-2 text-sm leading-6 text-[var(--muted)]">
                Χρησιμοποιούμε απαραίτητη αποθήκευση μόνο για την επιλογή σου. Με συγκατάθεση, ενεργοποιούμε ανώνυμα στατιστικά Vercel Analytics και audio play events για να βλέπουμε πώς χρησιμοποιείται το site.
              </p>
            </div>
            <div className="flex flex-wrap gap-2 sm:justify-end">
              <button type="button" onClick={() => choose("rejected")} className="min-h-11 border border-[var(--line)] px-4 py-2 text-sm font-black text-[var(--foreground)] hover:border-[var(--accent)] hover:text-[var(--accent)]">
                Μόνο απαραίτητα
              </button>
              <button type="button" onClick={() => choose("accepted")} className="min-h-11 bg-[var(--accent)] px-4 py-2 text-sm font-black text-black hover:bg-[var(--foreground)]">
                Αποδοχή στατιστικών
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
