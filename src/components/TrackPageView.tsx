"use client";

import { useEffect } from "react";

export function trackClientEvent(
  name:
    | "page_view"
    | "merch_click"
    | "spotify_click"
    | "booking_click"
    | "ticket_click",
  extra?: { gigId?: string; gigTitle?: string },
) {
  void fetch("/api/analytics/track", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      name,
      path: typeof window !== "undefined" ? window.location.pathname : "/",
      ...extra,
    }),
    keepalive: true,
  });
}

export function TrackPageView() {
  useEffect(() => {
    trackClientEvent("page_view");
  }, []);
  return null;
}
