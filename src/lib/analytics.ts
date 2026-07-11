import { existsSync, mkdirSync, readFileSync, writeFileSync } from "fs";
import path from "path";

export type AnalyticsEventName =
  | "page_view"
  | "merch_click"
  | "spotify_click"
  | "booking_click"
  | "ticket_click";

export type AnalyticsEvent = {
  id: string;
  name: AnalyticsEventName;
  ts: string;
  path?: string;
  gigId?: string;
  gigTitle?: string;
};

export type AnalyticsStats = {
  pageViews7d: number;
  pageViews30d: number;
  merchClicks: number;
  spotifyClicks: number;
  bookingClicks: number;
  ticketClicks: number;
  ticketClicksByGig: { gigId: string; gigTitle: string; clicks: number }[];
  recent: AnalyticsEvent[];
  durable: boolean;
};

type Store = { events: AnalyticsEvent[] };

const globalForAnalytics = globalThis as typeof globalThis & {
  __eohAnalytics?: Store;
};

function storePath() {
  if (process.env.VERCEL) {
    return path.join("/tmp", "eyesofhome-analytics.json");
  }
  return path.join(process.cwd(), "data", "analytics.json");
}

function emptyStore(): Store {
  return { events: [] };
}

function readStore(): Store {
  if (!globalForAnalytics.__eohAnalytics) {
    globalForAnalytics.__eohAnalytics = emptyStore();
    try {
      const file = storePath();
      if (existsSync(file)) {
        const parsed = JSON.parse(readFileSync(file, "utf8")) as Store;
        if (Array.isArray(parsed.events)) {
          globalForAnalytics.__eohAnalytics = parsed;
        }
      }
    } catch {
      // keep memory store
    }
  }
  return globalForAnalytics.__eohAnalytics;
}

function writeStore(store: Store) {
  globalForAnalytics.__eohAnalytics = store;
  try {
    const file = storePath();
    mkdirSync(path.dirname(file), { recursive: true });
    writeFileSync(file, JSON.stringify(store), "utf8");
  } catch {
    // memory-only fallback on read-only FS
  }
}

function daysAgo(n: number) {
  return Date.now() - n * 24 * 60 * 60 * 1000;
}

export function trackEvent(
  input: Omit<AnalyticsEvent, "id" | "ts"> & { ts?: string },
) {
  const store = readStore();
  const event: AnalyticsEvent = {
    id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
    ts: input.ts ?? new Date().toISOString(),
    name: input.name,
    path: input.path,
    gigId: input.gigId,
    gigTitle: input.gigTitle,
  };
  store.events.push(event);
  // keep last 5000 events
  if (store.events.length > 5000) {
    store.events = store.events.slice(-5000);
  }
  writeStore(store);
  return event;
}

export function getAnalyticsStats(): AnalyticsStats {
  const store = readStore();
  const events = store.events;
  const t7 = daysAgo(7);
  const t30 = daysAgo(30);

  const pageViews7d = events.filter(
    (e) => e.name === "page_view" && Date.parse(e.ts) >= t7,
  ).length;
  const pageViews30d = events.filter(
    (e) => e.name === "page_view" && Date.parse(e.ts) >= t30,
  ).length;
  const merchClicks = events.filter((e) => e.name === "merch_click").length;
  const spotifyClicks = events.filter((e) => e.name === "spotify_click").length;
  const bookingClicks = events.filter((e) => e.name === "booking_click").length;
  const ticketEvents = events.filter((e) => e.name === "ticket_click");

  const byGig = new Map<string, { gigId: string; gigTitle: string; clicks: number }>();
  for (const e of ticketEvents) {
    const key = e.gigId || e.gigTitle || "unknown";
    const current = byGig.get(key) ?? {
      gigId: e.gigId || "unknown",
      gigTitle: e.gigTitle || "Unknown gig",
      clicks: 0,
    };
    current.clicks += 1;
    byGig.set(key, current);
  }

  return {
    pageViews7d,
    pageViews30d,
    merchClicks,
    spotifyClicks,
    bookingClicks,
    ticketClicks: ticketEvents.length,
    ticketClicksByGig: [...byGig.values()].sort((a, b) => b.clicks - a.clicks),
    recent: [...events].reverse().slice(0, 40),
    durable: !process.env.VERCEL,
  };
}
