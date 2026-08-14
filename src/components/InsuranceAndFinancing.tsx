"use client";

import Image from "next/image";
import { Check, CreditCard, HeartHandshake, Phone, ShieldCheck } from "lucide-react";
import { Reveal, Section, SectionHeading } from "./Section";
import { CARRIERS, PHONE_DISPLAY, PHONE_TEL, type Carrier } from "@/lib/lp.config";

const FINANCING = [
  {
    icon: ShieldCheck,
    title: "Most PPO insurances accepted",
    body: "We bill your plan directly.",
  },
  {
    icon: HeartHandshake,
    // Client-specified wording (change sheet 1.8) - do not paraphrase.
    title: "No insurance, No Problem!",
    body: "Get our in-office membership plan.",
  },
  {
    icon: CreditCard,
    // Client-specified wording (change sheet 1.8) - do not paraphrase.
    title: "Ask about our Financing plans",
    body: "Spread the cost of treatment.",
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
        lead={
          <>
            Email a photo of your insurance card to{" "}
            {/* whitespace-nowrap so the address never wraps mid-domain, which
                is what made this read as three loose lines of grey text. The
                primary colour + underline mark it as the thing to act on. */}
            <a
              href="mailto:info@hamptonfamilydentist.com"
              data-cta="insurance-email"
              className="whitespace-nowrap font-semibold text-primary underline decoration-primary/30 underline-offset-2 transition-colors hover:decoration-primary"
            >
              info@hamptonfamilydentist.com
            </a>{" "}
            and we&apos;ll verify it for you.
          </>
        }
      />

      {/*
        Carrier logos - a continuously scrolling marquee.

        These were a fixed grid of equal cells. That read tidily on desktop but
        on mobile it became two tall columns that pushed the financing cards
        well down the page, and it caps how many carriers the office can add:
        every new plan makes the block taller.

        A marquee is size-independent - the office can add twenty carriers and
        the section height never changes - and the motion reads as "we take a
        lot of these", which is exactly the claim the heading makes.

        Same CSS `lp-marquee` keyframe the reviews row uses: the track holds
        the logos twice and shifts by exactly -50%, so the second copy lands
        where the first began and the loop has no seam. Pure CSS, so it runs on
        the compositor rather than a per-frame state update.
      */}
      <Reveal delay={0.05}>
        {/*
          Edge fades. The track runs full-bleed under them so logos dissolve at
          the boundaries instead of being chopped off mid-word.

          py-3/-my-3 for the same reason as the reviews row: overflow-hidden
          clips vertically as well as horizontally, which would shave the
          shadow off every tile.
        */}
        <div className="group relative mt-7 -my-3 overflow-hidden py-3">
          <div
            aria-hidden
            className="pointer-events-none absolute inset-y-0 left-0 z-10 w-10 bg-gradient-to-r from-beige-light to-transparent sm:w-16"
          />
          <div
            aria-hidden
            className="pointer-events-none absolute inset-y-0 right-0 z-10 w-10 bg-gradient-to-l from-beige-light to-transparent sm:w-16"
          />

          <ul className="flex w-max shrink-0 items-stretch gap-2.5 pr-2.5 motion-safe:animate-[lp-marquee_linear_infinite] motion-safe:group-hover:[animation-play-state:paused] sm:gap-3 sm:pr-3" style={{ animationDuration: "32s" }}>
            {[...carriers, ...carriers].map((carrier, i) => {
              // Second half is the seamless-loop duplicate - hidden from
              // assistive tech so each carrier is announced once.
              const isDuplicate = i >= carriers.length;
              return (
                <li
                  key={`${carrier.slug}-${i}`}
                  aria-hidden={isDuplicate || undefined}
                  className="flex h-[56px] w-[124px] shrink-0 items-center justify-center rounded-xl border border-beige-dark/50 bg-white px-3 shadow-[0_1px_2px_rgba(20,60,80,0.04)] sm:h-[64px] sm:w-[150px] sm:px-4"
                >
                  {carrier.logo ? (
                    <Image
                      src={carrier.logo}
                      alt={
                        isDuplicate
                          ? ""
                          : `${carrier.name} accepted at Hampton Family Dental`
                      }
                      width={240}
                      height={80}
                      className="max-h-6 w-auto max-w-full object-contain sm:max-h-7"
                    />
                  ) : (
                    <span className="flex min-w-0 items-center gap-1.5">
                      <Check
                        className="h-3 w-3 shrink-0 text-urgent"
                        strokeWidth={3}
                        aria-hidden
                      />
                      <span className="min-w-0 text-center text-[11.5px] font-semibold leading-tight text-navy sm:text-[12.5px]">
                        {carrier.name}
                      </span>
                    </span>
                  )}
                </li>
              );
            })}
          </ul>
        </div>
      </Reveal>

      {/*
        "Don't see your plan?" - a static card below the moving track.

        It cannot ride the marquee: it is a tap target, and a tap target that
        slides out from under a thumb is a bad control. Someone whose insurer
        is missing from the strip is the most likely to bounce, so this stays
        put and is a real tel: link.
      */}
      <Reveal delay={0.12}>
        <a
          href={PHONE_TEL}
          data-cta="insurance-not-listed"
          className="group mt-3 flex min-w-0 flex-row items-center justify-center gap-2.5 rounded-xl border border-dashed border-primary/40 bg-primary/[0.04] px-3 py-2 text-left transition-all duration-300 hover:border-solid hover:border-primary/50 hover:bg-white hover:shadow-[0_14px_32px_-20px_rgba(20,60,80,0.5)] sm:justify-between sm:gap-3 sm:px-5 sm:py-2.5"
        >
          <span className="flex min-w-0 items-center gap-2.5">
            <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-white">
              <Phone className="h-3.5 w-3.5" strokeWidth={2.5} aria-hidden />
            </span>
            <span className="min-w-0">
              <span className="block text-[12.5px] font-bold leading-tight text-navy sm:text-[14px]">
                Don&apos;t see your plan?
              </span>
              {/* Trimmed on mobile - the phone number sits right beside it, so
                  "we'll check your coverage in a minute" was a third line of
                  text restating what the tap already does. */}
              <span className="mt-0.5 block text-[11.5px] leading-tight text-navy/60 sm:text-[12.5px]">
                + many more PPO insurances
                <span className="hidden sm:inline">
                  {" "}- we&apos;ll check your coverage in a minute.
                </span>
              </span>
            </span>
          </span>

          <span className="shrink-0 whitespace-nowrap text-[13px] font-bold text-primary sm:text-[15px]">
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
      <div className="mt-10 sm:mt-16">
        <Reveal>
          <div className="rounded-3xl border border-beige-dark/50 bg-white p-4 shadow-[0_18px_44px_-28px_rgba(20,60,80,0.35)] sm:p-7 lg:p-9">
            <div className="mx-auto max-w-2xl text-center">
              <span className="inline-flex items-center gap-2 rounded-full bg-urgent/10 px-3 py-1.5">
                <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-urgent" aria-hidden />
                <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-urgent-dark">
                  Affordability
                </span>
              </span>

              <h2 className="mt-3 font-heading text-[1.35rem] leading-[1.12] tracking-[-0.02em] text-navy sm:mt-3.5 sm:text-[2rem] lg:text-[2.4rem]">
                Care within reach
              </h2>

              {/* Desktop only. The three cards below already say "three ways we
                  keep this affordable" plainly, so on a phone this line was a
                  restatement standing between the heading and the answer. */}
              <p className="mx-auto mt-3 hidden max-w-lg text-[0.95rem] leading-relaxed text-navy/60 sm:block sm:text-base">
                Three ways we keep an emergency from becoming a financial one.
              </p>
            </div>

            <div className="mt-5 grid gap-2.5 sm:mt-7 sm:gap-4 lg:grid-cols-3">
              {FINANCING.map((item, i) => {
                const Icon = item.icon;
                return (
                  <Reveal key={item.title} delay={i * 0.06}>
                    <div className="flex h-full min-w-0 items-center gap-3 rounded-2xl border border-beige-dark/50 bg-beige-light/60 p-3 transition-colors hover:border-primary/25 hover:bg-white sm:items-start sm:gap-3.5 sm:p-5">
                      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-urgent/10 text-urgent sm:h-10 sm:w-10 sm:rounded-xl">
                        <Icon className="h-4 w-4 sm:h-5 sm:w-5" strokeWidth={2.1} />
                      </span>
                      <div className="min-w-0">
                        <h3 className="font-heading text-[14px] leading-snug text-navy sm:text-[16.5px]">
                          {item.title}
                        </h3>
                        <p className="mt-0.5 text-[12px] leading-snug text-navy/60 sm:mt-1 sm:text-[13px] sm:leading-relaxed">
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
