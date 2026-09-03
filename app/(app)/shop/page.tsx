import type { Metadata } from "next";
import { PageHeader } from "@/components/app-shell/PageHeader";
import { ShopBanner } from "@/components/shop/ShopBanner";
import { ShopTabs } from "@/components/shop/ShopTabs";
import { normalizeSection } from "@/components/shop/sections";

export const metadata: Metadata = { title: "Shop · 1Fi" };

export default async function ShopPage({
  searchParams,
}: {
  searchParams: Promise<{ section?: string }>;
}) {
  const { section } = await searchParams;
  const active = normalizeSection(section);

  return (
    <>
      <PageHeader title="Shop" />
      <div className="flex-1 space-y-4 p-4">
        <ShopBanner />
        <ShopTabs initialSection={active} />
      </div>
    </>
  );
}
