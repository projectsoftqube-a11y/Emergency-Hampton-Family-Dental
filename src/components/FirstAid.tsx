"use client";

import {
  Activity,
  AlertOctagon,
  Ban,
  Clock,
  LifeBuoy,
  Phone,
  Puzzle,
  Waves,
  Zap,
  type LucideIcon,
} from "lucide-react";
import { Reveal, Section } from "./Section";
import { PHONE_DISPLAY, PHONE_TEL } from "@/lib/lp.config";

/**
 * First aid, restructured from the prose in @/lib/content.
 *
 * The old version rendered these through the shared Accordion, so every
 * instruction but the first was collapsed behind a click. That is the wrong
 * pattern for this content: someone holding a knocked-out tooth is not going
 * to hunt through five closed panels, and a knocked-out tooth is the one case
 * on this page where minutes genuinely change the outcome. Everything is
 * visible at once now.
 *
 * `steps` are ordered actions. `never` is the single most common mistake for
 * that scenario - the thing that actively makes it worse - which prose buries
 * mid-sentence and a red line makes unmissable.
 *
 * The wording is unchanged from the approved copy in lib/content.ts; it has
 * only been split into steps.
 *
 * OUTSTANDING - carried over from the review notes, which are now switched off
 * site-wide: a clinician still needs to sign off this first-aid wording. This
 * is YMYL health content, so the live page should carry a named reviewer and a
 * review date. That requirement did not go away with the amber note; it just
 * lives here now.
 */
type Aid = {
  icon: LucideIcon;
  title: string;
  /** Shown when the clock genuinely matters. */
  urgent?: string;
  steps: string[];
  never?: string;
};

const FIRST_AID: Aid[] = [
  {
    icon: AlertOctagon,
    title: "Knocked-out tooth",
    urgent: "Time-critical - come in now",
    steps: [
      "Hold it by the crown, never the root.",
      "Gently rinse it if it's dirty.",
      "Keep it in milk or your own saliva.",
    ],
    never: "Don't scrub it or wrap it in tissue.",
  },
  {
    icon: Zap,
    title: "Bad toothache",
    steps: [
      "Rinse with warm salt water.",
      "Gently floss to clear any trapped food.",
      "Hold a cold compress to your cheek.",
      "Over-the-counter pain relief can help until you're seen.",
    ],
  },
  {
    icon: Waves,
    title: "Swelling",
    urgent: "May signal infection - don't wait",
    steps: [
      "Apply a cold compress to the outside of your cheek.",
      "Call us - swelling shouldn't wait.",
    ],
    never: "Never apply heat.",
  },
  {
    icon: Puzzle,
    title: "Broken or chipped tooth",
    steps: [
      "Rinse your mouth.",
      "Save any pieces if you can.",
      "Use a cold compress for swelling.",
    ],
    never: "Try not to chew on that side.",
  },
  {
    icon: Activity,
    title: "Bleeding after an injury",
    steps: [
      "Bite gently on clean gauze for 10–15 minutes.",
      "If heavy bleeding won't stop, seek urgent medical care.",
    ],
  },
];

