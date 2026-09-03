import type { LucideIcon } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { PageHeader } from "@/components/app-shell/PageHeader";

/**
 * The 1Fi app has five bottom-nav destinations. This assignment only builds out
 * Shop → 1Fi Marketplace; the others are represented by a branded placeholder so
 * navigation works and the shell feels complete.
 */
export function PlaceholderScreen({
  title,
  icon: Icon,
  blurb,
}: {
  title: string;
  icon: LucideIcon;
  blurb: string;
}) {
  return (
    <>
      <PageHeader title={title} />
      <div className="flex flex-1 flex-col items-center justify-center gap-3 p-8 text-center">
        <div className="flex size-14 items-center justify-center rounded-2xl bg-primary-light text-primary">
          <Icon className="size-6" />
        </div>
        <p className="text-base font-semibold tracking-tight">{title}</p>
        <p className="max-w-[18rem] text-sm text-muted-foreground">{blurb}</p>
        <span className="rounded-full bg-muted px-3 py-1 text-xs font-medium text-muted-foreground">
          Outside this assignment&apos;s scope
        </span>
        <Button asChild variant="outline" size="sm" className="mt-2">
          <Link href="/shop?section=marketplace">Go to 1Fi Marketplace</Link>
        </Button>
      </div>
    </>
  );
}
