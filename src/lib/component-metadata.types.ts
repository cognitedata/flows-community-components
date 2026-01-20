/**
 * Shared types for component metadata files.
 *
 * Each component's metadata file (e.g., button.metadata.ts) should use these
 * types to ensure consistency across all components.
 */

/** A code example for the documentation */
export interface CodeExample {
  /** Title of the code example */
  title: string;
  /** Optional description */
  description?: string;
  /** The actual code string */
  code: string;
}
