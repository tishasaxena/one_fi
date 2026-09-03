"use client";

import { ArrowRight, Share2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { formatINR } from "@/lib/format";

/**
 * Fixed bottom action bar from the app's "Pay using 1Fi" screen: a circular
 * share button + a full-width purple "Continue" pill showing the monthly figure.
 */
export function ProceedBar({
  monthlyAmount,
  tenureLabel,
  disabled,
  onProceed,
  onShare,
}: {
  monthlyAmount: number;
  tenureLabel: string;
  disabled?: boolean;
  onProceed: () => void;
  onShare: () => void;
}) {
  return (
    <div className="sticky bottom-0 z-30 border-t border-border bg-card/95 p-3 backdrop-blur">
      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={onShare}
          aria-label="Share this product"
          className="flex size-12 shrink-0 items-center justify-center rounded-full bg-primary-light text-primary transition-colors hover:bg-primary-light/70"
        >
          <Share2 className="size-4" />
        </button>

        <Button size="lg" block onClick={onProceed} disabled={disabled} className="justify-between">
          <span className="flex flex-col items-start leading-tight">
            <span className="text-[11px] font-medium text-white/80">
              {disabled ? "Select a plan" : `${tenureLabel} plan`}
            </span>
            <span className="text-sm font-bold">
              {disabled ? "—" : `${formatINR(monthlyAmount)}/mo`}
            </span>
          </span>
          <span className="flex items-center gap-1 text-sm font-bold">
            Continue <ArrowRight className="size-4" />
          </span>
        </Button>
      </div>
    </div>
  );
}
