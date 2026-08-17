/**
 * Google Tag Manager's dataLayer.
 *
 * GTM's own snippet creates this array at runtime, so TypeScript has no way to
 * know it exists on `window`. Declared globally rather than cast at each call
 * site, so every push is type-checked the same way.
 *
 * Typed as Record<string, unknown> rather than `any`: GTM events are arbitrary
 * key/value payloads, but `any` here would silently disable checking on
 * whatever object is passed in.
 */
export {};

declare global {
  interface Window {
    dataLayer?: Record<string, unknown>[];
  }
}
