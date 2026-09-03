/** The three Shop options from the brief, in the order they appear. */
export const SHOP_SECTIONS = [
  { value: "top-brands", label: "Top Brands" },
  { value: "nearby-stores", label: "Nearby Stores" },
  { value: "marketplace", label: "1Fi Marketplace" },
] as const;

export type ShopSectionValue = (typeof SHOP_SECTIONS)[number]["value"];

/**
 * Default landing tab. The assignment's deliverable is 1Fi Marketplace, so a
 * reviewer opening /shop should see it immediately. Change to "top-brands" to
 * match the current app's ordering.
 */
export const DEFAULT_SHOP_SECTION: ShopSectionValue = "marketplace";

export function normalizeSection(value: string | undefined | null): ShopSectionValue {
  return SHOP_SECTIONS.some((s) => s.value === value)
    ? (value as ShopSectionValue)
    : DEFAULT_SHOP_SECTION;
}
