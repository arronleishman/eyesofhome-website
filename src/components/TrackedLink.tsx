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
};

export function TrackedLink({
  href,
  className,
  children,
  event,
  gigId,
  gigTitle,
  external = true,
}: TrackedLinkProps) {
  return (
    <a
      href={href}
      className={className}
      {...(external
        ? { target: "_blank", rel: "noopener noreferrer" }
        : undefined)}
      onClick={() => trackClientEvent(event, { gigId, gigTitle })}
    >
      {children}
    </a>
  );
}
