import type { Episode } from "@/types/content";

export function SessionFacts({ facts }: { facts?: Episode["sessionFacts"] }) {
  if (!facts?.length) {
    return null;
  }

  return (
    <dl className="border-y border-[var(--line)]">
      {facts.map((fact) => (
        <div key={`${fact.label}-${fact.value}`} className="grid gap-2 border-b border-[var(--line)] py-4 last:border-b-0 sm:grid-cols-[180px_1fr] sm:gap-6">
          <dt className="text-xs font-black uppercase tracking-[0.16em] text-[var(--accent)]">{fact.label}</dt>
          <dd>
            <p className="display-font text-3xl leading-none text-[var(--foreground)]">{fact.value}</p>
            {fact.note ? <p className="mt-2 max-w-2xl text-sm leading-6 text-[var(--muted)]">{fact.note}</p> : null}
          </dd>
        </div>
      ))}
    </dl>
  );
}
