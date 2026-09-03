import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  // The floating dev badge overlaps the bottom nav in the phone-width layout.
  devIndicators: false,
  // The mock catalog references remote product imagery in a couple of places; keep the
  // door open for a real CDN swap without touching component code.
  images: {
    remotePatterns: [{ protocol: "https", hostname: "**" }],
  },
};

export default nextConfig;
