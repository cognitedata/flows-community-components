#!/usr/bin/env tsx
/**
 * Script to generate Storybook story files from component examples
 * 
 * This script:
 * 1. Discovers all components with examples in src/lib/component-examples/
 * 2. Finds the corresponding component files in src/components/ui/
 * 3. Generates story files following the badge.stories.tsx pattern
 * 
 * Usage: pnpm tsx scripts/generate-stories.ts
 */

import { readFile, writeFile, unlink } from 'fs/promises';
import { join } from 'path';
import { existsSync } from 'fs';

const ROOT_DIR = join(process.cwd());
const EXAMPLES_DIR = join(ROOT_DIR, 'src/lib/component-examples');
const COMPONENTS_DRAFT_DIR = join(ROOT_DIR, 'src/components/ui/draft');
const COMPONENTS_COGNITE_DIR = join(ROOT_DIR, 'src/components/ui/cognite');
const STORIES_DIR = join(ROOT_DIR, 'src/components/ui');

// Components that should not have stories generated (unimplemented or incomplete)
const BLACKLISTED_COMPONENTS = [
  'swap-slot',
  'time-input',
  'topbar',
] as const;

// Components that have examples
const COMPONENT_EXAMPLES = [
  'accordion',
  'alert',
  'alert-dialog',
  'avatar',
  'badge',
  'breadcrumb',
  'button',
  'calendar',
  'card',
  'checkbox',
  'collapsible',
  'combobox',
  'command',
  'context-menu',
  'date-picker',
  'dialog',
  'drawer',
  'dropdown-menu',
  'input',
  'kbd',
  'label',
  'menubar',
  'pagination',
  'popover',
  'progress',
  'radio-group',
  'select',
  'separator',
  'sidebar',
  'slider',
  'sonner',
  'swap-slot',
  'switch',
  'tabs',
  'textarea',
  'time-input',
  'toggle',
  'tooltip',
  'topbar',
] as const;

interface ComponentLocation {
  path: string;
  importPath: string;
  directory: 'cognite' | 'draft';
}

/**
 * Find the component file for a given component name
 */
async function findComponent(componentName: string): Promise<ComponentLocation | null> {
  // Handle special cases
  const componentFileName = componentName === 'sonner' ? 'sonner-toast' : componentName;
  const fileName = `${componentFileName}.tsx`;
  
  // Check cognite first (preferred location)
  const cognitePath = join(COMPONENTS_COGNITE_DIR, fileName);
  if (existsSync(cognitePath)) {
    return {
      path: cognitePath,
      importPath: `@/components/ui/cognite/${componentFileName}`,
      directory: 'cognite',
    };
  }
  
  // Fall back to draft
  const draftPath = join(COMPONENTS_DRAFT_DIR, fileName);
  if (existsSync(draftPath)) {
    return {
      path: draftPath,
      importPath: `@/components/ui/draft/${componentFileName}`,
      directory: 'draft',
    };
  }
  
  return null;
}

/**
 * Extract all exported components from a component file
 */
async function extractExportedComponents(componentPath: string): Promise<string[]> {
  const content = await readFile(componentPath, 'utf-8');
  const exports: string[] = [];
  
  // Pattern 1: export { Component1, Component2, ... }
  const namedExportsMatch = content.match(/export\s*\{\s*([^}]+)\s*\}/);
  if (namedExportsMatch) {
    const exportList = namedExportsMatch[1];
    const componentNames = exportList.split(',').map(name => name.trim());
    exports.push(...componentNames);
  }
  
  // Pattern 2: export function ComponentName or export const ComponentName
  const directExportMatches = content.matchAll(/export\s+(?:const|function)\s+(\w+)/g);
  for (const match of directExportMatches) {
    exports.push(match[1]);
  }
  
  return [...new Set(exports)]; // Remove duplicates
}

/**
 * Generate a story file for a component
 */
