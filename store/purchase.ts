"use client";

import { useEffect, useState } from "react";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import type { EmiPlan } from "@/lib/types";

/**
 * The checkout draft: a snapshot taken when the user taps "Continue" on the
 * product page. It is deliberately self-contained (denormalised product/variant
 * details + the chosen plan) so the review and success screens render without
 * re-fetching, and it survives a refresh via sessionStorage.
 *
 * Ephemeral product-page selection (which variant, what amount) lives in the URL
 * — this store only holds the *committed* choice.
 */
export interface PurchaseDraft {
  slug: string;
  productName: string;
  brand: string;
  image: string;
  variantId: string;
  variantLabel: string;
  variantSublabel?: string;
  amount: number;
  downPayment: number;
  plan: EmiPlan;
  soldBy: string;
  createdAt: number;
}

interface PurchaseState {
  draft: PurchaseDraft | null;
  setDraft: (draft: PurchaseDraft) => void;
  clear: () => void;
}

export const usePurchaseStore = create<PurchaseState>()(
  persist(
    (set) => ({
      draft: null,
      setDraft: (draft) => set({ draft }),
      clear: () => set({ draft: null }),
    }),
    {
      name: "onefi.purchase-draft",
      storage: createJSONStorage(() =>
        typeof window === "undefined" ? noopStorage : window.sessionStorage,
      ),
      skipHydration: true,
    },
  ),
);

const noopStorage = {
  getItem: () => null,
  setItem: () => {},
  removeItem: () => {},
};

/**
 * Read the draft on the client only after sessionStorage has been rehydrated,
 * so server and first client render agree (no hydration mismatch).
 */
export function useHydratedPurchaseDraft() {
  const [hydrated, setHydrated] = useState(false);
  const draft = usePurchaseStore((s) => s.draft);

  useEffect(() => {
    void usePurchaseStore.persist.rehydrate();
    setHydrated(true);
  }, []);

  return { draft: hydrated ? draft : null, hydrated };
}
