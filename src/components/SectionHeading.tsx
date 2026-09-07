export function SectionHeading({
  eyebrow,
  title,
  copy,
  as: Heading = "h2"
}: {
  eyebrow?: string;
  title: string;
  copy?: string;
  as?: "h1" | "h2";
}) {
  return (
    <div className="section-heading mb-8">
      {eyebrow ? <p className="rsb-kicker">{eyebrow}</p> : null}
      <Heading className="section-heading-title display-font mt-3 text-4xl leading-none sm:text-5xl">{title}</Heading>
      {copy ? <p className="mt-3 max-w-2xl text-base leading-7 text-[var(--muted)]">{copy}</p> : null}
    </div>
  );
}
