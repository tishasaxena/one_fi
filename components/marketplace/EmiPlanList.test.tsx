import { describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { EmiPlanList } from "@/components/marketplace/EmiPlanList";
import type { EmiPlan } from "@/lib/types";

function plan(overrides: Partial<EmiPlan>): EmiPlan {
  return {
    id: "m6",
    tenureMonths: 6,
    label: "6 months",
    annualRatePct: 0,
    monthlyAmount: 20000,
    totalPayable: 120000,
    interestComponent: 0,
    processingFee: 0,
    downPayment: 0,
    savingsVsUpfront: 8000,
    effectiveCost: 112000,
    recommended: false,
    ...overrides,
  };
}

const PLANS: EmiPlan[] = [
  plan({ id: "m3", tenureMonths: 3, label: "3 months", monthlyAmount: 40000, savingsVsUpfront: 4000 }),
  plan({ id: "m6", recommended: true }),
  plan({ id: "m12", tenureMonths: 12, label: "12 months", monthlyAmount: 10000, annualRatePct: 10 }),
];

describe("EmiPlanList", () => {
  it("renders every plan with its monthly figure", () => {
    render(<EmiPlanList plans={PLANS} value="m6" onChange={() => {}} />);
    expect(screen.getByText("3 months")).toBeInTheDocument();
    expect(screen.getByText("6 months")).toBeInTheDocument();
    expect(screen.getByText("₹10,000")).toBeInTheDocument();
  });

  it("marks the recommended plan and shows no-cost / interest copy", () => {
    render(<EmiPlanList plans={PLANS} value="m6" onChange={() => {}} />);
    expect(screen.getByText("Recommended")).toBeInTheDocument();
    expect(screen.getAllByText(/0% p\.a\./).length).toBeGreaterThan(0);
    expect(screen.getByText(/10% p\.a\./)).toBeInTheDocument();
  });

  it("calls onChange when another plan is picked", async () => {
    const onChange = vi.fn();
    render(<EmiPlanList plans={PLANS} value="m6" onChange={onChange} />);
    await userEvent.click(screen.getByRole("radio", { name: /3 months/i }));
    expect(onChange).toHaveBeenCalledWith("m3");
  });

  it("exposes the plans as a labelled radiogroup", () => {
    render(<EmiPlanList plans={PLANS} value="m6" onChange={() => {}} />);
    expect(screen.getByRole("radiogroup", { name: /select an emi plan/i })).toBeInTheDocument();
    expect(screen.getAllByRole("radio")).toHaveLength(3);
  });

  it("renders the assumptions note when provided", () => {
    render(
      <EmiPlanList plans={PLANS} value="m6" onChange={() => {}} note="Illustrative only." />,
    );
    expect(screen.getByText("Illustrative only.")).toBeInTheDocument();
  });
});
