/**
 * Shared utilities for story source extraction.
 * Used by both the Vite plugin and standalone extraction script.
 */

import _generate from "@babel/generator";
import { parse } from "@babel/parser";
import _traverse from "@babel/traverse";

export const traverse = (_traverse as any).default || _traverse;
export const generate = (_generate as any).default || _generate;

/**
 * Babel parser configuration for TypeScript/JSX story files.
 */
export const PARSER_CONFIG = {
  sourceType: "module" as const,
  plugins: ["typescript", "jsx", "decorators-legacy"],
};

/**
 * Babel parser configuration with ranges enabled (for direct source extraction).
 */
export const PARSER_CONFIG_WITH_RANGES = {
  ...PARSER_CONFIG,
  ranges: true,
};

/**
 * Code generation options for preserving formatting.
 */
export const GENERATOR_OPTIONS = {
  retainLines: false,
  compact: false,
  jsescOption: {
    quotes: "double" as const,
  },
};

/**
 * Normalizes indentation by detecting the minimum indentation level
 * and removing it from all lines, so the code starts at column 0.
 * Preserves relative indentation and empty lines.
 */
export function normalizeIndentation(code: string): string {
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

  // If no indentation found (all empty lines), return trimmed
  if (minIndent === Number.POSITIVE_INFINITY) {
    return trimmed;
  }

  // Special case: if first line has no indentation (0) but other lines do,
  // we need to normalize the indented lines. Find the minimum of indented lines.
  if (minIndent === 0) {
    const hasIndentedLines = lines.some((line) => {
      const trimmedLine = line.trim();
      if (trimmedLine.length === 0) return false;
      const indent = line.match(/^(\s*)/)?.[1]?.length ?? 0;
      return indent > 0;
    });

    if (hasIndentedLines) {
      // Find minimum indentation among lines that actually have indentation
      let minIndentedLineIndent = Number.POSITIVE_INFINITY;
      for (const line of lines) {
        const trimmedLine = line.trim();
        if (trimmedLine.length === 0) continue;
        const indent = line.match(/^(\s*)/)?.[1]?.length ?? 0;
        if (indent > 0 && indent < minIndentedLineIndent) {
          minIndentedLineIndent = indent;
        }
      }
      // Use the minimum of indented lines as our base for normalization
      if (minIndentedLineIndent !== Number.POSITIVE_INFINITY) {
        minIndent = minIndentedLineIndent;
      }
    }
  }

  // Remove the minimum indentation from all lines, preserving relative indentation
  // This ensures the first non-empty line starts at column 0
  // Important: Only remove indentation from lines that have at least minIndent spaces
  const normalized = lines
    .map((line) => {
      const trimmedLine = line.trim();
      if (trimmedLine.length === 0) return ""; // Preserve empty lines as empty strings

      // Calculate actual indentation for this line
      const indent = line.match(/^(\s*)/)?.[1]?.length ?? 0;

      // Only remove indentation if this line has at least minIndent spaces
      // This prevents cutting characters from lines that start at column 0
      // Also ensure we don't slice more than the line length
      if (indent >= minIndent && line.length >= minIndent) {
        return line.slice(minIndent);
      }
      // If line has less indentation than minIndent, return as-is (preserves first line at column 0)
      return line;
    })
    .join("\n");

  // Only trim leading/trailing newlines, NOT whitespace from the first/last lines
  return normalized.replace(/^\n+/, "").replace(/\n+$/, "");
}

/**
 * Parses a TypeScript/JSX source file into an AST.
 */
export function parseSource(source: string, withRanges = false) {
  return parse(source, {
    sourceType: "module",
    plugins: ["typescript", "jsx", "decorators-legacy"],
    ...(withRanges && { ranges: true }),
  });
}
