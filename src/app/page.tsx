import { Hero } from "@/components/Hero";
import { GigsSection } from "@/components/GigsSection";
import { ListenSection } from "@/components/ListenSection";
import { NextGig } from "@/components/NextGig";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { TrackPageView } from "@/components/TrackPageView";
import {
  fetchPublicBand,
  spotifyArtistId,
  type StageRiseGig,
  type StageRiseSocials,
} from "@/lib/stagerise";

export const revalidate = 60;

export default async function HomePage() {
  let upcoming: StageRiseGig[] = [];
  let past: StageRiseGig[] = [];
  let socials: StageRiseSocials | undefined;

  try {
    const data = await fetchPublicBand();
    upcoming = data.upcoming;
    past = data.past;
    socials = data.band?.socials;
  } catch {
    // StageRise unavailable — page still renders with empty calendar
  }

  const nextGig = upcoming[0] ?? null;
  const artistId = spotifyArtistId(socials?.spotify);

  return (
    <>
      <TrackPageView />
      <SiteHeader />
      <main>
        <Hero />
        <NextGig gig={nextGig} />
        <GigsSection upcoming={upcoming} past={past} />
        <ListenSection spotifyUrl={socials?.spotify} artistId={artistId} />
      </main>
      <SiteFooter
        instagramUrl={socials?.instagram}
        spotifyUrl={socials?.spotify}
      />
    </>
  );
}
