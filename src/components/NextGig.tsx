"use client";

import { useEffect, useMemo, useState } from "react";
import type { StageRiseGig } from "@/lib/stagerise";
import { formatGigDate, formatGigPlace } from "@/lib/stagerise";
import { TrackedLink } from "./TrackedLink";

function getTarget(gig: StageRiseGig) {
  const time = gig.startTime || "19:00";
  return new Date(`${gig.date}T${time}:00`);
}

export function NextGig({ gig }: { gig: StageRiseGig | null }) {
  const target = useMemo(() => (gig ? getTarget(gig) : null), [gig]);
  const [now, setNow] = useState(() => Date.now());

  useEffect(() => {
    if (!target) return;
    const id = window.setInterval(() => setNow(Date.now()), 1000);
    return () => window.clearInterval(id);
  }, [target]);

  if (!gig || !target || Number.isNaN(target.getTime())) {
    return (
      <section
        aria-labelledby="next-gig-heading"
        className="border-y border-white/10 bg-black px-4 py-12 sm:px-6 sm:py-16 lg:px-8 lg:py-20"
      >
        <div className="mx-auto max-w-6xl">
          <p className="text-xs uppercase tracking-[0.22em] text-white/70">
            Next gig
          </p>
          <h2
            id="next-gig-heading"
            className="mt-3 font-[family-name:var(--font-display)] text-3xl tracking-[0.06em] text-white sm:mt-4 sm:text-5xl"
          >
            Stay tuned
          </h2>
          <p className="mt-4 max-w-xl text-sm text-white/80 sm:text-base">
            No confirmed upcoming shows yet. Check back soon.
          </p>
        </div>
      </section>
    );
  }

  const diff = Math.max(0, target.getTime() - now);
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((diff / (1000 * 60)) % 60);
  const seconds = Math.floor((diff / 1000) % 60);
  const place = formatGigPlace(gig);

  return (
    <section
      aria-labelledby="next-gig-heading"
      className="border-y border-white/10 bg-zinc-950 px-4 py-12 sm:px-6 sm:py-16 lg:px-8 lg:py-20"
    >
      <div className="mx-auto grid max-w-6xl gap-8 md:grid-cols-[1.15fr_1fr] md:items-end md:gap-10">
        <div className="min-w-0">
          <p className="text-xs uppercase tracking-[0.22em] text-white/70">
            Next gig
          </p>
          <h2
            id="next-gig-heading"
            className="mt-3 break-words font-[family-name:var(--font-display)] text-3xl tracking-[0.06em] text-white sm:mt-4 sm:text-5xl lg:text-6xl"
          >
            {gig.title}
          </h2>
          <p className="mt-3 text-base text-white/85 sm:mt-4 sm:text-lg">
            <time dateTime={`${gig.date}T${gig.startTime || "19:00"}`}>
              {formatGigDate(gig.date)}
              {gig.startTime ? ` · ${gig.startTime}` : ""}
            </time>
          </p>
          <p className="mt-1 text-sm text-white/70 sm:text-base">{place}</p>
          {gig.ticketLink ? (
            <TrackedLink
              href={gig.ticketLink}
              event="ticket_click"
              gigId={gig.id}
              gigTitle={gig.title}
              aria-label={`Get tickets for ${gig.title} at ${place}`}
              className="mt-6 inline-flex min-h-12 w-full items-center justify-center border border-white bg-white px-5 py-3 text-xs font-semibold uppercase tracking-[0.18em] text-black transition hover:bg-transparent hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white sm:mt-8 sm:w-auto"
            >
              Get tickets
            </TrackedLink>
          ) : null}
        </div>

        <div
          className="grid grid-cols-4 gap-2 sm:gap-3"
          role="timer"
          aria-live="polite"
          aria-atomic="true"
          aria-label={`Countdown to ${gig.title}: ${days} days, ${hours} hours, ${minutes} minutes, ${seconds} seconds`}
        >
          {[
            ["Days", days],
            ["Hours", hours],
            ["Mins", minutes],
            ["Secs", seconds],
          ].map(([label, value]) => (
            <div
              key={label as string}
              className="border border-white/20 bg-black/40 px-1.5 py-3 text-center sm:px-3 sm:py-4"
            >
              <div
                className="font-[family-name:var(--font-display)] text-2xl text-white sm:text-3xl md:text-4xl"
                aria-hidden="true"
              >
                {String(value).padStart(2, "0")}
              </div>
              <div
                className="mt-1 text-[9px] uppercase tracking-[0.14em] text-white/70 sm:mt-2 sm:text-[10px] sm:tracking-[0.18em]"
                aria-hidden="true"
              >
                {label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
