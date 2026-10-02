import { RADIUS_KM } from "../lib/areas";
import { site } from "../lib/site";
import {
  ClockIcon,
  FacebookIcon,
  InstagramIcon,
  MailIcon,
  MapPinIcon,
  PhoneIcon,
  ShieldCheckIcon,
} from "./icons";

const quickLinks = [
  { label: "Services", href: "#services" },
  { label: "About", href: "#about" },
  { label: "Reviews", href: "#reviews" },
  { label: "Service Area", href: "#service-area" },
  { label: "FAQ", href: "#faq" },
  { label: "Get a Quote", href: site.quoteHref },
];

const socials = [
  { label: "Facebook", href: site.social.facebook, icon: FacebookIcon },
  { label: "Instagram", href: site.social.instagram, icon: InstagramIcon },
];

const focusRing =
  "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent";

const columnHeading = "text-sm font-semibold text-white";

export default function Footer() {
  return (
    // id="contact" is the target of the Navbar's Contact link.
    <footer
      id="contact"
      aria-labelledby="footer-heading"
      className="border-t border-white/10 bg-ink-950"
    >
      <h2 id="footer-heading" className="sr-only">
        Contact {site.name}
      </h2>

      <div className="mx-auto grid max-w-7xl gap-12 px-4 py-16 sm:px-6 sm:py-20 lg:grid-cols-12 lg:gap-8 lg:px-8">
        {/* Brand */}
        <div className="lg:col-span-5">
          <a
            href="#top"
            className={`inline-flex items-center gap-2.5 rounded-md ${focusRing}`}
          >
            <span
              aria-hidden="true"
              className="grid size-9 shrink-0 place-items-center rounded-lg bg-ink-800 text-sm font-bold tracking-tight text-accent ring-1 ring-white/10"
            >
              EP
            </span>
            <span className="text-base font-semibold tracking-tight text-white">
              {site.name}
            </span>
          </a>
          <p className="mt-4 max-w-sm text-sm leading-relaxed text-white/60">
            Fast, reliable plumbing for Edmonton homes and businesses. Upfront
            pricing, licensed plumbers and real people answering the phone, day
            or night.
          </p>

          <ul className="mt-6 flex flex-wrap gap-2">
            {[
              { icon: ShieldCheckIcon, label: "Licensed & Insured" },
              { icon: ClockIcon, label: "24/7 Emergency Service" },
            ].map(({ icon: BadgeIcon, label }) => (
              <li
                key={label}
                className="inline-flex items-center gap-2 rounded-lg border border-white/10 bg-ink-900/60 px-3 py-2 text-sm font-medium text-white/85"
              >
                <BadgeIcon className="size-4 shrink-0 text-accent" />
                {label}
              </li>
            ))}
          </ul>

          <ul className="mt-6 flex gap-2">
            {socials.map(({ label, href, icon: SocialIcon }) => (
              <li key={label}>
                <a
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${site.name} on ${label} (opens in a new tab)`}
                  className={`grid size-10 place-items-center rounded-lg bg-ink-800 text-white/70 ring-1 ring-white/10 transition-colors hover:bg-ink-700 hover:text-accent ${focusRing}`}
                >
                  <SocialIcon className="size-5" />
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Quick links */}
        <nav aria-labelledby="footer-links-heading" className="lg:col-span-3">
          <h3 id="footer-links-heading" className={columnHeading}>
            Quick Links
          </h3>
          <ul className="mt-4 grid grid-cols-2 gap-x-6 gap-y-1 lg:grid-cols-1">
            {quickLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className={`inline-block rounded-md py-1.5 text-sm text-white/60 transition-colors hover:text-white ${focusRing}`}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        {/* Contact */}
        <div className="lg:col-span-4">
          <h3 className={columnHeading}>Contact</h3>
          <address className="mt-4 space-y-4 not-italic">
            <a
              href={site.phone.href}
              className={`group flex items-start gap-3 rounded-md ${focusRing}`}
            >
              <PhoneIcon className="mt-0.5 size-4 shrink-0 text-accent" />
              <span>
                <span className="block text-base font-semibold text-white tabular-nums transition-colors group-hover:text-accent-hover">
                  {site.phone.display}
                </span>
                <span className="text-sm text-white/50">
                  Call or text, 24/7
                </span>
              </span>
            </a>
            <a
              href={`mailto:${site.email}`}
              className={`group flex items-start gap-3 rounded-md ${focusRing}`}
            >
              <MailIcon className="mt-0.5 size-4 shrink-0 text-accent" />
              <span className="min-w-0 break-words text-sm text-white/70 transition-colors group-hover:text-white">
                {site.email}
              </span>
            </a>
            <p className="flex items-start gap-3">
              <MapPinIcon className="mt-0.5 size-4 shrink-0 text-accent" />
              <span className="text-sm leading-relaxed text-white/60">
                Serving Edmonton and communities within ~{RADIUS_KM}&nbsp;km.{" "}
                <a
                  href="#service-area"
                  className={`rounded font-medium text-accent transition-colors hover:text-accent-hover ${focusRing}`}
                >
                  See our service area
                </a>
              </span>
            </p>
          </address>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-7xl flex-col gap-2 px-4 py-6 text-sm text-white/45 sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
          <p>
            &copy; {new Date().getFullYear()} {site.name}. All rights reserved.
          </p>
          <p>Licensed &amp; insured plumbing in Greater Edmonton.</p>
        </div>
      </div>
    </footer>
  );
}
