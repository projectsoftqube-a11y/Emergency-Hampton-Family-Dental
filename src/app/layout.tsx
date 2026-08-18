import type { Metadata } from "next";
import Script from "next/script";
import { Exo_2, Inter } from "next/font/google";
import SmoothScroll from "@/components/SmoothScroll";
import "./globals.css";

/**
 * Type pairing - chosen for this page specifically, not inherited from the
 * main site.
 *
 * Headings: Exo 2. A geometric variable sans with slightly squared terminals -
 * sturdy at the 320px sizes this page uses, and it holds its weight in white
 * on navy where the previous serif (Fraunces, and Playfair on the main site)
 * thinned out. Requested by the practice for heading type.
 *
 * Body and UI: Inter. Large x-height, open apertures, and genuine tabular
 * numerals - which matters here, because the phone number is the conversion
 * and it appears eight times.
 *
 * Both are variable fonts, self-hosted and subset by next/font, so this pairing
 * ships fewer bytes than the two static families it replaces.
 */
// Exo 2 is a variable font, so no `weight` is pinned - it carries its whole
// weight range and headings pick specific weights via Tailwind's font-*
// classes. Only the upright style is loaded: no heading on this page is
// italic any more, so shipping the italic set would be dead bytes.
const exo2 = Exo_2({
  subsets: ["latin"],
  variable: "--font-heading-family",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-body-family",
  display: "swap",
});

/**
 * Google Tag Manager container for the paid-traffic campaign.
 *
 * Single source of truth for the ID so the <head> loader and the <body>
 * noscript iframe can never drift apart.
 */
const GTM_ID = "GTM-WLNN5FJV";

/**
 * Google tag (gtag.js).
 *
 * GA4 property + the Google Ads account that runs this campaign. Both are
 * `config`d on the one gtag.js load - that is how Google's own instructions
 * say to handle a second product sharing an existing global site tag.
 *
 * The Ads conversion itself fires from /thank-you (see ThankYou.tsx), not
 * here: `config` only identifies the account, it does not count a lead.
 *
 * NOTE FOR WHOEVER CONFIGURES GTM: the Google Ads conversion for
 * AW-18372303940 is now hardcoded on the thank-you page. Do NOT also add a
 * Google Ads Conversion Tracking tag for that same conversion label inside
 * GTM-WLNN5FJV - it would fire twice and inflate the campaign's conversion
 * count. GTM should handle GA4 events, call/text click tracking and any other
 * conversion actions instead.
 */
const GA4_ID = "G-1KLWZ2499J";
const GOOGLE_ADS_ID = "AW-18372303940";

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL || "https://hamptonfamilydentist.com"
  ),
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${exo2.variable} ${inter.variable}`}>
      {/*
        GTM loader.

        App Router has no _document, so both halves of the container live here.
        `afterInteractive` is next/script's equivalent of "as high in the head
        as possible" for a tag like this: it still runs before any user
        interaction, but it does not block first paint - which matters on a
        page whose visitors are in pain and often on mobile data.

        dataLayer is seeded by the snippet itself, and LeadForm pushes
        `form_submit_success` onto the same array after the backend accepts.
      */}
      <Script id="gtm-base" strategy="afterInteractive">
        {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','${GTM_ID}');`}
      </Script>

      {/*
        Google tag (gtag.js) - GA4 + Google Ads.

        Two <Script>s to mirror Google's snippet exactly: the library loads
        async from googletagmanager.com, then the inline block defines gtag()
        and configures both products. `afterInteractive` on both keeps the
        order (Next runs same-strategy scripts in document order) without
        blocking first paint.

        gtag() shares the same `dataLayer` array GTM uses - that is by design
        and is how Google intends the two to coexist.
      */}
      <Script
        id="gtag-lib"
        strategy="afterInteractive"
        src={`https://www.googletagmanager.com/gtag/js?id=${GA4_ID}`}
      />
      <Script id="gtag-config" strategy="afterInteractive">
        {`window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', '${GA4_ID}');
gtag('config', '${GOOGLE_ADS_ID}');`}
      </Script>
      {/* No site header or footer by design - this is a paid-traffic landing
          page. Every outbound nav link is an exit path. The page supplies its
          own minimal header and footer. */}
      <body suppressHydrationWarning>
        {/* GTM noscript fallback - must be the first thing inside <body>. */}
        <noscript>
          <iframe
            src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`}
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          />
        </noscript>

        {/* Renders nothing; owns the Lenis instance for the whole app so the
            smooth scroll survives the client-side hop to /thank-you. */}
        <SmoothScroll />
        {children}
      </body>
    </html>
  );
}
