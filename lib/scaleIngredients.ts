/* ── Ingredient quantity parser & scaler ──────────────────────────────────
   Parses strings like "1 lb chicken breast", "2 tbsp olive oil", "½ cup rice"
   Returns scaled version with same formatting.
*/

// Unicode fractions → decimal
const FRACTION_MAP: Record<string, number> = {
  "¼": 0.25, "½": 0.5, "¾": 0.75,
  "⅓": 1/3, "⅔": 2/3,
  "⅛": 0.125, "⅜": 0.375, "⅝": 0.625, "⅞": 0.875,
};

// Pattern: optional whole number + optional fraction + optional unit + rest
// Matches: "1", "1½", "½", "2 tbsp", "1 ½ cups", "3 large eggs"
const QUANTITY_REGEX = /^(\s*)(\d+)?\s*([¼½¾⅓⅔⅛⅜⅝⅞])?\s*([a-zA-Z]+)?\s*(.*)$/;

/** Parse a quantity string into { whole, fraction, unit, remainder } */
function parseQuantity(text: string): { value: number; unit: string; remainder: string } | null {
  const trimmed = text.trimStart();
  const match = trimmed.match(/^(\d+)?\s*([¼½¾⅓⅔⅛⅜⅝⅞])?\s*([a-zA-Z]+)?\s*(.*)$/);
  if (!match) return null;

  const [, wholeStr, fractionChar, unit, remainder] = match;
  const whole = wholeStr ? parseInt(wholeStr, 10) : 0;
  const fraction = fractionChar ? FRACTION_MAP[fractionChar] : 0;
  const value = whole + fraction;

  // If no whole and no fraction, it's not a quantity we can scale
  if (whole === 0 && fraction === 0) return null;

  return {
    value,
    unit: unit || "",
    remainder: remainder.trimStart(),
  };
}

/** Format a decimal back to a nice string (uses fractions where possible) */
function formatQuantity(value: number, unit: string): string {
  if (value === 0) return `${unit}`.trim();

  const whole = Math.floor(value);
  const fraction = value - whole;

  // Find closest common fraction
  let fractionStr = "";
  const fractionTolerance = 0.02;
  if (Math.abs(fraction - 0.25) < fractionTolerance) fractionStr = "¼";
  else if (Math.abs(fraction - 0.5) < fractionTolerance) fractionStr = "½";
  else if (Math.abs(fraction - 0.75) < fractionTolerance) fractionStr = "¾";
  else if (Math.abs(fraction - 1/3) < fractionTolerance) fractionStr = "⅓";
  else if (Math.abs(fraction - 2/3) < fractionTolerance) fractionStr = "⅔";
  else if (Math.abs(fraction - 0.125) < fractionTolerance) fractionStr = "⅛";
  else if (Math.abs(fraction - 0.375) < fractionTolerance) fractionStr = "⅜";
  else if (Math.abs(fraction - 0.625) < fractionTolerance) fractionStr = "⅝";
  else if (Math.abs(fraction - 0.875) < fractionTolerance) fractionStr = "⅞";

  let result = "";
  if (whole > 0) result += whole;
  if (fractionStr) result += (whole > 0 ? " " : "") + fractionStr;
  else if (fraction > fractionTolerance) {
    // Fallback: round to 2 decimal places
    result += (whole > 0 ? " " : "") + fraction.toFixed(2).replace(/\.?0+$/, "");
  }

  if (unit) result += " " + unit;
  return result.trim();
}

/** Scale a single ingredient line */
export function scaleIngredient(text: string, multiplier: number): string {
  const parsed = parseQuantity(text);
  if (!parsed) return text; // couldn't parse quantity, return as-is

  const scaledValue = parsed.value * multiplier;
  const formatted = formatQuantity(scaledValue, parsed.unit);
  return formatted + (parsed.remainder ? " " + parsed.remainder : "");
}

/** Scale an array of ingredient lines */
export function scaleIngredients(items: string[], multiplier: number): string[] {
  return items.map(item => scaleIngredient(item, multiplier));
}