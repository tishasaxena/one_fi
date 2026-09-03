"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Store, Receipt, Wallet, User, type LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface NavItem {
  href: string;
  label: string;
  icon: LucideIcon;
  /** Extra path prefixes that should also light this tab. */
  match?: string[];
}

const ITEMS: NavItem[] = [
  { href: "/dashboard", label: "Home", icon: Home },
  { href: "/shop", label: "Shop", icon: Store, match: ["/shop"] },
  { href: "/emi-dues", label: "EMI Dues", icon: Receipt },
  { href: "/pledged-funds", label: "Limit", icon: Wallet },
  { href: "/profile", label: "Profile", icon: User },
];

/** Sub-flows (product detail, review, success) hide the tab bar, like the app. */
const HIDE_ON = ["/shop/marketplace/"];

export function BottomNav() {
  const pathname = usePathname();

  if (HIDE_ON.some((prefix) => pathname.startsWith(prefix))) {
    return null;
  }

  return (
    <nav
      aria-label="Primary"
      className="sticky bottom-0 z-40 mt-auto border-t border-border bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/80"
    >
      <ul className="mx-auto flex max-w-[440px] items-stretch justify-between px-2 pb-[max(0.5rem,env(safe-area-inset-bottom))] pt-2">
        {ITEMS.map((item) => {
          const active =
            pathname === item.href ||
            (item.match?.some((m) => pathname.startsWith(m)) ?? false);
          const Icon = item.icon;
          return (
            <li key={item.href} className="flex-1">
              <Link
                href={item.href}
                aria-current={active ? "page" : undefined}
                className={cn(
                  "flex flex-col items-center gap-1 rounded-lg py-1 text-[11px] font-medium transition-colors",
                  active ? "text-primary" : "text-muted-foreground hover:text-foreground",
                )}
              >
                <Icon className="size-5" strokeWidth={active ? 2.5 : 2} aria-hidden />
                <span className={cn(active && "font-semibold")}>{item.label}</span>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
