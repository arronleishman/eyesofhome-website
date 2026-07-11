import Image from "next/image";
import { siteConfig } from "@/lib/config";
import { TrackedLink } from "./TrackedLink";

export function SiteFooter({
  instagramUrl,
  spotifyUrl,
}: {
  instagramUrl?: string;
  spotifyUrl?: string;
}) {
  return (
    <footer
      aria-label="Site footer"
      className="border-t border-white/10 bg-black px-5 py-16"
    >
      <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-end">
        <div>
          <div className="relative mb-8 aspect-[16/10] overflow-hidden border border-white/10">
            <Image
              src="/photos/live-band.jpg"
              alt="Eyes of Home performing live under blue stage lights"
              fill
              className="object-cover grayscale contrast-125"
              sizes="(max-width: 1024px) 100vw, 55vw"
            />
          </div>
          <div className="relative h-10 w-[220px] sm:h-12 sm:w-[280px]">
            <Image
              src="/logo.png"
              alt="Eyes of Home"
              fill
              className="object-contain object-left"
              sizes="280px"
            />
          </div>
        </div>

        <div className="space-y-6">
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-white/70">Merch</p>
            <TrackedLink
              href={siteConfig.merchUrl}
              event="merch_click"
              aria-label="Shop Eyes of Home merch on Teemill"
              className="mt-2 inline-block text-lg text-white underline-offset-4 hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
            >
              Shop Teemill
            </TrackedLink>
          </div>

          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-white/70">Booking</p>
            <TrackedLink
              href={`mailto:${siteConfig.bookingEmail}`}
              event="booking_click"
              external={false}
              aria-label={`Email booking at ${siteConfig.bookingEmail}`}
              className="mt-2 inline-block text-lg text-white underline-offset-4 hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
            >
              {siteConfig.bookingEmail}
            </TrackedLink>
          </div>

          <nav aria-label="Social links" className="flex flex-wrap gap-5 text-xs uppercase tracking-[0.16em] text-white/75">
            {instagramUrl ? (
              <a
                href={instagramUrl}
                target="_blank"
                rel="noopener noreferrer me"
                className="hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
              >
                Instagram
                <span className="sr-only"> (opens in a new tab)</span>
              </a>
            ) : null}
            {spotifyUrl ? (
              <TrackedLink
                href={spotifyUrl}
                event="spotify_click"
                aria-label="Eyes of Home on Spotify"
                className="hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
              >
                Spotify
              </TrackedLink>
            ) : null}
            <a
              href={siteConfig.stageRisePublicUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
            >
              StageRise
              <span className="sr-only"> (opens in a new tab)</span>
            </a>
          </nav>
        </div>
      </div>
    </footer>
  );
}
