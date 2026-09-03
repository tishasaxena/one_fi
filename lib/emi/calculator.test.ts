import { describe, expect, it } from "vitest";
import {
  buildEmiPlanValues,
  buildEmiPlans,
  buildSchedule,
  futureValueAnnual,
  monthlyEMI,
} from "@/lib/emi/calculator";

describe("monthlyEMI", () => {
  it("splits evenly at 0% interest", () => {
    expect(monthlyEMI(120000, 12, 0)).toBe(10000);
    expect(monthlyEMI(125900, 6, 0)).toBeCloseTo(20983.33, 2);
  });

  it("adds interest with the reducing-balance formula", () => {
    // 100000 over 12 months at 12% p.a. ≈ 8884.88/mo
    expect(monthlyEMI(100000, 12, 12)).toBeCloseTo(8884.88, 1);
  });

  it("returns 0 for degenerate inputs", () => {
    expect(monthlyEMI(0, 12, 0)).toBe(0);
    expect(monthlyEMI(100000, 0, 0)).toBe(0);
    expect(monthlyEMI(-5, 12, 0)).toBe(0);
    expect(monthlyEMI(Number.NaN, 12, 0)).toBe(0);
  });
});

describe("futureValueAnnual", () => {
  it("compounds annually, matching 1Fi's calculator example", () => {
    // 120000 at 16% for 2 years -> 161472 (gain 41472)
    expect(futureValueAnnual(120000, 16, 2)).toBeCloseTo(161472, 0);
  });

  it("handles fractional years", () => {
    expect(futureValueAnnual(100000, 13, 0.5)).toBeCloseTo(100000 * Math.pow(1.13, 0.5), 4);
  });

  it("returns the principal when years or principal are non-positive", () => {
    expect(futureValueAnnual(100000, 13, 0)).toBe(100000);
    expect(futureValueAnnual(0, 13, 5)).toBe(0);
  });
});

describe("buildEmiPlanValues", () => {
  it("computes a no-cost plan with positive savings", () => {
    const p = buildEmiPlanValues({
      amount: 120000,
      tenureMonths: 12,
      annualRatePct: 0,
      expectedReturnPct: 13,
    });
    expect(p.monthlyAmount).toBe(10000);
    expect(p.interestComponent).toBe(0);
    expect(p.totalPayable).toBe(120000);
    expect(p.savingsVsUpfront).toBeGreaterThan(0);
    expect(p.effectiveCost).toBe(120000 - p.savingsVsUpfront);
  });

  it("clamps a down payment to the purchase amount", () => {
    const p = buildEmiPlanValues({
      amount: 50000,
      tenureMonths: 6,
      annualRatePct: 0,
      downPayment: 999999,
    });
    expect(p.downPayment).toBe(50000);
    expect(p.monthlyAmount).toBe(0);
    expect(p.totalPayable).toBe(50000);
  });

  it("reflects interest cost in savings for a short interest-bearing plan", () => {
    const noCost = buildEmiPlanValues({ amount: 200000, tenureMonths: 24, annualRatePct: 0 });
    const withInterest = buildEmiPlanValues({ amount: 200000, tenureMonths: 3, annualRatePct: 15 });
    expect(withInterest.interestComponent).toBeGreaterThan(0);
    expect(withInterest.savingsVsUpfront).toBeLessThan(noCost.savingsVsUpfront);
  });

  it("is safe for a zero amount", () => {
    const p = buildEmiPlanValues({ amount: 0, tenureMonths: 12, annualRatePct: 0 });
    expect(p).toMatchObject({ monthlyAmount: 0, totalPayable: 0, savingsVsUpfront: 0 });
  });
});

describe("buildEmiPlans", () => {
  const configs = [
    { tenureMonths: 3, annualRatePct: 0 },
    { tenureMonths: 6, annualRatePct: 0 },
    { tenureMonths: 12, annualRatePct: 0 },
    { tenureMonths: 24, annualRatePct: 0 },
  ];

  it("returns one plan per config, sorted by tenure", () => {
    const plans = buildEmiPlans(120000, configs);
    expect(plans.map((p) => p.tenureMonths)).toEqual([3, 6, 12, 24]);
  });

  it("marks exactly one plan recommended = the highest savings", () => {
    const plans = buildEmiPlans(120000, configs);
    const recommended = plans.filter((p) => p.recommended);
    expect(recommended).toHaveLength(1);
    const maxSavings = Math.max(...plans.map((p) => p.savingsVsUpfront));
    expect(recommended[0]?.savingsVsUpfront).toBe(maxSavings);
  });

  it("breaks ties toward the shorter tenure", () => {
    // Two configs that produce identical savings (0 amount => all zeros).
    const plans = buildEmiPlans(0, [
      { tenureMonths: 6, annualRatePct: 0 },
      { tenureMonths: 12, annualRatePct: 0 },
    ]);
    expect(plans.find((p) => p.recommended)?.tenureMonths).toBe(6);
  });
});

describe("buildSchedule", () => {
  it("produces one dated row per month", () => {
    const start = new Date("2026-01-15T00:00:00Z");
    const rows = buildSchedule(10000, 3, start);
    expect(rows).toHaveLength(3);
    expect(rows[0]?.installmentNo).toBe(1);
    expect(rows[0]?.dueDate.getMonth()).toBe(1); // February
    expect(rows[2]?.dueDate.getMonth()).toBe(3); // April
    expect(rows.every((r) => r.amount === 10000)).toBe(true);
  });
});
