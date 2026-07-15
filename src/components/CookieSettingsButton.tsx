"use client";

import { cookieSettingsEvent } from "@/lib/consent";

export function CookieSettingsButton() {
  return (
    <button
      type="button"
      onClick={() => window.dispatchEvent(new CustomEvent(cookieSettingsEvent))}
      className="mt-3 text-xs font-bold text-[var(--dim)] underline-offset-4 hover:text-[var(--accent)] hover:underline"
    >
      Ρυθμίσεις cookies
    </button>
  );
}
