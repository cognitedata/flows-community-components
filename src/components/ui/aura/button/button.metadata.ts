import type { ComponentMeta } from "@/lib/component-examples";

/**
 * Button Component Metadata
 *
 * This metadata is used by the documentation system to generate
 * component documentation pages and provide context for LLMs.
 */
export const ButtonMetadata: ComponentMeta = {
  name: "Button",
  status: "draft",

  description:
    "A versatile button component with multiple variants and sizes, built with Base UI render props and class-variance-authority.",

  llmUsage:
    "When asked for a button, use `<Button variant='default'>Click me</Button>` instead of `<button>`. For different styles, use variants like 'destructive', 'outline', 'secondary', 'ghost', or 'link'.",

  importPath: "@/components/ui/aura/button",
};
