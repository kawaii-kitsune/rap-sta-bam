"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, X } from "lucide-react";

export function EpisodeGallery({ images, title }: { images?: string[]; title: string }) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  useEffect(() => {
    if (activeIndex === null) {
      return;
    }

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setActiveIndex(null);
      }

      if (event.key === "ArrowLeft") {
        setActiveIndex((current) => previousIndex(current, images?.length ?? 0));
      }

      if (event.key === "ArrowRight") {
        setActiveIndex((current) => nextIndex(current, images?.length ?? 0));
      }
    };

    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [activeIndex, images?.length]);

  if (!images?.length) {
    return null;
  }

  const [lead, ...rest] = images;
  const activeImage = activeIndex === null ? null : images[activeIndex];

  return (
    <div className="grid gap-4">
      <button
        type="button"
        onClick={() => setActiveIndex(0)}
        className="group relative aspect-[16/10] overflow-hidden border border-[var(--line)] bg-black text-left shadow-[10px_10px_0_#000] focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)]"
      >
        <Image
          src={lead}
          alt={"Κεντρική behind the scenes εικόνα για " + title}
          fill
          sizes="(min-width: 1024px) 60vw, 100vw"
          className="object-cover transition duration-300 group-hover:scale-105"
        />
        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/85 to-transparent p-4">
          <p className="text-xs font-black uppercase tracking-[0.16em] text-[var(--accent)]">Μέσα στο δωμάτιο</p>
          <p className="mt-1 text-xs font-bold text-white/75">Άνοιγμα φωτογραφίας</p>
        </div>
      </button>

      {rest.length ? (
        <div className="grid auto-rows-[minmax(180px,1fr)] gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {rest.map((image, index) => {
            const imageIndex = index + 1;
            const wide = index === 1 || index === rest.length - 1;

            return (
              <button
                key={image}
                type="button"
                onClick={() => setActiveIndex(imageIndex)}
                className={("group relative overflow-hidden border border-[var(--line)] bg-black text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)] " + (wide ? "sm:col-span-2" : "")).trim()}
              >
                <Image
                  src={image}
                  alt={"Μέσα στο δωμάτιο εικόνα " + (index + 2) + " για " + title}
                  fill
                  sizes={wide ? "(min-width: 1024px) 40vw, 100vw" : "(min-width: 1024px) 20vw, 50vw"}
                  className="object-cover transition duration-300 group-hover:scale-105"
                />
                <span className="absolute bottom-3 right-3 bg-black/75 px-2 py-1 text-[0.65rem] font-black uppercase tracking-[0.14em] text-white opacity-0 transition group-hover:opacity-100 group-focus-visible:opacity-100">
                  Άνοιγμα
                </span>
              </button>
            );
          })}
        </div>
      ) : null}

      {activeImage ? (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={"Μεγάλη προβολή εικόνας " + ((activeIndex ?? 0) + 1) + " για " + title}
          className="fixed inset-0 z-50 grid bg-black/92 p-4 sm:p-6"
        >
          <button type="button" aria-label="Κλείσιμο εικόνας" onClick={() => setActiveIndex(null)} className="absolute right-4 top-4 z-10 grid h-11 w-11 place-items-center border border-white/25 bg-black/70 text-white transition hover:border-[var(--accent)] hover:text-[var(--accent)]">
            <X className="h-5 w-5" aria-hidden="true" />
          </button>
          {images.length > 1 ? (
            <>
              <button type="button" aria-label="Προηγούμενη εικόνα" onClick={() => setActiveIndex((current) => previousIndex(current, images.length))} className="absolute left-4 top-1/2 z-10 grid h-11 w-11 -translate-y-1/2 place-items-center border border-white/25 bg-black/70 text-white transition hover:border-[var(--accent)] hover:text-[var(--accent)]">
                <ChevronLeft className="h-6 w-6" aria-hidden="true" />
              </button>
              <button type="button" aria-label="Επόμενη εικόνα" onClick={() => setActiveIndex((current) => nextIndex(current, images.length))} className="absolute right-4 top-1/2 z-10 grid h-11 w-11 -translate-y-1/2 place-items-center border border-white/25 bg-black/70 text-white transition hover:border-[var(--accent)] hover:text-[var(--accent)]">
                <ChevronRight className="h-6 w-6" aria-hidden="true" />
              </button>
            </>
          ) : null}
          <div className="relative mx-auto h-full w-full max-w-6xl">
            <Image
              src={activeImage}
              alt={"Μεγάλη προβολή εικόνας " + ((activeIndex ?? 0) + 1) + " για " + title}
              fill
              sizes="100vw"
              className="object-contain"
              priority
            />
          </div>
          <p className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/70 px-3 py-2 text-xs font-black uppercase tracking-[0.16em] text-white/80">
            {(activeIndex ?? 0) + 1} / {images.length}
          </p>
        </div>
      ) : null}
    </div>
  );
}

function previousIndex(current: number | null, total: number) {
  if (current === null || total === 0) {
    return current;
  }

  return current === 0 ? total - 1 : current - 1;
}

function nextIndex(current: number | null, total: number) {
  if (current === null || total === 0) {
    return current;
  }

  return current === total - 1 ? 0 : current + 1;
}
