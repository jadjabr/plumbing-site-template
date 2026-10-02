import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { areas } from "./lib/areas";
import { site } from "./lib/site";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// Placeholder until deployed: set NEXT_PUBLIC_SITE_URL to the real domain.
const siteUrl = new URL(
  process.env.NEXT_PUBLIC_SITE_URL ??
    (process.env.VERCEL_URL
      ? `https://${process.env.VERCEL_URL}`
      : "http://localhost:3000"),
);

const title = `${site.name} | 24/7 Plumber in Edmonton, AB`;
const description = `Locally owned Edmonton plumbers with ${site.yearsExperience}+ years serving homes and businesses across Greater Edmonton. Licensed journeyperson plumbers, upfront flat-rate pricing and 24/7 emergency service.`;

export const metadata: Metadata = {
  metadataBase: siteUrl,
  title,
  description,
  openGraph: {
    title,
    description,
    url: "/",
    siteName: site.name,
    images: [
      {
        url: site.heroImage,
        width: 2400,
        height: 1500,
        alt: `${site.name}, 24/7 plumbing across Greater Edmonton`,
      },
    ],
    locale: "en_CA",
    type: "website",
  },
};

// Service-area business: no street address (customers aren't served at a
// storefront), so the address stops at city level and coverage is described
// by areaServed. Add `sameAs` with the real social profile URLs once known.
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Plumber",
  name: site.name,
  description,
  url: siteUrl.href,
  image: new URL(site.heroImage, siteUrl).href,
  telephone: site.phone.href.replace("tel:", ""),
  email: site.email,
  address: {
    "@type": "PostalAddress",
    addressLocality: "Edmonton",
    addressRegion: "AB",
    addressCountry: "CA",
  },
  areaServed: areas.map((area) => ({
    "@type": "City",
    name: area.name,
    containedInPlace: { "@type": "AdministrativeArea", name: "Alberta" },
  })),
  openingHours: ["Mo-Su 00:00-23:59"],
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body id="top" className="min-h-full flex flex-col">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
          }}
        />
        {children}
      </body>
    </html>
  );
}
