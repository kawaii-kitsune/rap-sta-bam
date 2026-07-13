export function GearList({ gear }: { gear?: string[] }) {
  if (!gear?.length) {
    return null;
  }

  return (
    <ul className="flex flex-wrap gap-2">
      {gear.map((item) => (
        <li key={item} className="border border-[var(--line)] bg-[var(--panel)] px-3 py-2 text-sm font-bold text-[var(--muted)]">
          {item}
        </li>
      ))}
    </ul>
  );
}
