"use client";

import { FormEvent, useMemo, useState } from "react";
import { usePathname } from "next/navigation";
import { Loader2, Send } from "lucide-react";
import { Field, Textarea, SelectField, focusFirstFormError } from "@/components/FormField";
import { getDictionary } from "@/config/i18n";
import { siteConfig } from "@/config/site";

type FormState = "idle" | "submitting" | "success" | "error";

const requiredFields = ["name", "email", "message"] as const;

export function ContactForm({ locale: propLocale }: { locale?: string }) {
  const pathname = usePathname();
  const locale = propLocale ?? (pathname?.startsWith("/en") ? "en" : "el");
  const dict = getDictionary(locale);

  const endpoint = process.env.NEXT_PUBLIC_FORMSPREE_ENDPOINT;
  const [state, setState] = useState<FormState>("idle");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [mailto, setMailto] = useState("");

  const formConfigured = Boolean(endpoint);
  const googleForm = siteConfig.googleContactForm;
  const googleFormConfigured = Boolean(googleForm.actionUrl);
  const contactEmail = siteConfig.contactEmail.trim();

  const quickOptions = useMemo(
    () =>
      locale === "en"
        ? ["Collaboration", "Interview", "General Inquiry", "Other"]
        : ["Συνεργασία", "Συνέντευξη", "Γενική ερώτηση", "Άλλο"],
    [locale]
  );

  const fieldLabels: Record<(typeof requiredFields)[number], string> = {
    name: dict.contact.name,
    email: dict.contact.email,
    message: dict.contact.message
  };

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
        nextErrors[field] =
          locale === "en"
            ? `Please fill in: ${fieldLabels[field]}.`
            : `Συμπλήρωσε το πεδίο: ${fieldLabels[field]}.`;
      }
    });

    const email = String(data.get("email") ?? "");
    if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      nextErrors.email = locale === "en" ? "Enter a valid email address." : "Γράψε ένα έγκυρο email.";
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
        payload.set(googleForm.fields.topic, String(data.get("topic") || (locale === "en" ? "General inquiry" : "Γενική ερώτηση")));
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
      const subject = encodeURIComponent(
        `${locale === "en" ? "Rap Sta Bam Contact" : "Ραπ Στα Μπαμ μήνυμα"}: ${String(data.get("topic") || (locale === "en" ? "General inquiry" : "Γενικό"))}`
      );
      const body = encodeURIComponent(
        [
          `${dict.contact.name}: ${String(data.get("name") ?? "")}`,
          `${dict.contact.email}: ${String(data.get("email") ?? "")}`,
          `${dict.contact.topic}: ${String(data.get("topic") ?? "")}`,
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
      <div>
        <h3 className="card-title">{dict.contact.heading}</h3>
        <p className="form-note mt-1">{dict.contact.note}</p>
      </div>
      <div className="hidden" aria-hidden="true">
        <label htmlFor="website">Website</label>
        <input id="website" name="website" tabIndex={-1} autoComplete="off" />
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Field id="name" label={dict.contact.name} autoComplete="name" error={errors.name} />
        <Field id="email" label={dict.contact.email} type="email" autoComplete="email" error={errors.email} />
      </div>

      <SelectField id="topic" label={dict.contact.topic}>
        <option value="">{dict.contact.topicSelect}</option>
        {quickOptions.map((option) => <option key={option} value={option}>{option}</option>)}
      </SelectField>

      <Textarea id="message" label={dict.contact.message} error={errors.message} />

      <button type="submit" disabled={state === "submitting"} className="rsb-button">
        {state === "submitting" ? <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" /> : <Send className="h-4 w-4" aria-hidden="true" />}
        {state === "submitting" ? dict.contact.sending : dict.contact.send}
      </button>

      <p className="text-xs leading-5 text-[var(--dim)]">
        {locale === "en"
          ? "We only use your information to reply to your message. "
          : "Χρησιμοποιούμε τα στοιχεία σου μόνο για να απαντήσουμε στο μήνυμά σου. "}
        <a href={`/${locale}/privacy`} className="underline underline-offset-4 hover:text-[var(--foreground)]">
          {locale === "en" ? "Privacy policy" : "Πολιτική απορρήτου"}
        </a>
      </p>

      {state === "success" ? (
        <div role="status" className="alert alert-success">
          {formConfigured || googleFormConfigured
            ? dict.contact.success
            : <a href={mailto} className="text-[var(--accent)] underline">{locale === "en" ? "Open email client to send message" : "Άνοιγμα email για αποστολή μηνύματος"}</a>}
        </div>
      ) : null}
      {state === "error" ? <div role="alert" className="alert alert-error">{dict.contact.error}</div> : null}
    </form>
  );
}
