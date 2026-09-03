import { NextResponse } from "next/server";
import { CATEGORIES } from "@/data/categories";
import { applyMockBehaviour, readScenario } from "@/lib/api/mock";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  const url = new URL(request.url);
  const scenario = readScenario(url);

  const errorResponse = await applyMockBehaviour(scenario);
  if (errorResponse) return errorResponse;

  return NextResponse.json({ categories: CATEGORIES });
}
