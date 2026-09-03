import { describe, expect, it } from "vitest";
import {
  formatINR,
  formatINRCompact,
  formatPercent,
  formatPerMonth,
  formatTenure,
} from "@/lib/format";

describe("formatINR", () => {
  it("uses Indian digit grouping", () => {
    expect(formatINR(125900)).toBe("₹1,25,900");
    expect(formatINR(1000)).toBe("₹1,000");
    expect(formatINR(10000000)).toBe("₹1,00,00,000");
  });

  it("rounds to whole rupees by default and supports paise", () => {
    expect(formatINR(20983.33)).toBe("₹20,983");
    expect(formatINR(20983.5, { decimals: true })).toBe("₹20,983.50");
  });

  it("never renders NaN", () => {
    expect(formatINR(Number.NaN)).toBe("₹0");
    expect(formatINR(Infinity)).toBe("₹0");
  });
});

describe("other formatters", () => {
  it("formatPerMonth appends /mo", () => {
    expect(formatPerMonth(21600)).toBe("₹21,600/mo");
  });

  it("formatPercent keeps integers clean and trims decimals", () => {
    expect(formatPercent(0)).toBe("0%");
    expect(formatPercent(10)).toBe("10%");
    expect(formatPercent(12.5)).toBe("12.5%");
  });

  it("formatTenure pluralises", () => {
    expect(formatTenure(1)).toBe("1 month");
    expect(formatTenure(6)).toBe("6 months");
  });

  it("formatINRCompact abbreviates lakhs and crores", () => {
    expect(formatINRCompact(388122)).toBe("₹3.88L");
    expect(formatINRCompact(12500000)).toBe("₹1.25Cr");
    expect(formatINRCompact(950)).toBe("₹950");
  });
});
