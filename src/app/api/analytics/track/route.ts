import { NextResponse } from "next/server";
import {
  trackEvent,
  type AnalyticsEventName,
} from "@/lib/analytics";

const ALLOWED: AnalyticsEventName[] = [
  "page_view",
  "merch_click",
  "spotify_click",
  "booking_click",
  "ticket_click",
];

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as {
      name?: string;
      path?: string;
      gigId?: string;
      gigTitle?: string;
    };

    if (!body.name || !ALLOWED.includes(body.name as AnalyticsEventName)) {
      return NextResponse.json({ error: "Invalid event" }, { status: 400 });
    }

    trackEvent({
      name: body.name as AnalyticsEventName,
      path: body.path,
      gigId: body.gigId,
      gigTitle: body.gigTitle,
    });

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "Bad request" }, { status: 400 });
  }
}
