"use client";

import Image from "next/image";
import { Check, CreditCard, HeartHandshake, Phone, ShieldCheck } from "lucide-react";
import { Reveal, Section, SectionHeading } from "./Section";
import { CARRIERS, PHONE_DISPLAY, PHONE_TEL, type Carrier } from "@/lib/lp.config";

const FINANCING = [
  {
    icon: ShieldCheck,
    title: "Most PPO insurances accepted",
    body: "We bill your plan directly, so you pay less out of pocket.",
  },
  {
    icon: HeartHandshake,
    title: "No insurance, No Problem!",
    body: "Get our in-office membership plan.",
  },
  {
    icon: CreditCard,
    title: "Ask about our Financing plans",
    body: "Financing options so an emergency doesn't have to wait for payday.",
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
        title="PPO Insurances Accepted"
        lead="Email us a picture of your insurance card at info@hamptonfamilydentist.com and we will get your insurance verified!"
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
        {/* 3 columns, not 4. Delta Dental's removal left five carriers, which
            would strand a hole in the second row - so the "Don't see your
            plan?" card takes that sixth cell (below) and the grid closes as
            two full rows again. */}
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

          {/*
            "Don't see your plan?" as the sixth cell.

            Five carriers in a three-column grid strand a hole in the second
            row. This card fills it, so the block closes as two clean rows -
            and it lands exactly where someone who has just failed to find
            their insurer is looking.

            Same height and radius as a carrier tile so the grid stays even,
            but a dashed primary border and tinted fill so it reads as an
            action rather than a logo that failed to load. Someone whose plan
            is missing is the most likely to bounce, so it is a real tel: link.
          */}
          <li className="min-w-0">
            <a
              href={PHONE_TEL}
              data-cta="insurance-not-listed"
              className="group flex h-[72px] min-w-0 flex-col items-center justify-center gap-0.5 rounded-2xl border border-dashed border-primary/40 bg-primary/[0.05] px-3 text-center transition-all duration-300 hover:-translate-y-0.5 hover:border-solid hover:border-primary/50 hover:bg-white hover:shadow-[0_12px_28px_-16px_rgba(20,60,80,0.45)] sm:h-[80px] sm:px-4"
            >
              <span className="flex min-w-0 items-center gap-1.5">
                <Phone
                  className="h-3.5 w-3.5 shrink-0 text-primary"
                  strokeWidth={2.6}
                  aria-hidden
                />
                <span className="min-w-0 text-[12.5px] font-bold leading-tight text-navy sm:text-[13.5px]">
                  Don&apos;t see your plan?
                </span>
              </span>
              <span className="text-[11.5px] font-semibold leading-tight text-primary sm:text-[12.5px]">
                + many more PPO insurances
              </span>
            </a>
          </li>
        </ul>
      </Reveal>

      {/* The grid card above is intentionally compact, so the phone number
          itself sits here where there is room to read it. */}
      <Reveal delay={0.12}>
        <p className="mt-3 text-center text-[13px] leading-snug text-navy/60 sm:text-[13.5px]">
          Call{" "}
          <a
            href={PHONE_TEL}
            data-cta="insurance-not-listed-number"
            className="font-bold text-primary underline decoration-primary/30 underline-offset-2 transition-colors hover:decoration-primary"
          >
            {PHONE_DISPLAY}
          </a>{" "}
          and we&apos;ll check your coverage in a minute.
        </p>
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
      </div>
    </Section>
  );
}
