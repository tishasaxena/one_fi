"use client";

import { useRouter } from "next/navigation";
import { Check, FileText, Landmark, Truck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Money } from "@/components/ui/money";
import { usePurchaseStore, type PurchaseDraft } from "@/store/purchase";
import { formatINR } from "@/lib/format";

const STEPS = [
  {
    icon: FileText,
    title: "No-cost EMI plan locked in",
    note: "We've saved the plan you chose.",
  },
  {
    icon: Landmark,
    title: "Pledge your mutual funds",
    note: "Securely via CAMS / KFin — funds stay in your name.",
  },
  {
    icon: Truck,
    title: "Delivery & first EMI",
    note: "Your order ships once the pledge is confirmed.",
  },
];

export function ConfirmSuccess({ draft }: { draft: PurchaseDraft }) {
  const router = useRouter();
  const clear = usePurchaseStore((s) => s.clear);

  function leave(href: string) {
    clear();
    router.push(href);
  }

  return (
    <div className="flex-1 p-4">
      <div className="flex flex-col items-center gap-3 py-8 text-center">
        <div className="flex size-16 items-center justify-center rounded-full bg-success-light text-success">
          <Check className="size-8" strokeWidth={3} />
        </div>
        <h2 className="text-xl font-semibold tracking-tight">Order confirmed</h2>
        <p className="max-w-[18rem] text-sm text-muted-foreground">
          {draft.productName} · {draft.variantLabel} at{" "}
          <span className="font-semibold text-foreground">{formatINR(draft.plan.monthlyAmount)}</span>
          /mo for {draft.plan.label}.
        </p>
      </div>

      <div className="rounded-2xl border border-border bg-card p-4 shadow-card">
        <p className="section-label mb-3">What happens next</p>
        <ol className="space-y-4">
          {STEPS.map((step, i) => (
            <li key={step.title} className="flex gap-3">
              <div className="flex size-8 shrink-0 items-center justify-center rounded-full bg-primary-light text-primary">
                <step.icon className="size-4" />
              </div>
              <div>
                <p className="text-sm font-semibold">
                  {i + 1}. {step.title}
                </p>
                <p className="text-xs text-muted-foreground">{step.note}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>

      <div className="mt-4 flex items-center justify-between rounded-2xl border border-border bg-card p-4 text-sm shadow-card">
        <span className="text-muted-foreground">Effective cost after MF growth</span>
        <Money amount={draft.plan.effectiveCost} className="font-bold" />
      </div>

      <div className="mt-6 space-y-2">
        <Button size="lg" block onClick={() => leave("/emi-dues")}>
          View EMI dues
        </Button>
        <Button variant="ghost" block onClick={() => leave("/shop?section=marketplace")}>
          Continue shopping
        </Button>
      </div>
    </div>
  );
}
