import { composeStories } from "@storybook/react";
import type React from "react";
import { type ComponentType, useEffect, useState } from "react";
import { ExamplePreview } from "./example-preview";

interface StoriesRendererProps {
  slug: string;
}

interface StoryEntry {
  key: string;
  title: string;
  Component: ComponentType;
  sourceCode?: string;
}

// Use import.meta.glob to let Vite know about all stories files at build time
// Using relative path from this file for more reliable resolution
const storiesModules = import.meta.glob("./ui/aura/*/*.stories.tsx");
// Also import raw source files to extract code
const storiesSourceModules = import.meta.glob("./ui/aura/*/*.stories.tsx", { as: "raw" });

/**
 * Converts a PascalCase or camelCase story key to a human-readable title.
 * E.g., "AllVariants" -> "All Variants", "WithLeftIcon" -> "With Left Icon"
 */
function storyKeyToTitle(key: string): string {
  return key
    .replace(/([A-Z])/g, " $1")
    .replace(/^./, (str) => str.toUpperCase())
    .trim();
}

/**
 * Normalizes indentation by detecting the minimum indentation level
 * and removing it from all lines, so the code starts at column 0.
 */
function normalizeIndentation(code: string): string {
  if (!code) return code;

  // First, trim only the leading/trailing newlines but preserve internal structure
  const trimmed = code.replace(/^\n+/, "").replace(/\n+$/, "");
  const lines = trimmed.split("\n");
  if (lines.length === 0) return code.trim();

  // Find the minimum indentation (excluding empty lines)
  let minIndent = Number.POSITIVE_INFINITY;
  for (const line of lines) {
    const trimmedLine = line.trim();
    if (trimmedLine.length === 0) continue; // Skip empty lines
    const indent = line.match(/^(\s*)/)?.[1]?.length ?? 0;
    if (indent < minIndent) {
      minIndent = indent;
    }
  }

  // If no indentation found or all lines start at column 0, return trimmed
  if (minIndent === Number.POSITIVE_INFINITY || minIndent === 0) {
    return trimmed;
  }

  // Remove the minimum indentation from all lines, preserving relative indentation
  const normalized = lines
    .map((line) => {
      const trimmedLine = line.trim();
      if (trimmedLine.length === 0) return "";
      // Only remove up to minIndent characters, don't go negative
      if (line.length >= minIndent) {
        const result = line.slice(minIndent);
        // Preserve the line exactly, including any trailing whitespace that might be meaningful
        return result;
      }
      // If line is shorter than minIndent, preserve it as-is (shouldn't happen normally)
      return line;
    })
    .join("\n");

  // Trim only leading/trailing whitespace from the entire result
  // but preserve internal structure including empty lines
  return normalized.trim();
}

/**
 * Unified renderer for component stories.
 * Dynamically loads and renders all stories from a component's stories file.
 *
 * This is the consolidated renderer that replaces both AIExamplesRenderer
 * and ComponentExamplesRenderer after the migration from .examples.tsx to .stories.tsx.
 */
