"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Star } from "lucide-react";
import ReviewNote from "./ReviewNote";

const EASE = [0.16, 1, 0.3, 1] as const;

/**
 * Real Google reviews, supplied by the office. Quotes, names and dates are
 * verbatim - do not paraphrase them. Under FTC endorsement rules a testimonial
 * has to reflect what the reviewer actually wrote, and Google's review policy
 * treats edited quotes attributed to named reviewers as misrepresentation.
 *
 * These name Dr. Brenner / Brenner Dental Group, which is correct: the hero
 * carries the "formerly Brenner Dental Group" line, so the names corroborate
 * the continuity rather than contradicting the rebrand.
 */
const REVIEWS = [
  {
    quote:
      "Dr. Brenner and his team are amazingly patient and reliable. I've had a few emergent and I was fit in each time either same day or first thing the next day. They work with you if you don't have dental insurance at reasonable rates and will offer payment plans if needed.",
    name: "Mary Hannah's Mom",
    meta: "Local Guide · 5 years ago",
  },
  {
    quote:
      "The entire office functions as a well oiled machine of highly skilled & knowledgeable folks. Dr Brenner is excellent & very easy to talk to regarding sometime complicated issues. Straight forward & honest.",
    name: "Mitch",
    meta: "Local Guide · a year ago",
  },
  {
    quote:
      "Dr. Brenner and his office staff are extremely kind and helpful. I have been going for years and they are very honest, accommodating and helpful. Grateful",
    name: "Colleen McKeown",
    meta: "6 months ago",
  },
  {
    quote:
      "Dr. Brenner stepped into the waiting area and introduced himself to me. Everyone was cheerful and made me feel very comfortable!",
    name: "Arlene Santonastasi",
    meta: "6 months ago",
  },
  {
    quote:
      "Great dental care, professional, friendly and caring staff. Dr. Brenner is respectful of patient's ability to make informed decisions regarding optional treatment. He has a great relationship with his patients.",
    name: "Anne Houser",
    meta: "Local Guide · 7 months ago",
  },
  {
    quote:
      "Dr. Brenner is an amazing dentist. He really explains everything you need to know. The staff is awesome and very friendly.",
    name: "Susan Donohue",
    meta: "3 months ago",
  },
  {
    quote:
      "Dr. Brenner takes the time to sit with you and explain whatever needs to be done. He is very personable and approachable. He cares about what he does and is very skilled as a dentist.",
    name: "Cindy Veneziano",
    meta: "a year ago",
  },
  {
    quote:
      "Best cleaning I have ever had. I'm 63 so I've had a lot of cleanings in my life! Dr Brenner went above and beyond any Dentist I have ever encountered. He truly cares about his patients!",
    name: "Colleen Carroll",
    meta: "a year ago",
  },
  {
    quote:
      "My family has been going to Dr Brenners office for a few years. Highly recommend! It's like family there the staff is great. He's proactive and great Dr and person.",
    name: "Cynthia Perez",
    meta: "a year ago",
  },
  {
    quote:
      "Dr. Brenner and his staff provide a pleasant atmosphere with excellent quality dental care. I have been going to this office for 6 years for surgery and maintenance and have been very happy.",
    name: "Gary Balasa",
    meta: "a year ago",
  },
  {
    quote:
      "Jeff is a great dentist. His staff is very friendly. I highly recommend Jeff and his practice for all dental needs.",
    name: "David Lloyd",
    meta: "6 reviews · 6 days ago",
  },
  {
    quote:
      "Dr Brenner is one of the best dentists I have ever had. He is thorough and extremely knowledgeable and cares about his patients. He also takes the time to discuss with them their dental needs. The staff are fantastic and caring.",
    name: "Mary V Forlano",
    meta: "9 reviews · 6 days ago",
  },
  {
    quote:
      "Very impressed with Dr. Brenner and his team. Highly recommend.",
    name: "Fred Kamm",
    meta: "1 review · 5 months ago",
  },
  {
    quote: "Would never go anywhere else!",
    name: "Debbi Rotenberg",
    meta: "2 reviews · 6 months ago",
  },
  {
    quote:
      "Excellent dental practice. Dr. Brenner is professional, knowledgeable and personable. Staff is friendly. Before going here I use to shake uncontrollably as I had a fear of dental visits from a bad experience at another practice. That fear is now gone and I no longer shake.",
    name: "Miss R.",
    meta: "Local Guide · a year ago",
  },
  {
    quote:
      "I had a crown come off. I called for an appointment. Angela returned my call within minutes. I was in the chair within one hour. Casey was setting up and assisting as Dr. Brenner was working on my tooth. The staff is always so friendly.",
    name: "Donnalee Charlton",
    meta: "5 reviews · 9 months ago",
  },
  {
    quote:
      "What more can you say? The best dentist and best staff you can ask for. Honest, friendly and caring all around. Everyone at the practice is fantastic and we always feel welcome.",
    name: "Danny A.",
    meta: "Local Guide · a year ago",
  },
];

