import type { AccordionItem } from "@/components/Accordion";

/**
 * "While you're on your way to us" - temporary first aid, not treatment.
 *
 * NOTE: FirstAid.tsx no longer renders from this constant. It now presents the
 * same guidance as numbered steps with an explicit "never do this" line, which
 * this flat q/a shape cannot express. This is kept deliberately as the record
 * of the originally approved prose - the component's steps are a split of this
 * wording, not a rewrite of it, and it is the reference for the clinician
 * review below. Delete it only once that review signs off the step wording.
 */
export const FIRST_AID: AccordionItem[] = [
  {
    q: "Knocked-out tooth",
    a: "Hold it by the crown (not the root), gently rinse if it's dirty, and keep it in milk or your own saliva. Come in right away - time really matters here.",
  },
  {
    q: "Bad toothache",
    a: "Rinse with warm salt water, gently floss to clear any trapped food, and hold a cold compress to your cheek. Over-the-counter pain relief can help until you're seen.",
  },
  {
    q: "Swelling",
    a: "Apply a cold compress to the outside of your cheek - never heat. Call us; swelling can be a sign of infection that shouldn't wait.",
  },
  {
    q: "Broken or chipped tooth",
    a: "Rinse your mouth, save any pieces if you can, and use a cold compress for swelling. Try not to chew on that side.",
  },
  {
    q: "Bleeding after an injury",
    a: "Bite gently on clean gauze for 10–15 minutes. If heavy bleeding won't stop, seek urgent medical care.",
  },
];

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
