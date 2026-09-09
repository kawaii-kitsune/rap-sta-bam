import type { ComponentProps, ReactNode } from "react";

type FieldProps = { id: string; label: string; error?: string; required?: boolean };

function FieldLabel({ id, label, required }: FieldProps) {
  return <label htmlFor={id} className="field-label">{label}{required ? <span aria-hidden="true" className="ml-1 text-[var(--accent)]">*</span> : <span className="field-optional"> (προαιρετικό)</span>}</label>;
}

export function FormError({ id, message }: { id: string; message?: string }) {
  return message ? <p id={id} role="alert" className="field-error">{message}</p> : null;
}

export function Field({ id, label, error, required = true, ...props }: FieldProps & Omit<ComponentProps<"input">, "id">) {
  return (
    <div>
      <FieldLabel id={id} label={label} required={required} />
      <input {...props} id={id} name={props.name ?? id} required={required} aria-invalid={Boolean(error)} aria-describedby={error ? `${id}-error` : undefined} className="form-control" />
      <FormError id={`${id}-error`} message={error} />
    </div>
  );
}

export function Textarea({ id, label, error, required = true, ...props }: FieldProps & Omit<ComponentProps<"textarea">, "id">) {
  return (
    <div>
      <FieldLabel id={id} label={label} required={required} />
      <textarea rows={5} {...props} id={id} name={props.name ?? id} required={required} aria-invalid={Boolean(error)} aria-describedby={error ? `${id}-error` : undefined} className="form-control" />
      <FormError id={`${id}-error`} message={error} />
    </div>
  );
}

export function SelectField({ id, label, error, required = false, children, ...props }: FieldProps & Omit<ComponentProps<"select">, "id"> & { children: ReactNode }) {
  return (
    <div>
      <FieldLabel id={id} label={label} required={required} />
      <select {...props} id={id} name={props.name ?? id} required={required} aria-invalid={Boolean(error)} aria-describedby={error ? `${id}-error` : undefined} className="form-control">{children}</select>
      <FormError id={`${id}-error`} message={error} />
    </div>
  );
}

export function focusFirstFormError(form: HTMLFormElement, errors: Record<string, string>) {
  const field = form.elements.namedItem(Object.keys(errors)[0]);
  if (field instanceof HTMLElement) field.focus();
}
