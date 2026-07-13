"use client";

import { FormEvent, useMemo, useState } from "react";
import { Send } from "lucide-react";
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
    <form onSubmit={onSubmit} noValidate className="grid gap-5 border border-[var(--line)] bg-[var(--panel)] p-5 sm:p-6">
      <div className="hidden" aria-hidden="true">
        <label htmlFor="company">Company</label>
        <input id="company" name="company" tabIndex={-1} autoComplete="off" />
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Field id="artistName" label="Καλλιτεχνικό όνομα" error={errors.artistName} />
        <Field id="realName" label="Πραγματικό όνομα" error={errors.realName} />
        <Field id="email" label="Email" type="email" error={errors.email} />
        <Field id="social" label="Instagram ή TikTok" error={errors.social} />
        <Field id="musicLink" label="Spotify ή YouTube link" required={false} />
        <Field id="city" label="Πόλη" error={errors.city} />
      </div>

      <div>
        <label htmlFor="role" className="mb-2 block text-sm font-bold">Ρόλος</label>
        <select id="role" name="role" aria-invalid={Boolean(errors.role)} aria-describedby={errors.role ? "role-error" : undefined} className="min-h-12 w-full border border-[var(--line)] bg-[#0d0b0a] px-3 text-[var(--foreground)]">
          <option value="">Επίλεξε ρόλο</option>
          {roleOptions.map((role) => <option key={role} value={role}>{role}</option>)}
        </select>
        <FormError id="role-error" message={errors.role} />
      </div>

      <Textarea id="intro" label="Σύντομη παρουσίαση" error={errors.intro} />
      <Textarea id="motivation" label="Γιατί θέλεις να συμμετάσχεις" error={errors.motivation} />

      <label className="flex gap-3 text-sm leading-6 text-[var(--muted)]">
        <input name="consent" type="checkbox" className="mt-1 h-5 w-5 accent-[var(--accent)]" aria-invalid={Boolean(errors.consent)} aria-describedby={errors.consent ? "consent-error" : undefined} />
        <span>Συμφωνώ να χρησιμοποιηθούν τα στοιχεία μου αποκλειστικά για επικοινωνία σχετικά με πιθανή συμμετοχή στο Ραπ Στα Μπαμ.</span>
      </label>
      <FormError id="consent-error" message={errors.consent} />

      <button type="submit" disabled={state === "submitting"} className="inline-flex min-h-12 items-center justify-center gap-2 bg-[var(--accent)] px-5 py-3 font-black text-black disabled:opacity-60">
        <Send className="h-4 w-4" aria-hidden="true" />
        {state === "submitting" ? "Αποστολή..." : "Αποστολή συμμετοχής"}
      </button>

      {state === "success" ? (
        <div role="status" className="border border-[var(--accent)] bg-black p-4 text-sm font-bold text-[var(--foreground)]">
          {formConfigured ? "Η φόρμα στάλθηκε. Θα επικοινωνήσουμε αν υπάρχει κατάλληλη session." : <a href={mailto} className="text-[var(--accent)] underline">Άνοιγμα email για αποστολή αίτησης</a>}
        </div>
      ) : null}
      {state === "error" ? <div role="alert" className="border border-red-500 bg-black p-4 text-sm font-bold text-red-200">Η αποστολή απέτυχε. Δοκίμασε ξανά ή επικοινώνησε μέσω email/social.</div> : null}
    </form>
  );
}

function Field({ id, label, type = "text", error, required = true }: { id: string; label: string; type?: string; error?: string; required?: boolean }) {
  return (
    <div>
      <label htmlFor={id} className="mb-2 block text-sm font-bold">{label}{required ? "" : " (προαιρετικό)"}</label>
      <input id={id} name={id} type={type} aria-invalid={Boolean(error)} aria-describedby={error ? `${id}-error` : undefined} className="min-h-12 w-full border border-[var(--line)] bg-[#0d0b0a] px-3 text-[var(--foreground)]" />
      <FormError id={`${id}-error`} message={error} />
    </div>
  );
}

function Textarea({ id, label, error }: { id: string; label: string; error?: string }) {
  return (
    <div>
      <label htmlFor={id} className="mb-2 block text-sm font-bold">{label}</label>
      <textarea id={id} name={id} rows={5} aria-invalid={Boolean(error)} aria-describedby={error ? `${id}-error` : undefined} className="w-full resize-y border border-[var(--line)] bg-[#0d0b0a] px-3 py-3 text-[var(--foreground)]" />
      <FormError id={`${id}-error`} message={error} />
    </div>
  );
}

function FormError({ id, message }: { id: string; message?: string }) {
  if (!message) {
    return null;
  }

  return <p id={id} role="alert" className="mt-2 text-sm font-bold text-red-300">{message}</p>;
}
