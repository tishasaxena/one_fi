"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { PageHeader } from "@/components/app-shell/PageHeader";
import { ConfirmSuccess } from "@/components/review/ConfirmSuccess";
import { ProductDetailSkeleton } from "@/components/marketplace/ProductDetailSkeleton";
import { useHydratedPurchaseDraft } from "@/store/purchase";

export function SuccessView({ slug }: { slug: string }) {
  const { draft, hydrated } = useHydratedPurchaseDraft();

  if (!hydrated) {
    return (
      <>
        <PageHeader title="Order confirmed" />
        <ProductDetailSkeleton />
      </>
    );
  }

  if (!draft || draft.slug !== slug) {
    return (
      <>
        <PageHeader title="Order confirmed" />
        <div className="flex flex-1 flex-col items-center gap-3 p-4 py-16 text-center">
          <p className="text-sm font-semibold">This order is no longer available to view here</p>
          <Button asChild variant="outline" size="sm">
            <Link href="/shop?section=marketplace">Back to Marketplace</Link>
          </Button>
        </div>
      </>
    );
  }

  return (
    <>
      <PageHeader title="Order confirmed" />
      <ConfirmSuccess draft={draft} />
    </>
  );
}
