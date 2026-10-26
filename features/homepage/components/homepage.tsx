"use client";
import { useChat } from "@ai-sdk/react";
import { useState } from "react";

import PackingList from "@/features/homepage/components/packing-list";
import { ChatMessage } from "@/features/homepage/types/chat-message";

export default function Homepage() {
  const [userInput, setUserInput] = useState("");
  const { messages, sendMessage, status } = useChat<ChatMessage>();

  const isLoading = status === "streaming" || status === "submitted";

  return (
    <div className="flex flex-col gap-4 w-full">
      {messages.map((message) => (
        <div key={message.id} className="whitespace-pre-wrap">
          {message.role === "user" ? "User: " : "AI: "}
          {message.parts.map((part, i) => {
            switch (part.type) {
              case "text":
                return <div key={`${message.id}-${i}`}>{part.text}</div>;
              case "tool-generatePackingList":
                if (part.state === "output-available" && part.output) {
                  return <PackingList key={`${message.id}-${i}`} part={part} />;
                }
                return null;
              default:
                return null;
            }
          })}
        </div>
      ))}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          sendMessage({ text: userInput });
          setUserInput("");
        }}
      >
        <textarea
          className="w-full border border-gray-300 p-2 resize-none field-sizing-content min-h-[5lh] max-h-[10lh] max-w-4xl mx-auto bg-white rounded-xl"
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
          placeholder="Type your message..."
          rows={1}
          disabled={isLoading}
        />
        <button type="submit" disabled={isLoading}>
          Submit
        </button>
      </form>
    </div>
  );
}
