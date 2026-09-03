import type { Product } from "@/lib/types";

/**
 * Mock product catalogue for the 1Fi Marketplace.
 *
 * This is the single source of truth the mock API reads from — components never
 * import it directly. Prices are indicative, in whole rupees. Imagery points at
 * generated on-brand SVG placeholders in /public/products (see
 * scripts/gen-placeholders.mjs); the `images` fields accept any URL, so swapping
 * in a real CDN is a data-only change.
 */

const img = (slug: string, n = 1) => `/products/${slug}-${n}.svg`;

const NO_COST_6 = [
  { tenureMonths: 3, annualRatePct: 0 },
  { tenureMonths: 6, annualRatePct: 0 },
  { tenureMonths: 9, annualRatePct: 0 },
  { tenureMonths: 12, annualRatePct: 0 },
  { tenureMonths: 18, annualRatePct: 0 },
  { tenureMonths: 24, annualRatePct: 0 },
];

const NO_COST_4 = [
  { tenureMonths: 3, annualRatePct: 0 },
  { tenureMonths: 6, annualRatePct: 0 },
  { tenureMonths: 9, annualRatePct: 0 },
  { tenureMonths: 12, annualRatePct: 0 },
];

const LAPTOP_PLANS = [
  { tenureMonths: 6, annualRatePct: 0 },
  { tenureMonths: 12, annualRatePct: 0 },
  { tenureMonths: 18, annualRatePct: 0 },
  { tenureMonths: 24, annualRatePct: 0 },
  { tenureMonths: 36, annualRatePct: 13 },
];

const BIKE_PLANS = [
  { tenureMonths: 12, annualRatePct: 0 },
  { tenureMonths: 18, annualRatePct: 0 },
  { tenureMonths: 24, annualRatePct: 0 },
  { tenureMonths: 36, annualRatePct: 12.5 },
  { tenureMonths: 48, annualRatePct: 14 },
];

