import type { Episode } from "@/types/content";

export function SessionFacts({ facts }: { facts?: Episode["sessionFacts"] }) {
  if (!facts?.length) {
    return null;
  }

  return (
    <div className="grid gap-3 sm:grid-cols-2">
      {facts.map((fact) => (
        <div key={`${fact.label}-${fact.value}`} className="border border-[var(--line)] bg-[var(--panel)] p-4">
          <p className="text-xs font-black uppercase tracking-[0.16em] text-[var(--accent)]">{fact.label}</p>
          <p className="display-font mt-2 text-3xl leading-none text-[var(--foreground)]">{fact.value}</p>
          {fact.note ? <p className="mt-3 text-sm leading-6 text-[var(--muted)]">{fact.note}</p> : null}
        </div>
      ))}
    </div>
  );
}
