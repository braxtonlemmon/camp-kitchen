import { InferUITools, UIMessage } from "ai";

import { generatePackingList } from "@/app/api/chat/tools";

export type ChatMessage = UIMessage<
  never,
  never,
  InferUITools<{ generatePackingList: typeof generatePackingList }>
>;
