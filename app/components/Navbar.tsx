"use client";

import { useEffect, useId, useRef, useState } from "react";
import { site } from "../lib/site";
import { MessageIcon, PhoneIcon } from "./icons";

function MenuIcon({ open }: { open: boolean }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      aria-hidden="true"
      className="size-5"
    >
      {open ? (
        <path d="M6 6l12 12M18 6L6 18" />
      ) : (
        <path d="M4 7h16M4 12h16M4 17h16" />
      )}
    </svg>
  );
}

// Shared button styles (no display utility: each usage sets its own so
// `hidden md:inline-flex` never conflicts). Call and Text are outlined; Get a
// Quote is the only filled accent element so the primary action stands apart.
const focusRing =
  "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent";
const outlineButton = `items-center justify-center gap-2 rounded-lg border border-ink-600 bg-ink-800/60 font-semibold text-white transition-colors hover:border-white/40 hover:bg-ink-700 ${focusRing}`;
const quoteButton = `items-center justify-center rounded-lg bg-accent font-semibold text-accent-ink shadow-[0_0_0_1px_rgb(255_255_255/0.08)_inset] transition-colors hover:bg-accent-hover ${focusRing}`;

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const menuId = useId();
  const toggleRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close the menu on Escape, and when the viewport grows past the breakpoint
  // where the full nav is shown.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "Escape") return;
      setOpen(false);
      // Focus may be on a menu link that's about to be hidden; return it to
      // the toggle so keyboard users don't lose their place.
      toggleRef.current?.focus();
    };
    const wide = window.matchMedia("(min-width: 80rem)");
    const onWide = () => wide.matches && setOpen(false);
    window.addEventListener("keydown", onKey);
    wide.addEventListener("change", onWide);
    return () => {
      window.removeEventListener("keydown", onKey);
      wide.removeEventListener("change", onWide);
    };
  }, [open]);

  const close = () => setOpen(false);

  return (
    <header
      className={`sticky top-0 z-50 border-b backdrop-blur-md transition-[background-color,border-color,box-shadow] duration-300 ${
        scrolled || open
          ? "border-white/10 bg-ink-950/90 shadow-[0_8px_24px_-12px_rgb(0_0_0/0.6)]"
          : "border-transparent bg-ink-950/70"
      }`}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center gap-3 px-4 sm:px-6 lg:h-[4.5rem] lg:px-8">
        {/* Logo */}
        <a
          href="#top"
          onClick={close}
          className={`flex min-h-11 min-w-0 shrink items-center gap-2.5 rounded-md ${focusRing}`}
        >
          <span
            aria-hidden="true"
            className="grid size-9 shrink-0 place-items-center rounded-lg bg-ink-800 text-sm font-bold tracking-tight text-accent ring-1 ring-white/10"
          >
            EP
          </span>
          <span className="flex min-w-0 flex-col leading-tight max-[359px]:sr-only">
            <span className="text-[13px] font-semibold leading-[1.15] tracking-tight text-white sm:truncate sm:text-base sm:leading-tight">
              <span className="block max-w-[5.5rem] sm:hidden">{site.shortName}</span>
              <span className="hidden sm:inline">{site.name}</span>
            </span>
            <span className="hidden truncate text-xs text-white/50 md:block">
              {site.tagline}
            </span>
          </span>
        </a>

        {/* Desktop links */}
        <nav aria-label="Primary" className="ml-auto hidden xl:block">
          <ul className="flex items-center gap-1">
            {site.nav.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className={`rounded-md px-3 py-2 text-sm font-medium text-white/70 transition-colors hover:text-white ${focusRing}`}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        {/* Actions */}
        <div className="ml-auto flex shrink-0 items-center gap-2 xl:ml-4">
          {/* Call is always visible, including when the menu is collapsed. */}
          <a
            href={site.phone.href}
            className={`${outlineButton} inline-flex h-11 px-3 text-sm sm:px-4`}
            aria-label={`Call ${site.phone.display}`}
          >
            <PhoneIcon className="size-4 shrink-0 text-accent" />
            <span className="whitespace-nowrap tabular-nums">
              {site.phone.display}
            </span>
          </a>

          <a
            href={site.sms.href}
            className={`${outlineButton} hidden h-11 px-4 text-sm md:inline-flex`}
          >
            <MessageIcon className="size-4 shrink-0 text-accent" />
            Text Us
          </a>

          <a
            href={site.quoteHref}
            className={`${quoteButton} hidden h-11 px-5 text-sm md:inline-flex`}
          >
            Get a Quote
          </a>

          <button
            ref={toggleRef}
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls={menuId}
            aria-label={open ? "Close menu" : "Open menu"}
            className={`grid size-11 place-items-center rounded-lg text-white/80 transition-colors hover:bg-ink-800 hover:text-white xl:hidden ${focusRing}`}
          >
            <MenuIcon open={open} />
          </button>
        </div>
      </div>

      {/* Mobile / tablet menu */}
      <div
        id={menuId}
        hidden={!open}
        className="border-t border-white/10 bg-ink-950 xl:hidden"
      >
        <nav
          aria-label="Mobile"
          className="mx-auto max-h-[calc(100dvh-4rem)] max-w-7xl overflow-y-auto px-4 pb-6 pt-2 sm:px-6"
        >
          <ul className="divide-y divide-white/5">
            {site.nav.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  onClick={close}
                  className={`block rounded-md px-1 py-3.5 text-base font-medium text-white/80 transition-colors hover:text-white ${focusRing}`}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>

          {/* Text and Quote live here on small screens (they're in the bar from md up). */}
          <div className="mt-4 grid grid-cols-2 gap-3 md:hidden">
            <a
              href={site.sms.href}
              onClick={close}
              className={`${outlineButton} flex h-12 text-base`}
            >
              <MessageIcon className="size-4 shrink-0 text-accent" />
              Text Us
            </a>
            <a
              href={site.quoteHref}
              onClick={close}
              className={`${quoteButton} flex h-12 text-base`}
            >
              Get a Quote
            </a>
          </div>
        </nav>
      </div>
    </header>
  );
}
