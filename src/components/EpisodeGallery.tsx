"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { ArrowUpRight, ChevronLeft, ChevronRight, X } from "lucide-react";
import { trapDialogFocus } from "@/lib/dialog";

export function EpisodeGallery({ images, title, locale = "el" }: { images?: string[]; title: string; locale?: string }) {
  const isEn = locale === "en";
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const dialog = useRef<HTMLDialogElement>(null);
  const isOpen = activeIndex !== null;

  useEffect(() => {
    if (!isOpen) return;
    const modal = dialog.current;
    modal?.showModal();
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      modal?.close();
      document.body.style.overflow = previousOverflow;
    };
  }, [isOpen]);

  if (!images?.length) return null;
  const navigate = (direction: number) => setActiveIndex((current) => current === null ? null : (current + direction + images.length) % images.length);

  return (
    <>
      <div className="gallery-sheet">
        {images.map((src, index) => (
          <button type="button" key={`${src}-${index}`} onClick={() => setActiveIndex(index)} className="gallery-shot" aria-label={isEn ? `Open photo ${index + 1}: ${title}` : `Άνοιγμα φωτογραφίας ${index + 1}: ${title}`}>
            <span className="gallery-shot-image">
              <Image src={src} alt={isEn ? `Inside the room — ${title}, photo ${index + 1}` : `Μέσα στο δωμάτιο — ${title}, φωτογραφία ${index + 1}`} fill sizes={index === 0 ? "(min-width: 1024px) 65vw, 100vw" : "(min-width: 1024px) 32vw, 50vw"} className="object-cover" />
            </span>
            <span className="gallery-shot-caption archive-label"><span>{isEn ? "FRAME" : "ΚΑΡΕ"} {String(index + 1).padStart(2, "0")}</span><ArrowUpRight className="h-4 w-4" aria-hidden="true" /></span>
          </button>
        ))}
      </div>
      <dialog ref={dialog} className="gallery-dialog" aria-label={isEn ? `Photos: ${title}` : `Φωτογραφίες: ${title}`} onClose={() => setActiveIndex(null)}
        onKeyDown={(event) => {
          trapDialogFocus(event);
          if (event.key === "ArrowLeft") { event.preventDefault(); navigate(-1); }
          if (event.key === "ArrowRight") { event.preventDefault(); navigate(1); }
        }}>
        <div className="flex items-center justify-between gap-4">
          <p className="archive-label min-w-0 truncate">{title} / {isEn ? "Photos" : "Φωτογραφίες"}</p>
          <button type="button" aria-label={isEn ? "Close photo" : "Κλείσιμο εικόνας"} onClick={() => dialog.current?.close()} className="icon-button"><X className="h-5 w-5" aria-hidden="true" /></button>
        </div>
        <div className="gallery-dialog-image">
          {activeIndex !== null ? <Image src={images[activeIndex]} alt={isEn ? `Enlarged photo ${activeIndex + 1} for ${title}` : `Μεγάλη προβολή εικόνας ${activeIndex + 1} για ${title}`} fill sizes="100vw" className="object-contain" /> : null}
        </div>
        <div className="flex items-center justify-center gap-6">
          {images.length > 1 ? <button type="button" aria-label={isEn ? "Previous photo" : "Προηγούμενη εικόνα"} onClick={() => navigate(-1)} className="icon-button"><ChevronLeft className="h-5 w-5" aria-hidden="true" /></button> : null}
          <p className="archive-label" role="status" aria-live="polite">{String((activeIndex ?? 0) + 1).padStart(2, "0")} / {String(images.length).padStart(2, "0")}</p>
          {images.length > 1 ? <button type="button" aria-label={isEn ? "Next photo" : "Επόμενη εικόνα"} onClick={() => navigate(1)} className="icon-button"><ChevronRight className="h-5 w-5" aria-hidden="true" /></button> : null}
        </div>
      </dialog>
    </>
  );
}
