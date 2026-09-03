"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { MapPin, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { PageHeader } from "@/components/app-shell/PageHeader";
import { OrderSummary } from "@/components/review/OrderSummary";
import { PlanBreakdown } from "@/components/review/PlanBreakdown";
import { useHydratedPurchaseDraft } from "@/store/purchase";
import { ProductDetailSkeleton } from "@/components/marketplace/ProductDetailSkeleton";

export function ReviewView({ slug }: { slug: string }) {
  const router = useRouter();
  const { draft, hydrated } = useHydratedPurchaseDraft();
  const [submitting, setSubmitting] = useState(false);

  if (!hydrated) {
    return (
      <>
        <PageHeader title="Review order" back />
        <ProductDetailSkeleton />
      </>
    );
  }

  if (!draft || draft.slug !== slug) {
    return (
      <>
        <PageHeader title="Review order" back />
        <div className="flex flex-1 flex-col items-center gap-3 p-4 py-16 text-center">
          <p className="text-sm font-semibold">Nothing to review yet</p>
          <p className="max-w-[16rem] text-sm text-muted-foreground">
            Pick a variant and an EMI plan first, then continue to review.
          </p>
          <Button asChild variant="outline" size="sm">
            <Link href={`/shop/marketplace/${slug}`}>Back to product</Link>
          </Button>
        </div>
      </>
    );
  }

  function confirm() {
    setSubmitting(true);
    // Simulate the hand-off to the pledge/loan flow.
    setTimeout(() => {
      router.push(`/shop/marketplace/${slug}/review/success`);
    }, 900);
  }

  return (
    <>
      <PageHeader title="Review order" back />

      <div className="flex-1 space-y-4 p-4">
        <OrderSummary draft={draft} />
        <PlanBreakdown draft={draft} />

        <section className="rounded-2xl border border-border bg-card p-4 shadow-card">
          <div className="flex items-start gap-3">
            <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-primary-light text-primary">
              <MapPin className="size-5" />
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-sm font-semibold">Deliver to home</p>
              <p className="text-xs text-muted-foreground">
                12, Koregaon Park Annexe, Pune, Maharashtra 411001
              </p>
            </div>
            <button type="button" className="text-xs font-medium text-primary">
              Change
            </button>
          </div>
        </section>

        <p className="flex items-start gap-2 px-1 text-xs text-muted-foreground">
          <ShieldCheck className="mt-0.5 size-3.5 shrink-0 text-success" />
          Confirming creates a no-cost EMI plan. You&apos;ll pledge mutual funds in the next step —
          nothing is charged now, and there are no processing or foreclosure fees.
        </p>
      </div>

      <div className="sticky bottom-0 z-30 border-t border-border bg-card/95 p-3 backdrop-blur">
        <Button size="lg" block onClick={confirm} disabled={submitting}>
          {submitting ? <Spinner className="text-white" /> : "Confirm & pledge funds"}
        </Button>
      </div>
    </>
  );
}
