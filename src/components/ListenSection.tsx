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
      className="border-t border-white/10 bg-zinc-950 px-5 py-20"
    >
      <div className="mx-auto max-w-6xl">
        <p className="text-xs uppercase tracking-[0.22em] text-white/70">Listen</p>
        <h2
          id="listen-heading"
          className="mt-3 font-[family-name:var(--font-display)] text-4xl tracking-[0.06em] text-white sm:text-5xl"
        >
          Play on Spotify
        </h2>
        <p className="mt-4 max-w-2xl text-white/80">
          Stream Eyes of Home — including Medicine, She&apos;s So Down, Landmine,
          Red Flag, and Mr. Nice Guy.
        </p>

        <div className="mt-10 overflow-hidden border border-white/10 bg-black">
          {artistId ? (
            <iframe
              title="Eyes of Home artist player on Spotify"
              src={`https://open.spotify.com/embed/artist/${artistId}?utm_source=generator`}
              width="100%"
              height="352"
              allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
              loading="lazy"
              className="block w-full"
            />
          ) : (
            <div className="px-5 py-12 text-white/80">Spotify link coming soon.</div>
          )}
        </div>

        {spotifyUrl ? (
          <TrackedLink
            href={spotifyUrl}
            event="spotify_click"
            aria-label="Open Eyes of Home on Spotify"
            className="mt-6 inline-flex text-xs uppercase tracking-[0.16em] text-white/75 underline-offset-4 hover:text-white hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
          >
            Open in Spotify
          </TrackedLink>
        ) : null}
      </div>
    </section>
  );
}
