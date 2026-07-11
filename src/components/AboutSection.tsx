import { siteConfig } from "@/lib/config";

export function AboutSection() {
  return (
    <section
      id="about"
      aria-labelledby="about-heading"
      className="border-t border-white/10 bg-black px-5 py-20"
    >
      <div className="mx-auto max-w-6xl">
        <p className="text-xs uppercase tracking-[0.22em] text-white/70">
          About
        </p>
        <h2
          id="about-heading"
          className="mt-3 font-[family-name:var(--font-display)] text-4xl tracking-[0.06em] text-white sm:text-5xl"
        >
          The band
        </h2>
        <p className="mt-8 max-w-3xl text-base leading-relaxed text-white/80 sm:text-lg">
          {siteConfig.about}
        </p>
        <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {siteConfig.members.map((member) => (
            <li
              key={member.name}
              className="border border-white/15 px-4 py-5"
            >
              <p className="font-[family-name:var(--font-display)] text-2xl tracking-[0.06em] text-white">
                {member.name}
              </p>
              <p className="mt-2 text-sm text-white/70">{member.role}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
