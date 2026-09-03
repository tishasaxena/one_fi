"use client";

import { useRouter } from "next/navigation";
import { ChevronLeft } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * Compact screen header: optional back chevron + title, matching "‹ Pay using
 * 1Fi" in the app. Sticks to the top of the app column.
 */
export function PageHeader({
  title,
  back = false,
  right,
  className,
}: {
  title: string;
  back?: boolean;
  right?: React.ReactNode;
  className?: string;
}) {
  const router = useRouter();

  return (
    <header
      className={cn(
        "sticky top-0 z-30 flex h-14 items-center gap-1 border-b border-border bg-card/95 px-2 backdrop-blur",
        className,
      )}
    >
      {back && (
        <button
          type="button"
          onClick={() => router.back()}
          aria-label="Go back"
          className="flex size-9 items-center justify-center rounded-full text-foreground hover:bg-muted"
        >
          <ChevronLeft className="size-5" />
        </button>
      )}
      <h1 className={cn("flex-1 truncate text-base font-semibold tracking-tight", !back && "px-2")}>
        {title}
      </h1>
      {right}
    </header>
  );
}
