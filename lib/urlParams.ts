import { MealType, Dietary, ProteinLevel, PrepBucket } from "@/data/types";

export interface Filters {
  q: string;
  category: string; // "" = all
  mealType: MealType[];
  dietary: Dietary[];
  protein: ProteinLevel | "";
  prep: PrepBucket | "";
}

export const EMPTY_FILTERS: Filters = {
  q: "",
  category: "",
  mealType: [],
  dietary: [],
  protein: "",
  prep: "",
};

/** Read filter state from a URLSearchParams (server or client). */
export function parseFilters(params: URLSearchParams): Filters {
  const csv = (key: string): string[] =>
    (params.get(key) ?? "")
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean);

  const protein = (params.get("protein") ?? "").trim() as ProteinLevel | "";
  const prep = (params.get("prep") ?? "").trim() as PrepBucket | "";

  return {
    q: params.get("q") ?? "",
    category: params.get("category") ?? "",
    mealType: csv("mealType") as MealType[],
    dietary: csv("dietary") as Dietary[],
    protein: ["low", "medium", "high"].includes(protein) ? protein : "",
    prep: ["under-10", "under-20", "under-30", "over-30"].includes(prep) ? prep : "",
  };
}

/** Serialize filters back to a query string (omitting empty values). */
export function buildQuery(filters: Filters): string {
  const sp = new URLSearchParams();
  if (filters.q) sp.set("q", filters.q);
  if (filters.category) sp.set("category", filters.category);
  if (filters.mealType.length) sp.set("mealType", filters.mealType.join(","));
  if (filters.dietary.length) sp.set("dietary", filters.dietary.join(","));
  if (filters.protein) sp.set("protein", filters.protein);
  if (filters.prep) sp.set("prep", filters.prep);
  return sp.toString();
}

/** Human-readable count of active facets (excluding the free-text query). */
export function activeFilterCount(filters: Filters): number {
  return (
    (filters.category ? 1 : 0) +
    filters.mealType.length +
    filters.dietary.length +
    (filters.protein ? 1 : 0) +
    (filters.prep ? 1 : 0)
  );
}
