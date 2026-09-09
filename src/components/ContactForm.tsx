"use client";

import { FormEvent, useMemo, useState } from "react";
import { Loader2, Send } from "lucide-react";
import { Field, Textarea, SelectField, focusFirstFormError } from "@/components/FormField";
import { siteConfig } from "@/config/site";

type FormState = "idle" | "submitting" | "success" | "error";

const requiredFields = ["name", "email", "message"] as const;

type RequiredField = (typeof requiredFields)[number];

const labels: Record<RequiredField, string> = {
  name: "όνομα",
  email: "email",
  message: "μήνυμα"
};

export function ContactForm() {
  const endpoint = process.env.NEXT_PUBLIC_FORMSPREE_ENDPOINT;
  const [state, setState] = useState<FormState>("idle");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [mailto, setMailto] = useState("");

  const formConfigured = Boolean(endpoint);
  const googleForm = siteConfig.googleContactForm;
  const googleFormConfigured = Boolean(googleForm.actionUrl);
  const contactEmail = siteConfig.contactEmail.trim();
  const canUseMailto = Boolean(contactEmail);

  const quickOptions = useMemo(() => ["Συνεργασία", "Συνέντευξη", "Γενική ερώτηση", "Άλλο"], []);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    const nextErrors: Record<string, string> = {};

    if (data.get("website")) {
      return;
    }

    requiredFields.forEach((field) => {
      if (!String(data.get(field) ?? "").trim()) {
        nextErrors[field] = `Συμπλήρωσε το πεδίο: ${labels[field]}.`;
      }
    });

    const email = String(data.get("email") ?? "");
    if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      nextErrors.email = "Γράψε ένα έγκυρο email.";
    }

    setErrors(nextErrors);
    if (Object.keys(nextErrors).length) {
      focusFirstFormError(form, nextErrors);
      return;
    }

    if (!formConfigured && googleFormConfigured) {
      setState("submitting");

      try {
        const payload = new URLSearchParams();
        payload.set(googleForm.fields.email, String(data.get("email") ?? ""));
        payload.set(googleForm.fields.name, String(data.get("name") ?? ""));
        payload.set(googleForm.fields.topic, String(data.get("topic") || "Γενική ερώτηση"));
        payload.set(googleForm.fields.message, String(data.get("message") ?? ""));
        payload.set("fvv", "1");
        payload.set("pageHistory", "0");

        await fetch(googleForm.actionUrl, {
          method: "POST",
          mode: "no-cors",
          body: payload
        });

        form.reset();
        setState("success");
      } catch {
        setState("error");
      }

      return;
    }

    if (!formConfigured) {
      if (!canUseMailto) {
        setState("error");
        return;
      }

      const subject = encodeURIComponent(String(data.get("topic") || "Επικοινωνία από το Ραπ Στα Μπαμ"));
      const body = encodeURIComponent(
        [
          `Όνομα: ${String(data.get("name") ?? "")}`,
          `Email: ${String(data.get("email") ?? "")}`,
          `Θέμα: ${String(data.get("topic") ?? "")}`,
          "",
          String(data.get("message") ?? "")
        ].join("\n")
      );

      setMailto(`mailto:${contactEmail}?subject=${subject}&body=${body}`);
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
      <div><h3 className="card-title">Στείλε μας ένα μήνυμα</h3><p className="form-note mt-1">Τα πεδία με * είναι υποχρεωτικά.</p></div>
      <div className="hidden" aria-hidden="true">
        <label htmlFor="website">Website</label>
        <input id="website" name="website" tabIndex={-1} autoComplete="off" />
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Field id="name" label="Ονοματεπώνυμο" autoComplete="name" error={errors.name} />
        <Field id="email" label="Email" type="email" autoComplete="email" error={errors.email} />
      </div>

      <SelectField id="topic" label="Θέμα">
        <option value="">Διάλεξε θέμα</option>
        {quickOptions.map((option) => <option key={option} value={option}>{option}</option>)}
      </SelectField>

      <Textarea id="message" label="Μήνυμα" error={errors.message} />

      <button type="submit" disabled={state === "submitting"} className="rsb-button">
        {state === "submitting" ? <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" /> : <Send className="h-4 w-4" aria-hidden="true" />}
        {state === "submitting" ? "Αποστολή..." : "Αποστολή μηνύματος"}
      </button>

      <p className="text-xs leading-5 text-[var(--dim)]">
        Χρησιμοποιούμε τα στοιχεία σου μόνο για να απαντήσουμε στο μήνυμά σου. <a href="/privacy" className="underline underline-offset-4 hover:text-[var(--foreground)]">Πολιτική απορρήτου</a>
      </p>

      {state === "success" ? (
        <div role="status" className="alert alert-success">
          {formConfigured || googleFormConfigured ? "Το μήνυμα στάλθηκε. Θα απαντήσουμε όταν το δούμε." : <a href={mailto} className="text-[var(--accent)] underline">Άνοιγμα email για αποστολή μηνύματος</a>}
        </div>
      ) : null}
      {state === "error" ? <div role="alert" className="alert alert-error">Η αποστολή απέτυχε. Δοκίμασε ξανά ή επικοινώνησε μέσω email/social.</div> : null}
    </form>
  );
}

