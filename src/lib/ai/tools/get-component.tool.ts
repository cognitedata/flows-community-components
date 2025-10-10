import { tool } from "ai";
import { z } from "zod";

export const getComponentTool = tool({
  description: "Get the code for a Cognite component",
  inputSchema: z.object({
    componentName: z
      .string()
      .describe("The name of the component to get the code for"),
  }),
  execute: async ({ componentName }) => {
    try {
      return await fetch(
        `${
          process.env.VERCEL_URL
            ? `https://${process.env.VERCEL_URL}`
            : "http://localhost:3000"
        }/r/${componentName}.json`
      ).then((res) => res.json());
    } catch {
      return "Component does not exist in Cognite registry";
    }
  },
});
