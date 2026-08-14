import type { Metadata } from "next";
import { absoluteUrl } from "@/lib/site";

import Hero from "@/components/Hero";
import SymptomTriage from "@/components/SymptomTriage";
import OfferBand from "@/components/OfferBand";
import InsuranceAndFinancing from "@/components/InsuranceAndFinancing";
import ProcessSteps from "@/components/ProcessSteps";
import MeetTheDentists from "@/components/MeetTheDentists";
import Reviews from "@/components/Reviews";
import FirstAid from "@/components/FirstAid";
import Faq from "@/components/Faq";
import LocationBlock from "@/components/LocationBlock";
import LpHeader from "@/components/LpHeader";
import LpFooter from "@/components/LpFooter";
import StickyCallBar from "@/components/StickyCallBar";

import { FAQS } from "@/lib/content";
import { getCarriers } from "@/lib/insurance";
import { getSymptomImages } from "@/lib/symptomImages";
import { PHONE_DISPLAY, PRACTICE } from "@/lib/lp.config";

export const metadata: Metadata = {
  title:
    "Emergency Dentist Southampton PA | Get Out of Tooth Pain Today - Hampton Family Dental",
  description:
    "Same-day emergency dentist in Southampton, PA. Fast relief for toothaches, broken teeth and swelling. Exam + X-rays $59 for patients with no insurance. Most PPO insurances accepted. Call (215) 357-2224.",
  alternates: { canonical: absoluteUrl("/") },
  // A paid-traffic landing page should not compete in organic search with the
  // main site's /general-dentistry/emergency-dentistry service page. It stays
  // crawlable so quality signals and conversion tracking work, but out of the
  // index so the two pages never cannibalise each other.
  robots: { index: false, follow: true },
  openGraph: {
    type: "website",
    url: absoluteUrl("/"),
    title: "Emergency Dentist in Southampton, PA - Seen Today",
    description:
      "Get out of tooth pain today. Same-day emergency appointments, exam + X-rays $59 for patients with no insurance, most PPO insurances accepted.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Emergency Dentist in Southampton, PA - Seen Today",
    description:
      "Get out of tooth pain today. Same-day emergency appointments, exam + X-rays $59 for patients with no insurance.",
  },
};

/**
 * Structured data.
 *
 * Deliberately omitted until the office confirms them:
 *  · aggregateRating - an unverifiable rating in schema risks a manual action.
 * Fri/Sat/Sun are closed, so they are simply absent from
 * openingHoursSpecification - schema.org treats an omitted day as closed, and
 * an explicit "closed" entry is not a thing.
 * The rating omission is listed in README.md under "Before launch".
 */
const dentistSchema = {
  "@context": "https://schema.org",
  "@type": "Dentist",
  "@id": absoluteUrl("/") + "#practice",
  name: PRACTICE.name,
  alternateName: "Brenner Dental Group",
  url: absoluteUrl("/"),
  telephone: "+1-215-357-2224",
  priceRange: "$$",
  address: {
    "@type": "PostalAddress",
    streetAddress: PRACTICE.street,
    addressLocality: PRACTICE.city,
    addressRegion: PRACTICE.state,
    postalCode: PRACTICE.zip,
    addressCountry: "US",
  },
  areaServed: [
    "Southampton, PA",
    "Richboro, PA",
    "Feasterville, PA",
    "Holland, PA",
    "Churchville, PA",
    "Ivyland, PA",
  ],
  availableService: {
    "@type": "MedicalProcedure",
    name: "Emergency dental care",
    description:
      "Same-day treatment for toothache, dental abscess and swelling, broken or chipped teeth, knocked-out teeth, and lost fillings or crowns.",
  },
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: "Monday",
      opens: "09:00",
      closes: "17:00",
    },
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: "Tuesday",
      opens: "09:00",
      closes: "18:00",
    },
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: "Wednesday",
      opens: "08:00",
      closes: "14:00",
    },
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: "Thursday",
      opens: "08:00",
      closes: "17:00",
    },
  ],
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: FAQS.map((item) => ({
    "@type": "Question",
    name: item.q,
    acceptedAnswer: { "@type": "Answer", text: item.a },
  })),
};

export default function EmergencyDentistLandingPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(dentistSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      {/* Skip link - the first tab stop should be the conversion, not a logo. */}
      <a
        href="#request"
        className="sr-only focus:not-sr-only focus:fixed focus:left-3 focus:top-3 focus:z-[60] focus:rounded-lg focus:bg-navy focus:px-4 focus:py-2 focus:text-sm focus:font-bold focus:text-white"
      >
        Skip to the same-day request form
      </a>

      {/* pb reserves room for the mobile sticky call bar */}
      <main className="w-full overflow-x-hidden bg-white pb-[52px] md:pb-0">
        <LpHeader />
        <Hero />
        {/* Reads public/images/lp/symptoms/ - any card with a matching file
            shows the illustration, the rest keep their icon. */}
        <SymptomTriage images={getSymptomImages()} />
        <OfferBand />
        {/* Reads public/images/lp/insurance/ - any logo file present is used,
            any carrier without one renders as type. */}
        <InsuranceAndFinancing carriers={getCarriers()} />
        <ProcessSteps />
        <MeetTheDentists />
        <Reviews />
        <FirstAid />
        <Faq />
        <LocationBlock />
        <LpFooter year={new Date().getFullYear()} />
      </main>

      <StickyCallBar />

      {/* Screen-reader-only phone number, always available */}
      <p className="sr-only">
        Call {PRACTICE.name} on {PHONE_DISPLAY} for a same-day emergency dental
        appointment in {PRACTICE.city}, {PRACTICE.state}.
      </p>
    </>
  );
}
