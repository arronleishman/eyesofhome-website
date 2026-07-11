import { siteConfig } from "@/lib/config";
import type { StageRiseGig } from "@/lib/stagerise";
import { formatGigDate, formatGigPlace } from "@/lib/stagerise";
import { TrackedLink } from "./TrackedLink";

function GigRow({ gig, showTickets }: { gig: StageRiseGig; showTickets: boolean }) {
  return (
    <li className="grid gap-3 border-b border-white/10 py-6 sm:grid-cols-[1fr_auto] sm:items-center">
      <div>
        <p className="text-xs uppercase tracking-[0.18em] text-white/45">
          {formatGigDate(gig.date)}
          {gig.startTime ? ` · ${gig.startTime}` : ""}
        </p>
        <h3 className="mt-2 font-[family-name:var(--font-display)] text-2xl tracking-[0.06em] text-white sm:text-3xl">
          {gig.title}
        </h3>
        <p className="mt-1 text-white/60">{formatGigPlace(gig)}</p>
      </div>
      {showTickets && gig.ticketLink ? (
        <TrackedLink
          href={gig.ticketLink}
          event="ticket_click"
          gigId={gig.id}
          gigTitle={gig.title}
          className="inline-flex w-fit border border-white/70 px-4 py-2 text-xs uppercase tracking-[0.16em] text-white transition hover:bg-white hover:text-black"
        >
          Tickets
        </TrackedLink>
      ) : null}
    </li>
  );
}

export function GigsSection({
  upcoming,
  past,
}: {
  upcoming: StageRiseGig[];
  past: StageRiseGig[];
}) {
  return (
    <section id="gigs" className="bg-black px-5 py-20">
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-xs uppercase tracking-[0.22em] text-white/50">
              Gigs
            </p>
            <h2 className="mt-3 font-[family-name:var(--font-display)] text-4xl tracking-[0.06em] text-white sm:text-5xl">
              Calendar
            </h2>
          </div>
          <a
            href={siteConfig.stageRisePublicUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs uppercase tracking-[0.16em] text-white/55 underline-offset-4 hover:text-white hover:underline"
          >
            Full calendar on StageRise
          </a>
        </div>

        <div className="mt-12">
          <h3 className="text-xs uppercase tracking-[0.2em] text-white/45">
            Upcoming
          </h3>
          {upcoming.length === 0 ? (
            <p className="mt-6 border border-dashed border-white/15 px-5 py-8 text-white/60">
              No upcoming shows yet.{" "}
              <TrackedLink
                href={`mailto:${siteConfig.bookingEmail}`}
                event="booking_click"
                external={false}
                className="underline underline-offset-4 hover:text-white"
              >
                Book us
              </TrackedLink>
              .
            </p>
          ) : (
            <ul className="mt-2">
              {upcoming.map((gig) => (
                <GigRow key={gig.id} gig={gig} showTickets />
              ))}
            </ul>
          )}
        </div>

        <div className="mt-16">
          <h3 className="text-xs uppercase tracking-[0.2em] text-white/45">
            Past
          </h3>
          {past.length === 0 ? (
            <p className="mt-6 text-white/55">Past shows will appear here.</p>
          ) : (
            <ul className="mt-2">
              {past.map((gig) => (
                <GigRow key={gig.id} gig={gig} showTickets={false} />
              ))}
            </ul>
          )}
        </div>
      </div>
    </section>
  );
}
