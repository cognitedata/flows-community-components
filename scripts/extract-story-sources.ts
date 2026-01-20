#!/usr/bin/env node

/**
 * Standalone script to extract source code from story files.
 *
 * This script can be run directly: npx tsx scripts/extract-story-sources.ts
 * It uses the same extraction logic as the Vite plugin.
 */

import * as fs from "node:fs";
import * as path from "node:path";
import { fileURLToPath } from "node:url";
import { loadCsf } from "@storybook/csf-tools";
import _generate from "@babel/generator";
const generate = (_generate as any).default || _generate;

// Get __dirname equivalent in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const storiesDir = path.join(__dirname, "../src/components/ui/aura");
const outputPath = path.join(__dirname, "../public/story-source-map.json");

interface StorySourceMap {
  [slug: string]: {
    [storyKey: string]: string;
  };
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
        return result;
      }
      return line;
    })
    .join("\n");

  return normalized.trim();
}

/**
 * Extracts JSX from an AST node representing a render function.
 * Handles arrow functions, function expressions, and function declarations.
 */
function extractJSXFromRenderNode(renderNode: any, sourceCode: string): string | null {
  if (!renderNode) return null;

  let jsxNode: any = null;

  // Handle arrow functions: () => JSX or () => { return JSX }
  if (renderNode.type === "ArrowFunctionExpression") {
    const body = renderNode.body;
    if (body.type === "JSXElement" || body.type === "JSXFragment") {
      // Direct JSX: () => <JSX />
      jsxNode = body;
    } else if (body.type === "ParenthesizedExpression") {
      // Wrapped in parens: () => (<JSX />)
      if (body.expression.type === "JSXElement" || body.expression.type === "JSXFragment") {
        jsxNode = body.expression;
      }
    } else if (body.type === "BlockStatement") {
      // Has return: () => { return <JSX /> }
      const returnStmt = body.body.find((stmt: any) => stmt.type === "ReturnStatement");
      if (returnStmt?.argument) {
        const arg = returnStmt.argument;
        if (arg.type === "JSXElement" || arg.type === "JSXFragment") {
          jsxNode = arg;
        } else if (arg.type === "ParenthesizedExpression") {
          if (arg.expression.type === "JSXElement" || arg.expression.type === "JSXFragment") {
            jsxNode = arg.expression;
          }
        }
      }
    }
  }
  // Handle function expressions and declarations: function Name() { return JSX }
  else if (renderNode.type === "FunctionExpression" || renderNode.type === "FunctionDeclaration") {
    const body = renderNode.body;
    if (body.type === "BlockStatement") {
      const returnStmt = body.body.find((stmt: any) => stmt.type === "ReturnStatement");
      if (returnStmt?.argument) {
        const arg = returnStmt.argument;
        if (arg.type === "JSXElement" || arg.type === "JSXFragment") {
          jsxNode = arg;
        } else if (arg.type === "ParenthesizedExpression") {
          if (arg.expression.type === "JSXElement" || arg.expression.type === "JSXFragment") {
            jsxNode = arg.expression;
          }
        }
      }
    }
  }

  if (jsxNode) {
    try {
      const generated = generate(jsxNode, {
        retainLines: false,
        compact: false,
      }, sourceCode);
      return normalizeIndentation(generated.code);
    } catch (error) {
      console.error("Failed to generate code from AST node:", error);
      return null;
    }
  }

  return null;
}

/**
 * Extracts source code for all stories in a story file using CSF Tools.
 */
