import { Star } from "lucide-react";
import type { ProductRating } from "@/lib/types";

export function Rating({ rating }: { rating: ProductRating }) {
  return (
    <span className="inline-flex items-center gap-1 text-xs text-muted-foreground">
      <Star className="size-3.5 fill-amber-400 text-amber-400" aria-hidden />
      <span className="font-semibold text-foreground">{rating.value.toFixed(1)}</span>
      <span>({rating.count.toLocaleString("en-IN")})</span>
    </span>
  );
}
