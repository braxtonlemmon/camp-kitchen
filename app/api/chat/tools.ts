import { tool } from "ai";
import { z } from "zod";

const packingListSchema = z.object({
  trip: z.object({
    durationDays: z
      .number()
      .describe("The number of days the camping trip will last."),
    peopleCount: z
      .number()
      .describe(
        "The number of people going on the camping trip. Assume each person is an adult unless specified otherwise.",
      ),
    campingStyle: z
      .enum(["car camping", "backpacking"])
      .describe(
        "A broad split between car campinga and backpacking. Car camping allows for more gear and comfort, while backpacking requires lighter, more compact gear.",
      ),
    cookingMethods: z
      .string()
      .describe(
        'The cooking method(s) availabe to the group, e.g. "campfire", "charcoal", "camp stove", etc.',
      ),
  }),
  meals: z.array(
    z.object({
      name: z.string(),
      category: z
        .enum(["breakfast", "lunch", "dinner", "snack"])
        .describe(
          'Meals should be categorized as "breakfast", "lunch", "dinner", or "snack".',
        ),
    }),
  ),
  cookingGear: z.array(
    z
      .object({
        name: z.string(),
        quantity: z.number(),
      })
      .describe(
        "The cookingGear array should contain the cooking equipment needed for the meals, with realistic quantities based on trip length and group size.",
      ),
  ),
  ingredients: z.array(
    z
      .object({
        name: z.string(),
        quantity: z.string(),
      })
      .describe(
        "The ingredients array should contain all food ingredients needed to prepare the meals, with quantities scaled to the number of people and days.",
      ),
  ),
});

export const generatePackingList = tool({
  description:
    "Generate the final, structured packing list for a single camping trip. Return only data that matches the schema exactly and fill every field with practical, trip-specific values. The trip object should summarize the trip using durationDays, peopleCount, campingStyle, and cookingMethod. The meals array should list the meals the group will actually eat, with each meal categorized as breakfast, lunch, dinner, or snack. The cookingGear array should contain the cooking equipment needed for those meals, with realistic quantities based on trip length and group size. The ingredients array should contain all food ingredients needed to prepare the meals, with quantities scaled to the number of people and days. Keep the list concise but complete, avoid duplicate items, and prefer camping-appropriate choices for the selected camping style and cooking method.",
  inputSchema: packingListSchema,
  execute: async (input) => {
    return input;
  },
});
