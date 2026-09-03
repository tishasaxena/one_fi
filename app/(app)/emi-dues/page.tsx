import type { Metadata } from "next";
import { Receipt } from "lucide-react";
import { PlaceholderScreen } from "@/components/app-shell/PlaceholderScreen";

export const metadata: Metadata = { title: "EMI Dues · 1Fi" };

export default function EmiDuesPage() {
  return (
    <PlaceholderScreen
      title="EMI Dues"
      icon={Receipt}
      blurb="Your outstanding amount, upcoming instalments and a month-by-month repayment table live here in the 1Fi app."
    />
  );
}
