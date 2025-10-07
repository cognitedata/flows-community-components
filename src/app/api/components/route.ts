import { openai } from "@ai-sdk/openai";
import {
  streamText,
  UIMessage,
  convertToModelMessages,
  stepCountIs,
  tool,
} from "ai";
import { z } from "zod";

export async function POST(req: Request) {
  const { messages }: { messages: UIMessage[] } = await req.json();

  const tools = {
    getComponent: tool({
      description: "Get the code for a Cognite component",
      inputSchema: z.object({
        componentName: z
          .string()
          .describe(
            "The name of the component to get the code for, this can be either accordion, button, data-grid, modal or sidebar"
          ),
      }),
      execute: async ({ componentName }) => ({
        componentName,
        code: await fetch(
          `${process.env.COGNITE_REGISTRY_URL}/r/${componentName}.json`
        ).then((res) => res.json()),
      }),
    }),
  };

  const result = streamText({
    model: openai("gpt-5"),
    providerOptions: {
      openai: {
        reasoningSummary: "auto",
        reasoningEffort: "low",
      },
    },
    system: `
      Use the getComponent tool to get the components.

      Leave out any MUI libraries imports for now. And avoid using cn utils lib as we can't export yet.

      Return only the tsx code for the UI.
    `,
    messages: convertToModelMessages(messages),
    stopWhen: stepCountIs(5),
    tools,
  });

  return result.toUIMessageStreamResponse({
    sendReasoning: true,
  });
}
