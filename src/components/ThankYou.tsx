"use client";

import { useSyncExternalStore } from "react";
import { motion } from "framer-motion";
import {
  AlertOctagon,
  Ban,
  Check,
  Clock,
  LifeBuoy,
  MapPin,
  MessageSquareText,
  Navigation,
  Phone,
  PhoneCall,
  Stethoscope,
  Waves,
  Zap,
  type LucideIcon,
} from "lucide-react";
import { Reveal, Section, SectionHeading } from "./Section";
import { HOURS } from "@/lib/content";
import { forDisplay, readFirstName } from "@/lib/leadStore";
import { PHONE_DISPLAY, PHONE_SMS, PHONE_TEL, PRACTICE } from "@/lib/lp.config";

/** Easing used across the page - matches every other section. */
const EASE = [0.16, 1, 0.3, 1] as const;

const NEXT_STEPS: { icon: LucideIcon; time: string; title: string; body: string }[] = [
  {
    icon: PhoneCall,
    time: "Usually within the hour",
    title: "We call you back",
    body: "A real person from the Southampton office, on the number you just gave us.",
  },
  {
    icon: Clock,
    time: "Same day",
    title: "We find you a slot today",
    body: "We hold same-day slots open for emergencies. Call before 4pm and you'll almost always be seen today.",
  },
  {
    icon: Stethoscope,
    time: "At your visit",
    title: "We find the real cause",
    body: "Exam + digital X-rays $59 for patients with no insurance. We explain what's wrong, and what it costs, before we treat it.",
  },
];

/**
 * A trimmed first-aid set - the three scenarios most likely to be happening to
 * someone who just filled in the form and is now sitting waiting for a call.
 * The full five live on the landing page itself.
 *
 * Same clinician-review caveat as FirstAid.tsx: this is YMYL health content and
 * the wording still needs a named reviewer and a review date before it carries
 * paid traffic. The copy is unchanged from the approved version.
 */
const WHILE_YOU_WAIT: {
  icon: LucideIcon;
  title: string;
  urgent?: boolean;
  steps: string[];
  never?: string;
}[] = [
  {
    icon: AlertOctagon,
    title: "Knocked-out tooth",
    urgent: true,
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
    ],
  },
  {
    icon: Waves,
    title: "Swelling",
    urgent: true,
    steps: [
      "Apply a cold compress to the outside of your cheek.",
      "Call us - swelling shouldn't wait.",
    ],
    never: "Never apply heat.",
  },
];

/** Never fires - sessionStorage is written once, on the page the visitor just
    left, so there is nothing to subscribe to. useSyncExternalStore still
    requires the argument. */
const noopSubscribe = () => () => {};

/** The server has no sessionStorage, so it renders the generic greeting -
    which is also the correct final state for anyone who opens /thank-you
    directly without having submitted the form. */
const serverSnapshot = () => "";

/**
 * useSyncExternalStore rather than useState + useEffect. sessionStorage is an
 * external store, and this is the hook built for reading one without either
 * crashing the prerender or producing server markup that disagrees with the
 * client. React re-renders with the real value straight after hydration.
 */
function useFirstName(): string {
  return useSyncExternalStore(noopSubscribe, readFirstName, serverSnapshot);
}

