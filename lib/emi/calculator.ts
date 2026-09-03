import type { EmiPlan, PlanConfig } from "@/lib/types";
import { DEFAULT_PROCESSING_FEE, EXPECTED_MF_RETURN_PCT } from "@/lib/emi/config";
import { formatTenure } from "@/lib/format";

/**
 * Pure EMI / savings maths. No React, no I/O — safe to run on the server (the
 * mock API uses it) and on the client (instant recompute when the amount or
 * variant changes).
 */

const round = (n: number) => Math.round(n);

/**
 * Monthly instalment for a reducing-balance loan.
 *
 *   E = P · r · (1 + r)^n / ((1 + r)^n − 1)
 *
 * where r is the monthly rate and n the number of months. At r = 0 this reduces
 * to P / n (a genuine no-cost EMI).
 */
export function monthlyEMI(principal: number, months: number, annualRatePct: number): number {
  if (!Number.isFinite(principal) || principal <= 0) return 0;
  if (!Number.isFinite(months) || months <= 0) return 0;

  const r = Math.max(0, annualRatePct) / 100 / 12;
  if (r === 0) return principal / months;

  const factor = Math.pow(1 + r, months);
  return (principal * r * factor) / (factor - 1);
}

/**
 * Future value of a lump sum with annual compounding. `years` may be fractional.
 *
 *   FV = P · (1 + i)^years
 */
export function futureValueAnnual(
  principal: number,
  annualReturnPct: number,
  years: number,
): number {
  if (!Number.isFinite(principal) || principal <= 0) return 0;
  if (!Number.isFinite(years) || years <= 0) return principal;

  const i = Math.max(0, annualReturnPct) / 100;
  return principal * Math.pow(1 + i, years);
}

export interface BuildEmiPlanInput {
  /** Purchase amount, in whole rupees. */
  amount: number;
  tenureMonths: number;
  annualRatePct: number;
  downPayment?: number;
  /** Expected MF return used for the savings comparison. */
  expectedReturnPct?: number;
  processingFee?: number;
}

/**
 * Build a single EMI plan: instalment, totals and the "you save vs paying
 * upfront" figure.
 *
 * The savings model mirrors 1Fi's own calculator: the amount you *don't* pay
 * upfront stays invested and is assumed to grow at `expectedReturnPct` for the
 * loan term; savings = that growth − interest − fees. It can be negative when a
 * plan carries interest and the term is short.
 */
export function buildEmiPlanValues(input: BuildEmiPlanInput) {
  const amount = Math.max(0, Math.round(input.amount) || 0);
  const tenureMonths = Math.max(0, Math.round(input.tenureMonths) || 0);
  const annualRatePct = Math.max(0, input.annualRatePct || 0);
  const downPayment = Math.min(amount, Math.max(0, Math.round(input.downPayment ?? 0)));
  const expectedReturnPct = input.expectedReturnPct ?? EXPECTED_MF_RETURN_PCT;
  const processingFee = Math.max(0, input.processingFee ?? DEFAULT_PROCESSING_FEE);

  const financed = amount - downPayment;

  const rawMonthly = monthlyEMI(financed, tenureMonths, annualRatePct);
  const monthlyAmount = round(rawMonthly);

  // For a genuine no-cost EMI you repay exactly the price; for interest-bearing
  // plans the total is the sum of instalments (the last one absorbs rounding).
  const totalPayable =
    annualRatePct === 0 ? amount : monthlyAmount * tenureMonths + downPayment;

  const interestComponent = Math.max(0, round(rawMonthly * tenureMonths - financed));

  const mfGain =
    futureValueAnnual(financed, expectedReturnPct, tenureMonths / 12) - financed;
  const savingsVsUpfront = round(mfGain - interestComponent - processingFee);
  const effectiveCost = amount - savingsVsUpfront;

  return {
    amount,
    tenureMonths,
    annualRatePct,
    downPayment,
    monthlyAmount,
    totalPayable,
    interestComponent,
    processingFee,
    savingsVsUpfront,
    effectiveCost,
  };
}

/**
 * Build every plan offered for an amount and pick a recommendation.
 *
 * Recommended = the plan with the highest `savingsVsUpfront`; ties break toward
 * the shorter tenure (less commitment for the same benefit).
 */
export function buildEmiPlans(
  amount: number,
  planConfigs: readonly PlanConfig[],
  opts: { downPayment?: number; expectedReturnPct?: number; processingFee?: number } = {},
): EmiPlan[] {
  const sorted = [...planConfigs].sort((a, b) => a.tenureMonths - b.tenureMonths);

  const plans: EmiPlan[] = sorted.map((config) => {
    const values = buildEmiPlanValues({
      amount,
      tenureMonths: config.tenureMonths,
      annualRatePct: config.annualRatePct,
      ...opts,
    });

    return {
      id: `m${config.tenureMonths}`,
      label: formatTenure(config.tenureMonths),
      recommended: false,
      ...values,
    };
  });

  // Recommend the no-cost plan with the greatest savings (more of your money
  // stays invested, at zero interest cost). Only fall back to interest-bearing
  // plans when there is no 0% option. Ties break toward the shorter tenure,
  // since `plans` is sorted ascending and we use a strict `>`.
  const noCost = plans.filter((p) => p.annualRatePct === 0);
  const pool = noCost.length > 0 ? noCost : plans;

  let best: EmiPlan | undefined;
  for (const plan of pool) {
    if (!best || plan.savingsVsUpfront > best.savingsVsUpfront) {
      best = plan;
    }
  }
  if (best) best.recommended = true;

  return plans;
}

/** Repayment schedule preview for the review screen. */
export function buildSchedule(
  monthlyAmount: number,
  tenureMonths: number,
  startDate: Date = new Date(),
): { installmentNo: number; dueDate: Date; amount: number }[] {
  const rows: { installmentNo: number; dueDate: Date; amount: number }[] = [];
  for (let i = 1; i <= tenureMonths; i++) {
    const dueDate = new Date(startDate);
    dueDate.setMonth(dueDate.getMonth() + i);
    rows.push({ installmentNo: i, dueDate, amount: monthlyAmount });
  }
  return rows;
}
