"use client";

import Image from "next/image";
import { useEffect, useId, useState } from "react";
import { HeaderMerchLink } from "./HeaderMerchLink";

const links = [
  { href: "#gigs", label: "Tickets" },
  { href: "#listen", label: "Listen" },
  { href: "#about", label: "About" },
] as const;

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const menuId = useId();

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") setOpen(false);
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  function close() {
    setOpen(false);
  }

  return (
    <header className="fixed inset-x-0 top-0 z-40 border-b border-white/10 bg-black/85 backdrop-blur-md pt-[env(safe-area-inset-top)]">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 py-3 sm:px-6 sm:py-4 lg:px-8">
        <a
          href="#top"
          className="relative block h-6 w-[132px] shrink-0 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white sm:h-8 sm:w-[190px]"
          aria-label="Eyes of Home — back to top"
          onClick={close}
        >
          <Image
            src="/logo.png"
            alt=""
            fill
            priority
            className="object-contain object-left"
            sizes="(max-width: 640px) 132px, 190px"
          />
        </a>

        <nav
          aria-label="Primary"
          className="hidden items-center gap-6 text-xs uppercase tracking-[0.16em] text-white/85 md:flex lg:gap-8"
        >
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="min-h-11 inline-flex items-center transition hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
            >
              {link.label}
            </a>
          ))}
          <HeaderMerchLink className="min-h-11 inline-flex items-center" />
        </nav>

        <button
          type="button"
          className="inline-flex min-h-11 min-w-11 items-center justify-center border border-white/30 text-white md:hidden focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
          aria-expanded={open}
          aria-controls={menuId}
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((value) => !value)}
        >
          <span className="sr-only">{open ? "Close menu" : "Open menu"}</span>
          <span aria-hidden="true" className="flex w-5 flex-col gap-1.5">
            <span
              className={`block h-0.5 w-full bg-white transition ${open ? "translate-y-2 rotate-45" : ""}`}
            />
            <span
              className={`block h-0.5 w-full bg-white transition ${open ? "opacity-0" : ""}`}
            />
            <span
              className={`block h-0.5 w-full bg-white transition ${open ? "-translate-y-2 -rotate-45" : ""}`}
            />
          </span>
        </button>
      </div>

      <div
        id={menuId}
        hidden={!open}
        className="border-t border-white/10 bg-black md:hidden"
      >
        <nav
          aria-label="Mobile"
          className="mx-auto flex max-w-6xl flex-col px-4 py-4 sm:px-6"
        >
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={close}
              className="min-h-12 border-b border-white/10 py-3 text-sm uppercase tracking-[0.16em] text-white/90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
            >
              {link.label}
            </a>
          ))}
          <div className="min-h-12 border-b border-white/10 py-3 text-sm uppercase tracking-[0.16em]">
            <HeaderMerchLink onNavigate={close} />
          </div>
        </nav>
      </div>
    </header>
  );
}
