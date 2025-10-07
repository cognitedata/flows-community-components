import { shiftApp } from "@/lib/evaluations/shift-app";
import { openai } from "@ai-sdk/openai";
import { convertToModelMessages, stepCountIs, streamText } from "ai";
import { NextRequest } from "next/server";
import path from "path";
import { promises as fs } from "fs";

async function loadImageDataUrl(): Promise<string> {
  const imagePath = path.resolve("./src/lib/evaluations/image.png");
  const buffer = await fs.readFile(imagePath);
  const base64 = buffer.toString("base64");
  return `data:image/png;base64,${base64}`;
}

export async function POST(request: NextRequest) {
  const { message, generatedCode } = await request.json();

  const imageDataUrl = await loadImageDataUrl();

  // Create a specialized prompt for component generation
  const systemPrompt = `You are an impartial UI code reviewer. Compare the candidate code to the reference implementation and highlight key differences, missing elements, and any improvements.

Return a concise evaluation with the following sections:
- Summary: brief overview of how closely the candidate matches the reference.
- Missing Elements: bullet list of notable components or behaviours absent in the candidate.
- Divergences: bullet list of structural or stylistic differences.
- Suggestions: bullet list of the most important adjustments the candidate should make.

Candidate code (from chat API):\n\`\`\`tsx\n${generatedCode}\n\`\`\`

Reference code (shift-app.ts):\n\`\`\`tsx\n${shiftApp}\n\`\`\``;



  const response = await result.response;
  const text = response.text();

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
