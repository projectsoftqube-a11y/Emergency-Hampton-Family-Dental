"use client";

import { motion } from "framer-motion";
import ImageSlot from "./ImageSlot";
import { Section, SectionHeading } from "./Section";

const STEPS = [
  {
    time: "2 minutes",
    title: "Tell us what hurts",
    body: "A quick call so we know how urgent it is and can give you a time today.",
  },
  {
    time: "Same day",
    title: "Come in and we look",
    body: "Exam + X-rays to find the real cause - not a guess.",
  },
  {
    time: "Before treatment",
    title: "We explain it - and the cost",
    body: "In plain English. You choose what happens next.",
  },
  {
    time: "Today",
    title: "You go home out of pain",
    body: "We treat it, or get you comfortable until we can finish it properly.",
  },
];

export default function ProcessSteps() {
  return (
    <Section id="process" className="bg-white">
      <div className="grid gap-9 lg:grid-cols-[1fr_0.85fr] lg:items-start lg:gap-14">
        {/* Timeline - vertical at every width, so 320px is never a problem */}
        <div className="min-w-0 lg:order-1">
          <SectionHeading
            eyebrow="The process"
            title="What happens after you call"
          />

          <ol className="mt-7 space-y-0">
            {STEPS.map((step, i) => (
              <motion.li
                key={step.title}
                initial={{ opacity: 0, x: -14 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.45, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
                className="relative flex gap-3.5 pb-7 last:pb-0 sm:gap-4"
              >
                {/* Connector */}
                {i < STEPS.length - 1 && (
                  <span
                    aria-hidden
                    className="absolute bottom-2 left-[17px] top-9 w-px bg-gradient-to-b from-primary/35 to-beige sm:left-[19px]"
                  />
                )}

                <span className="relative z-10 flex h-[35px] w-[35px] shrink-0 items-center justify-center rounded-full bg-navy font-heading text-[14px] font-bold text-white ring-4 ring-white sm:h-[39px] sm:w-[39px] sm:text-[15px]">
                  {i + 1}
                </span>

                <div className="min-w-0 pt-1">
                  <span className="text-[10px] font-bold uppercase tracking-[0.14em] text-primary">
                    {step.time}
                  </span>
                  <h3 className="mt-1 font-heading text-[16px] leading-snug text-navy sm:text-[17.5px]">
                    {step.title}
                  </h3>
                  <p className="mt-1 text-[13px] leading-relaxed text-navy/60 sm:text-[13.5px]">
                    {step.body}
                  </p>
                </div>
              </motion.li>
            ))}
          </ol>
        </div>

        {/* Supporting photograph */}
        <motion.div
          initial={{ opacity: 0, scale: 0.97 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="relative min-w-0 lg:order-2 lg:sticky lg:top-24"
        >
          <ImageSlot
            label="Warm front-desk welcome"
            file="lp/process-reception.webp"
            dimensions="1200 × 1400"
            alt="Hampton Family Dental team member welcoming an emergency patient at the Southampton front desk"
            src="/images/lp/process-reception.webp"
            className="aspect-[4/5] w-full rounded-3xl sm:aspect-[5/4] lg:aspect-[4/5]"
            sizes="(max-width: 1024px) 100vw, 45vw"
          />
          {/* Floating stat card */}
          <div className="absolute -bottom-4 left-3 right-3 rounded-2xl bg-white/95 p-3.5 shadow-[0_18px_44px_-16px_rgba(20,60,80,0.45)] ring-1 ring-navy/8 backdrop-blur-sm sm:left-5 sm:right-auto sm:max-w-[16rem] sm:p-4">
            <p className="font-heading text-[15px] leading-snug text-navy sm:text-[16px]">
              Called in the morning, in the chair by lunch
            </p>
            <p className="mt-1 text-[11.5px] leading-snug text-navy/55">
              We keep same-day slots open every day for emergencies.
            </p>
          </div>
        </motion.div>
      </div>
    </Section>
  );
}
