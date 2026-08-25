/**
 * Google Tag Manager's dataLayer.
 *
 * GTM's snippet creates this array at runtime, so TypeScript has no way to
 * know it exists on `window`. Declared globally rather than cast at each call
 * site, so every push is type-checked the same way.
 *
 * Plain objects only. gtag.js used to share this array and pushed its own
 * `arguments` object (which serialises as an array), so the type had to allow
 * both - gtag.js has since been removed in favour of configuring everything
 * inside the GTM container, and the union narrowed with it.
 */
export {};

declare global {
  interface Window {
    dataLayer?: Record<string, unknown>[];
  }
}
