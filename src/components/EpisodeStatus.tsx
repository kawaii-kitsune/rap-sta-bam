import { getDictionary } from "@/config/i18n";

export function EpisodeStatus({ live, locale = "el" }: { live: boolean; locale?: string }) {
  const dict = getDictionary(locale);
  return (
    <span className={`episode-status ${live ? "" : "is-upcoming"}`}>
      {live ? dict.common.available : dict.common.upcoming}
    </span>
  );
}
