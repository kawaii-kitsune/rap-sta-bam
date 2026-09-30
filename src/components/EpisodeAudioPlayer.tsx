"use client";

import { type ChangeEvent, type FormEvent, useCallback, useEffect, useMemo, useRef, useState } from "react";
import { track } from "@vercel/analytics";
import { ChevronDown, ChevronUp, FileText, Loader2, Lock, Pause, Play, Volume2, VolumeX, Music2 } from "lucide-react";
import { formatGreekDate, isReleased } from "@/lib/content";
import { hasAnalyticsConsent } from "@/lib/consent";

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
  const playTrackedRef = useRef(false);
  const thirtySecondsTrackedRef = useRef(false);
  const halfwayTrackedRef = useRef(false);
  const completeTrackedRef = useRef(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isReady, setIsReady] = useState(false);
  const [isBuffering, setIsBuffering] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [captions, setCaptions] = useState<CaptionCue[]>([]);
  const [captionsReady, setCaptionsReady] = useState(false);
  const [captionError, setCaptionError] = useState(false);
  const [audioError, setAudioError] = useState(false);
  const [showFullTranscript, setShowFullTranscript] = useState(false);

  const released = isReleased(availableAt ?? publishedAt);
  const progress = duration > 0 ? Math.min(100, (currentTime / duration) * 100) : 0;
  const timeLabel = useMemo(() => `${formatTime(currentTime)} / ${formatTime(duration)}`, [currentTime, duration]);
  const activeCaption = useMemo(() => findActiveCaption(captions, currentTime), [captions, currentTime]);
  const analyticsProperties = useMemo(() => ({ audio: label, source: src }), [label, src]);
  const trackAudioEvent = useCallback((eventName: string) => {
    if (hasAnalyticsConsent()) {
      track(eventName, analyticsProperties);
    }
  }, [analyticsProperties]);

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
          setCaptionError(true);
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

  const trackProgressMilestones = useCallback((nextTime: number, nextDuration: number) => {
    if (!Number.isFinite(nextTime)) {
      return;
    }

    if (nextTime >= 30 && !thirtySecondsTrackedRef.current) {
      trackAudioEvent("audio_30_seconds");
      thirtySecondsTrackedRef.current = true;
    }

    if (Number.isFinite(nextDuration) && nextDuration > 0 && nextTime >= nextDuration * 0.5 && !halfwayTrackedRef.current) {
      trackAudioEvent("audio_50_percent");
      halfwayTrackedRef.current = true;
    }
  }, [trackAudioEvent]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio || !released) {
      return;
    }

    const syncTime = () => {
      const nextTime = audio.currentTime || 0;
      setCurrentTime(nextTime);
      trackProgressMilestones(nextTime, audio.duration || 0);
    };
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
      setAudioError(false);
      syncTime();
    };
    const onPlay = () => {
      if (!playTrackedRef.current) {
        trackAudioEvent("audio_play");
        playTrackedRef.current = true;
      }
      setIsPlaying(true);
      startAnimation();
    };
    const onPause = () => {
      setIsPlaying(false);
      stopAnimation();
      syncTime();
    };
    const onError = () => {
      setIsPlaying(false);
      setIsBuffering(false);
      setAudioError(true);
      stopAnimation();
    };
    const onWaiting = () => setIsBuffering(true);
    const onPlaying = () => {
      setIsBuffering(false);
      setIsPlaying(true);
    };
    const onEnded = () => {
      if (!completeTrackedRef.current) {
        trackAudioEvent("audio_complete");
        completeTrackedRef.current = true;
      }
      setIsPlaying(false);
      stopAnimation();
      setCurrentTime(0);
    };

    audio.addEventListener("loadedmetadata", onLoadedMetadata);
    audio.addEventListener("play", onPlay);
    audio.addEventListener("pause", onPause);
    audio.addEventListener("waiting", onWaiting);
    audio.addEventListener("playing", onPlaying);
    audio.addEventListener("ended", onEnded);
    audio.addEventListener("error", onError);

    return () => {
      stopAnimation();
      audio.removeEventListener("loadedmetadata", onLoadedMetadata);
      audio.removeEventListener("play", onPlay);
      audio.removeEventListener("pause", onPause);
      audio.removeEventListener("waiting", onWaiting);
      audio.removeEventListener("playing", onPlaying);
      audio.removeEventListener("ended", onEnded);
      audio.removeEventListener("error", onError);
    };
  }, [released, trackAudioEvent, trackProgressMilestones]);

  const togglePlay = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) {
      return;
    }

    if (audio.paused) {
      void audio.play().catch(() => {
        setAudioError(true);
        setIsBuffering(false);
      });
    } else {
      audio.pause();
    }
  }, []);

  const toggleMute = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.muted = !audio.muted;
    setIsMuted(audio.muted);
  }, []);

  const seekRelative = useCallback((delta: number) => {
    const audio = audioRef.current;
    if (!audio || !Number.isFinite(audio.duration)) return;
    const target = Math.max(0, Math.min(audio.duration, audio.currentTime + delta));
    audio.currentTime = target;
    setCurrentTime(target);
  }, []);

  // Desktop DAW Keyboard Shortcuts
  useEffect(() => {
    if (!released) return;

    function handleKeyDown(event: KeyboardEvent) {
      const activeEl = document.activeElement;
      if (
        activeEl instanceof HTMLInputElement ||
        activeEl instanceof HTMLTextAreaElement ||
        activeEl instanceof HTMLSelectElement
      ) {
        return;
      }

      if (event.code === "Space") {
        event.preventDefault();
        togglePlay();
      } else if (event.code === "ArrowLeft") {
        event.preventDefault();
        seekRelative(-5);
      } else if (event.code === "ArrowRight") {
        event.preventDefault();
        seekRelative(5);
      } else if (event.key.toLowerCase() === "m") {
        event.preventDefault();
        toggleMute();
      } else if (event.key.toLowerCase() === "c" && captionsSrc) {
        event.preventDefault();
        setShowFullTranscript((prev) => !prev);
      }
    }

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [released, togglePlay, seekRelative, toggleMute, captionsSrc]);

  function commitSeek(nextTime: number) {
    const audio = audioRef.current;
    if (!audio || !Number.isFinite(nextTime)) {
      return;
    }

    audio.currentTime = nextTime;
    setCurrentTime(nextTime);
  }

  function onSeek(event: FormEvent<HTMLInputElement>) {
    seekingRef.current = true;
    setCurrentTime(Number(event.currentTarget.value));
  }

  function finishSeek(event: ChangeEvent<HTMLInputElement> | FormEvent<HTMLInputElement>) {
    commitSeek(Number(event.currentTarget.value));
    seekingRef.current = false;
  }

  function jumpToCaption(start: number) {
    commitSeek(start);
    const audio = audioRef.current;
    if (audio && audio.paused) {
      void audio.play();
    }
  }

  if (!released) {
    return (
      <div className="audio-player">
        <div className="flex items-start gap-3">
          <Lock className="mt-1 h-5 w-5 text-[var(--accent)]" aria-hidden="true" />
          <div>
            <p className="font-bold text-[var(--foreground)]">Το audio θα είναι διαθέσιμο στην πρεμιέρα</p>
            <p className="mt-1 text-sm leading-6 text-[var(--muted)]">
              Θα ανοίξει στις {formatGreekDate(availableAt)} μαζί με τη δημοσίευση του επεισοδίου. Θα μπορείς να ακούσεις ολόκληρο το session{captionsSrc ? " με συγχρονισμένους υπότιτλους" : ""}.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="audio-player">
      <audio ref={audioRef} src={src} preload="metadata" className="sr-only">
        Το πρόγραμμα περιήγησης δεν υποστηρίζει audio playback.
      </audio>

      <div className="grid gap-4">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div className="flex items-start gap-3">
            <Music2 className="mt-1 h-5 w-5 text-[var(--accent)]" aria-hidden="true" />
            <div>
              <p className="font-bold text-[var(--foreground)]">{label}</p>
              <p className="mt-1 text-sm leading-6 text-[var(--muted)]">Πλήρες επεισόδιο με απλά χειριστήρια ακρόασης.</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <span className="rsb-chip shrink-0">{captionsReady ? "Audio + Captions" : "Audio"}</span>
            <div className={`audio-waveform ${isPlaying ? "is-playing" : ""}`} aria-hidden="true">
              <span className="audio-waveform-bar" style={{ height: isPlaying ? undefined : "6px" }} />
              <span className="audio-waveform-bar" style={{ height: isPlaying ? undefined : "12px" }} />
              <span className="audio-waveform-bar" style={{ height: isPlaying ? undefined : "16px" }} />
              <span className="audio-waveform-bar" style={{ height: isPlaying ? undefined : "8px" }} />
              <span className="audio-waveform-bar" style={{ height: isPlaying ? undefined : "14px" }} />
            </div>
          </div>
        </div>

        <div className="audio-controls">
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={togglePlay}
              className="rsb-button audio-play"
              aria-label={isPlaying ? "Παύση" : "Αναπαραγωγή"}
            >
              {isBuffering ? <Loader2 className="h-5 w-5 animate-spin" aria-hidden="true" /> : isPlaying ? <Pause className="h-5 w-5" aria-hidden="true" /> : <Play className="h-5 w-5" aria-hidden="true" />}
            </button>
            <button
              type="button"
              onClick={toggleMute}
              className="rsb-button-secondary !min-h-10 !w-10 !p-0 justify-center"
              aria-label={isMuted ? "Κατάργηση σίγασης" : "Σίγαση"}
            >
              {isMuted ? <VolumeX className="h-4 w-4 text-[var(--accent)]" /> : <Volume2 className="h-4 w-4" />}
            </button>
            <div className="min-w-0 flex-1">
              <div className="audio-time">
                <span role="status">{audioError ? "Η φόρτωση απέτυχε" : isBuffering ? "Φόρτωση…" : isPlaying ? "Παίζει τώρα" : isReady ? "Έτοιμο για ακρόαση" : "Φόρτωση audio…"}</span>
                <span>{timeLabel}</span>
              </div>
              <div className="relative h-11">
                <div className="pointer-events-none absolute left-0 right-0 top-1/2 h-1.5 -translate-y-1/2 overflow-hidden rounded-full bg-[var(--line)]">
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
                  aria-label="Χρόνος αναπαραγωγής"
                  aria-valuetext={timeLabel}
                  className="player-range absolute inset-0 h-full w-full cursor-pointer appearance-none bg-transparent disabled:cursor-not-allowed disabled:opacity-50"
                />
              </div>
            </div>
          </div>

          <div className="hidden text-[10px] text-[var(--dim)] sm:flex items-center gap-4 pt-1">
            <span>Space: Play/Pause</span>
            <span>← / →: ±5s</span>
            <span>M: Mute</span>
            {captionsSrc ? <span>C: Transcript</span> : null}
          </div>

          {audioError ? <div className="alert alert-error" role="alert"><div><p>Δεν ήταν δυνατή η φόρτωση του audio. Έλεγξε τη σύνδεσή σου και δοκίμασε ξανά.</p><button type="button" className="text-link mt-1" onClick={() => { setAudioError(false); audioRef.current?.load(); }}>Δοκίμασε ξανά</button></div></div> : null}

          {captionsSrc ? (
            <div className="audio-captions border border-[var(--line)] bg-[var(--panel-2)] p-4 rounded" aria-live="polite" aria-atomic="true">
              <div className="flex items-center justify-between">
                <p className="text-xs font-semibold text-[var(--dim)]">Υπότιτλοι / Live Captions</p>
                <button
                  type="button"
                  onClick={() => setShowFullTranscript((prev) => !prev)}
                  className="text-link flex items-center gap-1 text-xs"
                >
                  <FileText className="h-3.5 w-3.5" />
                  {showFullTranscript ? "Σύμπτυξη" : "Όλο το κείμενο"}
                  {showFullTranscript ? <ChevronUp className="h-3 w-3" /> : <ChevronDown className="h-3 w-3" />}
                </button>
              </div>

              {showFullTranscript ? (
                <div className="mt-4 max-h-64 space-y-2 overflow-y-auto pr-2 divide-y divide-[var(--line)]">
                  {captions.map((cue, index) => {
                    const isActive = activeCaption?.start === cue.start;
                    return (
                      <button
                        key={`${cue.start}-${index}`}
                        type="button"
                        onClick={() => jumpToCaption(cue.start)}
                        className={`w-full text-left py-2 px-2.5 rounded transition-colors flex items-start gap-3 ${
                          isActive
                            ? "bg-[var(--accent-ink)] text-[var(--foreground)] font-semibold"
                            : "hover:bg-[var(--panel)] text-[var(--muted)]"
                        }`}
                      >
                        <span className="font-mono text-xs text-[var(--accent)] shrink-0 pt-0.5">
                          {formatTime(cue.start)}
                        </span>
                        <span className="text-sm leading-6 whitespace-pre-line flex-1">
                          {cue.text}
                        </span>
                      </button>
                    );
                  })}
                </div>
              ) : (
                <div className="mt-3 overflow-y-auto pr-2">
                  <p className="whitespace-pre-line text-base leading-7 text-[var(--foreground)]">
                    {activeCaption?.text ?? (captionError ? "Οι υπότιτλοι δεν φορτώθηκαν. Η ακρόαση παραμένει διαθέσιμη." : captionsReady ? "Οι υπότιτλοι εμφανίζονται κατά την ακρόαση." : "Φόρτωση υποτίτλων…")}
                  </p>
                </div>
              )}
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
