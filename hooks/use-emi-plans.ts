"use client";

import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { getEmiPlans } from "@/lib/api/marketplace";
import { queryKeys } from "@/lib/query-keys";

export interface UseEmiPlansArgs {
  slug: string;
  variantId: string;
  amount: number;
  downPayment?: number;
}

/**
 * EMI plans for the selected variant/amount. Plans are computed server-side (the
 * mock API calls the shared calculator), so this stays a single source of truth.
 * `keepPreviousData` avoids a flash of empty rows while switching variant.
 */
export function useEmiPlans({ slug, variantId, amount, downPayment = 0 }: UseEmiPlansArgs) {
  return useQuery({
    queryKey: queryKeys.emiPlans({ slug, variantId, amount, downPayment }),
    queryFn: () => getEmiPlans({ slug, amount, variantId, downPayment }),
    enabled: Boolean(slug) && amount > 0,
    placeholderData: keepPreviousData,
    staleTime: 60 * 1000,
  });
}
