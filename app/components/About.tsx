import Image from "next/image";
import { site } from "../lib/site";
import { MapPinIcon, ShieldCheckIcon, ClockIcon, TagIcon } from "./icons";

// Differentiators. Placeholder claims: confirm each one with the client
// before launch (especially "no overtime charges").
const differentiators = [
  {
    icon: TagIcon,
    title: "Upfront, flat-rate pricing",
    text: "You approve the price before we start. No surprises on the invoice.",
  },
  {
    icon: ShieldCheckIcon,
    title: "Licensed journeyperson plumbers",
    text: "Certified, insured and background-checked technicians on every job.",
  },
  {
    icon: ClockIcon,
    title: "No overtime charges",
    text: "The same fair rate on nights, weekends and holidays.",
  },
];

const stats = [
  { value: `${site.yearsExperience}+`, label: "Years serving Edmonton" },
  { value: `${site.jobsCompleted}+`, label: "Jobs completed" },
  { value: "24/7", label: "Emergency availability" },
];

export default function About({
  imageSide = "left",
}: {
  // Flip the photo to the right to alternate with neighbouring sections.
  imageSide?: "left" | "right";
}) {
  return (
    <section
      id="about"
      aria-labelledby="about-heading"
      className="border-t border-white/10 bg-ink-950"
    >
      <div className="mx-auto grid max-w-7xl items-center gap-12 px-4 py-20 sm:px-6 sm:py-28 lg:grid-cols-2 lg:gap-16 lg:px-8">
        {/* Photo */}
        <div
          className={`relative mx-auto w-full max-w-xl lg:max-w-none ${
            imageSide === "right" ? "lg:order-last" : ""
          }`}
        >
          <div className="relative aspect-4/3 overflow-hidden rounded-2xl border border-white/10 bg-ink-900 shadow-[0_24px_60px_-30px_rgb(0_0_0/0.8)] sm:aspect-5/4 lg:aspect-4/5">
            <Image
              src={site.teamImage}
              alt={`The ${site.name} team`}
              fill
              sizes="(min-width: 1024px) 40rem, (min-width: 640px) 36rem, 100vw"
              className="object-cover"
            />
            <div
              aria-hidden="true"
              className="absolute inset-x-0 bottom-0 h-1/3 bg-linear-to-t from-ink-950/80 to-transparent"
            />
            <p className="absolute bottom-4 left-4 inline-flex items-center gap-2 rounded-full border border-white/10 bg-ink-900/80 px-3 py-1.5 text-xs font-medium text-white/85 backdrop-blur-sm sm:bottom-6 sm:left-6 sm:text-sm">
              <MapPinIcon className="size-4 shrink-0 text-accent" />
              Locally owned &amp; operated in Edmonton
            </p>
          </div>
        </div>

        {/* Content */}
        <div>
          <p className="text-sm font-semibold text-accent">About Us</p>
          <h2
            id="about-heading"
            className="mt-3 text-3xl font-semibold leading-tight tracking-tight text-balance text-white sm:text-4xl lg:text-5xl"
          >
            Edmonton&apos;s trusted plumbing experts.
          </h2>

          <div className="mt-6 space-y-4 text-base leading-relaxed text-pretty text-white/70 sm:text-lg">
            <p>
              For {site.yearsExperience}+ years we&apos;ve kept Edmonton homes
              and businesses running, from 3&nbsp;a.m. calls during a January
              cold snap to planned renovations and new builds.
            </p>
            <p>
              We&apos;re locally owned and operated, not a franchise or a call
              centre. When you call, you reach a local team that knows the
              neighbourhoods, the older homes and what a &minus;30° winter does
              to pipes.
            </p>
          </div>

          <ul className="mt-8 space-y-4">
            {differentiators.map(({ icon: ItemIcon, title, text }) => (
              <li key={title} className="flex gap-4">
                <span className="grid size-11 shrink-0 place-items-center rounded-lg bg-ink-800 text-accent ring-1 ring-white/10">
                  <ItemIcon className="size-5" />
                </span>
                <div>
                  <p className="font-semibold text-white">{title}</p>
                  <p className="mt-1 text-sm leading-relaxed text-white/60">
                    {text}
                  </p>
                </div>
              </li>
            ))}
          </ul>

          <dl className="mt-10 grid grid-cols-3 divide-x divide-white/10 rounded-xl border border-white/10 bg-ink-900/60">
            {stats.map(({ value, label }) => (
              <div
                key={label}
                className="flex flex-col-reverse justify-end gap-1 px-3 py-5 text-center sm:px-5"
              >
                <dt className="text-xs leading-snug text-white/60 sm:text-sm">
                  {label}
                </dt>
                <dd className="text-2xl font-semibold tracking-tight text-white tabular-nums sm:text-3xl">
                  {value}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}
