// Business details used across the site. Swap these when reskinning for a client.
export const site = {
  name: "Edmonton Plumbing Services",
  shortName: "Edmonton Plumbing",
  tagline: "Licensed & insured · 24/7 emergency service",
  phone: {
    display: "(780) 555-0123",
    href: "tel:+17805550123",
  },
  sms: {
    href: "sms:+17805550123",
  },
  // [PLACEHOLDER] Replace with the client's real address.
  email: "info@example.com",
  // [PLACEHOLDER URLS] Replace with the client's real profiles.
  social: {
    facebook: "https://www.facebook.com/",
    instagram: "https://www.instagram.com/",
  },
  quoteHref: "#quote",
  // Placeholders — replace with the client's real figures.
  yearsExperience: 15,
  jobsCompleted: "5,000",
  rating: { score: "4.9", count: "200" },
  heroImage: "/images/hero-placeholder.jpg",
  teamImage: "/images/team-placeholder.jpg",
  nav: [
    { label: "Services", href: "#services" },
    { label: "About", href: "#about" },
    { label: "Reviews", href: "#reviews" },
    { label: "Service Area", href: "#service-area" },
    { label: "FAQ", href: "#faq" },
    { label: "Contact", href: "#contact" },
  ],
} as const;
