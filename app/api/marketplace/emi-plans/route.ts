import { NextResponse } from "next/server";
import { PRODUCTS_BY_SLUG } from "@/data/products";
import { buildEmiPlans } from "@/lib/emi/calculator";
import {
  DEFAULT_PLAN_CONFIGS,
  EMI_ASSUMPTIONS_NOTE,
  EXPECTED_MF_RETURN_PCT,
} from "@/lib/emi/config";
import { applyMockBehaviour, jsonError, readScenario } from "@/lib/api/mock";
import type { EmiPlansResponse } from "@/lib/types";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  const url = new URL(request.url);
  const scenario = readScenario(url);

  const errorResponse = await applyMockBehaviour(scenario);
  if (errorResponse) return errorResponse;

  const amount = Number(url.searchParams.get("amount"));
  if (!Number.isFinite(amount) || amount <= 0) {
    return jsonError(400, "A positive `amount` query parameter is required.");
  }

  const slug = url.searchParams.get("slug");
  const downPayment = Math.max(0, Number(url.searchParams.get("downPayment")) || 0);

  const product = slug ? PRODUCTS_BY_SLUG.get(slug) : undefined;
  const planConfigs = product?.planConfigs ?? DEFAULT_PLAN_CONFIGS;

  const plans = buildEmiPlans(amount, planConfigs, {
    downPayment,
    expectedReturnPct: EXPECTED_MF_RETURN_PCT,
  });

  const body: EmiPlansResponse = {
    amount,
    plans,
    assumptions: {
      expectedReturnPct: EXPECTED_MF_RETURN_PCT,
      compounding: "annual",
      note: EMI_ASSUMPTIONS_NOTE,
    },
  };

  return NextResponse.json(body);
}
