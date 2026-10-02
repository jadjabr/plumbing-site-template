"use client";

import { useId, useRef, useState, type KeyboardEvent } from "react";
import { site } from "../lib/site";
import { ArrowRightIcon, PhoneIcon } from "./icons";
import { categories, type Service } from "../lib/services";

const focusRing =
  "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent";

function ServiceCard({ service }: { service: Service }) {
  const { icon: ServiceIcon, name, description, featured } = service;

  if (featured) {
    return (
      <li className="flex flex-col gap-5 rounded-xl border border-accent/40 bg-linear-to-br from-accent/15 via-ink-900/80 to-ink-900/80 p-6 sm:col-span-2 sm:flex-row sm:items-center sm:gap-6 lg:col-span-3">
        <span className="grid size-12 shrink-0 place-items-center rounded-lg bg-accent text-accent-ink">
          <ServiceIcon className="size-6" />
        </span>
        <div className="flex-1">
          {/* Tag sits beside the heading, not inside it, so the heading's
              accessible name is just the service. */}
          <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
            <h3 className="text-lg font-semibold text-white">{name}</h3>
            <span className="rounded-full bg-accent/15 px-2 py-0.5 text-xs font-medium text-accent">
              Available 24/7
            </span>
          </div>
          <p className="mt-1.5 text-sm leading-relaxed text-white/70 sm:text-base">
            {description}
          </p>
        </div>
        <a
          href={site.phone.href}
          className={`inline-flex h-12 shrink-0 items-center justify-center gap-2 rounded-lg bg-accent px-5 text-sm font-semibold text-accent-ink transition-colors hover:bg-accent-hover ${focusRing}`}
        >
          <PhoneIcon className="size-4 shrink-0" />
          <span className="tabular-nums">Call {site.phone.display}</span>
        </a>
      </li>
    );
  }

  return (
    <li className="rounded-xl border border-white/10 bg-ink-900/60 p-6">
      <span className="grid size-11 place-items-center rounded-lg bg-ink-800 text-accent ring-1 ring-white/10">
        <ServiceIcon className="size-5" />
      </span>
      <h3 className="mt-5 text-base font-semibold text-white">{name}</h3>
      <p className="mt-2 text-sm leading-relaxed text-white/60">
        {description}
      </p>
    </li>
  );
}

export default function Services() {
  const [active, setActive] = useState(0);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const baseId = useId();

  // Arrow keys move between tabs (WAI-ARIA tabs pattern, automatic activation).
  const onKeyDown = (e: KeyboardEvent) => {
    const last = categories.length - 1;
    const next =
      e.key === "ArrowRight"
        ? active === last
          ? 0
          : active + 1
        : e.key === "ArrowLeft"
          ? active === 0
            ? last
            : active - 1
          : e.key === "Home"
            ? 0
            : e.key === "End"
              ? last
              : null;
    if (next === null) return;
    e.preventDefault();
    setActive(next);
    tabRefs.current[next]?.focus();
  };

  return (
    <section
      id="services"
      aria-labelledby="services-heading"
      className="bg-ink-950"
    >
      <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-28 lg:px-8">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl">
            <p className="text-sm font-semibold text-accent">Our Services</p>
            <h2
              id="services-heading"
              className="mt-3 text-3xl font-semibold leading-tight tracking-tight text-balance text-white sm:text-4xl lg:text-5xl"
            >
              From a dripping tap to a new commercial build.
            </h2>
            <p className="mt-4 text-base leading-relaxed text-pretty text-white/70 sm:text-lg">
              Licensed plumbers for Edmonton homes and businesses. Choose your
              property type to see what we handle.
            </p>
          </div>

          <div
            role="tablist"
            aria-label="Service type"
            onKeyDown={onKeyDown}
            className="grid shrink-0 grid-cols-2 gap-1 rounded-xl border border-white/10 bg-ink-900/70 p-1 sm:inline-grid sm:self-start lg:self-auto"
          >
            {categories.map((cat, i) => {
              const selected = i === active;
              const TabIcon = cat.icon;
              return (
                <button
                  key={cat.id}
                  ref={(el) => {
                    tabRefs.current[i] = el;
                  }}
                  type="button"
                  role="tab"
                  id={`${baseId}-tab-${cat.id}`}
                  aria-selected={selected}
                  aria-controls={`${baseId}-panel-${cat.id}`}
                  tabIndex={selected ? 0 : -1}
                  onClick={() => setActive(i)}
                  className={`inline-flex h-11 items-center justify-center gap-2 rounded-lg px-5 text-sm font-semibold transition-colors ${focusRing} ${
                    selected
                      ? "bg-ink-700 text-white shadow-[0_0_0_1px_rgb(255_255_255/0.1)_inset]"
                      : "text-white/60 hover:text-white"
                  }`}
                >
                  <TabIcon
                    className={`size-4 shrink-0 ${selected ? "text-accent" : ""}`}
                  />
                  {cat.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Both panels are server-rendered so all services stay crawlable. */}
        {categories.map((cat, i) => (
          <div
            key={cat.id}
            role="tabpanel"
            id={`${baseId}-panel-${cat.id}`}
            aria-labelledby={`${baseId}-tab-${cat.id}`}
            hidden={i !== active}
            tabIndex={0}
            className={`mt-12 rounded-xl sm:mt-14 ${focusRing}`}
          >
            <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {cat.services.map((service) => (
                <ServiceCard key={service.name} service={service} />
              ))}
            </ul>
          </div>
        ))}

        <p className="mt-12 flex flex-col items-center justify-center gap-x-2 gap-y-1 border-t border-white/10 pt-10 text-center text-base text-white/70 sm:flex-row">
          Don&apos;t see what you need?
          <a
            href="#quote"
            className={`group inline-flex items-center gap-1.5 rounded-md font-semibold text-accent transition-colors hover:text-accent-hover ${focusRing}`}
          >
            Get a Free Quote
            <ArrowRightIcon className="size-4 transition-transform group-hover:translate-x-0.5 motion-reduce:transition-none" />
          </a>
        </p>
      </div>
    </section>
  );
}
