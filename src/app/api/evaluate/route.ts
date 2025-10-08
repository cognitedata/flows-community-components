import { openai } from "@ai-sdk/openai";
import {
  convertToModelMessages,
  createUIMessageStream,
  createUIMessageStreamResponse,
  generateText,
  stepCountIs,
  streamText,
  tool,
  UIMessage,
} from "ai";
import { NextRequest } from "next/server";
import { criteriaTable } from "@/server/db/schema";
import db from "@/server/db";
import { shiftApp } from "@/lib/evaluations/shift-app";
import { getComponentsPrompt } from "@/lib/ai/get-components.prompt";
import { getComponentTool } from "@/lib/ai/tools/get-component.tool";

export type EvaluationUIMessage = UIMessage<{
  status: {
    message: string;
    status: "running-evaluation" | "done";
  };
  generatedCode: {
    code: string;
  };
}>;

export async function POST(request: NextRequest) {
  const criteria = await db.select().from(criteriaTable);

  const system = `
You are an impartial UI code reviewer. Compare the candidate code to the reference implementation and highlight key differences, missing elements, and any improvements.

Return a concise evaluation with the following sections:
- Summary: brief overview of how closely the candidate matches the reference.
- Missing Elements: bullet list of notable components or behaviours absent in the candidate.
- Divergences: bullet list of structural or stylistic differences.
- Suggestions: bullet list of the most important adjustments the candidate should make.

Criteria:
${criteria
  .map((criterion) => `${criterion.name}: ${criterion.description}`)
  .join("\n")}
`;

  const stream = createUIMessageStream<EvaluationUIMessage>({
    execute: async ({ writer }) => {
      // 1. Send initial status (transient - won't be added to message history)
      writer.write({
        type: "data-status",
        data: {
          message: "Generating code...",
          status: "running-evaluation",
        },
      });

      const { text: generatedCode } = await generateText({
        model: openai("gpt-5"),
        system: getComponentsPrompt,
        messages: convertToModelMessages([
          {
            role: "user",
            parts: [
              {
                type: "text",
                text: getComponentsPrompt,
              },
              {
                url: `${
                  process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000"
                }/evaluations/benchmark-1.png"`,
                type: "file",
                filename: "benchmark-1.png",
                mediaType: "image/png",
              },
            ],
          },
        ]),
        tools: {
          getComponent: getComponentTool,
        },
        stopWhen: stepCountIs(5),
      });

      writer.write({
        type: "data-status",
        data: {
          message: "Finished",
          status: "done",
        },
      });

      // 2. Send sources (useful for RAG use cases)
      writer.write({
        type: "data-generated-code",
        data: {
          code: generatedCode,
        },
      });

      const result = streamText({
        model: openai("gpt-5"),
        providerOptions: {
          openai: {
            reasoningSummary: "auto",
            reasoningEffort: "low",
          },
        },
        system,
        messages: convertToModelMessages([
          {
            role: "user",
            parts: [
              {
                text: `
Candidate code (from chat API):\n\`\`\`tsx\n${generatedCode}\n\`\`\`

Reference code (shift-app.ts):\n\`\`\`tsx\n${shiftApp}\n\`\`\`
          `,
                type: "text",
              },
            ],
          },
        ]),
        stopWhen: stepCountIs(5),
      });

      writer.merge(result.toUIMessageStream());
    },
  });

  return createUIMessageStreamResponse({ stream });
}
