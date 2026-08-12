"use client";

import { motion } from "framer-motion";
import { Plus } from "lucide-react";
import { cn } from "@/lib/utils";

export type AccordionItem = {
  q: string;
  a: string;
};

/**
 * Built on native <details>/<summary> rather than a JS disclosure widget.
 * Three reasons that matters here: it is keyboard- and screen-reader-correct
 * with zero ARIA, the answers exist in the server HTML (so Google and AI
 * answer engines can read them for FAQ rich results), and it costs no JS.
 */
export default function Accordion({
  items,
  defaultOpenFirst = true,
  tone = "light",
  name,
}: {
  items: AccordionItem[];
  defaultOpenFirst?: boolean;
  tone?: "light" | "dark";
  /**
   * Pass a shared name to make the group exclusive - opening one panel closes
   * whichever was open. This is the native `<details name>` behaviour, so it
   * still costs no JS and keeps the answers in the server HTML for rich
   * results. Omit it and every panel opens independently, as before.
   */
  name?: string;
}) {
  const dark = tone === "dark";

  return (
    <div className="mt-6 space-y-2.5">
      {items.map((item, i) => (
        // motion.details rather than a wrapping div: `space-y` needs the rows
        // to stay direct children, and `<details name>` only behaves as an
        // exclusive group when the elements are siblings.
        <motion.details
          key={item.q}
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.4, delay: i * 0.06, ease: [0.16, 1, 0.3, 1] }}
          name={name}
          open={defaultOpenFirst && i === 0}
          className={cn(
            "group min-w-0 rounded-2xl border transition-colors",
            dark
              ? "border-white/12 bg-white/5 open:border-white/25 open:bg-white/8"
              : "border-beige bg-beige-light/50 open:border-primary/25 open:bg-white"
          )}
        >
          <summary
            className={cn(
              "flex list-none items-center justify-between gap-3 px-4 py-3.5 text-left sm:px-5 sm:py-4",
              "[&::-webkit-details-marker]:hidden",
              "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
            )}
          >
            <span
              className={cn(
                "min-w-0 font-heading text-[14.5px] leading-snug sm:text-[16px]",
                dark ? "text-white" : "text-navy"
              )}
            >
              {item.q}
            </span>
            <span
              aria-hidden
              className={cn(
                "flex h-6 w-6 shrink-0 items-center justify-center rounded-full transition-all duration-300 group-open:rotate-45",
                dark
                  ? "bg-white/10 text-steel-light group-open:bg-white/20"
                  : "bg-primary/10 text-primary group-open:bg-primary group-open:text-white"
              )}
            >
              <Plus className="h-3.5 w-3.5" strokeWidth={2.8} aria-hidden />
            </span>
          </summary>

          <p
            className={cn(
              "min-w-0 px-4 pb-4 text-[13px] leading-relaxed sm:px-5 sm:pb-5 sm:text-[13.5px]",
              dark ? "text-white/65" : "text-navy/62"
            )}
          >
            {item.a}
          </p>
        </motion.details>
      ))}
    </div>
  );
}
