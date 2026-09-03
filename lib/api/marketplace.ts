import { apiFetch } from "@/lib/api/client";
import type {
  Category,
  EmiPlansResponse,
  Paginated,
  Product,
  ProductSummary,
} from "@/lib/types";

/**
 * Typed wrappers around the Marketplace API. The hooks layer calls these; UI
 * components never touch `fetch` or URLs directly.
 */

export interface ProductQuery {
  category?: string;
  q?: string;
  cursor?: string | null;
  limit?: number;
}

/**
 * Lets a reviewer force loading / error / empty states by adding
 * `?_scenario=slow|error|empty` to any page URL — it's forwarded to the API.
 */
function currentScenario(): string | undefined {
  if (typeof window === "undefined") return undefined;
  const value = new URLSearchParams(window.location.search).get("_scenario");
  return value === "slow" || value === "error" || value === "empty" ? value : undefined;
}

function buildQuery(params: Record<string, string | number | null | undefined>): string {
  const search = new URLSearchParams();
  const merged = { ...params, _scenario: currentScenario() };
  for (const [key, value] of Object.entries(merged)) {
    if (value !== null && value !== undefined && value !== "") {
      search.set(key, String(value));
    }
  }
  const str = search.toString();
  return str ? `?${str}` : "";
}

export function getCategories(): Promise<Category[]> {
  return apiFetch<{ categories: Category[] }>("/api/marketplace/categories").then(
    (r) => r.categories,
  );
}

export function getProducts(query: ProductQuery = {}): Promise<Paginated<ProductSummary>> {
  const qs = buildQuery({
    category: query.category,
    q: query.q,
    cursor: query.cursor,
    limit: query.limit,
  });
  return apiFetch<Paginated<ProductSummary>>(`/api/marketplace/products${qs}`);
}

export function getProduct(slug: string): Promise<Product> {
  return apiFetch<{ product: Product }>(
    `/api/marketplace/products/${encodeURIComponent(slug)}`,
  ).then((r) => r.product);
}

export interface EmiPlansQuery {
  slug: string;
  amount: number;
  variantId?: string;
  downPayment?: number;
}

export function getEmiPlans(query: EmiPlansQuery): Promise<EmiPlansResponse> {
  const qs = buildQuery({
    slug: query.slug,
    amount: Math.round(query.amount),
    variantId: query.variantId,
    downPayment: query.downPayment,
  });
  return apiFetch<EmiPlansResponse>(`/api/marketplace/emi-plans${qs}`);
}
