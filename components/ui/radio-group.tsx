"use client";

import * as React from "react";
import * as RadioGroupPrimitive from "@radix-ui/react-radio-group";
import { cn } from "@/lib/utils";

export const RadioGroup = React.forwardRef<
  React.ComponentRef<typeof RadioGroupPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Root>
>(({ className, ...props }, ref) => (
  <RadioGroupPrimitive.Root ref={ref} className={cn("grid gap-2", className)} {...props} />
));
RadioGroup.displayName = "RadioGroup";

/**
 * A card-style radio row matching the 1Fi "SELECT YOUR VARIANT" list: the whole
 * row is the control; the selected row gets a purple ring + tint.
 */
export const RadioCard = React.forwardRef<
  React.ComponentRef<typeof RadioGroupPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Item>
>(({ className, children, ...props }, ref) => (
  <RadioGroupPrimitive.Item
    ref={ref}
    className={cn(
      "group relative flex w-full items-center gap-3 rounded-xl border border-border bg-card p-3.5 text-left transition-colors",
      "hover:border-primary/40",
      "data-[state=checked]:border-primary data-[state=checked]:bg-primary-light/50",
      "disabled:cursor-not-allowed disabled:opacity-50",
      "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary",
      className,
    )}
    {...props}
  >
    <span
      className={cn(
        "mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full border-2 border-muted-foreground/40 transition-colors",
        "group-data-[state=checked]:border-primary",
      )}
      aria-hidden
    >
      <RadioGroupPrimitive.Indicator className="block size-2.5 rounded-full bg-primary" />
    </span>
    <span className="min-w-0 flex-1">{children}</span>
  </RadioGroupPrimitive.Item>
));
RadioCard.displayName = "RadioCard";
