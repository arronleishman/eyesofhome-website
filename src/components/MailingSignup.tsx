"use client";

import { FormEvent, useState } from "react";
import { siteConfig } from "@/lib/config";

const SUBSCRIBE_URL = `https://www.stageriseapp.com/api/public/band/${siteConfig.stageRiseSlug}/mailing-list/subscribe`;

export function MailingSignup() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "ok" | "error">("idle");
  const [message, setMessage] = useState("");

  async function onSubmit(event: FormEvent) {
    event.preventDefault();
    if (status === "loading") return;
    setStatus("loading");
    setMessage("");
    try {
      const res = await fetch(SUBSCRIBE_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, source: "website" }),
      });
      const data = (await res.json().catch(() => ({}))) as {
        message?: string;
        error?: string;
      };
      if (!res.ok) {
        setStatus("error");
        setMessage(data.message || "Could not sign up — try again.");
        return;
      }
      setStatus("ok");
      setMessage(data.message || "Check your inbox to confirm your email.");
      setEmail("");
    } catch {
      setStatus("error");
      setMessage("Could not sign up — try again.");
    }
  }

  return (
    <section
      aria-label="Gig email signup"
      className="border-t border-white/10 bg-black px-4 py-14 sm:px-6 lg:px-8"
    >
      <div className="mx-auto max-w-6xl">
        <p className="text-xs uppercase tracking-[0.2em] text-white/70">Mailing list</p>
        <h2 className="mt-3 font-serif text-3xl tracking-tight text-white sm:text-4xl">
          Get gig emails
        </h2>
        <p className="mt-3 max-w-xl text-base leading-relaxed text-white/70">
          Occasional show announcements from Eyes of Home — no spam, unsubscribe anytime.
        </p>
        <form
          onSubmit={onSubmit}
          className="mt-8 flex max-w-xl flex-col gap-3 sm:flex-row sm:items-stretch"
        >
          <label htmlFor="eoh-mailing-email" className="sr-only">
            Email
          </label>
          <input
            id="eoh-mailing-email"
            type="email"
            required
            autoComplete="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              if (status !== "idle" && status !== "loading") setStatus("idle");
            }}
            placeholder="you@email.com"
            className="min-h-12 flex-1 border border-white/20 bg-black px-4 text-base text-white placeholder:text-white/40 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
          />
          <button
            type="submit"
            disabled={status === "loading"}
            className="min-h-12 border border-white bg-white px-6 text-sm font-semibold uppercase tracking-[0.14em] text-black transition hover:bg-transparent hover:text-white disabled:opacity-60"
          >
            {status === "loading" ? "Sending…" : "Notify me"}
          </button>
        </form>
        {message ? (
          <p
            className={`mt-4 text-sm ${status === "error" ? "text-amber-200" : "text-white/70"}`}
            role="status"
          >
            {message}
          </p>
        ) : null}
      </div>
    </section>
  );
}
