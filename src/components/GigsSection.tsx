import { siteConfig } from "@/lib/config";
import type { StageRiseGig } from "@/lib/stagerise";
import { formatGigDate, formatGigPlace } from "@/lib/stagerise";
import { TrackedLink } from "./TrackedLink";

function GigRow({ gig, showTickets }: { gig: StageRiseGig; showTickets: boolean }) {
  const place = formatGigPlace(gig);
  const when = `${formatGigDate(gig.date)}${gig.startTime ? ` at ${gig.startTime}` : ""}`;

  return (
    <li className="grid gap-4 border-b border-white/10 py-5 sm:grid-cols-[1fr_auto] sm:items-center sm:gap-3 sm:py-6">
      <div className="min-w-0">
        <p className="text-xs uppercase tracking-[0.18em] text-white/70">
          <time dateTime={`${gig.date}${gig.startTime ? `T${gig.startTime}` : ""}`}>
            {formatGigDate(gig.date)}
            {gig.startTime ? ` · ${gig.startTime}` : ""}
          </time>
        </p>
        <h3 className="mt-2 break-words font-[family-name:var(--font-display)] text-xl tracking-[0.06em] text-white sm:text-2xl md:text-3xl">
          {gig.title}
        </h3>
        <p className="mt-1 text-sm text-white/75 sm:text-base">{place}</p>
      </div>
      {showTickets && gig.ticketLink ? (
        <TrackedLink
          href={gig.ticketLink}
          event="ticket_click"
          gigId={gig.id}
          gigTitle={gig.title}
          aria-label={`Buy tickets for ${gig.title}, ${place}, ${when}`}
          className="inline-flex min-h-11 w-full items-center justify-center border border-white/80 px-4 py-2 text-xs uppercase tracking-[0.16em] text-white transition hover:bg-white hover:text-black focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white sm:w-fit"
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
    <section
      id="gigs"
      aria-labelledby="gigs-heading"
      className="bg-black px-4 py-12 sm:px-6 sm:py-16 lg:px-8 lg:py-20"
    >
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-col gap-4 sm:flex-row sm:flex-wrap sm:items-end sm:justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.22em] text-white/70">
              Gigs
            </p>
            <h2
              id="gigs-heading"
              className="mt-3 font-[family-name:var(--font-display)] text-3xl tracking-[0.06em] text-white sm:text-5xl"
            >
              Calendar
            </h2>
          </div>
          <a
            href={siteConfig.stageRisePublicUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-11 items-center text-xs uppercase tracking-[0.16em] text-white/75 underline-offset-4 hover:text-white hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
          >
            Full calendar on StageRise
            <span className="sr-only"> (opens in a new tab)</span>
          </a>
        </div>

        <div className="mt-10 sm:mt-12">
          <h3 className="text-xs uppercase tracking-[0.2em] text-white/70">
            Upcoming
          </h3>
          {upcoming.length === 0 ? (
            <p className="mt-6 border border-dashed border-white/20 px-4 py-6 text-sm text-white/80 sm:px-5 sm:py-8 sm:text-base">
              No upcoming shows yet.{" "}
              <TrackedLink
                href={`mailto:${siteConfig.bookingEmail}`}
                event="booking_click"
                external={false}
                className="underline underline-offset-4 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
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

        <div className="mt-12 sm:mt-16">
          <h3 className="text-xs uppercase tracking-[0.2em] text-white/70">
            Past
          </h3>
          {past.length === 0 ? (
            <p className="mt-6 text-sm text-white/75 sm:text-base">
              Past shows will appear here.
            </p>
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
