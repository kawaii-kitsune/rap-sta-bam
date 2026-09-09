export function SectionHeading({ eyebrow, title, copy, as: Heading = "h2" }: {
  eyebrow?: string;
  title: string;
  copy?: string;
  as?: "h1" | "h2";
}) {
  return (
    <div className="section-heading">
      {eyebrow ? <p className="rsb-kicker">{eyebrow}</p> : null}
      <Heading className="section-heading-title">{title}</Heading>
      {copy ? <p className="section-heading-copy">{copy}</p> : null}
    </div>
  );
}
