"use client";

import { FormEvent, useMemo, useState } from "react";
import { Send } from "lucide-react";
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
    <form onSubmit={onSubmit} noValidate className="grid gap-5 border border-[var(--line)] bg-[var(--panel)] p-5 sm:p-6">
      <div className="hidden" aria-hidden="true">
        <label htmlFor="website">Website</label>
        <input id="website" name="website" tabIndex={-1} autoComplete="off" />
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Field id="name" label="Ονοματεπώνυμο" error={errors.name} />
        <Field id="email" label="Email" type="email" error={errors.email} />
      </div>

      <div>
        <label htmlFor="topic" className="mb-2 block text-sm font-bold">Θέμα</label>
        <select id="topic" name="topic" className="min-h-12 w-full border border-[var(--line)] bg-[#0d0b0a] px-3 text-[var(--foreground)]">
          <option value="">Διάλεξε θέμα</option>
          {quickOptions.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </div>

      <Textarea id="message" label="Μήνυμα" error={errors.message} />

      <button type="submit" disabled={state === "submitting"} className="inline-flex min-h-12 items-center justify-center gap-2 bg-[var(--accent)] px-5 py-3 font-black text-black disabled:opacity-60">
        <Send className="h-4 w-4" aria-hidden="true" />
        {state === "submitting" ? "Αποστολή..." : "Αποστολή μηνύματος"}
      </button>

      {state === "success" ? (
        <div role="status" className="border border-[var(--accent)] bg-black p-4 text-sm font-bold text-[var(--foreground)]">
          {formConfigured || googleFormConfigured ? "Το μήνυμα στάλθηκε. Θα απαντήσουμε όταν το δούμε." : <a href={mailto} className="text-[var(--accent)] underline">Άνοιγμα email για αποστολή μηνύματος</a>}
        </div>
      ) : null}
      {state === "error" ? <div role="alert" className="border border-red-500 bg-black p-4 text-sm font-bold text-red-200">Η αποστολή απέτυχε. Δοκίμασε ξανά ή επικοινώνησε μέσω email/social.</div> : null}
    </form>
  );
}

function Field({ id, label, type = "text", error }: { id: string; label: string; type?: string; error?: string }) {
  return (
    <div>
      <label htmlFor={id} className="mb-2 block text-sm font-bold">{label}</label>
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
