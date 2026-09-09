"use client";

import { FormEvent, useMemo, useState } from "react";
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

const labels: Record<RequiredField, string> = {
  artistName: "καλλιτεχνικό όνομα",
  realName: "πραγματικό όνομα",
  email: "email",
  social: "Instagram ή TikTok",
  city: "πόλη",
  role: "ρόλος",
  intro: "σύντομη παρουσίαση",
  motivation: "γιατί θέλεις να συμμετάσχεις"
};

export function ParticipationForm() {
  const endpoint = process.env.NEXT_PUBLIC_FORMSPREE_ENDPOINT;
  const contactEmail = siteConfig.contactEmail.trim();
  const [state, setState] = useState<FormState>("idle");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [mailto, setMailto] = useState("");

  const formConfigured = Boolean(endpoint);
  const canUseMailto = Boolean(contactEmail);

  const roleOptions = useMemo(() => ["Rapper", "Producer", "Visual artist", "Άλλο"], []);

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
        nextErrors[field] = `Συμπλήρωσε το πεδίο: ${labels[field]}.`;
      }
    });

    if (!data.get("consent")) {
      nextErrors.consent = "Χρειάζεται συγκατάθεση για να σταλεί η φόρμα.";
    }

    const email = String(data.get("email") ?? "");
    if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      nextErrors.email = "Γράψε ένα έγκυρο email.";
    }

    setErrors(nextErrors);
    if (Object.keys(nextErrors).length) {
      focusFirstFormError(form, nextErrors);
      return;
    }

    if (!formConfigured) {
      if (!canUseMailto) {
        setState("error");
        return;
      }

      const body = encodeURIComponent(
        Array.from(data.entries())
          .filter(([key]) => key !== "company" && key !== "consent")
          .map(([key, value]) => `${key}: ${value}`)
          .join("\n")
      );
      setMailto(`mailto:${contactEmail}?subject=${encodeURIComponent("Ραπ Στα Μπαμ συμμετοχή")}&body=${body}`);
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
      <div><h3 className="card-title">Τα στοιχεία σου</h3><p className="form-note mt-1">Τα πεδία με * είναι υποχρεωτικά.</p></div>
      <div className="hidden" aria-hidden="true">
        <label htmlFor="company">Company</label>
        <input id="company" name="company" tabIndex={-1} autoComplete="off" />
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Field id="artistName" label="Καλλιτεχνικό όνομα" error={errors.artistName} />
        <Field id="realName" label="Πραγματικό όνομα" autoComplete="name" error={errors.realName} />
        <Field id="email" label="Email" type="email" autoComplete="email" error={errors.email} />
        <Field id="social" label="Instagram ή TikTok" error={errors.social} />
        <Field id="musicLink" label="Spotify ή YouTube link" required={false} />
        <Field id="city" label="Πόλη" autoComplete="address-level2" error={errors.city} />
      </div>

      <SelectField id="role" label="Ρόλος" required error={errors.role}>
        <option value="">Επίλεξε ρόλο</option>
        {roleOptions.map((role) => <option key={role} value={role}>{role}</option>)}
      </SelectField>

      <Textarea id="intro" label="Σύντομη παρουσίαση" error={errors.intro} />
      <Textarea id="motivation" label="Γιατί θέλεις να συμμετάσχεις" error={errors.motivation} />

      <label className="flex gap-3 text-sm leading-6 text-[var(--muted)]">
        <input required name="consent" type="checkbox" className="mt-1 h-5 w-5 accent-[var(--accent)]" aria-invalid={Boolean(errors.consent)} aria-describedby={errors.consent ? "consent-error" : undefined} />
        <span>Συμφωνώ να χρησιμοποιηθούν τα στοιχεία μου αποκλειστικά για επικοινωνία σχετικά με πιθανή συμμετοχή στο Ραπ Στα Μπαμ.</span>
      </label>
      <FormError id="consent-error" message={errors.consent} />

      <button type="submit" disabled={state === "submitting"} className="rsb-button">
        {state === "submitting" ? <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" /> : <Send className="h-4 w-4" aria-hidden="true" />}
        {state === "submitting" ? "Αποστολή..." : "Αποστολή συμμετοχής"}
      </button>

      {state === "success" ? (
        <div role="status" className="alert alert-success">
          {formConfigured ? "Η φόρμα στάλθηκε. Θα επικοινωνήσουμε αν υπάρχει κατάλληλο session." : <a href={mailto} className="text-[var(--accent)] underline">Άνοιγμα email για αποστολή αίτησης</a>}
        </div>
      ) : null}
      {state === "error" ? <div role="alert" className="alert alert-error">Η αποστολή απέτυχε. Δοκίμασε ξανά ή επικοινώνησε μέσω email/social.</div> : null}
    </form>
  );
}

