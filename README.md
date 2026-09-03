# 1Fi Marketplace

A new **1Fi Marketplace** section built inside the 1Fi app's **Shop** experience — SDE intern
assignment.

The Shop page now offers three options: **Top Brands**, **Nearby Stores** (both intentionally
blank, per the brief) and **1Fi Marketplace**, which is fully implemented: browse products, pick a
variant, choose a no‑cost EMI plan, and proceed through review to a confirmed order.

```bash
npm install
npm run dev            # http://localhost:3000  → redirects to /shop
```

`npm test` · `npm run build` · `npm run typecheck` · `npm run lint` all pass.

---

## Matching the existing 1Fi app

There was no starter repo and the brief ships no reference screens, so the design was reverse‑
engineered from the live product:

- The **1Fi Android app** (`in.onefi.app`) is a **Trusted Web Activity wrapper** of the
  `app.1fi.in` PWA — confirmed by `app.1fi.in/.well-known/assetlinks.json`, which delegates
  `handle_all_urls` to the Android package. So "use the existing tech stack" points at the web app.
- That web app is **Next.js 15 (App Router) · Tailwind CSS v4 · shadcn/ui tokens · Geist font**,
  brand purple `#712CDC`, `#f6f6f6` canvas, `0.625rem` base radius. Those exact token names/values
  live in [`app/globals.css`](app/globals.css).
- The app renders as a **phone‑width column**; on desktop it's framed by a purple‑gradient brand
  panel ([`components/app-shell/AppFrame.tsx`](components/app-shell/AppFrame.tsx)), like the real
  login screen.
- Bottom nav — **Home · Shop · EMI Dues · Limit · Profile** — mirrors the app's routes
  (`/dashboard`, `/shop`, `/emi-dues`, `/pledged-funds`, `/profile`).
- The product screen is modelled directly on the app's **"Pay using 1Fi"** screen: brand pill on a
  white image card, an uppercase `SELECT YOUR VARIANT` radio list (purple ring + tint when
  selected), a `SUGGESTED AMOUNT` block with expandable EMI plan rows, a `SOLD BY` block, and a
  fixed bottom bar with a circular share button + a full‑width **Continue** pill.

Home / EMI Dues / Limit / Profile are branded placeholders — the assignment is scoped to Shop →
Marketplace, and these exist so navigation and the shell feel complete.

---

## Architecture

```
app/
  (app)/                         route group — AppFrame + BottomNav
    dashboard, emi-dues,          nav destinations (Home is medium-fidelity; rest are placeholders)
    pledged-funds, profile
    shop/
      page.tsx                    banner + segmented control (?section=)
      marketplace/[slug]/         product detail  →  /review  →  /review/success
  api/marketplace/                mock API (Route Handlers)
    categories · products · products/[slug] · emi-plans
components/
  ui/                             shadcn-style primitives (button, card, radio-group, accordion, sheet, …)
  app-shell/ · shop/ · marketplace/ · review/
lib/
  api/         client.ts (typed fetch → ApiError) · marketplace.ts (endpoint fns) · mock.ts
  emi/         calculator.ts (pure) · config.ts
  format.ts · types.ts · query-keys.ts · share.ts
hooks/         useCategories · useProducts (infinite) · useProduct · useEmiPlans
store/         purchase.ts — Zustand checkout draft (sessionStorage)
data/          products.ts · categories.ts — the mock catalogue (single source of truth)
scripts/       gen-placeholders.mjs — generates the on-brand SVG product images
```

### Data & APIs

- **No hardcoded data in components.** Everything flows through the mock API in
  `app/api/marketplace/*` (Next.js Route Handlers reading [`data/`](data)), then a typed client
  ([`lib/api/client.ts`](lib/api/client.ts) → [`lib/api/marketplace.ts`](lib/api/marketplace.ts)),
  then **TanStack Query** hooks.
- The client normalises every failure to a single `ApiError` type; React Query adds retry with
  backoff (but not for `404` / `400`).
- The listing uses `useInfiniteQuery` (cursor pagination + "Load more").
- The mock API adds **realistic latency** (350–800 ms, tunable via `.env`) so loading states are
  real, and supports a **scenario switch** for QA: append `?_scenario=slow|error|empty` to any page
  and it's forwarded to the API.
