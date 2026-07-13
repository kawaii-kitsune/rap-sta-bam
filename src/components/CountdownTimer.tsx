"use client";

import { useEffect, useState } from "react";

type TimeLeft = {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  finished: boolean;
};

function getTimeLeft(targetDate: string): TimeLeft {
  const target = new Date(`${targetDate}T00:00:00`).getTime();
  const now = Date.now();
  const diff = Math.max(0, target - now);

  if (diff === 0) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0, finished: true };
  }

  const seconds = Math.floor(diff / 1000);
  const days = Math.floor(seconds / 86400);
  const hours = Math.floor((seconds % 86400) / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const remainingSeconds = seconds % 60;

  return {
    days,
    hours,
    minutes,
    seconds: remainingSeconds,
    finished: false
  };
}

export function CountdownTimer({ targetDate }: { targetDate: string }) {
  const [timeLeft, setTimeLeft] = useState<TimeLeft | null>(null);

  useEffect(() => {
    const tick = () => setTimeLeft(getTimeLeft(targetDate));
    const timeout = window.setTimeout(tick, 0);
    const interval = window.setInterval(tick, 1000);

    return () => {
      window.clearTimeout(timeout);
      window.clearInterval(interval);
    };
  }, [targetDate]);

  if (!timeLeft) {
    return (
      <dl className="mt-5 grid grid-cols-4 gap-2" aria-label="Φόρτωση countdown">
        {["ημ.", "ώρ.", "λεπ.", "δευτ."].map((label) => (
          <div key={label} className="border border-black/10 bg-black/5 p-3 text-center text-black">
            <dt className="text-[0.65rem] font-black uppercase tracking-[0.16em] text-black/60">{label}</dt>
            <dd className="display-font mt-1 text-4xl leading-none">--</dd>
          </div>
        ))}
      </dl>
    );
  }

  if (timeLeft.finished) {
    return <p className="text-sm font-bold text-black/80">Το release είναι εδώ.</p>;
  }

  const items = [
    { label: "ημ.", value: timeLeft.days },
    { label: "ώρ.", value: timeLeft.hours },
    { label: "λεπ.", value: timeLeft.minutes },
    { label: "δευτ.", value: timeLeft.seconds }
  ];

  return (
    <dl className="mt-5 grid grid-cols-4 gap-2">
      {items.map((item) => (
        <div key={item.label} className="border border-black/10 bg-black/5 p-3 text-center text-black">
          <dt className="text-[0.65rem] font-black uppercase tracking-[0.16em] text-black/60">{item.label}</dt>
          <dd className="display-font mt-1 text-4xl leading-none">{String(item.value).padStart(2, "0")}</dd>
        </div>
      ))}
    </dl>
  );
}
