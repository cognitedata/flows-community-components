import { openai } from "@ai-sdk/openai";
import {
  convertToModelMessages,
  stepCountIs,
  streamText,
  type UIMessage,
} from "ai";
import { helpAssistantPrompt } from "@/lib/ai/help-assistant.prompt";
import { getComponentTool } from "@/lib/ai/tools/get-component.tool";

type HelpRequestBody = {
  messages?: UIMessage[];
};

export async function POST(req: Request) {
  const { messages = [] }: HelpRequestBody = await req.json();

  const result = streamText({
    model: openai("gpt-5"),
    temperature: 0.2,
    system: helpAssistantPrompt,
    messages: convertToModelMessages(messages),
    tools: {
      getComponents: getComponentTool,
    },
    providerOptions: {
      openai: {
        reasoningSummary: "auto",
        reasoningEffort: "low",
      },
    },
    stopWhen: stepCountIs(12),
  });

  return result.toUIMessageStreamResponse({
    sendReasoning: true,
  });
}