export default function ThankYou() {
  const firstName = forDisplay(useFirstName());

  return (
    <>
      {/* ─── Confirmation ─────────────────────────────────────────────────
          Dark, because it needs to read as a distinct destination the instant
          it loads - a visitor who is in pain should never have to wonder
          whether the form actually submitted. */}
      <section className="relative w-full overflow-hidden bg-navy-dark px-4 py-14 sm:px-6 sm:py-20 lg:px-8 lg:py-24">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(55%_45%_at_50%_0%,rgba(15,138,109,0.28),transparent_70%)]"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 hidden opacity-[0.05] mix-blend-overlay sm:block"
          style={{ backgroundImage: "url('/images/noise.webp')" }}
        />

        <div className="relative mx-auto w-full max-w-2xl text-center">
          {/* The tick lands with a spring while the ring scales past it -
              half a second of "yes, that worked" before anyone reads a word. */}
          <motion.span
            initial={{ scale: 0.4, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", stiffness: 240, damping: 16 }}
            className="relative mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-urgent shadow-[0_16px_40px_-12px_rgba(15,138,109,0.9)] sm:h-20 sm:w-20"
          >
            <motion.span
              aria-hidden
              initial={{ scale: 1, opacity: 0.55 }}
              animate={{ scale: 1.65, opacity: 0 }}
              transition={{ duration: 1.1, ease: "easeOut", delay: 0.15 }}
              className="absolute inset-0 rounded-full bg-urgent"
            />
            <Check
              className="relative h-8 w-8 text-white sm:h-10 sm:w-10"
              strokeWidth={3}
              aria-hidden
            />
          </motion.span>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.12, ease: EASE }}
          >
            <div className="mb-3 flex items-center justify-center gap-2.5">
              <span className="h-px w-6 shrink-0 bg-steel-light/50" aria-hidden />
              <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-steel-light">
                Request received
              </span>
              <span className="h-px w-6 shrink-0 bg-steel-light/50" aria-hidden />
            </div>

            {/* Heading text is fixed regardless of personalisation, so the name
                arriving on mount can never reflow the largest element on the
                page. The greeting goes in the paragraph below instead. */}
            <h1
              className="font-heading text-white"
              style={{
                fontSize: "clamp(1.75rem, 7vw, 3rem)",
                lineHeight: 1.08,
                letterSpacing: "-0.025em",
              }}
            >
              We&apos;ve got your request
            </h1>

            <p className="mx-auto mt-4 max-w-lg text-[15px] leading-relaxed text-white/70 sm:text-[16.5px]">
              {firstName ? `Thanks, ${firstName} - someone` : "Someone"} from the
              office will call you shortly on the number you gave us. Keep your
              phone close.
            </p>
          </motion.div>

          {/* The page's actual job. Someone in pain who has just filled in a
              form is the most likely person on the whole site to call, and the
              form is the slower path - so the call button is bigger here than
              anywhere else on the campaign. */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.22, ease: EASE }}
            className="mt-8"
          >
            <p className="text-[13px] font-semibold text-white/80">
              In real pain right now? Don&apos;t wait for us to call.
            </p>

            <div className="mt-3 grid gap-2.5 sm:mx-auto sm:max-w-md sm:grid-cols-2 sm:gap-3">
              <a
                href={PHONE_TEL}
                data-cta="form-success-call"
                className="flex min-w-0 items-center justify-center gap-2 rounded-2xl bg-urgent px-4 py-4 text-[15.5px] font-bold text-white shadow-[0_14px_36px_-8px_rgba(15,138,109,0.75)] transition-all hover:bg-urgent-dark active:scale-[0.99] sm:text-[16px]"
              >
                <Phone className="h-4.5 w-4.5 shrink-0" strokeWidth={2.6} aria-hidden />
                <span className="truncate">{PHONE_DISPLAY}</span>
              </a>
              <a
                href={PHONE_SMS}
                data-cta="thanks-text"
                className="flex min-w-0 items-center justify-center gap-2 rounded-2xl border border-white/25 bg-white/10 px-4 py-4 text-[15.5px] font-bold text-white backdrop-blur-md transition-colors hover:bg-white/20 sm:text-[16px]"
              >
                <MessageSquareText className="h-4.5 w-4.5 shrink-0" strokeWidth={2.4} aria-hidden />
                Text us
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ─── Emergency escalation ───────────────────────────────────────────
          Immediately under the fold-line on a phone, not buried at the bottom.
          This is the only content on the page that is about someone's safety
          rather than their appointment. */}
      <div className="w-full bg-emergency-soft px-4 py-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: 0.35, ease: EASE }}
          className="mx-auto flex w-full max-w-3xl items-start gap-3 sm:items-center"
        >
          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-emergency text-white">
            <LifeBuoy className="h-4.5 w-4.5" strokeWidth={2.4} aria-hidden />
          </span>
          <p className="min-w-0 text-[13px] leading-snug text-emergency-dark sm:text-[13.5px]">
            <strong className="font-bold">Go to an emergency room</strong> if you
            have facial swelling that affects your breathing or swallowing, or
            bleeding you cannot stop.
          </p>
        </motion.div>
      </div>

      {/* ─── What happens next ───────────────────────────────────────────── */}
      <Section className="bg-white">
        <SectionHeading
          eyebrow="What happens next"
          title="Three things, and you're out of pain"
          align="center"
        />

        <ol className="mx-auto mt-9 grid max-w-5xl gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3">
          {NEXT_STEPS.map((step, i) => {
            const Icon = step.icon;
            // Reveal renders a div, so it goes *inside* the li - an
            // ol > div > li nesting would be invalid HTML and would cost the
            // list its semantics in a screen reader.
            return (
              <li key={step.title} className="h-full min-w-0">
                <Reveal delay={0.05 + i * 0.07} className="h-full">
                  <div className="flex h-full min-w-0 flex-col rounded-2xl border border-beige-dark/50 bg-white p-5 shadow-[0_1px_2px_rgba(20,60,80,0.04)] transition-all duration-300 hover:-translate-y-0.5 hover:border-primary/25 hover:shadow-[0_16px_36px_-24px_rgba(20,60,80,0.5)] sm:p-6">
                    <div className="flex items-center gap-3">
                      <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                        <Icon className="h-5.5 w-5.5" strokeWidth={2} aria-hidden />
                      </span>
                      <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-navy font-heading text-[13px] font-bold tabular-nums text-white">
                        {i + 1}
                      </span>
                    </div>

                    <span className="mt-4 text-[10px] font-bold uppercase tracking-[0.14em] text-primary">
                      {step.time}
                    </span>
                    <h3 className="mt-1 font-heading text-[17px] leading-snug text-navy sm:text-[18px]">
                      {step.title}
                    </h3>
                    <p className="mt-1.5 text-[13.5px] leading-relaxed text-navy/60">
                      {step.body}
                    </p>
                  </div>
                </Reveal>
              </li>
            );
          })}
        </ol>

        <p className="mx-auto mt-6 max-w-2xl text-center text-[11.5px] leading-relaxed text-navy/45">
          *Example price - confirm the final offer with the office.
        </p>
      </Section>

      {/* ─── While you wait ──────────────────────────────────────────────── */}
      <Section className="bg-beige-light">
        <SectionHeading
          eyebrow="While you wait"
          title="What you can do right now"
          lead="Quick, safe first aid to take the edge off until we see you. This is temporary - it doesn't replace being treated."
          align="center"
        />

        <div className="mt-9 grid gap-3.5 sm:grid-cols-2 sm:gap-4 lg:grid-cols-3">
          {WHILE_YOU_WAIT.map((aid, i) => {
            const Icon = aid.icon;
            return (
              <Reveal key={aid.title} delay={0.05 + i * 0.06} className="h-full">
                <article className="flex h-full min-w-0 flex-col overflow-hidden rounded-2xl border border-beige-dark/50 bg-white shadow-[0_1px_2px_rgba(20,60,80,0.04)]">
                  {aid.urgent && (
                    <p className="flex items-center gap-1.5 bg-emergency px-4 py-2 text-[10.5px] font-bold uppercase tracking-[0.08em] text-white">
                      <Clock className="h-3 w-3 shrink-0" strokeWidth={3} aria-hidden />
                      <span className="min-w-0">Don&apos;t wait - call us now</span>
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
        </div>
      </Section>

      {/* ─── Where to find us ────────────────────────────────────────────── */}
      <Section className="bg-white">
        <div className="mx-auto grid max-w-4xl gap-4 sm:gap-5 lg:grid-cols-2">
          <Reveal className="h-full">
            <div className="flex h-full min-w-0 flex-col rounded-2xl border border-beige-dark/50 bg-beige-light/60 p-5 sm:p-6">
              <div className="flex items-center gap-2.5">
                <MapPin className="h-4.5 w-4.5 shrink-0 text-primary" strokeWidth={2.2} aria-hidden />
                <h2 className="font-heading text-[17px] leading-snug text-navy sm:text-[18px]">
                  Where to find us
                </h2>
              </div>

              <address className="mt-3 not-italic text-[14px] leading-relaxed text-navy/70">
                {PRACTICE.street}
                <br />
                {PRACTICE.city}, {PRACTICE.state} {PRACTICE.zip}
              </address>

              <a
                href={PRACTICE.mapsQuery}
                target="_blank"
                rel="noopener noreferrer"
                data-cta="location-directions"
                className="mt-auto inline-flex w-full items-center justify-center gap-2 rounded-xl border border-primary/25 bg-white px-4 py-3 text-[14px] font-bold text-primary transition-colors hover:bg-primary hover:text-white"
              >
                <Navigation className="h-4 w-4 shrink-0" strokeWidth={2.4} aria-hidden />
                Get directions
              </a>
            </div>
          </Reveal>

          <Reveal delay={0.07} className="h-full">
            <div className="flex h-full min-w-0 flex-col rounded-2xl border border-beige-dark/50 bg-beige-light/60 p-5 sm:p-6">
              <div className="flex items-center gap-2.5">
                <Clock className="h-4.5 w-4.5 shrink-0 text-primary" strokeWidth={2.2} aria-hidden />
                <h2 className="font-heading text-[17px] leading-snug text-navy sm:text-[18px]">
                  Opening hours
                </h2>
              </div>

              <dl className="mt-3 space-y-1.5">
                {HOURS.map((h) => (
                  <div
                    key={h.day}
                    className="flex min-w-0 items-baseline justify-between gap-3 border-b border-beige-dark/40 pb-1.5 last:border-0"
                  >
                    <dt className="min-w-0 truncate text-[13.5px] text-navy/70">{h.day}</dt>
                    <dd className="shrink-0 text-[13.5px] font-semibold tabular-nums text-navy">
                      {h.time}
                    </dd>
                  </div>
                ))}
              </dl>

              <p className="mt-3 text-[12px] leading-relaxed text-navy/50">
                Outside these hours, leave us a message and we&apos;ll come back
                to you as soon as we open.
              </p>
            </div>
          </Reveal>
        </div>
      </Section>
    </>
  );
}
