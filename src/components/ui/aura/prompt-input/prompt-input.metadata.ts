import type { ComponentMeta } from "@/lib/component-examples";

/**
 * PromptInput Component Metadata
 *
 * This metadata is used by the documentation system to generate
 * component documentation pages and provide context for LLMs.
 */
export const PromptInputMetadata: ComponentMeta = {
  name: "PromptInput",
  status: "draft",
  description:
    "A comprehensive AI chat input component with support for attachments, model selection, speech input, command palettes, and rich formatting.",
  llmUsage:
    "Use `<PromptInputProvider>` to wrap the input, then compose with `<PromptInput>`, `<PromptInputTextarea>`, `<PromptInputSubmit>`, and other sub-components.",
  importPath: "@/components/ui/aura/prompt-input",
};
