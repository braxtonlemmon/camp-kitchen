import {
  convertToModelMessages,
  createUIMessageStreamResponse,
  isStepCount,
  streamText,
  toUIMessageStream,
} from "ai";

import { generatePackingList } from "./tools";

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();

    const result = streamText({
      model: "openai/gpt-5-mini",
      instructions: `You are an expert at planning and creating packing lists for camping meals. Focus on gathering information about the trip by asking questions to the user ONE AT A TIME about:
        - trip duration (suggest the user specify number of each meal)
        - number of people
        - camping style (car camping vs backpacking)
        - cooking method (campfire, charcoal, camp stove, etc) 
        Then, once you think you have enough information, call the generatePackingList tool. Do not call the tool until you have at least the basics (duration, group size, camping style, cooking method).`,
      messages: await convertToModelMessages(messages),
      tools: { generatePackingList },
      stopWhen: isStepCount(8),
    });

    return createUIMessageStreamResponse({
      stream: toUIMessageStream({
        stream: result.stream,
        onError: (error) => {
          console.error("Chat stream error:", error);
          return "Something went wrong while generating the chat response. Please try again.";
        },
      }),
    });
  } catch (error) {
    console.error("Chat API error:", error);
    return new Response(
      JSON.stringify({
        error: "Failed to process chat request",
        details: error instanceof Error ? error.message : "Unknown error",
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      },
    );
  }
}
