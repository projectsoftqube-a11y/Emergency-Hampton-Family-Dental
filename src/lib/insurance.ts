import fs from "node:fs";
import path from "node:path";
import { CARRIERS, type Carrier } from "@/lib/lp.config";

/**
 * Auto-detects which carrier logos are present on disk.
 *
 * Drop a file into public/images/lp/insurance/ named after the carrier slug -
 * delta-dental.webp, cigna.svg, aetna.png - and that pill renders the logo on
 * the next page load. No code change, no config edit, no import to add. Any
 * carrier without a file falls back to its name set as type, so the section is
 * never broken and never shows an empty slot.
 *
 * Server-only: this reads the filesystem, so it must be called from a server
 * component (src/app/page.tsx does) and the result passed down as a prop.
 */
const LOGO_DIR = path.join(process.cwd(), "public", "images", "lp", "insurance");

// Ordered by how likely each format is to be the good one - SVG scales
// perfectly, WebP is smallest, PNG is what most brand kits actually ship.
const EXTENSIONS = [".svg", ".webp", ".png", ".jpg", ".jpeg"] as const;

export function getCarriers(): Carrier[] {
  let files: string[] = [];
  try {
    files = fs.readdirSync(LOGO_DIR);
  } catch {
    // Folder missing (e.g. nothing downloaded yet) - every carrier falls back
    // to text, which is a perfectly good state to ship in.
    return [...CARRIERS];
  }

  const present = new Set(files.map((f) => f.toLowerCase()));

  return CARRIERS.map((carrier) => {
    for (const ext of EXTENSIONS) {
      const filename = `${carrier.slug}${ext}`;
      if (present.has(filename)) {
        return { ...carrier, logo: `/images/lp/insurance/${filename}` };
      }
    }
    return carrier;
  });
}
