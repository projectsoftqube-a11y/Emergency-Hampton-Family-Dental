"use client";

import { useEffect } from "react";
import { claimConversion } from "@/lib/leadStore";

/**
 * Google Ads conversion event for the "Submit lead form" action.
 *
 * Google's instructions say to paste the event snippet into the <head> of the
 * conversion page. That assumes a classic multi-page site where reaching the
 * thank-you URL means a fresh document load. This is an App Router SPA: the
 * form calls router.push("/thank-you"), so no new document is parsed and an
 * inline <head> script would never re-run. Firing on mount is the true
 * equivalent - it runs exactly when the visitor arrives at the conversion
 * page.
 *
 * Three things can each cause a conversion to be counted more than once, or
 * counted when no lead exists. All three are handled here rather than by
 * asking whoever configures GTM to remember a rule:
 *
 *  1. Duplicate tag in GTM. If a Google Ads Conversion Tracking tag for this
 *     same label is also added inside the container, both would fire for one
 *     lead. `window.__hfdAdsConversionFired` is claimed by whichever path runs
 *     first, and a GTM tag can gate on it with a Custom JavaScript blocking
 *     trigger - see README. Also stops a second mount in the same document.
 *
 *  2. Refresh or back-button. The visitor lands on /thank-you again and the
 *     component mounts again. `claimConversion()` consumes a one-time token
 *     written at submit time, so the second mount finds nothing to claim.
 *
 *  3. A visit with no lead behind it - a bookmark, a shared link, someone
 *     typing the URL. Same token: it was never written, so nothing fires.
 *
 * Renders nothing.
 */
export default function AdsConversion({ sendTo }: { sendTo: string }) {
  useEffect(() => {
    // Cross-path guard (case 1). Checked before the token is claimed so a
    // GTM-fired conversion does not silently eat the token.
    if (window.__hfdAdsConversionFired) return;

    // One-time token (cases 2 and 3). Claiming deletes it.
    if (!claimConversion()) return;

    window.__hfdAdsConversionFired = true;

    // gtag() is defined by the inline config block in layout.tsx. Pushing
    // straight onto dataLayer is exactly what gtag() itself does, so the event
    // is still picked up if the library has not finished loading yet.
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push(["event", "conversion", { send_to: sendTo }]);
  }, [sendTo]);

  return null;
}
