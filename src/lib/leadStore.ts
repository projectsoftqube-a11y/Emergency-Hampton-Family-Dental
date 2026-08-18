/**
 * Hand-off between the lead form and /thank-you.
 *
 * The visitor's first name travels in sessionStorage rather than a query
 * string. A name in the URL ends up in analytics reports, in the Referer header
 * of every outbound click, and in any link the visitor pastes to someone - PII
 * sitting in three places nobody intended. sessionStorage is scoped to the tab
 * and dies with it.
 *
 * Every call is wrapped: Safari in private mode throws on storage access, and a
 * failed personalisation must never be allowed to block the redirect. The
 * thank-you page reads a missing name as "greet them generically", which is
 * also what a direct visit to /thank-you gets.
 */
const KEY = "lp-lead-first-name";

/** Stores the first word of the submitted name, capped at a sane length. */
export function rememberFirstName(fullName: string): void {
  const first = fullName.trim().split(/\s+/)[0] ?? "";
  if (!first) return;
  try {
    sessionStorage.setItem(KEY, first.slice(0, 24));
  } catch {
    /* private mode - fall through to the generic greeting */
  }
}

/**
 * One-time token proving this tab actually submitted the form, consumed by the
 * conversion tag on /thank-you.
 *
 * Without it the tag fires for anyone who reaches the URL - a refresh, a
 * back-button return, a bookmarked link - each one reported to Google Ads as a
 * fresh lead. `claimConversion` is a claim, not a read: it deletes the token as
 * it returns it, so the conversion can only ever fire once per submission no
 * matter how many times the page mounts.
 */
const CONVERSION_KEY = "lp-lead-conversion-pending";

/** Called by the form once the backend has accepted the enquiry. */
export function markConversionPending(): void {
  try {
    sessionStorage.setItem(CONVERSION_KEY, "1");
  } catch {
    /* private mode - see claimConversion for why this fails open */
  }
}

/**
 * Returns true at most once per submission, then never again for that lead.
 *
 * Fails OPEN when storage is unavailable (Safari private mode): under-reporting
 * conversions silently breaks campaign bidding, which is worse than the rare
 * duplicate from a private-mode refresh. A visitor who never submitted also
 * never lands here in the normal flow, so the open case stays narrow.
 */
export function claimConversion(): boolean {
  try {
    if (sessionStorage.getItem(CONVERSION_KEY) === null) return false;
    sessionStorage.removeItem(CONVERSION_KEY);
    return true;
  } catch {
    return true;
  }
}

/** Returns "" when there is nothing stored, storage is blocked, or on the server. */
export function readFirstName(): string {
  try {
    return sessionStorage.getItem(KEY) ?? "";
  } catch {
    return "";
  }
}

/**
 * People type their name in every case there is. Uppercasing only the first
 * letter - rather than title-casing the whole string - leaves "McCarthy" and
 * "O'Neill" alone, which a naive title-case would mangle into "Mccarthy".
 */
export function forDisplay(name: string): string {
  if (!name) return "";
  return name.charAt(0).toUpperCase() + name.slice(1);
}
