/** Indian-locale formatting helpers. */

const inr0 = new Intl.NumberFormat("en-IN", {
  style: "currency",
  currency: "INR",
  maximumFractionDigits: 0,
});

const inr2 = new Intl.NumberFormat("en-IN", {
  style: "currency",
  currency: "INR",
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});

/**
 * Format whole rupees with Indian digit grouping, e.g. 125900 -> "₹1,25,900".
 * Non-finite input formats as "₹0" so the UI never renders "₹NaN".
 */
export function formatINR(amount: number, opts?: { decimals?: boolean }): string {
  const value = Number.isFinite(amount) ? amount : 0;
  return (opts?.decimals ? inr2 : inr0).format(value);
}

/** "₹21,600/mo" — the per-month label used throughout the EMI UI. */
export function formatPerMonth(amount: number): string {
  return `${formatINR(amount)}/mo`;
}

/** "0%", "10%", "13.5%" */
export function formatPercent(pct: number): string {
  const value = Number.isFinite(pct) ? pct : 0;
  return `${Number.isInteger(value) ? value : value.toFixed(1)}%`;
}

/** "3 months", "1 month". */
export function formatTenure(months: number): string {
  return `${months} ${months === 1 ? "month" : "months"}`;
}

/** "7 Aug 2026" */
export function formatDate(date: Date): string {
  return date.toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" });
}

/** Compact spend figures for dense UI, e.g. 388122 -> "₹3.88L", 12500000 -> "₹1.25Cr". */
export function formatINRCompact(amount: number): string {
  const value = Number.isFinite(amount) ? amount : 0;
  if (Math.abs(value) >= 1_00_00_000) return `₹${(value / 1_00_00_000).toFixed(2)}Cr`;
  if (Math.abs(value) >= 1_00_000) return `₹${(value / 1_00_000).toFixed(2)}L`;
  if (Math.abs(value) >= 1_000) return `₹${(value / 1_000).toFixed(1)}K`;
  return formatINR(value);
}
