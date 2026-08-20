# Hampton Family Dental - Emergency Dentist Landing Page

A standalone Next.js 16 project. One page, one job: get someone in tooth pain to call **(215) 357-2224** today.

Built for paid traffic (Google Ads "emergency dentist southampton pa" and similar). Completely separate from the main `Hampton-Family-Dental` site - nothing here touches that codebase, and it can be deployed, edited, and A/B tested on its own.

---

## Run it

Dependencies are already installed.

```bash
cd "D:\Live Sites\Hampton-Emergency-LP"
npm run dev
```

Open **http://localhost:3000** - the landing page is the site root.

```bash
npm run build   # production build
npm start       # serve the production build
npm run lint
```

For the form to actually send email, copy `.env.example` to `.env.local` and fill in the SMTP values.

---

## Structure

```
Hampton-Emergency-LP/
├── package.json / tsconfig.json / next.config.ts / postcss.config.mjs / eslint.config.mjs
├── .env.example              Copy to .env.local
├── IMAGE-PROMPTS.md          Generation prompts for every image slot
├── README.md                 This file
├── public/
│   └── images/
│       ├── logo.png              Used in the header + footer
│       ├── noise.webp            Grain overlay on dark sections
│       ├── clinic_interior.webp  Usable hero stopgap
│       ├── reception_area.webp   Usable process-section stopgap
│       ├── dentist_portrait.webp / dr_keyur_dudhat_portrait.png
│       └── lp/                   ← final campaign images go here
└── src/
    ├── app/
    │   ├── layout.tsx        Fonts + globals. No header/footer by design.
    │   ├── globals.css       Hampton brand tokens + the new urgent accent
    │   ├── page.tsx          Metadata, JSON-LD, section order
    │   ├── thank-you/        Post-submit confirmation page (noindex, nofollow)
    │   └── api/enquiry/      Form → email endpoint
    ├── lib/
    │   ├── lp.config.ts      Phone, address, logo link, and the two feature flags
    │   ├── content.ts        First-aid copy, FAQ copy, opening hours
    │   ├── leadStore.ts      Hands the first name to /thank-you
    │   ├── site.ts / utils.ts / validation.ts / sendEnquiry.ts / mailer.ts
    └── components/           20 section + primitive components
        └── SmoothScroll.tsx  Lenis instance for the whole app; renders nothing
```

**To change copy**, edit `src/lib/content.ts` and `src/lib/lp.config.ts` - the section components take their text from there. Section order lives in `src/app/page.tsx`.

---

## The sections, in order

| Component | Section |
|---|---|
| `LpHeader` | Sticky bar: logo + call button. No nav. |
| `Hero` | "Get out of tooth pain - today." + call/text CTAs + trust ticks + form |
| `LeadForm` | 3 fields → `/api/enquiry` |
| `SymptomTriage` | "Whatever's hurting, we can help" - 6 tappable cards |
| `OfferBand` | Exam + X-rays from $59* |
| `InsuranceAndFinancing` | Carriers + three affordability cards |
| `ProcessSteps` | "What happens after you call" - 4-step timeline |
| `MeetTheDentists` | Dr. Brenner and Dr. Dudhat |
| `Reviews` | 4.9★ summary + 5 quotes |
| `BeforeAfter` | "Same day. Same tooth." |
| `FirstAid` | "While you're on your way to us" - 5 accordions |
| `Faq` | "Quick answers" - 5 accordions, also emitted as FAQPage schema |
| `LocationBlock` | Google map + address + hours |
| `LpFooter` | Final call/text CTA |
| `StickyCallBar` | Mobile-only fixed call/text bar |

All copy is verbatim from the *Emergency Dentist V1 Landing Page Copy* draft - nothing rewritten, added, or dropped.

---

## `/thank-you`

A successful `LeadForm` submit navigates to **`/thank-you`** rather than swapping the form card for an inline confirmation. A distinct URL buys three things the in-place state could not: a clean destination conversion for Google Ads and GA4 instead of a click-event trigger, a confirmation that survives the back button, and room for content that would never fit inside the form card.

| Section | Why it's there |
|---|---|
| Confirmation hero | Dark, so it reads as a genuinely different page the instant it loads. Oversized call button - someone who just submitted is the most likely person on the site to also call, and the form is the slower path. |
| ER escalation strip | Directly under the fold on a phone. The only content here about someone's safety rather than their appointment. |
| What happens next | Three steps: we call back, we find a slot today, we find the cause. |
| While you wait | The three first-aid scenarios most likely to be in play while waiting for the callback. |
| Where to find us / hours | Address, directions, and **only the confirmed opening days** - Wed and Fri–Sun are omitted rather than guessed, the same rule the landing page's JSON-LD follows. |

