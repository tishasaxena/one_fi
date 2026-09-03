/**
 * Assumptions behind the EMI/savings maths.
 *
 * 1Fi's pitch is that your pledged mutual funds stay invested while you repay, so
 * the "real" cost of an EMI is the sticker price minus the growth those funds are
 * expected to deliver over the loan term (less any interest/fees). We use a
 * deliberately conservative expected return; 1Fi's own marketing quotes higher.
 */
export const EXPECTED_MF_RETURN_PCT = 13;

/** No processing fee, matching 1Fi's "zero extra charges" promise. */
export const DEFAULT_PROCESSING_FEE = 0;

/** Tenures offered when a product doesn't specify its own. */
export const DEFAULT_PLAN_CONFIGS = [
  { tenureMonths: 3, annualRatePct: 0 },
  { tenureMonths: 6, annualRatePct: 0 },
  { tenureMonths: 9, annualRatePct: 0 },
  { tenureMonths: 12, annualRatePct: 0 },
  { tenureMonths: 18, annualRatePct: 0 },
  { tenureMonths: 24, annualRatePct: 0 },
] as const;

export const EMI_ASSUMPTIONS_NOTE =
  "Illustrative only. Assumes your pledged mutual funds continue to grow at ~13% p.a. " +
  "(annual compounding) while you repay. Actual returns vary and are not guaranteed. " +
  "Not investment advice.";