/**
 * Deterministic avatar tint from the reviewer's name, so a given person keeps
 * the same colour across renders and between the marquee's two copies. Google
 * does the same thing for reviewers with no profile photo.
 */
const AVATAR_COLORS = [
  "bg-[#1E6076]", // primary petrol
  "bg-[#5C7098]", // steel-dark - replaced a green (#0F8A6D); the brand has no green
  "bg-[#B45309]", // amber
  "bg-[#7C3AED]", // violet
  "bg-[#BE123C]", // rose
  "bg-[#0369A1]", // blue
];

function avatarColor(name: string) {
  let hash = 0;
  for (let i = 0; i < name.length; i++) hash = (hash * 31 + name.charCodeAt(i)) >>> 0;
  return AVATAR_COLORS[hash % AVATAR_COLORS.length];
}

function Stars({ className = "" }: { className?: string }) {
  return (
    <span className={`flex gap-0.5 ${className}`} aria-label="5 out of 5 stars">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          className="h-3.5 w-3.5 fill-amber-400 text-amber-400"
          strokeWidth={0}
          aria-hidden
        />
      ))}
    </span>
  );
}

type Review = (typeof REVIEWS)[number];

function ReviewCard({
  review,
  duplicate = false,
}: {
  review: Review;
  /** Marks the marquee's second copy so it is not announced twice. */
  duplicate?: boolean;
}) {
  /*
    Laid out the way a Google review actually is, top to bottom: avatar +
    name + reviewer meta, then the star row and date, then the text. The
    previous card led with stars and a decorative quote mark, which reads as
    a marketing testimonial - the thing visitors have learned to discount.
    Matching the familiar shape is what makes it read as a real review.

    The avatar is a coloured initial disc, which is exactly what Google shows
    for a reviewer with no profile photo - so it is the honest rendering here,
    not a stand-in for a missing asset.
  */
  return (
    <figure
      aria-hidden={duplicate || undefined}
      className="flex w-[290px] shrink-0 flex-col rounded-xl border border-beige-dark/50 bg-white p-4 shadow-[0_10px_30px_-20px_rgba(20,60,80,0.4)] sm:w-[340px] sm:p-5"
    >
      {/* ── Reviewer ── */}
      <div className="flex min-w-0 items-center gap-2.5">
        <span
          aria-hidden
          className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-[15px] font-semibold text-white ${avatarColor(
            review.name
          )}`}
        >
          {review.name.trim().charAt(0).toUpperCase()}
        </span>

        <span className="min-w-0 flex-1">
          <span className="block truncate text-[13.5px] font-semibold leading-tight text-navy">
            {review.name}
          </span>
          <span className="mt-0.5 block truncate text-[11px] leading-tight text-navy/50">
            {review.meta}
          </span>
        </span>

        {/* Google's own mark, bottom-right of the avatar row - the same place
            Google puts it on an embedded review. */}
        <Image
          src="/images/lp/google-g.svg"
          alt=""
          width={16}
          height={16}
          className="h-4 w-4 shrink-0"
        />
      </div>

      {/* ── Rating ── */}
      <div className="mt-2.5 flex items-center gap-2">
        <Stars />
      </div>

      {/* ── Review text ── */}
      <blockquote className="mt-2 flex-1 text-[13px] leading-relaxed text-navy/75 sm:text-[13.5px]">
        {review.quote}
      </blockquote>
    </figure>
  );
}

/**
 * A single marquee row.
 *
 * The track holds the cards twice over and translates by exactly -50%, so the
 * moment the first copy scrolls out the second is perfectly in its place and
 * the loop is seamless. The duplicate is aria-hidden so screen readers hear
 * each review once.
 *
 * Animation is pure CSS (see globals.css). That matters here: a JS-driven
 * marquee runs a state update every frame and janks on mid-range phones,
 * which is the problem we just fixed elsewhere on this page.
 */
function MarqueeRow({
  items,
  duration,
}: {
  items: Review[];
  duration: number;
}) {
  // py-* on the clipping container, not margin on the cards.
  //
  // overflow-hidden is needed horizontally so the track disappears at the
  // edges, but it clips vertically too - which was shaving the bottom border
  // and drop shadow off every card. Padding inside the clipped box gives the
  // shadow room to render before the clip boundary.
  //
  // -my-* cancels that padding in the page layout, so the row still sits
  // tight against the header and the note below it.
  return (
    <div className="group relative -my-4 flex overflow-hidden py-4">
      <div
        className="flex shrink-0 items-stretch gap-4 pr-4 motion-safe:animate-[lp-marquee_linear_infinite] motion-safe:group-hover:[animation-play-state:paused] sm:gap-5 sm:pr-5"
        style={{ animationDuration: `${duration}s` }}
      >
        {items.map((r) => (
          <ReviewCard key={r.name} review={r} />
        ))}
        {/*
          Seamless-loop duplicate, hidden from assistive tech so each review is
          announced once. These are siblings of the originals - not wrapped in
          a container - because the -50% shift only lands exactly on the second
          copy when both halves are identical flex children of the same track.
        */}
        {items.map((r) => (
          <ReviewCard key={`dup-${r.name}`} review={r} duplicate />
        ))}
      </div>
    </div>
  );
}

export default function Reviews() {
  return (
    <section
      id="reviews"
      aria-label="Patient reviews"
      // No min-h-screen: with a single row there is nothing to fill the extra
      // height with, and it would just open a dead gap above and below.
      className="relative isolate flex w-full flex-col justify-center overflow-hidden border-y border-beige/70 bg-white py-16 sm:py-20 lg:py-24"
    >
      {/* Ambient - radial gradients, not blur filters (see OfferBand). */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(55%_50%_at_15%_0%,rgba(30,96,118,0.06),transparent_70%),radial-gradient(45%_50%_at_90%_100%,rgba(30,96,118,0.06),transparent_72%)]"
      />

      {/* ── Header ── */}
      <motion.div
        initial={{ opacity: 0, y: 18 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.5, ease: EASE }}
        className="mx-auto w-full max-w-6xl px-4 text-center sm:px-6 lg:px-8"
      >
        <div className="flex items-center justify-center gap-2.5">
          <span className="h-px w-6 shrink-0 bg-primary/40" aria-hidden />
          <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-primary">
            Social proof
          </span>
          <span className="h-px w-6 shrink-0 bg-primary/40" aria-hidden />
        </div>

        <h2 className="mt-3 font-heading text-[1.6rem] leading-[1.12] tracking-[-0.02em] text-navy sm:text-[2rem] lg:text-[2.6rem]">
          People who were right where you are
        </h2>

        {/* The rating pill lands a beat after the headline and scales in
            rather than sliding, so the number itself reads as the payoff. */}
        <motion.div
          initial={{ opacity: 0, scale: 0.92 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.45, delay: 0.14, ease: EASE }}
          className="mt-5 inline-flex flex-wrap items-center justify-center gap-x-3 gap-y-2 rounded-full border border-beige-dark/50 bg-white px-4 py-2.5 shadow-[0_1px_2px_rgba(20,60,80,0.04)]"
        >
          <span className="font-heading text-[1.4rem] leading-none text-navy">4.9</span>
          <Stars />
          <span className="text-[12px] text-navy/55">
            Google reviews · Southampton, PA
          </span>
        </motion.div>
      </motion.div>

      {/* ── Marquee ──
          One row, full-bleed, so cards run off both edges rather than stopping
          at the container. All ten reviews ride the same track. Hovering
          pauses it so a quote can actually be read. */}
      {/* Fade only - no y-offset. The track is already moving horizontally, and
          a vertical slide on top of that reads as two competing motions. */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: "-40px" }}
        transition={{ duration: 0.65, delay: 0.2, ease: "easeOut" }}
        className="relative mt-10 sm:mt-12 lg:mt-14"
      >
        {/* Duration scales with the card count, not a hardcoded number: the
            track grew from 10 cards to 17, and at a fixed 95s that made the
            same pixels-per-second budget cover 60% more distance - i.e. the
            row visibly sped up just because reviews were added. ~9s per card
            keeps the reading pace steady however many the office supplies. */}
        <MarqueeRow items={REVIEWS} duration={REVIEWS.length * 9} />

        {/* Edge fades so cards dissolve rather than being cut off mid-word. */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-y-0 left-0 w-12 bg-gradient-to-r from-white to-transparent sm:w-28 lg:w-40"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-y-0 right-0 w-12 bg-gradient-to-l from-white to-transparent sm:w-28 lg:w-40"
        />
      </motion.div>

      <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
        <ReviewNote>
          [CONFIRM] Quotes and reviewer names are the real Google reviews
          supplied by the office - do not paraphrase them. The two longest
          quotes are trimmed to fit the card; if the office wants them shown in
          full, they need to be trimmed at a sentence boundary rather than
          reworded. Still outstanding: the 4.9 rating and the total review
          count. aggregateRating is deliberately omitted from the page schema
          until both are verified against the live Google Business Profile,
          because publishing an unverifiable rating risks a manual action.
        </ReviewNote>
      </div>
    </section>
  );
}
