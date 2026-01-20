/**
 * Vite plugin to inject story source code at build time.
 *
 * This plugin extracts JSX from story render functions and injects
 * the source code directly into story parameters.docs.source.code.
 */

import type { Plugin } from "vite";
import { parse } from "@babel/parser";
import _traverse from "@babel/traverse";
import _generate from "@babel/generator";
import * as t from "@babel/types";

const traverse = (_traverse as any).default || _traverse;
const generate = (_generate as any).default || _generate;


/**
 * Normalizes indentation by detecting the minimum indentation level
 * and removing it from all lines, so the code starts at column 0.
 */
function normalizeIndentation(code: string): string {
  if (!code) return code;

  const trimmed = code.replace(/^\n+/, "").replace(/\n+$/, "");
  const lines = trimmed.split("\n");
  if (lines.length === 0) return code.trim();

  let minIndent = Number.POSITIVE_INFINITY;
  for (const line of lines) {
    const trimmedLine = line.trim();
    if (trimmedLine.length === 0) continue;
    const indent = line.match(/^(\s*)/)?.[1]?.length ?? 0;
    if (indent < minIndent) {
      minIndent = indent;
    }
  }

  if (minIndent === Number.POSITIVE_INFINITY || minIndent === 0) {
    return trimmed;
  }

  const normalized = lines
    .map((line) => {
      const trimmedLine = line.trim();
      if (trimmedLine.length === 0) return "";
      if (line.length >= minIndent) {
        return line.slice(minIndent);
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
 * Injects source code into story parameters at build time.
 */
function injectSourceCode(code: string, id: string): string | null {
  // Only process story files
  if (!id.includes(".stories.tsx") && !id.includes(".stories.ts")) {
    return null;
  }

  try {
    const ast = parse(code, {
      sourceType: "module",
      plugins: ["typescript", "jsx", "decorators-legacy"],
    });

    const sources: Record<string, string> = {};

    // First pass: extract all source codes
    traverse(ast, {
      ExportNamedDeclaration(path: any) {
        const { node } = path;
        if (node.declaration?.type !== "VariableDeclaration") return;

        const declaration = node.declaration;
        const storyVar = declaration.declarations[0];
        const storyKey = storyVar?.id?.name;

        if (!storyKey) return;

        const init = storyVar.init;
        if (!init) return;

        let renderNode: any = null;

        if (init.type === "ObjectExpression") {
          const renderProperty = init.properties.find(
            (prop: any) =>
              (prop.key?.name === "render" || prop.key?.value === "render") &&
              prop.type === "ObjectProperty"
          );
          renderNode = renderProperty?.value || null;
        } else if (
          init.type === "ArrowFunctionExpression" ||
          init.type === "FunctionExpression"
        ) {
          renderNode = init;
        }

        if (renderNode) {
          const sourceCode = extractJSXFromRenderNode(renderNode, code);
          if (sourceCode) {
            sources[storyKey] = sourceCode;
          }
        }
      },
    });

    // Second pass: inject source code into parameters
    if (Object.keys(sources).length > 0) {
      traverse(ast, {
        ExportNamedDeclaration(path: any) {
          const { node } = path;
          if (node.declaration?.type !== "VariableDeclaration") return;

          const declaration = node.declaration;
          const storyVar = declaration.declarations[0];
          const storyKey = storyVar?.id?.name;

          if (!storyKey || !sources[storyKey]) return;

          const init = storyVar.init;
          if (!init || init.type !== "ObjectExpression") return;

          // Find or create parameters.docs.source.code
          let parametersProp = init.properties.find(
            (prop: any) =>
              (prop.key?.name === "parameters" || prop.key?.value === "parameters") &&
              prop.type === "ObjectProperty"
          ) as any;

          if (!parametersProp) {
            // Create parameters property
            parametersProp = t.objectProperty(
              t.identifier("parameters"),
              t.objectExpression([])
            );
            init.properties.push(parametersProp);
          }

          const parametersObj = parametersProp.value;
          if (parametersObj.type !== "ObjectExpression") {
            return;
          }

          // Find or create docs property
          const existingDocsProp = parametersObj.properties.find(
            (prop: any) =>
              (prop.key?.name === "docs" || prop.key?.value === "docs") &&
              prop.type === "ObjectProperty"
          ) as any;

          const docsProp = existingDocsProp || t.objectProperty(t.identifier("docs"), t.objectExpression([]));
          if (!existingDocsProp) {
            parametersObj.properties.push(docsProp);
          }

          const docsObj = docsProp.value;
          if (docsObj.type !== "ObjectExpression") {
            return;
          }

          // Find or create source property
          const existingSourceProp = docsObj.properties.find(
            (prop: any) =>
              (prop.key?.name === "source" || prop.key?.value === "source") &&
              prop.type === "ObjectProperty"
          ) as any;

          const sourceProp = existingSourceProp || t.objectProperty(t.identifier("source"), t.objectExpression([]));
          if (!existingSourceProp) {
            docsObj.properties.push(sourceProp);
          }

          const sourceObj = sourceProp.value;
          if (sourceObj.type !== "ObjectExpression") {
            return;
          }

          // Add or update code property
          const codePropIndex = sourceObj.properties.findIndex(
            (prop: any) =>
              (prop.key?.name === "code" || prop.key?.value === "code") &&
              prop.type === "ObjectProperty"
          );

          const codeValue = t.stringLiteral(sources[storyKey]);
          if (codePropIndex >= 0) {
            sourceObj.properties[codePropIndex] = t.objectProperty(
              t.identifier("code"),
              codeValue
            );
          } else {
            sourceObj.properties.push(t.objectProperty(t.identifier("code"), codeValue));
          }
        },
      });

      // Generate the transformed code
      const result = generate(ast, {
        retainLines: false,
        compact: false,
      }, code);

      return result.code;
    }
  } catch (error) {
    console.error(`[story-source-injection] Failed to process ${id}:`, error);
  }

  return null;
}

export function storySourcePlugin(): Plugin {
  return {
    name: "story-source-injection",
    enforce: "pre",
    transform(code, id) {
      const transformed = injectSourceCode(code, id);
      if (transformed) {
        return {
          code: transformed,
          map: null,
        };
      }
      return null;
    },
  };
}