**Personalisation.** The visitor's first name is carried over in `sessionStorage` (`src/lib/leadStore.ts`), not a query string - a name in the URL leaks into analytics reports, `Referer` headers, and any link the visitor pastes. It is read with `useSyncExternalStore`, so the prerendered HTML and the hydrated client agree. Landing on `/thank-you` directly, or with storage blocked, gets the generic greeting and nothing breaks.

`robots: { index: false, follow: false }` - stricter than the landing page's `index: false, follow: true`. A confirmation page has no standalone value, and an indexed one would be a dead end for someone searching for an emergency dentist.

---

## Smooth scrolling

Lenis, mounted once in the root layout via `src/components/SmoothScroll.tsx`. Three details that are load-bearing:

- **`prefers-reduced-motion` genuinely disables it.** Hijacked scrolling is a vestibular trigger, and this page is shown to people who are already unwell. The component listens for changes to the media query, so toggling the OS setting takes effect without a reload.
- **Touch is left native.** Lenis's `syncTouch` stays off. Momentum scrolling on a phone is better than anything re-implemented in JS, and this campaign's traffic is overwhelmingly mobile.
- **Anchors are handed to Lenis** (`anchors: true`), so the skip link and symptom cards ease like everything else. Lenis honours the `scroll-padding-top: 80px` in `globals.css` on its own — do **not** also pass an `anchors.offset`, or the two stack and targets land 160px down.

The Lenis CSS is written out in `globals.css` rather than importing `lenis/dist/lenis.css`. That stylesheet ships `.lenis.lenis-smooth iframe { pointer-events: none }`, which would make the Google Maps embed in the location section completely dead to clicks, panning and zoom. The map carries `data-lenis-prevent` instead: Lenis leaves scroll gestures inside it alone, and the map stays fully interactive.

`html` keeps `scroll-behavior: smooth` as the no-JS / reduced-motion fallback; `html.lenis` overrides it to `auto` once Lenis is actually driving, because the two easings otherwise fight and produce a double lurch on anchor clicks.

---

## Design

Same brand *colours* as the main site: petrol `#1E6076`, deep petrol `#143C50`, steel `#788CB4`, cool-mist neutrals. Tokens live in the `@theme` block of `src/app/globals.css`.

**Type differs from the main site on purpose.** Headings are **Fraunces** (a warm, low-contrast serif) and body/UI is **Inter**. The main site uses Playfair Display, a didone whose hairline strokes thin out and become hard to read in white-on-navy at the sizes this page uses on a 320px phone. Fraunces keeps the serif character while staying sturdy small, and reads *reassuring* rather than *luxury* - the right note for someone in pain. Inter carries the body and, importantly, the phone number, with true tabular numerals. Both are variable fonts and ship fewer bytes than the pairing they replace. The rationale is documented in `src/app/layout.tsx`.

**One addition:** a warm terracotta `--color-urgent` `#C24626` family. The Hampton palette has no urgency accent because the main site never needed one, and petrol-on-petrol reads as "routine checkup" on an emergency page. It's pulled toward brick rather than orange so it sits beside petrol without clashing, and passes AA with white text at 14px+.

---

## Two flags in `src/lib/lp.config.ts`

| Flag | Default | What it does |
|---|---|---|
| `SHOW_REVIEW_NOTES` | `true` | Renders the `[CONFIRM]` / `[DEV]` annotations from the review draft as amber notes. Set `false`, or `NEXT_PUBLIC_LP_REVIEW_NOTES=false`, before paid traffic. |
| `SHOW_IMAGE_SLOT_LABELS` | `true` | Shows filename/dimension labels on any *unfilled* image slots. All real slots now have images, so this only affects the insurance-logo fallbacks; safe to leave on or set `false`. |

**Images are in.** Hero, reception, office exterior, both dentist portraits, and the before/after pair are all populated in `public/images/lp/`. Two carry visible caveats until you act on them: Dr. Brenner's portrait is a flagged **stand-in** (swap for a real photo), and the before/after pair is labelled **"Illustrative example - not an actual patient"** (swap for a real consented case to drop the label). Insurance carriers render as text unless you drop logo files into `public/images/lp/insurance/` - see IMAGE-PROMPTS.md §8.

---

## Before this takes paid traffic

