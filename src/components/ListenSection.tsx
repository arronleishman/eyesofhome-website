import { TrackedLink } from "./TrackedLink";

export function ListenSection({
  spotifyUrl,
  artistId,
}: {
  spotifyUrl?: string;
  artistId: string | null;
}) {
  return (
    <section id="listen" className="border-t border-white/10 bg-zinc-950 px-5 py-20">
      <div className="mx-auto max-w-6xl">
        <p className="text-xs uppercase tracking-[0.22em] text-white/50">Listen</p>
        <h2 className="mt-3 font-[family-name:var(--font-display)] text-4xl tracking-[0.06em] text-white sm:text-5xl">
          Play on Spotify
        </h2>

        <div className="mt-10 overflow-hidden border border-white/10 bg-black">
          {artistId ? (
            <iframe
              title="Eyes of Home on Spotify"
              src={`https://open.spotify.com/embed/artist/${artistId}?utm_source=generator`}
              width="100%"
              height="352"
              allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
              loading="lazy"
              className="block w-full"
            />
          ) : (
            <div className="px-5 py-12 text-white/60">Spotify link coming soon.</div>
          )}
        </div>

        {spotifyUrl ? (
          <TrackedLink
            href={spotifyUrl}
            event="spotify_click"
            className="mt-6 inline-flex text-xs uppercase tracking-[0.16em] text-white/60 underline-offset-4 hover:text-white hover:underline"
          >
            Open in Spotify
          </TrackedLink>
        ) : null}
      </div>
    </section>
  );
}
