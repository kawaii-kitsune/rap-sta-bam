"use client";

import { cookieSettingsEvent } from "@/lib/consent";
import { usePathname } from "next/navigation";

export function CookieSettingsButton() {
  const isEn = usePathname().startsWith("/en");
  return (
    <button
      type="button"
      onClick={() => window.dispatchEvent(new CustomEvent(cookieSettingsEvent))}
      className="text-link text-xs text-[var(--dim)]"
    >
      {isEn ? "Cookie settings" : "Ρυθμίσεις cookies"}
    </button>
  );
}
