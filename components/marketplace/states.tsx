import type { ReactNode } from "react";
import { PackageOpen, SearchX, TriangleAlert } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ApiError } from "@/lib/types";

function Shell({
  icon,
  title,
  children,
  action,
}: {
  icon: ReactNode;
  title: string;
  children?: ReactNode;
  action?: ReactNode;
}) {
  return (
    <div className="flex flex-col items-center gap-2 px-6 py-14 text-center">
      <div className="mb-1 flex size-12 items-center justify-center rounded-full bg-muted text-muted-foreground">
        {icon}
      </div>
      <p className="text-sm font-semibold">{title}</p>
      {children && <p className="max-w-[16rem] text-sm text-muted-foreground">{children}</p>}
      {action && <div className="mt-3">{action}</div>}
    </div>
  );
}

export function EmptyState({
  title = "Nothing here yet",
  description,
}: {
  title?: string;
  description?: ReactNode;
}) {
  return (
    <Shell icon={<PackageOpen className="size-5" />} title={title}>
      {description}
    </Shell>
  );
}

export function NoResultsState({ query }: { query: string }) {
  return (
    <Shell icon={<SearchX className="size-5" />} title="No matching products">
      We couldn&apos;t find anything for &ldquo;{query}&rdquo;. Try a different search or category.
    </Shell>
  );
}

export function ErrorState({
  error,
  onRetry,
}: {
  error: unknown;
  onRetry?: () => void;
}) {
  const message =
    error instanceof ApiError
      ? error.message
      : "Something went wrong while loading this. Please try again.";

  return (
    <Shell
      icon={<TriangleAlert className="size-5" />}
      title="Couldn't load this"
      action={
        onRetry ? (
          <Button variant="outline" size="sm" onClick={onRetry}>
            Try again
          </Button>
        ) : undefined
      }
    >
      {message}
    </Shell>
  );
}
