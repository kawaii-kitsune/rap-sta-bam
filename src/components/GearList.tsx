import Link from "next/link";
import { SlidersHorizontal } from "lucide-react";

export function GearList({
  gear,
  locale = "el"
}: {
  gear?: string[];
  locale?: string;
}) {
  if (!gear?.length) {
    return null;
  }

  const isEn = locale === "en";

  return (
    <div className="flex flex-wrap gap-2 pt-1">
      {gear.map((item) => (
        <Link
          key={item}
          href={`/${locale}/episodes?search=${encodeURIComponent(item)}`}
          className="rsb-button-secondary !min-h-8 !px-3 !py-1 text-xs font-normal"
          title={isEn ? `Find sessions using ${item}` : `Βρες sessions με ${item}`}
        >
          <SlidersHorizontal className="h-3 w-3 text-[var(--accent)]" />
          <span>{item}</span>
        </Link>
      ))}
    </div>
  );
}
