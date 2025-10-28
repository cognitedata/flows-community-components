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

  // Find all example placeholders before processing
  const examplePlaceholderRegex = /<!-- example:(\w+) -->/g;
  const foundPlaceholders = new Set<string>();
  let match;
  while ((match = examplePlaceholderRegex.exec(markdownContent)) !== null) {
    foundPlaceholders.add(match[1]);
  }

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
          foundPlaceholders.delete(exampleId);
        }
      }
    }
  } catch (error) {
    // If the examples file doesn't exist or can't be imported, log a warning
    console.warn(`Could not load examples for ${componentSlug}:`, error);
  }

  // Check for any unprocessed example placeholders and replace with error messages
  if (foundPlaceholders.size > 0) {
    console.error(
      `⚠️  Missing examples for ${componentSlug}: ${Array.from(foundPlaceholders).join(', ')}`
    );
    
    for (const missingExample of foundPlaceholders) {
      const placeholder = `<!-- example:${missingExample} -->`;
      const errorMessage = `\n> **⚠️ Example Missing**: The example \`${missingExample}\` could not be found for the \`${componentSlug}\` component. Please check that \`src/lib/component-examples/${componentSlug}.examples.tsx\` exports this example.\n`;
      processedContent = processedContent.replace(placeholder, errorMessage);
    }
  }

  // Remove any other HTML comments (non-example ones) to prevent MDX parsing errors
  processedContent = processedContent.replace(/<!--(?! example:)[\s\S]*?-->/g, '');

  return processedContent;
}
