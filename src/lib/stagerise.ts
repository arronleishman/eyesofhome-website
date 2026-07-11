export type StageRiseSocials = {
  spotify?: string;
  instagram?: string;
  youtube?: string;
  facebook?: string;
  tiktok?: string;
};

export type StageRiseGig = {
  id: string;
  title: string;
  date: string;
  startTime?: string;
  endTime?: string;
  venue?: string;
  city?: string;
  country?: string;
  ticketLink?: string;
  status?: string;
};

export type StageRiseBand = {
  id: string;
  name: string;
  image?: string;
  pressPhotos?: string[];
  socials?: StageRiseSocials;
  publicSlug?: string;
};

export type PublicBandPayload = {
  band: StageRiseBand | null;
  upcoming: StageRiseGig[];
  past: StageRiseGig[];
  published: boolean;
};

function asGig(raw: Record<string, unknown>): StageRiseGig | null {
  if (!raw || typeof raw.id !== "string") return null;
  return {
    id: raw.id,
    title: String(raw.title ?? "Gig"),
    date: String(raw.date ?? ""),
    startTime: raw.startTime ? String(raw.startTime) : undefined,
    endTime: raw.endTime ? String(raw.endTime) : undefined,
    venue: raw.venue ? String(raw.venue) : undefined,
    city: raw.city ? String(raw.city) : undefined,
    country: raw.country ? String(raw.country) : undefined,
    ticketLink: raw.ticketLink ? String(raw.ticketLink) : undefined,
    status: raw.status ? String(raw.status) : undefined,
  };
}

function sortByDateDesc(gigs: StageRiseGig[]) {
  return [...gigs].sort((a, b) => {
    const aKey = `${a.date}T${a.startTime ?? "00:00"}`;
    const bKey = `${b.date}T${b.startTime ?? "00:00"}`;
    return bKey.localeCompare(aKey);
  });
}

export async function fetchPublicBand(): Promise<PublicBandPayload> {
  const { siteConfig } = await import("./config");
  const res = await fetch(siteConfig.stageRiseApiUrl, {
    next: { revalidate: 60 },
  });

  if (!res.ok) {
    throw new Error(`StageRise API error: ${res.status}`);
  }

  const data = (await res.json()) as {
    band?: StageRiseBand;
    upcoming?: Record<string, unknown>[];
    past?: Record<string, unknown>[];
    gigs?: Record<string, unknown>[];
    published?: boolean;
  };

  const upcoming = sortByDateDesc(
    (data.upcoming ?? data.gigs ?? [])
      .map((g) => asGig(g))
      .filter((g): g is StageRiseGig => Boolean(g && g.date)),
  );

  const past = sortByDateDesc(
    (data.past ?? [])
      .map((g) => asGig(g))
      .filter((g): g is StageRiseGig => Boolean(g && g.date)),
  ).slice(0, siteConfig.pastGigsLimit);

  return {
    band: data.band ?? null,
    upcoming,
    past,
    published: data.published !== false,
  };
}

export function formatGigDate(date: string) {
  const d = new Date(`${date}T12:00:00`);
  if (Number.isNaN(d.getTime())) return date;
  return d.toLocaleDateString("en-GB", {
    weekday: "short",
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

export function formatGigPlace(gig: StageRiseGig) {
  return [gig.venue, gig.city].filter(Boolean).join(", ");
}

export function spotifyArtistId(spotifyUrl?: string) {
  if (!spotifyUrl) return null;
  const match = spotifyUrl.match(/artist\/([a-zA-Z0-9]+)/);
  return match?.[1] ?? null;
}
