import { openai } from "@ai-sdk/openai";
import { streamText, UIMessage, convertToModelMessages, stepCountIs } from "ai";
import { getComponentsPrompt } from "@/lib/ai/get-components.prompt";
import { getComponentTool } from "@/lib/ai/tools/get-component.tool";

export async function POST(req: Request) {
  const { messages }: { messages: UIMessage[] } = await req.json();

  const tools = {
    getComponent: getComponentTool,
  };

  const result = streamText({
    model: openai("gpt-5"),
    providerOptions: {
      openai: {
        reasoningSummary: "auto",
        reasoningEffort: "low",
      },
    },
    system: getComponentsPrompt,
    messages: convertToModelMessages(messages),
    stopWhen: stepCountIs(5),
    tools,
  });

  return result.toUIMessageStreamResponse({
    sendReasoning: true,
  });
}
