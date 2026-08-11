export type Category =
  | "copycat"
  | "one-pan"
  | "drinks"
  | "meal-prep"
  | "salads"
  | "breakfast";

// Used only by the roundup recipe ("6 High-Protein Breakfasts"). Each entry is
// one mini-recipe rendered as its own card with a protein-count badge.
export interface MealPrepMeal {
  title: string;
  protein: string; // e.g. "32g"
  ingredients: string[];
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
  tags: string[]; // for SEO and filtering
  datePublished: string; // ISO format
  image: string; // /images/[slug].jpg
  pinImage: string; // the original pin — /images/pins/[slug].png
  metaTitle: string;
  metaDescription: string; // max 155 chars
}
