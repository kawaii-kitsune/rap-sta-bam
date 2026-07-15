export function GearList({ gear }: { gear?: string[] }) {
  if (!gear?.length) {
    return null;
  }

  return (
    <ul className="grid border-y border-[var(--line)]">
      {gear.map((item) => (
        <li key={item} className="border-b border-[var(--line)] px-4 py-3 text-sm font-bold text-[var(--muted)] last:border-b-0 sm:px-5">
          {item}
        </li>
      ))}
    </ul>
  );
}
