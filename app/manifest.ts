import type { MetadataRoute } from "next";

/**
 * The real 1Fi Android app is a Trusted Web Activity wrapping the app.1fi.in
 * PWA (confirmed via its assetlinks.json) — this manifest mirrors that setup
 * for the same reason: a phone-width, installable web app.
 */
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "1Fi — Shop today, pay later using mutual funds",
    short_name: "1Fi",
    description: "Browse the 1Fi Marketplace and pay in no-cost EMIs backed by your mutual funds.",
    start_url: "/shop",
    display: "standalone",
    background_color: "#f6f6f6",
    theme_color: "#712CDC",
    icons: [{ src: "/icon.svg", sizes: "any", type: "image/svg+xml", purpose: "any" }],
  };
}
