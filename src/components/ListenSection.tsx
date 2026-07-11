import { TrackedLink } from "./TrackedLink";

export function ListenSection({
  spotifyUrl,
  artistId,
}: {
  spotifyUrl?: string;
  artistId: string | null;
}) {
  return (
    <section
      id="listen"
      aria-labelledby="listen-heading"
      className="border-t border-white/10 bg-zinc-950 px-4 py-12 sm:px-6 sm:py-16 lg:px-8 lg:py-20"
    >
      <div className="mx-auto max-w-6xl">
        <p className="text-xs uppercase tracking-[0.22em] text-white/70">Listen</p>
        <h2
          id="listen-heading"
          className="mt-3 font-[family-name:var(--font-display)] text-3xl tracking-[0.06em] text-white sm:text-5xl"
        >
          Play on Spotify
        </h2>
        <p className="mt-4 max-w-2xl text-sm text-white/80 sm:text-base">
          Stream Eyes of Home — including Medicine, She&apos;s So Down, Landmine,
          Red Flag, and Mr. Nice Guy.
        </p>

        <div className="mt-8 overflow-hidden border border-white/10 bg-black sm:mt-10">
          {artistId ? (
            <>
              <iframe
                title="Eyes of Home artist player on Spotify"
                src={`https://open.spotify.com/embed/artist/${artistId}?utm_source=generator`}
                width="100%"
                height="352"
                allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                loading="lazy"
                className="hidden w-full sm:block"
              />
              <iframe
                title="Eyes of Home compact Spotify player"
                src={`https://open.spotify.com/embed/artist/${artistId}?utm_source=generator&theme=0`}
                width="100%"
                height="152"
                allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                loading="lazy"
                className="block w-full sm:hidden"
              />
            </>
          ) : (
            <div className="px-4 py-10 text-sm text-white/80 sm:px-5 sm:py-12 sm:text-base">
              Spotify link coming soon.
            </div>
          )}
        </div>

        {spotifyUrl ? (
          <TrackedLink
            href={spotifyUrl}
            event="spotify_click"
            aria-label="Open Eyes of Home on Spotify"
            className="mt-6 inline-flex min-h-11 items-center text-xs uppercase tracking-[0.16em] text-white/75 underline-offset-4 hover:text-white hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
          >
            Open in Spotify
          </TrackedLink>
        ) : null}
      </div>
    </section>
  );
}
