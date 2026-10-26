import { ChatMessage } from "@/features/homepage/types/chat-message";
import { buildShoppingList } from "@/features/homepage/utils/build-shopping-list";
import { formatIngredient } from "@/features/homepage/utils/format-ingredient";

type PackingListPart = Extract<
  ChatMessage["parts"][number],
  { type: "tool-generatePackingList"; state: "output-available" }
>;
type PackingListProps = {
  part: PackingListPart;
};

export default function PackingList({ part }: PackingListProps) {
  const shoppingList = buildShoppingList(part.output.meals);

  return (
    <div className="flex flex-col gap-2">
      <h2 className="font-bold">Packing list</h2>
      <p>
        {part.output.trip.durationDays} days for {part.output.trip.peopleCount}{" "}
        people ({part.output.trip.campingStyle},{" "}
        {part.output.trip.cookingMethods})
      </p>
      <h3 className="font-semibold">Meals</h3>
      <ul className="list-disc pl-5">
        {part.output.meals.map((meal) => (
          <li key={`${meal.category}-${meal.name}`}>
            {meal.name} ({meal.category})
          </li>
        ))}
      </ul>
      <h3 className="font-semibold">Cooking gear</h3>
      <ul className="list-disc pl-5">
        {part.output.cookingGear.map((item) => (
          <li key={item.name}>
            {item.quantity} x {item.name}
          </li>
        ))}
      </ul>
      <h3 className="font-semibold">Ingredients</h3>
      <ul className="list-disc pl-5">
        {shoppingList.map((item) => (
          <li key={item.name}>{formatIngredient(item)}</li>
        ))}
      </ul>
    </div>
  );
}
