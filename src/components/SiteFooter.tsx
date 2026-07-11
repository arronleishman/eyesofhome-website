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
    <footer className="border-t border-white/10 bg-black px-5 py-16">
      <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-end">
        <div>
          <div className="relative mb-8 aspect-[16/10] overflow-hidden border border-white/10">
            <Image
              src="/photos/live-band.jpg"
              alt="Eyes of Home live"
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
            <p className="text-xs uppercase tracking-[0.2em] text-white/45">Merch</p>
            <TrackedLink
              href={siteConfig.merchUrl}
              event="merch_click"
              className="mt-2 inline-block text-lg text-white underline-offset-4 hover:underline"
            >
              Shop Teemill
            </TrackedLink>
          </div>

          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-white/45">Booking</p>
            <TrackedLink
              href={`mailto:${siteConfig.bookingEmail}`}
              event="booking_click"
              external={false}
              className="mt-2 inline-block text-lg text-white underline-offset-4 hover:underline"
            >
              {siteConfig.bookingEmail}
            </TrackedLink>
          </div>

          <div className="flex flex-wrap gap-5 text-xs uppercase tracking-[0.16em] text-white/60">
            {instagramUrl ? (
              <a
                href={instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white"
              >
                Instagram
              </a>
            ) : null}
            {spotifyUrl ? (
              <TrackedLink
                href={spotifyUrl}
                event="spotify_click"
                className="hover:text-white"
              >
                Spotify
              </TrackedLink>
            ) : null}
            <a
              href={siteConfig.stageRisePublicUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white"
            >
              StageRise
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
