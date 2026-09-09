import Link from "next/link";
import { ChevronRight } from "lucide-react";

export function Breadcrumbs({ items }: { items: { href?: string; label: string }[] }) {
  return (
    <nav aria-label="Διαδρομή πλοήγησης" className="breadcrumbs">
      <ol>
        <li><Link href="/">Αρχική</Link></li>
        {items.map((item) => (
          <li key={item.label}>
            <ChevronRight className="h-3 w-3 shrink-0" aria-hidden="true" />
            {item.href ? <Link href={item.href}>{item.label}</Link> : <span aria-current="page">{item.label}</span>}
          </li>
        ))}
      </ol>
    </nav>
  );
}
