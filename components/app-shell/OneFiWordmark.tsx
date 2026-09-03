import { cn } from "@/lib/utils";

/**
 * 1Fi wordmark — a rounded-square mark ("1Fi") plus, optionally, the name.
 * Mirrors the app icon: purple tile, white lettering.
 */
export function OneFiWordmark({
  className,
  tone = "brand",
  showName = false,
}: {
  className?: string;
  tone?: "brand" | "light";
  showName?: boolean;
}) {
  return (
    <span className={cn("inline-flex items-center gap-2", className)}>
      <span
        className={cn(
          "grid size-9 place-items-center rounded-[10px] text-sm font-bold tracking-tight",
          tone === "light" ? "bg-white/15 text-white ring-1 ring-white/25" : "brand-gradient text-white",
        )}
        aria-hidden
      >
        1Fi
      </span>
      {showName && <span className="text-base font-semibold tracking-tight">1Fi</span>}
      <span className="sr-only">1Fi</span>
    </span>
  );
}
