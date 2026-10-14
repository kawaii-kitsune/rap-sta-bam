import Image from "next/image";
import { ArrowUpRight, Disc3 } from "lucide-react";

type ReleaseRowProps = {
  title: string;
  image?: string;
  subtitle: string;
  description?: string;
  platform: string;
  url: string;
  action: string;
  locale?: string;
};

export function ReleaseRow({ title, image, subtitle, description, platform, url, action, locale = "el" }: ReleaseRowProps) {
  return (
    <article className="catalog-row">
      <div className="catalog-cover">
        {image ? <Image src={image} alt={locale === "en" ? `Cover: ${title}` : `Εξώφυλλο: ${title}`} fill sizes="72px" className="object-cover" /> : <Disc3 className="absolute inset-0 m-auto h-8 w-8 text-[var(--dim)]" aria-hidden="true" />}
      </div>
      <div className="min-w-0">
        <p className="mb-1 text-xs text-[var(--dim)]">{platform}</p>
        <h3 className="card-title">{title}</h3>
        <p className="mt-1 text-xs leading-6 text-[var(--muted)]">{subtitle}</p>
        {description ? <p lang={locale} className="mt-2 text-sm leading-6 text-[var(--muted)]">{description}</p> : null}
      </div>
      <a href={url} target="_blank" rel="noreferrer" className="rsb-button-secondary" aria-label={`${action}: ${title} · ${platform}`}>{action}<ArrowUpRight className="h-4 w-4" aria-hidden="true" /></a>
    </article>
  );
}
