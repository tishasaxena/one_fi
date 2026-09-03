import * as React from "react";
import { cn } from "@/lib/utils";

/**
 * The uppercase, letter-spaced micro-label the 1Fi app puts above every section
 * ("SELECT YOUR VARIANT", "REMAINING LIMIT", ...).
 */
export function SectionLabel({
  className,
  as: Comp = "p",
  ...props
}: React.HTMLAttributes<HTMLElement> & { as?: "p" | "h2" | "h3" | "span" }) {
  return <Comp className={cn("section-label", className)} {...props} />;
}
