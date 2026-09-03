import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

/**
 * The purple-gradient rounded card the 1Fi app puts at the top of Home / EMI
 * Dues / Limit. Uppercase white micro-labels, big white figures.
 */
export function GradientHeader({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "brand-gradient relative overflow-hidden rounded-2xl p-5 text-white shadow-pop",
        className,
      )}
    >
      <div
        className="pointer-events-none absolute -right-8 -top-10 size-40 rounded-full bg-white/10"
        aria-hidden
      />
      <div className="relative">{children}</div>
    </div>
  );
}
