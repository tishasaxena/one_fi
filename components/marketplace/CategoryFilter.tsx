"use client";

import {
  Bike,
  Headphones,
  LayoutGrid,
  Laptop,
  Smartphone,
  Tag,
  Watch,
  type LucideIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Skeleton } from "@/components/ui/skeleton";
import type { Category } from "@/lib/types";

/** Only the icons the catalogue actually uses, so lucide tree-shakes. */
const ICONS: Record<string, LucideIcon> = {
  LayoutGrid,
  Smartphone,
  Laptop,
  Headphones,
  Watch,
  Bike,
};

/** Horizontally scrollable category chips. */
export function CategoryFilter({
  categories,
  value,
  onChange,
}: {
  categories: Category[];
  value: string;
  onChange: (slug: string) => void;
}) {
  return (
    <div className="no-scrollbar -mx-4 flex gap-2 overflow-x-auto px-4">
      {categories.map((category) => {
        const active = category.slug === value;
        const Icon = ICONS[category.icon] ?? Tag;
        return (
          <button
            key={category.id}
            type="button"
            onClick={() => onChange(category.slug)}
            aria-pressed={active}
            className={cn(
              "flex shrink-0 items-center gap-1.5 rounded-full border px-3.5 py-2 text-sm font-medium transition-colors",
              active
                ? "border-ink bg-ink text-ink-foreground"
                : "border-border bg-card text-muted-foreground hover:text-foreground",
            )}
          >
            <Icon className="size-4" aria-hidden />
            {category.name}
          </button>
        );
      })}
    </div>
  );
}

export function CategoryFilterSkeleton() {
  return (
    <div className="-mx-4 flex gap-2 overflow-hidden px-4" aria-hidden>
      {[64, 108, 92, 84, 96].map((w, i) => (
        <Skeleton key={i} className="h-9 shrink-0 rounded-full" style={{ width: w }} />
      ))}
    </div>
  );
}
