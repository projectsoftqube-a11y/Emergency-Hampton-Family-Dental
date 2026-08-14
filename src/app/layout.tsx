import type { Metadata } from "next";
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
