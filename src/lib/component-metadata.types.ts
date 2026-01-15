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

