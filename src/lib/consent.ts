export const analyticsConsentKey = "rsb_analytics_consent";
export const cookieSettingsEvent = "rsb-cookie-settings";

export type AnalyticsConsent = "accepted" | "rejected";

export function getAnalyticsConsent(): AnalyticsConsent | null {
  if (typeof window === "undefined") {
    return null;
  }

  const value = window.localStorage.getItem(analyticsConsentKey);
  return value === "accepted" || value === "rejected" ? value : null;
}

export function hasAnalyticsConsent() {
  return getAnalyticsConsent() === "accepted";
}

export function setAnalyticsConsent(value: AnalyticsConsent) {
  window.localStorage.setItem(analyticsConsentKey, value);
  window.dispatchEvent(new CustomEvent(cookieSettingsEvent));
}
