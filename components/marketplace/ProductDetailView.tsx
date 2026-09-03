"use client";

import { useCallback, useEffect, useMemo } from "react";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Rating } from "@/components/ui/rating";
import { PageHeader } from "@/components/app-shell/PageHeader";
import { ProductGallery } from "@/components/marketplace/ProductGallery";
import { VariantSelector } from "@/components/marketplace/VariantSelector";
import { AmountBox } from "@/components/marketplace/AmountBox";
import { ProductDetails } from "@/components/marketplace/ProductDetails";
import { SoldByCard } from "@/components/marketplace/SoldByCard";
import { ProceedBar } from "@/components/marketplace/ProceedBar";
import { ProductDetailSkeleton } from "@/components/marketplace/ProductDetailSkeleton";
import { ErrorState } from "@/components/marketplace/states";
import { SectionLabel } from "@/components/ui/section-label";
import { useProduct } from "@/hooks/use-product";
import { useEmiPlans } from "@/hooks/use-emi-plans";
import { usePurchaseStore } from "@/store/purchase";
import { ApiError } from "@/lib/types";
import { shareProduct } from "@/lib/share";

export function ProductDetailView({ slug }: { slug: string }) {
  const router = useRouter();
  const pathname = usePathname();
  const params = useSearchParams();
  const setDraft = usePurchaseStore((s) => s.setDraft);

  const productQuery = useProduct(slug);
  const product = productQuery.data;

  // ---- selection state, mirrored in the URL -------------------------------
  const variants = product?.variants ?? [];
  const firstSelectable = variants.find((v) => v.inStock) ?? variants[0];

  const variantId = params.get("variant") ?? firstSelectable?.id ?? "";
  const selectedVariant =
    variants.find((v) => v.id === variantId) ?? firstSelectable;

  const amountParam = Number(params.get("amount"));
  const amount =
    Number.isFinite(amountParam) && amountParam > 0
      ? amountParam
      : (selectedVariant?.price ?? 0);

  const setParams = useCallback(
    (patch: Record<string, string | null>) => {
      const next = new URLSearchParams(params.toString());
      for (const [key, value] of Object.entries(patch)) {
        if (value === null) next.delete(key);
        else next.set(key, value);
      }
      router.replace(`${pathname}?${next.toString()}`, { scroll: false });
    },
    [params, pathname, router],
  );

  const emiQuery = useEmiPlans({
    slug,
    variantId: selectedVariant?.id ?? "",
    amount,
    downPayment: 0,
  });
  const plans = useMemo(() => emiQuery.data?.plans ?? [], [emiQuery.data]);

  const tenureParam = params.get("tenure");
  const selectedPlan =
    plans.find((p) => p.id === tenureParam) ?? plans.find((p) => p.recommended) ?? plans[0];

  // Default the plan selection to the recommended one once plans arrive.
  useEffect(() => {
    if (plans.length && !plans.some((p) => p.id === tenureParam)) {
      const preferred = plans.find((p) => p.recommended) ?? plans[0];
      if (preferred) setParams({ tenure: preferred.id });
    }
  }, [plans, tenureParam, setParams]);

  const galleryImages = useMemo(() => {
    const fromVariant = selectedVariant?.images;
    return fromVariant && fromVariant.length > 0 ? fromVariant : (product?.images ?? []);
  }, [selectedVariant, product]);

  // ---- states -----------------------------------------------------------
  if (productQuery.isLoading) {
    return (
      <>
        <PageHeader title="Product" back />
        <ProductDetailSkeleton />
      </>
    );
  }

  if (productQuery.isError || !product || !selectedVariant) {
    const notFound =
      productQuery.error instanceof ApiError && productQuery.error.code === "not_found";
    return (
      <>
        <PageHeader title="Product" back />
        <div className="flex-1 p-4">
          {notFound ? (
            <div className="flex flex-col items-center gap-3 py-16 text-center">
              <p className="text-sm font-semibold">We couldn&apos;t find this product</p>
              <p className="max-w-[16rem] text-sm text-muted-foreground">
                It may have been removed or the link is out of date.
              </p>
              <Button asChild variant="outline" size="sm">
                <Link href="/shop?section=marketplace">Back to Marketplace</Link>
              </Button>
            </div>
          ) : (
            <ErrorState error={productQuery.error} onRetry={() => productQuery.refetch()} />
          )}
        </div>
      </>
    );
  }

  function proceed() {
    if (!selectedPlan || !product || !selectedVariant) return;
    setDraft({
      slug: product.slug,
      productName: product.name,
      brand: product.brand,
      image: galleryImages[0] ?? product.image,
      variantId: selectedVariant.id,
      variantLabel: selectedVariant.label,
      variantSublabel: selectedVariant.sublabel,
      amount,
      downPayment: selectedPlan.downPayment,
      plan: selectedPlan,
      soldBy: product.soldBy.name,
      createdAt: Date.now(),
    });
    router.push(`/shop/marketplace/${product.slug}/review`);
  }

  return (
    <>
      <PageHeader
        title="Pay using 1Fi"
        back
        right={
          <button
            type="button"
            onClick={() => shareProduct(product.name, product.slug)}
            aria-label="Share"
            className="mr-1 flex size-9 items-center justify-center rounded-full text-primary hover:bg-muted"
          >
            <span className="sr-only">Share</span>
            <ShareIcon />
          </button>
        }
      />

      <div className="flex-1 space-y-5 p-4">
        <ProductGallery images={galleryImages} alt={product.name} brand={product.brand} />

        <div>
          <div className="flex items-start justify-between gap-3">
            <h2 className="text-xl font-semibold tracking-tight">{product.name}</h2>
          </div>
          <p className="mt-1 text-sm text-muted-foreground">{product.tagline}</p>
          <div className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1">
            {product.rating && <Rating rating={product.rating} />}
            {product.badges.slice(0, 2).map((badge) => (
              <Badge key={badge} variant={badge.toLowerCase().includes("0%") ? "success" : "neutral"}>
                {badge}
              </Badge>
            ))}
          </div>
        </div>

        <div className="space-y-2">
          <SectionLabel>Select your variant</SectionLabel>
          <VariantSelector
            variants={variants}
            value={selectedVariant.id}
            onChange={(id) => {
              const v = variants.find((x) => x.id === id);
              setParams({ variant: id, amount: v ? String(v.price) : null, tenure: null });
            }}
          />
        </div>

        <AmountBox
          amount={amount}
          variantPrice={selectedVariant.price}
          onAmountChange={(value) => setParams({ amount: String(value), tenure: null })}
          plans={plans}
          selectedPlanId={selectedPlan?.id ?? ""}
          onPlanChange={(id) => setParams({ tenure: id })}
          assumptionsNote={emiQuery.data?.assumptions.note}
          isLoading={emiQuery.isLoading}
          isFetching={emiQuery.isFetching}
          isError={emiQuery.isError}
          onRetry={() => emiQuery.refetch()}
        />

        <SoldByCard soldBy={product.soldBy} />

        <ProductDetails product={product} />
      </div>

      <ProceedBar
        monthlyAmount={selectedPlan?.monthlyAmount ?? 0}
        tenureLabel={selectedPlan?.label ?? ""}
        disabled={!selectedPlan || !selectedVariant.inStock}
        onProceed={proceed}
        onShare={() => shareProduct(product.name, product.slug)}
      />
    </>
  );
}

function ShareIcon() {
  return (
    <svg viewBox="0 0 24 24" className="size-4" fill="none" stroke="currentColor" strokeWidth={2}>
      <circle cx="18" cy="5" r="3" />
      <circle cx="6" cy="12" r="3" />
      <circle cx="18" cy="19" r="3" />
      <path d="m8.6 13.5 6.8 4M15.4 6.5l-6.8 4" strokeLinecap="round" />
    </svg>
  );
}
