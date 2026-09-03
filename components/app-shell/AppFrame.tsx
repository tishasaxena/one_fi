import type { ReactNode } from "react";
import { ShieldCheck, Sparkles, TrendingUp } from "lucide-react";
import { OneFiWordmark } from "@/components/app-shell/OneFiWordmark";

/**
 * The 1Fi app runs as a phone-width column. On large screens the real app frames
 * that column with a purple-gradient brand panel — reproduced here.
 */
export function AppFrame({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-dvh w-full lg:flex lg:items-start">
      <aside className="brand-gradient relative hidden overflow-hidden text-white lg:sticky lg:top-0 lg:flex lg:h-dvh lg:flex-1 lg:flex-col lg:justify-between lg:p-14">
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.12]"
          style={{
            backgroundImage:
              "linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)",
            backgroundSize: "44px 44px",
          }}
          aria-hidden
        />
        <OneFiWordmark className="relative" tone="light" />

        <div className="relative max-w-md">
          <h1 className="text-[44px] font-semibold leading-[1.08] tracking-tight">
            Shop today <span className="font-normal italic opacity-90">pay later</span> using
            mutual&nbsp;funds.
          </h1>
          <p className="mt-4 text-white/70">
            No credit score required. No interest. Fully backed by your investments.
          </p>
        </div>

        <ul className="relative space-y-3 text-sm text-white/85">
          <li className="flex items-center gap-3">
            <Sparkles className="size-4" /> Genuine no-cost EMIs
          </li>
          <li className="flex items-center gap-3">
            <TrendingUp className="size-4" /> Your mutual funds stay invested
          </li>
          <li className="flex items-center gap-3">
            <ShieldCheck className="size-4" /> No processing or foreclosure charges
          </li>
        </ul>
      </aside>

      <div className="relative mx-auto flex min-h-dvh w-full max-w-[440px] flex-col bg-background lg:border-x lg:border-border">
        {children}
      </div>
    </div>
  );
}
