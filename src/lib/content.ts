import type { AccordionItem } from "@/components/Accordion";

/** "Quick answers" - also emitted as FAQPage structured data. */
export const FAQS: AccordionItem[] = [
  {
    q: "Can I really be seen today?",
    a: "Yes - we keep same-day slots open for emergencies. Call before 4pm and you'll almost always be seen the same day.",
  },
  {
    q: "What will it cost?",
    a: "Your exam + digital X-rays start at $59 for patients with no insurance. We always explain the cost of any treatment before we do it.",
  },
  {
    q: "Do I have to be an existing patient?",
    a: "No - most of our emergency visits are people we've never met. You're welcome here.",
  },
  {
    q: "I don't have insurance. Can you still help?",
    a: "Absolutely. Ask about our membership plan and payment options.",
  },
  {
    q: "I'm nervous - will it hurt?",
    a: "Our team is known for being gentle. We'll keep you comfortable and talk you through every step.",
  },
];

/**
 * Confirmed with the office - every day now has a real value, so there is no
 * longer a `confirm` flag or a "Call for hours" fallback anywhere.
 */
export const HOURS: { day: string; time: string }[] = [
  { day: "Monday", time: "9 AM – 5 PM" },
  { day: "Tuesday", time: "9 AM – 6 PM" },
  { day: "Wednesday", time: "8 AM – 2 PM" },
  { day: "Thursday", time: "8 AM – 5 PM" },
  { day: "Friday", time: "Closed" },
  { day: "Saturday", time: "Closed" },
  { day: "Sunday", time: "Closed" },
];
