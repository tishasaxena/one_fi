"use client";

import { useState, type ReactNode } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ApiError } from "@/lib/types";

/**
 * App-wide client providers. A single QueryClient instance per browser session
 * with sensible retry/refetch defaults for a mobile app.
 */
export function Providers({ children }: { children: ReactNode }) {
  const [client] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            // Don't hammer a 404 or a bad request; do retry transient failures.
            retry: (failureCount, error) => {
              if (error instanceof ApiError && ["not_found", "bad_request"].includes(error.code)) {
                return false;
              }
              return failureCount < 2;
            },
            retryDelay: (attempt) => Math.min(1000 * 2 ** attempt, 4000),
            refetchOnWindowFocus: false,
            staleTime: 30 * 1000,
          },
        },
      }),
  );

  return <QueryClientProvider client={client}>{children}</QueryClientProvider>;
}
