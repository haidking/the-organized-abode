/**
 * One-off asset generator: produces branded placeholder images for every recipe.
 * Hero images are 1200x900 JPG (4:3); pin images are 1000x1500 PNG (2:3).
 *
 * Usage: node scripts/generate-images.mjs
 * Requires ImageMagick (magick) with the librsvg delegate for SVG rendering.
 */
import { execFileSync } from "node:child_process";
import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const heroDir = join(root, "public", "images");
const pinDir = join(root, "public", "images", "pins");

// Palette (matches tailwind.config.ts)
const PALETTE = {
  background: "#FAFAF8",
  surface: "#FFFFFF",
  border: "#E8E3DC",
  ink: "#1C1C1A",
  inkSecondary: "#6B6560",
  accent: "#2D6A4F",
  accentLight: "#D8F3DC",
  highlight: "#B5451B",
  highlightSoft: "#FDF0EC",
};

// Per-category accent so cards are visually distinct.
const CATEGORY_ACCENT = {
  copycat: PALETTE.highlight,
  "one-pan": PALETTE.accent,
  drinks: "#5B8A72",
  "meal-prep": PALETTE.accent,
  salads: "#4C7A5A",
  breakfast: "#C77B33",
};

const RECIPES = [
  {
    slug: "viral-cucumber-salad",
    title: "Viral Cucumber Salad",
    subtitle: "3 ingredients. Dangerously addictive.",
    category: "salads",
  },
  {
    slug: "one-pot-creamy-tuscan-chicken-pasta",
    title: "One-Pot Creamy Tuscan Chicken Pasta",
    subtitle: "Ready in 25 minutes",
    category: "one-pan",
  },
  {
    slug: "strawberry-matcha-latte",
    title: "Strawberry Matcha Latte",
    subtitle: "Prettier than the coffee shop's",
    category: "drinks",
  },
  {
    slug: "green-detox-smoothie",
    title: "Green Detox Smoothie",
    subtitle: "5 ingredients. Actually tastes good.",
    category: "drinks",
  },
  {
    slug: "one-pan-tuscan-butter-gnocchi",
    title: "One-Pan Tuscan Butter Gnocchi",
    subtitle: "20 minutes. One pan. Zero effort.",
    category: "one-pan",
  },
  {
    slug: "copycat-crumbl-pink-sugar-cookie",
    title: "Copycat Crumbl Pink Sugar Cookie",
    subtitle: "Soft, thick & better than the original",
    category: "copycat",
  },
  {
    slug: "6-high-protein-breakfasts-meal-prep",
    title: "6 High-Protein Breakfasts",
    subtitle: "Meal Prep Sunday → Eat All Week",
    category: "meal-prep",
  },
  {
    slug: "copycat-ihop-buttermilk-pancakes",
    title: "Copycat IHOP Buttermilk Pancakes",
    subtitle: "Fluffy, thick & ready in 10 minutes",
    category: "breakfast",
  },
  {
    slug: "copycat-dominos-garlic-parmesan-chicken",
    title: "Copycat Domino's Garlic Parmesan Chicken",
    subtitle: "Better Than Delivery",
    category: "copycat",
  },
  {
    slug: "copycat-crumbl-chocolate-chip-cookie",
    title: "Copycat Crumbl Chocolate Chip Cookie",
    subtitle: "Thick, gooey & better than the real thing",
    category: "copycat",
  },
];