- [ ] **`NEXT_PUBLIC_SITE_URL`** - set to the real campaign URL, or canonical tags and JSON-LD point at the wrong domain
- [ ] **$59 price** - confirm with the office; it appears in the hero, the offer band, and the FAQ
- [ ] **Google rating and review count** - the page shows 4.9★; `aggregateRating` is **deliberately absent from the JSON-LD** until the count is verified, because an unverifiable rating in structured data risks a manual action
- [ ] **Photograph quality** - the current files are over-compressed and look soft. See **Image quality** below; this needs new source files, not a code change
- [ ] **Dr. Dudhat portrait** - showing a generic outline avatar until the office supplies a photo
- [ ] **Membership plan price** - confirm before quoting a figure anywhere
- [ ] **First-aid wording** - if the section is ever restored it needs clinician review (YMYL health content: named reviewer + review date)
- [ ] **Conversion tracking** - see below
- [ ] **SMTP credentials** in `.env.local` on the host
- [ ] Set both flags to `false`

---

## Image quality

**The photographs are over-compressed at source.** This is the cause of the "images look blurry" feedback, and no code change can fully fix it - detail already discarded by the encoder cannot be recovered.

Measured in bits per pixel (bpp); a photograph normally wants **0.6–1.5 bpp**:

| File | Pixels | Size | bpp | |
|---|---|---|---|---|
| `process-reception.webp` | 1163×1353 | 61KB | **0.32** | over-compressed |
| `symptoms/knocked-out.webp` | 600×600 | 12KB | **0.28** | over-compressed |
| `hero-emergency.webp` | 1672×941 | 68KB | **0.35** | too low |
| `symptoms/chipped.webp` | 600×600 | 18KB | 0.40 | too low |
| `symptoms/toothache.webp` | 600×600 | 19KB | 0.44 | too low |
| `symptoms/lost-filling.webp` | 600×600 | 21KB | 0.47 | too low |
| `dr-jeffrey-brenner-v2.webp` | 900×1100 | 61KB | 0.50 | too low |
| `hero-pain-mobile.webp` | 1200×900 | 83KB | 0.63 | ok |
| `office-exterior.webp` | 1600×900 | 143KB | 0.82 | ok |

`hero-emergency.webp` has a second problem: at 1672px wide it is **narrower than the viewport it fills**. It is a full-bleed `sizes="100vw"` background, so on any display wider than ~1672px the browser upscales it - blurry by definition, whatever the quality setting.

### What to supply

Re-export from the originals at **WebP quality 82–88** (or PNG/JPEG q90+ and let `next/image` handle the rest). Do not re-encode the current files - that compounds the loss.

| Image | Minimum width | Target size |
|---|---|---|
| `hero-emergency.webp` | **2400px** (currently 1672) | 250–400KB |
| `hero-pain-mobile.webp` | 1200px | 120–200KB |
| `process-reception.webp` | 1200px | 150–250KB |
| `office-exterior.webp` | 1600px | 150–250KB |
| `dr-jeffrey-brenner-v2.webp` | 900px | 100–160KB |
| `symptoms/*.webp` | 600px | 35–60KB each |

Total page weight would rise by roughly 700KB–1MB. That is a real trade-off on mobile data, but these are the images carrying the practice's credibility.

### What the code already does

- `next/image` serves AVIF/WebP, sized per breakpoint, so no visitor downloads more than their viewport needs
- **Quality 90** is the default in `ImageSlot` (was 75). At q75 the optimiser was applying a *second* lossy pass over already-degraded sources and compounding the artefacts - that part was ours, and it is fixed
- Insurance logos render at **q95**: flat colour and hard letterform edges are what lossy compression handles worst
- `sizes` is declared per image so the browser picks the right candidate; the dentist avatars deliberately over-declare (see `MeetTheDentists.tsx`) to force an oversampled fetch

---

## Conversion tracking

Every CTA carries a `data-cta` attribute, so GTM needs one trigger rather than fifteen selectors:

| `data-cta` | Where |
|---|---|
| `header-call` | Sticky header |
| `header-logo` / `footer-logo` | Logo links to the campaign root (`LOGO_HREF` in `lp.config.ts`, derived from `NEXT_PUBLIC_SITE_URL`) |
| `hero-call` / `hero-text` | Hero buttons |
| `form-inline-call` | Phone link inside the form card |
| `form-submit` | Form submit |
| `form-success-call` | Call button on `/thank-you` (name kept from the old inline state so existing GTM tags keep firing) |
| `thanks-text` | Text button on `/thank-you` |
| `symptom-1` … `symptom-6` | Symptom triage cards |
| `offer-call` | $59 offer band |
| `insurance-not-listed` | "Don't see your plan?" card |
| `insurance-email` | Insurance-card email link |
| `location-directions` | Get directions |
| `footer-call` / `footer-text` | Footer |
| `sticky-call` / `sticky-text` | Mobile sticky bar |

