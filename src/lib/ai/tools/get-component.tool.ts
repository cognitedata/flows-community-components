import { tool } from "ai";
import { z } from "zod";

export const getComponentTool = tool({
  description: "Get the code for a Cognite component",
  inputSchema: z.object({
    componentName: z
      .string()
      .describe("The name of the component to get the code for"),
  }),
  execute: async ({ componentName }) => ({
    componentName,
    code: await fetch(
      `${process.env.COGNITE_REGISTRY_URL}/r/${componentName}.json`
    ).then((res) => res.json()),
  }),
});
