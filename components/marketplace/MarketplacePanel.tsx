"use client";

import { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { SearchBar } from "@/components/marketplace/SearchBar";
import { CategoryFilter, CategoryFilterSkeleton } from "@/components/marketplace/CategoryFilter";
import { ProductGrid, ProductGridSkeleton } from "@/components/marketplace/ProductGrid";
import { ErrorState, NoResultsState } from "@/components/marketplace/states";
import { useCategories } from "@/hooks/use-categories";
import { useProducts } from "@/hooks/use-products";
import { CATEGORIES } from "@/data/categories";

export function MarketplacePanel() {
  const [category, setCategory] = useState("all");
  const [query, setQuery] = useState("");

  const categoriesQuery = useCategories();
  const productsQuery = useProducts({
    category: category === "all" ? undefined : category,
    q: query || undefined,
  });

  const products = useMemo(
    () => productsQuery.data?.pages.flatMap((page) => page.items) ?? [],
    [productsQuery.data],
  );
  const total = productsQuery.data?.pages[0]?.total ?? 0;

  return (
    <div className="space-y-4 pt-1">
      <SearchBar value={query} onChange={setQuery} />

      {categoriesQuery.isLoading ? (
        <CategoryFilterSkeleton />
      ) : (
        <CategoryFilter
          categories={categoriesQuery.data ?? CATEGORIES}
          value={category}
          onChange={setCategory}
        />
      )}

      {productsQuery.isLoading ? (
        <ProductGridSkeleton />
      ) : productsQuery.isError ? (
        <ErrorState error={productsQuery.error} onRetry={() => productsQuery.refetch()} />
      ) : products.length === 0 ? (
        <NoResultsState query={query || CATEGORIES.find((c) => c.slug === category)?.name || ""} />
      ) : (
        <>
          <div className="flex items-center justify-between">
            <p className="text-xs text-muted-foreground">
              {total} {total === 1 ? "product" : "products"}
            </p>
            {productsQuery.isFetching && !productsQuery.isFetchingNextPage && <Spinner />}
          </div>

          <ProductGrid products={products} />

          {productsQuery.hasNextPage && (
            <div className="pt-1">
              <Button
                variant="outline"
                block
                onClick={() => productsQuery.fetchNextPage()}
                disabled={productsQuery.isFetchingNextPage}
              >
                {productsQuery.isFetchingNextPage ? <Spinner /> : "Load more"}
              </Button>
            </div>
          )}
        </>
      )}
    </div>
  );
}
