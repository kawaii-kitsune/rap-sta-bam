export function SectionHeading({
  eyebrow,
  title,
  copy
}: {
  eyebrow?: string;
  title: string;
  copy?: string;
}) {
  return (
    <div className="mb-8 border-t border-[var(--line)] pt-4">
      {eyebrow ? <p className="text-xs font-bold uppercase tracking-[0.18em] text-[var(--accent)]">{eyebrow}</p> : null}
      <h2 className="display-font mt-2 text-4xl leading-none sm:text-5xl">{title}</h2>
      {copy ? <p className="mt-3 max-w-2xl text-base leading-7 text-[var(--muted)]">{copy}</p> : null}
    </div>
  );
}
