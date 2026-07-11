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
      <section className="border-y border-white/10 bg-black px-5 py-16">
        <div className="mx-auto max-w-6xl">
          <p className="text-xs uppercase tracking-[0.22em] text-white/50">
            Next gig
          </p>
          <h2 className="mt-4 font-[family-name:var(--font-display)] text-4xl tracking-[0.06em] text-white sm:text-5xl">
            Stay tuned
          </h2>
          <p className="mt-4 max-w-xl text-white/65">
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

  return (
    <section className="border-y border-white/10 bg-zinc-950 px-5 py-16">
      <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[1.2fr_1fr] lg:items-end">
        <div>
          <p className="text-xs uppercase tracking-[0.22em] text-white/50">
            Next gig
          </p>
          <h2 className="mt-4 font-[family-name:var(--font-display)] text-4xl tracking-[0.06em] text-white sm:text-6xl">
            {gig.title}
          </h2>
          <p className="mt-4 text-lg text-white/75">
            {formatGigDate(gig.date)}
            {gig.startTime ? ` · ${gig.startTime}` : ""}
          </p>
          <p className="mt-1 text-white/55">{formatGigPlace(gig)}</p>
          {gig.ticketLink ? (
            <TrackedLink
              href={gig.ticketLink}
              event="ticket_click"
              gigId={gig.id}
              gigTitle={gig.title}
              className="mt-8 inline-flex border border-white bg-white px-5 py-3 text-xs font-semibold uppercase tracking-[0.18em] text-black transition hover:bg-transparent hover:text-white"
            >
              Get tickets
            </TrackedLink>
          ) : null}
        </div>

        <div className="grid grid-cols-4 gap-3">
          {[
            ["Days", days],
            ["Hours", hours],
            ["Mins", minutes],
            ["Secs", seconds],
          ].map(([label, value]) => (
            <div
              key={label as string}
              className="border border-white/15 bg-black/40 px-3 py-4 text-center"
            >
              <div className="font-[family-name:var(--font-display)] text-3xl text-white sm:text-4xl">
                {String(value).padStart(2, "0")}
              </div>
              <div className="mt-2 text-[10px] uppercase tracking-[0.18em] text-white/45">
                {label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
