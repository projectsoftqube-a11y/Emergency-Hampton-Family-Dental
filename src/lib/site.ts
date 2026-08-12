/**
 * Base URL for canonical tags, Open Graph URLs and JSON-LD @id values.
 *
 * Set NEXT_PUBLIC_SITE_URL in .env.local (and in the host's environment
 * variables) to wherever this landing page is actually deployed - e.g.
 * https://get.hamptonfamilydentist.com or a Vercel preview URL. Leaving it
 * unset means canonical tags point at the fallback below, which is almost
 * certainly wrong for a live campaign.
 */
export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ||
  "https://hamptonfamilydentist.com";

export function absoluteUrl(path = "") {
  if (!path) return SITE_URL;
  if (/^https?:\/\//i.test(path)) return path;
  return `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`;
}
