"use client";

import Image from "next/image";
import { Play } from "lucide-react";
import { useState } from "react";

export function VideoEmbed({ videoId, title }: { videoId?: string; title: string }) {
  const [loaded, setLoaded] = useState(false);

  if (!videoId) {
    return (
      <div className="flex aspect-video items-center justify-center border border-[var(--line)] bg-[var(--panel)] p-6 text-center text-sm font-bold text-[var(--muted)]">
        Το YouTube embed θα εμφανιστεί όταν προστεθεί έγκυρο video ID.
      </div>
    );
  }

  if (!loaded) {
    return (
      <button
        type="button"
        onClick={() => setLoaded(true)}
        className="group relative aspect-video w-full overflow-hidden border border-[var(--line)] bg-black text-left"
        aria-label={`Φόρτωση βίντεο: ${title}`}
      >
        <Image
          src={`https://img.youtube.com/vi/${videoId}/hqdefault.jpg`}
          alt={`Thumbnail βίντεο για ${title}`}
          fill
          sizes="(min-width: 1024px) 60vw, 100vw"
          className="object-cover opacity-80 grayscale transition duration-300 group-hover:scale-105 group-hover:grayscale-0"
        />
        <span className="absolute inset-0 bg-black/30" aria-hidden="true" />
        <span className="absolute left-1/2 top-1/2 inline-flex h-16 w-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center border border-[var(--accent)] bg-[var(--accent)] text-black transition group-hover:bg-[var(--foreground)]">
          <Play className="h-7 w-7" aria-hidden="true" />
        </span>
        <span className="absolute bottom-4 left-4 right-4 text-sm font-black uppercase tracking-[0.16em] text-[var(--foreground)] drop-shadow-[3px_3px_0_#000]">
          Φόρτωση YouTube player
        </span>
      </button>
    );
  }

  return (
    <iframe
      className="aspect-video w-full border border-[var(--line)] bg-black"
      src={`https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&rel=0`}
      title={title}
      loading="lazy"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
      allowFullScreen
    />
  );
}
