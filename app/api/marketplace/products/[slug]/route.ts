import { NextResponse } from "next/server";
import { PRODUCTS_BY_SLUG } from "@/data/products";
import { applyMockBehaviour, jsonError, readScenario } from "@/lib/api/mock";

export const dynamic = "force-dynamic";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ slug: string }> },
) {
  const { slug } = await params;
  const url = new URL(request.url);
  const scenario = readScenario(url);

  const errorResponse = await applyMockBehaviour(scenario);
  if (errorResponse) return errorResponse;

  const product = PRODUCTS_BY_SLUG.get(slug);
  if (!product) {
    return jsonError(404, `No product found for "${slug}".`);
  }

  return NextResponse.json({ product });
}
