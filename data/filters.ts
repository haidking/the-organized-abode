import { Recipe } from "./types";
import type { MealType, Dietary, ProteinLevel, PrepBucket } from "./types";

// UI vocabulary — single source of truth for filter labels
export const MEAL_TYPES: MealType[] = ["breakfast", "lunch", "dinner", "snack", "drink", "dessert"];
export const MEAL_TYPE_LABELS: Record<MealType, string> = {
  breakfast: "Breakfast",
  lunch: "Lunch",
  dinner: "Dinner",
  snack: "Snack",
  drink: "Drink",
  dessert: "Dessert",
};

export const DIETARY: Dietary[] = ["vegan", "vegetarian", "high-protein"];
export const DIETARY_LABELS: Record<Dietary, string> = {
  vegan: "Vegan",
  vegetarian: "Vegetarian",
  "high-protein": "High-Protein",
};

export const PROTEIN_LEVELS: ProteinLevel[] = ["low", "medium", "high"];
export const PROTEIN_LEVEL_LABELS: Record<ProteinLevel, string> = {
  low: "Low",
  medium: "Medium",
  high: "High",
};

export const PREP_BUCKETS: { key: PrepBucket; label: string; max: number }[] = [
  { key: "under-10", label: "Under 10 min", max: 10 },
  { key: "under-20", label: "Under 20 min", max: 20 },
  { key: "under-30", label: "Under 30 min", max: 30 },
  { key: "over-30", label: "30+ min", max: Infinity },
];

export function prepMinutes(r: Recipe): number {
  const m = r.prepTime.match(/(\d+)/);
  return m ? +m[1] : 99;
}

export function prepBucket(r: Recipe): PrepBucket {
  const m = prepMinutes(r);
  return m <= 10 ? "under-10" : m <= 20 ? "under-20" : m <= 30 ? "under-30" : "over-30";
}

export function mealTypes(r: Recipe): MealType[] {
  const t = r.tags.map((x) => x.toLowerCase());
  const out: MealType[] = [];
  if (t.includes("breakfast") || r.category === "breakfast") out.push("breakfast");
  if (t.includes("lunch")) out.push("lunch");
  if (t.includes("dinner") || r.category === "one-pan" || r.category === "mains") out.push("dinner");
  if (t.includes("snack")) out.push("snack");
  if (t.includes("dessert") || r.category === "desserts") out.push("dessert");
  if (r.category === "drinks" || t.includes("drink") || t.includes("smoothie") || t.includes("latte"))
    out.push("drink");
  return out.length ? out : ["dinner"]; // sensible default
}

export function dietary(r: Recipe): Dietary[] {
  const t = r.tags.map((x) => x.toLowerCase());
  const out: Dietary[] = [];
  if (t.includes("vegan")) out.push("vegan");
  if (t.includes("vegetarian")) out.push("vegetarian");
  if (t.includes("high-protein") || (r.proteinGrams && r.proteinGrams >= 20)) out.push("high-protein");
  return out;
}

export function proteinLevel(r: Recipe): ProteinLevel {
  if (r.proteinGrams == null) return "low";
  return r.proteinGrams >= 30 ? "high" : r.proteinGrams >= 15 ? "medium" : "low";
}