export const PRODUCTS: Product[] = [
  {
    id: "p_iphone_17_pro",
    slug: "iphone-17-pro",
    name: "iPhone 17 Pro",
    brand: "Apple",
    categorySlug: "smartphones",
    tagline: "A18 Pro chip, titanium design, 6.3-inch ProMotion display.",
    description:
      "The iPhone 17 Pro pairs the A18 Pro chip with a grade-5 titanium frame and a 6.3-inch " +
      "Super Retina XDR display with ProMotion. The Pro camera system adds a 48MP fusion main, " +
      "48MP ultra-wide and a 5x telephoto, with 4K120 Dolby Vision video.",
    image: img("iphone-17-pro"),
    images: [img("iphone-17-pro", 1), img("iphone-17-pro", 2), img("iphone-17-pro", 3)],
    startingPrice: 125900,
    mrp: 134900,
    badges: ["0% interest", "Instant approval"],
    rating: { value: 4.8, count: 2143 },
    inStock: true,
    highlights: [
      "6.3-inch Super Retina XDR, ProMotion 120Hz",
      "A18 Pro chip with 6-core GPU",
      "48MP Fusion main + 5x telephoto",
      "Up to 33 hours video playback",
    ],
    specs: [
      {
        group: "Display",
        items: [
          { label: "Size", value: "6.3-inch OLED" },
          { label: "Resolution", value: "2622 x 1206" },
          { label: "Refresh rate", value: "1–120Hz ProMotion" },
        ],
      },
      {
        group: "Performance",
        items: [
          { label: "Chip", value: "A18 Pro" },
          { label: "Storage", value: "256GB / 512GB / 1TB" },
        ],
      },
      {
        group: "Camera",
        items: [
          { label: "Rear", value: "48MP + 48MP + 12MP" },
          { label: "Front", value: "18MP" },
          { label: "Video", value: "4K Dolby Vision at 120 fps" },
        ],
      },
      {
        group: "Battery",
        items: [
          { label: "Video playback", value: "Up to 33 hours" },
          { label: "Charging", value: "USB-C, MagSafe 25W" },
        ],
      },
    ],
    soldBy: { name: "1Fi Marketplace", note: "Fulfilled by 1Fi · Delivered in 2–4 days" },
    planConfigs: NO_COST_6,
    variants: [
      {
        id: "v_iphone_17_pro_256",
        label: "256 GB",
        sublabel: "iPhone 17 Pro · 256 GB",
        attributes: [
          { name: "Storage", value: "256 GB" },
          { name: "Colour", value: "Cosmic Orange" },
        ],
        price: 125900,
        mrp: 134900,
        images: [img("iphone-17-pro", 1), img("iphone-17-pro", 2)],
        inStock: true,
      },
      {
        id: "v_iphone_17_pro_512",
        label: "512 GB",
        sublabel: "iPhone 17 Pro · 512 GB",
        attributes: [
          { name: "Storage", value: "512 GB" },
          { name: "Colour", value: "Cosmic Orange" },
        ],
        price: 134900,
        mrp: 144900,
        images: [img("iphone-17-pro", 1), img("iphone-17-pro", 2)],
        inStock: true,
      },
      {
        id: "v_iphone_17_pro_1tb",
        label: "1 TB",
        sublabel: "iPhone 17 Pro · 1 TB",
        attributes: [
          { name: "Storage", value: "1 TB" },
          { name: "Colour", value: "Deep Blue" },
        ],
        price: 154900,
        mrp: 164900,
        images: [img("iphone-17-pro", 3)],
        inStock: false,
      },
    ],
  },

  {
    id: "p_galaxy_s25_ultra",
    slug: "samsung-galaxy-s25-ultra",
    name: "Galaxy S25 Ultra",
    brand: "Samsung",
    categorySlug: "smartphones",
    tagline: "200MP camera, Snapdragon 8 Elite, built-in S Pen.",
    description:
      "The Galaxy S25 Ultra runs the Snapdragon 8 Elite for Galaxy with a 6.9-inch QHD+ Dynamic " +
      "AMOLED 2X display at 120Hz. A 200MP wide camera, 50MP ultra-wide and dual telephoto lenses " +
      "handle photography, and the S Pen is built in.",
    image: img("samsung-galaxy-s25-ultra"),
    images: [img("samsung-galaxy-s25-ultra", 1), img("samsung-galaxy-s25-ultra", 2)],
    startingPrice: 129999,
    mrp: 139999,
    badges: ["0% interest", "Instant approval"],
    rating: { value: 4.7, count: 1780 },
    inStock: true,
    highlights: [
      "6.9-inch QHD+ Dynamic AMOLED 2X, 120Hz",
      "Snapdragon 8 Elite for Galaxy",
      "200MP wide + 50MP ultra-wide",
      "Built-in S Pen, 5000mAh battery",
    ],
    specs: [
      {
        group: "Display",
        items: [
          { label: "Size", value: "6.9-inch AMOLED" },
          { label: "Resolution", value: "3120 x 1440" },
          { label: "Refresh rate", value: "1–120Hz" },
        ],
      },
      {
        group: "Performance",
        items: [
          { label: "Chip", value: "Snapdragon 8 Elite for Galaxy" },
          { label: "RAM", value: "12GB" },
        ],
      },
      {
        group: "Camera",
        items: [
          { label: "Rear", value: "200MP + 50MP + 50MP + 10MP" },
          { label: "Front", value: "12MP" },
        ],
      },
    ],
    soldBy: { name: "1Fi Marketplace", note: "Fulfilled by 1Fi · Delivered in 2–4 days" },
    planConfigs: NO_COST_6,
    variants: [
      {
        id: "v_s25u_256",
        label: "256 GB",
        sublabel: "Galaxy S25 Ultra · 12GB / 256GB",
        attributes: [
          { name: "Storage", value: "256 GB" },
          { name: "RAM", value: "12 GB" },
          { name: "Colour", value: "Titanium Black" },
        ],
        price: 129999,
        mrp: 139999,
        inStock: true,
      },
      {
        id: "v_s25u_512",
        label: "512 GB",
        sublabel: "Galaxy S25 Ultra · 12GB / 512GB",
        attributes: [
          { name: "Storage", value: "512 GB" },
          { name: "RAM", value: "12 GB" },
          { name: "Colour", value: "Titanium Gray" },
        ],
        price: 141999,
        mrp: 151999,
        inStock: true,
      },
      {
        id: "v_s25u_1tb",
        label: "1 TB",
        sublabel: "Galaxy S25 Ultra · 12GB / 1TB",
        attributes: [
          { name: "Storage", value: "1 TB" },
          { name: "RAM", value: "12 GB" },
          { name: "Colour", value: "Titanium Silverblue" },
        ],
        price: 165999,
        mrp: 175999,
        inStock: true,
      },
    ],
  },

  {
    id: "p_pixel_10_pro",
    slug: "google-pixel-10-pro",
    name: "Pixel 10 Pro",
    brand: "Google",
    categorySlug: "smartphones",
    tagline: "Tensor G5, Pro triple camera, 7 years of updates.",
    description:
      "Pixel 10 Pro is built around the Tensor G5 chip and a 6.3-inch Super Actua LTPO display. " +
      "The Pro camera system brings a 50MP main, 48MP ultra-wide and 48MP 5x telephoto, with " +
      "Google's computational photography and 7 years of OS and security updates.",
    image: img("google-pixel-10-pro"),
    images: [img("google-pixel-10-pro", 1), img("google-pixel-10-pro", 2)],
    startingPrice: 106999,
    mrp: 112999,
    badges: ["0% interest", "Instant approval"],
    rating: { value: 4.6, count: 934 },
    inStock: true,
    highlights: [
      "6.3-inch Super Actua LTPO, 120Hz",
      "Google Tensor G5",
      "50MP main + 48MP 5x telephoto",
      "7 years of OS updates",
    ],
    specs: [
      {
        group: "Display",
        items: [
          { label: "Size", value: "6.3-inch OLED" },
          { label: "Brightness", value: "3300 nits peak" },
        ],
      },
      {
        group: "Performance",
        items: [
          { label: "Chip", value: "Tensor G5" },
          { label: "RAM", value: "16GB" },
        ],
      },
    ],
    soldBy: { name: "1Fi Marketplace", note: "Fulfilled by 1Fi · Delivered in 3–5 days" },
    planConfigs: NO_COST_6,
    variants: [
      {
        id: "v_pixel10_128",
        label: "128 GB",
        sublabel: "Pixel 10 Pro · 128 GB",
        attributes: [
          { name: "Storage", value: "128 GB" },
          { name: "Colour", value: "Obsidian" },
        ],
        price: 106999,
        mrp: 112999,
        inStock: true,
      },
      {
        id: "v_pixel10_256",
        label: "256 GB",
        sublabel: "Pixel 10 Pro · 256 GB",
        attributes: [
          { name: "Storage", value: "256 GB" },
          { name: "Colour", value: "Porcelain" },
        ],
        price: 117999,
        mrp: 123999,
        inStock: true,
      },
    ],
  },

  {
    id: "p_oneplus_15",
    slug: "oneplus-15",
    name: "OnePlus 15",
    brand: "OnePlus",
    categorySlug: "smartphones",
    tagline: "Snapdragon 8 Elite Gen 5, 6500mAh, 165Hz display.",
    description:
      "OnePlus 15 runs the latest Snapdragon 8 Elite Gen 5 with a 6.78-inch 1.5K 165Hz display " +
      "and a 6500mAh silicon-carbon battery with 120W wired charging. The triple 50MP camera " +
      "system is co-developed with a new in-house imaging engine.",
    image: img("oneplus-15"),
    images: [img("oneplus-15", 1), img("oneplus-15", 2)],
    startingPrice: 72999,
    mrp: 79999,
    badges: ["0% interest", "Instant approval", "No down payment"],
    rating: { value: 4.5, count: 611 },
    inStock: true,
    highlights: [
      "6.78-inch 1.5K, 165Hz",
      "Snapdragon 8 Elite Gen 5",
      "6500mAh, 120W charging",
      "Triple 50MP camera",
    ],
    specs: [
      {
        group: "Performance",
        items: [
          { label: "Chip", value: "Snapdragon 8 Elite Gen 5" },
          { label: "RAM", value: "12GB / 16GB" },
        ],
      },
      {
        group: "Battery",
        items: [
          { label: "Capacity", value: "6500mAh" },
          { label: "Charging", value: "120W wired, 50W wireless" },
        ],
      },
    ],
    soldBy: { name: "1Fi Marketplace", note: "Fulfilled by 1Fi · Delivered in 2–4 days" },
    planConfigs: NO_COST_6,
    variants: [
      {
        id: "v_op15_256",
        label: "256 GB",
        sublabel: "OnePlus 15 · 12GB / 256GB",
        attributes: [
          { name: "Storage", value: "256 GB" },
          { name: "RAM", value: "12 GB" },
          { name: "Colour", value: "Infinite Black" },
        ],
        price: 72999,
        mrp: 79999,
        inStock: true,
      },
      {
        id: "v_op15_512",
        label: "512 GB",
        sublabel: "OnePlus 15 · 16GB / 512GB",
        attributes: [
          { name: "Storage", value: "512 GB" },
          { name: "RAM", value: "16 GB" },
          { name: "Colour", value: "Sand Storm" },
        ],
        price: 79999,
        mrp: 86999,
        inStock: true,
      },
    ],
  },

  {
    id: "p_nothing_phone_3",
    slug: "nothing-phone-3",
    name: "Nothing Phone (3)",
    brand: "Nothing",
    categorySlug: "smartphones",
    tagline: "Glyph Matrix, Snapdragon 8s Gen 4, clean Nothing OS.",
    description:
      "Nothing Phone (3) introduces the Glyph Matrix on the back, a 6.67-inch 120Hz flexible " +
      "AMOLED and the Snapdragon 8s Gen 4. Triple 50MP cameras and a 5150mAh battery round out a " +
      "phone that leans hard into its design language.",
    image: img("nothing-phone-3"),
    images: [img("nothing-phone-3", 1), img("nothing-phone-3", 2)],
    startingPrice: 42999,
    mrp: 45999,
    badges: ["0% interest", "Instant approval", "No down payment"],
    rating: { value: 4.4, count: 428 },
    inStock: true,
    highlights: [
      "6.67-inch AMOLED, 120Hz",
      "Snapdragon 8s Gen 4",
      "Glyph Matrix interface",
      "5150mAh, 65W charging",
    ],
    specs: [
      {
        group: "Performance",
        items: [
          { label: "Chip", value: "Snapdragon 8s Gen 4" },
          { label: "RAM", value: "12GB" },
        ],
      },
    ],
    soldBy: { name: "1Fi Marketplace", note: "Fulfilled by 1Fi · Delivered in 3–5 days" },
    planConfigs: NO_COST_4,
    variants: [
      {
        id: "v_np3_128",
        label: "128 GB",
        sublabel: "Nothing Phone (3) · 8GB / 128GB",
        attributes: [
          { name: "Storage", value: "128 GB" },
          { name: "RAM", value: "8 GB" },
          { name: "Colour", value: "Black" },
        ],
        price: 42999,
        mrp: 45999,
        inStock: true,
      },
      {
        id: "v_np3_256",
        label: "256 GB",
        sublabel: "Nothing Phone (3) · 12GB / 256GB",
        attributes: [
          { name: "Storage", value: "256 GB" },
          { name: "RAM", value: "12 GB" },
          { name: "Colour", value: "White" },
        ],
        price: 45999,
        mrp: 49999,
        inStock: true,
      },
    ],
  },

  {
    id: "p_macbook_pro_14_m5",
    slug: "macbook-pro-14-m5",
    name: 'MacBook Pro 14" (M5)',
    brand: "Apple",
    categorySlug: "laptops",
    tagline: "M5 chip, Liquid Retina XDR, up to 24 hours battery.",
    description:
      'The 14-inch MacBook Pro with the M5 chip delivers a big step up in CPU, GPU and Neural ' +
      "Engine performance. The Liquid Retina XDR display hits 1600 nits peak HDR, and battery " +
      "life runs up to 24 hours.",
    image: img("macbook-pro-14-m5"),
    images: [img("macbook-pro-14-m5", 1), img("macbook-pro-14-m5", 2)],
    startingPrice: 199900,
    mrp: 209900,
    badges: ["0% interest up to 24m", "Instant approval"],
    rating: { value: 4.9, count: 1502 },
    inStock: true,
    highlights: [
      "14.2-inch Liquid Retina XDR",
      "Apple M5, up to 10-core CPU",
      "Up to 24 hours battery",
      "3x Thunderbolt 5, HDMI, SDXC",
    ],
    specs: [
      {
        group: "Display",
        items: [
          { label: "Size", value: "14.2-inch" },
          { label: "Brightness", value: "1000 nits sustained, 1600 nits peak" },
        ],
      },
      {
        group: "Performance",
        items: [
          { label: "Chip", value: "Apple M5" },
          { label: "Unified memory", value: "16GB / 24GB / 32GB" },
        ],
      },
    ],
    soldBy: { name: "1Fi Marketplace", note: "Fulfilled by 1Fi · Delivered in 4–6 days" },
    planConfigs: LAPTOP_PLANS,
    variants: [
      {
        id: "v_mbp14_512",
        label: "16GB · 512GB",
        sublabel: "M5 · 16GB · 512GB SSD",
        attributes: [
          { name: "Memory", value: "16 GB" },
          { name: "Storage", value: "512 GB" },
          { name: "Colour", value: "Space Black" },
        ],
        price: 199900,
        mrp: 209900,
        inStock: true,
      },
      {
        id: "v_mbp14_1tb",
        label: "24GB · 1TB",
        sublabel: "M5 · 24GB · 1TB SSD",
        attributes: [
          { name: "Memory", value: "24 GB" },
          { name: "Storage", value: "1 TB" },
          { name: "Colour", value: "Space Black" },
        ],
        price: 249900,
        mrp: 259900,
        inStock: true,
      },
    ],
  },

  {
    id: "p_macbook_air_13_m4",
    slug: "macbook-air-13-m4",
    name: 'MacBook Air 13" (M4)',
    brand: "Apple",
    categorySlug: "laptops",
    tagline: "M4 chip, fanless, 18 hours of battery in 1.24kg.",
    description:
      "The 13-inch MacBook Air with M4 is a fanless, 1.24kg laptop with an 18-hour battery, a " +
      "Liquid Retina display and a 12MP Center Stage camera.",
    image: img("macbook-air-13-m4"),
    images: [img("macbook-air-13-m4", 1), img("macbook-air-13-m4", 2)],
    startingPrice: 114900,
    mrp: 119900,
    badges: ["0% interest", "Instant approval"],
    rating: { value: 4.8, count: 2211 },
    inStock: true,
    highlights: [
      "13.6-inch Liquid Retina",
      "Apple M4, 10-core GPU",
      "Up to 18 hours battery",
      "1.24 kg",
    ],
    specs: [
      {
        group: "Performance",
        items: [
          { label: "Chip", value: "Apple M4" },
          { label: "Unified memory", value: "16GB / 24GB" },
        ],
      },
    ],
    soldBy: { name: "1Fi Marketplace", note: "Fulfilled by 1Fi · Delivered in 3–5 days" },
    planConfigs: LAPTOP_PLANS,
    variants: [
      {
        id: "v_mba13_256",
        label: "16GB · 256GB",
        sublabel: "M4 · 16GB · 256GB SSD",
        attributes: [
          { name: "Memory", value: "16 GB" },
          { name: "Storage", value: "256 GB" },
          { name: "Colour", value: "Sky Blue" },
        ],
        price: 114900,
        mrp: 119900,
        inStock: true,
      },
      {
        id: "v_mba13_512",
        label: "16GB · 512GB",
        sublabel: "M4 · 16GB · 512GB SSD",
        attributes: [
          { name: "Memory", value: "16 GB" },
          { name: "Storage", value: "512 GB" },
          { name: "Colour", value: "Midnight" },
        ],
        price: 134900,
        mrp: 139900,
        inStock: true,
      },
    ],
  },

  {
    id: "p_dell_xps_13",
    slug: "dell-xps-13",
    name: "Dell XPS 13",
    brand: "Dell",
    categorySlug: "laptops",
    tagline: "Lunar Lake, InfinityEdge display, CNC aluminium.",
    description:
      "The Dell XPS 13 pairs Intel Core Ultra (Series 2) processors with a 13.4-inch InfinityEdge " +
      "display and a machined aluminium chassis in a 1.19kg package.",
    image: img("dell-xps-13"),
    images: [img("dell-xps-13", 1), img("dell-xps-13", 2)],
    startingPrice: 139990,
    mrp: 149990,
    badges: ["0% interest", "Instant approval"],
    rating: { value: 4.4, count: 356 },
    inStock: true,
    highlights: [
      "13.4-inch InfinityEdge",
      "Intel Core Ultra 7 (Series 2)",
      "Up to 26 hours battery",
      "1.19 kg CNC aluminium",
    ],
    specs: [
      {
        group: "Performance",
        items: [
          { label: "Processor", value: "Intel Core Ultra 5 / Ultra 7" },
          { label: "Memory", value: "16GB / 32GB LPDDR5x" },
        ],
      },
    ],
    soldBy: { name: "1Fi Marketplace", note: "Fulfilled by 1Fi · Delivered in 5–7 days" },
    planConfigs: LAPTOP_PLANS,
    variants: [
      {
        id: "v_xps13_u5",
        label: "Ultra 5 · 16GB · 512GB",
        sublabel: "Core Ultra 5 · 16GB · 512GB",
        attributes: [
          { name: "Processor", value: "Core Ultra 5" },
          { name: "Memory", value: "16 GB" },
          { name: "Storage", value: "512 GB" },
        ],
        price: 139990,
        mrp: 149990,
        inStock: true,
      },
      {
        id: "v_xps13_u7",
        label: "Ultra 7 · 16GB · 1TB",
        sublabel: "Core Ultra 7 · 16GB · 1TB",
        attributes: [
          { name: "Processor", value: "Core Ultra 7" },
          { name: "Memory", value: "16 GB" },
          { name: "Storage", value: "1 TB" },
        ],
        price: 169990,
        mrp: 179990,
        inStock: false,
      },
    ],
  },

  {
    id: "p_sony_wh1000xm6",
    slug: "sony-wh-1000xm6",
    name: "Sony WH-1000XM6",
    brand: "Sony",
    categorySlug: "audio",
    tagline: "Flagship noise cancelling, 30-hour battery, foldable again.",
    description:
      "The WH-1000XM6 uses Sony's new QN3 processor with 12 microphones for noise cancelling, a " +
      "redesigned 30mm driver, 30-hour battery and a folding hinge.",
    image: img("sony-wh-1000xm6"),
    images: [img("sony-wh-1000xm6", 1), img("sony-wh-1000xm6", 2)],
    startingPrice: 34990,
    mrp: 39990,
    badges: ["0% interest", "Instant approval", "No down payment"],
    rating: { value: 4.7, count: 1890 },
    inStock: true,
    highlights: [
      "QN3 noise-cancelling processor",
      "Up to 30 hours battery",
      "Multipoint Bluetooth",
      "LDAC, DSEE Extreme",
    ],
    specs: [
      {
        group: "Audio",
        items: [
          { label: "Driver", value: "30mm dynamic" },
          { label: "Codecs", value: "SBC, AAC, LDAC" },
        ],
      },
      {
        group: "Battery",
        items: [
          { label: "Playback", value: "30 hours (NC on)" },
          { label: "Quick charge", value: "3 min = 3 hours" },
        ],
      },
    ],
    soldBy: { name: "1Fi Marketplace", note: "Fulfilled by 1Fi · Delivered in 2–4 days" },
    planConfigs: NO_COST_4,
    variants: [
      {
        id: "v_xm6_black",
        label: "Black",
        attributes: [{ name: "Colour", value: "Black" }],
        price: 34990,
        mrp: 39990,
        inStock: true,
      },
      {
        id: "v_xm6_silver",
        label: "Platinum Silver",
        attributes: [{ name: "Colour", value: "Platinum Silver" }],
        price: 34990,
        mrp: 39990,
        inStock: true,
      },
      {
        id: "v_xm6_blue",
        label: "Midnight Blue",
        attributes: [{ name: "Colour", value: "Midnight Blue" }],
        price: 34990,
        mrp: 39990,
        inStock: false,
      },
    ],
  },

  {
    id: "p_airpods_pro_3",
    slug: "apple-airpods-pro-3",
    name: "AirPods Pro 3",
    brand: "Apple",
    categorySlug: "audio",
    tagline: "2x noise cancellation, heart-rate sensing, USB-C.",
    description:
      "AirPods Pro 3 bring up to 2x the active noise cancellation of the previous generation, a " +
      "new foam-infused tip, heart-rate sensing during workouts and a longer 8-hour listening " +
      "time.",
    image: img("apple-airpods-pro-3"),
    images: [img("apple-airpods-pro-3", 1)],
    startingPrice: 25900,
    mrp: 27900,
    badges: ["0% interest", "Instant approval", "No down payment"],
    rating: { value: 4.6, count: 3021 },
    inStock: true,
    highlights: [
      "2x active noise cancellation",
      "Heart-rate sensor",
      "Up to 8 hours listening",
      "USB-C, IP57",
    ],
    specs: [
      {
        group: "Features",
        items: [
          { label: "Chip", value: "Apple H3" },
          { label: "Water resistance", value: "IP57" },
        ],
      },
    ],
    soldBy: { name: "1Fi Marketplace", note: "Fulfilled by 1Fi · Delivered in 2–3 days" },
    planConfigs: NO_COST_4,
    variants: [
      {
        id: "v_app3_default",
        label: "USB-C",
        attributes: [{ name: "Charging case", value: "USB-C, MagSafe" }],
        price: 25900,
        mrp: 27900,
        inStock: true,
      },
    ],
  },

  {
    id: "p_bose_qc_ultra",
    slug: "bose-quietcomfort-ultra",
    name: "Bose QuietComfort Ultra",
    brand: "Bose",
    categorySlug: "audio",
    tagline: "Immersive Audio, world-class noise cancellation.",
    description:
      "The Bose QuietComfort Ultra headphones add spatialised Immersive Audio to Bose's " +
      "noise-cancelling platform, with a CustomTune calibration and up to 24 hours of battery.",
    image: img("bose-quietcomfort-ultra"),
    images: [img("bose-quietcomfort-ultra", 1), img("bose-quietcomfort-ultra", 2)],
    startingPrice: 29990,
    mrp: 34900,
    badges: ["0% interest", "Instant approval"],
    rating: { value: 4.5, count: 742 },
    inStock: true,
    highlights: [
      "Bose Immersive Audio",
      "CustomTune calibration",
      "Up to 24 hours battery",
      "Aware and Quiet modes",
    ],
    specs: [
      {
        group: "Audio",
        items: [
          { label: "Modes", value: "Quiet, Aware, Immersive" },
          { label: "Codecs", value: "SBC, AAC, aptX Adaptive" },
        ],
      },
    ],
    soldBy: { name: "1Fi Marketplace", note: "Fulfilled by 1Fi · Delivered in 3–5 days" },
    planConfigs: NO_COST_4,
    variants: [
      {
        id: "v_qcu_black",
        label: "Black",
        attributes: [{ name: "Colour", value: "Black" }],
        price: 29990,
        mrp: 34900,
        inStock: true,
      },
      {
        id: "v_qcu_white",
        label: "White Smoke",
        attributes: [{ name: "Colour", value: "White Smoke" }],
        price: 29990,
        mrp: 34900,
        inStock: true,
      },
    ],
  },

  {
    id: "p_apple_watch_s11",
    slug: "apple-watch-series-11",
    name: "Apple Watch Series 11",
    brand: "Apple",
    categorySlug: "wearables",
    tagline: "5G, blood-pressure notifications, 24-hour battery.",
    description:
      "Apple Watch Series 11 adds hypertension notifications, a more scratch-resistant display, " +
      "5G connectivity on cellular models and up to 24 hours of battery life.",
    image: img("apple-watch-series-11"),
    images: [img("apple-watch-series-11", 1), img("apple-watch-series-11", 2)],
    startingPrice: 46900,
    mrp: 49900,
    badges: ["0% interest", "Instant approval"],
    rating: { value: 4.7, count: 1287 },
    inStock: true,
    highlights: [
      "Hypertension notifications",
      "Ion-X / sapphire display",
      "Up to 24 hours battery",
      "5G on cellular models",
    ],
    specs: [
      {
        group: "Health",
        items: [
          { label: "Sensors", value: "ECG, SpO2, temperature" },
          { label: "New", value: "Hypertension notifications" },
        ],
      },
    ],
    soldBy: { name: "1Fi Marketplace", note: "Fulfilled by 1Fi · Delivered in 2–4 days" },
    planConfigs: [
      { tenureMonths: 3, annualRatePct: 0 },
      { tenureMonths: 6, annualRatePct: 0 },
      { tenureMonths: 9, annualRatePct: 0 },
      { tenureMonths: 12, annualRatePct: 0 },
      { tenureMonths: 18, annualRatePct: 0 },
    ],
    variants: [
      {
        id: "v_aws11_42_gps",
        label: "42mm · GPS",
        sublabel: "42mm aluminium · GPS",
        attributes: [
          { name: "Case", value: "42 mm" },
          { name: "Connectivity", value: "GPS" },
        ],
        price: 46900,
        mrp: 49900,
        inStock: true,
      },
      {
        id: "v_aws11_46_gps",
        label: "46mm · GPS",
        sublabel: "46mm aluminium · GPS",
        attributes: [
          { name: "Case", value: "46 mm" },
          { name: "Connectivity", value: "GPS" },
        ],
        price: 49900,
        mrp: 52900,
        inStock: true,
      },
      {
        id: "v_aws11_46_cell",
        label: "46mm · Cellular",
        sublabel: "46mm aluminium · GPS + Cellular",
        attributes: [
          { name: "Case", value: "46 mm" },
          { name: "Connectivity", value: "GPS + Cellular" },
        ],
        price: 59900,
        mrp: 62900,
        inStock: true,
      },
    ],
  },

  {
    id: "p_galaxy_watch_8",
    slug: "samsung-galaxy-watch-8",
    name: "Galaxy Watch 8",
    brand: "Samsung",
    categorySlug: "wearables",
    tagline: "Squircle design, Wear OS 6, antioxidant index.",
    description:
      "The Galaxy Watch 8 moves to a cushion 'squircle' case, runs Wear OS 6 with One UI Watch 8 " +
      "and adds an antioxidant-index reading alongside the BioActive sensor suite.",
    image: img("samsung-galaxy-watch-8"),
    images: [img("samsung-galaxy-watch-8", 1)],
    startingPrice: 32999,
    mrp: 36999,
    badges: ["0% interest", "Instant approval", "No down payment"],
    rating: { value: 4.3, count: 402 },
    inStock: true,
    highlights: [
      "Wear OS 6, One UI Watch 8",
      "BioActive sensor",
      "Antioxidant index",
      "Sapphire crystal glass",
    ],
    specs: [
      {
        group: "Health",
        items: [
          { label: "Sensors", value: "HR, ECG, BIA, SpO2" },
          { label: "New", value: "Antioxidant index" },
        ],
      },
    ],
    soldBy: { name: "1Fi Marketplace", note: "Fulfilled by 1Fi · Delivered in 3–5 days" },
    planConfigs: NO_COST_4,
    variants: [
      {
        id: "v_gw8_40",
        label: "40mm",
        sublabel: "40mm · Bluetooth",
        attributes: [{ name: "Case", value: "40 mm" }],
        price: 32999,
        mrp: 36999,
        inStock: true,
      },
      {
        id: "v_gw8_44",
        label: "44mm",
        sublabel: "44mm · Bluetooth",
        attributes: [{ name: "Case", value: "44 mm" }],
        price: 36999,
        mrp: 40999,
        inStock: true,
      },
    ],
  },

  {
    id: "p_re_classic_350",
    slug: "royal-enfield-classic-350",
    name: "Royal Enfield Classic 350",
    brand: "Royal Enfield",
    categorySlug: "bikes",
    tagline: "349cc J-series single, timeless post-war styling.",
    description:
      "The Classic 350 is built on Royal Enfield's J-series platform with a 349cc air-oil-cooled " +
      "single making 20.2 bhp. Prices shown are ex-showroom and exclude registration and " +
      "insurance.",
    image: img("royal-enfield-classic-350"),
    images: [img("royal-enfield-classic-350", 1), img("royal-enfield-classic-350", 2)],
    startingPrice: 193000,
    mrp: 193000,
    badges: ["Instant approval", "Ex-showroom price"],
    rating: { value: 4.6, count: 5120 },
    inStock: true,
    highlights: [
      "349cc J-series single",
      "20.2 bhp, 27 Nm",
      "Dual-channel ABS",
      "Tripper navigation (select trims)",
    ],
    specs: [
      {
        group: "Engine",
        items: [
          { label: "Displacement", value: "349 cc" },
          { label: "Power", value: "20.2 bhp @ 6100 rpm" },
          { label: "Torque", value: "27 Nm @ 4000 rpm" },
        ],
      },
      {
        group: "Cycle parts",
        items: [
          { label: "Front brake", value: "300mm disc" },
          { label: "Kerb weight", value: "195 kg" },
        ],
      },
    ],
    soldBy: {
      name: "1Fi Marketplace",
      note: "Ex-showroom · Delivery coordinated with your nearest dealership",
    },
    planConfigs: BIKE_PLANS,
    variants: [
      {
        id: "v_rec350_halcyon",
        label: "Halcyon",
        sublabel: "Halcyon Green · single-channel ABS",
        attributes: [
          { name: "Trim", value: "Halcyon" },
          { name: "Colour", value: "Halcyon Green" },
        ],
        price: 193000,
        inStock: true,
      },
      {
        id: "v_rec350_signals",
        label: "Signals",
        sublabel: "Signals · dual-channel ABS",
        attributes: [
          { name: "Trim", value: "Signals" },
          { name: "Colour", value: "Desert Sand" },
        ],
        price: 208000,
        inStock: true,
      },
      {
        id: "v_rec350_chrome",
        label: "Chrome",
        sublabel: "Chrome · dual-channel ABS",
        attributes: [
          { name: "Trim", value: "Chrome" },
          { name: "Colour", value: "Chrome Bronze" },
        ],
        price: 225000,
        inStock: true,
      },
    ],
  },

  {
    id: "p_re_hunter_350",
    slug: "royal-enfield-hunter-350",
    name: "Royal Enfield Hunter 350",
    brand: "Royal Enfield",
    categorySlug: "bikes",
    tagline: "Roadster stance, lighter frame, city-friendly.",
    description:
      "The Hunter 350 puts the J-series 349cc engine in a shorter, lighter chassis tuned for the " +
      "city. Prices shown are ex-showroom and exclude registration and insurance.",
    image: img("royal-enfield-hunter-350"),
    images: [img("royal-enfield-hunter-350", 1)],
    startingPrice: 150000,
    mrp: 150000,
    badges: ["Instant approval", "Ex-showroom price"],
    rating: { value: 4.5, count: 3344 },
    inStock: true,
    highlights: [
      "349cc J-series single",
      "20.2 bhp, 27 Nm",
      "181 kg kerb weight",
      "17-inch alloys (Metro/Rebel)",
    ],
    specs: [
      {
        group: "Engine",
        items: [
          { label: "Displacement", value: "349 cc" },
          { label: "Power", value: "20.2 bhp @ 6100 rpm" },
        ],
      },
    ],
    soldBy: {
      name: "1Fi Marketplace",
      note: "Ex-showroom · Delivery coordinated with your nearest dealership",
    },
    planConfigs: BIKE_PLANS,
    variants: [
      {
        id: "v_reh350_retro",
        label: "Retro",
        sublabel: "Retro · single-channel ABS",
        attributes: [
          { name: "Trim", value: "Retro Factory" },
          { name: "Colour", value: "Factory Black" },
        ],
        price: 150000,
        inStock: true,
      },
      {
        id: "v_reh350_metro",
        label: "Metro",
        sublabel: "Metro · dual-channel ABS",
        attributes: [
          { name: "Trim", value: "Metro" },
          { name: "Colour", value: "Dapper Grey" },
        ],
        price: 165000,
        inStock: true,
      },
      {
        id: "v_reh350_rebel",
        label: "Rebel",
        sublabel: "Rebel · dual-channel ABS",
        attributes: [
          { name: "Trim", value: "Rebel" },
          { name: "Colour", value: "Rebel Blue" },
        ],
        price: 175000,
        inStock: false,
      },
    ],
  },
];

export const PRODUCTS_BY_SLUG = new Map(PRODUCTS.map((p) => [p.slug, p]));
