"use client";

import ImageSlot from "./ImageSlot";
import ReviewNote from "./ReviewNote";
import { Reveal, Section, SectionHeading } from "./Section";

const DENTISTS = [
  {
    name: "Dr. Jeffrey Brenner",
    bio: "General & restorative dentistry. Caring for Southampton families for years.",
    file: "lp/dr-jeffrey-brenner.webp",
    // -v2 filename intentionally busts the Next.js image-optimizer cache after
    // the portrait was replaced (the old optimized entry was keyed to the old
    // filename).
    src: "/images/lp/dr-jeffrey-brenner-v2.webp",
    alt: "Dr. Jeffrey Brenner, general and restorative dentist at Hampton Family Dental in Southampton, PA",
    // Real photo, supplied by the practice.
    standIn: false,
  },
  {
    name: "Dr. Keyur Dudhat",
    bio: "Gentle, patient-first care for emergencies and everyday dentistry.",
    file: "lp/dr-keyur-dudhat.webp",
    // Sourced from the practice's own main site - this is the real dentist.
    src: "/images/lp/dr-keyur-dudhat.webp",
    alt: "Dr. Keyur Dudhat, emergency and general dentist at Hampton Family Dental in Southampton, PA",
    standIn: false,
  },
];

export default function MeetTheDentists() {
  return (
    <Section id="team" className="bg-beige-light">
      <SectionHeading
        eyebrow="Your dentists"
        title="The team you'll see today"
        lead="Real dentists, right here in Southampton - known for being gentle and calm when you're not."
      />

      {/*
        Compact horizontal cards.

        These were full-bleed 3:4 portraits, which gave two headshots roughly a
        full screen of height on desktop - far more room than a two-line bio
        needs, and it pushed the sections that actually convert further down
        the page. A fixed-size round avatar beside the text says the same thing
        in a fraction of the space, and reads as a team roster rather than two
        magazine covers.
      */}
      <div className="mt-8 grid gap-3.5 sm:grid-cols-2 sm:gap-4">
        {DENTISTS.map((dentist, i) => (
          <Reveal key={dentist.name} delay={i * 0.08}>
            <figure className="group flex h-full min-w-0 items-center gap-4 rounded-2xl border border-beige-dark/50 bg-white p-4 transition-all duration-300 hover:-translate-y-0.5 hover:border-primary/25 hover:shadow-[0_16px_36px_-24px_rgba(20,60,80,0.5)] sm:gap-5 sm:p-5">
              <div className="relative shrink-0">
                <ImageSlot
                  label="Dentist portrait"
                  file={dentist.file}
                  src={dentist.src}
                  dimensions="900 × 1100"
                  alt={dentist.alt}
                  className="h-20 w-20 rounded-full ring-1 ring-beige-dark/50 sm:h-24 sm:w-24"
                  /*
                    The avatar box is 80px on mobile and 96px from sm: up, but
                    `sizes` deliberately declares double that.

                    Declaring the true box size (this was `sizes="96px"`) meant
                    a 1x display fetched a 96px image for a 96px box — no
                    oversampling at all. At that size AVIF at the default
                    quality 75 has almost nothing to work with, and the faces
                    came out visibly soft against the crisp text beside them.

                    Doubling the declared width makes every display fetch an
                    oversampled candidate: 1x picks 256w, 2x picks 384w. The
                    cost is trivial — the 256px avatar is 6KB, the 384px one
                    9KB — and the crop is a circle of someone's face, which is
                    exactly where softness is most obvious.
                  */
                  sizes="(max-width: 640px) 160px, 192px"
                  quality={90}
                  objectPosition="center 20%"
                />
                {dentist.standIn && (
                  <span className="absolute -bottom-1 left-1/2 z-10 -translate-x-1/2 whitespace-nowrap rounded-md bg-amber-400/95 px-1.5 py-0.5 text-[8px] font-bold uppercase tracking-wide text-amber-950 shadow-sm">
                    Placeholder
                  </span>
                )}
              </div>

              <figcaption className="min-w-0">
                <h3 className="font-heading text-[16.5px] leading-snug text-navy sm:text-[18px]">
                  {dentist.name}
                </h3>
                <p className="mt-1.5 text-[13px] leading-relaxed text-navy/60">
                  {dentist.bio}
                </p>
              </figcaption>
            </figure>
          </Reveal>
        ))}
      </div>

      <ReviewNote>
        [CONFIRM] Dentist bios with the office. Both portraits are the real
        dentists.
      </ReviewNote>
    </Section>
  );
}
