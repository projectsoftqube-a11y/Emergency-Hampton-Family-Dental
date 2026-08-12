"use client";

import { Clock } from "lucide-react";
import ImageSlot from "./ImageSlot";
import ReviewNote from "./ReviewNote";
import { Reveal, Section, SectionHeading } from "./Section";

/**
 * Before/after, as one compact split card.
 *
 * This was two full-width square images in a three-column grid with the
 * headline stacked above them - roughly a screen of height for a single idea.
 * The copy now sits beside the images rather than above, and the pair is one
 * panel: two halves of the same card meeting at a hairline seam, labels
 * overlaid on the photos instead of stacked underneath.
 *
 * Joining them is also more honest to the claim. Separated by a gap they read
 * as two unrelated photographs; joined, they read as one tooth at two points
 * in time, which is what the section is actually asserting.
 */
export default function BeforeAfter() {
  return (
    <Section id="results" className="bg-navy-dark">
      {/* Ambient - radial gradient rather than a blurred circle; see the note
          in OfferBand for why (large blur filters stall paint on phones). */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(45%_40%_at_0%_10%,rgba(30,96,118,0.30),transparent_70%)]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 hidden opacity-[0.05] mix-blend-overlay sm:block"
        style={{ backgroundImage: "url('/images/noise.webp')" }}
      />

      <div className="relative grid items-center gap-7 lg:grid-cols-[0.9fr_1.1fr] lg:gap-12">
        {/* ── Copy ── */}
        <div className="min-w-0">
          <SectionHeading
            eyebrow="The kind of fix we do"
            title="Same day. Same tooth."
            tone="dark"
          />

          <Reveal delay={0.06}>
            <p className="mt-4 max-w-md text-[14.5px] leading-relaxed text-white/85 sm:text-[15.5px]">
              A broken front tooth like this is often repaired in a{" "}
              <strong className="font-semibold text-white">single same-day visit</strong>.
            </p>

            <p className="mt-4 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3 py-1.5 text-[12px] font-semibold text-white/90">
              <Clock className="h-3.5 w-3.5 shrink-0 text-urgent-light" strokeWidth={2.6} aria-hidden />
              Often done in one appointment
            </p>
          </Reveal>

          {/* Required disclosure. These are illustrations, not photos of a
              specific Hampton patient, so the copy describes the type of
              treatment rather than claiming an individual result - which is
              what FTC advertising rules and the PA dental board require.

              Kept at a readable weight on purpose: a disclosure nobody can
              read does not function as a disclosure. */}
          <p className="mt-5 max-w-md text-[12px] italic leading-relaxed text-white/60">
            Illustrative example - not a photograph of an actual patient.
          </p>
        </div>

        {/* ── The split card ── */}
        <Reveal delay={0.08} className="min-w-0">
          <figure className="min-w-0 overflow-hidden rounded-3xl ring-1 ring-white/15">
            <div className="grid grid-cols-2">
              {/* Before */}
              <div className="relative">
                <ImageSlot
                  label="Before - broken front tooth"
                  file="lp/before-broken-front-tooth.webp"
                  src="/images/lp/before-broken-front-tooth.webp"
                  dimensions="1000 × 1000"
                  alt="Illustration of a broken upper front tooth before same-day repair"
                  tone="dark"
                  className="aspect-[4/5] w-full sm:aspect-square"
                  sizes="(max-width: 1024px) 50vw, 30vw"
                />

                {/* Scrim - keeps the label legible over any part of the photo. */}
                <div
                  aria-hidden
                  className="absolute inset-x-0 bottom-0 h-2/5 bg-gradient-to-t from-navy-dark/90 to-transparent"
                />

                <figcaption className="absolute inset-x-0 bottom-0 p-3 sm:p-4">
                  <span className="inline-flex items-center gap-1.5 rounded-full border border-white/20 bg-navy-dark/70 px-2.5 py-1 text-[9.5px] font-bold uppercase tracking-[0.12em] text-white backdrop-blur-sm sm:text-[10.5px]">
                    <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-white/60" aria-hidden />
                    Walked in
                  </span>
                </figcaption>
              </div>

              {/* After. The hairline border is the seam between the halves. */}
              <div className="relative border-l border-white/20">
                <ImageSlot
                  label="After - repaired same afternoon"
                  file="lp/after-repaired-front-tooth.webp"
                  src="/images/lp/after-repaired-front-tooth.webp"
                  dimensions="1000 × 1000"
                  alt="Illustration of the same front tooth fully repaired"
                  tone="dark"
                  className="aspect-[4/5] w-full sm:aspect-square"
                  sizes="(max-width: 1024px) 50vw, 30vw"
                />

                <div
                  aria-hidden
                  className="absolute inset-x-0 bottom-0 h-2/5 bg-gradient-to-t from-navy-dark/90 to-transparent"
                />

                <figcaption className="absolute inset-x-0 bottom-0 p-3 sm:p-4">
                  <span className="inline-flex items-center gap-1.5 rounded-full border border-urgent-light/50 bg-urgent/80 px-2.5 py-1 text-[9.5px] font-bold uppercase tracking-[0.12em] text-white backdrop-blur-sm sm:text-[10.5px]">
                    <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-white" aria-hidden />
                    Walked out
                  </span>
                </figcaption>
              </div>
            </div>
          </figure>
        </Reveal>
      </div>

      <ReviewNote>
        [ACTION] These are illustrative images, labelled as such. To run a real
        before/after instead, swap in a genuine consented case (signed HIPAA
        photo release on file) and you can drop the disclaimer line above.
      </ReviewNote>
    </Section>
  );
}
