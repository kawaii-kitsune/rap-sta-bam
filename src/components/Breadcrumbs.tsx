import Link from "next/link";
import { ChevronRight } from "lucide-react";

export function Breadcrumbs({ items, locale = "el" }: { items: { href?: string; label: string }[]; locale?: string }) {
  return (
    <nav aria-label={locale === "en" ? "Breadcrumbs" : "Διαδρομή πλοήγησης"} className="breadcrumbs">
      <ol>
        <li><Link href={`/${locale}`}>{locale === "en" ? "Home" : "Αρχική"}</Link></li>
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