**GTM setup:** a Click trigger on `Click Element` matching CSS selector `[data-cta]`, pushing that attribute as an event parameter. That gives per-placement call attribution - it tells you whether the hero or the sticky bar is actually earning the calls, which is the number that decides your next iteration.

### What is installed

Three things ship in the page itself:

1. **GTM container `GTM-WLNN5FJV`** - loader in `layout.tsx`, `<noscript>` iframe first inside `<body>`.
2. **Google tag (gtag.js)** - GA4 `G-1KLWZ2499J` and Google Ads `AW-18372303940`, both `config`d on one load, on every page.
3. **Ads lead conversion** `AW-18372303940/OlxtCI_e4OMcEMS4zLhE` - fired from `/thank-you` by `AdsConversion.tsx`.

### The lead signal

A lead is a **successful** submit: validation passed *and* `/api/enquiry` accepted it. At that moment `LeadForm` does two things - pushes `form_submit_success` onto the `dataLayer` (for GTM) and arms a one-time sessionStorage token (for the conversion tag on `/thank-you`).

Use **either** path for the Ads conversion, not both:

| Path | Trigger |
|---|---|
| Already in the page | `AdsConversion.tsx` on `/thank-you` - nothing to configure |
| GTM | Google Ads Conversion Tracking tag, Custom Event trigger on `form_submit_success` |

If you configure the GTM tag as well, **gate it** so one lead cannot be counted twice - Custom JavaScript variable `function () { return !!window.__hfdAdsConversionFired; }` used as a blocking trigger. The page sets that flag the moment it reports the conversion, so whichever path runs first wins.

### Why not a plain destination conversion on `/thank-you`

A destination conversion counts every arrival at the URL, including a refresh, a back-button return and a link someone shared. The tag is gated on a one-time token written at submit time instead, so it reports once per real lead and reports nothing at all for a visit with no submission behind it. Two separate submissions in one session still count as two.

Still exclude `/thank-you` from GA4 landing-page reports - it is `noindex, nofollow`, but direct hits would otherwise show up as sessions.

Still to add: a call-tracking number that swaps in for paid sessions, and a booking/CRM push from the form. The form currently emails the office via `/api/enquiry`.

---

## SEO

- **`robots: { index: false, follow: true }`** - set intentionally in `src/app/page.tsx`. This page targets the same intent as the main site's `/general-dentistry/emergency-dentistry`, and two indexed pages competing for "emergency dentist southampton pa" is textbook cannibalisation. If you'd rather rank *this* page organically, flip it and 301 the service page - but do not index both.
- **JSON-LD:** `Dentist` (address, phone, area served, emergency service, confirmed hours only) and `FAQPage` (all five "Quick answers"). Validate at [validator.schema.org](https://validator.schema.org) once hours are confirmed.
- FAQ and first-aid answers use native `<details>`, so the text is in the server HTML and readable by Google and by AI answer engines. A JS disclosure widget would hide it from both.

---

## Responsive

Built and audited down to **320px** (iPhone SE 1st gen, the narrowest viewport still in real use).

- Every grid is single-column below `sm` (640px)
- 16px gutters at 320px → 288px of content
- Flex children carry `min-w-0`; long unbroken strings use `truncate` or `break-words`
- The mobile sticky bar respects `env(safe-area-inset-bottom)` so its tap targets clear the iOS home indicator; the page reserves `pb-[76px]` so it never covers footer content
- Headlines use `clamp()` and bottom out at readable sizes
- `prefers-reduced-motion` disables the scroll animations

**Layout shifts at:** `sm` 640px (grids go 2-up), `lg` 1024px (hero splits, form becomes sticky beside the content, process timeline gains its photo column).

---

## Deploying

It's a standard Next.js app - Vercel, Netlify, or any Node host.

On Vercel: import the folder as a new project, set `NEXT_PUBLIC_SITE_URL` and the five `SMTP_*` / `ENQUIRY_TO` variables, and point the campaign subdomain at it. Nothing needs to change in the main Hampton site.

---

## Building a second landing page

Copy this whole folder, rename it, and rewrite `src/lib/content.ts` + `src/lib/lp.config.ts`. The components are generic enough to carry a different offer without edits - the emergency-specific wording all lives in those two files and in `page.tsx`.
