import { Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

/** The sparkle "New" pill used on 1fi.in — reused for the Marketplace's own badges. */
export function NewBadge({ className, light }: { className?: string; light?: boolean }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[11px] font-semibold",
        light ? "bg-white/15 text-white" : "bg-primary-light text-primary-dark",
        className,
      )}
    >
      <Sparkles className="size-3" />
      New
    </span>
  );
}
