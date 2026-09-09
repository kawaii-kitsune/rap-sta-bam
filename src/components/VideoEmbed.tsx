"use client";

import Image from "next/image";
import { ExternalLink, Loader2, Play } from "lucide-react";
import { useState } from "react";

export function VideoEmbed({ videoId, title, poster, priority = false }: { videoId?: string; title: string; poster?: string; priority?: boolean }) {
  const [loaded, setLoaded] = useState(false);
  const [ready, setReady] = useState(false);

  if (!videoId) {
    return <div className="rsb-surface flex aspect-video items-center justify-center p-6 text-center text-sm text-[var(--muted)]">Το βίντεο θα είναι διαθέσιμο σύντομα.</div>;
  }

  if (!loaded) {
    return (
      <button type="button" onClick={() => setLoaded(true)} className="video-cover" aria-label={`Φόρτωση βίντεο: ${title}`}>
        <Image src={poster ?? `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`} alt="" fill priority={priority} sizes="(min-width: 1280px) 720px, (min-width: 768px) 60vw, 100vw" />
        <span className="video-shade" aria-hidden="true" />
        <span className="video-play"><Play className="h-6 w-6" aria-hidden="true" /></span>
        <span className="video-caption"><span>Δες το session</span><span>YouTube</span></span>
      </button>
    );
  }

  return (
    <div>
      <div className="relative" aria-busy={!ready}>
        {!ready ? <div role="status" className="pointer-events-none absolute inset-0 flex items-center justify-center gap-2 text-sm text-[var(--muted)]"><Loader2 className="h-5 w-5 animate-spin" aria-hidden="true" />Φόρτωση βίντεο…</div> : null}
        <iframe className="video-frame" src={`https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&rel=0`} title={title} onLoad={() => setReady(true)} allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen />
      </div>
      <a href={`https://www.youtube.com/watch?v=${videoId}`} target="_blank" rel="noreferrer" className="text-link mt-1 text-xs text-[var(--muted)]">Άνοιγμα στο YouTube <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" /></a>
    </div>
  );
}
