"use client";

import { useEffect, useState, useSyncExternalStore } from "react";
import { MessageSquareText, Phone } from "lucide-react";
import { PHONE_DISPLAY, PHONE_SMS, PHONE_TEL } from "@/lib/lp.config";

/**
 * Mobile-only. On desktop the LP header is already sticky with a call button,
 * so a second fixed bar would just eat viewport. The page root reserves
 * bottom padding (pb-[76px] md:pb-0) so this never covers footer content.
 *
 * Hidden while the hero is on screen. The hero already shows the same
 * Call/Text pair, so the fixed bar was sitting directly on top of those
 * buttons on a 390px screen - two identical CTAs fighting for the same few
 * hundred pixels, with the fixed one covering the hero's. It slides up once
 * the hero has scrolled away and the visitor no longer has a call button.
 *
 * env(safe-area-inset-bottom) keeps the buttons clear of the iOS home
 * indicator - without it the bottom ~20px of the tap target is unreachable.
 */
export default function StickyCallBar() {
  /*
    Routes without a hero (e.g. /thank-you) have no scroll trigger, and there
    this bar is the only call affordance - so it must show straight away.

    useSyncExternalStore rather than reading `document` in a useState
    initialiser: the server has no DOM and would render `false`, so a lazy
    initialiser that returned `true` on the client would be a hydration
    mismatch. This hook is built for exactly that split - the third argument
    is the server snapshot, and React re-reads the client one after mount.
  */
  const hasHero = useSyncExternalStore(
    () => () => {},
    () => document.getElementById("hero") !== null,
    () => true
  );

  const [scrolledPast, setScrolledPast] = useState(false);
  const visible = !hasHero || scrolledPast;

  useEffect(() => {
    const hero = document.getElementById("hero");
    if (!hero) return;

    const io = new IntersectionObserver(
      ([entry]) => setScrolledPast(!entry.isIntersecting),
      // Fires the moment the hero's last pixel leaves the viewport.
      { threshold: 0 }
    );

    io.observe(hero);
    return () => io.disconnect();
  }, []);

  return (
    <div
      // Kept mounted and translated out of view rather than unmounted, so the
      // transition can play and the tel: links stay in the DOM for crawlers.
      // aria-hidden + inert while off-screen keeps it out of the tab order.
      aria-hidden={!visible}
      inert={!visible}
      className={`fixed inset-x-0 bottom-0 z-50 flex shadow-[0_-6px_24px_rgba(13,42,56,0.28)] transition-transform duration-300 ease-out md:hidden ${
        visible ? "translate-y-0" : "translate-y-full"
      }`}
      style={{ paddingBottom: "env(safe-area-inset-bottom, 0px)" }}
    >
      <a
        href={PHONE_TEL}
        data-cta="sticky-call"
        className="flex flex-1 items-center justify-center gap-1.5 bg-urgent px-2 py-4 text-[14px] font-bold text-white active:bg-urgent-dark"
      >
        <Phone className="h-4 w-4 shrink-0" strokeWidth={2.6} aria-hidden />
        <span className="truncate">Call {PHONE_DISPLAY}</span>
      </a>
      <a
        href={PHONE_SMS}
        data-cta="sticky-text"
        className="flex shrink-0 items-center justify-center gap-1.5 bg-primary px-4 py-4 text-[14px] font-bold text-white active:bg-primary-dark"
      >
        <MessageSquareText className="h-4 w-4 shrink-0" strokeWidth={2.4} aria-hidden />
        <span>Text</span>
      </a>
    </div>
  );
}
