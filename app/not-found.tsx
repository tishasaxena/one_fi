import Link from "next/link";
import { Compass } from "lucide-react";
import { Button } from "@/components/ui/button";
import { OneFiWordmark } from "@/components/app-shell/OneFiWordmark";

export default function NotFound() {
  return (
    <div className="mx-auto flex min-h-dvh w-full max-w-[440px] flex-col bg-background">
      <header className="flex h-14 items-center px-4">
        <OneFiWordmark showName />
      </header>

      <div className="flex flex-1 flex-col items-center justify-center gap-3 p-8 text-center">
        <div className="flex size-14 items-center justify-center rounded-2xl bg-primary-light text-primary">
          <Compass className="size-6" />
        </div>
        <p className="text-lg font-semibold tracking-tight">Page not found</p>
        <p className="max-w-[18rem] text-sm text-muted-foreground">
          That link doesn&apos;t lead anywhere in 1Fi. Let&apos;s get you back to shopping.
        </p>
        <Button asChild size="lg" className="mt-2">
          <Link href="/shop?section=marketplace">Go to 1Fi Marketplace</Link>
        </Button>
      </div>
    </div>
  );
}
