import { NextResponse } from "next/server";
import { sleep } from "@/lib/utils";
import type { Paginated } from "@/lib/types";

/**
 * Shared helpers for the mock Marketplace API (Next.js Route Handlers).
 *
 * These endpoints stand in for a real backend: they add realistic latency so
 * loading states are exercised, and honour a `?_scenario=` switch used by the
 * screenshots / manual QA to force slow, error and empty responses.
 */

const MIN_LATENCY = Number(process.env.MOCK_API_MIN_LATENCY_MS ?? 350);
const MAX_LATENCY = Number(process.env.MOCK_API_MAX_LATENCY_MS ?? 800);

export type MockScenario = "slow" | "error" | "empty" | null;

export function readScenario(url: URL): MockScenario {
  const value = url.searchParams.get("_scenario");
  return value === "slow" || value === "error" || value === "empty" ? value : null;
}

/**
 * Apply the shared latency + scenario behaviour. Returns an error `NextResponse`
 * when the scenario asks for one (caller should return it), otherwise resolves
 * after the artificial delay.
 */
export async function applyMockBehaviour(scenario: MockScenario): Promise<NextResponse | null> {
  if (scenario === "error") {
    await sleep(400);
    return jsonError(503, "The Marketplace is temporarily unavailable. Please try again.");
  }

  const base = MIN_LATENCY + Math.random() * Math.max(0, MAX_LATENCY - MIN_LATENCY);
  await sleep(scenario === "slow" ? base + 2600 : base);
  return null;
}

export function jsonError(status: number, message: string) {
  return NextResponse.json({ message }, { status });
}

/** Opaque cursor = base64 of the start index. */
export function paginate<T>(items: T[], cursor: string | null, limit: number): Paginated<T> {
  const start = decodeCursor(cursor);
  const page = items.slice(start, start + limit);
  const nextIndex = start + limit;
  return {
    items: page,
    total: items.length,
    nextCursor: nextIndex < items.length ? encodeCursor(nextIndex) : null,
  };
}

function encodeCursor(index: number): string {
  return Buffer.from(String(index)).toString("base64url");
}

function decodeCursor(cursor: string | null): number {
  if (!cursor) return 0;
  const parsed = Number(Buffer.from(cursor, "base64url").toString("utf8"));
  return Number.isInteger(parsed) && parsed >= 0 ? parsed : 0;
}
