import { ArrowRight } from "lucide-react";

/**
 * The Shop page's promo strip — a condensed version of the app's
 * "Shop today, Pay later using Mutual funds" banner.
 */
export function ShopBanner() {
  return (
    <div className="brand-gradient relative overflow-hidden rounded-2xl p-4 text-white">
      <div
        className="pointer-events-none absolute -right-6 -top-8 size-32 rounded-full bg-white/10"
        aria-hidden
      />
      <p className="relative text-[11px] font-semibold uppercase tracking-wider text-white/75">
        No-cost EMIs
      </p>
      <p className="relative mt-1 max-w-[16rem] text-lg font-semibold leading-snug tracking-tight">
        Shop today, pay later using your mutual funds
      </p>
      <p className="relative mt-2 inline-flex items-center gap-1 text-sm text-white/85">
        Your investments keep growing <ArrowRight className="size-3.5" />
      </p>
    </div>
  );
}
