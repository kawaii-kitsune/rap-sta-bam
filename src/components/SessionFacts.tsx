import type { Episode } from "@/types/content";

export function SessionFacts({ facts }: { facts?: Episode["sessionFacts"] }) {
  if (!facts?.length) return null;
  return (
    <dl className="facts-list border-t border-[var(--line)]">
      {facts.map((fact) => (
        <div key={`${fact.label}-${fact.value}`}>
          <dt>{fact.label}</dt>
          <dd><p>{fact.value}</p>{fact.note ? <p className="mt-1 text-sm leading-6 text-[var(--muted)]">{fact.note}</p> : null}</dd>
        </div>
      ))}
    </dl>
  );
}
