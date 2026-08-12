"use client";

import Image from "next/image";
import { Check, CreditCard, HeartHandshake, Phone, ShieldCheck } from "lucide-react";
import ReviewNote from "./ReviewNote";
import { Reveal, Section, SectionHeading } from "./Section";
import { CARRIERS, PHONE_DISPLAY, PHONE_TEL, type Carrier } from "@/lib/lp.config";

const FINANCING = [
  {
    icon: ShieldCheck,
    title: "Most insurance accepted",
    body: "We bill your plan directly, so you pay less out of pocket.",
  },
  {
    icon: HeartHandshake,
    title: "No insurance? Membership plan",
    body: "Exam, X-rays & cleaning plus member pricing on treatment - from $[X]/month.",
  },
  {
    icon: CreditCard,
    title: "Flexible payment plans",
    body: "Ask about financing so an emergency doesn't have to wait for payday.",
  },
];

/**
 * `carriers` comes from getCarriers() in the server component, which checks
 * public/images/lp/insurance/ for a file matching each carrier's slug. Any
 * carrier with a logo renders the image; the rest render their name as type.
 * Falls back to the plain config list if the prop is omitted.
 */
export default function InsuranceAndFinancing({
  carriers = CARRIERS,
}: {
  carriers?: Carrier[];
}) {
  return (
    <Section id="cost" className="bg-beige-light">
      {/* ── Insurance ── */}
      <SectionHeading
        eyebrow="Cost & coverage"
        title="Most insurance welcome"
        lead="Bring your card - we'll check your coverage for you before anything's decided."
      />

      {/*
        Carrier logos.

        Previously these were pill chips in a wrapping flex row, so every chip
        was a different width and the row broke into a ragged, unbalanced
        shape - the logos read as loose stickers rather than a credential set.

        A fixed grid of equal cells fixes that: each logo gets identical space
        and sits optically centred, so the block reads as one tidy panel no
        matter how many carriers the office adds or which ones have artwork.
      */}
      <Reveal delay={0.05}>
        {/* 3 columns, not 4. Six carriers divide evenly into three, so the
            grid always closes as two full rows - at four columns the seventh
            cell stranded a gap on the second row. */}
        <ul className="mt-7 grid grid-cols-2 gap-2.5 sm:gap-3 md:grid-cols-3">
          {carriers.map((carrier) => (
            <li
              key={carrier.slug}
              className="group flex h-[72px] min-w-0 items-center justify-center rounded-2xl border border-beige-dark/50 bg-white px-3 shadow-[0_1px_2px_rgba(20,60,80,0.04)] transition-all duration-300 hover:-translate-y-0.5 hover:border-primary/25 hover:shadow-[0_12px_28px_-16px_rgba(20,60,80,0.45)] sm:h-[80px] sm:px-4"
            >
              {carrier.logo ? (
                <Image
                  src={carrier.logo}
                  alt={`${carrier.name} accepted at Hampton Family Dental`}
                  width={240}
                  height={80}
                  className="max-h-8 w-auto max-w-full object-contain sm:max-h-9"
                />
              ) : (
                <span className="flex min-w-0 items-center gap-1.5">
                  <Check
                    className="h-3.5 w-3.5 shrink-0 text-urgent"
                    strokeWidth={3}
                    aria-hidden
                  />
                  <span className="min-w-0 text-center text-[12.5px] font-semibold leading-tight text-navy sm:text-[13.5px]">
                    {carrier.name}
                  </span>
                </span>
              )}
            </li>
          ))}

        </ul>
      </Reveal>

      {/*
        "Don't see your plan?" - a full-width bar under the grid, not a cell
        inside it.

        Two problems with it as a grid cell: seven cells never fill a row
        cleanly, so it left a visible hole; and it is not a carrier, so giving
        it the same shape as one made it read as a logo that had failed to
        load. Pulled out and widened, it becomes the closing line of the block
        and can carry the phone number itself.

        Someone whose insurer is missing from this grid is exactly the person
        most likely to bounce, so this is a real tel: link rather than the
        inert "+ more - just ask" text it replaces.
      */}
      <Reveal delay={0.12}>
        <a
          href={PHONE_TEL}
          data-cta="insurance-not-listed"
          className="group mt-3 flex min-w-0 flex-col items-center justify-between gap-3 rounded-2xl border border-dashed border-primary/40 bg-primary/[0.04] px-5 py-4 text-center transition-all duration-300 hover:border-solid hover:border-primary/50 hover:bg-white hover:shadow-[0_14px_32px_-20px_rgba(20,60,80,0.5)] sm:flex-row sm:text-left"
        >
          <span className="flex min-w-0 items-center gap-3">
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-white">
              <Phone className="h-4 w-4" strokeWidth={2.5} aria-hidden />
            </span>
            <span className="min-w-0">
              <span className="block text-[14px] font-bold leading-tight text-navy sm:text-[15px]">
                Don&apos;t see your plan?
              </span>
              <span className="mt-0.5 block text-[12.5px] leading-tight text-navy/60">
                We accept more than the plans listed here - call and
                we&apos;ll check your coverage in a minute.
              </span>
            </span>
          </span>

          <span className="shrink-0 whitespace-nowrap text-[14px] font-bold text-primary sm:text-[15px]">
            {PHONE_DISPLAY}
          </span>
        </a>
      </Reveal>

      {/*
        ── Financing ──

        This block used a plain SectionHeading identical to the one at the top
        of the section, so "Affordability" read as more of the same and the
        eye slid straight past it. It now sits on its own raised white panel
        with a teal rule and centred heading, which separates it from the
        insurance list above without introducing a whole new section.
      */}
      <div className="mt-14 sm:mt-16">
        <Reveal>
          <div className="rounded-3xl border border-beige-dark/50 bg-white p-5 shadow-[0_18px_44px_-28px_rgba(20,60,80,0.35)] sm:p-7 lg:p-9">
            <div className="mx-auto max-w-2xl text-center">
              <span className="inline-flex items-center gap-2 rounded-full bg-urgent/10 px-3 py-1.5">
                <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-urgent" aria-hidden />
                <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-urgent-dark">
                  Affordability
                </span>
              </span>

              <h2 className="mt-3.5 font-heading text-[1.6rem] leading-[1.12] tracking-[-0.02em] text-navy sm:text-[2rem] lg:text-[2.4rem]">
                Care within reach
              </h2>

              <p className="mx-auto mt-3 max-w-lg text-[0.95rem] leading-relaxed text-navy/60 sm:text-base">
                Three ways we keep an emergency from becoming a financial one.
              </p>
            </div>

            <div className="mt-7 grid gap-3 sm:gap-4 lg:grid-cols-3">
              {FINANCING.map((item, i) => {
                const Icon = item.icon;
                return (
                  <Reveal key={item.title} delay={i * 0.06}>
                    <div className="flex h-full min-w-0 gap-3.5 rounded-2xl border border-beige-dark/50 bg-beige-light/60 p-4 transition-colors hover:border-primary/25 hover:bg-white sm:p-5">
                      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-urgent/10 text-urgent">
                        <Icon className="h-5 w-5" strokeWidth={2.1} />
                      </span>
                      <div className="min-w-0">
                        <h3 className="font-heading text-[15.5px] leading-snug text-navy sm:text-[16.5px]">
                          {item.title}
                        </h3>
                        <p className="mt-1 text-[13px] leading-relaxed text-navy/60">
                          {item.body}
                        </p>
                      </div>
                    </div>
                  </Reveal>
                );
              })}
            </div>
          </div>
        </Reveal>

        <ReviewNote>
          [CONFIRM] Membership price and financing options with the office -
          replace the $[X]/month placeholder before this page takes paid traffic.
        </ReviewNote>
      </div>
    </Section>
  );
}
