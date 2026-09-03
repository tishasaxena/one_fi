import type { Metadata } from "next";
import { SuccessView } from "@/components/review/SuccessView";

export const metadata: Metadata = { title: "Order confirmed · 1Fi Marketplace" };

export default async function SuccessPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  return <SuccessView slug={slug} />;
}
