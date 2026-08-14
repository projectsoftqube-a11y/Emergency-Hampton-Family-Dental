"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { MessageSquareText, Phone } from "lucide-react";
import {
  LOGO_HREF,
  PHONE_DISPLAY,
  PHONE_SMS,
  PHONE_TEL,
  PRACTICE,
} from "@/lib/lp.config";

const EASE = [0.16, 1, 0.3, 1] as const;

/**
 * `year` is passed in from the server component rather than computed here with
 * `new Date()`, which would be evaluated once during SSR and again on hydration
 * and can mismatch across a new year's boundary.
 */
export default function LpFooter({ year }: { year: number }) {
  return (
    <footer className="relative w-full overflow-hidden bg-navy-dark px-4 py-12 text-center sm:px-6 sm:py-16 lg:px-8">
      {/* Radial gradient rather than a blurred circle - see OfferBand. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(45%_35%_at_50%_0%,rgba(15,138,109,0.24),transparent_70%)]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 hidden opacity-[0.05] mix-blend-overlay sm:block"
        style={{ backgroundImage: "url('/images/noise.webp')" }}
      />

      {/* The footer is the last thing on the page, so it always enters from
          below the fold - it earns an entry animation more than most sections.
          Staggered so the logo, the closing headline and the CTAs arrive in
          reading order rather than all at once. */}
      <motion.div
        initial="hidden"
        whileInView="shown"
        viewport={{ once: true, margin: "-60px" }}
        transition={{ staggerChildren: 0.08 }}
        variants={{ hidden: {}, shown: {} }}
        className="relative mx-auto w-full max-w-2xl"
      >
        {/* Same reasoning as the header: the wordmark carries the name, and its
            petrol lettering needs a light surface to read against. Links to
            this campaign's own root, in the same tab. */}
        <motion.a
          variants={{
            hidden: { opacity: 0, y: 16 },
            shown: { opacity: 1, y: 0 },
          }}
          transition={{ duration: 0.5, ease: EASE }}
          href={LOGO_HREF}
          data-cta="footer-logo"
          aria-label={`${PRACTICE.name} - emergency dentist in ${PRACTICE.city}, ${PRACTICE.state}`}
          className="mx-auto mb-6 inline-flex rounded-xl bg-white px-4 py-2.5 transition-opacity hover:opacity-85 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
        >
          <Image
            src="/logo.avif"
            alt="Hampton Family Dental"
            width={1282}
            height={321}
            className="h-8 w-auto sm:h-10"
          />
        </motion.a>

        <motion.h2
          variants={{
            hidden: { opacity: 0, y: 16 },
            shown: { opacity: 1, y: 0 },
          }}
          transition={{ duration: 0.5, ease: EASE }}
          className="font-heading text-white"
          style={{
            fontSize: "clamp(1.4rem, 5.5vw, 2.4rem)",
            lineHeight: 1.1,
            letterSpacing: "-0.025em",
          }}
        >
          In pain? Don&apos;t wait it out - call us.
        </motion.h2>

        <motion.div
          variants={{
            hidden: { opacity: 0, y: 16 },
            shown: { opacity: 1, y: 0 },
          }}
          transition={{ duration: 0.5, ease: EASE }}
          className="mt-6 grid gap-2.5 sm:mx-auto sm:max-w-md sm:grid-cols-2 sm:gap-3"
        >
          <a
            href={PHONE_TEL}
            data-cta="footer-call"
            className="flex items-center justify-center gap-2 rounded-2xl bg-urgent px-4 py-3.5 text-[15px] font-bold text-white shadow-[0_12px_32px_-8px_rgba(15,138,109,0.7)] transition-colors hover:bg-urgent-dark"
          >
            <Phone className="h-4 w-4 shrink-0" strokeWidth={2.6} aria-hidden />
            <span className="whitespace-nowrap">{PHONE_DISPLAY}</span>
          </a>
          <a
            href={PHONE_SMS}
            data-cta="footer-text"
            className="flex items-center justify-center gap-2 rounded-2xl border border-white/25 bg-white/10 px-4 py-3.5 text-[15px] font-bold text-white backdrop-blur-md transition-colors hover:bg-white/18"
          >
            <MessageSquareText className="h-4 w-4 shrink-0" strokeWidth={2.4} aria-hidden />
            Text us
          </a>
        </motion.div>

        <motion.div
          variants={{
            hidden: { opacity: 0, y: 14 },
            shown: { opacity: 1, y: 0 },
          }}
          transition={{ duration: 0.5, ease: EASE }}
        >
          <p className="mt-7 text-[12.5px] leading-relaxed text-steel-light/70">
            {PRACTICE.street}, {PRACTICE.city}, {PRACTICE.state} {PRACTICE.zip}
          </p>
          <p className="mt-2 text-[11.5px] leading-relaxed text-white/60">
            Formerly Brenner Dental Group · *Example price - confirm final offer
            with office.
          </p>

          <p className="mt-5 text-[11px] text-white/55">
            © {year} {PRACTICE.name}. All rights reserved.
          </p>
        </motion.div>
      </motion.div>
    </footer>
  );
}
