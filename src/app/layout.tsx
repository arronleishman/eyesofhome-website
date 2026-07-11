import { Analytics } from "@vercel/analytics/next";
import type { Metadata } from "next";
import { Bebas_Neue, Manrope } from "next/font/google";
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

export const metadata: Metadata = {
  title: "Eyes of Home",
  description: "Eyes of Home — official site. Gigs, music, and merch.",
  metadataBase: new URL("https://eyesofhome.com"),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${display.variable} ${sans.variable} h-full`}>
      <body className="min-h-full bg-black font-sans text-white antialiased">
        {children}
        <Analytics />
      </body>
    </html>
  );
}
