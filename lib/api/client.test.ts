import { afterEach, describe, expect, it, vi } from "vitest";
import { apiFetch } from "@/lib/api/client";
import { ApiError } from "@/lib/types";

function mockFetch(impl: typeof fetch) {
  vi.stubGlobal("fetch", impl);
}

afterEach(() => {
  vi.unstubAllGlobals();
});

describe("apiFetch", () => {
  it("parses a JSON body on success", async () => {
    mockFetch(async () => new Response(JSON.stringify({ ok: 1 }), { status: 200 }));
    await expect(apiFetch<{ ok: number }>("/x")).resolves.toEqual({ ok: 1 });
  });

  it("maps 404 to a not_found ApiError with the server message", async () => {
    mockFetch(
      async () => new Response(JSON.stringify({ message: "no such thing" }), { status: 404 }),
    );
    await expect(apiFetch("/x")).rejects.toMatchObject({
      name: "ApiError",
      status: 404,
      code: "not_found",
      message: "no such thing",
    });
  });

  it("maps 5xx to a server ApiError", async () => {
    mockFetch(async () => new Response("", { status: 503 }));
    const err = await apiFetch("/x").catch((e: unknown) => e);
    expect(err).toBeInstanceOf(ApiError);
    expect((err as ApiError).code).toBe("server");
  });

  it("maps a transport failure to a network ApiError", async () => {
    mockFetch(async () => {
      throw new TypeError("Failed to fetch");
    });
    await expect(apiFetch("/x")).rejects.toMatchObject({ code: "network", status: 0 });
  });
});
