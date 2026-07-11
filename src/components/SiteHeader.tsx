import Image from "next/image";
import { HeaderMerchLink } from "./HeaderMerchLink";

export function SiteHeader() {
  return (
    <header className="fixed inset-x-0 top-0 z-40 border-b border-white/10 bg-black/70 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4">
        <a href="#top" className="relative block h-7 w-[160px] sm:h-8 sm:w-[190px]">
          <Image
            src="/logo.png"
            alt="Eyes of Home"
            fill
            priority
            className="object-contain object-left"
            sizes="190px"
          />
        </a>
        <nav className="flex items-center gap-5 text-xs uppercase tracking-[0.16em] text-white/80 sm:gap-7">
          <a href="#gigs" className="transition hover:text-white">
            Tickets
          </a>
          <HeaderMerchLink />
          <a href="#listen" className="transition hover:text-white">
            Listen
          </a>
        </nav>
      </div>
    </header>
  );
}
