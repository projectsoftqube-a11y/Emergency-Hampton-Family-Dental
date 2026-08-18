"use client";

import { useEffect, useRef } from "react";

/**
 * Google Ads conversion event for the "Submit lead form" action.
 *
 * Google's instructions say to paste the event snippet into the <head> of the
 * conversion page. That assumes a classic multi-page site where reaching the
 * thank-you URL means a fresh document load. This is an App Router SPA: the
 * form calls router.push("/thank-you"), so no new document is parsed and an
 * inline <head> script would not re-run. Firing on mount is the equivalent -
 * it runs exactly when the visitor arrives at the conversion page, however
 * they got there.
 *
 * Renders nothing.
 */
export default function AdsConversion({ sendTo }: { sendTo: string }) {
  // StrictMode runs effects twice in development. Without this guard that
  // would report two conversions per lead locally - harmless in production,
  // but it makes the Ads debug view untrustworthy while testing.
  const fired = useRef(false);

  useEffect(() => {
    if (fired.current) return;
    fired.current = true;

    // gtag is defined by the inline config block in layout.tsx. If the tag is
    // still loading (or blocked by an ad blocker) the queue does not exist yet
    // - push straight onto dataLayer, which is exactly what gtag() itself
    // does, so the event is picked up whenever the library arrives.
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push(["event", "conversion", { send_to: sendTo }]);
  }, [sendTo]);

  return null;
}
