"use client";

import { type ChangeEvent, type FormEvent, useEffect, useMemo, useRef, useState } from "react";
import { Loader2, Lock, Pause, Play, Music2 } from "lucide-react";
import { formatGreekDate, isReleased } from "@/lib/content";

type CaptionCue = {
  start: number;
  end: number;
  text: string;
};

type Props = {
  src: string;
  label: string;
  availableAt: string;
  publishedAt: string;
  captionsSrc?: string;
};

export function EpisodeAudioPlayer({ src, label, availableAt, publishedAt, captionsSrc }: Props) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const animationRef = useRef<number | null>(null);
  const seekingRef = useRef(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isReady, setIsReady] = useState(false);
  const [isBuffering, setIsBuffering] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [captions, setCaptions] = useState<CaptionCue[]>([]);
  const [captionsReady, setCaptionsReady] = useState(false);

  const released = isReleased(availableAt ?? publishedAt);
  const progress = duration > 0 ? Math.min(100, (currentTime / duration) * 100) : 0;
  const timeLabel = useMemo(() => `${formatTime(currentTime)} / ${formatTime(duration)}`, [currentTime, duration]);
  const activeCaption = useMemo(() => findActiveCaption(captions, currentTime), [captions, currentTime]);

  useEffect(() => {
    if (!released || !captionsSrc) {
      return;
    }

    let cancelled = false;

    async function loadCaptions() {
      try {
        const response = await fetch(captionsSrc as string);
        if (!response.ok) {
          throw new Error("Caption fetch failed");
        }
        const data = (await response.json()) as CaptionCue[];
        if (!cancelled) {
          setCaptions(data.filter(isCaptionCue));
          setCaptionsReady(true);
        }
      } catch {
        if (!cancelled) {
          setCaptions([]);
          setCaptionsReady(false);
        }
      }
    }

    void loadCaptions();

    return () => {
      cancelled = true;
    };
  }, [captionsSrc, released]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio || !released) {
      return;
    }

    const syncTime = () => setCurrentTime(audio.currentTime || 0);
    const stopAnimation = () => {
      if (animationRef.current !== null) {
        window.cancelAnimationFrame(animationRef.current);
        animationRef.current = null;
      }
    };
    const startAnimation = () => {
      stopAnimation();
      const tick = () => {
        if (!seekingRef.current) {
          syncTime();
        }
        if (!audio.paused && !audio.ended) {
          animationRef.current = window.requestAnimationFrame(tick);
        }
      };
      animationRef.current = window.requestAnimationFrame(tick);
    };
    const onLoadedMetadata = () => {
      setDuration(Number.isFinite(audio.duration) ? audio.duration : 0);
      setIsReady(true);
      syncTime();
    };
    const onPlay = () => {
      setIsPlaying(true);
      startAnimation();
    };
    const onPause = () => {
      setIsPlaying(false);
      stopAnimation();
      syncTime();
    };
    const onWaiting = () => setIsBuffering(true);
    const onPlaying = () => {
      setIsBuffering(false);
      startAnimation();
    };
    const onEnded = () => {
      stopAnimation();
      setIsPlaying(false);
      setCurrentTime(audio.duration || 0);
    };

    audio.addEventListener("loadedmetadata", onLoadedMetadata);
    audio.addEventListener("durationchange", onLoadedMetadata);
    audio.addEventListener("timeupdate", syncTime);
    audio.addEventListener("seeking", syncTime);
    audio.addEventListener("seeked", syncTime);

    if (audio.readyState >= 1) {
      onLoadedMetadata();
    }
    audio.addEventListener("play", onPlay);
    audio.addEventListener("pause", onPause);
    audio.addEventListener("waiting", onWaiting);
    audio.addEventListener("playing", onPlaying);
    audio.addEventListener("ended", onEnded);

    return () => {
      stopAnimation();
      audio.removeEventListener("loadedmetadata", onLoadedMetadata);
      audio.removeEventListener("durationchange", onLoadedMetadata);
      audio.removeEventListener("timeupdate", syncTime);
      audio.removeEventListener("seeking", syncTime);
      audio.removeEventListener("seeked", syncTime);
      audio.removeEventListener("play", onPlay);
      audio.removeEventListener("pause", onPause);
      audio.removeEventListener("waiting", onWaiting);
      audio.removeEventListener("playing", onPlaying);
      audio.removeEventListener("ended", onEnded);
    };
  }, [released]);

  function togglePlay() {
    const audio = audioRef.current;
    if (!audio || !released) {
      return;
    }

    if (audio.paused) {
      void audio.play();
    } else {
      audio.pause();
    }
  }

  function commitSeek(nextTime: number) {
    const audio = audioRef.current;

    if (!Number.isFinite(nextTime)) {
      return;
    }

    const boundedTime = Number.isFinite(duration) && duration > 0 ? Math.min(duration, Math.max(0, nextTime)) : Math.max(0, nextTime);
    setCurrentTime(boundedTime);

    if (audio && Number.isFinite(duration) && duration > 0) {
      audio.currentTime = boundedTime;
    }
  }

  function onSeek(event: ChangeEvent<HTMLInputElement> | FormEvent<HTMLInputElement>) {
    seekingRef.current = true;
    commitSeek(Number(event.currentTarget.value));
  }

  function finishSeek(event: ChangeEvent<HTMLInputElement> | FormEvent<HTMLInputElement>) {
    commitSeek(Number(event.currentTarget.value));
    seekingRef.current = false;
  }

  if (!released) {
    return (
      <div className="border border-[var(--line)] bg-[var(--panel)] p-5 sm:p-6">
        <div className="flex items-start gap-3">
          <Lock className="mt-1 h-5 w-5 text-[var(--accent)]" aria-hidden="true" />
          <div>
            <p className="font-bold text-[var(--foreground)]">Το πλήρες audio είναι κλειδωμένο</p>
            <p className="mt-1 text-sm leading-6 text-[var(--muted)]">Θα ανοίξει στις {formatGreekDate(availableAt)} μαζί με τη δημοσίευση του επεισοδίου. Το αρχείο υπάρχει ήδη, αλλά δεν είναι ακόμη προσβάσιμο.</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="border border-[var(--line)] bg-[var(--panel)] p-5 sm:p-6">
      <audio ref={audioRef} src={src} preload="metadata" className="sr-only">
        Το πρόγραμμα περιήγησης δεν υποστηρίζει audio playback.
      </audio>

      <div className="grid gap-4">
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-start gap-3">
            <Music2 className="mt-1 h-5 w-5 text-[var(--accent)]" aria-hidden="true" />
            <div>
              <p className="font-bold text-[var(--foreground)]">{label}</p>
              <p className="mt-1 text-sm leading-6 text-[var(--muted)]">Πλήρες επεισόδιο με απλά χειριστήρια ακρόασης.</p>
            </div>
          </div>
          <span className="text-xs font-black uppercase tracking-[0.18em] text-[var(--accent)]">{captionsReady ? "Audio + Captions" : "Audio"}</span>
        </div>

        <div className="grid gap-3 border border-[var(--line)] bg-[#0c0a09] p-4">
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={togglePlay}
              className="inline-flex h-12 w-12 items-center justify-center border border-[var(--accent)] bg-[var(--accent)] text-black transition hover:brightness-110"
              aria-label={isPlaying ? "Παύση" : "Αναπαραγωγή"}
            >
              {isBuffering ? <Loader2 className="h-5 w-5 animate-spin" aria-hidden="true" /> : isPlaying ? <Pause className="h-5 w-5" aria-hidden="true" /> : <Play className="h-5 w-5" aria-hidden="true" />}
            </button>
            <div className="min-w-0 flex-1">
              <div className="flex items-center justify-between gap-3 text-xs font-black uppercase tracking-[0.14em] text-[var(--dim)]" aria-live="polite">
                <span>{isPlaying ? "Παίζει τώρα" : isReady ? "Έτοιμο για ακρόαση" : "Φόρτωση player"}</span>
                <span>{timeLabel}</span>
              </div>
              <div className="relative mt-2 h-6">
                <div className="pointer-events-none absolute left-0 right-0 top-1/2 h-2 -translate-y-1/2 overflow-hidden border border-[var(--line)] bg-black">
                  <div className="h-full bg-[var(--accent)] transition-[width] duration-150" style={{ width: `${progress}%` }} />
                </div>
                <input
                  type="range"
                  min={0}
                  max={Number.isFinite(duration) && duration > 0 ? duration : 0}
                  step="0.01"
                  value={currentTime}
                  onInput={onSeek}
                  onChange={finishSeek}
                  onPointerDown={() => {
                    seekingRef.current = true;
                  }}
                  onPointerUp={finishSeek}
                  onKeyUp={finishSeek}
                  disabled={!duration}
                  aria-label={`Χρόνος αναπαραγωγής, ${timeLabel}`}
                  className="player-range absolute inset-0 h-full w-full cursor-pointer appearance-none bg-transparent disabled:cursor-not-allowed disabled:opacity-50"
                />
              </div>
            </div>
          </div>

          {captionsSrc ? (
            <div className="grid h-40 grid-rows-[auto_1fr] border border-[var(--line)] bg-black p-4" aria-live="polite" aria-atomic="true">
              <p className="text-xs font-black uppercase tracking-[0.16em] text-[var(--accent)]">Captions</p>
              <div className="mt-3 overflow-y-auto pr-2">
                <p className="whitespace-pre-line text-lg font-bold leading-8 text-[var(--foreground)]">
                  {activeCaption?.text ?? (captionsReady ? "..." : "Φόρτωση captions...")}
                </p>
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}

function formatTime(seconds: number) {
  if (!Number.isFinite(seconds) || seconds < 0) {
    return "00:00";
  }

  const total = Math.floor(seconds);
  const minutes = Math.floor(total / 60);
  const remaining = total % 60;

  return `${String(minutes).padStart(2, "0")}:${String(remaining).padStart(2, "0")}`;
}


function findActiveCaption(captions: CaptionCue[], currentTime: number): CaptionCue | undefined {
  if (!captions.length) {
    return undefined;
  }

  let low = 0;
  let high = captions.length - 1;

  while (low <= high) {
    const mid = Math.floor((low + high) / 2);
    const cue = captions[mid];

    if (currentTime < cue.start) {
      high = mid - 1;
    } else if (currentTime >= cue.end) {
      low = mid + 1;
    } else {
      return cue;
    }
  }

  return undefined;
}

function isCaptionCue(value: CaptionCue): value is CaptionCue {
  return (
    typeof value?.start === "number" &&
    typeof value?.end === "number" &&
    typeof value?.text === "string" &&
    value.end > value.start
  );
}
