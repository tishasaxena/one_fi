import Image from "next/image";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Money } from "@/components/ui/money";
import { formatINR } from "@/lib/format";
import type { ProductSummary } from "@/lib/types";

/** Tenure used for the indicative "from ₹X/mo" on cards (1Fi: 0% up to 24 months). */
const INDICATIVE_TENURE = 24;

export function ProductCard({
  product,
  index = 0,
}: {
  product: ProductSummary;
  /** Position in the grid — staggers the entrance animation. */
  index?: number;
}) {
  const perMonth = Math.round(product.startingPrice / INDICATIVE_TENURE);
  const hasNoCost = product.badges.some((b) => b.toLowerCase().startsWith("0% interest"));

  return (
    <Link
      href={`/shop/marketplace/${product.slug}`}
      style={{ animationDelay: `${Math.min(index, 8) * 40}ms` }}
      className="group flex animate-[fade-in-up_0.35s_ease-out_backwards] flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-card transition-shadow hover:shadow-pop active:scale-[0.98]"
    >
      <div className="relative aspect-square overflow-hidden bg-muted/40">
        <Image
          src={product.image}
          alt={product.name}
          fill
          sizes="(max-width: 440px) 45vw, 200px"
          className="object-cover transition-transform duration-300 group-hover:scale-105"
        />
        {!product.inStock && (
          <span className="absolute left-2 top-2 rounded-full bg-ink/80 px-2 py-1 text-[11px] font-semibold text-white">
            Out of stock
          </span>
        )}
      </div>

      <div className="flex flex-1 flex-col gap-1 p-3">
        <p className="text-[11px] font-medium uppercase tracking-wide text-muted-foreground">
          {product.brand}
        </p>
        <p className="line-clamp-2 text-sm font-semibold leading-snug">{product.name}</p>

        <div className="mt-auto pt-2">
          <p className="text-sm font-bold tabular-nums">
            {formatINR(perMonth)}
            <span className="ml-1 text-xs font-normal text-muted-foreground">/mo</span>
          </p>
          <p className="text-xs text-muted-foreground">
            <Money amount={product.startingPrice} /> total
          </p>
        </div>

        {hasNoCost && (
          <Badge variant="success" className="mt-1 w-fit">
            0% interest
          </Badge>
        )}
      </div>
    </Link>
  );
}
