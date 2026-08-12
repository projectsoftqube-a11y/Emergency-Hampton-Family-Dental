"use client";

import Accordion from "./Accordion";
import { Section, SectionHeading } from "./Section";
import { FAQS } from "@/lib/content";

export default function Faq() {
  return (
    <Section id="faq" className="bg-white">
      <div className="mx-auto max-w-3xl">
        <SectionHeading
          eyebrow="Before you call"
          title="Quick answers"
          align="center"
        />
        {/* Shared name → only one answer open at a time. */}
        <Accordion items={FAQS} name="lp-faq" />
      </div>
    </Section>
  );
}
