"use client";

import { FormEvent, useMemo, useState } from "react";
import { usePathname } from "next/navigation";
import { Loader2, Send } from "lucide-react";
import { Field, Textarea, SelectField, focusFirstFormError, FormError } from "@/components/FormField";
import { siteConfig } from "@/config/site";

type FormState = "idle" | "submitting" | "success" | "error";

const requiredFields = [
  "artistName",
  "realName",
  "email",
  "social",
  "city",
  "role",
  "intro",
  "motivation"
] as const;

type RequiredField = (typeof requiredFields)[number];

const labelsEl: Record<RequiredField, string> = {
  artistName: "καλλιτεχνικό όνομα",
  realName: "πραγματικό όνομα",
  email: "email",
  social: "Instagram ή TikTok",
  city: "πόλη",
  role: "ρόλος",
  intro: "σύντομη παρουσίαση",
  motivation: "γιατί θέλεις να συμμετάσχεις"
};

const labelsEn: Record<RequiredField, string> = {
  artistName: "artist name",
  realName: "real name",
  email: "email",
  social: "Instagram or TikTok",
  city: "city",
  role: "role",
  intro: "short bio / introduction",
  motivation: "why you want to participate"
};

export function ParticipationForm({ locale: propLocale }: { locale?: string }) {
  const pathname = usePathname();
  const locale = propLocale ?? (pathname?.startsWith("/en") ? "en" : "el");
  const labels = locale === "en" ? labelsEn : labelsEl;

  const endpoint = process.env.NEXT_PUBLIC_FORMSPREE_ENDPOINT;
  const contactEmail = siteConfig.contactEmail.trim();
  const [state, setState] = useState<FormState>("idle");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [mailto, setMailto] = useState("");

  const formConfigured = Boolean(endpoint);

  const roleOptions = useMemo(
    () =>
      locale === "en"
        ? ["Rapper", "Producer", "Visual artist", "Other"]
        : ["Rapper", "Producer", "Visual artist", "Άλλο"],
    [locale]
  );

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    const nextErrors: Record<string, string> = {};

    if (data.get("company")) {
      return;
    }

    requiredFields.forEach((field) => {
      if (!String(data.get(field) ?? "").trim()) {
        nextErrors[field] =
          locale === "en"
            ? `Please fill in: ${labels[field]}.`
            : `Συμπλήρωσε το πεδίο: ${labels[field]}.`;
      }
    });

    const email = String(data.get("email") ?? "");
    if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      nextErrors.email = locale === "en" ? "Enter a valid email address." : "Γράψε ένα έγκυρο email.";
    }

    if (!data.get("consent")) {
      nextErrors.consent =
        locale === "en"
          ? "You must accept the terms of communication to proceed."
          : "Πρέπει να αποδεχτείς τους όρους επικοινωνίας.";
    }

    setErrors(nextErrors);
    if (Object.keys(nextErrors).length) {
      focusFirstFormError(form, nextErrors);
      return;
    }

    if (!formConfigured) {
      const body = encodeURIComponent(
        Array.from(data.entries())
          .filter(([key]) => key !== "company" && key !== "consent")
          .map(([key, value]) => `${key}: ${value}`)
          .join("\n")
      );
      setMailto(
        `mailto:${contactEmail}?subject=${encodeURIComponent(
          locale === "en" ? "Rap Sta Bam Participation" : "Ραπ Στα Μπαμ συμμετοχή"
        )}&body=${body}`
      );
      setState("success");
      return;
    }

    setState("submitting");

    try {
      const response = await fetch(endpoint as string, {
        method: "POST",
        body: data,
        headers: { Accept: "application/json" }
      });

      if (!response.ok) {
        throw new Error("Form submission failed");
      }

      form.reset();
      setState("success");
    } catch {
      setState("error");
    }
  }

  return (
    <form onSubmit={onSubmit} noValidate aria-busy={state === "submitting"} className="form-panel"
      onInput={(event) => {
        const field = event.target;
        if (field instanceof HTMLInputElement || field instanceof HTMLTextAreaElement || field instanceof HTMLSelectElement) {
          if (errors[field.name]) setErrors((current) => { const next = { ...current }; delete next[field.name]; return next; });
          if (state === "error" || state === "success") setState("idle");
        }
      }}>
      <div>
        <h3 className="card-title">{locale === "en" ? "Your Details" : "Τα στοιχεία σου"}</h3>
        <p className="form-note mt-1">{locale === "en" ? "Fields marked with * are required." : "Τα πεδία με * είναι υποχρεωτικά."}</p>
      </div>
      <div className="hidden" aria-hidden="true">
        <label htmlFor="company">Company</label>
        <input id="company" name="company" tabIndex={-1} autoComplete="off" />
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Field id="artistName" label={locale === "en" ? "Artist Name" : "Καλλιτεχνικό όνομα"} error={errors.artistName} />
        <Field id="realName" label={locale === "en" ? "Real Name" : "Πραγματικό όνομα"} autoComplete="name" error={errors.realName} />
        <Field id="email" label="Email" type="email" autoComplete="email" error={errors.email} />
        <Field id="social" label="Instagram / TikTok" error={errors.social} />
        <Field id="musicLink" label={locale === "en" ? "Spotify or YouTube Link" : "Spotify ή YouTube link"} required={false} />
        <Field id="city" label={locale === "en" ? "City" : "Πόλη"} autoComplete="address-level2" error={errors.city} />
      </div>

      <SelectField id="role" label={locale === "en" ? "Role" : "Ρόλος"} required error={errors.role}>
        <option value="">{locale === "en" ? "Select Role" : "Επίλεξε ρόλο"}</option>
        {roleOptions.map((role) => <option key={role} value={role}>{role}</option>)}
      </SelectField>

      <Textarea id="intro" label={locale === "en" ? "Short Introduction / Bio" : "Σύντομη παρουσίαση"} error={errors.intro} />
      <Textarea id="motivation" label={locale === "en" ? "Why do you want to join?" : "Γιατί θέλεις να συμμετάσχεις"} error={errors.motivation} />

      <label className="flex gap-3 text-sm leading-6 text-[var(--muted)]">
        <input required name="consent" type="checkbox" className="mt-1 h-5 w-5 accent-[var(--accent)]" aria-invalid={Boolean(errors.consent)} aria-describedby={errors.consent ? "consent-error" : undefined} />
        <span>
          {locale === "en"
            ? "I agree that my details will be used exclusively to contact me regarding potential participation in Rap Sta Bam."
            : "Συμφωνώ να χρησιμοποιηθούν τα στοιχεία μου αποκλειστικά για επικοινωνία σχετικά με πιθανή συμμετοχή στο Ραπ Στα Μπαμ."}
        </span>
      </label>
      <FormError id="consent-error" message={errors.consent} />

      <button type="submit" disabled={state === "submitting"} className="rsb-button">
        {state === "submitting" ? <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" /> : <Send className="h-4 w-4" aria-hidden="true" />}
        {state === "submitting" ? (locale === "en" ? "Submitting..." : "Αποστολή...") : (locale === "en" ? "Submit Application" : "Αποστολή συμμετοχής")}
      </button>

      {state === "success" ? (
        <div role="status" className="alert alert-success">
          {formConfigured
            ? (locale === "en" ? "Application submitted. We will reach out if a matching session opens up." : "Η φόρμα στάλθηκε. Θα επικοινωνήσουμε αν υπάρχει κατάλληλο session.")
            : <a href={mailto} className="text-[var(--accent)] underline">{locale === "en" ? "Open email client to send application" : "Άνοιγμα email για αποστολή αίτησης"}</a>}
        </div>
      ) : null}
      {state === "error" ? (
        <div role="alert" className="alert alert-error">
          {locale === "en" ? "Submission failed. Please try again or reach out directly via email/social." : "Η αποστολή απέτυχε. Δοκίμασε ξανά ή επικοινώνησε μέσω email/social."}
        </div>
      ) : null}
    </form>
  );
}
