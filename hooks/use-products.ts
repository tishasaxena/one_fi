"use client";

import { useInfiniteQuery } from "@tanstack/react-query";
import { getProducts } from "@/lib/api/marketplace";
import { queryKeys } from "@/lib/query-keys";

export interface UseProductsArgs {
  category?: string;
  q?: string;
}

/**
 * Paginated product listing. `useInfiniteQuery` gives us cursor pagination plus
 * `isLoading` / `isError` / `isFetchingNextPage` for the grid's states.
 */
export function useProducts({ category, q }: UseProductsArgs) {
  return useInfiniteQuery({
    queryKey: queryKeys.products({ category, q }),
    queryFn: ({ pageParam }) =>
      getProducts({ category, q, cursor: pageParam ?? null, limit: 8 }),
    initialPageParam: null as string | null,
    getNextPageParam: (lastPage) => lastPage.nextCursor,
    staleTime: 60 * 1000,
  });
}
