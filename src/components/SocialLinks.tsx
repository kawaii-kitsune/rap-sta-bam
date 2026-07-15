import { ExternalLink, Music2 } from "lucide-react";
import { isValidHttpUrl } from "@/lib/content";
import type { SocialLink, SocialPlatform } from "@/types/content";

type IconProps = { className?: string };

const icons: Record<SocialPlatform, React.ComponentType<IconProps>> = {
  youtube: YouTubeIcon,
  tiktok: TikTokIcon,
  instagram: InstagramIcon,
  spotify: SpotifyIcon,
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
            <Icon className="h-5 w-5" aria-hidden="true" />
            {!iconOnly ? <span className="ml-2">{link.label}</span> : null}
          </a>
        );
      })}
    </div>
  );
}

function YouTubeIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M21.6 7.2a3 3 0 0 0-2.1-2.1C17.6 4.6 12 4.6 12 4.6s-5.6 0-7.5.5a3 3 0 0 0-2.1 2.1A31.6 31.6 0 0 0 2 12a31.6 31.6 0 0 0 .4 4.8 3 3 0 0 0 2.1 2.1c1.9.5 7.5.5 7.5.5s5.6 0 7.5-.5a3 3 0 0 0 2.1-2.1A31.6 31.6 0 0 0 22 12a31.6 31.6 0 0 0-.4-4.8ZM10 15.4V8.6l5.8 3.4L10 15.4Z" />
    </svg>
  );
}

function InstagramIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={className} aria-hidden="true">
      <rect x="4" y="4" width="16" height="16" rx="5" />
      <circle cx="12" cy="12" r="3.5" />
      <circle cx="17" cy="7" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}

function SpotifyIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20Zm4.6 14.4a.8.8 0 0 1-1.1.3c-3-1.8-6.7-2.2-10.9-1.2a.8.8 0 0 1-.4-1.6c4.7-1.1 8.8-.6 12.1 1.4.4.2.5.7.3 1.1Zm1.2-2.8a1 1 0 0 1-1.3.3c-3.4-2.1-8.5-2.7-12.5-1.5a1 1 0 0 1-.6-1.9c4.6-1.4 10.3-.7 14.1 1.7.5.3.6.9.3 1.4Zm.1-3c-4-2.4-10.7-2.6-14.5-1.4a1.1 1.1 0 1 1-.7-2.1c4.4-1.3 11.7-1.1 16.3 1.7a1.1 1.1 0 1 1-1.1 1.8Z" />
    </svg>
  );
}

function TikTokIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M15.4 3c.3 2.5 1.7 4 4.2 4.2v3.1a7.4 7.4 0 0 1-4.2-1.3v5.7c0 3.7-2.5 6.3-6.1 6.3A5.7 5.7 0 0 1 3.5 15.3c0-3.4 2.7-5.9 6.4-5.8v3.2c-1.8-.2-3.1.8-3.1 2.5 0 1.5 1.1 2.6 2.6 2.6 1.6 0 2.7-1 2.7-3.1V3h3.3Z" />
    </svg>
  );
}
