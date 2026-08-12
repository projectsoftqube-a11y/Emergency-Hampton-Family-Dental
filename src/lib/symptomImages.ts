import fs from "node:fs";
import path from "node:path";

/**
 * Auto-detects symptom-card illustrations, same pattern as the insurance
 * logos. Drop a file into public/images/lp/symptoms/ named after the card
 * slug - toothache.webp, chipped.webp, etc. - and that card swaps its lucide
 * icon for the image on the next load. No file → the card keeps its icon, so
 * the section is never broken.
 *
 * Server-only (reads the filesystem). Called from src/app/page.tsx and passed
 * to <SymptomTriage> as a prop.
 */
const DIR = path.join(process.cwd(), "public", "images", "lp", "symptoms");
const EXTENSIONS = [".webp", ".png", ".svg", ".jpg", ".jpeg"] as const;

export function getSymptomImages(): Record<string, string> {
  let files: string[] = [];
  try {
    files = fs.readdirSync(DIR);
  } catch {
    return {};
  }

  const present = new Set(files.map((f) => f.toLowerCase()));
  const map: Record<string, string> = {};

  for (const file of present) {
    const ext = path.extname(file);
    if (!EXTENSIONS.includes(ext as (typeof EXTENSIONS)[number])) continue;
    const slug = path.basename(file, ext);
    // First match wins if duplicate slugs across extensions.
    if (!map[slug]) map[slug] = `/images/lp/symptoms/${file}`;
  }

  return map;
}
