import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
    /**
     * Next 16 only serves qualities listed here — the default is [75], and a
     * request for anything else returns HTTP 400 rather than falling back. So
     * a `quality={90}` prop is silently inert (or a broken image) until the
     * value is allowlisted.
     *
     * 90 is here for the dentist portraits: small circular crops of faces,
     * where q75 AVIF artefacts land straight on the features. Everything else
     * stays on 75.
     */
    qualities: [75, 90],
    // The header/footer logo is our own trusted SVG in /public. Allow next/image
    // to serve it; CSP keeps it from executing scripts.
    dangerouslyAllowSVG: true,
    contentDispositionType: "attachment",
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },
};

export default nextConfig;
