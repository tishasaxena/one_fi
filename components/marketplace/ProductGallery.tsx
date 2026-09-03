"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { BrandPill } from "@/components/marketplace/BrandPill";

/**
 * Product image card matching the app's "Pay using 1Fi" screen: a white rounded
 * card with the brand pill top-left and the product image centred. Thumbnails
 * appear when there's more than one image.
 */
export function ProductGallery({
  images,
  alt,
  brand,
}: {
  images: string[];
  alt: string;
  brand: string;
}) {
  const [active, setActive] = useState(0);
  const list = images.length > 0 ? images : ["/products/placeholder.svg"];

  // Reset when the image set changes (e.g. variant switch).
  useEffect(() => {
    setActive(0);
  }, [images]);

  const current = list[Math.min(active, list.length - 1)] ?? list[0]!;

  return (
    <div className="space-y-3">
      <div className="relative overflow-hidden rounded-2xl border border-border bg-card p-3 shadow-card">
        <div className="absolute left-4 top-4 z-10">
          <BrandPill brand={brand} />
        </div>
        <div className="relative mx-auto aspect-square w-full max-w-[280px]">
          <Image
            src={current}
            alt={alt}
            fill
            priority
            sizes="280px"
            className="object-contain"
          />
        </div>
      </div>

      {list.length > 1 && (
        <div className="flex justify-center gap-2">
          {list.map((src, i) => (
            <button
              key={src + i}
              type="button"
              onClick={() => setActive(i)}
              aria-label={`View image ${i + 1}`}
              aria-current={i === active}
              className={cn(
                "relative size-14 overflow-hidden rounded-lg border bg-card transition-colors",
                i === active ? "border-primary" : "border-border",
              )}
            >
              <Image src={src} alt="" fill sizes="56px" className="object-contain p-1" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
