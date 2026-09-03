"use client";

import * as React from "react";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * Bottom sheet (Radix Dialog). Used for the mobile filter / "edit amount"
 * surfaces, matching the app's slide-up panels.
 */
export const Sheet = DialogPrimitive.Root;
export const SheetTrigger = DialogPrimitive.Trigger;
export const SheetClose = DialogPrimitive.Close;

export const SheetContent = React.forwardRef<
  React.ComponentRef<typeof DialogPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Content> & { title: string }
>(({ className, children, title, ...props }, ref) => (
  <DialogPrimitive.Portal>
    <DialogPrimitive.Overlay className="fixed inset-0 z-50 bg-black/40 data-[state=open]:animate-[fade-in_0.15s_ease-out]" />
    <DialogPrimitive.Content
      ref={ref}
      className={cn(
        "fixed inset-x-0 bottom-0 z-50 mx-auto flex max-h-[85dvh] w-full max-w-[440px] flex-col rounded-t-2xl border border-border bg-card p-4 shadow-pop",
        "data-[state=open]:animate-[sheet-in_0.24s_cubic-bezier(0.32,0.72,0,1)]",
        className,
      )}
      {...props}
    >
      <div className="mx-auto mb-3 h-1 w-9 shrink-0 rounded-full bg-border" aria-hidden />
      <div className="mb-3 flex items-center justify-between">
        <DialogPrimitive.Title className="text-base font-semibold tracking-tight">
          {title}
        </DialogPrimitive.Title>
        <DialogPrimitive.Close
          className="flex size-8 items-center justify-center rounded-full text-muted-foreground hover:bg-muted"
          aria-label="Close"
        >
          <X className="size-4" />
        </DialogPrimitive.Close>
      </div>
      <div className="min-h-0 flex-1 overflow-y-auto">{children}</div>
    </DialogPrimitive.Content>
  </DialogPrimitive.Portal>
));
SheetContent.displayName = "SheetContent";
