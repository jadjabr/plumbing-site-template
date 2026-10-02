import Image from "next/image";
import type { ComponentType } from "react";
import { site } from "../lib/site";
import {
  ArrowRightIcon,
  ClockIcon,
  PhoneIcon,
  ShieldCheckIcon,
  StarIcon,
  WrenchIcon,
} from "./icons";

// Matches the Navbar's focus + button language, sized up for the hero. Here
// Call Now is the filled accent (emergency visitors should call first) and the
// quote button is the outlined secondary.
const focusRing =
  "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent";

const badges: { icon: ComponentType<{ className?: string }>; label: string }[] =
  [
    { icon: ShieldCheckIcon, label: "Licensed & Insured" },
    { icon: ClockIcon, label: "24/7 Emergency Service" },
    { icon: WrenchIcon, label: `${site.yearsExperience}+ Years Experience` },
    { icon: StarIcon, label: "5-Star Rated" },
  ];

export default function Hero() {
  return (
    <section
      aria-labelledby="hero-heading"
      className="relative isolate overflow-hidden bg-ink-950"
    >
      {/* Background photo + overlays */}
      <Image
        src={site.heroImage}
        alt=""
        fill
        sizes="100vw"
        loading="eager"
        fetchPriority="high"
        className="-z-20 object-cover object-center"
      />
      {/* Solid-ish wash on mobile; left-weighted gradient on desktop so the
          photo shows through on the right while text stays readable. */}
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-ink-950/80 lg:bg-transparent lg:bg-linear-to-r lg:from-ink-950 lg:via-ink-950/85 lg:to-ink-950/30"
      />
      <div
        aria-hidden="true"
        className="absolute inset-x-0 bottom-0 -z-10 h-40 bg-linear-to-t from-ink-950 to-transparent"
      />

      <div className="mx-auto flex min-h-[calc(100svh-4rem)] max-w-7xl flex-col justify-center px-4 py-16 sm:px-6 sm:py-24 lg:min-h-[calc(100svh-4.5rem)] lg:px-8">
        <div className="max-w-2xl">
          <p className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-ink-900/70 px-3 py-1 text-xs font-medium text-white/70 backdrop-blur-sm sm:text-sm">
            <span className="relative flex size-2">
              <span className="absolute inline-flex size-full animate-ping rounded-full bg-accent opacity-60 motion-reduce:hidden" />
              <span className="relative inline-flex size-2 rounded-full bg-accent" />
            </span>
            Plumbers on call now across Edmonton
          </p>

          <h1
            id="hero-heading"
            className="mt-6 text-4xl font-semibold leading-[1.05] tracking-tight text-balance text-white sm:text-5xl lg:text-6xl xl:text-7xl"
          >
            Fast, reliable plumbing.{" "}
            <span className="text-accent">Day or night.</span>
          </h1>

          <p className="mt-6 max-w-xl text-base leading-relaxed text-pretty text-white/70 sm:text-lg">
            Burst pipe at 2&nbsp;a.m.? Commercial job on a deadline? We answer
            24/7 emergency calls and show up ready to fix it, for homes and
            businesses alike, with upfront pricing.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <a
              href={site.phone.href}
              className={`inline-flex h-14 items-center justify-center gap-3 rounded-lg bg-accent px-7 text-base font-semibold text-accent-ink shadow-[0_0_0_1px_rgb(255_255_255/0.08)_inset,0_10px_30px_-10px_var(--color-accent)] transition-colors hover:bg-accent-hover ${focusRing}`}
            >
              <PhoneIcon className="size-5 shrink-0" />
              <span>Call Now</span>
              <span
                aria-hidden="true"
                className="h-5 w-px bg-accent-ink/25 max-[359px]:hidden"
              />
              <span className="tabular-nums max-[359px]:sr-only">{site.phone.display}</span>
            </a>
            <a
              href={site.quoteHref}
              className={`group inline-flex h-14 items-center justify-center gap-2 rounded-lg border border-ink-600 bg-ink-800/60 px-7 text-base font-semibold text-white backdrop-blur-sm transition-colors hover:border-white/40 hover:bg-ink-700 ${focusRing}`}
            >
              Get a Free Quote
              <ArrowRightIcon className="size-4 transition-transform group-hover:translate-x-0.5 motion-reduce:transition-none" />
            </a>
          </div>
        </div>

        {/* Trust badges */}
        <ul className="mt-12 grid max-w-3xl grid-cols-2 gap-3 sm:mt-14 lg:flex lg:flex-wrap">
          {badges.map(({ icon: BadgeIcon, label }) => (
            <li
              key={label}
              className="flex items-center gap-2.5 rounded-lg border border-white/10 bg-ink-900/60 px-3 py-2.5 text-sm font-medium text-white/85 backdrop-blur-sm"
            >
              <BadgeIcon className="size-4 shrink-0 text-accent" />
              {label}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
