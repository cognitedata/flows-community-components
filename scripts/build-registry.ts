#!/usr/bin/env node

/**
 * Dynamically builds registry.json from all components found in:
 * - src/components/ui/cognite/
 *
 * All registry paths point to src/components/ui/cognite/ to create a flat
 * folder structure when components are installed via the registry.
 */

import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';

// Get __dirname equivalent in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Type definitions for registry structure
interface RegistryFile {
  path: string;
  type: string;
}

interface RegistryItem {
  name: string;
  type: string;
  title: string;
  description: string;
  dependencies?: string[];
  registryDependencies?: string[];
  files: RegistryFile[];
}

interface Registry {
  $schema: string;
  name: string;
  homepage: string;
  items: RegistryItem[];
}

const uiCogniteDir = path.join(__dirname, '../src/components/ui/cognite');
const registryTemplate = path.join(__dirname, '../registry.template.json');
const registryOutput = path.join(__dirname, '../registry.json');

// Get all components from ui/cognite directory
function getComponents(): string[] {
  const components: string[] = [];

  if (fs.existsSync(uiCogniteDir)) {
    const uiFiles = fs
      .readdirSync(uiCogniteDir)
      .filter((file: string) => file.endsWith('.tsx'))
      .map((file: string) => file.replace('.tsx', ''));

    if (uiFiles.length > 0) {
      console.log(`\n✅ Found ${uiFiles.length} component(s) in ui/cognite:\n`);
      uiFiles.forEach((file: string) => console.log(`   - ${file}`));
      components.push(...uiFiles);
    }
  }

  if (components.length === 0) {
    console.log(
      `⚠️  No components found in ui/cognite directory. Creating empty registry.`
    );
  }

  return components;
}

// Load the full registry template (includes all component metadata)
function loadRegistryTemplate(): Registry {
  if (!fs.existsSync(registryTemplate)) {
    console.error('❌ registry.template.json not found!');
    console.log(
      '\nPlease create registry.template.json with all component definitions.'
    );
    process.exit(1);
  }

  const content = fs.readFileSync(registryTemplate, 'utf8');
  return JSON.parse(content) as Registry;
}

// Recursively collect all registry dependencies for a component
function collectRegistryDependencies(
  componentName: string,
  template: Registry,
  collected: Set<string>
): void {
  if (collected.has(componentName)) {
    return; // Already collected
  }

  // Find the component in the template
  const component = template.items.find((item) => item.name === componentName);
  if (!component) {
    return; // Component not found in template
  }

  // Add this component to collected set
  collected.add(componentName);

  // Recursively collect dependencies
  if (component.registryDependencies) {
    for (const depName of component.registryDependencies) {
      collectRegistryDependencies(depName, template, collected);
    }
  }
}

// Get the file path for a component (always cognite)
function getComponentPath(componentName: string): string {
  return `src/components/ui/cognite/${componentName}.tsx`;
}

// Filter registry to only include specified components and update file paths
function buildRegistry(template: Registry, components: string[]): Registry {
  // First, collect all components including their registry dependencies
  const allComponentsToInclude = new Set<string>(components);

  // For each component found, recursively collect its registry dependencies
  for (const componentName of components) {
    collectRegistryDependencies(
      componentName,
      template,
      allComponentsToInclude
    );
  }

  // Log any additional dependencies that were added
  const additionalDeps = Array.from(allComponentsToInclude).filter(
    (name) => !components.includes(name)
  );
  if (additionalDeps.length > 0) {
    console.log(
      `\n📦 Added ${
        additionalDeps.length
      } registry dependency component(s): ${additionalDeps.join(', ')}`
    );
  }

  // Filter and update items
  const filteredItems = template.items
    .filter((item: RegistryItem) => allComponentsToInclude.has(item.name))
    .map((item: RegistryItem) => {
      // All paths point to src/components/ui/cognite/
      const componentPath = getComponentPath(item.name);

      return {
        ...item,
        files: item.files.map((file: RegistryFile) => ({
          ...file,
          path: componentPath,
        })),
      };
    });

  return {
    ...template,
    items: filteredItems,
  };
}

// Main execution
async function main(): Promise<void> {
  try {
    // Display build information
    console.log('\n' + '='.repeat(70));
    console.log('🔨 BUILDING COMPONENT REGISTRY');
    console.log('   Source: ui/cognite');
    console.log('   Output: All paths → src/components/ui/cognite/');
    console.log('='.repeat(70));

    // Get components from ui/cognite directory
    const components: string[] = getComponents();

    if (components.length === 0) {
      console.log(`\n⚠️  No components found in ui/cognite directory`);
      console.log('   Registry will be empty (no components to build)');
    }

    // Show what will be built
    console.log('\n' + '─'.repeat(70));
    console.log('📋 COMPONENTS TO BE BUILT:');
    console.log('─'.repeat(70));

    if (components.length > 0) {
      console.log(`\n   ${components.join(', ')}`);
      console.log(`\n   Total: ${components.length} component(s)`);
    } else {
      console.log('\n   (none)');
    }

    console.log('\n' + '─'.repeat(70));
    console.log('📁 OUTPUT:');
    console.log('─'.repeat(70));
    console.log('\n   registry.json → Root directory');
    console.log('   Component files → public/r/*.json (via shadcn build)');
    console.log('   All paths point to src/components/ui/cognite/');

    // Load template first to check for dependencies
    const template: Registry = loadRegistryTemplate();

    // Build the registry (this will also collect all registry dependencies)
    console.log('\n⏳ Building registry...');
    const registry: Registry = buildRegistry(template, components);

    fs.writeFileSync(registryOutput, JSON.stringify(registry, null, 2) + '\n');

    console.log('✅ Successfully built registry.json');
    console.log(`📦 Registry contains ${registry.items.length} component(s)`);

    if (components.length > 0) {
      console.log(
        `\n🎉 Components built: ${registry.items
          .map((i: RegistryItem) => i.name)
          .join(', ')}`
      );
    }

    console.log('\n' + '='.repeat(70));
    console.log('✨ BUILD COMPLETE');
    console.log('='.repeat(70) + '\n');

    if (components.length > 0) {
      console.log('📝 Next steps:');
      console.log('  1. The registry:build command will now:');
      console.log('     - Clean public/r/ directory');
      console.log('     - Run shadcn build to generate component .json files');
      console.log('  2. Commit and push the changes');
      console.log('  3. Deploy your site to make components available\n');
    } else {
      console.log(
        `ℹ️  Note: No components to build. Add .tsx files to:\n` +
          `     - src/components/ui/cognite/\n`
      );
    }
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    console.error('\n❌ Failed to build registry:', errorMessage);
    process.exit(1);
  }
}

main();
