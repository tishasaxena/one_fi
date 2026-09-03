/**
 * Domain types shared by the mock API, the data layer and the UI.
 *
 * The shapes mirror what the 1Fi "Pay using 1Fi" screen shows: a product with a
 * brand, one or more purchasable variants, and a set of EMI plans computed for a
 * chosen amount.
 */

export interface Category {
  id: string;
  /** URL-safe identifier used in query params and API filters. */
  slug: string;
  name: string;
  /** lucide-react icon name, resolved in the UI. */
  icon: string;
}

export interface VariantAttribute {
  name: string;
  value: string;
}

export interface Variant {
  id: string;
  /** Short label shown in the selector, e.g. "256 GB". */
  label: string;
  /** Secondary line, e.g. "iPhone 17 Pro · 256 GB". */
  sublabel?: string;
  attributes: VariantAttribute[];
  /** 1Fi price for this variant, in whole rupees. */
  price: number;
  /** Optional MRP for a strike-through comparison. */
  mrp?: number;
  /** Variant-specific imagery; falls back to the product images when absent. */
  images?: string[];
  inStock: boolean;
}

export interface SpecGroup {
  group: string;
  items: { label: string; value: string }[];
}

export interface ProductRating {
  value: number;
  count: number;
}

/** Lightweight shape returned by the product listing endpoint. */
export interface ProductSummary {
  id: string;
  slug: string;
  name: string;
  brand: string;
  categorySlug: string;
  tagline: string;
  image: string;
  /** Lowest variant price — drives the "from ₹X" and "from ₹X/mo" labels. */
  startingPrice: number;
  mrp?: number;
  badges: string[];
  rating?: ProductRating;
  inStock: boolean;
}

/** Full product detail. */
export interface Product extends ProductSummary {
  description: string;
  images: string[];
  highlights: string[];
  specs: SpecGroup[];
  variants: Variant[];
  /** Analogue of the app's "PAYING TO" block. */
  soldBy: { name: string; note?: string };
  /** Tenures (months) offered for this product, each with its own APR. */
  planConfigs: PlanConfig[];
}

export interface PlanConfig {
  tenureMonths: number;
  /** Annual interest rate for this tenure. 0 = genuine no-cost EMI. */
  annualRatePct: number;
}

export interface EmiPlan {
  id: string;
  tenureMonths: number;
  label: string;
  annualRatePct: number;
  /** Rounded monthly instalment. */
  monthlyAmount: number;
  /** monthlyAmount * tenureMonths + downPayment. */
  totalPayable: number;
  /** Interest paid over the loan (0 for no-cost plans). */
  interestComponent: number;
  processingFee: number;
  downPayment: number;
  /**
   * Net gain from keeping the money invested in mutual funds instead of paying
   * upfront: expected MF growth minus interest and fees. Can be negative.
   */
  savingsVsUpfront: number;
  /** Purchase amount minus savingsVsUpfront. */
  effectiveCost: number;
  recommended: boolean;
}

export interface EmiPlansResponse {
  amount: number;
  plans: EmiPlan[];
  assumptions: {
    expectedReturnPct: number;
    compounding: "annual";
    note: string;
  };
}

export interface Paginated<T> {
  items: T[];
  nextCursor: string | null;
  total: number;
}

/** Error surfaced by the API client for any non-2xx response or transport failure. */
export class ApiError extends Error {
  constructor(
    message: string,
    readonly status: number,
    readonly code:
      | "network"
      | "timeout"
      | "not_found"
      | "server"
      | "bad_request"
      | "unknown" = "unknown",
  ) {
    super(message);
    this.name = "ApiError";
  }
}
