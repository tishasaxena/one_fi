/*
 * Generates on-brand SVG placeholder imagery for the mock catalogue into
 * /public/products. Committed output means the app runs fully offline and
 * carries no third-party product photos. The catalogue's `images` fields are
 * plain URLs, so replacing these with a real CDN later is a data-only change.
 *
 * Run:  npm run gen:placeholders
 */
import { mkdir, writeFile } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const OUT_DIR = resolve(__dirname, "../public/products");

const PURPLE = "#712CDC";

// Per-category accent + a minimal line icon drawn in a 0 0 120 120 box.
const CATEGORY = {
  smartphones: {
    tint: "#EEF0FF",
    accent: "#5B6CFF",
    icon: `<rect x="42" y="20" width="36" height="80" rx="9"/><line x1="54" y1="30" x2="66" y2="30"/><circle cx="60" cy="88" r="3.2"/>`,
  },
  laptops: {
    tint: "#E9F6FF",
    accent: "#1E9DE3",
    icon: `<rect x="26" y="30" width="68" height="44" rx="5"/><path d="M18 84 h84 l-6 8 h-72 z"/>`,
  },
  audio: {
    tint: "#FDEEF6",
    accent: "#D6459A",
    icon: `<path d="M30 66 v-6 a30 30 0 0 1 60 0 v6"/><rect x="24" y="64" width="14" height="26" rx="6"/><rect x="82" y="64" width="14" height="26" rx="6"/>`,
  },
  wearables: {
    tint: "#EAF7EF",
    accent: "#1FA463",
    icon: `<rect x="40" y="40" width="40" height="40" rx="12"/><path d="M50 40 l3 -14 h14 l3 14"/><path d="M50 80 l3 14 h14 l3 -14"/>`,
  },
  bikes: {
    tint: "#FFF1E6",
    accent: "#E5761F",
    icon: `<circle cx="34" cy="78" r="16"/><circle cx="88" cy="78" r="16"/><path d="M34 78 l20 -28 h24 l10 28 M44 50 h26"/>`,
  },
};

/** slug, display name, category, number of frames to render. */
const ITEMS = [
  ["iphone-17-pro", "iPhone 17 Pro", "smartphones", 3],
  ["samsung-galaxy-s25-ultra", "Galaxy S25 Ultra", "smartphones", 2],
  ["google-pixel-10-pro", "Pixel 10 Pro", "smartphones", 2],
  ["oneplus-15", "OnePlus 15", "smartphones", 2],
  ["nothing-phone-3", "Nothing Phone (3)", "smartphones", 2],
  ["macbook-pro-14-m5", 'MacBook Pro 14"', "laptops", 2],
  ["macbook-air-13-m4", 'MacBook Air 13"', "laptops", 2],
  ["dell-xps-13", "Dell XPS 13", "laptops", 2],
  ["sony-wh-1000xm6", "Sony WH-1000XM6", "audio", 2],
  ["apple-airpods-pro-3", "AirPods Pro 3", "audio", 1],
  ["bose-quietcomfort-ultra", "Bose QC Ultra", "audio", 2],
  ["apple-watch-series-11", "Apple Watch S11", "wearables", 2],
  ["samsung-galaxy-watch-8", "Galaxy Watch 8", "wearables", 1],
  ["royal-enfield-classic-350", "Classic 350", "bikes", 2],
  ["royal-enfield-hunter-350", "Hunter 350", "bikes", 1],
];

function svg(name, category, frame) {
  const c = CATEGORY[category];
  const shift = frame * 7;
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 800" role="img" aria-label="${escapeXml(
    name,
  )}">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="#ffffff"/>
      <stop offset="1" stop-color="${c.tint}"/>
    </linearGradient>
    <linearGradient id="pill" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="${c.accent}" stop-opacity="0.16"/>
      <stop offset="1" stop-color="${c.accent}" stop-opacity="0.05"/>
    </linearGradient>
  </defs>
  <rect width="800" height="800" fill="url(#bg)"/>
  <circle cx="${140 + shift}" cy="${170 - shift}" r="260" fill="${c.accent}" opacity="0.06"/>
  <rect x="188" y="150" width="424" height="424" rx="52" fill="url(#pill)"/>
  <g transform="translate(220 182) scale(3.0)" fill="none" stroke="${c.accent}"
     stroke-width="3.4" stroke-linecap="round" stroke-linejoin="round">
    ${c.icon}
  </g>
  <text x="400" y="648" text-anchor="middle" font-family="Geist, Segoe UI, system-ui, sans-serif"
        font-size="40" font-weight="700" fill="#0a0a0a">${escapeXml(name)}</text>
  <text x="400" y="690" text-anchor="middle" font-family="Geist, Segoe UI, system-ui, sans-serif"
        font-size="22" font-weight="600" letter-spacing="3" fill="${PURPLE}">1Fi MARKETPLACE</text>
</svg>
`;
}

function escapeXml(s) {
  return s.replace(/[<>&'"]/g, (ch) => {
    return { "<": "&lt;", ">": "&gt;", "&": "&amp;", "'": "&apos;", '"': "&quot;" }[ch];
  });
}

async function main() {
  await mkdir(OUT_DIR, { recursive: true });
  let count = 0;
  for (const [slug, name, category, frames] of ITEMS) {
    for (let f = 1; f <= frames; f++) {
      await writeFile(resolve(OUT_DIR, `${slug}-${f}.svg`), svg(name, category, f - 1), "utf8");
      count++;
    }
  }
  console.log(`Wrote ${count} placeholder images to public/products/`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
