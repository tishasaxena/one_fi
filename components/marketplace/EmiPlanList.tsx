"use client";

import * as RadioGroupPrimitive from "@radix-ui/react-radio-group";
import { Check, Info } from "lucide-react";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { formatINR, formatPercent } from "@/lib/format";
import type { EmiPlan } from "@/lib/types";

export function EmiPlanRow({ plan, selected }: { plan: EmiPlan; selected: boolean }) {
  const noCost = plan.annualRatePct === 0;

  return (
    <RadioGroupPrimitive.Item
      value={plan.id}
      className={cn(
        "group flex w-full items-center gap-3 rounded-xl border p-3 text-left transition-colors",
        "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary",
        selected
          ? "border-primary bg-primary-light/50"
          : "border-border bg-card hover:border-primary/40",
      )}
    >
      <span
        className={cn(
          "flex size-5 shrink-0 items-center justify-center rounded-full border-2 transition-colors",
          selected ? "border-primary bg-primary text-primary-foreground" : "border-muted-foreground/40",
        )}
        aria-hidden
      >
        {selected && <Check className="size-3" strokeWidth={3} />}
      </span>

      <span className="min-w-0 flex-1">
        <span className="flex flex-wrap items-center gap-x-2 gap-y-1">
          <span className="text-sm font-semibold">{plan.label}</span>
          {plan.recommended && (
            <Badge variant="brand" size="sm">
              Recommended
            </Badge>
          )}
        </span>
        <span className="mt-0.5 block text-xs text-muted-foreground">
          {noCost ? "0% p.a." : `${formatPercent(plan.annualRatePct)} p.a.`}
          {plan.savingsVsUpfront > 0 && (
            <span className="text-success"> · Save {formatINR(plan.savingsVsUpfront)}</span>
          )}
        </span>
      </span>

      <span className="shrink-0 text-right">
        <span className="block text-sm font-bold tabular-nums">{formatINR(plan.monthlyAmount)}</span>
        <span className="block text-[11px] text-muted-foreground">/mo</span>
      </span>
    </RadioGroupPrimitive.Item>
  );
}

export function EmiPlanList({
  plans,
  value,
  onChange,
  note,
  isFetching,
}: {
  plans: EmiPlan[];
  value: string;
  onChange: (planId: string) => void;
  note?: string;
  isFetching?: boolean;
}) {
  return (
    <div className={cn("space-y-2 transition-opacity", isFetching && "opacity-60")}>
      <RadioGroupPrimitive.Root
        value={value}
        onValueChange={onChange}
        aria-label="Select an EMI plan"
        className="grid gap-2"
      >
        {plans.map((plan) => (
          <EmiPlanRow key={plan.id} plan={plan} selected={plan.id === value} />
        ))}
      </RadioGroupPrimitive.Root>

      {note && (
        <p className="flex gap-1.5 pt-1 text-[11px] leading-relaxed text-muted-foreground">
          <Info className="mt-0.5 size-3 shrink-0" />
          <span>{note}</span>
        </p>
      )}
    </div>
  );
}

export function EmiPlanListSkeleton({ rows = 4 }: { rows?: number }) {
  return (
    <div className="space-y-2" aria-hidden>
      {Array.from({ length: rows }).map((_, i) => (
        <Skeleton key={i} className="h-[58px] rounded-xl" />
      ))}
    </div>
  );
}