- Swapping in a real backend is a two-line change: set `NEXT_PUBLIC_API_BASE_URL` and delete the
  Route Handlers. Product imagery is already URL-based in the data model.

### State management

| State | Where | Why |
|---|---|---|
| Server data (products, product, EMI plans) | **TanStack Query** | caching, `isLoading`/`isError`/`refetch`, pagination |
| Product-page selection (variant, amount, tenure) | **URL search params** | shareable deep links, back-button, survives refresh |
| Committed checkout draft (snapshot on "Continue") | **Zustand** + `sessionStorage` | read by `/review` + `/review/success` without re-fetching; survives refresh |
| Pure UI (accordions, gallery index, sheets) | local `useState` | — |

### EMI model

[`lib/emi/calculator.ts`](lib/emi/calculator.ts) is pure and unit-tested. Plans are computed
**server-side** in the `emi-plans` route (single source of truth) and the same module recomputes
instantly on the client when the amount/variant changes.

- `monthlyEMI` — reducing-balance formula; `principal / months` at 0%.
- **Savings vs paying upfront** mirrors 1Fi's own calculator: the financed amount is assumed to keep
  growing in your pledged mutual funds at ~13% p.a. (annual compounding) for the tenure; savings =
  that growth − interest − fees. Verified against 1Fi's published example
  (₹1,20,000 @ 16% for 2y → +₹41,472).
- Real 1Fi plans carry per-tenure APRs (the app showed 10% p.a. on some), so `annualRatePct` is
  per-plan and the `0% interest` badge only shows when it's genuinely zero.
- **Recommended** = the *no-cost* plan with the greatest savings (more money stays invested, at zero
  interest cost); interest-bearing plans are only recommended if there's no 0% option. Ties break
  toward the shorter tenure.
- Assumptions are surfaced in the UI and labelled *illustrative, not investment advice*.

---

## Product / functionality

- **Listing** — search (debounced), category chips, infinite scroll, `from ₹X/mo` per card.
- **Product detail** — image gallery, variants (price + MRP strike, out-of-stock disabled), editable
  amount (bottom sheet), expandable EMI plans with per-plan savings + a recommendation, product
  details accordion (highlights / overview / specs / EMI terms), `Sold by`, sticky Continue bar,
  Web Share.
- **Review** — order summary, full plan breakdown (first/last EMI dates, totals, interest, savings,
  effective cost), delivery stub, `Confirm & pledge funds`.
- **Success** — confirmation + "what happens next", clears the draft on exit.
- **States everywhere** — skeletons, error + retry, empty search, product-not-found, out-of-stock.
- **Responsive** — mobile-first; desktop gets the 1Fi brand frame. Verified 360 / 390 / 768 / 1280.
- **Accessible** — Radix radio-group / accordion / dialog, labelled controls, visible focus rings,
  `aria-current` nav, image `alt`, reduced-motion support.

---

## Testing

`npm test` — 30 tests (Vitest + Testing Library):

- `lib/emi/calculator.test.ts` — EMI/FV maths, savings sign, recommendation, edge cases.
- `lib/format.test.ts` — en-IN currency grouping, NaN safety.
- `lib/api/client.test.ts` — error mapping (404 / 5xx / network).
- `components/marketplace/EmiPlanList.test.tsx` — renders plans, selection, recommended badge, a11y.

---

## Assumptions & scope

- Built as a **Next.js web app** to match the live 1Fi PWA/TWA stack (not React Native).
- Top Brands / Nearby Stores stay blank beyond a "coming soon" placeholder, per the brief.
- Product data, imagery and EMI APRs are **mock** — imagery is generated on-brand SVG
  (`npm run gen:placeholders`); the data model carries real URLs for a CDN swap.
- The Shop landing defaults to the **1Fi Marketplace** tab so the built feature is visible
  immediately; one line in [`components/shop/sections.ts`](components/shop/sections.ts) changes it.
- Auth, real pledging/lending, payments and the other four tabs are out of scope.

### If taken further

Server-side prefetch + `HydrationBoundary` for the product page, virtualised listing, real image
CDN, analytics events, e2e tests (Playwright), and porting the component layer to React Native if
the native app ever moves off the TWA.
