import { cn } from "@/lib/utils";

/** Shimmering placeholder block used by every loading state. */
export function Skeleton({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn("animate-pulse rounded-md bg-black/[0.06]", className)}
      aria-hidden
      {...props}
    />
  );
}
