"use client";

import { useCallback, useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { Building2, MapPin } from "lucide-react";
import { Segmented } from "@/components/ui/segmented";
import { ComingSoon } from "@/components/shop/ComingSoon";
import { MarketplacePanel } from "@/components/marketplace/MarketplacePanel";
import {
  DEFAULT_SHOP_SECTION,
  SHOP_SECTIONS,
  normalizeSection,
  type ShopSectionValue,
} from "@/components/shop/sections";

const SEGMENTS = SHOP_SECTIONS.map((s) => ({
  value: s.value,
  label: s.label,
  dot: s.value === "marketplace",
}));

/**
 * Shop segmented control + the active panel. The selected section is mirrored
 * into `?section=` (via replaceState, so it's shareable and survives refresh
 * without adding history noise).
 */
export function ShopTabs({ initialSection }: { initialSection: ShopSectionValue }) {
  const pathname = usePathname();
  const [section, setSection] = useState<ShopSectionValue>(initialSection);

  useEffect(() => {
    setSection(initialSection);
  }, [initialSection]);

  const select = useCallback(
    (next: string) => {
      const value = normalizeSection(next);
      setSection(value);
      const query = value === DEFAULT_SHOP_SECTION ? "" : `?section=${value}`;
      window.history.replaceState(window.history.state, "", `${pathname}${query}`);
    },
    [pathname],
  );

  return (
    <>
      <Segmented
        aria-label="Shop sections"
        options={SEGMENTS}
        value={section}
        onValueChange={select}
        variant="chips"
        fill
      />

      <div className="mt-1">
        {section === "top-brands" && (
          <ComingSoon
            icon={Building2}
            title="Top Brands"
            description="Curated storefronts from the brands 1Fi partners with. Nothing to show here yet."
          />
        )}
        {section === "nearby-stores" && (
          <ComingSoon
            icon={MapPin}
            title="Nearby Stores"
            description="Offline partner stores near you where you can pay with 1Fi. Nothing to show here yet."
          />
        )}
        {section === "marketplace" && <MarketplacePanel />}
      </div>
    </>
  );
}
