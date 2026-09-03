/**
 * Share a product using the Web Share API where available, falling back to
 * copying the link. Best-effort — failures are swallowed (including the user
 * dismissing the share sheet).
 */
export async function shareProduct(name: string, slug: string) {
  if (typeof window === "undefined") return;

  const url = `${window.location.origin}/shop/marketplace/${slug}`;
  const data = { title: `${name} on 1Fi`, text: `Check out ${name} on 1Fi Marketplace`, url };

  try {
    if (navigator.share) {
      await navigator.share(data);
      return;
    }
    await navigator.clipboard?.writeText(url);
  } catch {
    /* user cancelled or clipboard unavailable — nothing to do */
  }
}