export default function FirstAid() {
  return (
    <Section id="first-aid" className="bg-beige-light">
      {/* ── Header ── */}
      <div className="mx-auto max-w-2xl text-center">
        <div className="flex items-center justify-center gap-2.5">
          <span className="h-px w-6 shrink-0 bg-primary/40" aria-hidden />
          <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-primary">
            Right now
          </span>
          <span className="h-px w-6 shrink-0 bg-primary/40" aria-hidden />
        </div>

        <h2 className="mt-3 font-heading text-[1.6rem] leading-[1.12] tracking-[-0.02em] text-navy sm:text-[2rem] lg:text-[2.6rem]">
          While you&apos;re on your way to us
        </h2>

        <p className="mx-auto mt-3 max-w-xl text-[0.95rem] leading-relaxed text-navy/60 sm:text-base">
          Quick, safe first aid to ease things until we see you. This is
          temporary - call us for treatment.
        </p>
      </div>

      {/* ── ER escalation ──
          Moved above the cards and widened. It was previously tucked under the
          phone button in the left column, below the fold on most phones - the
          worst possible placement for the one instruction on this page that is
          genuinely about someone's safety. */}
      <Reveal delay={0.04}>
        <div className="mx-auto mt-8 flex max-w-3xl items-start gap-3 rounded-2xl border border-emergency/30 bg-emergency-soft px-4 py-3.5 sm:items-center sm:px-5">
          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-emergency text-white">
            <LifeBuoy className="h-4.5 w-4.5" strokeWidth={2.4} aria-hidden />
          </span>
          <p className="min-w-0 text-[13px] leading-snug text-emergency-dark sm:text-[13.5px]">
            <strong className="font-bold">Go to an emergency room</strong> if you
            have facial swelling that affects your breathing or swallowing, or
            bleeding you cannot stop.
          </p>
        </div>
      </Reveal>

      {/* ── Cards ──
          Auto-fit grid rather than fixed columns, so the five cards reflow
          without leaving a stranded single card on a row of its own. */}
      <div className="mt-5 grid gap-3.5 sm:mt-6 sm:grid-cols-2 sm:gap-4 lg:grid-cols-3">
        {FIRST_AID.map((aid, i) => {
          const Icon = aid.icon;

          return (
            <Reveal key={aid.title} delay={0.05 + i * 0.05}>
              {/* overflow-hidden so the urgency bar can sit flush to the
                  card's rounded top edge. */}
              <article className="flex h-full min-w-0 flex-col overflow-hidden rounded-2xl border border-beige-dark/50 bg-white shadow-[0_1px_2px_rgba(20,60,80,0.04)] transition-all duration-300 hover:-translate-y-0.5 hover:border-primary/25 hover:shadow-[0_16px_36px_-24px_rgba(20,60,80,0.5)]">
                {/*
                  Urgency reads as a full-width bar across the top of the card,
                  not a pill beside the title.

                  As a pill it was a long uppercase string with letter-spacing
                  squeezed into a narrow column - it wrapped onto two lines and
                  broke the card. A bar has the whole card width to work with,
                  so the text stays on one line, and a solid red edge is a
                  stronger signal at a glance than a tinted chip.
                */}
                {aid.urgent && (
                  <p className="flex items-center gap-1.5 bg-emergency px-4 py-2 text-[10.5px] font-bold uppercase tracking-[0.08em] text-white">
                    <Clock className="h-3 w-3 shrink-0" strokeWidth={3} aria-hidden />
                    <span className="min-w-0">{aid.urgent}</span>
                  </p>
                )}

                <div className="flex flex-1 flex-col p-5">
                  <div className="flex items-center gap-3">
                    <span
                      className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${
                        aid.urgent
                          ? "bg-emergency/10 text-emergency"
                          : "bg-primary/10 text-primary"
                      }`}
                    >
                      <Icon className="h-5.5 w-5.5" strokeWidth={2} aria-hidden />
                    </span>

                    <h3 className="min-w-0 font-heading text-[16px] leading-snug text-navy sm:text-[17px]">
                      {aid.title}
                    </h3>
                  </div>

                {/* Numbered so the order is unambiguous - with a knocked-out
                    tooth, doing step three before step one damages the root. */}
                <ol className="mt-4 flex-1 space-y-2.5">
                  {aid.steps.map((step, s) => (
                    <li key={step} className="flex min-w-0 gap-2.5">
                      <span
                        className="mt-px flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-beige-light text-[10.5px] font-bold tabular-nums text-primary ring-1 ring-beige-dark/50"
                        aria-hidden
                      >
                        {s + 1}
                      </span>
                      <span className="min-w-0 text-[13px] leading-relaxed text-navy/75">
                        {step}
                      </span>
                    </li>
                  ))}
                </ol>

                  {aid.never && (
                    <p className="mt-4 flex min-w-0 items-start gap-2 rounded-lg bg-emergency-soft px-3 py-2 text-[12px] font-semibold leading-snug text-emergency-dark">
                      <Ban className="mt-px h-3.5 w-3.5 shrink-0" strokeWidth={2.6} aria-hidden />
                      <span className="min-w-0">{aid.never}</span>
                    </p>
                  )}
                </div>
              </article>
            </Reveal>
          );
        })}

        {/* Call CTA occupies the sixth cell, so the grid completes rather than
            leaving a hole - and the action sits where the reading ends. */}
        <Reveal delay={0.3}>
          <div className="flex h-full min-w-0 flex-col justify-center rounded-2xl border border-urgent/25 bg-urgent-soft p-5 text-center">
            <p className="font-heading text-[17px] leading-snug text-navy">
              None of this replaces being seen.
            </p>
            <p className="mt-1.5 text-[13px] leading-relaxed text-navy/65">
              Tell us what happened and we&apos;ll get you in today.
            </p>

            <a
              href={PHONE_TEL}
              data-cta="firstaid-call"
              className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-urgent px-4 py-3.5 text-[15px] font-bold text-white shadow-[0_12px_30px_-10px_rgba(15,138,109,0.65)] transition-all hover:bg-urgent-dark active:scale-[0.99]"
            >
              <Phone className="h-4 w-4 shrink-0" strokeWidth={2.6} aria-hidden />
              <span className="truncate">Call {PHONE_DISPLAY}</span>
            </a>
          </div>
        </Reveal>
      </div>
    </Section>
  );
}
