import Image from "next/image";
import { siteConfig } from "@/lib/config";
import { TrackedLink } from "./TrackedLink";
import { Wordmark } from "./Wordmark";

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
      className="border-t border-white/10 bg-black px-4 py-12 pb-[max(3rem,env(safe-area-inset-bottom))] sm:px-6 sm:py-16 lg:px-8"
    >
      <div className="mx-auto grid max-w-6xl gap-8 md:grid-cols-[1.1fr_0.9fr] md:items-end md:gap-10">
        <div>
          <div className="relative mb-6 aspect-[16/10] overflow-hidden border border-white/10 sm:mb-8">
            <Image
              src="/photos/live-band.jpg"
              alt="Eyes of Home performing live under blue stage lights"
              fill
              className="object-cover object-center grayscale contrast-125"
              sizes="(max-width: 768px) 100vw, 55vw"
            />
          </div>
          <Wordmark size="lg" />
        </div>

        <div className="space-y-6">
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-white/70">Merch</p>
            <TrackedLink
              href={siteConfig.merchUrl}
              event="merch_click"
              aria-label="Shop Eyes of Home merch on Teemill"
              className="mt-2 inline-flex min-h-11 items-center text-base text-white underline-offset-4 hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white sm:text-lg"
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
              className="mt-2 inline-flex min-h-11 max-w-full items-center break-all text-base text-white underline-offset-4 hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white sm:break-normal sm:text-lg"
            >
              {siteConfig.bookingEmail}
            </TrackedLink>
          </div>

          <nav
            aria-label="Social links"
            className="flex flex-wrap gap-x-5 gap-y-3 text-xs uppercase tracking-[0.16em] text-white/75"
          >
            {instagramUrl ? (
              <a
                href={instagramUrl}
                target="_blank"
                rel="noopener noreferrer me"
                className="inline-flex min-h-11 items-center hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
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
                className="inline-flex min-h-11 items-center hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
              >
                Spotify
              </TrackedLink>
            ) : null}
            <a
              href={siteConfig.stageRisePublicUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-11 items-center hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
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
