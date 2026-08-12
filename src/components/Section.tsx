"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

/**
 * Shared section shell. Owns the one thing every section must get right:
 * horizontal padding that still leaves readable content at a 320px viewport
 * (16px gutters → 288px of content) while opening up on larger screens.
 */
export function Section({
  id,
  children,
  className,
  containerClassName,
}: {
  id?: string;
  children: React.ReactNode;
  className?: string;
  containerClassName?: string;
}) {
  return (
    <section
      id={id}
      className={cn("relative w-full overflow-hidden py-12 sm:py-16 lg:py-24", className)}
    >
      <div
        className={cn(
          "mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8",
          containerClassName
        )}
      >
        {children}
      </div>
    </section>
  );
}

/** Eyebrow + heading + optional lead paragraph, animated in on scroll. */
export function SectionHeading({
  eyebrow,
  title,
  lead,
  align = "left",
  tone = "light",
}: {
  eyebrow?: string;
  title: React.ReactNode;
  lead?: React.ReactNode;
  align?: "left" | "center";
  tone?: "light" | "dark";
}) {
  const dark = tone === "dark";

  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      className={cn("max-w-2xl", align === "center" && "mx-auto text-center")}
    >
      {eyebrow && (
        <div
          className={cn(
            "mb-3 flex items-center gap-2.5",
            align === "center" && "justify-center"
          )}
        >
          <span
            className={cn(
              "h-px w-6 shrink-0",
              dark ? "bg-steel-light/50" : "bg-primary/40"
            )}
          />
          <span
            className={cn(
              "text-[10px] font-semibold uppercase tracking-[0.2em]",
              dark ? "text-steel-light" : "text-primary"
            )}
          >
            {eyebrow}
          </span>
        </div>
      )}

      <h2
        className={cn(
          "font-heading text-[1.6rem] leading-[1.12] tracking-[-0.02em] sm:text-[2rem] lg:text-[2.6rem]",
          dark ? "text-white" : "text-navy"
        )}
      >
        {title}
      </h2>

      {lead && (
        <p
          className={cn(
            "mt-3 text-[0.95rem] leading-relaxed sm:text-base",
            dark ? "text-white/65" : "text-navy/60"
          )}
        >
          {lead}
        </p>
      )}
    </motion.div>
  );
}

/** Staggered fade-up wrapper for grids and lists. */
export function Reveal({
  children,
  delay = 0,
  className,
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.45, delay, ease: [0.16, 1, 0.3, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
