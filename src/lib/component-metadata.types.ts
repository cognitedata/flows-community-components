/**
 * Shared types for component metadata files.
 *
 * Each component's metadata file (e.g., button.metadata.ts) should use these
 * types to ensure consistency across all components.
 */

/** Reference to a story to display in the docs page */
export interface DocsStory {
  /** The export name of the story in the stories file */
  storyKey: string;
  /** Human-readable title for the docs page */
  title: string;
  /** Description shown below the title */
  description: string;
}

/** A code example for the documentation */
export interface CodeExample {
  /** Title of the code example */
  title: string;
  /** Optional description */
  description?: string;
  /** The actual code string */
  code: string;
}

/** Component metadata structure */
export interface ComponentMetadata {
  /** Display name of the component */
  name: string;
  /** Brief description of the component's purpose */
  description: string;
  /** Instructions for LLMs on how to use this component */
  llmUsage?: string;
  /** Import path for the component */
  importPath?: string;
  /** Stories to display in the docs page */
  docsStories?: DocsStory[];
  /** Code examples for documentation */
  codeExamples?: CodeExample[];
}
