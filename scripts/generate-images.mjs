#!/usr/bin/env node
/**
 * Generate 1x1 transparent PNG placeholders for all recipe slugs
 * that don't already have an image file. Run with: node scripts/generate-images.mjs
 *
 * This prevents next/image 404s during build when real photos haven't been added yet.
 * The RecipeImage component will show a branded gradient fallback anyway.
 */

import { writeFileSync, existsSync, mkdirSync } from "fs";
import { recipes } from "../data/recipes.js";

const IMAGES_DIR = "./public/images";
const PINS_DIR = "./public/images/pins";

// 1x1 transparent PNG (base64)
const TRANSPARENT_PNG = Buffer.from(
  "iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==",
  "base64"
);

function ensureDir(dir) {
  if (!existsSync(dir)) {
    mkdirSync(dir, { recursive: true });
  }
}

function main() {
  ensureDir(IMAGES_DIR);
  ensureDir(PINS_DIR);

  let created = 0;
  let skipped = 0;

  for (const recipe of recipes) {
    const slug = recipe.slug;
    const heroPath = `${IMAGES_DIR}/${slug}.jpg`;
    const pinPath = `${PINS_DIR}/${slug}.png`;

    if (!existsSync(heroPath)) {
      writeFileSync(heroPath, TRANSPARENT_PNG);
      created++;
      console.log(`Created placeholder: ${heroPath}`);
    } else {
      skipped++;
    }

    if (!existsSync(pinPath)) {
      writeFileSync(pinPath, TRANSPARENT_PNG);
      created++;
      console.log(`Created placeholder: ${pinPath}`);
    } else {
      skipped++;
    }
  }

  console.log(`\nDone. Created: ${created}, Skipped (already exist): ${skipped}`);
}

main();
