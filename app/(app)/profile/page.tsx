import type { Metadata } from "next";
import { User } from "lucide-react";
import { PlaceholderScreen } from "@/components/app-shell/PlaceholderScreen";

export const metadata: Metadata = { title: "Profile · 1Fi" };

export default function ProfilePage() {
  return (
    <PlaceholderScreen
      title="Profile"
      icon={User}
      blurb="Account details, KYC, autopay setup and support live here in the 1Fi app."
    />
  );
}
