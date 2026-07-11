import Image from "next/image";

export function Hero() {
  return (
    <section
      id="top"
      aria-label="Eyes of Home"
      className="relative flex min-h-[100svh] items-end overflow-hidden bg-black"
    >
      <div className="absolute inset-0">
        <Image
          src="/photos/hero-kick.jpg"
          alt="Eyes of Home performing live — kick drum with the band name on stage"
          fill
          priority
          className="object-cover object-center grayscale contrast-125 hero-pan"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/55 to-black/30" />
      </div>

      <div className="relative z-10 w-full px-5 pb-16 pt-28 sm:pb-20">
        <div className="mx-auto max-w-6xl">
          <h1 className="sr-only">
            Eyes of Home — indie rock band from Edinburgh, Scotland
          </h1>
          <div className="flex flex-wrap gap-3 fade-up">
            <a
              href="#gigs"
              className="inline-flex items-center border border-white bg-white px-5 py-3 text-xs font-semibold uppercase tracking-[0.18em] text-black transition hover:bg-transparent hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
            >
              Upcoming gigs
            </a>
            <a
              href="#listen"
              className="inline-flex items-center border border-white/70 px-5 py-3 text-xs font-semibold uppercase tracking-[0.18em] text-white transition hover:border-white hover:bg-white hover:text-black focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
            >
              Listen
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
