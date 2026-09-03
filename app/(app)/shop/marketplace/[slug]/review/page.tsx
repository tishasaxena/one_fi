import type { Metadata } from "next";
import { ReviewView } from "@/components/review/ReviewView";

export const metadata: Metadata = { title: "Review order · 1Fi Marketplace" };

export default async function ReviewPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  return <ReviewView slug={slug} />;
}
