import type { ReactNode } from "react";
import { AppFrame } from "@/components/app-shell/AppFrame";
import { BottomNav } from "@/components/app-shell/BottomNav";

export default function AppLayout({ children }: { children: ReactNode }) {
  return (
    <AppFrame>
      {children}
      <BottomNav />
    </AppFrame>
  );
}
