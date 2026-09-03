import type { LucideIcon } from "lucide-react";

/**
 * Placeholder for the Shop sections the brief says can stay blank (Top Brands,
 * Nearby Stores). Honours "no implementation required" without a broken-looking
 * empty screen.
 */
export function ComingSoon({
  title,
  description,
  icon: Icon,
}: {
  title: string;
  description: string;
  icon: LucideIcon;
}) {
  return (
    <div className="flex flex-col items-center gap-3 px-8 py-20 text-center">
      <div className="flex size-14 items-center justify-center rounded-2xl bg-primary-light text-primary">
        <Icon className="size-6" />
      </div>
      <p className="text-base font-semibold tracking-tight">{title} is coming soon</p>
      <p className="max-w-[18rem] text-sm text-muted-foreground">{description}</p>
      <span className="mt-1 rounded-full bg-muted px-3 py-1 text-xs font-medium text-muted-foreground">
        Not part of this build
      </span>
    </div>
  );
}
