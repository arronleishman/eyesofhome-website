import { NextResponse } from "next/server";
import {
  adminCookieOptions,
  createSessionToken,
  verifyPassword,
} from "@/lib/admin-auth";

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as { password?: string };
    if (!body.password || !verifyPassword(body.password)) {
      return NextResponse.json({ error: "Invalid password" }, { status: 401 });
    }

    const token = createSessionToken();
    const response = NextResponse.json({ ok: true });
    response.cookies.set(adminCookieOptions(token));
    return response;
  } catch {
    return NextResponse.json({ error: "Bad request" }, { status: 400 });
  }
}
