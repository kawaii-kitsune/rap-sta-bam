import Link from "next/link";
import { ExternalLink } from "lucide-react";
import { isValidHttpUrl } from "@/lib/content";
import type { Episode } from "@/types/content";

export function CreditsList({ credits }: { credits: Episode["credits"] }) {
  if (credits.length === 0) {
    return null;
  }

  return (
    <dl className="border-y border-[var(--line)]">
      {credits.map((credit) => {
        const externalUrl = isValidHttpUrl(credit.url) ? credit.url : undefined;
        const name = credit.artistSlug ? (
          <Link href={`/artists/${credit.artistSlug}`} className="hover:text-[var(--accent)]">
            {credit.name}
          </Link>
        ) : externalUrl ? (
          <a href={externalUrl} target="_blank" rel="noreferrer" className="hover:text-[var(--accent)]">
            {credit.name}
          </a>
        ) : (
          credit.name
        );

        return (
          <div key={`${credit.role}-${credit.name}`} className="border-b border-[var(--line)] py-4 last:border-b-0">
            <dt className="text-xs font-bold uppercase tracking-[0.16em] text-[var(--accent)]">{credit.role}</dt>
            <dd className="mt-1 text-lg font-bold">{name}</dd>
            {credit.note ? <p className="mt-2 text-sm leading-6 text-[var(--muted)]">{credit.note}</p> : null}
            {externalUrl ? (
              <a
                href={externalUrl}
                target="_blank"
                rel="noreferrer"
                className="mt-3 inline-flex items-center gap-2 text-xs font-black uppercase tracking-[0.14em] text-[var(--accent)] hover:text-[var(--foreground)]"
              >
                Άνοιγμα link <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
              </a>
            ) : null}
          </div>
        );
      })}
    </dl>
  );
}
