/**
 * Processes markdown content to inject code examples from the component examples registry.
 * Replaces <!-- example:exampleId --> comments with the actual code from the registry.
 * This runs on the server side and only accesses the code strings, not the component functions.
 * 
 * @param markdownContent - The raw markdown content with placeholders
 * @param componentSlug - The component slug (e.g., "accordion", "button")
 * @returns Processed markdown with code examples injected
 */
export async function processMarkdownExamples(
  markdownContent: string,
  componentSlug: string
): Promise<string> {
  let processedContent = markdownContent;

  // Dynamically import the examples module to get the code strings
  try {
    // Convert slug to camelCase for the export name (e.g., "alert-dialog" -> "alertDialog")
    const camelCaseSlug = componentSlug.replace(/-([a-z])/g, (_, letter) => letter.toUpperCase());
    const examplesModule = await import(`./component-examples/${componentSlug}.examples`);
    const examples = examplesModule[`${camelCaseSlug}Examples`];
    
    if (examples) {
      // Replace <!-- example:id --> with the code from the registry
      for (const exampleId in examples) {
        const example = examples[exampleId];
        if (example && example.code) {
          const placeholder = `<!-- example:${exampleId} -->`;
          const codeBlock = `\`\`\`tsx\n${example.code}\n\`\`\``;
          
          processedContent = processedContent.replace(placeholder, codeBlock);
        }
      }
    }
  } catch (error) {
    // If the examples file doesn't exist or can't be imported, just return the original content
    console.warn(`Could not load examples for ${componentSlug}:`, error);
  }

  return processedContent;
}
