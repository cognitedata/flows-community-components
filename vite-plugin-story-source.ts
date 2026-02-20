/**
 * Vite plugin to inject story source code at build time.
 *
 * This plugin extracts JSX from story render functions and injects
 * the source code directly into story parameters.docs.source.code.
 */

import * as fs from 'node:fs';
import * as path from 'node:path';

import * as t from '@babel/types';
import type { Plugin } from 'vite';

import {
  GENERATOR_OPTIONS,
  generate,
  normalizeIndentation,
  parseSource,
  traverse,
} from './scripts/story-source-utils';

/**
 * Extracts source code from an AST node representing a render function.
 * Handles arrow functions, function expressions, and function declarations.
 * For functions with block bodies, extracts all statements including hooks and state.
 * Preserves blank lines by extracting directly from the original source when possible.
 */
function extractJSXFromRenderNode(renderNode: any, sourceCode: string): string | null {
  if (!renderNode) return null;

  let codeToExtract: any = null;

  // Handle arrow functions: () => JSX or () => { return JSX }
  if (renderNode.type === 'ArrowFunctionExpression') {
    const body = renderNode.body;
    if (body.type === 'JSXElement' || body.type === 'JSXFragment') {
      // Direct JSX: () => <JSX />
      codeToExtract = body;
    } else if (body.type === 'ParenthesizedExpression') {
      // Wrapped in parens: () => (<JSX />)
      if (body.expression.type === 'JSXElement' || body.expression.type === 'JSXFragment') {
        codeToExtract = body.expression;
      }
    } else if (body.type === 'BlockStatement') {
      // Has return: () => { return <JSX /> } or () => { const [x, setX] = useState(); return <JSX /> }
      // Extract the entire block body to include hooks and state
      codeToExtract = body;
    }
  }
  // Handle function expressions and declarations: function Name() { return JSX }
  else if (renderNode.type === 'FunctionExpression' || renderNode.type === 'FunctionDeclaration') {
    const body = renderNode.body;
    if (body.type === 'BlockStatement') {
      // Extract the entire block body to include hooks and state
      codeToExtract = body;
    }
  }

  if (codeToExtract) {
    try {
      // If we're extracting a BlockStatement, extract directly from source to preserve blank lines
      if (codeToExtract.type === 'BlockStatement') {
        // Babel nodes always have start/end properties (character offsets)
        // Extract directly from source to preserve all whitespace including blank lines
        if (
          typeof codeToExtract.start === 'number' &&
          typeof codeToExtract.end === 'number' &&
          codeToExtract.start >= 0 &&
          codeToExtract.end > codeToExtract.start &&
          codeToExtract.end <= sourceCode.length
        ) {
          // Extract the block body content directly from source
          // BlockStatement's start/end should point to the opening '{' and closing '}'
          const blockContent = sourceCode.slice(codeToExtract.start, codeToExtract.end);

          // Find the braces and extract content between them
          const firstBraceIndex = blockContent.indexOf('{');
          const lastBraceIndex = blockContent.lastIndexOf('}');

          if (firstBraceIndex !== -1 && lastBraceIndex !== -1 && lastBraceIndex > firstBraceIndex) {
            // Extract content between braces, preserving all whitespace including blank lines
            const statementsCode = blockContent.slice(firstBraceIndex + 1, lastBraceIndex);

            // Normalize indentation to start at column 0
            // This preserves blank lines (empty lines are kept as empty strings)
            const normalized = normalizeIndentation(statementsCode);
            return normalized;
          }

          // Fallback: use content directly
          const normalized = normalizeIndentation(blockContent);
          return normalized;
        }

        // Fallback: Generate code if direct extraction fails
        // This preserves functionality but may lose blank lines
        const statements = codeToExtract.body;
        const generatedStatements = statements.map((stmt: any) => {
          // For return statements, extract just the argument (the JSX)
          if (stmt.type === 'ReturnStatement' && stmt.argument) {
            const arg = stmt.argument;
            // Handle wrapped JSX: return (<JSX />)
            if (arg.type === 'ParenthesizedExpression') {
              const generated = generate(arg.expression, GENERATOR_OPTIONS, sourceCode);
              return generated.code;
            }
            // Handle direct JSX: return <JSX />
            const generated = generate(arg, GENERATOR_OPTIONS, sourceCode);
            return generated.code;
          }
          // For all other statements (hooks, state, etc.), generate as-is
          const generated = generate(stmt, GENERATOR_OPTIONS, sourceCode);
          return generated.code;
        });

        // Join all statements with newlines
        const code = generatedStatements.join('\n');

        // Normalize indentation to start at column 0
        const normalized = normalizeIndentation(code);
        return normalized;
      }

      // For direct JSX (arrow functions without block), generate normally
      const generated = generate(codeToExtract, GENERATOR_OPTIONS, sourceCode);
      const normalized = normalizeIndentation(generated.code);
      return normalized;
    } catch (error) {
      console.error('Failed to generate code from AST node:', error);
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
  if (!id.includes('.stories.tsx') && !id.includes('.stories.ts')) {
    return null;
  }

  try {
    // Read the file directly to get the original source with blank lines preserved
    // The 'code' parameter might be normalized by other plugins
    let originalSource = code;
    try {
      // Resolve file path from Vite id (remove query params/hash, handle virtual files)
      let filePath = id.split('?')[0].split('#')[0];

      if (!filePath.includes('node_modules') && !filePath.startsWith('\0')) {
        if (!path.isAbsolute(filePath)) {
          filePath = path.resolve(process.cwd(), filePath);
        }
        if (fs.existsSync(filePath) && fs.statSync(filePath).isFile()) {
          originalSource = fs.readFileSync(filePath, 'utf-8');
        }
      }
    } catch {
      // Fall back to using the code parameter if file read fails
      // This is expected for virtual files or transformed modules
    }

    const ast = parseSource(originalSource, true);

    const sources: Record<string, string> = {};

    // First pass: extract all source codes
    traverse(ast, {
      ExportNamedDeclaration(astPath: any) {
        const { node } = astPath;
        if (node.declaration?.type !== 'VariableDeclaration') return;

        const declaration = node.declaration;
        const storyVar = declaration.declarations[0];
        const storyKey = storyVar?.id?.name;

        if (!storyKey) return;

        const init = storyVar.init;
        if (!init) return;

        let renderNode: any = null;

        if (init.type === 'ObjectExpression') {
          const renderProperty = init.properties.find(
            (prop: any) =>
              (prop.key?.name === 'render' || prop.key?.value === 'render') &&
              prop.type === 'ObjectProperty'
          );
          renderNode = renderProperty?.value || null;
        } else if (init.type === 'ArrowFunctionExpression' || init.type === 'FunctionExpression') {
          renderNode = init;
        }

        if (renderNode) {
          // Use originalSource instead of code to preserve blank lines
          const sourceCode = extractJSXFromRenderNode(renderNode, originalSource);
          if (sourceCode) {
            sources[storyKey] = sourceCode;
          }
        }
      },
    });

    // Second pass: inject source code into parameters
    if (Object.keys(sources).length > 0) {
      traverse(ast, {
        ExportNamedDeclaration(astPath: any) {
          const { node } = astPath;
          if (node.declaration?.type !== 'VariableDeclaration') return;

          const declaration = node.declaration;
          const storyVar = declaration.declarations[0];
          const storyKey = storyVar?.id?.name;

          if (!storyKey || !sources[storyKey]) return;

          const init = storyVar.init;
          if (!init || init.type !== 'ObjectExpression') return;

          // Find or create parameters.docs.source.code
          let parametersProp = init.properties.find(
            (prop: any) =>
              (prop.key?.name === 'parameters' || prop.key?.value === 'parameters') &&
              prop.type === 'ObjectProperty'
          ) as any;

          if (!parametersProp) {
            // Create parameters property
            parametersProp = t.objectProperty(t.identifier('parameters'), t.objectExpression([]));
            init.properties.push(parametersProp);
          }

          const parametersObj = parametersProp.value;
          if (parametersObj.type !== 'ObjectExpression') {
            return;
          }

          // Find or create docs property
          const existingDocsProp = parametersObj.properties.find(
            (prop: any) =>
              (prop.key?.name === 'docs' || prop.key?.value === 'docs') &&
              prop.type === 'ObjectProperty'
          ) as any;

          const docsProp =
            existingDocsProp || t.objectProperty(t.identifier('docs'), t.objectExpression([]));
          if (!existingDocsProp) {
            parametersObj.properties.push(docsProp);
          }

          const docsObj = docsProp.value;
          if (docsObj.type !== 'ObjectExpression') {
            return;
          }

          // Find or create source property
          const existingSourceProp = docsObj.properties.find(
            (prop: any) =>
              (prop.key?.name === 'source' || prop.key?.value === 'source') &&
              prop.type === 'ObjectProperty'
          ) as any;

          const sourceProp =
            existingSourceProp || t.objectProperty(t.identifier('source'), t.objectExpression([]));
          if (!existingSourceProp) {
            docsObj.properties.push(sourceProp);
          }

          const sourceObj = sourceProp.value;
          if (sourceObj.type !== 'ObjectExpression') {
            return;
          }

          // Add or update code property
          const codePropIndex = sourceObj.properties.findIndex(
            (prop: any) =>
              (prop.key?.name === 'code' || prop.key?.value === 'code') &&
              prop.type === 'ObjectProperty'
          );

          const codeValue = t.stringLiteral(sources[storyKey]);
          if (codePropIndex >= 0) {
            sourceObj.properties[codePropIndex] = t.objectProperty(t.identifier('code'), codeValue);
          } else {
            sourceObj.properties.push(t.objectProperty(t.identifier('code'), codeValue));
          }
        },
      });

      // Generate the transformed code
      const result = generate(
        ast,
        {
          retainLines: false,
          compact: false,
        },
        code
      );

      return result.code;
    }
  } catch (error) {
    console.error(`[story-source-injection] Failed to process ${id}:`, error);
  }

  return null;
}

export function storySourcePlugin(): Plugin {
  return {
    name: 'story-source-injection',
    enforce: 'pre',
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
