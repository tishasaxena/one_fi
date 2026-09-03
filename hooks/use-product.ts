"use client";

import { useQuery } from "@tanstack/react-query";
import { getProduct } from "@/lib/api/marketplace";
import { queryKeys } from "@/lib/query-keys";

export function useProduct(slug: string) {
  return useQuery({
    queryKey: queryKeys.product(slug),
    queryFn: () => getProduct(slug),
    staleTime: 5 * 60 * 1000,
    enabled: Boolean(slug),
  });
}
