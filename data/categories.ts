import type { Category } from "@/lib/types";

/**
 * Marketplace categories. `icon` is a lucide-react component name resolved by
 * <CategoryFilter />.
 */
export const CATEGORIES: Category[] = [
  { id: "cat_all", slug: "all", name: "All", icon: "LayoutGrid" },
  { id: "cat_smartphones", slug: "smartphones", name: "Smartphones", icon: "Smartphone" },
  { id: "cat_laptops", slug: "laptops", name: "Laptops", icon: "Laptop" },
  { id: "cat_audio", slug: "audio", name: "Audio", icon: "Headphones" },
  { id: "cat_wearables", slug: "wearables", name: "Wearables", icon: "Watch" },
  { id: "cat_bikes", slug: "bikes", name: "Bikes", icon: "Bike" },
];

export const CATEGORY_SLUGS = CATEGORIES.map((c) => c.slug);
