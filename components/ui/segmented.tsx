"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

export interface SegmentedOption {
  value: string;
  label: string;
  /** Small dot indicator, e.g. for a "New" section. */
  dot?: boolean;
}

interface SegmentedProps {
  options: SegmentedOption[];
  value: string;
  onValueChange: (value: string) => void;
  "aria-label": string;
  /**
   * "track"  – connected pill with a filled active segment (default)
   * "chips"  – individual bordered chips, matching the app's tenure/category chips
   */
  variant?: "track" | "chips";
  /** Stretch segments to equal width (good for 2–3 options). */
  fill?: boolean;
  className?: string;
}

/**
 * Segmented control. The active segment uses the near-black fill the 1Fi app
 * uses for its selected chips (EMI tenure picker, EMI-dues tabs).
 */
export function Segmented({
  options,
  value,
  onValueChange,
  className,
  variant = "track",
  fill = false,
  "aria-label": ariaLabel,
}: SegmentedProps) {
  const chips = variant === "chips";

  return (
    <div
      role="tablist"
      aria-label={ariaLabel}
      className={cn(
        "no-scrollbar flex",
        chips ? "gap-2" : "gap-1 rounded-full bg-black/[0.06] p-1",
        fill ? "w-full" : "overflow-x-auto",
        className,
      )}
    >
      {options.map((option) => {
        const active = option.value === value;
        return (
          <button
            key={option.value}
            role="tab"
            aria-selected={active}
            type="button"
            onClick={() => onValueChange(option.value)}
            className={cn(
              "flex items-center justify-center gap-1.5 rounded-full text-[13px] font-semibold transition-colors",
              fill ? "flex-1" : "shrink-0",
              chips
                ? [
                    "border px-3.5 py-2",
                    active
                      ? "border-ink bg-ink text-ink-foreground"
                      : "border-border bg-card text-muted-foreground hover:text-foreground",
                  ]
                : [
                    "px-3 py-2",
                    active
                      ? "bg-card text-foreground shadow-sm"
                      : "text-muted-foreground hover:text-foreground",
                  ],
            )}
          >
            <span className="truncate">{option.label}</span>
            {option.dot && (
              <span
                className={cn(
                  "size-1.5 shrink-0 rounded-full",
                  active ? "bg-current opacity-70" : "bg-primary",
                )}
                aria-hidden
              />
            )}
          </button>
        );
      })}
    </div>
  );
}
