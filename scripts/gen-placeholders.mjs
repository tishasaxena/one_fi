/*
 * Generates on-brand SVG placeholder imagery for the mock catalogue into
 * /public/products. Committed output means the app runs fully offline and
 * carries no third-party product photos. The catalogue's `images` fields are
 * plain URLs, so replacing these with a real CDN later is a data-only change.
 *
 * Each product gets an icon that actually matches its form factor (earbuds
 * vs. over-ear headphones, a round watch vs. a square one, a motorcycle
 * vs. a bicycle, notch vs. punch-hole phones) plus a small deterministic
 * rotation/flip/hue nudge per slug, so a grid of five phones doesn't render
 * as five identical clones.
 *
 * Run:  npm run gen:placeholders
 */
import { mkdir, writeFile } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const OUT_DIR = resolve(__dirname, "../public/products");

const PURPLE = "#712CDC";

// Per-category palette. `icons` holds one or more line-art icons (drawn in a
// 0 0 120 120 box) a product in that category can use.
const CATEGORY = {
  smartphones: {
    tint: "#EEF0FF",
    accent: "#5B6CFF",
    icons: {
      "phone-notch": `<rect x="42" y="18" width="36" height="84" rx="10"/><rect x="53" y="23" width="14" height="4" rx="2"/><circle cx="60" cy="93" r="3"/>`,
      "phone-punchhole": `<rect x="41" y="16" width="38" height="88" rx="11"/><circle cx="60" cy="24" r="2.4"/><line x1="52" y1="97" x2="68" y2="97"/>`,
    },
  },
  laptops: {
    tint: "#E9F6FF",
    accent: "#1E9DE3",
    icons: {
      laptop: `<rect x="27" y="28" width="66" height="43" rx="4"/><circle cx="60" cy="46" r="1.6" fill="currentColor" stroke="none"/><path d="M17 83 h86 l-7 8 h-72 z"/>`,
      "laptop-deck": `<rect x="25" y="26" width="70" height="42" rx="4"/><path d="M15 82 h90 l-7 8 h-76 z"/><line x1="38" y1="82" x2="82" y2="82"/>`,
    },
  },
  audio: {
    tint: "#FDEEF6",
    accent: "#D6459A",
    icons: {
      headphones: `<path d="M30 66 v-6 a30 30 0 0 1 60 0 v6"/><rect x="24" y="64" width="14" height="26" rx="6"/><rect x="82" y="64" width="14" height="26" rx="6"/>`,
      earbuds: `<rect x="30" y="46" width="24" height="34" rx="9"/><rect x="66" y="46" width="24" height="34" rx="9"/><path d="M40 46 v-8 a8 8 0 0 1 8 -6" /><path d="M80 46 v-8 a8 8 0 0 0 -8 -6"/>`,
    },
  },
  wearables: {
    tint: "#EAF7EF",
    accent: "#1FA463",
    icons: {
      "watch-square": `<rect x="40" y="40" width="40" height="40" rx="12"/><path d="M50 40 l3 -14 h14 l3 14"/><path d="M50 80 l3 14 h14 l3 -14"/>`,
      "watch-round": `<circle cx="60" cy="60" r="26"/><path d="M50 34 l2 -12 h16 l2 12"/><path d="M50 86 l2 12 h16 l2 -12"/><line x1="86" y1="56" x2="94" y2="54"/>`,
    },
  },
  bikes: {
    tint: "#FFF1E6",
    accent: "#E5761F",
    icons: {
      motorcycle: `<circle cx="30" cy="82" r="14"/><circle cx="90" cy="82" r="14"/><path d="M30 82 h14 l10 -20 h20 v-10 h14"/><path d="M54 62 h22 l8 20"/><path d="M74 42 h12"/>`,
    },
  },
};

/** slug, display name, category, icon key, number of frames to render. */
const ITEMS = [
  ["iphone-17-pro", "iPhone 17 Pro", "smartphones", "phone-notch", 3],
  ["samsung-galaxy-s25-ultra", "Galaxy S25 Ultra", "smartphones", "phone-punchhole", 2],
  ["google-pixel-10-pro", "Pixel 10 Pro", "smartphones", "phone-punchhole", 2],
  ["oneplus-15", "OnePlus 15", "smartphones", "phone-punchhole", 2],
  ["nothing-phone-3", "Nothing Phone (3)", "smartphones", "phone-punchhole", 2],
  ["macbook-pro-14-m5", 'MacBook Pro 14"', "laptops", "laptop", 2],
  ["macbook-air-13-m4", 'MacBook Air 13"', "laptops", "laptop", 2],
  ["dell-xps-13", "Dell XPS 13", "laptops", "laptop-deck", 2],
  ["sony-wh-1000xm6", "Sony WH-1000XM6", "audio", "headphones", 2],
  ["apple-airpods-pro-3", "AirPods Pro 3", "audio", "earbuds", 1],
  ["bose-quietcomfort-ultra", "Bose QC Ultra", "audio", "headphones", 2],
  ["apple-watch-series-11", "Apple Watch S11", "wearables", "watch-square", 2],
  ["samsung-galaxy-watch-8", "Galaxy Watch 8", "wearables", "watch-round", 1],
  ["royal-enfield-classic-350", "Classic 350", "bikes", "motorcycle", 2],
  ["royal-enfield-hunter-350", "Hunter 350", "bikes", "motorcycle", 1],
];

