"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

const FIRST_VIDEO_ID = "W8kTvroE-1c";
const SECOND_VIDEO_ID = "FB-EFu_AUao";
const FIRST_START_SECONDS = 132; // 2:12
/** YouTube flashes play/pause chrome on start; keep poster up until it clears. */
const REVEAL_DELAY_MS = 2500;

type YtPlayer = {
  destroy: () => void;
  mute: () => void;
  playVideo: () => void;
  loadVideoById: (opts: { videoId: string; startSeconds?: number }) => void;
  unloadModule?: (module: string) => void;
  setOption?: (module: string, option: string, value: unknown) => void;
};

type YtNamespace = {
  Player: new (
    element: HTMLElement | string,
    options: Record<string, unknown>,
  ) => YtPlayer;
  PlayerState: {
    ENDED: number;
    PLAYING: number;
    BUFFERING: number;
    PAUSED: number;
  };
};

declare global {
  interface Window {
    YT?: YtNamespace;
    onYouTubeIframeAPIReady?: () => void;
  }
}

function loadYouTubeApi() {
  if (typeof window === "undefined") return Promise.resolve();
  if (window.YT?.Player) return Promise.resolve();

  return new Promise<void>((resolve) => {
    const previous = window.onYouTubeIframeAPIReady;
    window.onYouTubeIframeAPIReady = () => {
      previous?.();
      resolve();
    };

    if (!document.querySelector('script[src="https://www.youtube.com/iframe_api"]')) {
      const tag = document.createElement("script");
      tag.src = "https://www.youtube.com/iframe_api";
      tag.async = true;
      document.body.appendChild(tag);
    }
  });
}

function keepSilentAndCaptionless(player: YtPlayer) {
  player.mute();
  try {
    player.unloadModule?.("captions");
    player.unloadModule?.("cc");
    player.setOption?.("captions", "track", {});
  } catch {
    // Caption APIs are best-effort depending on player build
  }
}

export function Hero() {
  const mountRef = useRef<HTMLDivElement>(null);
  const playerRef = useRef<YtPlayer | null>(null);
  const switchedRef = useRef(false);
  const revealTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [videoVisible, setVideoVisible] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(media.matches);
    const onChange = () => setReducedMotion(media.matches);
    media.addEventListener("change", onChange);
    return () => media.removeEventListener("change", onChange);
  }, []);

  useEffect(() => {
    if (reducedMotion) return;
    let cancelled = false;

    function clearRevealTimer() {
      if (revealTimerRef.current) {
        clearTimeout(revealTimerRef.current);
        revealTimerRef.current = null;
      }
    }

    function hideVideoChrome() {
      clearRevealTimer();
      setVideoVisible(false);
    }

    function scheduleVideoReveal() {
      clearRevealTimer();
      revealTimerRef.current = setTimeout(() => {
        if (!cancelled) setVideoVisible(true);
      }, REVEAL_DELAY_MS);
    }

    async function setup() {
      await loadYouTubeApi();
      if (cancelled || !mountRef.current || !window.YT?.Player) return;

      playerRef.current = new window.YT.Player(mountRef.current, {
        videoId: FIRST_VIDEO_ID,
        host: "https://www.youtube-nocookie.com",
        playerVars: {
          autoplay: 1,
          mute: 1,
          controls: 0,
          disablekb: 1,
          fs: 0,
          cc_load_policy: 0,
          iv_load_policy: 3,
          modestbranding: 1,
          playsinline: 1,
          rel: 0,
          start: FIRST_START_SECONDS,
        },
        events: {
          onReady: (event: { target: YtPlayer }) => {
            if (cancelled) return;
            keepSilentAndCaptionless(event.target);
            event.target.playVideo();
          },
          onStateChange: (event: { data: number; target: YtPlayer }) => {
            if (!window.YT || cancelled) return;
            const { PLAYING, PAUSED, BUFFERING, ENDED } = window.YT.PlayerState;

            if (event.data === PLAYING) {
              keepSilentAndCaptionless(event.target);
              scheduleVideoReveal();
            }

            if (event.data === PAUSED) {
              hideVideoChrome();
              keepSilentAndCaptionless(event.target);
              event.target.playVideo();
            }

            if (event.data === BUFFERING) {
              // Keep current visibility; don't flash poster mid-playback
            }

            if (event.data === ENDED) {
              hideVideoChrome();
              if (!switchedRef.current) {
                switchedRef.current = true;
              }
              event.target.loadVideoById({ videoId: SECOND_VIDEO_ID });
              keepSilentAndCaptionless(event.target);
              event.target.playVideo();
            }
          },
        },
      });
    }

    void setup();

    return () => {
      cancelled = true;
      clearRevealTimer();
      try {
        playerRef.current?.destroy();
      } catch {
        // ignore destroy race
      }
      playerRef.current = null;
    };
  }, [reducedMotion]);

  return (
    <section
      id="top"
      aria-label="Eyes of Home"
      className="relative flex min-h-[100svh] items-end overflow-hidden bg-black"
    >
      <div className="absolute inset-0">
        {reducedMotion ? (
          <Image
            src="/photos/hero-kick.jpg"
            alt="Eyes of Home performing live — kick drum with the band name on stage"
            fill
            priority
            className="object-cover object-[center_35%] grayscale contrast-125 sm:object-center"
            sizes="100vw"
          />
        ) : (
          <>
            {/* Player stays mounted underneath; poster covers YouTube chrome */}
            <div
              className="hero-video-frame absolute inset-0 overflow-hidden"
              style={{
                opacity: videoVisible ? 1 : 0,
                visibility: videoVisible ? "visible" : "hidden",
              }}
              aria-hidden={!videoVisible}
            >
              <div
                ref={mountRef}
                className="hero-video-player"
                title="Eyes of Home live performance video"
              />
            </div>

            <div
              className={`absolute inset-0 z-[1] transition-opacity duration-700 ${videoVisible ? "pointer-events-none opacity-0" : "opacity-100"}`}
              aria-hidden="true"
            >
              <Image
                src="/photos/hero-kick.jpg"
                alt=""
                fill
                priority
                className="object-cover object-[center_35%] grayscale contrast-125 sm:object-center"
                sizes="100vw"
              />
            </div>
          </>
        )}
        <div className="pointer-events-none absolute inset-0 z-[2] bg-gradient-to-t from-black via-black/55 to-black/30" />
        <div className="pointer-events-none absolute inset-0 z-[2] bg-black/20 mix-blend-multiply" />
      </div>

      <div className="relative z-10 w-full px-4 pb-[max(4rem,env(safe-area-inset-bottom))] pt-24 sm:px-6 sm:pb-20 sm:pt-28 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <h1 className="sr-only">
            Eyes of Home — indie rock band from Edinburgh, Scotland
          </h1>
          <div className="flex w-full flex-col gap-3 fade-up sm:flex-row sm:flex-wrap sm:items-center">
            <a
              href="#gigs"
              className="inline-flex min-h-12 w-full items-center justify-center border border-white bg-white px-5 py-3 text-xs font-semibold uppercase tracking-[0.18em] text-black transition hover:bg-transparent hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white sm:w-auto"
            >
              Upcoming gigs
            </a>
            <a
              href="#listen"
              className="inline-flex min-h-12 w-full items-center justify-center border border-white/70 px-5 py-3 text-xs font-semibold uppercase tracking-[0.18em] text-white transition hover:border-white hover:bg-white hover:text-black focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white sm:w-auto"
            >
              Listen
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
