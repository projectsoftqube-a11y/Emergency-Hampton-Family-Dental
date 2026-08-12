import type { Metadata } from "next";
import { Fraunces, Inter } from "next/font/google";
import SmoothScroll from "@/components/SmoothScroll";
import "./globals.css";

/**
 * Type pairing - chosen for this page specifically, not inherited from the
 * main site.
 *
 * Headings: Fraunces. A low-contrast, warm serif. The main site uses Playfair
 * Display, which is a didone - its hairline strokes thin out badly in white on
 * navy at the sizes this page uses on a 320px screen. Fraunces keeps the serif
 * character the brand is built on while staying sturdy and readable small, and
 * it reads reassuring rather than luxury, which is the right note for someone
 * in pain.
 *
 * Body and UI: Inter. Large x-height, open apertures, and genuine tabular
 * numerals - which matters here, because the phone number is the conversion
 * and it appears eight times.
 *
 * Both are variable fonts, self-hosted and subset by next/font, so this pairing
 * ships fewer bytes than the two static families it replaces.
 */
const fraunces = Fraunces({
  subsets: ["latin"],
  style: ["normal", "italic"],
  // Fraunces is a variable font. next/font requires that when you request
  // extra axes you do NOT also pin `weight` - the variable font already
  // carries its whole weight range (wght is included automatically), and the
  // headings pick specific weights via Tailwind's font-* classes.
  // SOFT rounds the terminals slightly; opsz adapts the design to size.
  // WONK is intentionally left out so the letterforms stay conventional.
  axes: ["SOFT", "opsz"],
  variable: "--font-heading-family",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-body-family",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL || "https://hamptonfamilydentist.com"
  ),
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${fraunces.variable} ${inter.variable}`}>
      {/* No site header or footer by design - this is a paid-traffic landing
          page. Every outbound nav link is an exit path. The page supplies its
          own minimal header and footer. */}
      <body suppressHydrationWarning>
        {/* Renders nothing; owns the Lenis instance for the whole app so the
            smooth scroll survives the client-side hop to /thank-you. */}
        <SmoothScroll />
        {children}
      </body>
    </html>
  );
}
