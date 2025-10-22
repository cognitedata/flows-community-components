import { getComponentExamples } from "./component-examples";

/**
 * Processes markdown content to inject code examples from the component examples registry.
 * Replaces <!-- example:exampleId --> comments with the actual code from the registry.
 * 
 * @param markdownContent - The raw markdown content with placeholders
 * @param componentSlug - The component slug (e.g., "accordion", "button")
 * @returns Processed markdown with code examples injected
 */
export function processMarkdownExamples(
  markdownContent: string,
  componentSlug: string
): string {
  const examples = getComponentExamples(componentSlug);
  
  if (!examples) {
    return markdownContent;
  }

  let processedContent = markdownContent;

  // Replace <!-- example:id --> with the code from the registry
  for (const exampleId in examples) {
    const example = examples[exampleId];
    const placeholder = `<!-- example:${exampleId} -->`;
    const codeBlock = `\`\`\`tsx\n${example.code}\n\`\`\``;
    
    processedContent = processedContent.replace(placeholder, codeBlock);
  }

  return processedContent;
}