function extractStorySources(filePath: string): Record<string, string> {
  const content = fs.readFileSync(filePath, "utf-8");
  const sources: Record<string, string> = {};

  try {
    // Parse the CSF file using Storybook's official parser
    const csf = loadCsf(content, {
      fileName: filePath,
      makeTitle: (title) => title,
    });

    // Parse the file to get AST
    csf.parse();

    // Get the AST to traverse story exports
    // The AST is a File node, which has a program property with the body
    const ast = csf._ast as any;
    const program = ast?.program;
    if (!program || !program.body) {
      return sources;
    }

    // Find all story exports: export const StoryName: Story = { ... }
    const storyExports = program.body.filter(
      (node: any) =>
        node.type === "ExportNamedDeclaration" &&
        node.declaration?.type === "VariableDeclaration"
    );

    for (const exportNode of storyExports) {
      const declaration = exportNode.declaration;
      const storyVar = declaration.declarations[0];
      const storyKey = storyVar?.id?.name;

      if (!storyKey) continue;

      // Get the story's initializer (the object or function)
      const init = storyVar.init;
      if (!init) continue;

      let renderNode: any = null;

      // Story is an object: { render: ..., args: ... }
      if (init.type === "ObjectExpression") {
        const renderProperty = init.properties.find(
          (prop: any) =>
            (prop.key?.name === "render" || prop.key?.value === "render") &&
            prop.type === "ObjectProperty"
        );
        if (renderProperty?.value) {
          renderNode = renderProperty.value;
        }
      }
      // Story is directly a function (less common)
      else if (
        init.type === "ArrowFunctionExpression" ||
        init.type === "FunctionExpression"
      ) {
        renderNode = init;
      }

      if (renderNode) {
        const sourceCode = extractJSXFromRenderNode(renderNode, content);
        if (sourceCode) {
          sources[storyKey] = sourceCode;
        }
      }
    }
  } catch (error) {
    console.error(`Failed to parse CSF file ${filePath}:`, error);
  }

  return sources;
}

/**
 * Main function to extract all story sources.
 */
function extractAllStorySources(): StorySourceMap {
  const sourceMap: StorySourceMap = {};

  if (!fs.existsSync(storiesDir)) {
    console.warn(`Stories directory not found: ${storiesDir}`);
    return sourceMap;
  }

  const entries = fs.readdirSync(storiesDir, { withFileTypes: true });
  console.log(`Found ${entries.length} entries in ${storiesDir}`);

  for (const entry of entries) {
    if (!entry.isDirectory()) {
      continue;
    }

    const componentDir = path.join(storiesDir, entry.name);
    const storiesFile = path.join(componentDir, `${entry.name}.stories.tsx`);

    if (!fs.existsSync(storiesFile)) {
      continue;
    }

    try {
      const sources = extractStorySources(storiesFile);
      if (Object.keys(sources).length > 0) {
        sourceMap[entry.name] = sources;
        console.log(`✓ Extracted ${Object.keys(sources).length} stories from ${entry.name}`);
      } else {
        console.log(`⚠ No sources extracted from ${entry.name} (stories may not have render functions)`);
      }
    } catch (error) {
      console.error(`✗ Failed to extract sources from ${entry.name}:`, error);
    }
  }

  return sourceMap;
}

/**
 * Write the source map to the output file.
 */
function writeSourceMap(sourceMap: StorySourceMap): void {
  // Ensure public directory exists
  const publicDir = path.dirname(outputPath);
  if (!fs.existsSync(publicDir)) {
    fs.mkdirSync(publicDir, { recursive: true });
  }

  // Write the source map as formatted JSON
  fs.writeFileSync(outputPath, JSON.stringify(sourceMap, null, 2), "utf-8");
  console.log(`\n✓ Source map written to ${outputPath}`);
  console.log(`  Total components: ${Object.keys(sourceMap).length}`);
  console.log(
    `  Total stories: ${Object.values(sourceMap).reduce((sum, stories) => sum + Object.keys(stories).length, 0)}`
  );
}

// Run extraction if called directly
const isMainModule = import.meta.url === `file://${process.argv[1]}`;
if (isMainModule) {
  console.log("Extracting story sources...\n");
  const sourceMap = extractAllStorySources();
  writeSourceMap(sourceMap);
}

export { extractAllStorySources, writeSourceMap, type StorySourceMap };
