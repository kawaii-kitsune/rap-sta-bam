import { Camera, ExternalLink, Music2, Play, Radio, Video } from "lucide-react";
import { isValidHttpUrl } from "@/lib/content";
import type { SocialLink, SocialPlatform } from "@/types/content";

const icons: Record<SocialPlatform, React.ComponentType<{ className?: string }>> = {
  youtube: Play,
  tiktok: Video,
  instagram: Camera,
  spotify: Radio,
  website: ExternalLink
};

export function SocialLinks({
  links,
  className = "",
  iconOnly = false
}: {
  links: SocialLink[];
  className?: string;
  iconOnly?: boolean;
}) {
  const validLinks = links.filter((link) => isValidHttpUrl(link.url));

  if (validLinks.length === 0) {
    return null;
  }

  return (
    <div className={`flex flex-wrap items-center gap-2 ${className}`}>
      {validLinks.map((link) => {
        const Icon = icons[link.platform] ?? Music2;

        return (
          <a
            key={`${link.platform}-${link.url}`}
            href={link.url}
            target="_blank"
            rel="noreferrer"
            aria-label={link.label}
            className="inline-flex min-h-11 min-w-11 items-center justify-center border border-[var(--line)] bg-[var(--panel)] px-3 py-2 text-sm font-bold text-[var(--foreground)] transition hover:border-[var(--accent)] hover:text-[var(--accent)]"
          >
            <Icon className="h-4 w-4" aria-hidden="true" />
            {!iconOnly ? <span className="ml-2">{link.label}</span> : null}
          </a>
        );
      })}
    </div>
  );
}
