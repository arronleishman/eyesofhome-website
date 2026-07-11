import { Analytics } from "@vercel/analytics/next";
import type { Metadata, Viewport } from "next";
import { Bebas_Neue, Manrope } from "next/font/google";
import { siteConfig } from "@/lib/config";
import { musicGroupJsonLd, websiteJsonLd } from "@/lib/seo";
import "./globals.css";

const display = Bebas_Neue({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-display",
});

const sans = Manrope({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: "#000000",
};

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: "Eyes of Home | Indie Rock Band from Edinburgh",
    template: "%s | Eyes of Home",
  },
  description: siteConfig.shortDescription,
  applicationName: siteConfig.name,
  keywords: [
    "Eyes of Home",
    "indie rock",
    "Edinburgh band",
    "Scottish indie",
    "King Tut's",
    "Sneaky Pete's",
    "Belladrum",
    "BBC Introducing",
    "She's So Down",
    "Medicine",
    "Landmine",
    "Mr. Nice Guy",
    "live music Scotland",
    "Glasgow gigs",
  ],
  authors: [{ name: siteConfig.name, url: siteConfig.url }],
  creator: siteConfig.name,
  publisher: siteConfig.name,
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_GB",
    url: siteConfig.url,
    siteName: siteConfig.name,
    title: "Eyes of Home | Indie Rock Band from Edinburgh",
    description: siteConfig.shortDescription,
    images: [
      {
        url: "/photos/live-band.jpg",
        width: 1200,
        height: 630,
        alt: "Eyes of Home performing live on stage",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Eyes of Home | Indie Rock Band from Edinburgh",
    description: siteConfig.shortDescription,
    images: ["/photos/live-band.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  category: "music",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const structuredData = [musicGroupJsonLd(), websiteJsonLd()];

  return (
    <html lang="en-GB" className={`${display.variable} ${sans.variable} h-full`}>
      <body className="min-h-full bg-black font-sans text-white antialiased">
        <a href="#main-content" className="skip-link">
          Skip to main content
        </a>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(structuredData),
          }}
        />
        {children}
        <Analytics />
      </body>
    </html>
  );
}
