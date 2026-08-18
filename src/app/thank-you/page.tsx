import type { Metadata } from "next";

import AdsConversion from "@/components/AdsConversion";
import LpHeader from "@/components/LpHeader";
import LpFooter from "@/components/LpFooter";
import StickyCallBar from "@/components/StickyCallBar";
import ThankYou from "@/components/ThankYou";
import { PHONE_DISPLAY, PRACTICE } from "@/lib/lp.config";

export const metadata: Metadata = {
  title: "Thanks - we'll call you shortly | Hampton Family Dental",
  description:
    "We've got your same-day emergency request. Someone from the Southampton office will call you shortly. In pain right now? Call (215) 357-2224.",
  /**
   * Hard noindex, and unlike the landing page also nofollow.
   *
   * The landing page is `index: false, follow: true` because it is a real
   * destination that just shouldn't compete in organic search. A confirmation
   * page is different: it has no standalone value, and if it ever got indexed
   * it would appear in results as a dead end for someone searching for an
   * emergency dentist. It also must never be counted as a landing page in
   * analytics acquisition reports.
   */
  robots: { index: false, follow: false },
};

export default function ThankYouPage() {
  return (
    <>
      {/* Fires the Google Ads "Submit lead form" conversion on arrival. Renders
          nothing - see the component for why this is a mount effect rather
          than the inline <head> snippet Google's instructions describe. */}
      <AdsConversion sendTo="AW-18372303940/OlxtCI_e4OMcEMS4zLhE" />

      {/* Same bottom padding as the landing page - reserves room for the mobile
          sticky call bar so it never covers the footer. */}
      <main className="w-full overflow-x-hidden bg-white pb-[58px] md:pb-0">
        <LpHeader />
        <ThankYou />
        <LpFooter year={new Date().getFullYear()} />
      </main>

      <StickyCallBar />

      <p className="sr-only">
        Your request has been sent to {PRACTICE.name}. Call {PHONE_DISPLAY} if
        you need to be seen immediately.
      </p>
    </>
  );
}
