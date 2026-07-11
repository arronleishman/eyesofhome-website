"use client";

import type { ReactNode } from "react";
import { trackClientEvent } from "./TrackPageView";

type TrackedLinkProps = {
  href: string;
  className?: string;
  children: ReactNode;
  event:
    | "merch_click"
    | "spotify_click"
    | "booking_click"
    | "ticket_click";
  gigId?: string;
  gigTitle?: string;
  external?: boolean;
  "aria-label"?: string;
};

export function TrackedLink({
  href,
  className,
  children,
  event,
  gigId,
  gigTitle,
  external = true,
  "aria-label": ariaLabel,
}: TrackedLinkProps) {
  return (
    <a
      href={href}
      className={className}
      aria-label={ariaLabel}
      {...(external
        ? {
            target: "_blank",
            rel: "noopener noreferrer",
          }
        : undefined)}
      onClick={() => trackClientEvent(event, { gigId, gigTitle })}
    >
      {children}
      {external ? <span className="sr-only"> (opens in a new tab)</span> : null}
    </a>
  );
}
