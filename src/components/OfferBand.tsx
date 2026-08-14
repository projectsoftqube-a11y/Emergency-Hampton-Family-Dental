"use client";

import { motion } from "framer-motion";
import { Phone, ShieldCheck } from "lucide-react";
import { PHONE_DISPLAY, PHONE_TEL } from "@/lib/lp.config";

export default function OfferBand() {
  return (
    <section className="w-full overflow-hidden bg-white px-4 py-8 sm:px-6 sm:py-16 lg:px-8">
      <div className="mx-auto w-full max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
          className="relative isolate overflow-hidden rounded-3xl bg-navy px-4 py-6 text-center sm:px-8 sm:py-12 lg:px-14 lg:py-16"
        >
          {/*
            Glow.

            These used to be two circles with blur-[120px]/blur-[110px] on top
            of a noise layer in mix-blend-overlay. That combination forced a
            large offscreen rasterisation on every paint, and on mid-range
            phones this band visibly lagged in while scrolling.

            Radial gradients paint the identical soft bloom as part of the
            normal background pass - no filter, no blend, no extra layer. The
            grain is dropped on mobile (where it was invisible at that opacity
            anyway) and kept from sm: up.
          */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(60%_55%_at_50%_-10%,rgba(15,138,109,0.30),transparent_70%),radial-gradient(50%_60%_at_100%_110%,rgba(30,96,118,0.45),transparent_72%)]"
          />
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 -z-10 hidden opacity-[0.06] mix-blend-overlay sm:block"
            style={{ backgroundImage: "url('/images/noise.webp')" }}
          />

          {/* `relative overflow-hidden` clips the sheen to the pill; `isolate`
              keeps it from painting over the band's own glow layers. The two
              keyframes are defined in globals.css and are neutralised by the
              global prefers-reduced-motion block. */}
          <span className="relative isolate mx-auto inline-flex max-w-full items-center gap-1.5 overflow-hidden rounded-full border border-white/15 bg-white/8 px-3 py-1.5 text-[9.5px] font-semibold uppercase tracking-[0.16em] text-white/80 motion-safe:animate-[lp-badge-pulse_2.6s_ease-in-out_infinite] sm:text-[10.5px] sm:tracking-[0.2em] sm:backdrop-blur-sm">
            {/* The travelling glint. aria-hidden and pointer-events-none - it is
                decoration, and it sits above the text in the stacking order. */}
            <span
              aria-hidden
              className="pointer-events-none absolute inset-y-0 -left-1/3 w-1/3 -skew-x-12 bg-gradient-to-r from-transparent via-white/35 to-transparent motion-safe:animate-[lp-badge-sheen_4.5s_ease-in-out_infinite]"
            />
            <ShieldCheck className="h-3 w-3 shrink-0" strokeWidth={2.4} aria-hidden />
            No insurance, no problem!
          </span>

          <p
            className="mt-3 font-heading text-white sm:mt-4"
            style={{
              fontSize: "clamp(1.3rem, 5.2vw, 3.25rem)",
              lineHeight: 1.06,
              letterSpacing: "-0.03em",
            }}
          >
            Emergency exam + X-rays special at{" "}
            <span className="whitespace-nowrap text-urgent-light">$59</span>{" "}
            for patients with no insurance
          </p>

          <p className="mx-auto mt-2.5 max-w-xl text-[13px] leading-relaxed text-white sm:mt-4 sm:text-[15.5px]">
            {/*
              Hidden on mobile: this sentence restates the headline directly
              above it almost word for word, and on a 390px screen that pushed
              the Call button most of a screen further down. The second
              sentence is the part that actually says something new, so it
              carries the card alone on small screens.

              `hidden sm:inline` rather than dropping it entirely - on desktop
              there is room, and it warms up an otherwise blunt paragraph.
            */}
            <span className="hidden sm:inline">
              Take advantage of our $59 emergency exam special for patients with
              no insurance.{" "}
            </span>
            We show you exactly what&apos;s wrong and what each option costs{" "}
            <strong className="font-bold underline decoration-urgent-light decoration-2 underline-offset-2">
              before
            </strong>{" "}
            we do
            anything - you decide.
          </p>

          <a
            href={PHONE_TEL}
            data-cta="offer-call"
            className="mt-5 inline-flex w-full max-w-xs items-center justify-center gap-2 rounded-2xl bg-urgent px-5 py-3 text-[14.5px] font-bold text-white shadow-[0_14px_36px_-8px_rgba(15,138,109,0.8)] transition-all hover:bg-urgent-dark active:scale-[0.99] sm:mt-7 sm:w-auto sm:py-3.5 sm:text-[16px]"
          >
            <Phone className="h-4 w-4 shrink-0" strokeWidth={2.6} aria-hidden />
            <span className="truncate">Call {PHONE_DISPLAY}</span>
          </a>
        </motion.div>
      </div>
    </section>
  );
}
