"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import Lenis from "lenis";

/**
 * Lenis smooth scrolling, mounted once in the root layout.
 *
 * Renders nothing — it exists purely to own the Lenis instance's lifecycle.
 *
 * Three things this has to get right on a page shown to people in pain:
 *
 * 1. `prefers-reduced-motion` genuinely disables it. Smooth scroll is exactly
 *    the kind of motion that setting exists to switch off, and hijacked
 *    scrolling is a vestibular trigger. The listener means toggling the OS
 *    setting takes effect without a reload, rather than leaving someone who
 *    just turned it on still stuck with a hijacked wheel.
 *
 * 2. Touch is left alone. Lenis defaults `syncTouch` to false, which is
 *    correct — native momentum scrolling on a phone is better than anything
 *    re-implemented in JS, and this page's traffic is overwhelmingly mobile.
 *
 * 3. Anchors are handed to Lenis. The skip link and the symptom cards use
 *    in-page hrefs, and without this they would jump instantly while
 *    everything else eased. The -80px offset mirrors the `scroll-padding-top`
 *    in globals.css so a target never lands under the sticky header.
 */
export default function SmoothScroll() {
  const lenisRef = useRef<Lenis | null>(null);
  const pathname = usePathname();
  /** Route-change scroll reset must not fire on first mount — it would
      override a deep link like /#faq before the browser has honoured it. */
  const mounted = useRef(false);

  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");

    const start = () => {
      if (lenisRef.current) return;
      lenisRef.current = new Lenis({
        // Slightly under the Lenis default. The page is tall and the content
        // is urgent; a long glide makes someone hunting for the phone number
        // feel like the page is resisting them.
        duration: 1.05,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        anchors: true,
        autoRaf: true,
      });
    };

    const stop = () => {
      lenisRef.current?.destroy();
      lenisRef.current = null;
    };

    const sync = () => (query.matches ? stop() : start());

    sync();
    query.addEventListener("change", sync);

    return () => {
      query.removeEventListener("change", sync);
      stop();
    };
  }, []);

  // Lenis keeps its own scroll position, so a client-side navigation
  // (the form redirecting to /thank-you) would otherwise land mid-page.
  useEffect(() => {
    if (!mounted.current) {
      mounted.current = true;
      return;
    }
    lenisRef.current?.scrollTo(0, { immediate: true });
  }, [pathname]);

  return null;
}
