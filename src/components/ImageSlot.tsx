"use client";

import Image from "next/image";
import { ImageIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { SHOW_IMAGE_SLOT_LABELS } from "@/lib/lp.config";

/**
 * A single image slot.
 *
 * While `src` is undefined it renders an on-brand placeholder that states the
 * exact filename, pixel size and purpose the design expects - so the page still
 * looks composed in review, and a developer never has to guess what goes where.
 *
 * The moment a real file lands in /public/images/lp/, pass `src` and this
 * becomes a fully optimised next/image with no other change to the call site.
 *
 * Prompts for generating every one of these live in IMAGE-PROMPTS.md.
 */
export type ImageSlotProps = {
  /** Human description shown on the placeholder, e.g. "Hero - practice exterior". */
  label: string;
  /** Filename the slot expects, relative to /public/images/lp/. */
  file: string;
  /** Intrinsic size guidance, e.g. "2400 × 1400". */
  dimensions: string;
  /** Real alt text - used verbatim once `src` is supplied. */
  alt: string;
  /** Supply to render the real optimised image. */
  src?: string;
  /** Wrapper classes - control the aspect ratio and radius here. */
  className?: string;
  /** Extra classes on the <Image> itself. */
  imgClassName?: string;
  /** Dark placeholder for use over navy surfaces. */
  tone?: "light" | "dark";
  /** Render the label as a small corner chip instead of a centred card. */
  corner?: boolean;
  priority?: boolean;
  sizes?: string;
  objectPosition?: string;
  /**
   * next/image defaults to 75. Worth raising for small images of faces, where
   * the encoder has few pixels to work with and compression artefacts land
   * directly on the features people actually look at.
   */
  quality?: number;
};

export default function ImageSlot({
  label,
  file,
  dimensions,
  alt,
  src,
  className,
  imgClassName,
  tone = "light",
  corner = false,
  priority = false,
  sizes = "(max-width: 768px) 100vw, 50vw",
  objectPosition = "center",
  quality,
}: ImageSlotProps) {
  if (src) {
    return (
      <div className={cn("relative overflow-hidden", className)}>
        <Image
          src={src}
          alt={alt}
          fill
          priority={priority}
          sizes={sizes}
          quality={quality}
          className={cn("object-cover", imgClassName)}
          style={{ objectPosition }}
        />
      </div>
    );
  }

  const dark = tone === "dark";

  return (
    <div
      role="img"
      aria-label={`Image placeholder: ${alt}`}
      className={cn(
        "relative overflow-hidden",
        dark ? "bg-navy-dark" : "bg-beige-light",
        className
      )}
    >
      {/* Diagonal weave - reads as an intentional surface, not a broken image */}
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          backgroundImage: dark
            ? "repeating-linear-gradient(135deg, rgba(120,140,180,0.14) 0 1px, transparent 1px 11px)"
            : "repeating-linear-gradient(135deg, rgba(30,96,118,0.10) 0 1px, transparent 1px 11px)",
        }}
      />
      <div
        aria-hidden
        className={cn(
          "absolute inset-0",
          dark
            ? "bg-[radial-gradient(ellipse_at_30%_25%,rgba(30,96,118,0.55),transparent_65%)]"
            : "bg-[radial-gradient(ellipse_at_30%_25%,rgba(169,183,210,0.35),transparent_65%)]"
        )}
      />

      {!SHOW_IMAGE_SLOT_LABELS ? null : corner ? (
        <div className="absolute left-3 top-3 z-20 max-w-[calc(100%-1.5rem)]">
          <span
            className={cn(
              "inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[9px] font-semibold uppercase tracking-[0.12em] backdrop-blur-md",
              dark
                ? "bg-white/12 text-white/80 ring-1 ring-white/20"
                : "bg-navy/8 text-navy/70 ring-1 ring-navy/12"
            )}
          >
            <ImageIcon className="h-3 w-3 shrink-0" strokeWidth={2.2} aria-hidden />
            <span className="truncate">{file}</span>
          </span>
        </div>
      ) : (
        <div className="absolute inset-0 z-10 flex items-center justify-center p-3">
          <div
            className={cn(
              "min-w-0 max-w-full rounded-xl px-3 py-3 text-center backdrop-blur-sm",
              dark
                ? "bg-white/6 ring-1 ring-white/15"
                : "bg-white/70 ring-1 ring-navy/10"
            )}
          >
            <ImageIcon
              className={cn(
                "mx-auto mb-1.5 h-4 w-4",
                dark ? "text-steel-light" : "text-primary"
              )}
              strokeWidth={2} aria-hidden />
            <p
              className={cn(
                "text-[10px] font-bold uppercase leading-tight tracking-[0.1em]",
                dark ? "text-white/85" : "text-navy"
              )}
            >
              {label}
            </p>
            <p
              className={cn(
                "mt-1 break-all font-mono text-[9px] leading-snug",
                dark ? "text-steel-light/80" : "text-primary/80"
              )}
            >
              {file}
            </p>
            <p
              className={cn(
                "mt-0.5 text-[9px] tabular-nums",
                dark ? "text-white/45" : "text-navy/45"
              )}
            >
              {dimensions}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
