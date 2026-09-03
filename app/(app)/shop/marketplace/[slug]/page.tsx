import type { Metadata } from "next";
import { PRODUCTS_BY_SLUG } from "@/data/products";
import { ProductDetailView } from "@/components/marketplace/ProductDetailView";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const product = PRODUCTS_BY_SLUG.get(slug);
  return {
    title: product ? `${product.name} · 1Fi Marketplace` : "Product · 1Fi Marketplace",
    description: product?.tagline,
  };
}

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  return <ProductDetailView slug={slug} />;
}
