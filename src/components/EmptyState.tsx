export function EmptyState({ title, copy }: { title: string; copy: string }) {
  return (
    <div className="border border-dashed border-[var(--line)] bg-[var(--panel)] p-8 text-center">
      <p className="display-font text-3xl">{title}</p>
      <p className="mt-2 text-sm text-[var(--muted)]">{copy}</p>
    </div>
  );
}
