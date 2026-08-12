"use client";

import { Clock, MapPin, Navigation } from "lucide-react";
import ReviewNote from "./ReviewNote";
import { Reveal, Section, SectionHeading } from "./Section";
import { HOURS } from "@/lib/content";
import { PRACTICE, SHOW_REVIEW_NOTES } from "@/lib/lp.config";

export default function LocationBlock() {
  return (
    <Section id="location" className="bg-beige-light">
      <SectionHeading
        eyebrow="Getting here"
        title="Find us in Southampton"
      />

      {/* items-stretch (the grid default) plus h-full on both children makes
          the two columns share a height that the taller one - the address and
          hours card - decides. The map then fills whatever that turns out to
          be, so the row stays square however the hours list grows. */}
      <div className="mt-8 grid gap-4 lg:grid-cols-[1.15fr_0.85fr] lg:gap-6">
        {/* Map */}
        <Reveal className="min-w-0 lg:h-full">
          {/* Live Google Maps embed - no API key needed for the /maps/embed
              endpoint, and lazy-loaded so it never blocks LCP.

              A fixed aspect ratio on mobile, but on lg+ the height is handed
              over to the grid so it matches the card beside it exactly. */}
          {/* data-lenis-prevent: Lenis must not hijack scroll gestures that
              start inside the map, or zooming and panning break. */}
          <div
            data-lenis-prevent
            className="relative aspect-[4/3] w-full overflow-hidden rounded-3xl ring-1 ring-beige-dark/60 sm:aspect-[16/10] lg:aspect-auto lg:h-full lg:min-h-[520px]"
          >
            <iframe
              title="Map showing Hampton Family Dental at 283 Second Street Pike, Suite 140, Southampton, PA 18966"
              src="https://www.google.com/maps?q=283+Second+Street+Pike,+Suite+140,+Southampton,+PA+18966&output=embed"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="absolute inset-0 h-full w-full border-0"
            />
          </div>
        </Reveal>

        {/* Address + hours */}
        <Reveal delay={0.08} className="min-w-0 lg:h-full">
          <div className="h-full min-w-0 rounded-3xl border border-beige-dark/50 bg-white p-4 sm:p-6">
            <h3 className="font-heading text-[18px] leading-snug text-navy sm:text-[20px]">
              {PRACTICE.name}
            </h3>

            <address className="mt-3 flex gap-2.5 not-italic">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-primary" strokeWidth={2.2} aria-hidden />
              <span className="min-w-0 text-[14px] leading-relaxed text-navy/75">
                {PRACTICE.street}
                <br />
                {PRACTICE.city}, {PRACTICE.state} {PRACTICE.zip}
              </span>
            </address>

            <p className="mt-3 text-[12.5px] leading-relaxed text-navy/50">
              {PRACTICE.serving}
            </p>

            <a
              href={PRACTICE.mapsQuery}
              target="_blank"
              rel="noopener noreferrer"
              data-cta="location-directions"
              className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-navy px-4 py-3 text-[14px] font-bold text-white transition-colors hover:bg-navy-dark"
            >
              <Navigation className="h-3.5 w-3.5 shrink-0" strokeWidth={2.6} aria-hidden />
              Get directions
            </a>

            <div className="mt-6 border-t border-beige pt-4">
              <h4 className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.16em] text-primary">
                <Clock className="h-3.5 w-3.5 shrink-0" strokeWidth={2.4} aria-hidden />
                Opening hours
              </h4>

              <dl className="mt-3 space-y-0">
                {HOURS.map((row) => (
                  <div
                    key={row.day}
                    className="flex items-baseline justify-between gap-3 border-b border-dashed border-beige py-2 last:border-b-0"
                  >
                    <dt className="min-w-0 shrink-0 text-[13px] font-medium text-navy/70">
                      {row.day}
                    </dt>
                    <dd
                      // Amber here was review-note styling. With the notes off,
                      // "Call for hours" is real public copy, so it takes the
                      // page's own muted tone rather than flagging itself.
                      className={`min-w-0 text-right text-[13px] tabular-nums ${
                        row.confirm
                          ? "font-medium text-navy/60"
                          : "font-semibold text-navy"
                      }`}
                    >
                      {row.confirm && !SHOW_REVIEW_NOTES ? "Call for hours" : row.time}
                    </dd>
                  </div>
                ))}
              </dl>

              <ReviewNote>
                [CONFIRM] Wednesday and Fri–Sun hours with the office. Until they
                are confirmed the schema below omits those days rather than
                guessing - wrong hours in structured data send emergency patients
                to a locked door.
              </ReviewNote>
            </div>
          </div>
        </Reveal>
      </div>
    </Section>
  );
}
