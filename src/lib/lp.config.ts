/**
 * Emergency Dentist LP - single source of truth for every value a marketer or
 * the office might need to change. Nothing below is hardcoded in the section
 * components, so a copy tweak never requires touching JSX.
 */

import { SITE_URL } from "@/lib/site";

export const PHONE_DISPLAY = "(215) 357-2224";
export const PHONE_TEL = "tel:+12153572224";
export const PHONE_SMS = "sms:+12153572224";

/**
 * Where the header and footer logos link to: this campaign's own root, i.e.
 * https://emergency.hamptonfamilydentist.com.
 *
 * Deliberately derived from SITE_URL rather than written out a second time.
 * Both values are "the address this landing page is deployed at", and keeping
 * two copies of that guarantees they drift the first time the campaign moves
 * to a different subdomain or gets reviewed on a Vercel preview URL. Change
 * NEXT_PUBLIC_SITE_URL and the logo follows.
 *
 * This is a same-origin self-link, so it opens in the same tab — the earlier
 * new-tab behaviour was there because the logo pointed off to the main
 * practice site, which was an exit path. Pointing at itself, a new tab would
 * just duplicate the page the visitor is already on.
 *
 * To point it back at the main practice site, set this to
 * "https://hamptonfamilydentist.com" and restore target="_blank" +
 * rel="noopener noreferrer" in LpHeader.tsx and LpFooter.tsx. To remove the
 * link entirely, set this to "".
 */
export const LOGO_HREF = SITE_URL;

export const PRACTICE = {
  name: "Hampton Family Dental",
  formerly: "formerly Brenner Dental Group",
  street: "283 Second Street Pike, Suite 140",
  city: "Southampton",
  state: "PA",
  zip: "18966",
  serving:
    "Serving Southampton, Richboro, Feasterville, Holland, Churchville & Ivyland",
  mapsQuery:
    "https://www.google.com/maps/search/?api=1&query=283+Second+Street+Pike,+Suite+140,+Southampton,+PA+18966",
} as const;

/**
 * Insurance carriers shown in the "PPO Insurances Accepted" strip.
 *
 * `slug` is also the filename the logo auto-detector looks for in
 * public/images/lp/insurance/ - e.g. `delta-dental.webp`. See
 * src/lib/insurance.ts. A carrier with no matching file renders as its name in
 * type, which is a perfectly good production state.
 *
 * CONFIRM this list with the office before launch. Listing a plan the practice
 * is not in-network for generates angry calls and refund requests.
 */
export type Carrier = {
  name: string;
  slug: string;
  /** Filled in at request time by getCarriers() when a file exists. */
  logo?: string;
};

export const CARRIERS: Carrier[] = [
  { name: "Cigna", slug: "cigna" },
  { name: "Aetna", slug: "aetna" },
  { name: "MetLife", slug: "metlife" },
  { name: "Guardian", slug: "guardian" },
  { name: "United Concordia", slug: "united-concordia" },
];

/**
 * REVIEW NOTES
 * ------------
 * The client-review draft carried [CONFIRM] (office to verify) and [DEV]
 * (developer to supply) annotations. Rather than delete that information -
 * which would lose the sign-off trail - they render as small amber notes that
 * are visibly *not* part of the page design.
 *
 * Now OFF by default - the page is past internal review, so no visitor should
 * ever see a [CONFIRM] or [DEV] note. The annotations themselves are kept in
 * the components rather than deleted, so the sign-off trail survives in the
 * source and can be read by whoever picks this up next.
 *
 * To bring the notes back for another review pass, set
 * NEXT_PUBLIC_LP_REVIEW_NOTES=true. Note the inverted default: this used to
 * be opt-out, so anyone relying on the old behaviour must now opt in.
 */
export const SHOW_REVIEW_NOTES =
  process.env.NEXT_PUBLIC_LP_REVIEW_NOTES === "true";

/**
 * Image placeholders render as designed, on-brand slots until real artwork
 * lands in /public/images/lp/.
 *
 * OFF: the filename chips ("lp/hero-emergency.webp") are developer scaffolding
 * and were showing on top of real photographs. Any slot still missing its
 * artwork keeps its on-brand woven placeholder - that degrades gracefully -
 * but no visitor sees a filename.
 *
 * Set back to `true` while adding new images, so the slots state which file
 * each one expects.
 */
export const SHOW_IMAGE_SLOT_LABELS: boolean = false;
