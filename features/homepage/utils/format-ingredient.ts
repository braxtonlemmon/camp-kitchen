import { ShoppingItem } from "@/features/homepage/types/shopping-item";

const COUNT_UNITS = new Set(["piece"]);
const PACKAGE_UNITS = new Set(["can", "pack"]);

function formatAmount(n: number) {
  // avoid float noise like 0.30000000000000004
  return Number.isInteger(n) ? String(n) : String(Math.round(n * 100) / 100);
}

export function formatIngredient({ name, amount, unit }: ShoppingItem): string {
  // Countable things: "apple (x4)"
  if (COUNT_UNITS.has(unit)) {
    return `${name} (x${Math.ceil(amount)})`;
  }

  // Packaged things: "tomato sauce (2 cans)"
  if (PACKAGE_UNITS.has(unit)) {
    const n = Math.ceil(amount);
    return `${name} (${n} ${unit}${n === 1 ? "" : "s"})`;
  }

  // Measured things: "400 g pasta"
  return `${formatAmount(amount)} ${unit} ${name}`;
}
