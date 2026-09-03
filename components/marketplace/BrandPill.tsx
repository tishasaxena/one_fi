export function BrandPill({ brand }: { brand: string }) {
  return (
    <span className="inline-flex items-center rounded-full border border-border bg-card px-2.5 py-1 text-[11px] font-semibold text-foreground shadow-sm">
      {brand}
    </span>
  );
}
