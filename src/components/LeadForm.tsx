"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { AlertCircle, ArrowRight, Loader2 } from "lucide-react";
import { sendEnquiry } from "@/lib/sendEnquiry";
import { rememberFirstName } from "@/lib/leadStore";
import { isValid, validateName, validatePhone } from "@/lib/validation";
import { PHONE_DISPLAY, PHONE_TEL, SHOW_REVIEW_NOTES } from "@/lib/lp.config";

/** Where a successful submission lands. */
const THANK_YOU_PATH = "/thank-you";

const FIELDS = [
  { key: "name", label: "Your name", type: "text", autoComplete: "name" },
  {
    key: "phone",
    label: "Phone Number",
    type: "tel",
    autoComplete: "tel",
    inputMode: "tel" as const,
  },
  {
    key: "symptom",
    label: "What's going on? (e.g. broken tooth)",
    type: "text",
    autoComplete: "off",
  },
] as const;

/**
 * Strips everything that is not a digit, caps at 10, and formats as
 * (215) 357-2224 while the user types.
 *
 * Formatting as they go rather than validating after the fact means the field
 * physically cannot hold a letter or an 11th digit, so the "please enter a
 * 10-digit number" error should never actually fire for a human - it stays as
 * the backstop for paste, autofill and anyone scripting the endpoint.
 */
function formatPhone(value: string): string {
  const d = value.replace(/\D/g, "").slice(0, 10);
  if (d.length <= 3) return d;
  if (d.length <= 6) return `(${d.slice(0, 3)}) ${d.slice(3)}`;
  return `(${d.slice(0, 3)}) ${d.slice(3, 6)}-${d.slice(6)}`;
}

/**
 * Three fields only. Every additional field on an emergency form costs
 * conversions from someone who is in pain and typing one-handed - the copy
 * pushes hard toward the phone call, and the form is the fallback.
 */
