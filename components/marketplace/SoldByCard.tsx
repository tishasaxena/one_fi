import { Store } from "lucide-react";
import { SectionLabel } from "@/components/ui/section-label";

/** The Marketplace analogue of the app's "PAYING TO" block. */
export function SoldByCard({ soldBy }: { soldBy: { name: string; note?: string } }) {
  return (
    <section className="rounded-2xl border border-border bg-card p-4 shadow-card">
      <SectionLabel className="mb-2">Sold by</SectionLabel>
      <div className="flex items-center gap-3">
        <div className="flex size-10 items-center justify-center rounded-xl bg-primary-light text-primary">
          <Store className="size-5" />
        </div>
        <div className="min-w-0">
          <p className="text-sm font-semibold">{soldBy.name}</p>
          {soldBy.note && <p className="text-xs text-muted-foreground">{soldBy.note}</p>}
        </div>
      </div>
    </section>
  );
}
