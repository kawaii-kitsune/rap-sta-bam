"use client";

import { useEffect, useState } from "react";

type CountdownProps = {
  targetDate: string;
  locale?: string;
};

export function CountdownTimer({ targetDate, locale = "el" }: CountdownProps) {
  const isEn = locale === "en";
  const [timeLeft, setTimeLeft] = useState<{
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
  } | null>(null);

  useEffect(() => {
    function calculate() {
      const difference = +new Date(`${targetDate}T12:00:00+03:00`) - +new Date();
      if (difference <= 0) {
        setTimeLeft(null);
        return;
      }

      setTimeLeft({
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60)
      });
    }

    calculate();
    const interval = setInterval(calculate, 1000);
    return () => clearInterval(interval);
  }, [targetDate]);

  if (!timeLeft) return null;

  return (
    <div className="mt-4 flex items-center gap-2 font-mono text-xs font-bold text-[var(--accent)]">
      <div className="rounded bg-[var(--panel-2)] px-2 py-1">
        <span>{String(timeLeft.days).padStart(2, "0")}</span>
        <span className="ml-1 text-[10px] text-[var(--dim)]">{isEn ? "d" : "ημ"}</span>
      </div>
      <span>:</span>
      <div className="rounded bg-[var(--panel-2)] px-2 py-1">
        <span>{String(timeLeft.hours).padStart(2, "0")}</span>
        <span className="ml-1 text-[10px] text-[var(--dim)]">{isEn ? "h" : "ωρ"}</span>
      </div>
      <span>:</span>
      <div className="rounded bg-[var(--panel-2)] px-2 py-1">
        <span>{String(timeLeft.minutes).padStart(2, "0")}</span>
        <span className="ml-1 text-[10px] text-[var(--dim)]">{isEn ? "m" : "λεπ"}</span>
      </div>
      <span>:</span>
      <div className="rounded bg-[var(--panel-2)] px-2 py-1">
        <span>{String(timeLeft.seconds).padStart(2, "0")}</span>
        <span className="ml-1 text-[10px] text-[var(--dim)]">{isEn ? "s" : "δευτ"}</span>
      </div>
    </div>
  );
}
