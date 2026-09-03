import Image from "next/image";
import { Money } from "@/components/ui/money";
import { SectionLabel } from "@/components/ui/section-label";
import type { PurchaseDraft } from "@/store/purchase";

export function OrderSummary({ draft }: { draft: PurchaseDraft }) {
  return (
    <section className="rounded-2xl border border-border bg-card p-4 shadow-card">
      <SectionLabel className="mb-3">Your order</SectionLabel>
      <div className="flex gap-3">
        <div className="relative size-16 shrink-0 overflow-hidden rounded-xl border border-border bg-muted/40">
          <Image src={draft.image} alt="" fill sizes="64px" className="object-contain p-1.5" />
        </div>
        <div className="min-w-0 flex-1">
          <p className="text-[11px] font-medium uppercase tracking-wide text-muted-foreground">
            {draft.brand}
          </p>
          <p className="truncate text-sm font-semibold">{draft.productName}</p>
          <p className="truncate text-xs text-muted-foreground">
            {draft.variantSublabel ?? draft.variantLabel}
          </p>
        </div>
        <Money amount={draft.amount} className="shrink-0 text-sm font-bold" />
      </div>
    </section>
  );
}
