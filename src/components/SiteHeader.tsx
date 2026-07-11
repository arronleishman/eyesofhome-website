import Image from "next/image";
import { HeaderMerchLink } from "./HeaderMerchLink";

export function SiteHeader() {
  return (
    <header className="fixed inset-x-0 top-0 z-40 border-b border-white/10 bg-black/80 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4">
        <a
          href="#top"
          className="relative block h-7 w-[160px] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white sm:h-8 sm:w-[190px]"
          aria-label="Eyes of Home — back to top"
        >
          <Image
            src="/logo.png"
            alt=""
            fill
            priority
            className="object-contain object-left"
            sizes="190px"
          />
        </a>
        <nav aria-label="Primary" className="flex items-center gap-5 text-xs uppercase tracking-[0.16em] text-white/85 sm:gap-7">
          <a
            href="#gigs"
            className="transition hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
          >
            Tickets
          </a>
          <HeaderMerchLink />
          <a
            href="#listen"
            className="transition hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
          >
            Listen
          </a>
          <a
            href="#about"
            className="transition hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
          >
            About
          </a>
        </nav>
      </div>
    </header>
  );
}