export default function LeadForm({ compact = false }: { compact?: boolean }) {
  const router = useRouter();
  const [values, setValues] = useState({ name: "", phone: "", symptom: "" });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [sending, setSending] = useState(false);
  const [submitError, setSubmitError] = useState("");

  /**
   * Warms the thank-you route while the visitor is still typing, so the
   * post-submit navigation is instant rather than a blank pause after they
   * have already waited on the network round-trip to /api/enquiry.
   */
  useEffect(() => {
    router.prefetch(THANK_YOU_PATH);
  }, [router]);

  /**
   * Honeypot. Hidden from sight and from assistive tech, and skipped in the
   * tab order, so no real person can fill it - but bots that auto-complete
   * every input will. The server silently discards any submission that has it
   * set. Kept in a ref rather than state so typing into it never re-renders.
   */
  const honeypot = useRef<HTMLInputElement>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const next = {
      name: validateName(values.name),
      phone: validatePhone(values.phone),
    };
    setErrors(next);

    if (!isValid(next)) {
      // Move focus to the first field with an error so keyboard and screen
      // reader users are taken to the problem rather than left at the button.
      const firstBad = Object.keys(next).find((k) => next[k as keyof typeof next]);
      if (firstBad) document.getElementById(`lp-${firstBad}`)?.focus();
      return;
    }

    setSending(true);
    setSubmitError("");

    const err = await sendEnquiry({
      formType: "Emergency LP - Same-Day Visit Request",
      name: values.name.trim(),
      phone: values.phone.trim(),
      symptom: values.symptom.trim(),
      company: honeypot.current?.value || "",
    });

    if (err) {
      setSending(false);
      setSubmitError(err);
      return;
    }

    /**
     * Success now navigates to /thank-you instead of swapping this card for an
     * inline confirmation. A distinct URL is worth more than the in-place
     * state: it gives Google Ads and GA4 a clean destination conversion rather
     * than requiring a click-event trigger, it survives a back-button return
     * to the form, and it gives the confirmation room for the "what happens
     * next" content that would not fit inside the card.
     *
     * `sending` is deliberately left true. Navigation is not instantaneous, and
     * clearing it here would re-enable the submit button for the few hundred
     * milliseconds before the route changes - long enough for someone in pain
     * to tap twice and file two leads.
     */
    /*
      GTM conversion signal. Deliberately here and not on the button's click
      handler: this line is only reached once validation has passed AND the
      backend has accepted the enquiry, so the event counts real leads rather
      than submit attempts, bot hits and validation failures.

      Pushed before the router.push so the event is on the dataLayer while this
      page is still mounted - GTM then has a full tick to read it.

      No PII in the payload. Name, phone and symptom stay out of it: the
      dataLayer is readable by every tag in the container, and this is health
      context.
    */
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({
      event: "form_submit_success",
      form_name: "appointment_request",
      page_type: "emergency",
    });

    rememberFirstName(values.name);
    router.push(THANK_YOU_PATH);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 22 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.55, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
      className={`rounded-2xl bg-white p-4 shadow-[0_30px_80px_-20px_rgba(13,42,56,0.65)] ring-1 ring-white/60 sm:p-6 ${
        compact ? "" : "lg:p-7"
      }`}
    >
      <div className="mb-4">
        <h3 className="font-heading text-[1.25rem] leading-tight text-navy sm:text-[1.4rem]">
          Request a same-day visit
        </h3>
        <p className="mt-1.5 text-[13px] leading-snug text-navy/55">
          Call us at{" "}
          <a
            href={PHONE_TEL}
            data-cta="form-inline-call"
            className="font-bold text-urgent underline decoration-urgent/30 underline-offset-2 hover:decoration-urgent"
          >
            {PHONE_DISPLAY}
          </a>
        </p>
      </div>

      <form onSubmit={handleSubmit} noValidate className="relative space-y-2.5">
        {/* Honeypot - invisible to people, irresistible to bots. Not `display:
            none`, which some bots detect and skip; positioned off-screen
            instead. aria-hidden + tabIndex -1 keep it away from real users. */}
        <div className="absolute left-[-9999px] top-auto h-px w-px overflow-hidden" aria-hidden>
          <label htmlFor="lp-company">Company (leave blank)</label>
          <input
            ref={honeypot}
            id="lp-company"
            name="company"
            type="text"
            tabIndex={-1}
            autoComplete="off"
            defaultValue=""
          />
        </div>

        {FIELDS.map((field) => {
          const error = errors[field.key];
          return (
            <div key={field.key}>
              <label htmlFor={`lp-${field.key}`} className="sr-only">
                {field.label}
              </label>
              <input
                id={`lp-${field.key}`}
                name={field.key}
                type={field.type}
                inputMode={"inputMode" in field ? field.inputMode : undefined}
                autoComplete={field.autoComplete}
                placeholder={field.label}
                value={values[field.key]}
                aria-invalid={error ? true : undefined}
                aria-describedby={error ? `lp-${field.key}-error` : undefined}
                maxLength={field.key === "phone" ? 14 : undefined}
                onChange={(e) => {
                  // The phone field accepts digits only, capped at 10. Filtering
                  // on input rather than only on submit means someone typing
                  // one-handed in pain cannot get 40 characters in and then be
                  // told it was wrong - the field simply refuses the bad keys.
                  const raw = e.target.value;
                  const next =
                    field.key === "phone"
                      ? formatPhone(raw)
                      : raw;

                  setValues((v) => ({ ...v, [field.key]: next }));
                  if (error) setErrors((p) => ({ ...p, [field.key]: "" }));
                }}
                className={`w-full min-w-0 rounded-xl border bg-beige-light/60 px-3.5 py-3 text-[15px] text-navy transition-colors placeholder:text-navy/60 focus:bg-white focus:outline-none focus:ring-2 sm:px-4 sm:py-3.5 ${
                  error
                    ? "border-red-400 focus:border-red-500 focus:ring-red-500/20"
                    : "border-beige focus:border-primary focus:ring-primary/20"
                }`}
              />
              {error && (
                <p
                  id={`lp-${field.key}-error`}
                  className="mt-1 flex items-center gap-1 text-[11.5px] font-medium text-red-600"
                >
                  <AlertCircle className="h-3 w-3 shrink-0" aria-hidden />
                  {error}
                </p>
              )}
            </div>
          );
        })}

        {/* role="alert" so a screen reader announces a failed send rather than
            leaving the user waiting on a button that appears to do nothing. */}
        {submitError && (
          <p
            role="alert"
            className="flex items-start gap-1.5 rounded-lg bg-red-50 px-3 py-2 text-[12px] font-medium text-red-700"
          >
            <AlertCircle className="mt-px h-3.5 w-3.5 shrink-0" aria-hidden />
            <span className="min-w-0">{submitError}</span>
          </p>
        )}

        <button
          type="submit"
          disabled={sending}
          data-cta="form-submit"
          className="group flex w-full items-center justify-center gap-2 rounded-xl bg-urgent px-4 py-3.5 text-[15px] font-bold text-white shadow-[0_10px_28px_-6px_rgba(15,138,109,0.6)] transition-all hover:bg-urgent-dark hover:shadow-[0_14px_34px_-6px_rgba(15,138,109,0.7)] active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-60 sm:text-[16px]"
        >
          {sending ? (
            <>
              <Loader2 className="h-4 w-4 shrink-0 animate-spin" aria-hidden />
              Sending…
            </>
          ) : (
            <>
              Send my appointment request
              <ArrowRight
                className="h-4 w-4 shrink-0 transition-transform group-hover:translate-x-0.5"
                strokeWidth={2.6} aria-hidden />
            </>
          )}
        </button>
      </form>

      <p className="mt-2.5 text-center text-[10.5px] leading-snug text-navy/40">
        We only use your number to get you booked in.
      </p>

      {SHOW_REVIEW_NOTES && (
        <p className="mt-2 rounded-lg border border-dashed border-amber-400/60 bg-amber-50 px-2.5 py-1.5 text-center text-[10px] leading-snug text-amber-900">
          [DEV] Posts to /api/enquiry. Still to add: booking/CRM push + call &amp;
          form conversion tracking.
        </p>
      )}
    </motion.div>
  );
}
