import { AlertTriangle } from "lucide-react";
import { SHOW_REVIEW_NOTES } from "@/lib/lp.config";

/**
 * Renders a [CONFIRM] / [DEV] annotation from the client-review draft.
 * Intentionally styled as an out-of-band note so nobody mistakes it for copy.
 * Every instance disappears when SHOW_REVIEW_NOTES is false.
 */
export default function ReviewNote({ children }: { children: React.ReactNode }) {
  if (!SHOW_REVIEW_NOTES) return null;

  return (
    <p className="mt-3 flex items-start gap-1.5 rounded-lg border border-dashed border-amber-400/60 bg-amber-50 px-2.5 py-2 text-[11px] leading-snug text-amber-900">
      <AlertTriangle className="mt-px h-3 w-3 shrink-0" strokeWidth={2.4} aria-hidden />
      <span className="min-w-0 break-words">{children}</span>
    </p>
  );
}
