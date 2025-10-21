import { openai } from "@ai-sdk/openai";
import {
  convertToModelMessages,
  createUIMessageStream,
  createUIMessageStreamResponse,
  stepCountIs,
  streamText,
  UIMessage,
} from "ai";
import { shiftApp } from "@/lib/evaluations/shift-app";
import { getComponentsPrompt } from "@/lib/ai/get-components.prompt";
import { getComponentTool } from "@/lib/ai/tools/get-component.tool";

const convertImageToBase64 = async (imagePath: string) => {
  const response = await fetch(imagePath);

  if (!response.ok) {
    throw new Error(
      `Failed to fetch image: ${response.status} ${response.statusText}`
    );
  }

  const buffer = Buffer.from(await response.arrayBuffer());

  return `data:image/png;base64,${buffer.toString("base64")}`;
};

export type EvaluationUIMessage = UIMessage<
  never,
  {
    status: {
      message: string;
      status: "running-evaluation" | "done";
    };
    "generated-code": {
      code: string;
    };
  }
>;

export async function POST() {
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

      const ctx: string[] = [];

      const generateStream = streamText({
        model: openai("gpt-5"),
        system: getComponentsPrompt,
        onStepFinish: ({ text }) => {
          ctx.push(text);
          console.log(text);
        },
        messages: convertToModelMessages([
          {
            role: "user",
            parts: [
              {
                type: "text",
                text: "Make this layout",
              },
              {
                url: await convertImageToBase64(
                  `${
                    process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000"
                  }/evaluations/benchmark-1.png`
                ),
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
        stopWhen: stepCountIs(15),
      });

      writer.merge(
        generateStream.toUIMessageStream({
          sendReasoning: true,
        })
      );

      await generateStream.consumeStream();

      writer.write({
        type: "data-status",
        data: {
          message: "Finished",
          status: "done",
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
        system: `
You are an impartial UI code reviewer. Compare the candidate code to the reference implementation and highlight key differences, missing elements, and any improvements.

Return a concise evaluation with the following sections:
- Summary: brief overview of how closely the candidate matches the reference.
- Missing Elements: bullet list of notable components or behaviours absent in the candidate.
- Divergences: bullet list of structural or stylistic differences.
- Suggestions: bullet list of the most important adjustments the candidate should make.

Criteria to evaluate:
1.	Accuracy: How close does it match the example code?
2.	Visual Heirachy: Does the page layout make sense? Are all the components all in the right place
3.	Usage of Cognite components:	Are we using the correct Cognite components, are we using any default ShadCN components where we could be using Cognite ones?

Return each criteria in it's own section header with a conclusion. Score each criterion out of 5 and give an average score at the end.

Return in markdown.
`,
        messages: convertToModelMessages([
          {
            role: "user",
            parts: [
              {
                text: `
                  Candidate code (from chat API):\n\`\`\`tsx\n${ctx.join(
                    "\n"
                  )}\n\`\`\`

                  Reference code (shift-app.tsx):\n\`\`\`tsx\n${shiftApp}\n\`\`\`
                `,
                type: "text",
              },
            ],
          },
        ]),
        stopWhen: stepCountIs(15),
      });

      writer.merge(
        result.toUIMessageStream({
          sendReasoning: true,
        })
      );
    },
  });

  return createUIMessageStreamResponse({ stream });
}
