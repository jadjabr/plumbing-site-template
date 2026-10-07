import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { areas } from "./lib/areas";
import { categories } from "./lib/services";
import { site } from "./lib/site";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// Set NEXT_PUBLIC_SITE_URL to the client's real domain. Without it, Vercel
// deploys fall back to the project's production domain (not VERCEL_URL, which
// is the per-deployment *.vercel.app address).
const siteUrl = new URL(
  process.env.NEXT_PUBLIC_SITE_URL ??
    (process.env.VERCEL_PROJECT_PRODUCTION_URL
      ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
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
    // og:image comes from app/opengraph-image.tsx (generated 1200×630 card).
    locale: "en_CA",
    type: "website",
  },
};

const websiteId = new URL("/#website", siteUrl).href;
const businessId = new URL("/#business", siteUrl).href;

// Service-area business: no street address (customers aren't served at a
// storefront), so the address stops at city level and coverage is described
// by areaServed. No `geo` for the same reason, and no review/rating markup:
// the on-page reviews are placeholders.
// [PLACEHOLDER] Values in [BRACKETS] must be replaced with the client's real
// details before launch.
const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      "@id": websiteId,
      url: siteUrl.href,
      name: site.name,
      alternateName: site.shortName,
      inLanguage: "en-CA",
      publisher: { "@id": businessId },
    },
    {
      "@type": "Plumber",
      "@id": businessId,
      name: site.name,
      description,
      url: siteUrl.href,
      image: new URL(site.heroImage, siteUrl).href,
      logo: `${siteUrl.origin}/[LOGO].png`,
      telephone: site.phone.href.replace("tel:", ""),
      email: site.email,
      priceRange: "[e.g. $$]",
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
      // Open 24/7.
      openingHoursSpecification: [
        {
          "@type": "OpeningHoursSpecification",
          dayOfWeek: [
            "Monday",
            "Tuesday",
            "Wednesday",
            "Thursday",
            "Friday",
            "Saturday",
            "Sunday",
          ],
          opens: "00:00",
          closes: "23:59",
        },
      ],
      sameAs: [
        "[REAL FACEBOOK PROFILE URL]",
        "[REAL INSTAGRAM PROFILE URL]",
        "[GOOGLE BUSINESS PROFILE URL]",
      ],
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: "Plumbing services",
        itemListElement: categories.flatMap((category) =>
          category.services.map((service) => ({
            "@type": "Offer",
            itemOffered: { "@type": "Service", name: service.name },
          })),
        ),
      },
    },
  ],
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
