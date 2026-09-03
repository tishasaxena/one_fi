"use client";

import { useEffect, useState } from "react";
import { ChevronDown, Pencil } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { SectionLabel } from "@/components/ui/section-label";
import { Sheet, SheetContent, SheetClose, SheetTrigger } from "@/components/ui/sheet";
import { EmiPlanList, EmiPlanListSkeleton } from "@/components/marketplace/EmiPlanList";
import { ErrorState } from "@/components/marketplace/states";
import { formatINR } from "@/lib/format";
import type { EmiPlan } from "@/lib/types";

const MIN_AMOUNT = 1000;
const MAX_AMOUNT = 5_000_000;

interface AmountBoxProps {
  amount: number;
  variantPrice: number;
  onAmountChange: (amount: number) => void;
  plans: EmiPlan[];
  selectedPlanId: string;
  onPlanChange: (planId: string) => void;
  assumptionsNote?: string;
  isLoading: boolean;
  isFetching: boolean;
  isError: boolean;
  onRetry: () => void;
}

export function AmountBox({
  amount,
  variantPrice,
  onAmountChange,
  plans,
  selectedPlanId,
  onPlanChange,
  assumptionsNote,
  isLoading,
  isFetching,
  isError,
  onRetry,
}: AmountBoxProps) {
  const [open, setOpen] = useState(true);
  const startsAt = plans.length ? Math.min(...plans.map((p) => p.monthlyAmount)) : 0;

  return (
    <section className="rounded-2xl border border-border bg-card shadow-card">
      <div className="flex items-center justify-between px-4 pt-4">
        <SectionLabel>Suggested amount</SectionLabel>
        <EditAmountSheet
          amount={amount}
          variantPrice={variantPrice}
          onChange={onAmountChange}
        />
      </div>

      <div className="flex items-center justify-between px-4 pb-3 pt-1">
        <p className="text-2xl font-bold tabular-nums">{formatINR(amount)}</p>
      </div>

      <div className="border-t border-border">
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          className="flex w-full items-center justify-between px-4 py-3 text-sm"
        >
          <span className="text-muted-foreground">
            {isLoading ? (
              "Calculating plans…"
            ) : (
              <>
                Starts at <span className="font-semibold text-foreground">{formatINR(startsAt)}</span>
                /mo
              </>
            )}
          </span>
          <span className="flex items-center gap-1 font-semibold text-primary">
            {open ? "Hide plans" : "Show plans"}
            <ChevronDown className={cn("size-4 transition-transform", open && "rotate-180")} />
          </span>
        </button>

        {open && (
          <div className="px-4 pb-4">
            {isLoading ? (
              <EmiPlanListSkeleton />
            ) : isError ? (
              <ErrorState error={null} onRetry={onRetry} />
            ) : (
              <EmiPlanList
                plans={plans}
                value={selectedPlanId}
                onChange={onPlanChange}
                note={assumptionsNote}
                isFetching={isFetching}
              />
            )}
          </div>
        )}
      </div>
    </section>
  );
}

function EditAmountSheet({
  amount,
  variantPrice,
  onChange,
}: {
  amount: number;
  variantPrice: number;
  onChange: (amount: number) => void;
}) {
  const [open, setOpen] = useState(false);
  const [draft, setDraft] = useState(String(amount));

  useEffect(() => {
    if (open) setDraft(String(amount));
  }, [open, amount]);

  const parsed = Number(draft.replace(/[^0-9]/g, ""));
  const valid = parsed >= MIN_AMOUNT && parsed <= MAX_AMOUNT;

  function apply() {
    if (valid) {
      onChange(parsed);
      setOpen(false);
    }
  }

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <button
          type="button"
          className="inline-flex items-center gap-1 text-xs font-medium text-primary"
        >
          <Pencil className="size-3" />
          Edit amount
        </button>
      </SheetTrigger>
      <SheetContent title="Paying a different amount?">
        <p className="text-sm text-muted-foreground">
          By default you&apos;ll finance the full price ({formatINR(variantPrice)}). Enter a
          different amount to split the payment.
        </p>
        <div className="mt-4 flex h-12 items-center gap-2 rounded-xl border border-border px-4">
          <span className="text-lg font-semibold text-muted-foreground">₹</span>
          <input
            autoFocus
            inputMode="numeric"
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && apply()}
            className="w-full bg-transparent text-lg font-semibold outline-none"
            aria-label="Amount to finance"
          />
        </div>
        {!valid && draft !== "" && (
          <p className="mt-2 text-xs text-destructive">
            Enter an amount between {formatINR(MIN_AMOUNT)} and {formatINR(MAX_AMOUNT)}.
          </p>
        )}
        <div className="mt-4 flex gap-2">
          <SheetClose asChild>
            <Button variant="outline" block>
              Cancel
            </Button>
          </SheetClose>
          <Button block onClick={apply} disabled={!valid}>
            Apply
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
}
