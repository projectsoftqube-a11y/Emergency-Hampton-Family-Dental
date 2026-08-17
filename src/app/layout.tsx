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