function escapeXml(s) {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

/** Greedy word-wrap to `maxChars` per line. */
function wrap(text, maxChars) {
  const words = text.split(" ");
  const lines = [];
  let line = "";
  for (const word of words) {
    if ((line + " " + word).trim().length <= maxChars) {
      line = (line + " " + word).trim();
    } else {
      if (line) lines.push(line);
      line = word;
    }
  }
  if (line) lines.push(line);
  return lines;
}

function textBlock(lines, cx, startY, fontSize, lineHeight, fill, bold) {
  return lines
    .map((line, i) => {
      const dy = i === 0 ? 0 : i * lineHeight;
      return `<text x="${cx}" y="${startY + dy}" font-family="Liberation Serif" font-size="${fontSize}" font-weight="${bold ? "bold" : "normal"}" fill="${fill}" text-anchor="middle">${escapeXml(line)}</text>`;
    })
    .join("\n");
}

function heroSvg(recipe, accent) {
  const W = 1200;
  const H = 900;
  const titleLines = wrap(recipe.title, 20);
  const fontSize = titleLines.some((l) => l.length > 14) ? 72 : 84;
  const titleStartY = 460 - ((titleLines.length - 1) * 92) / 2;

  return `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">
  <rect width="${W}" height="${H}" fill="${PALETTE.background}"/>
  <circle cx="1020" cy="150" r="300" fill="${PALETTE.accentLight}" opacity="0.9"/>
  <circle cx="180" cy="820" r="220" fill="${PALETTE.highlightSoft}"/>
  <rect x="0" y="${H - 26}" width="${W}" height="26" fill="${accent}"/>
  <!-- category pill -->
  <rect x="${W / 2 - 120}" y="120" width="240" height="52" rx="26" fill="${accent}"/>
  <text x="${W / 2}" y="154" font-family="Liberation Sans" font-size="28" font-weight="bold" fill="${PALETTE.surface}" text-anchor="middle">${escapeXml(recipe.category)}</text>
  ${textBlock(titleLines, W / 2, titleStartY, fontSize, 92, PALETTE.ink, true)}
  <text x="${W / 2}" y="620" font-family="Liberation Serif" font-size="34" font-style="italic" fill="${PALETTE.inkSecondary}" text-anchor="middle">${escapeXml(recipe.subtitle)}</text>
  <text x="${W / 2}" y="720" font-family="Liberation Sans" font-size="24" fill="${PALETTE.inkSecondary}" text-anchor="middle" letter-spacing="4">THE ORGANIZED ABODE</text>
</svg>`;
}

function pinSvg(recipe, accent) {
  const W = 1000;
  const H = 1500;
  const titleLines = wrap(recipe.title, 16);
  const fontSize = titleLines.some((l) => l.length > 12) ? 60 : 72;
  const titleStartY = 760 - ((titleLines.length - 1) * 76) / 2;

  return `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">
  <rect width="${W}" height="${H}" fill="${PALETTE.background}"/>
  <circle cx="820" cy="220" r="260" fill="${PALETTE.accentLight}" opacity="0.9"/>
  <circle cx="200" cy="1320" r="260" fill="${PALETTE.highlightSoft}"/>
  <rect x="0" y="${H - 26}" width="${W}" height="26" fill="${accent}"/>
  <!-- category pill -->
  <rect x="${W / 2 - 130}" y="180" width="260" height="56" rx="28" fill="${accent}"/>
  <text x="${W / 2}" y="218" font-family="Liberation Sans" font-size="30" font-weight="bold" fill="${PALETTE.surface}" text-anchor="middle">${escapeXml(recipe.category)}</text>
  ${textBlock(titleLines, W / 2, titleStartY, fontSize, 76, PALETTE.ink, true)}
  <text x="${W / 2}" y="1010" font-family="Liberation Serif" font-size="36" font-style="italic" fill="${PALETTE.inkSecondary}" text-anchor="middle">${escapeXml(recipe.subtitle)}</text>
  <text x="${W / 2}" y="1160" font-family="Liberation Sans" font-size="26" fill="${PALETTE.inkSecondary}" text-anchor="middle" letter-spacing="4">THE ORGANIZED ABODE</text>
</svg>`;
}

mkdirSync(heroDir, { recursive: true });
mkdirSync(pinDir, { recursive: true });

for (const recipe of RECIPES) {
  const accent = CATEGORY_ACCENT[recipe.category] ?? PALETTE.accent;

  const heroSvgPath = join(root, "scripts", `${recipe.slug}.hero.svg`);
  const pinSvgPath = join(root, "scripts", `${recipe.slug}.pin.svg`);
  writeFileSync(heroSvgPath, heroSvg(recipe, accent));
  writeFileSync(pinSvgPath, pinSvg(recipe, accent));

  const heroOut = join(heroDir, `${recipe.slug}.jpg`);
  const pinOut = join(pinDir, `${recipe.slug}.png`);

  // --density so librsvg renders text crisply at target pixel size.
  execFileSync(
    "magick",
    ["-density", "144", heroSvgPath, "-resize", "1200x900^", "-gravity", "center", "-extent", "1200x900", "-quality", "85", heroOut],
    { stdio: "ignore" }
  );
  execFileSync(
    "magick",
    ["-density", "144", pinSvgPath, "-resize", "1000x1500^", "-gravity", "center", "-extent", "1000x1500", pinOut],
    { stdio: "ignore" }
  );

  // clean up temp SVGs
  execFileSync("rm", ["-f", heroSvgPath, pinSvgPath]);

  console.log(`generated ${heroOut}`);
  console.log(`generated ${pinOut}`);
}

console.log("All placeholder images generated.");
