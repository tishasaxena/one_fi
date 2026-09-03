import { NextResponse } from "next/server";
import { PRODUCTS } from "@/data/products";
import { applyMockBehaviour, paginate, readScenario } from "@/lib/api/mock";
import type { ProductSummary } from "@/lib/types";

export const dynamic = "force-dynamic";

const DEFAULT_LIMIT = 8;
const MAX_LIMIT = 24;

function toSummary(): ProductSummary[] {
  return PRODUCTS.map((p) => ({
    id: p.id,
    slug: p.slug,
    name: p.name,
    brand: p.brand,
    categorySlug: p.categorySlug,
    tagline: p.tagline,
    image: p.image,
    startingPrice: Math.min(...p.variants.map((v) => v.price)),
    mrp: p.mrp,
    badges: p.badges,
    rating: p.rating,
    inStock: p.inStock,
  }));
}

export async function GET(request: Request) {
  const url = new URL(request.url);
  const scenario = readScenario(url);

  const errorResponse = await applyMockBehaviour(scenario);
  if (errorResponse) return errorResponse;

  const category = url.searchParams.get("category")?.trim().toLowerCase() ?? "";
  const q = url.searchParams.get("q")?.trim().toLowerCase() ?? "";
  const cursor = url.searchParams.get("cursor");
  const limit = clamp(Number(url.searchParams.get("limit")) || DEFAULT_LIMIT, 1, MAX_LIMIT);

  if (scenario === "empty") {
    return NextResponse.json(paginate<ProductSummary>([], null, limit));
  }

  let items = toSummary();

  if (category && category !== "all") {
    items = items.filter((p) => p.categorySlug === category);
  }

  if (q) {
    items = items.filter((p) =>
      `${p.name} ${p.brand} ${p.tagline}`.toLowerCase().includes(q),
    );
  }

  return NextResponse.json(paginate(items, cursor, limit));
}

function clamp(n: number, min: number, max: number) {
  return Math.min(max, Math.max(min, n));
}
