"use client";

import { motion } from "framer-motion";
import { CheckCircle2, MessageSquareText, Phone } from "lucide-react";
import ImageSlot from "./ImageSlot";
import LeadForm from "./LeadForm";
import { PHONE_DISPLAY, PHONE_SMS, PHONE_TEL } from "@/lib/lp.config";

/**
 * Reassurance chips under the CTAs. Short enough to scan in a single pass -
 * someone in pain reads three words, not a sentence.
 */
const CHIPS = [
  "Seen today - same-day relief",
  "Most insurance accepted",
  "Emergency exam + X-rays from $59*",
  "Gentle, no-judgment care",
];

/**
 * Light-theme hero.
 *
 * Replaces the earlier navy-over-photograph treatment. The photograph now sits
 * on the right and bleeds off the edge, while the copy sits on a near-white
 * wash at the left - the same structure as the reference. A horizontal white
 * gradient feathers the photo into the background so there is no hard seam.
 *
 * Petrol type on white reads calmer than white-on-navy and matches the header
 * and the rest of the page; the teal accent carries the CTAs.
 */
export default function Hero() {
  return (
    <section className="relative isolate w-full overflow-hidden bg-white">
      {/* ── Background wash ── */}
      <div
        aria-hidden
        className="absolute inset-0 z-0 bg-[linear-gradient(160deg,#F7FAFC_0%,#EEF3F8_45%,#F4F7FA_100%)]"
      />

      {/* Ambient blooms, kept very low so the surface stays airy. Painted as
          radial gradients, not blurred circles - a 120px blur filter is one of
          the most expensive things you can ask a phone GPU to rasterise, and
          this is the first thing on the page. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-0 bg-[radial-gradient(40%_45%_at_0%_0%,rgba(30,96,118,0.10),transparent_70%),radial-gradient(35%_40%_at_25%_100%,rgba(15,138,109,0.10),transparent_70%)]"
      />

      {/* ── Photograph - full-bleed behind the whole section (desktop) ──

          The photo spans the entire width rather than sitting in a right-hand
          column. That is what removes the seam: there is no container edge for
          the eye to catch, only a wash that starts solid over the copy and
          thins out to nothing across the full width. */}
      <div className="absolute inset-0 z-0 hidden lg:block">
        <ImageSlot
          label="Hero - bright treatment room"
          file="lp/hero-emergency.webp"
          dimensions="2400 × 1400"
          alt="The bright treatment room at Hampton Family Dental in Southampton, PA"
          src="/images/lp/hero-emergency.webp"
          tone="light"
          corner
          priority
          sizes="100vw"
          className="h-full w-full"
          objectPosition="70% 40%"
        />

        {/* The wash. Solid under the headline, gone by the right edge - one
            continuous ramp across the full section, so nothing reads as a cut. */}
        <div
          aria-hidden
          className="absolute inset-0 bg-[linear-gradient(95deg,#F4F7FA_0%,#F4F7FA_26%,rgba(244,247,250,0.94)_38%,rgba(244,247,250,0.78)_50%,rgba(244,247,250,0.52)_64%,rgba(244,247,250,0.26)_80%,rgba(244,247,250,0.10)_100%)]"
        />

        {/* Overall lift - keeps the photo airy and the type unmistakably first. */}
        <div aria-hidden className="absolute inset-0 bg-white/30" />
      </div>

      {/* Hairline floor so the hero resolves into the next section. */}
      <div aria-hidden className="absolute inset-x-0 bottom-0 z-[1] h-px bg-beige/70" />

      {/* ── Content ── */}
      <div className="relative z-10 mx-auto flex w-full max-w-6xl flex-col justify-center px-4 pb-12 pt-9 sm:px-6 sm:pb-16 sm:pt-12 lg:min-h-[660px] lg:px-8 lg:pb-24 lg:pt-20">
        <div className="grid items-center gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:gap-14">
          {/* Left - the promise */}
          <div className="min-w-0">
            {/* Live urgency badge */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="inline-flex max-w-full items-center gap-2 rounded-full border border-navy/10 bg-white/85 px-3 py-1.5 shadow-[0_2px_10px_-4px_rgba(20,60,80,0.18)] backdrop-blur-md"
            >
              {/* Red, not teal - this badge is the page's single "this is an
                  emergency service" signal. Teal carries the CTAs. */}
              <span className="relative flex h-2 w-2 shrink-0">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emergency opacity-60" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-emergency" />
              </span>
              <span className="min-w-0 truncate text-[9.5px] font-semibold uppercase tracking-[0.16em] text-navy/70 sm:text-[10.5px] sm:tracking-[0.2em]">
                <span className="font-bold text-emergency">Emergency Dentist</span>
                <span className="text-navy/60"> · Southampton, PA</span>
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
              className="mt-4 font-heading text-navy"
              style={{
                fontSize: "clamp(2rem, 6.2vw, 4.15rem)",
                lineHeight: 1.04,
                letterSpacing: "-0.035em",
              }}
            >
              Get out of tooth pain in{" "}
              <span className="relative inline-block">
                <span className="font-normal italic text-primary">Southampton, PA</span>
                <motion.span
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ delay: 0.5, duration: 0.55, ease: "easeOut" }}
                  className="absolute -bottom-0.5 left-0 right-0 h-[3px] origin-left rounded-full bg-primary/70"
                />
              </span>
            </motion.h1>

            {/* Mobile-only emotional image. On phones the copy is trimmed to
                just the headline, and this photo of someone in tooth pain does
                the emotional work the paragraph does on desktop. Hidden on lg+
                because there the right-hand photograph already carries it. */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.16, ease: [0.16, 1, 0.3, 1] }}
              className="mt-5 lg:hidden"
            >
              <ImageSlot
                label="Woman holding her jaw in tooth pain"
                file="lp/hero-pain-mobile.webp"
                src="/images/lp/hero-pain-mobile.webp"
                dimensions="1200 × 900"
                alt="A woman holding her cheek in discomfort from a toothache"
                tone="light"
                corner
                className="aspect-[4/3] w-full rounded-2xl ring-1 ring-navy/8"
                sizes="100vw"
                objectPosition="center 30%"
              />
            </motion.div>

            {/* Desktop keeps the supporting paragraph; mobile drops it. */}
            <motion.p
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.16 }}
              className="mt-5 hidden max-w-lg text-[15px] leading-relaxed text-navy/70 sm:text-[16.5px] lg:block lg:text-[17.5px]"
            >
              Same-day emergency dental care for every age - fast relief for
              toothaches, broken teeth, and swelling, with a gentle team and a
              clear price up front.
            </motion.p>

            {/* Continuity line - the practice changed names, the team didn't. */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.22 }}
              className="mt-3 hidden max-w-lg text-[13.5px] italic leading-relaxed text-navy/50 lg:block"
            >
              Formerly Brenner Dental Group - same trusted team, same
              Southampton location.
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.24 }}
              className="mt-6 grid gap-2.5 sm:grid-cols-2 sm:gap-3"
            >
              <a
                href={PHONE_TEL}
                data-cta="hero-call"
                className="group flex min-w-0 items-center justify-center gap-2.5 rounded-2xl bg-urgent px-4 py-3.5 text-white shadow-[0_14px_32px_-10px_rgba(15,138,109,0.65)] transition-all hover:bg-urgent-dark hover:shadow-[0_18px_40px_-10px_rgba(15,138,109,0.75)] active:scale-[0.99] sm:py-4"
              >
                <Phone className="h-4 w-4 shrink-0" strokeWidth={2.6} aria-hidden />
                <span className="min-w-0 text-left">
                  <span className="block text-[15px] font-bold leading-tight sm:text-[16px]">
                    Call now
                  </span>
                  <span className="block text-[11px] font-medium leading-tight text-white/85">
                    {PHONE_DISPLAY}
                  </span>
                </span>
              </a>

              <a
                href={PHONE_SMS}
                data-cta="hero-text"
                className="group flex min-w-0 items-center justify-center gap-2.5 rounded-2xl border border-navy/12 bg-white px-4 py-3.5 text-navy shadow-[0_10px_28px_-14px_rgba(20,60,80,0.45)] transition-all hover:border-primary/35 hover:bg-beige-light active:scale-[0.99] sm:py-4"
              >
                <MessageSquareText
                  className="h-4 w-4 shrink-0 text-primary"
                  strokeWidth={2.4}
                  aria-hidden
                />
                <span className="min-w-0 text-left">
                  <span className="block text-[15px] font-bold leading-tight sm:text-[16px]">
                    Text us
                  </span>
                  <span className="block text-[11px] font-medium leading-tight text-navy/55">
                    Can&apos;t talk? Tap here
                  </span>
                </span>
              </a>
            </motion.div>

            {/* Trust chips - desktop only; mobile stays headline + image + CTAs */}
            <motion.ul
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.34 }}
              className="mt-6 hidden flex-wrap gap-2 lg:flex"
            >
              {CHIPS.map((item) => (
                <li
                  key={item}
                  className="inline-flex items-center gap-1.5 rounded-full border border-navy/8 bg-white/85 px-3 py-1.5 shadow-[0_2px_8px_-4px_rgba(20,60,80,0.15)] backdrop-blur-sm"
                >
                  <CheckCircle2
                    className="h-3.5 w-3.5 shrink-0 text-urgent"
                    strokeWidth={2.2}
                    aria-hidden
                  />
                  <span className="min-w-0 text-[12.5px] font-medium leading-none text-navy/75">
                    {item}
                  </span>
                </li>
              ))}
            </motion.ul>
          </div>

          {/* Right - the form, elevated above the photograph on desktop */}
          <div id="request" className="min-w-0 scroll-mt-24 lg:sticky lg:top-24">
            <LeadForm />
          </div>
        </div>
      </div>
    </section>
  );
}
