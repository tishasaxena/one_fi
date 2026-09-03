import type { Metadata } from "next";
import { Wallet } from "lucide-react";
import { PlaceholderScreen } from "@/components/app-shell/PlaceholderScreen";

export const metadata: Metadata = { title: "Limit · 1Fi" };

export default function PledgedFundsPage() {
  return (
    <PlaceholderScreen
      title="Limit"
      icon={Wallet}
      blurb="Your remaining spending limit, pledged mutual fund value and pledge actions live here in the 1Fi app."
    />
  );
}
