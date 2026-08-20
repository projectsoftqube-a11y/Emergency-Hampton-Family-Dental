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
     * Why 90 is now the floor for photographs, not the exception:
     *
     * The source files in /public/images/lp are already heavily compressed —
     * several sit at 0.3-0.5 bits per pixel, where a photograph normally wants
     * 0.6-1.5. Re-encoding those at q75 applies a *second* lossy pass on top of
     * the first, and the artefacts compound: soft edges get softer, and the
     * blocking in flat areas (skin, walls) becomes visible. That double-encode
     * is the part of the reported blurriness this codebase actually controls.
     *
     * The real fix is higher-quality source files — see README "Image quality".
     * Until those land, serving at q90 stops us adding damage of our own.
     */
    qualities: [75, 90, 95],
    // The header/footer logo is our own trusted SVG in /public. Allow next/image
    // to serve it; CSP keeps it from executing scripts.
    dangerouslyAllowSVG: true,
    contentDispositionType: "attachment",
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },
};

export default nextConfig;
