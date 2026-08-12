"use client";

import Image from "next/image";
import { Clock, Phone } from "lucide-react";
import { LOGO_HREF, PHONE_DISPLAY, PHONE_TEL, PRACTICE } from "@/lib/lp.config";

/**
 * Minimal landing-page header, light theme. No navigation by design - the only
 * interactive element is the phone number, which is the page's primary
 * conversion. Sticky on every breakpoint so the call button is always one tap
 * away.
 *
 * The logo is the full petrol wordmark on transparent, so it sits directly on
 * the light bar with no chip and the practice name is not repeated as text.
 */
export default function LpHeader() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-beige/80 bg-white/90 backdrop-blur-md">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between gap-3 px-3 py-2.5 sm:px-6 sm:py-3">
        {/* Brand - links to this campaign's own root. Same tab: it is a
            self-link, so a new tab would just duplicate the current page. */}
        <a
          href={LOGO_HREF}
          data-cta="header-logo"
          aria-label={`${PRACTICE.name} - emergency dentist in ${PRACTICE.city}, ${PRACTICE.state}`}
          className="flex min-w-0 items-center rounded-md transition-opacity hover:opacity-80 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary"
        >
          <Image
            src="/logo.svg"
            alt={`${PRACTICE.name} - ${PRACTICE.city}, ${PRACTICE.state}`}
            width={1282}
            height={321}
            priority
            className="h-8 w-auto sm:h-10"
          />
        </a>

        <div className="flex shrink-0 items-center gap-3">
          {/* Reassurance microtext - desktop only, keeps the bar from feeling bare */}
          <span className="hidden items-center gap-1.5 text-[12px] font-medium text-navy/60 lg:inline-flex">
            <Clock className="h-3.5 w-3.5 shrink-0 text-primary" strokeWidth={2.2} aria-hidden />
            Same-day appointments
          </span>

          <a
            href={PHONE_TEL}
            data-cta="header-call"
            className="inline-flex shrink-0 items-center gap-1.5 rounded-full bg-urgent px-3.5 py-2 text-[12.5px] font-bold text-white shadow-[0_8px_20px_-6px_rgba(15,138,109,0.5)] transition-colors hover:bg-urgent-dark focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-urgent sm:gap-2 sm:px-4 sm:py-2.5 sm:text-[13.5px]"
          >
            <Phone className="h-3.5 w-3.5 shrink-0" strokeWidth={2.6} aria-hidden />
            <span className="hidden sm:inline">{PHONE_DISPLAY}</span>
            <span className="sm:hidden">Call now</span>
          </a>
        </div>
      </div>
    </header>
  );
}
