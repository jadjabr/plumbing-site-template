"use client";

import { useState } from "react";
import { site } from "../lib/site";
import { PauseIcon, PlayIcon, StarIcon } from "./icons";

type Review = { quote: string; name: string; detail: string };

// PLACEHOLDER REVIEWS for layout only. Replace with the client's real,
// verifiable reviews before launch. Publishing invented testimonials is
// misleading advertising (Competition Act in Canada, FTC rules in the US).
const reviews: Review[] = [
  {
    quote:
      "Called at 11 p.m. with water coming through the ceiling. A plumber was here in under an hour and had the burst pipe fixed before midnight.",
    name: "Sarah M.",
    detail: "Emergency repair · Terwillegar",
  },
  {
    quote:
      "They quoted a price up front and the invoice matched it to the dollar. Refreshing after dealing with other companies.",
    name: "Daniel K.",
    detail: "Leak repair · Mill Woods",
  },
  {
    quote:
      "Our water heater died on a Sunday. New one was in by Monday morning, and they cleaned up so well you'd never know they'd been here.",
    name: "Priya S.",
    detail: "Water heater · Windermere",
  },
  {
    quote:
      "Fixed a drain two other plumbers couldn't sort out, on the first visit. He showed me the camera footage and explained exactly what was wrong.",
    name: "Mark T.",
    detail: "Drain cleaning · Glenora",
  },
  {
    quote:
      "They handle grease traps and backflow testing for all three of our restaurants. Always on schedule, and they work around our service hours.",
    name: "Jen L.",
    detail: "Commercial maintenance · Oliver",
  },
  {
    quote:
      "Wore shoe covers, protected the floors and left the bathroom cleaner than they found it. New toilet and vanity look great.",
    name: "Robert H.",
    detail: "Fixture install · Summerside",
  },
  {
    quote:
      "Sump pump quit during the spring melt. They picked up on the first ring and had a replacement running that afternoon. Saved our basement.",
    name: "Amanda W.",
    detail: "Sump pump · St. Albert",
  },
  {
    quote:
      "Fair price, no upselling, and a text when the tech was on the way. Exactly how a service call should go.",
    name: "Chris B.",
    detail: "Faucet repair · Ritchie",
  },
];

const focusRing =
  "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent";

function Stars({ className = "size-4" }: { className?: string }) {
  return (
    <span role="img" aria-label="5 out of 5 stars" className="flex gap-0.5">
      {Array.from({ length: 5 }, (_, i) => (
        <StarIcon key={i} className={`${className} fill-current text-accent`} />
      ))}
    </span>
  );
}

function ReviewList({ hidden = false }: { hidden?: boolean }) {
  return (
    // pr-4 matches gap-4 so both copies are exactly the same width and the
    // -50% loop has no visible seam. The duplicate is hidden from assistive
    // tech, and dropped entirely when the marquee is replaced by manual scroll.
    <ul
      aria-hidden={hidden || undefined}
      className={`flex shrink-0 gap-4 pr-4 ${hidden ? "motion-reduce:hidden" : ""}`}
    >
      {reviews.map((review) => (
        <li
          key={review.name}
          className="flex w-[18rem] shrink-0 snap-start sm:w-[22rem]"
        >
          <figure className="flex w-full flex-col rounded-xl border border-white/10 bg-ink-900/60 p-6">
            <Stars />
            <blockquote className="mt-4 flex-1 text-base leading-relaxed text-pretty text-white/80">
              <p>&ldquo;{review.quote}&rdquo;</p>
            </blockquote>
            <figcaption className="mt-6 border-t border-white/10 pt-4">
              <p className="font-semibold text-white">{review.name}</p>
              <p className="mt-0.5 text-sm text-white/50">{review.detail}</p>
            </figcaption>
          </figure>
        </li>
      ))}
    </ul>
  );
}

export default function Reviews() {
  // Explicit pause control for keyboard/touch users and WCAG 2.2.2;
  // mouse users also get pause-on-hover.
  const [paused, setPaused] = useState(false);

  return (
    <section
      id="reviews"
      aria-labelledby="reviews-heading"
      className="overflow-hidden border-t border-white/10 bg-ink-900/40"
    >
      <div className="mx-auto max-w-7xl px-4 pt-20 sm:px-6 sm:pt-28 lg:px-8">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl">
            <p className="text-sm font-semibold text-accent">Reviews</p>
            <h2
              id="reviews-heading"
              className="mt-3 text-3xl font-semibold leading-tight tracking-tight text-balance text-white sm:text-4xl lg:text-5xl"
            >
              What our customers say.
            </h2>
            <p className="mt-4 text-base leading-relaxed text-pretty text-white/70 sm:text-lg">
              Homeowners and businesses across Edmonton on what it&apos;s like
              to work with us.
            </p>
          </div>

          <div className="flex shrink-0 items-center gap-4 self-start rounded-xl border border-white/10 bg-ink-900/60 px-5 py-4 lg:self-auto">
            <p className="text-4xl font-semibold tracking-tight text-white tabular-nums">
              {site.rating.score}
            </p>
            <div>
              <Stars className="size-5" />
              <p className="mt-1 text-sm text-white/60">
                Based on {site.rating.count}+ reviews
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Marquee. Full-bleed with faded edges; pauses on hover (mouse), on tap
          (touch; Tailwind's hover: doesn't fire there), or via the button
          below. With reduced motion it becomes a swipeable snap-scrolling row. */}
      <div
        onPointerUp={(e) => {
          if (e.pointerType === "touch") setPaused((p) => !p);
        }}
        className="group mt-12 [mask-image:linear-gradient(to_right,transparent,black_6%,black_94%,transparent)] motion-reduce:overflow-x-auto motion-reduce:snap-x motion-reduce:snap-mandatory motion-reduce:px-4 motion-reduce:[mask-image:none] sm:mt-14"
      >
        <div
          className="flex w-max items-stretch py-1 animate-marquee [--marquee-duration:70s] group-hover:[animation-play-state:paused] motion-reduce:animate-none"
          // Inline so it isn't overridden by the animate-marquee shorthand.
          style={paused ? { animationPlayState: "paused" } : undefined}
        >
          <ReviewList />
          <ReviewList hidden />
        </div>
      </div>

      <div className="mx-auto flex max-w-7xl justify-end px-4 pt-6 pb-20 sm:px-6 sm:pb-28 lg:px-8">
        <button
          type="button"
          onClick={() => setPaused((p) => !p)}
          className={`inline-flex h-10 items-center gap-2 rounded-lg border border-ink-600 bg-ink-800/60 px-4 text-sm font-semibold text-white/80 transition-colors hover:border-white/40 hover:bg-ink-700 hover:text-white motion-reduce:hidden ${focusRing}`}
        >
          {paused ? (
            <PlayIcon className="size-4 shrink-0 text-accent" />
          ) : (
            <PauseIcon className="size-4 shrink-0 text-accent" />
          )}
          {paused ? "Play reviews" : "Pause reviews"}
        </button>
      </div>
    </section>
  );
}
