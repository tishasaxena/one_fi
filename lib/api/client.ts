import { ApiError } from "@/lib/types";

/**
 * Base URL for the Marketplace API. Defaults to same-origin (the Next.js Route
 * Handlers under /api/marketplace) so nothing needs configuring for local dev.
 */
const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL?.replace(/\/$/, "") ?? "";

const DEFAULT_TIMEOUT_MS = 12_000;

function toApiError(status: number, body: unknown): ApiError {
  const message =
    (body && typeof body === "object" && "message" in body && typeof body.message === "string"
      ? body.message
      : null) ?? `Request failed (${status})`;

  if (status === 404) return new ApiError(message, 404, "not_found");
  if (status === 400) return new ApiError(message, 400, "bad_request");
  if (status >= 500) return new ApiError(message, status, "server");
  return new ApiError(message, status, "unknown");
}

/**
 * Typed fetch wrapper. Every non-2xx response and every transport failure is
 * normalised to an `ApiError`, so callers (and React Query) get one error type.
 */
export async function apiFetch<T>(
  path: string,
  init?: RequestInit & { timeoutMs?: number },
): Promise<T> {
  const url = path.startsWith("http") ? path : `${BASE_URL}${path}`;
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), init?.timeoutMs ?? DEFAULT_TIMEOUT_MS);

  let response: Response;
  try {
    response = await fetch(url, {
      ...init,
      signal: controller.signal,
      headers: { Accept: "application/json", ...init?.headers },
    });
  } catch (err) {
    clearTimeout(timeout);
    if (err instanceof DOMException && err.name === "AbortError") {
      throw new ApiError("The request timed out. Please try again.", 0, "timeout");
    }
    throw new ApiError("Couldn't reach the server. Check your connection.", 0, "network");
  }
  clearTimeout(timeout);

  const raw = await response.text();
  const parsed = raw ? safeJsonParse(raw) : null;

  if (!response.ok) {
    throw toApiError(response.status, parsed);
  }

  return parsed as T;
}

function safeJsonParse(text: string): unknown {
  try {
    return JSON.parse(text);
  } catch {
    return null;
  }
}
