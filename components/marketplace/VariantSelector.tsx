"use client";

import { RadioGroup, RadioCard } from "@/components/ui/radio-group";
import { Money } from "@/components/ui/money";
import type { Variant } from "@/lib/types";

/**
 * "SELECT YOUR VARIANT" — the radio list from the app's product screen. The
 * selected row gets a purple ring + tint; out-of-stock rows are disabled.
 */
export function VariantSelector({
  variants,
  value,
  onChange,
}: {
  variants: Variant[];
  value: string;
  onChange: (variantId: string) => void;
}) {
  return (
    <RadioGroup value={value} onValueChange={onChange} aria-label="Select your variant">
      {variants.map((variant) => (
        <RadioCard key={variant.id} value={variant.id} disabled={!variant.inStock}>
          <span className="flex items-start justify-between gap-3">
            <span className="min-w-0">
              <span className="block text-sm font-semibold">{variant.label}</span>
              {variant.sublabel && (
                <span className="mt-0.5 block text-xs text-muted-foreground">
                  {variant.sublabel}
                </span>
              )}
              {!variant.inStock && (
                <span className="mt-1 block text-xs font-medium text-destructive">
                  Out of stock
                </span>
              )}
            </span>
            <span className="shrink-0 text-right">
              <Money amount={variant.price} className="text-sm font-bold" />
              {variant.mrp && variant.mrp > variant.price && (
                <Money amount={variant.mrp} strike className="mt-0.5 block text-xs" />
              )}
            </span>
          </span>
        </RadioCard>
      ))}
    </RadioGroup>
  );
}
