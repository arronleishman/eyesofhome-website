import { AboutSection } from "@/components/AboutSection";
import { Hero } from "@/components/Hero";
import { GigsSection } from "@/components/GigsSection";
import { ListenSection } from "@/components/ListenSection";
import { NextGig } from "@/components/NextGig";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { TrackPageView } from "@/components/TrackPageView";
import { siteConfig } from "@/lib/config";
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
  const spotifyUrl = socials?.spotify || siteConfig.spotifyUrl;
  const instagramUrl = socials?.instagram || siteConfig.instagramUrl;
  const artistId = spotifyArtistId(spotifyUrl);

  return (
    <>
      <TrackPageView />
      <SiteHeader />
      <main id="main-content">
        <Hero />
        <NextGig gig={nextGig} />
        <GigsSection upcoming={upcoming} past={past} />
        <ListenSection spotifyUrl={spotifyUrl} artistId={artistId} />
        <AboutSection />
      </main>
      <SiteFooter instagramUrl={instagramUrl} spotifyUrl={spotifyUrl} />
    </>
  );
}
