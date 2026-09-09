export function EpisodeStatus({ live }: { live: boolean }) {
  return <span className={`episode-status ${live ? "" : "is-upcoming"}`}>{live ? "Διαθέσιμο" : "Σύντομα"}</span>;
}