async function generateStoryFile(
  componentName: string,
  componentLocation: ComponentLocation
): Promise<void> {
  const storyFileName = `${componentName}.stories.tsx`;
  const storyDir = componentLocation.directory === 'cognite' 
    ? join(STORIES_DIR, 'cognite')
    : join(STORIES_DIR, 'draft');
  const storyPath = join(storyDir, storyFileName);
  
  // Check for and delete old story file in the opposite directory
  const oppositeDir = componentLocation.directory === 'cognite'
    ? join(STORIES_DIR, 'draft')
    : join(STORIES_DIR, 'cognite');
  const oldStoryPath = join(oppositeDir, storyFileName);
  
  if (existsSync(oldStoryPath)) {
    await unlink(oldStoryPath);
    console.log(`🗑  Deleted old story file: ${oldStoryPath}`);
  }
  
  // Read the component file to extract the component name
  const componentContent = await readFile(componentLocation.path, 'utf-8');
  
  // Extract the actual filename without extension for the import path
  const componentFileName = componentLocation.path.split('/').pop()?.replace('.tsx', '') || componentName;
  
  // Extract all exported components from the file
  const exportedComponents = await extractExportedComponents(componentLocation.path);
  
  // Try to extract the main component export name
  // Pattern 1: export function ComponentName or export const ComponentName
  const directExportMatch = componentContent.match(/export\s+(?:const|function)\s+(\w+)/);
  
  // Pattern 2: export { ComponentName } at the end - use first one
  const namedExportMatch = componentContent.match(/export\s*\{\s*(\w+)/);
  
  // Pattern 3: export default function ComponentName
  const defaultExportMatch = componentContent.match(/export\s+default\s+function\s+(\w+)/);
  
  // Pattern 4: function ComponentName() { ... } export { ComponentName }
  const functionDefMatch = componentContent.match(/function\s+(\w+)\s*\(/);
  const hasExportStatement = componentContent.includes('export') && functionDefMatch;
  
  // Priority: direct export > named export > default export > function definition
  const componentExportName = directExportMatch 
    ? directExportMatch[1]
    : namedExportMatch
      ? namedExportMatch[1]
      : defaultExportMatch
        ? defaultExportMatch[1]
        : hasExportStatement && functionDefMatch
          ? functionDefMatch[1]
          : componentName.split('-').map(s => s.charAt(0).toUpperCase() + s.slice(1)).join('');
  
  // Generate story file content
  const storyContent = await generateStoryContent(
    componentName,
    componentLocation,
    componentExportName,
    componentFileName,
    exportedComponents
  );
  
  // Write the story file
  await writeFile(storyPath, storyContent, 'utf-8');
  console.log(`✓ Generated ${storyPath}`);
}

/**
 * Convert kebab-case to camelCase
 */
function kebabToCamel(str: string): string {
  return str.replace(/-([a-z])/g, (_, letter) => letter.toUpperCase());
}

/**
 * Extract example keys from the examples file
 */
async function extractExampleKeys(componentName: string): Promise<string[]> {
  const examplesFile = join(EXAMPLES_DIR, `${componentName}.examples.tsx`);
  const content = await readFile(examplesFile, 'utf-8');
  
  // Find the examples object
  const examplesVarName = `${kebabToCamel(componentName)}Examples`;
  
  // Match the export const examplesVarName: ComponentExamples = { ... };
  // We need to handle nested objects properly
  const exportPattern = new RegExp(`export const ${examplesVarName}:\\s*ComponentExamples\\s*=\\s*({)`, 'm');
  const exportMatch = content.match(exportPattern);
  
  if (!exportMatch) {
    return [];
  }
  
  // Find the matching closing brace
  const startIndex = exportMatch.index! + exportMatch[0].length - 1;
  let braceCount = 0;
  let endIndex = startIndex;
  
  for (let i = startIndex; i < content.length; i++) {
    if (content[i] === '{') braceCount++;
    if (content[i] === '}') braceCount--;
    if (braceCount === 0) {
      endIndex = i;
      break;
    }
  }
  
  const objectContent = content.slice(startIndex, endIndex + 1);
  
  // Extract keys - look for pattern: key: {
  // Handle both single-line and multi-line patterns
  const keyPattern = /(\w+)\s*:\s*\{/g;
  const keys: string[] = [];
  let match;
  
  while ((match = keyPattern.exec(objectContent)) !== null) {
    keys.push(match[1]);
  }
  
  return keys;
}

/**
 * Extract variant or type name from props for story naming
 */
function extractVariantOrTypeName(props: string): string | undefined {
  // Try variant first
  const variantMatch = props.match(/variant=["']([^"']+)["']/);
  if (variantMatch) {
    return variantMatch[1];
  }
  
  // Fall back to type if variant not found
  const typeMatch = props.match(/type=["']([^"']+)["']/);
  if (typeMatch) {
    return typeMatch[1];
  }
  
  return undefined;
}

/**
 * Extract individual component instances from example code
 * Parses JSX to find all top-level component instances marked with @storybook markers
 */
function extractComponentInstances(
  code: string,
  componentExportName: string
): Array<{ props: string; children?: string; variantName?: string; customName?: string }> {
  const instances: Array<{ props: string; children?: string; variantName?: string; customName?: string }> = [];
  
  // Find all instances of the component marked with @storybook markers
  // Pattern: {/* @storybook: name=CustomName *\/}<ComponentName ... props ...> ... children ... </ComponentName>
  // or: {/* @storybook *\/}<ComponentName ... props ... />
  
  let searchIndex = 0;
  while (true) {
    // Find @storybook marker first (with optional name attribute)
    const markerPattern = /\{\s*\/\*\s*@storybook(?:\s*:\s*name\s*=\s*(\w+))?\s*\*\/\s*\}/g;
    markerPattern.lastIndex = searchIndex;
    const markerMatch = markerPattern.exec(code);
    
    if (!markerMatch) break;
    
    // Extract custom name if provided
    const customName = markerMatch[1] || undefined;
    
    // Now find the opening tag immediately after the marker
    // The component name must be followed by whitespace, >, or />
    const openTagPattern = new RegExp(`<${componentExportName}(\\s[^>]*?)(?:\\/>|>)`, 'g');
    openTagPattern.lastIndex = markerMatch.index + markerMatch[0].length;
    const openMatch = openTagPattern.exec(code);
    
    if (!openMatch) {
      // No component found after marker, continue searching
      searchIndex = markerMatch.index + markerMatch[0].length;
      continue;
    }
    
    // Verify the component is immediately after the marker (allowing whitespace)
    const betweenText = code.slice(markerMatch.index + markerMatch[0].length, openMatch.index);
    if (betweenText.trim() !== '') {
      // There's non-whitespace content between marker and component, skip this one
      searchIndex = markerMatch.index + markerMatch[0].length;
      continue;
    }
    
    const props = openMatch[1].trim();
    const tagEnd = openMatch.index + openMatch[0].length;
    
    // Check if self-closing
    if (openMatch[0].endsWith('/>')) {
      // Self-closing tag
      instances.push({
        props,
        variantName: extractVariantOrTypeName(props),
        customName,
      });
      searchIndex = tagEnd;
      continue;
    }
    
    // Find matching closing tag
    const closeTag = `</${componentExportName}>`;
    const closeIndex = code.indexOf(closeTag, tagEnd);
    
    if (closeIndex === -1) {
      // No closing tag found, treat as self-closing
      instances.push({
        props,
        variantName: extractVariantOrTypeName(props),
        customName,
      });
      searchIndex = tagEnd;
      continue;
    }
    
    // Extract children
    const children = code.slice(tagEnd, closeIndex).trim();
    
    // Extract variant or type name from props if present
    const variantName = extractVariantOrTypeName(props);
    
    instances.push({
      props,
      children,
      variantName,
      customName,
    });
    
    searchIndex = closeIndex + closeTag.length;
    
    // Safety check to prevent infinite loops
    if (searchIndex >= code.length) break;
  }
  
  return instances;
}

/**
 * Generate a story name from component instance
 */
function generateVariantStoryName(
  instance: { props: string; children?: string; variantName?: string; customName?: string },
  index: number,
  componentExportName: string
): string {
  let storyName = '';
  
  // Use custom name if provided, otherwise use variant name, otherwise use props or index
  if (instance.customName) {
    storyName = instance.customName;
  } else if (instance.variantName) {
    storyName = instance.variantName
      .split('-')
      .map(s => s.charAt(0).toUpperCase() + s.slice(1))
      .join('');
  } else {
    // Try to extract other meaningful prop values
    const textMatch = instance.children?.match(/>([^<]+)</);
    if (textMatch && textMatch[1].trim()) {
      const text = textMatch[1].trim();
      // Use first word as name if it's a simple text
      if (text.length < 20 && !text.includes('\n')) {
        storyName = text
          .split(/\s+/)[0]
          .split(/(?=[A-Z])/)
          .map(s => s.charAt(0).toUpperCase() + s.slice(1))
          .join('');
      }
    }
    
    if (!storyName) {
      storyName = `Variant${index + 1}`;
    }
  }
  
  // Avoid conflicts with component name
  if (storyName === componentExportName) {
    storyName = `${storyName}Example`;
  }
  
  return storyName;
}

/**
 * Variant descriptions for better documentation
 */
const VARIANT_DESCRIPTIONS: Record<string, string> = {
  default: 'Default variant - the standard style',
  fjord: 'Fjord variant - blue-toned for observations and data',
  nordic: 'Nordic variant - cool-toned for technical content',
  aurora: 'Aurora variant - vibrant for troubleshooting and alerts',
  sky: 'Sky variant - light blue for informational content',
  dusk: 'Dusk variant - purple-toned for RCA and analysis',
  mountain: 'Mountain variant - green-toned for plans and goals',
  secondary: 'Secondary variant - neutral for general use',
  error: 'Error variant - red for errors and critical issues',
  warning: 'Warning variant - orange/yellow for warnings',
  success: 'Success variant - green for successful operations',
  inProgress: 'In Progress variant - for ongoing operations',
  archived: 'Archived variant - for archived or inactive items',
  closable: 'Closable variant - with close button functionality',
  destructive: 'Destructive variant - red for dangerous actions',
  outline: 'Outline variant - border only, no background',
  ghost: 'Ghost variant - minimal styling',
  link: 'Link variant - styled as a hyperlink',
};

/**
 * Extract variant props from component's cva definition
 */
async function extractCvaVariants(componentPath: string): Promise<Record<string, string[]>> {
  const content = await readFile(componentPath, 'utf-8');
  const variantProps: Record<string, string[]> = {};
  
  // Find the cva definition
  const cvaMatch = content.match(/const\s+\w+Variants\s*=\s*cva\s*\(/);
  if (!cvaMatch) {
    return variantProps;
  }
  
  const cvaStart = cvaMatch.index! + cvaMatch[0].length;
  
  // Find the variants object within the cva call
  const variantsMatch = content.slice(cvaStart).match(/variants:\s*\{/);
  if (!variantsMatch) {
    return variantProps;
  }
  
  const variantsStart = cvaStart + variantsMatch.index! + variantsMatch[0].length;
  
  // Extract the variants object content (handle nested braces)
  let braceCount = 1;
  let variantsEnd = variantsStart;
  for (let i = variantsStart; i < content.length; i++) {
    if (content[i] === '{') braceCount++;
    if (content[i] === '}') braceCount--;
    if (braceCount === 0) {
      variantsEnd = i;
      break;
    }
  }
  
  const variantsContent = content.slice(variantsStart, variantsEnd);
  
  // Extract each variant prop and its options
  // Pattern: propName: { option1: '...', option2: '...', ... }
  // We need to handle nested braces properly
  let currentIndex = 0;
  while (currentIndex < variantsContent.length) {
    // Find next prop name followed by colon and opening brace
    const propMatch = variantsContent.slice(currentIndex).match(/(\w+):\s*\{/);
    if (!propMatch) break;
    
    const propName = propMatch[1];
    const propStart = currentIndex + propMatch.index! + propMatch[0].length;
    
    // Find the matching closing brace for this prop's object
    let braceCount = 1;
    let propEnd = propStart;
    for (let i = propStart; i < variantsContent.length; i++) {
      if (variantsContent[i] === '{') braceCount++;
      if (variantsContent[i] === '}') braceCount--;
      if (braceCount === 0) {
        propEnd = i;
        break;
      }
    }
    
    const propContent = variantsContent.slice(propStart, propEnd);
    
    // Extract option names (keys that are followed by : and then a quote or newline+quote)
    // This pattern matches: optionName: "..." or optionName:\n  "..."
    const optionPattern = /(\w+):\s*["'`]/g;
    const options: string[] = [];
    let optionMatch;
    
    while ((optionMatch = optionPattern.exec(propContent)) !== null) {
      const optionName = optionMatch[1];
      // Avoid capturing CSS pseudo-classes like 'hover' or 'dark' within strings
      // Check if this is actually a top-level key by ensuring it's at the start of a line or after a comma
      const beforeMatch = propContent.slice(0, optionMatch.index).trim();
      if (beforeMatch === '' || beforeMatch.endsWith(',') || beforeMatch.endsWith('{')) {
        options.push(optionName);
      }
    }
    
    if (options.length > 0) {
      variantProps[propName] = options;
    }
    
    currentIndex = propEnd + 1;
  }
  
  return variantProps;
}

/**
 * Extract component metadata from instances for argTypes generation
 */
function extractComponentMetadata(instances: Array<{ props: string; children?: string; variantName?: string; customName?: string }>) {
  const variants = new Set<string>();
  const hasOutline = instances.some(i => i.props.includes('outline'));
  const hasBackground = instances.some(i => i.props.includes('background'));
  const hasDot = instances.some(i => i.props.includes('dot'));
  const hasChildren = instances.some(i => i.children && i.children.trim().length > 0);
  
  // Extract primitive props that appear in examples
  const primitiveProps: Record<string, Set<string>> = {};
  const booleanProps = new Set<string>();
  
  instances.forEach(instance => {
    const variantMatch = instance.props.match(/variant=["']([^"']+)["']/);
    if (variantMatch) {
      variants.add(variantMatch[1]);
    }
    
    // Extract string props with values (e.g., type="single", defaultValue="item-1")
    const stringPropMatches = instance.props.matchAll(/(\w+)=["']([^"']+)["']/g);
    for (const match of stringPropMatches) {
      const propName = match[1];
      const propValue = match[2];
      
      // Skip common props that shouldn't be controls
      if (['className', 'value', 'defaultValue'].includes(propName)) {
        continue;
      }
      
      if (!primitiveProps[propName]) {
        primitiveProps[propName] = new Set();
      }
      primitiveProps[propName].add(propValue);
    }
    
    // Extract boolean props (standalone or with {true}/{false})
    const booleanPropMatches = instance.props.matchAll(/\b(\w+)(?:=\{(?:true|false)\}|\s|>|\/)/g);
    for (const match of booleanPropMatches) {
      const propName = match[1];
      // Skip common props and already tracked props
      if (!['className', 'value', 'defaultValue', 'type', 'variant'].includes(propName) && 
          !primitiveProps[propName]) {
        booleanProps.add(propName);
      }
    }
  });
  
  return {
    variants: Array.from(variants),
    hasOutline,
    hasBackground,
    hasDot,
    hasChildren,
    primitiveProps,
    booleanProps,
  };
}

/**
 * Generate argTypes configuration for Storybook controls
 */
function generateArgTypes(
  cvaVariants: Record<string, string[]>,
  metadata: { 
    variants: string[]; 
    hasOutline: boolean; 
    hasBackground: boolean; 
    hasDot: boolean; 
    hasChildren: boolean;
    primitiveProps: Record<string, Set<string>>;
    booleanProps: Set<string>;
  }
) {
  const argTypes: string[] = [];
  
  // Generate argTypes for all cva variant props dynamically
  for (const [propName, options] of Object.entries(cvaVariants)) {
    if (options.length > 0) {
      // Determine description based on prop name
      let description = '';
      if (propName === 'variant') {
        description = 'The visual style variant';
      } else if (propName === 'sizes' || propName === 'size') {
        description = 'The size of the component';
      } else {
        // Generate a generic description
        description = `The ${propName} option`;
      }
      
      argTypes.push(`    ${propName}: {
      control: 'select',
      options: [${options.map(v => `'${v}'`).join(', ')}],
      description: '${description}',
    }`);
    }
  }
  
  // Generate argTypes for primitive props found in examples
  for (const [propName, values] of Object.entries(metadata.primitiveProps)) {
    // Skip if already handled by cva variants
    if (cvaVariants[propName]) continue;
    
    const valueArray = Array.from(values);
    
    // Generate description based on prop name
    let description = '';
    if (propName === 'type') {
      description = 'The interaction mode';
    } else {
      description = `The ${propName} value`;
    }
    
    if (valueArray.length > 1) {
      // Multiple values - use select control
      argTypes.push(`    ${propName}: {
      control: 'select',
      options: [${valueArray.map(v => `'${v}'`).join(', ')}],
      description: '${description}',
    }`);
    } else if (valueArray.length === 1) {
      // Single value - use text control but show the common value
      argTypes.push(`    ${propName}: {
      control: 'text',
      description: '${description}',
    }`);
    }
  }
  
  // Add boolean props from primitives
  for (const propName of metadata.booleanProps) {
    // Skip if already handled
    if (cvaVariants[propName] || metadata.primitiveProps[propName]) continue;
    
    let description = '';
    if (propName === 'collapsible') {
      description = 'Whether items can be collapsed';
    } else if (propName === 'disabled') {
      description = 'Whether the component is disabled';
    } else {
      description = `Whether to enable ${propName}`;
    }
    
    argTypes.push(`    ${propName}: {
      control: 'boolean',
      description: '${description}',
    }`);
  }
  
  // Add boolean props found in examples (only if not already in cvaVariants)
  if (metadata.hasOutline && !cvaVariants.outline && !metadata.booleanProps.has('outline')) {
    argTypes.push(`    outline: {
      control: 'boolean',
      description: 'Whether to show with an outline style',
    }`);
  }
  
  if (metadata.hasBackground && !cvaVariants.background && !metadata.booleanProps.has('background')) {
    argTypes.push(`    background: {
      control: 'boolean',
      description: 'Whether to show the background fill',
    }`);
  }
  
  if (metadata.hasDot && !cvaVariants.dot && !metadata.booleanProps.has('dot')) {
    argTypes.push(`    dot: {
      control: 'boolean',
      description: 'Whether to make rounded (pill-shaped)',
    }`);
  }
  
  // Only add children control if the component instances have children
  if (metadata.hasChildren) {
    argTypes.push(`    children: {
      control: 'text',
      description: 'The content to display',
    }`);
  }
  
  return argTypes.length > 0 ? `  argTypes: {\n${argTypes.join(',\n')}\n  },` : '';
}

/**
 * Generate the story file content
 */
async function generateStoryContent(
  componentName: string,
  componentLocation: ComponentLocation,
  componentExportName: string,
  componentFileName: string,
  exportedComponents: string[]
): Promise<string> {
  const examplesVarName = `${kebabToCamel(componentName)}Examples`;
  const examplesImportPath = componentName;
  
  // Get the title case name for Storybook
  const titleName = componentName
    .split('-')
    .map(s => s.charAt(0).toUpperCase() + s.slice(1))
    .join('');
  
  // Use category format matching existing badge.stories.tsx pattern
  // Cognite components use 'UI', draft components use 'UI/Draft'
  const category = componentLocation.directory === 'cognite' ? 'UI' : 'UI/Draft';
  
  // Extract example keys
  const exampleKeys = await extractExampleKeys(componentName);
  
  // Read examples file to get code for each example
  const examplesFile = join(EXAMPLES_DIR, `${componentName}.examples.tsx`);
  const examplesContent = await readFile(examplesFile, 'utf-8');
  
  // Track all icons used across all stories
  const iconsUsed = new Set<string>();
  
  // Track all components used in JSX (for multi-component exports)
  const componentsUsed = new Set<string>();
  
  // Track used story names to avoid duplicates
  const usedStoryNames = new Set<string>();
  
  // Track all instances for metadata extraction
  const allInstances: Array<{ props: string; children?: string; variantName?: string }> = [];
  
  // Generate story entries for each example
  const storyEntries: string[] = [];
  
  for (const key of exampleKeys) {
    // Extract the code for this example
    // Find the key: { ... } block first, then extract component and code property
    const keyStart = examplesContent.indexOf(`${key}:`);
    if (keyStart === -1) continue;
    
    // Find the opening brace for this key
    const braceStart = examplesContent.indexOf('{', keyStart);
    if (braceStart === -1) continue;
    
    // Find the matching closing brace (handle nested braces)
    let braceCount = 0;
    let braceEnd = braceStart;
    for (let i = braceStart; i < examplesContent.length; i++) {
      if (examplesContent[i] === '{') braceCount++;
      if (examplesContent[i] === '}') braceCount--;
      if (braceCount === 0) {
        braceEnd = i;
        break;
      }
    }
    
    const keyBlock = examplesContent.slice(braceStart, braceEnd + 1);
    
    // Find the component reference: component: ComponentName
    const componentMatch = keyBlock.match(/component:\s*(\w+)/);
    let componentFunctionBody = '';
    
    if (componentMatch) {
      const componentName = componentMatch[1];
      // Find the component function definition in the file
      const funcPattern = new RegExp(`function\\s+${componentName}\\s*\\(\\)\\s*\\{`, 'm');
      const funcMatch = examplesContent.match(funcPattern);
      
      if (funcMatch) {
        const funcStart = funcMatch.index! + funcMatch[0].length - 1;
        // Find matching closing brace
        let funcBraceCount = 0;
        let funcEnd = funcStart;
        for (let i = funcStart; i < examplesContent.length; i++) {
          if (examplesContent[i] === '{') funcBraceCount++;
          if (examplesContent[i] === '}') funcBraceCount--;
          if (funcBraceCount === 0) {
            funcEnd = i;
            break;
          }
        }
        componentFunctionBody = examplesContent.slice(funcStart, funcEnd + 1);
      }
    }
    
    // Now find code: `...` within this block
    const codePropMatch = keyBlock.match(/code:\s*`([\s\S]*?)`/);
    
    if (!codePropMatch) {
      // No code property, fallback to component
      const storyName = key
        .replace(/([A-Z])/g, ' $1')
        .replace(/^./, str => str.toUpperCase())
        .trim();
      
      const storyVarName = storyName.replace(/\s+/g, '');
      
      storyEntries.push(`/**
 * ${storyName}
 */
export const ${storyVarName}: Story = {
  render: () => {
    const Component = ${examplesVarName}.${key}.component;
    return <Component />;
  },
  parameters: {
    docs: {
      description: {
        story: ${examplesVarName}.${key}.description,
      },
      source: {
        code: ${examplesVarName}.${key}.code,
      },
    },
  },
};`);
      continue;
    }
    
    const code = codePropMatch[1];
    
    // Extract individual component instances from the component function body (with markers)
    // If no function body found, fall back to code string
    const sourceForExtraction = componentFunctionBody || code;
    const instances = extractComponentInstances(sourceForExtraction, componentExportName);
    
    // Add instances to allInstances for metadata extraction
    allInstances.push(...instances);
    
    // Only create individual stories if we found instances and they're top-level
    // (not inside other components or complex structures)
    if (instances.length === 0) {
      // No individual instances found, create story from example component
      const storyName = key
        .replace(/([A-Z])/g, ' $1')
        .replace(/^./, str => str.toUpperCase())
        .trim();
      
      const storyVarName = storyName.replace(/\s+/g, '');
      
      storyEntries.push(`/**
 * ${storyName}
 */
export const ${storyVarName}: Story = {
  render: () => {
    const Component = ${examplesVarName}.${key}.component;
    return <Component />;
  },
  parameters: {
    docs: {
      description: {
        story: ${examplesVarName}.${key}.description,
      },
      source: {
        code: ${examplesVarName}.${key}.code,
      },
    },
  },
};`);
    } else {
      // Create individual story for each instance
      instances.forEach((instance, index) => {
        const variantStoryName = generateVariantStoryName(instance, index, componentExportName);
        let storyVarName = variantStoryName.replace(/\s+/g, '');
        
        // Ensure unique story name
        let suffix = 2;
        while (usedStoryNames.has(storyVarName)) {
          storyVarName = `${variantStoryName.replace(/\s+/g, '')}${suffix}`;
          suffix++;
        }
        usedStoryNames.add(storyVarName);
        
        // Reconstruct props object for JSX
        // Parse props string into a proper JSX props object
        const propsObj: Record<string, string> = {};
        
        // Extract variant prop
        const variantMatch = instance.props.match(/variant=["']([^"']+)["']/);
        if (variantMatch) {
          propsObj.variant = `"${variantMatch[1]}"`;
        }
        
        // Extract other boolean props
        const booleanProps = ['outline', 'background', 'dot'];
        booleanProps.forEach(prop => {
          if (instance.props.includes(prop)) {
            // Check if it's prop={false}, prop={true}, or just prop
            const propWithValueMatch = instance.props.match(new RegExp(`${prop}=\\{(false|true)\\}`));
            if (propWithValueMatch) {
              propsObj[prop] = `{${propWithValueMatch[1]}}`;
            } else if (instance.props.match(new RegExp(`\\b${prop}\\b(?!=)`))) {
              // Standalone prop (e.g., just "outline" without =)
              propsObj[prop] = '';
            }
          }
        });
        
        // Extract icons from props (e.g., icon={IconInfoCircle})
        const propIconMatches = instance.props.matchAll(/\{(Icon[A-Z]\w+)\}/g);
        for (const match of propIconMatches) {
          iconsUsed.add(match[1]);
        }
        
        // Handle children - preserve the original children structure
        let childrenCode = '';
        if (instance.children) {
          // Preserve the original children structure (may include JSX elements like icons)
          childrenCode = instance.children.trim();
          
          // Extract icon names from children (both JSX elements and prop values)
          const iconMatches = childrenCode.matchAll(/<(Icon[A-Z]\w+)/g);
          for (const match of iconMatches) {
            iconsUsed.add(match[1]);
          }
          
          // Extract icons from prop values in children (e.g., icon={IconInfoCircle})
          const childIconPropMatches = childrenCode.matchAll(/\{(Icon[A-Z]\w+)\}/g);
          for (const match of childIconPropMatches) {
            iconsUsed.add(match[1]);
          }
          
          // Extract all JSX component names from children
          const componentMatches = childrenCode.matchAll(/<([A-Z][A-Za-z0-9]*)/g);
          for (const match of componentMatches) {
            const compName = match[1];
            // Only add if it's exported from the component file and not an icon
            if (exportedComponents.includes(compName) && !compName.startsWith('Icon')) {
              componentsUsed.add(compName);
            }
          }
        }
        
        const storyDescription = instance.variantName && VARIANT_DESCRIPTIONS[instance.variantName] 
          ? VARIANT_DESCRIPTIONS[instance.variantName]
          : `${variantStoryName} variant`;
        
        // Build args object from extracted propsObj
        const args: string[] = [];
        
        // Add variant if present in propsObj
        if (propsObj.variant) {
          const cleanVariant = propsObj.variant.replace(/"/g, '');
          args.push(`    variant: '${cleanVariant}'`);
        }
        
        // Add boolean props from propsObj
        ['outline', 'background', 'dot'].forEach(prop => {
          if (prop in propsObj) {
            const value = propsObj[prop];
            if (value === '') {
              // Standalone prop (e.g., just "outline")
              args.push(`    ${prop}: true`);
            } else if (value.includes('false')) {
              args.push(`    ${prop}: false`);
            } else if (value.includes('true')) {
              args.push(`    ${prop}: true`);
            }
          }
        });
        
        // Add children if present
        const isSimpleText = childrenCode && !childrenCode.includes('<');
        if (isSimpleText) {
          args.push(`    children: '${childrenCode.replace(/'/g, "\\'")}'`);
        }
        
        // Determine if we can use args-only or need custom render
        const hasComplexChildren = childrenCode && childrenCode.includes('<');
        
        if (hasComplexChildren) {
          // Need custom render for JSX children
          storyEntries.push(`/**
 * ${storyDescription}
 */
export const ${storyVarName}: Story = {
  render: (args) => (
    <${componentExportName} {...args}>
      ${childrenCode}
    </${componentExportName}>
  ),${args.length > 0 ? `\n  args: {\n${args.join(',\n')}\n  },` : ''}
  parameters: {
    docs: {
      description: {
        story: '${storyDescription}',
      },
    },
  },
};`);
        } else {
          // Can use args-only for simple cases
          storyEntries.push(`/**
 * ${storyDescription}
 */
export const ${storyVarName}: Story = {${args.length > 0 ? `\n  args: {\n${args.join(',\n')}\n  },` : ''}
  parameters: {
    docs: {
      description: {
        story: '${storyDescription}',
      },
    },
  },
};`);
        }
      });
    }
  }
  
  // Use relative import for component (like badge.stories.tsx does)
  // Use the actual filename (which may differ from componentName, e.g., sonner -> sonner-toast)
  const componentImport = `./${componentFileName}`;
  
  // Build component imports - include main component and any used child components
  componentsUsed.add(componentExportName); // Always include the main component
  const componentImportList = Array.from(componentsUsed).sort().join(', ');
  
  // Generate icon imports if any icons are used
  let iconImports = '';
  if (iconsUsed.size > 0) {
    const iconList = Array.from(iconsUsed).sort().join(', ');
    iconImports = `\nimport { ${iconList} } from '@tabler/icons-react';`;
  }
  
  // Extract cva variants from component file
  const cvaVariants = await extractCvaVariants(componentLocation.path);
  
  // Extract metadata from all instances for argTypes and Playground
  const metadata = extractComponentMetadata(allInstances);
  const argTypesStr = generateArgTypes(cvaVariants, metadata);
  
  // Generate Playground story if we have variants
  let playgroundStory = '';
  if (metadata.variants.length > 0 && !usedStoryNames.has('Playground')) {
    const defaultVariant = metadata.variants[0];
    playgroundStory = `

/**
 * Interactive playground for testing different configurations.
 * Use the controls below to experiment with all available props.
 */
export const Playground: Story = {
  args: {
    variant: '${defaultVariant}',
    children: '${titleName}',
  },
};`;
  }
  
  // Generate grouped variation stories
  let groupedStories = '';
  
  // Outline style story if outline prop is used
  if (metadata.hasOutline && metadata.variants.length > 2) {
    const sampleVariants = metadata.variants.slice(0, 4);
    groupedStories += `

/**
 * Outline style - badges with border only, no background fill.
 * Shows how different variants look with the outline prop.
 */
export const OutlineStyle: Story = {
  render: () => (
    <div className="flex flex-wrap gap-2">
${sampleVariants.map(v => `      <${componentExportName} variant="${v}" outline>${v.charAt(0).toUpperCase() + v.slice(1)}</${componentExportName}>`).join('\n')}
    </div>
  ),
};`;
  }
  
  // No background story if background prop is used
  if (metadata.hasBackground && metadata.variants.length > 2) {
    const sampleVariants = metadata.variants.slice(0, 4);
    groupedStories += `

/**
 * No background - badges without background fill.
 * Shows how different variants look without backgrounds.
 */
export const NoBackground: Story = {
  render: () => (
    <div className="flex flex-wrap gap-2">
${sampleVariants.map(v => `      <${componentExportName} variant="${v}" background={false}>${v.charAt(0).toUpperCase() + v.slice(1)}</${componentExportName}>`).join('\n')}
    </div>
  ),
};`;
  }
  
  // Dot style story if dot prop is used
  if (metadata.hasDot && metadata.variants.length > 2) {
    const sampleVariants = metadata.variants.slice(0, 3);
    groupedStories += `

/**
 * Dot style - pill-shaped rounded badges.
 * Useful for counts and compact indicators.
 */
export const DotStyle: Story = {
  render: () => (
    <div className="flex flex-wrap gap-2">
${sampleVariants.map((v, i) => `      <${componentExportName} variant="${v}" dot>${i + 5}</${componentExportName}>`).join('\n')}
    </div>
  ),
};`;
  }
  
  // Check if the examples import is actually used in any stories
  const fullStoriesContent = storyEntries.join('\n\n') + playgroundStory + groupedStories;
  const needsExamplesImport = fullStoriesContent.includes(examplesVarName);
  
  return `import type { Meta, StoryObj } from '@storybook/nextjs';
import { ${componentImportList} } from '${componentImport}';
${needsExamplesImport ? `import { ${examplesVarName} } from '@/lib/component-examples/${examplesImportPath}.examples';` : ''}${iconImports}

const meta: Meta<typeof ${componentExportName}> = {
  title: '${category}/${titleName}',
  component: ${componentExportName},
  tags: ['autodocs'],
${argTypesStr ? argTypesStr + '\n' : ''}  parameters: {
    layout: 'centered',
  },
};

export default meta;
type Story = StoryObj<typeof ${componentExportName}>;

${storyEntries.join('\n\n')}${playgroundStory}${groupedStories}
`;
}

/**
 * Main function
 */
async function main() {
  console.log('Generating Storybook stories from component examples...\n');
  
  let generated = 0;
  let skipped = 0;
  let errors = 0;
  
  for (const componentName of COMPONENT_EXAMPLES) {
    try {
      // Skip blacklisted components
      if ((BLACKLISTED_COMPONENTS as readonly string[]).includes(componentName)) {
        console.log(`⚠ Skipped ${componentName} - blacklisted (unimplemented)`);
        skipped++;
        continue;
      }
      
      // Find the component file
      const componentLocation = await findComponent(componentName);
      
      if (!componentLocation) {
        console.log(`⚠ Skipped ${componentName} - component file not found`);
        skipped++;
        continue;
      }
      
      // Check if examples file exists
      const examplesFile = join(EXAMPLES_DIR, `${componentName}.examples.tsx`);
      if (!existsSync(examplesFile)) {
        console.log(`⚠ Skipped ${componentName} - examples file not found`);
        skipped++;
        continue;
      }
      
      // Generate the story file
      await generateStoryFile(componentName, componentLocation);
      generated++;
      
    } catch (error) {
      console.error(`✗ Error processing ${componentName}:`, error);
      errors++;
    }
  }
  
  console.log(`\n✅ Generated ${generated} story files`);
  if (skipped > 0) {
    console.log(`⚠ Skipped ${skipped} components`);
  }
  if (errors > 0) {
    console.log(`✗ ${errors} errors`);
  }
}

main().catch(console.error);

