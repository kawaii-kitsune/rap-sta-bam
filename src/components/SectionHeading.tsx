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
    <div className="section-heading mb-8">
      {eyebrow ? <p className="rsb-kicker">{eyebrow}</p> : null}
      <h2 className="section-heading-title display-font mt-2 text-4xl leading-none sm:text-5xl">{title}</h2>
      {copy ? <p className="mt-3 max-w-2xl text-base leading-7 text-[var(--muted)]">{copy}</p> : null}
    </div>
  );
}