export function StoriesRenderer({ slug }: StoriesRendererProps) {
  const [stories, setStories] = useState<StoryEntry[] | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function loadStories() {
      // Reset state when slug changes to avoid stale data
      if (!cancelled) {
        setStories(null);
        setError(null);
      }
      // Find the stories module for this slug
      // Path format varies: could be /src/..., @/..., or ../...
      const modulePath = Object.keys(storiesModules).find((path) =>
        path.endsWith(`/${slug}/${slug}.stories.tsx`)
      );

      if (!modulePath) {
        setError(`No stories file found for ${slug}.`);
        return;
      }

      try {
        // Load the stories module
        const storiesModule = await storiesModules[modulePath]();
        // Load the raw source file
        const sourceFile = storiesSourceModules[modulePath]
          ? await (storiesSourceModules[modulePath] as () => Promise<string>)()
          : null;

        // Compose stories using Storybook's portable stories API
        const composed = composeStories(
          storiesModule as Parameters<typeof composeStories>[0]
        ) as Record<string, ComponentType>;

        // Convert to array of story entries with source code
        const storyEntries = Object.entries(composed)
          .map(([key, Component]) => {
          // Access the original story object from the module to extract source code
          // The story exports are directly accessible on the module by their export name
          const originalStory = (storiesModule as Record<string, unknown>)[key] as
            | {
                parameters?: {
                  docs?: {
                    source?: {
                      code?: string;
                    };
                  };
                };
                render?: () => React.ReactElement;
              }
            | undefined;

          // Extract source code from story parameters first
          let sourceCode = originalStory?.parameters?.docs?.source?.code;

          // Fallback: try to extract from raw source file
          if (!sourceCode && sourceFile) {
            try {
              // Ensure we have a valid source file
              if (!sourceFile || typeof sourceFile !== "string") {
                return;
              }
              // Find the story export in the source file
              // Look for: export const StoryName: Story = { ... render: () => ... }
              const storyRegex = new RegExp(
                `export\\s+const\\s+${key}\\s*:\\s*Story\\s*=\\s*\\{([\\s\\S]*?)\\};`,
                "m"
              );
              const storyMatch = sourceFile.match(storyRegex);

              if (storyMatch) {
                const storyContent = storyMatch[1];

                // Find the render property
                const renderIndex = storyContent.indexOf("render:");
                if (renderIndex === -1) {
                  // No render function found, skip this story
                  return;
                }

                // Extract everything from "render:" onwards
                const renderSection = storyContent.slice(renderIndex);

                // Try to extract arrow function: render: () => (...)
                const arrowStart = renderSection.match(/render\s*:\s*\([^)]*\)\s*=>\s*/);
                if (arrowStart) {
                  const startIndex = arrowStart[0].length;
                  let extracted = renderSection.slice(startIndex);

                  // Find the matching closing parenthesis or end of expression
                  // Track depth of parentheses, accounting for strings
                  let depth = 0;
                  let inString = false;
                  let stringChar = "";
                  let endIndex = extracted.length;

                  for (let i = 0; i < extracted.length; i++) {
                    const char = extracted[i];
                    const prevChar = i > 0 ? extracted[i - 1] : "";

                    // Skip escaped characters in strings
                    if (prevChar === "\\" && inString) continue;

                    // Track strings
                    if (!inString && (char === '"' || char === "'" || char === "`")) {
                      inString = true;
                      stringChar = char;
                    } else if (inString && char === stringChar) {
                      inString = false;
                    } else if (!inString) {
                      // Track parentheses
                      if (char === "(") {
                        depth++;
                      } else if (char === ")") {
                        depth--;
                        if (depth === 0) {
                          // Found matching closing paren
                          // Check what comes after - should be comma or end
                          const after = extracted.slice(i + 1).trim();
                          if (
                            after.startsWith(",") ||
                            after === "" ||
                            after.match(/^,\s*\w+\s*:/)
                          ) {
                            endIndex = i + 1;
                            break;
                          }
                        }
                      }
                    }
                  }

                  extracted = extracted.slice(0, endIndex);

                  // Remove wrapping parentheses if present, but preserve indentation
                  const trimmedCheck = extracted.trim();
                  if (trimmedCheck.startsWith("(") && trimmedCheck.endsWith(")")) {
                    // Check if it's a single wrapping paren by checking depth
                    let wrapDepth = 0;
                    let isWrapped = true;
                    for (let i = 1; i < trimmedCheck.length - 1; i++) {
                      if (trimmedCheck[i] === "(") wrapDepth++;
                      else if (trimmedCheck[i] === ")") wrapDepth--;
                      if (wrapDepth < 0) {
                        isWrapped = false;
                        break;
                      }
                    }
                    if (isWrapped && wrapDepth === 0) {
                      // Find the actual opening paren in the original string (preserving leading whitespace)
                      const openParenIndex = extracted.indexOf("(");
                      const closeParenIndex = extracted.lastIndexOf(")");
                      if (
                        openParenIndex !== -1 &&
                        closeParenIndex !== -1 &&
                        closeParenIndex > openParenIndex
                      ) {
                        // Extract content inside parens, preserving leading whitespace before the opening paren
                        const beforeParen = extracted.slice(0, openParenIndex);
                        const insideParens = extracted.slice(openParenIndex + 1, closeParenIndex);
                        // Preserve any leading whitespace that was before the opening paren
                        extracted = beforeParen + insideParens;
                      }
                    }
                  }

                  // Remove trailing comma but preserve leading structure
                  extracted = extracted.replace(/,\s*$/, "");

                  // If it contains JSX, normalize indentation and use it
                  if (extracted?.includes("<") && extracted.includes(">")) {
                    sourceCode = normalizeIndentation(extracted);
                  }
                } else {
                  // Try function declaration: render: function Name() { ... return ... }
                  const functionStartMatch = renderSection.match(/render\s*:\s*function[^{]*\{/);
                  if (functionStartMatch) {
                    const functionStartIndex = functionStartMatch[0].length;
                    let functionBody = renderSection.slice(functionStartIndex);

                    // Find the matching closing brace for the function
                    let braceDepth = 1;
                    let inString = false;
                    let stringChar = "";
                    let functionEndIndex = functionBody.length;

                    for (let i = 0; i < functionBody.length; i++) {
                      const char = functionBody[i];
                      const prevChar = i > 0 ? functionBody[i - 1] : "";

                      // Skip escaped characters in strings
                      if (prevChar === "\\" && inString) continue;

                      // Track strings
                      if (!inString && (char === '"' || char === "'" || char === "`")) {
                        inString = true;
                        stringChar = char;
                      } else if (inString && char === stringChar) {
                        inString = false;
                      } else if (!inString) {
                        // Track braces
                        if (char === "{") {
                          braceDepth++;
                        } else if (char === "}") {
                          braceDepth--;
                          if (braceDepth === 0) {
                            functionEndIndex = i;
                            break;
                          }
                        }
                      }
                    }

                    functionBody = functionBody.slice(0, functionEndIndex);

                    // Find the return statement and extract everything after it
                    const returnIndex = functionBody.indexOf("return");
                    if (returnIndex !== -1) {
                      let returnContent = functionBody.slice(returnIndex + 6).trim(); // +6 for "return"

                      // Remove semicolon at the end if present
                      returnContent = returnContent.replace(/;\s*$/, "").trim();

                      // Track parentheses to find the complete return value
                      let depth = 0;
                      inString = false;
                      stringChar = "";
                      let endIndex = returnContent.length;

                      // Check if it starts with a parenthesis
                      const trimmed = returnContent.trim();
                      if (trimmed.startsWith("(")) {
                        const startPos = returnContent.indexOf("(");
                        depth = 1;

                        for (let i = startPos + 1; i < returnContent.length; i++) {
                          const char = returnContent[i];
                          const prevChar = i > 0 ? returnContent[i - 1] : "";

                          // Skip escaped characters in strings
                          if (prevChar === "\\" && inString) continue;

                          // Track strings
                          if (!inString && (char === '"' || char === "'" || char === "`")) {
                            inString = true;
                            stringChar = char;
                          } else if (inString && char === stringChar) {
                            inString = false;
                          } else if (!inString) {
                            // Track parentheses
                            if (char === "(") {
                              depth++;
                            } else if (char === ")") {
                              depth--;
                              if (depth === 0) {
                                // Found matching closing paren - extract content inside (excluding the parens)
                                endIndex = i;
                                break;
                              }
                            }
                          }
                        }

                        // Extract content inside parentheses (excluding the opening and closing parens)
                        returnContent = returnContent.slice(startPos + 1, endIndex);
                      } else {
                        // No wrapping paren, find where it ends (before semicolon)
                        const semicolonIndex = returnContent.indexOf(";");
                        if (semicolonIndex !== -1) {
                          returnContent = returnContent.slice(0, semicolonIndex).trim();
                        }
                      }

                      if (returnContent?.includes("<") && returnContent.includes(">")) {
                        sourceCode = normalizeIndentation(returnContent);
                      }
                    }
                  }
                }
              }
            } catch {
              // Ignore errors in source extraction
            }
          }

          return {
            key,
            title: storyKeyToTitle(key),
            Component,
            sourceCode,
          };
        })
          .filter((entry): entry is NonNullable<typeof entry> => entry !== undefined);
        
        const typedStoryEntries: StoryEntry[] = storyEntries;

        if (typedStoryEntries.length === 0) {
          setError(`No stories found in ${slug}.stories.tsx`);
          return;
        }

        if (!cancelled) {
          setStories(typedStoryEntries);
        }
      } catch (err) {
        if (!cancelled) {
          console.error(`Failed to load stories for ${slug}:`, err);
          setError(`Failed to load stories for ${slug}.`);
        }
      }
    }

    loadStories();

    return () => {
      cancelled = true;
    };
  }, [slug]);

  if (error) {
    return (
      <div className="p-6 border rounded-lg bg-destructive/10 text-destructive">
        <p className="text-sm">{error}</p>
      </div>
    );
  }

  if (!stories) {
    return (
      <div className="space-y-6">
        {[1, 2, 3].map((i) => (
          <div key={i} className="h-48 bg-muted/20 rounded-lg animate-pulse" />
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {stories.map(({ key, title, Component, sourceCode }) => (
        <ExamplePreview
          key={key}
          title={title}
          component={() => <Component />}
          sourceCode={sourceCode}
        />
      ))}
    </div>
  );
}
