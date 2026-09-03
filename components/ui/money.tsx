import { cn } from "@/lib/utils";
import { formatINR } from "@/lib/format";

interface MoneyProps {
  amount: number;
  /** Render smaller and struck-through, for an MRP comparison. */
  strike?: boolean;
  decimals?: boolean;
  className?: string;
}

/** Consistent INR rendering with tabular figures. */
export function Money({ amount, strike, decimals, className }: MoneyProps) {
  return (
    <span
      className={cn(
        "tabular-nums",
        strike && "text-muted-foreground line-through",
        className,
      )}
    >
      {formatINR(amount, { decimals })}
    </span>
  );
}
