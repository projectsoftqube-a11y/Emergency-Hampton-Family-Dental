"use client";

import { MessageSquareText, Phone } from "lucide-react";
import { PHONE_DISPLAY, PHONE_SMS, PHONE_TEL } from "@/lib/lp.config";

/**
 * Mobile-only. On desktop the LP header is already sticky with a call button,
 * so a second fixed bar would just eat viewport. The page root reserves
 * bottom padding (pb-[76px] md:pb-0) so this never covers footer content.
 *
 * env(safe-area-inset-bottom) keeps the buttons clear of the iOS home
 * indicator - without it the bottom ~20px of the tap target is unreachable.
 */
export default function StickyCallBar() {
  return (
    <div
      className="fixed inset-x-0 bottom-0 z-50 flex shadow-[0_-6px_24px_rgba(13,42,56,0.28)] md:hidden"
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
