import { createHmac, timingSafeEqual } from "crypto";
import { cookies } from "next/headers";

const COOKIE_NAME = "eoh_admin";
const MAX_AGE_SECONDS = 60 * 60 * 24 * 7;

function getPassword() {
  return process.env.ADMIN_PASSWORD ?? "";
}

function getSigningSecret() {
  return process.env.ADMIN_SECRET || getPassword() || "dev-only-secret";
}

export function verifyPassword(candidate: string) {
  const expected = getPassword();
  if (!expected) return false;
  const a = Buffer.from(candidate);
  const b = Buffer.from(expected);
  if (a.length !== b.length) return false;
  return timingSafeEqual(a, b);
}

function sign(value: string) {
  return createHmac("sha256", getSigningSecret()).update(value).digest("hex");
}

export function createSessionToken() {
  const payload = `ok:${Date.now()}`;
  return `${payload}.${sign(payload)}`;
}

export function isValidSessionToken(token: string | undefined) {
  if (!token) return false;
  const [payload, signature] = token.split(".");
  if (!payload || !signature) return false;
  const expected = sign(payload);
  try {
    const a = Buffer.from(signature);
    const b = Buffer.from(expected);
    if (a.length !== b.length) return false;
    return timingSafeEqual(a, b) && payload.startsWith("ok:");
  } catch {
    return false;
  }
}

export async function isAdminAuthenticated() {
  const jar = await cookies();
  return isValidSessionToken(jar.get(COOKIE_NAME)?.value);
}

export function adminCookieOptions(token: string) {
  return {
    name: COOKIE_NAME,
    value: token,
    httpOnly: true,
    sameSite: "lax" as const,
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: MAX_AGE_SECONDS,
  };
}

export function clearAdminCookieOptions() {
  return {
    name: COOKIE_NAME,
    value: "",
    httpOnly: true,
    sameSite: "lax" as const,
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 0,
  };
}
