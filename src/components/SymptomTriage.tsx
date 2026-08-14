"use client";

import Image from "next/image";
import {
  Activity,
  AlertOctagon,
  ArrowRight,
  HelpCircle,
  Phone,
  Puzzle,
  Waves,
  Zap,
} from "lucide-react";
import { Reveal, Section, SectionHeading } from "./Section";
import { PHONE_TEL } from "@/lib/lp.config";

// `slug` is the filename the illustration auto-detector looks for in
// public/images/lp/symptoms/ (e.g. toothache.webp). No file → the lucide icon
// shows on a petrol gradient instead. See src/lib/symptomImages.ts.
const PROBLEMS = [
  {
    slug: "toothache",
    icon: Zap,
    title: "Throbbing toothache",
    detail: "Often infection or a deep cavity",
    tag: "Relief today",
    urgent: false,
  },
  {
    slug: "chipped",
    icon: Puzzle,
    title: "Chipped or broken tooth",
    detail: "Cracked from biting or an injury",
    tag: "Often 1 visit",
    urgent: false,
  },
  {
    slug: "swelling",
    icon: Waves,
    title: "Swelling or a bump on the gum",
    detail: "Don't wait on this one - call now",
    tag: "Seen urgently",
    urgent: true,
  },
  {
    slug: "knocked-out",
    icon: AlertOctagon,
    title: "Knocked-out tooth",
    detail: "Keep it moist, come straight in",
    tag: "Come now",
    urgent: true,
  },
  {
    slug: "lost-filling",
    icon: Activity,
    title: "Lost filling or crown",
    detail: "Sharp, hard to eat on",
    tag: "Quick repair",
    urgent: false,
  },
  {
    slug: "not-sure",
    icon: HelpCircle,
    title: "Not sure - it just hurts",
    detail: "That's completely fine",
    tag: "We'll find it",
    urgent: false,
  },
];

export default function SymptomTriage({
  images = {},
}: {
  images?: Record<string, string>;
}) {
  return (
    <Section id="symptoms" className="bg-beige-light">
      <SectionHeading
        eyebrow="Start here"
        title="What's Hurting?"
        lead="Give us a call for same-day treatment on any of the following below."
      />

      {/* Two-up from 390px. Stacked, six full-width photo cards ran to several
         screens of scrolling before the visitor reached anything else - on a
         page whose job is to get the call made. `xs` is not a default Tailwind
         breakpoint, hence the arbitrary min-width variant (same one the hero
         CTAs use). */}
      <div className="mt-8 grid gap-3 [@media(min-width:390px)]:grid-cols-2 sm:gap-5 lg:grid-cols-3">
        {PROBLEMS.map((problem, i) => {
          const Icon = problem.icon;
          const img = images[problem.slug];
          return (
            <Reveal key={problem.title} delay={i * 0.05}>
              <a
                href={PHONE_TEL}
                data-cta={`symptom-${i + 1}`}
                className="group flex h-full min-w-0 flex-col overflow-hidden rounded-3xl border border-white bg-white shadow-[0_10px_30px_-18px_rgba(20,60,80,0.3)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_30px_55px_-20px_rgba(20,60,80,0.42)]"
              >
                {/* ── Media banner ── */}
                {/* Shorter crop on mobile (16/10 -> 3/2) so two cards sit in a
                   row without the photos dominating; the original ratio comes
                   back from sm: up where each card has real width. */}
                <div className="relative aspect-[3/2] w-full overflow-hidden sm:aspect-[16/10]">
                  {img ? (
                    <Image
                      src={img}
                      alt=""
                      fill
                      // Two-up below 640px now, so each card is ~50vw there
                      // too - the old 100vw fetched images twice the size needed.
                      sizes="(max-width: 1024px) 50vw, 33vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-[1.06]"
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-primary to-navy-dark">
                      <Icon className="h-10 w-10 text-white/90" strokeWidth={1.8} aria-hidden />
                    </div>
                  )}

                  {/* Legibility scrim for the badge */}
                  <div
                    aria-hidden
                    className="absolute inset-0 bg-gradient-to-t from-navy-dark/45 via-transparent to-navy-dark/25"
                  />

                  {/* Urgency badge */}
                  <span
                    className={`absolute left-2 top-2 inline-flex max-w-[calc(100%-1rem)] items-center gap-1 truncate rounded-full px-2 py-0.5 text-[8.5px] font-bold uppercase tracking-wide shadow-sm backdrop-blur-sm sm:left-3 sm:top-3 sm:gap-1.5 sm:px-2.5 sm:py-1 sm:text-[10px] ${
                      problem.urgent
                        ? "bg-emergency text-white"
                        : "bg-white/95 text-emerald-700"
                    }`}
                  >
                    {problem.urgent && (
                      <span className="relative flex h-1.5 w-1.5">
                        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-white/80" />
                        <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-white" />
                      </span>
                    )}
                    {problem.tag}
                  </span>
                </div>

                {/* ── Body ── */}
                <div className="flex flex-1 flex-col p-3 sm:p-5">
                  <h3 className="min-w-0 font-heading text-[14.5px] leading-snug text-navy [@media(min-width:480px)]:text-[16px] sm:text-[18.5px]">
                    {problem.title}
                  </h3>

                  <span
                    className={`mt-2.5 inline-flex items-center gap-1.5 text-[11.5px] font-bold sm:mt-4 sm:text-[12.5px] ${
                      problem.urgent ? "text-emergency" : "text-primary"
                    }`}
                  >
                    <Phone className="h-3.5 w-3.5 shrink-0" strokeWidth={2.6} aria-hidden />
                    Call now
                    <ArrowRight
                      className="h-3.5 w-3.5 shrink-0 transition-transform duration-300 group-hover:translate-x-1"
                      strokeWidth={2.6}
                      aria-hidden
                    />
                  </span>
                </div>
              </a>
            </Reveal>
          );
        })}
      </div>
    </Section>
  );
}
