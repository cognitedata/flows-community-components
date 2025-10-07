"use client";

import { useChat } from "@ai-sdk/react";

export default function EvaluationRunner() {
  const { messages, setMessages } = useChat();

  return (
    <div className="flex flex-col gap-2">
      <div className="flex flex-col gap-2">
        <p>Messages</p>
        <div className="flex flex-col gap-2">
          {messages.map((message) => (
            <div key={message.id}>
              <p>{message.text}</p>
              <p>{message.role}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
