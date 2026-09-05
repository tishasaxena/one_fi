import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, BadgeIndianRupee, Check, ShieldCheck, Sparkles, TrendingUp } from "lucide-react";
import { GradientHeader } from "@/components/app-shell/GradientHeader";
import { OneFiWordmark } from "@/components/app-shell/OneFiWordmark";
import { Button } from "@/components/ui/button";
import { NewBadge } from "@/components/ui/new-badge";
import { formatINR } from "@/lib/format";

export const metadata: Metadata = { title: "Home · 1Fi" };

const AVAILABLE_LIMIT = 156091;

const WHY = [
  { icon: BadgeIndianRupee, title: "0% interest", note: "Repay only what you buy" },
  { icon: TrendingUp, title: "Stay invested", note: "Funds keep compounding" },
  { icon: Sparkles, title: "Instant approval", note: "No credit score needed" },
  { icon: ShieldCheck, title: "No hidden fees", note: "No foreclosure charges" },
];

export default function DashboardPage() {
  return (
    <>
      <header className="flex h-14 items-center justify-between px-4">
        <OneFiWordmark />
        <span className="text-sm text-muted-foreground">Hi, Tisha</span>
      </header>

      <div className="flex-1 space-y-5 p-4 pt-0">
        <GradientHeader>
          <span className="inline-flex items-center gap-1 rounded-full bg-success px-2 py-0.5 text-[11px] font-semibold text-white">
            Limit available
          </span>
          <p className="mt-3 text-[11px] font-semibold uppercase tracking-wider text-white/70">
            Remaining to spend
          </p>
          <div className="mt-1 flex items-end justify-between">
            <p className="text-3xl font-bold tabular-nums">{formatINR(AVAILABLE_LIMIT)}</p>
            <p className="text-2xl font-semibold italic text-white/90">0% interest</p>
          </div>
          <Button
            asChild
            className="mt-4 bg-white text-primary hover:bg-white/90"
            size="md"
          >
            <Link href="/shop?section=marketplace">
              Shop now <ArrowRight className="size-4" />
            </Link>
          </Button>
        </GradientHeader>

        <section>
          <div className="mb-2 flex items-center justify-between">
            <h2 className="text-lg font-semibold tracking-tight">1Fi Marketplace</h2>
            <Link
              href="/shop?section=marketplace"
              className="flex items-center gap-1 text-sm font-medium text-primary"
            >
              Browse <ArrowRight className="size-3.5" />
            </Link>
          </div>
          <Link
            href="/shop?section=marketplace"
            className="relative flex items-center justify-between overflow-hidden rounded-2xl bg-ink p-4 text-white"
          >
            <div className="relative z-10 max-w-[60%]">
              <NewBadge light />
              <p className="mt-2 text-sm font-semibold leading-snug">
                Phones, laptops &amp; more on no-cost EMI
              </p>
              <p className="mt-2 flex items-center gap-1 text-xs text-white/70">
                <Check className="size-3.5 text-success" /> Starts at ₹2,000/mo
              </p>
            </div>
            <div className="absolute -right-4 top-1/2 size-28 -translate-y-1/2 opacity-90">
              <Image
                src="/products/macbook-pro-14-m5-1.svg"
                alt=""
                fill
                sizes="112px"
                className="object-contain drop-shadow-[0_8px_24px_rgba(0,0,0,0.45)]"
              />
            </div>
            <ArrowRight className="relative z-10 size-5 shrink-0 self-end" />
          </Link>
        </section>

        <section>
          <h2 className="mb-2 text-lg font-semibold tracking-tight">Why pay with 1Fi</h2>
          <ul className="grid grid-cols-2 gap-3">
            {WHY.map((item) => (
              <li
                key={item.title}
                className="rounded-2xl border border-border bg-card p-3 shadow-card"
              >
                <item.icon className="size-5 text-primary" />
                <p className="mt-2 text-sm font-semibold">{item.title}</p>
                <p className="text-xs text-muted-foreground">{item.note}</p>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </>
  );
}
