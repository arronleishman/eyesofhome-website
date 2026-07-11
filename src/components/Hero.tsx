import Image from "next/image";

export function Hero() {
  return (
    <section
      id="top"
      className="relative flex min-h-[100svh] items-end overflow-hidden bg-black"
    >
      <div className="absolute inset-0">
        <Image
          src="/photos/hero-kick.jpg"
          alt="Eyes of Home kick drum"
          fill
          priority
          className="object-cover object-center grayscale contrast-125 hero-pan"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/55 to-black/30" />
      </div>

      <div className="relative z-10 w-full px-5 pb-16 pt-28 sm:pb-20">
        <div className="mx-auto max-w-6xl">
          <h1 className="fade-up">
            <span className="sr-only">Eyes of Home</span>
            <span className="relative block h-[clamp(3.2rem,12vw,7.5rem)] w-full max-w-[920px]">
              <Image
                src="/logo.png"
                alt=""
                fill
                priority
                className="object-contain object-left"
                sizes="(max-width: 1024px) 90vw, 920px"
              />
            </span>
          </h1>
          <div className="mt-8 flex flex-wrap gap-3 fade-up delay-1">
            <a
              href="#gigs"
              className="inline-flex items-center border border-white bg-white px-5 py-3 text-xs font-semibold uppercase tracking-[0.18em] text-black transition hover:bg-transparent hover:text-white"
            >
              Upcoming gigs
            </a>
            <a
              href="#listen"
              className="inline-flex items-center border border-white/70 px-5 py-3 text-xs font-semibold uppercase tracking-[0.18em] text-white transition hover:border-white hover:bg-white hover:text-black"
            >
              Listen
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