/** Small deterministic hash so the same slug always renders the same way. */
function hashSeed(str) {
  let h = 2166136261;
  for (let i = 0; i < str.length; i++) {
    h ^= str.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return Math.abs(h);
}

function hexToHsl(hex) {
  const n = parseInt(hex.slice(1), 16);
  const r = ((n >> 16) & 255) / 255;
  const g = ((n >> 8) & 255) / 255;
  const b = (n & 255) / 255;
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  let h = 0;
  const l = (max + min) / 2;
  const d = max - min;
  const s = d === 0 ? 0 : d / (1 - Math.abs(2 * l - 1));
  if (d !== 0) {
    switch (max) {
      case r:
        h = ((g - b) / d) % 6;
        break;
      case g:
        h = (b - r) / d + 2;
        break;
      default:
        h = (r - g) / d + 4;
    }
    h *= 60;
    if (h < 0) h += 360;
  }
  return [h, s * 100, l * 100];
}

function hslToHex(h, s, l) {
  s /= 100;
  l /= 100;
  const k = (n) => (n + h / 30) % 12;
  const a = s * Math.min(l, 1 - l);
  const f = (n) => l - a * Math.max(-1, Math.min(k(n) - 3, Math.min(9 - k(n), 1)));
  const toHex = (x) =>
    Math.round(255 * x)
      .toString(16)
      .padStart(2, "0");
  return `#${toHex(f(0))}${toHex(f(8))}${toHex(f(4))}`;
}

/** Nudge a category accent's hue by up to +-12deg, deterministically per slug. */
function shiftAccent(hex, seed) {
  const [h, s, l] = hexToHsl(hex);
  const nudge = ((seed % 25) - 12) * 1; // -12..+12
  return hslToHex((h + nudge + 360) % 360, s, l);
}

function svg(slug, name, category, iconKey, frame) {
  const c = CATEGORY[category];
  const icon = c.icons[iconKey];
  const seed = hashSeed(`${slug}-${frame}`);
  const accent = shiftAccent(c.accent, seed);
  const rotate = ((seed % 13) - 6) * 1.2; // -7.2..+7.2 deg
  const flip = seed % 2 === 0 ? -1 : 1;
  const shift = frame * 7 + (seed % 11);

  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 800" role="img" aria-label="${escapeXml(
    name,
  )}">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="#ffffff"/>
      <stop offset="1" stop-color="${c.tint}"/>
    </linearGradient>
    <linearGradient id="pill" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="${accent}" stop-opacity="0.16"/>
      <stop offset="1" stop-color="${accent}" stop-opacity="0.05"/>
    </linearGradient>
  </defs>
  <rect width="800" height="800" fill="url(#bg)"/>
  <circle cx="${140 + shift}" cy="${170 - shift}" r="280" fill="${accent}" opacity="0.06"/>
  <circle cx="${640 - shift}" cy="${660 + shift}" r="150" fill="${accent}" opacity="0.05"/>
  <rect x="200" y="200" width="400" height="400" rx="56" fill="url(#pill)"/>
  <g transform="translate(400 400) rotate(${rotate.toFixed(1)}) scale(${flip} 1) translate(-400 -400)">
    <g transform="translate(230 240) scale(2.83)" fill="none" stroke="${accent}"
       stroke-width="3.6" stroke-linecap="round" stroke-linejoin="round">
      ${icon}
    </g>
  </g>
  <g transform="translate(348 690)" aria-label="${escapeXml(name)}">
    <rect x="-4" y="-24" width="34" height="34" rx="9" fill="${PURPLE}"/>
    <text x="13" y="-1" text-anchor="middle" font-family="Geist, Segoe UI, system-ui, sans-serif"
          font-size="15" font-weight="700" fill="#ffffff">1Fi</text>
    <text x="44" y="0" font-family="Geist, Segoe UI, system-ui, sans-serif"
          font-size="17" font-weight="600" letter-spacing="2" fill="#8a8a8a">MARKETPLACE</text>
  </g>
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
  for (const [slug, name, category, iconKey, frames] of ITEMS) {
    for (let f = 1; f <= frames; f++) {
      await writeFile(
        resolve(OUT_DIR, `${slug}-${f}.svg`),
        svg(slug, name, category, iconKey, f - 1),
        "utf8",
      );
      count++;
    }
  }
  console.log(`Wrote ${count} placeholder images to public/products/`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
