"use client";

import { cookieSettingsEvent } from "@/lib/consent";

export function CookieSettingsButton() {
  return (
    <button
      type="button"
      onClick={() => window.dispatchEvent(new CustomEvent(cookieSettingsEvent))}
      className="text-link text-xs text-[var(--dim)]"
    >
      Ρυθμίσεις cookies
    </button>
  );
}
