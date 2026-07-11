"use client";

import { FormEvent, useEffect, useState } from "react";
import type { AnalyticsStats } from "@/lib/analytics";

function StatCard({ label, value }: { label: string; value: number | string }) {
  return (
    <div className="border border-white/15 bg-zinc-950 px-4 py-5">
      <p className="text-[11px] uppercase tracking-[0.18em] text-white/45">{label}</p>
      <p className="mt-3 font-[family-name:var(--font-display)] text-4xl text-white">
        {value}
      </p>
    </div>
  );
}

export function AdminClient({ initiallyAuthed }: { initiallyAuthed: boolean }) {
  const [authed, setAuthed] = useState(initiallyAuthed);
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [stats, setStats] = useState<AnalyticsStats | null>(null);
  const [loading, setLoading] = useState(initiallyAuthed);

  async function loadStats() {
    setLoading(true);
    const res = await fetch("/api/analytics/stats");
    if (!res.ok) {
      setAuthed(false);
      setStats(null);
      setLoading(false);
      return;
    }
    setStats((await res.json()) as AnalyticsStats);
    setLoading(false);
  }

  useEffect(() => {
    if (authed) void loadStats();
  }, [authed]);

  async function onLogin(e: FormEvent) {
    e.preventDefault();
    setError("");
    const res = await fetch("/api/admin/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password }),
    });
    if (!res.ok) {
      setError("Wrong password");
      return;
    }
    setPassword("");
    setAuthed(true);
  }

  async function onLogout() {
    await fetch("/api/admin/logout", { method: "POST" });
    setAuthed(false);
    setStats(null);
  }

  if (!authed) {
    return (
      <main className="mx-auto flex min-h-screen max-w-md flex-col justify-center px-5 py-16">
        <h1 className="font-[family-name:var(--font-display)] text-4xl tracking-[0.08em] text-white">
          Admin
        </h1>
        <p className="mt-3 text-sm text-white/55">Analytics dashboard</p>
        <form onSubmit={onLogin} className="mt-10 space-y-4">
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            className="w-full border border-white/20 bg-black px-4 py-3 text-white outline-none focus:border-white"
            autoComplete="current-password"
          />
          {error ? <p className="text-sm text-red-400">{error}</p> : null}
          <button
            type="submit"
            className="w-full border border-white bg-white px-4 py-3 text-xs font-semibold uppercase tracking-[0.18em] text-black"
          >
            Log in
          </button>
        </form>
      </main>
    );
  }

  return (
    <main className="mx-auto min-h-screen max-w-6xl px-5 py-12">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="font-[family-name:var(--font-display)] text-4xl tracking-[0.08em] text-white">
            Analytics
          </h1>
          <p className="mt-2 text-sm text-white/50">
            First-party clicks + views. Vercel Analytics is also enabled on the site.
          </p>
        </div>
        <div className="flex gap-3">
          <button
            type="button"
            onClick={() => void loadStats()}
            className="border border-white/30 px-4 py-2 text-xs uppercase tracking-[0.16em] text-white"
          >
            Refresh
          </button>
          <button
            type="button"
            onClick={() => void onLogout()}
            className="border border-white/30 px-4 py-2 text-xs uppercase tracking-[0.16em] text-white"
          >
            Log out
          </button>
        </div>
      </div>

      {loading && !stats ? (
        <p className="mt-10 text-white/55">Loading…</p>
      ) : stats ? (
        <>
          {!stats.durable ? (
            <p className="mt-6 border border-amber-500/30 bg-amber-500/10 px-4 py-3 text-sm text-amber-100">
              On Vercel, event storage uses ephemeral instance memory/tmp. For long-term
              history, connect durable storage later (e.g. Vercel KV). Counts still work
              for live sessions.
            </p>
          ) : null}

          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <StatCard label="Page views (7d)" value={stats.pageViews7d} />
            <StatCard label="Page views (30d)" value={stats.pageViews30d} />
            <StatCard label="Merch clicks" value={stats.merchClicks} />
            <StatCard label="Spotify clicks" value={stats.spotifyClicks} />
            <StatCard label="Booking clicks" value={stats.bookingClicks} />
            <StatCard label="Ticket clicks" value={stats.ticketClicks} />
          </div>

          <section className="mt-12">
            <h2 className="text-xs uppercase tracking-[0.2em] text-white/45">
              Ticket clicks by gig
            </h2>
            {stats.ticketClicksByGig.length === 0 ? (
              <p className="mt-4 text-white/55">No ticket clicks yet.</p>
            ) : (
              <ul className="mt-4 divide-y divide-white/10 border border-white/10">
                {stats.ticketClicksByGig.map((row) => (
                  <li
                    key={row.gigId}
                    className="flex items-center justify-between gap-4 px-4 py-3"
                  >
                    <span className="text-white">{row.gigTitle}</span>
                    <span className="font-[family-name:var(--font-display)] text-2xl text-white">
                      {row.clicks}
                    </span>
                  </li>
                ))}
              </ul>
            )}
          </section>

          <section className="mt-12">
            <h2 className="text-xs uppercase tracking-[0.2em] text-white/45">
              Recent activity
            </h2>
            <ul className="mt-4 divide-y divide-white/10 border border-white/10 text-sm">
              {stats.recent.map((event) => (
                <li key={event.id} className="px-4 py-3 text-white/75">
                  <span className="text-white">{event.name}</span>
                  {event.gigTitle ? ` · ${event.gigTitle}` : ""}
                  <span className="block text-xs text-white/40">
                    {new Date(event.ts).toLocaleString("en-GB")}
                  </span>
                </li>
              ))}
            </ul>
          </section>
        </>
      ) : null}
    </main>
  );
}
