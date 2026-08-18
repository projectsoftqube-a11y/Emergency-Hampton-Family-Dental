/**
 * Google Tag Manager / gtag.js shared dataLayer.
 *
 * Both GTM's snippet and gtag.js create this array at runtime, so TypeScript
 * has no way to know it exists on `window`. Declared globally rather than cast
 * at each call site, so every push is type-checked the same way.
 *
 * The element type is a union because the two producers push different shapes:
 * GTM pushes plain objects ({ event: "form_submit_success", ... }), while
 * gtag() pushes its own `arguments` object, which serialises as an array
 * (["event", "conversion", { send_to: "..." }]). Typing it as only one of the
 * two would reject legitimate calls from the other.
 */
export {};

declare global {
  interface Window {
    dataLayer?: (Record<string, unknown> | unknown[] | IArguments)[];
  }
}
