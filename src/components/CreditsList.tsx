import Link from "next/link";
import { ExternalLink } from "lucide-react";
import { isValidHttpUrl } from "@/lib/content";
import type { Episode } from "@/types/content";

export function CreditsList({ credits }: { credits: Episode["credits"] }) {
  if (credits.length === 0) {
    return null;
  }

  return (
    <dl className="credits-list">
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
          <div key={`${credit.role}-${credit.name}`}>
            <dt>{credit.role}</dt>
            <dd>
              {name}
              {credit.note ? <p className="mt-2 text-sm leading-6 text-[var(--muted)]">{credit.note}</p> : null}
              {externalUrl ? (
                <a
                  href={externalUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="text-link mt-1 text-xs text-[var(--dim)]"
                >
                  Άνοιγμα link <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
                </a>
              ) : null}
            </dd>
          </div>
        );
      })}
    </dl>
  );
}
