/** Central registry of React Query keys so cache invalidation stays consistent. */
export const queryKeys = {
  categories: () => ["categories"] as const,
  products: (filters: { category?: string; q?: string }) =>
    ["products", { category: filters.category ?? null, q: filters.q ?? null }] as const,
  product: (slug: string) => ["product", slug] as const,
  emiPlans: (params: { slug: string; variantId: string; amount: number; downPayment: number }) =>
    ["emi-plans", params] as const,
};
