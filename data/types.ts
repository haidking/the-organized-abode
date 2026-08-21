export type Category =
  | "copycat"
  | "one-pan"
  | "drinks"
  | "meal-prep"
  | "salads"
  | "breakfast"
  | "mains"
  | "desserts"
  | "snacks";

// Derived-dimension enums (UI vocab, NOT stored per-recipe)
export type MealType = "breakfast" | "lunch" | "dinner" | "snack" | "drink" | "dessert";
export type Dietary  = "vegan" | "vegetarian" | "high-protein";
export type ProteinLevel = "low" | "medium" | "high";
export type PrepBucket = "under-10" | "under-20" | "under-30" | "over-30";

// Used only by the roundup recipe ("6 High-Protein Breakfasts"). Each entry is
// one mini-recipe rendered as its own card with a protein-count badge.
export interface MealPrepMeal {
  title: string;
  protein: string; // e.g. "32g"
  ingredients: string[];
}

// Used for listicle-style roundup pages (e.g. "10 Lazy Breakfasts", "8 Overnight Oat Flavors").
// Each entry is one numbered item with an optional tip/description and optional ingredient list.
export interface ListItem {
  title: string;
  description?: string;
  ingredients?: string[];
  tip?: string;
}

// Used for multi-variant recipes (e.g. "Crispy Air Fryer Chicken Wings – 6 Sauces").
export interface SauceVariant {
  name: string;
  ingredients: string[];
  note?: string;
}

export interface Recipe {
  slug: string;
  title: string;
  subtitle: string;
  category: Category;
  prepTime: string;
  cookTime?: string;
  totalTime: string;
  servings: number;
  difficulty: "Easy" | "Medium";
  description: string; // 2-3 sentence SEO description
  ingredients: string[];
  equipment: string[]; // tools used — these become affiliate link anchors
  steps: string[];
  tips?: string[]; // 1-2 pro tips pulled from pin text
  affiliateLinks: {
    label: string; // e.g. "Cast iron skillet"
    url: string; // Amazon affiliate URL — leave as placeholder "#"
  }[];
  mealPrep?: MealPrepMeal[]; // present only on the breakfast roundup recipe
  listItems?: ListItem[];    // present on listicle/roundup pages
  sauceVariants?: SauceVariant[]; // present on multi-sauce/variant recipe pages
  tags: string[]; // for SEO and filtering
  datePublished: string; // ISO format
  image: string; // /images/[slug].jpg
  pinImage: string; // the original pin — /images/pins/[slug].png
  metaTitle: string;
  metaDescription: string; // max 155 chars
  // Optional nutrition (per serving) — used by derivation helpers
  calories?: number;
  proteinGrams?: number;
}