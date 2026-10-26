import { PackingList } from "@/app/api/chat/tools";
import { ShoppingItem } from "@/features/homepage/types/shopping-item";

export function buildShoppingList(meals: PackingList["meals"]): ShoppingItem[] {
  const totals = new Map<string, ShoppingItem>();

  for (const meal of meals) {
    for (const { name, amount, unit } of meal.ingredients) {
      const key = `${name.trim().toLowerCase()}|${unit}`;
      const existing = totals.get(key);
      if (existing) existing.amount += amount;
      else totals.set(key, { name: name.trim().toLowerCase(), unit, amount });
    }
  }

  return [...totals.values()].sort((a, b) => a.name.localeCompare(b.name));
}
