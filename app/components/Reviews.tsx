"use client";

import { useEffect, useRef, useState, type Ref } from "react";
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

function ReviewList({
  hidden = false,
  ref,
}: {
  hidden?: boolean;
  ref?: Ref<HTMLUListElement>;
}) {
  return (
    // pr-4 matches gap-4 so both copies are exactly the same width and the
    // loop has no visible seam. The duplicate is hidden from assistive tech,
    // and dropped entirely with reduced motion (no auto-scroll, no loop).
    <ul
      ref={ref}
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

// Auto-scroll speed and how long to wait after a swipe/scroll before resuming.
const SPEED_PX_PER_S = 40;
const RESUME_AFTER_MS = 4000;

export default function Reviews() {
  // Explicit pause control for keyboard/touch users and WCAG 2.2.2. Hover,
  // keyboard focus and touch also pause it temporarily.
  const [paused, setPaused] = useState(false);
  const pausedRef = useRef(paused);
  const scrollerRef = useRef<HTMLDivElement>(null);
  const loopRef = useRef<HTMLUListElement>(null);

  useEffect(() => {
    pausedRef.current = paused;
  }, [paused]);

  // A real scroll container (so touch users can swipe both ways) that a rAF
  // loop nudges forward. Two copies of the list let it wrap seamlessly.
  useEffect(() => {
    const el = scrollerRef.current;
    const loop = loopRef.current;
    if (!el || !loop) return;
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let hovering = false;
    let focused = false;
    let touching = false;
    let visible = false;
    let resumeAt = 0;
    let pos = el.scrollLeft;
    let lastSet = el.scrollLeft;
    let lastT = 0;
    let raf = 0;

    const tick = (t: number) => {
      const dt = lastT ? Math.min(t - lastT, 64) : 0;
      lastT = t;
      // Anything we didn't set ourselves is the user scrolling: follow it
      // and hold off auto-scroll for a moment.
      if (el.scrollLeft !== lastSet) {
        pos = el.scrollLeft;
        resumeAt = t + RESUME_AFTER_MS;
      }
      const running =
        visible && !pausedRef.current && !hovering && !focused && !touching;
      if (running && t >= resumeAt) {
        pos += (SPEED_PX_PER_S * dt) / 1000;
        if (pos >= loop.offsetWidth) pos -= loop.offsetWidth;
        el.scrollLeft = pos;
      }
      lastSet = el.scrollLeft;
      raf = requestAnimationFrame(tick);
    };

    // User scrolls past either end jump by one copy, so it never runs out.
    const onScroll = () => {
      if (el.scrollLeft === lastSet) return;
      const w = loop.offsetWidth;
      if (el.scrollLeft >= w) el.scrollLeft -= w;
      else if (el.scrollLeft < 1) el.scrollLeft += w;
    };

    const on = <K extends keyof HTMLElementEventMap>(
      type: K,
      fn: (e: HTMLElementEventMap[K]) => void,
    ) => {
      el.addEventListener(type, fn, { passive: true });
      return () => el.removeEventListener(type, fn);
    };
    const offs = [
      on("scroll", onScroll),
      on("pointerenter", (e) => {
        if (e.pointerType === "mouse") hovering = true;
      }),
      on("pointerleave", () => (hovering = false)),
      on("focusin", () => (focused = true)),
      on("focusout", () => (focused = false)),
      on("touchstart", () => (touching = true)),
      on("touchend", () => {
        touching = false;
        resumeAt = performance.now() + RESUME_AFTER_MS;
      }),
    ];
    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
    });
    io.observe(el);
    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
      offs.forEach((off) => off());
    };
  }, []);

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

      {/* Auto-scrolling row: swipe/scroll it freely, it pauses on hover, focus
          or touch and resumes after a few seconds. With reduced motion it's a
          plain snap-scrolling row. Edge fades are overlays (not a mask) so the
          focus ring isn't clipped. */}
      <div className="relative mt-12 sm:mt-14">
        <div
          ref={scrollerRef}
          role="region"
          aria-label="Customer reviews"
          tabIndex={0}
          className={`overflow-x-auto overscroll-x-contain py-1 [scrollbar-width:none] motion-reduce:snap-x motion-reduce:snap-mandatory motion-reduce:scroll-px-4 motion-reduce:px-4 [&::-webkit-scrollbar]:hidden ${focusRing} focus-visible:outline-offset-[-2px]`}
        >
          <div className="flex w-max items-stretch">
            <ReviewList ref={loopRef} />
            <ReviewList hidden />
          </div>
        </div>
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-y-0 left-0 w-8 bg-linear-to-r from-[color-mix(in_srgb,var(--color-ink-900)_40%,var(--color-ink-950))] to-transparent sm:w-16 motion-reduce:hidden"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-y-0 right-0 w-8 bg-linear-to-l from-[color-mix(in_srgb,var(--color-ink-900)_40%,var(--color-ink-950))] to-transparent sm:w-16 motion-reduce:hidden"
        />
      </div>

      <div className="mx-auto flex max-w-7xl justify-end px-4 pt-6 pb-20 sm:px-6 sm:pb-28 lg:px-8">
        <button
          type="button"
          onClick={() => setPaused((p) => !p)}
          className={`inline-flex h-11 items-center gap-2 rounded-lg border border-ink-600 bg-ink-800/60 px-4 text-sm font-semibold text-white/80 transition-colors hover:border-white/40 hover:bg-ink-700 hover:text-white motion-reduce:hidden ${focusRing}`}
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
