#!/usr/bin/env node

/**
 * Dynamically builds registry.json from all components found in:
 * - src/components/ui/aura/
 *
 * All registry paths point to src/components/ui/aura/ to create a flat
 * folder structure when components are installed via the registry.
 */

import * as fs from "node:fs";
import * as path from "node:path";
import { fileURLToPath } from "node:url";

// Get __dirname equivalent in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Type definitions for registry structure
interface RegistryFile {
  path: string;
  target?: string;
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

const uiCogniteDir = path.join(__dirname, "../src/components/ui/aura");
const registryTemplate = path.join(__dirname, "../registry.template.json");
const registryOutput = path.join(__dirname, "../registry.json");

// Registry metadata (shadcn validates registry namespaces start with "@")
const registryName = "@aura";
const registryHomepage = "https://cognitedata.github.io/aura/";
// Registry namespace used when emitting registryDependencies (consumer registry alias)
const registryDependencyNamespace = "@aura";

/**
 * Misc "file" items that should always be present in the registry output.
 *
 * These are not components (no .tsx), but supporting files consumers may want to install.
 * Add more items here as needed.
 */
const miscRegistryItems: RegistryItem[] = [
  {
    name: "theme",
    type: "registry:file",
    title: "Theme",
    description: "Theme component.",
    files: [
      { path: "src/styleScope.ts", type: "registry:item" },
      { path: "src/styleScope.d.ts", type: "registry:item" },
    ],
  },
  {
    name: "css",
    type: "registry:component",
    title: "CSS",
    description: "Installs Aura global styles (import once in your app entrypoint).",
    dependencies: ["tw-animate-css"],
    files: [
      {
        path: "src/globals.css",
        target: "src/styles.css",
        type: "registry:component",
      },
    ],
  },
];

// Get all components from ui/cognite directory
// Supports both flat files (component.tsx) and folder-based components (component/component.tsx)
function getComponents(): string[] {
  const components: string[] = [];

  if (fs.existsSync(uiCogniteDir)) {
    const entries = fs.readdirSync(uiCogniteDir, { withFileTypes: true });

    // Get flat .tsx files (excluding reasoning-original.tsx)
    const flatFiles = entries
      .filter(
        (entry) =>
          entry.isFile() && entry.name.endsWith(".tsx") && entry.name !== "reasoning-original.tsx"
      )
      .map((entry) => entry.name.replace(".tsx", ""));

    // Get folder-based components (folders containing componentName/componentName.tsx)
    const folderComponents = entries
      .filter((entry) => entry.isDirectory())
      .filter((entry) => {
        const componentFile = path.join(uiCogniteDir, entry.name, `${entry.name}.tsx`);
        return fs.existsSync(componentFile);
      })
      .map((entry) => entry.name);

    // Combine both, avoiding duplicates (folder takes precedence)
    const allComponents = [
      ...flatFiles.filter((name) => !folderComponents.includes(name)),
      ...folderComponents,
    ];

    if (allComponents.length > 0) {
      console.log(`\n✅ Found ${allComponents.length} component(s) in ui/cognite:\n`);
      for (const file of allComponents) {
        console.log(`   - ${file}`);
      }
      components.push(...allComponents);
    }
  }

  if (components.length === 0) {
    console.log("⚠️  No components found in ui/cognite directory. Creating empty registry.");
  }

  return components;
}

// Load the full registry template (includes all component metadata)
function loadRegistryTemplate(): Registry {
  if (!fs.existsSync(registryTemplate)) {
    console.error("❌ registry.template.json not found!");
    console.log("\nPlease create registry.template.json with all component definitions.");
    process.exit(1);
  }

  const content = fs.readFileSync(registryTemplate, "utf8");
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

// Get the file path for a component
// Checks if component is in a subfolder first, falls back to flat file
function getComponentPath(componentName: string): string {
  const subfolderPath = path.join(uiCogniteDir, componentName, `${componentName}.tsx`);
  if (fs.existsSync(subfolderPath)) {
    return `src/components/ui/aura/${componentName}/${componentName}.tsx`;
  }
  return `src/components/ui/aura/${componentName}.tsx`;
}

// Get the target path for a component (always flat for installation)
function getComponentTargetPath(componentName: string): string {
  return `src/components/ui/aura/${componentName}.tsx`;
}

/**
 * Extract npm package dependencies from a TypeScript/TSX file.
 * Filters out local imports, React, and relative imports.
 */
function extractDependenciesFromFile(filePath: string): string[] {
  const fullPath = path.join(__dirname, "..", filePath);

  if (!fs.existsSync(fullPath)) {
    return [];
  }

  try {
    const content = fs.readFileSync(fullPath, "utf8");
    const dependencies = new Set<string>();

    // Match import statements - handles various import patterns:
    // import { X } from 'package';
    // import X from 'package';
    // import * as X from 'package';
    // import type { X } from 'package';
    // import { X } from '@scope/package';
    // Handles both single and double quotes, and type imports
    const importRegex =
      /^import\s+(?:type\s+)?(?:\{[^}]*\}|\*\s+as\s+\w+|\w+(?:\s*,\s*\{[^}]*\})?)\s+from\s+["']([^"']+)["']/gm;

    let match: RegExpExecArray | null = importRegex.exec(content);
    while (match !== null) {
      const packageName = match[1] as string;

      // Skip local imports (starting with @/, ./, ../)
      if (
        packageName.startsWith("@/") ||
        packageName.startsWith("./") ||
        packageName.startsWith("../")
      ) {
        match = importRegex.exec(content);
        continue;
      }

      // Skip React and React DOM (peer dependencies)
      if (packageName === "react" || packageName === "react-dom") {
        match = importRegex.exec(content);
        continue;
      }

      // Extract the base package name (handle scoped packages like @radix-ui/react-slot)
      // For scoped packages, we want the full scope/package name
      dependencies.add(packageName);

      match = importRegex.exec(content);
    }

    return Array.from(dependencies).sort();
  } catch (error) {
    console.warn(
      `⚠️  Failed to extract dependencies from ${filePath}: ${error instanceof Error ? error.message : String(error)}`
    );
    return [];
  }
}

/**
 * Auto-detect file paths for a component from the filesystem.
 * Scans the component directory to find actual files.
 */
function autoDetectComponentFiles(componentName: string): RegistryFile[] {
  const files: RegistryFile[] = [];

  // Check for folder-based component
  const componentDir = path.join(uiCogniteDir, componentName);
  if (fs.existsSync(componentDir) && fs.statSync(componentDir).isDirectory()) {
    const componentFile = path.join(componentDir, `${componentName}.tsx`);
    if (fs.existsSync(componentFile)) {
      files.push({
        path: `src/components/ui/aura/${componentName}/${componentName}.tsx`,
        target: `src/components/ui/aura/${componentName}.tsx`,
        type: "registry:component",
      });
    }
  } else {
    // Check for flat component file
    const flatFile = path.join(uiCogniteDir, `${componentName}.tsx`);
    if (fs.existsSync(flatFile)) {
      files.push({
        path: `src/components/ui/aura/${componentName}.tsx`,
        type: "registry:component",
      });
    }
  }

  return files;
}

/**
 * Infer component type from file path.
 */
function inferComponentType(filePath: string): string {
  if (filePath.includes("/hooks/")) {
    return "registry:hook";
  }
  if (filePath.includes("/lib/")) {
    return "registry:lib";
  }
  if (filePath.includes("/components/ui/aura/")) {
    return "registry:component";
  }
  return "registry:component"; // Default
}

/**
 * Extract JSDoc metadata (title and description) from a component file.
 */
function extractJSDocMetadata(filePath: string): { title?: string; description?: string } {
  const fullPath = path.join(__dirname, "..", filePath);

  if (!fs.existsSync(fullPath)) {
    return {};
  }

  try {
    const content = fs.readFileSync(fullPath, "utf8");
    const metadata: { title?: string; description?: string } = {};

    // Match JSDoc comments
    // Look for /** ... */ blocks, especially those with @component or component descriptions
    const jsdocRegex = /\/\*\*([^*]|(\*(?!\/)))*\*\//gs;
    const matches = content.match(jsdocRegex);

    if (matches && matches.length > 0) {
      // Use the first JSDoc block
      const jsdoc = matches[0];

      // Extract description (first line or paragraph)
      const descriptionMatch = jsdoc.match(/\*\s+([^\n@]+)/);
      if (descriptionMatch) {
        metadata.description = descriptionMatch[1].trim();
      }

      // Look for @component or component name in comments
      const componentMatch =
        jsdoc.match(/@component\s+(\w+)/i) || jsdoc.match(/(?:component|Component)\s+(\w+)/i);
      if (componentMatch) {
        metadata.title = componentMatch[1];
      }
    }

    // Also check for export function/const with comments above
    const exportWithCommentRegex = /\/\*\*([^*]|(\*(?!\/)))*\*\//s;
    const exportMatch = content.match(exportWithCommentRegex);
    if (exportMatch && !metadata.description) {
      const comment = exportMatch[0];
      const descMatch = comment.match(/\*\s+([^\n@]+)/);
      if (descMatch) {
        metadata.description = descMatch[1].trim();
      }
    }

    return metadata;
  } catch {
    // Silently fail - return empty metadata
    return {};
  }
}

/**
 * Parse local imports to find registry dependencies (component-to-component dependencies).
 * Looks for imports from @/components/ui/aura/* and maps them to registry component names.
 */
function extractRegistryDependenciesFromFile(filePath: string): string[] {
  const fullPath = path.join(__dirname, "..", filePath);

  if (!fs.existsSync(fullPath)) {
    return [];
  }

  try {
    const content = fs.readFileSync(fullPath, "utf8");
    const dependencies = new Set<string>();

    // Match imports from @/components/ui/aura/*
    const localImportRegex = /import\s+.*?\s+from\s+["']@\/components\/ui\/aura\/([^"']+)["']/g;

    let match: RegExpExecArray | null = localImportRegex.exec(content);
    while (match !== null) {
      const importPath = match[1] as string;

      // Extract component name from import path
      // Handle both direct imports (button) and subfolder imports (button/button)
      const componentName = importPath.split("/")[0];

      // Skip if it's the same component (self-import)
      const currentComponent = filePath.match(/src\/components\/ui\/aura\/([^\/]+)/)?.[1];
      if (componentName !== currentComponent) {
        dependencies.add(componentName);
      }

      match = localImportRegex.exec(content);
    }

    return Array.from(dependencies).sort();
  } catch {
    return [];
  }
}

/**
 * Extract dependencies from all component files for a registry item.
 * Only processes files with type registry:component, registry:hook, or registry:lib.
 * Skips stories, metadata, and index files.
 */
function extractDependenciesForComponent(item: RegistryItem): string[] {
  const allDependencies = new Set<string>();

  // Only process component/hook/lib files, skip stories and metadata
  const componentFiles = item.files.filter((file) => {
    const fileType = file.type;
    const fileName = path.basename(file.path);

    // Only process registry component/hook/lib files
    if (
      !fileType.includes("registry:component") &&
      !fileType.includes("registry:hook") &&
      !fileType.includes("registry:lib")
    ) {
      return false;
    }

    // Skip stories, metadata, and index files (re-exports)
    if (
      fileName.includes(".stories.") ||
      fileName.includes(".metadata.") ||
      fileName === "index.tsx" ||
      fileName === "index.ts"
    ) {
      return false;
    }

    return true;
  });

  for (const file of componentFiles) {
    const filePath = file.path;
    const dependencies = extractDependenciesFromFile(filePath);

    for (const dep of dependencies) {
      allDependencies.add(dep);
    }
  }

  return Array.from(allDependencies).sort();
}

// Filter registry to only include specified components and update file paths
function buildRegistry(template: Registry, components: string[]): Registry {
  // First, collect all components including their registry dependencies
  const allComponentsToInclude = new Set<string>();

  // For each component found, recursively collect its registry dependencies
  for (const componentName of components) {
    collectRegistryDependencies(componentName, template, allComponentsToInclude);
  }

  // Log any additional dependencies that were added
  const additionalDeps = Array.from(allComponentsToInclude).filter(
    (name) => !components.includes(name)
  );
  if (additionalDeps.length > 0) {
    console.log(
      `\n📦 Added ${
        additionalDeps.length
      } registry dependency component(s): ${additionalDeps.join(", ")}`
    );
  }

  // Filter and update items
  const filteredItems = template.items
    .filter((item: RegistryItem) => allComponentsToInclude.has(item.name))
    .map((item: RegistryItem) => {
      // Auto-detect file paths if template doesn't have files or files are incomplete
      let autoDetectedFiles: RegistryFile[] = [];
      if (!item.files || item.files.length === 0) {
        autoDetectedFiles = autoDetectComponentFiles(item.name);
      }

      // Use template files as primary, fall back to auto-detected if needed
      const baseFiles = item.files && item.files.length > 0 ? item.files : autoDetectedFiles;

      // Auto-detect component type from first file if not in template
      let componentType = item.type;
      if (!componentType && baseFiles.length > 0) {
        componentType = inferComponentType(baseFiles[0].path);
      }

      // Extract JSDoc metadata from component files
      const jsdocMetadata = baseFiles.length > 0 ? extractJSDocMetadata(baseFiles[0].path) : {};

      // Use template metadata as primary, fall back to JSDoc if available
      const finalTitle = item.title || jsdocMetadata.title || item.name;
      const finalDescription = item.description || jsdocMetadata.description || "";

      // Extract npm package dependencies from component files
      const itemWithBaseFiles = { ...item, files: baseFiles };
      const extractedDeps = extractDependenciesForComponent(itemWithBaseFiles);
      const templateDeps = item.dependencies ?? [];

      // Use extracted dependencies as primary, fall back to template if extraction failed
      let finalDependencies: string[] = [];
      if (extractedDeps.length > 0) {
        finalDependencies = extractedDeps;

        // Log if template and extracted dependencies differ significantly (for validation)
        // Only log if there are meaningful differences
        const templateSet = new Set(templateDeps);
        const extractedSet = new Set(extractedDeps);
        const onlyInTemplate = templateDeps.filter((dep) => !extractedSet.has(dep));
        const onlyInExtracted = extractedDeps.filter((dep) => !templateSet.has(dep));

        // Only warn if there are substantial differences (more than 1 missing dependency)
        if (onlyInTemplate.length > 1 || onlyInExtracted.length > 1) {
          if (onlyInTemplate.length > 1) {
            console.log(
              `   ⚠️  ${item.name}: Template has ${onlyInTemplate.length} dependencies not found in code: ${onlyInTemplate.join(", ")}`
            );
          }
          if (onlyInExtracted.length > 1) {
            console.log(
              `   ⚠️  ${item.name}: Code has ${onlyInExtracted.length} dependencies not in template: ${onlyInExtracted.join(", ")}`
            );
          }
        }
      } else if (templateDeps.length > 0) {
        // Fall back to template if extraction found nothing
        finalDependencies = templateDeps;
        // Only warn if we expected to find dependencies but didn't
        // (skip warning for items that legitimately have no dependencies)
        if (baseFiles.some((f) => f.path.endsWith(".tsx") && !f.path.includes(".stories."))) {
          console.log(`   ⚠️  ${item.name}: Using template dependencies (extraction found none)`);
        }
      }

      // Extract registry dependencies from component files
      const extractedRegistryDeps = new Set<string>();
      for (const file of baseFiles) {
        if (file.path.endsWith(".tsx") && !file.path.includes(".stories.")) {
          const deps = extractRegistryDependenciesFromFile(file.path);
          for (const dep of deps) {
            extractedRegistryDeps.add(dep);
          }
        }
      }

      // Merge template registry dependencies with extracted ones
      const templateRegistryDeps = item.registryDependencies ?? [];
      const mergedRegistryDeps = Array.from(
        new Set([...templateRegistryDeps, ...Array.from(extractedRegistryDeps)])
      );

      // Add 'css' to registry dependencies for all components (except css itself)
      const registryDependenciesRaw =
        componentType === "registry:component" && item.name !== "css"
          ? Array.from(new Set(["css", ...mergedRegistryDeps]))
          : mergedRegistryDeps.length > 0
            ? mergedRegistryDeps
            : item.registryDependencies;

      const registryDependencies = registryDependenciesRaw?.map((dep) => {
        // If already qualified (e.g. "@aura/button") leave it alone
        if (dep.includes("/")) {
          return dep;
        }
        return `${registryDependencyNamespace}/${dep}`;
      });

      // Process and update files
      const processedFiles = baseFiles.map((file: RegistryFile) => {
        // If file already has a target, preserve both path and target as-is
        // (this means it was manually configured for a subfolder component)
        if (file.target) {
          return file;
        }

        // Extract component name from file path (e.g., "icon-conversation-empty-state" from "src/components/ui/aura/icon-conversation-empty-state.tsx")
        const pathMatch = file.path.match(/src\/components\/ui\/aura\/([^\/]+)\.tsx$/);
        if (pathMatch) {
          const componentName = pathMatch[1];
          const actualPath = getComponentPath(componentName);
          const targetPath = getComponentTargetPath(componentName);
          const isSubfolder = actualPath !== targetPath;

          if (isSubfolder) {
            // Subfolder component: set path to actual location and target to flat location
            return {
              ...file,
              path: actualPath,
              target: targetPath,
            };
          }

          // Flat component: just update the path
          return {
            ...file,
            path: actualPath,
          };
        }

        // For non-component files or files that don't match the pattern, return as-is
        return file;
      });

      // Add globals.css to all component files (not hooks, libs, or misc items)
      const finalFiles = [...processedFiles];
      if (componentType === "registry:component" && item.name !== "css") {
        // Check if globals.css is already in the files array
        const hasGlobalsCss = finalFiles.some(
          (f) => f.path === "src/globals.css" || f.path.includes("globals.css")
        );

        if (!hasGlobalsCss) {
          finalFiles.push({
            path: "src/globals.css",
            target: "src/styles.css",
            type: "registry:component",
          });
        }
      }

      return {
        ...item,
        type: componentType,
        title: finalTitle,
        description: finalDescription,
        dependencies: finalDependencies.length > 0 ? finalDependencies : undefined,
        registryDependencies,
        files: finalFiles,
      };
    });

  const miscItemNames = new Set(miscRegistryItems.map((i) => i.name));
  const filteredWithoutMiscNameClashes = filteredItems.filter((i) => !miscItemNames.has(i.name));

  return {
    ...template,
    name: registryName,
    homepage: registryHomepage,
    items: [...miscRegistryItems, ...filteredWithoutMiscNameClashes],
  };
}

// Main execution
async function main(): Promise<void> {
  try {
    // Display build information
    console.log(`\n${"=".repeat(70)}`);
    console.log("🔨 BUILDING COMPONENT REGISTRY");
    console.log("   Source: ui/cognite");
    console.log("   Output: All paths → src/components/ui/aura/");
    console.log("=".repeat(70));

    // Get components from ui/cognite directory
    const components: string[] = getComponents();

    if (components.length === 0) {
      console.log("\n⚠️  No components found in ui/cognite directory");
      console.log("   Registry will be empty (no components to build)");
    }

    // Show what will be built
    console.log(`\n${"─".repeat(70)}`);
    console.log("📋 COMPONENTS TO BE BUILT:");
    console.log("─".repeat(70));

    if (components.length > 0) {
      console.log(`\n   ${components.join(", ")}`);
      console.log(`\n   Total: ${components.length} component(s)`);
    } else {
      console.log("\n   (none)");
    }

    console.log(`\n${"─".repeat(70)}`);
    console.log("📁 OUTPUT:");
    console.log("─".repeat(70));
    console.log("\n   registry.json → Root directory");
    console.log("   Component files → public/r/*.json (via shadcn build)");
    console.log("   All paths point to src/components/ui/aura/");

    // Load template first to check for dependencies
    const template: Registry = loadRegistryTemplate();

    // Build the registry (this will also collect all registry dependencies)
    console.log("\n⏳ Building registry...");
    console.log("📦 Extracting dependencies from component files...");
    const registry: Registry = buildRegistry(template, components);

    fs.writeFileSync(registryOutput, `${JSON.stringify(registry, null, 2)}\n`);

    console.log("\n✅ Successfully built registry.json");
    console.log(`📦 Registry contains ${registry.items.length} component(s)`);

    // Summary of dependency extraction
    const itemsWithDeps = registry.items.filter(
      (item) => item.dependencies && item.dependencies.length > 0
    );
    if (itemsWithDeps.length > 0) {
      console.log(
        `\n📋 ${itemsWithDeps.length} component(s) have dependencies extracted from source files`
      );
    }

    if (components.length > 0) {
      console.log(
        `\n🎉 Components built: ${registry.items.map((i: RegistryItem) => i.name).join(", ")}`
      );
    }

    console.log(`\n${"=".repeat(70)}`);
    console.log("✨ BUILD COMPLETE");
    console.log(`${"=".repeat(70)}\n`);

    if (components.length > 0) {
      console.log("📝 Next steps:");
      console.log("  1. The registry:build command will now:");
      console.log("     - Clean public/r/ directory");
      console.log("     - Run shadcn build to generate component .json files");
      console.log("  2. Commit and push the changes");
      console.log("  3. Deploy your site to make components available\n");
    } else {
      console.log(
        "ℹ️  Note: No components to build. Add .tsx files to:\n     - src/components/ui/aura/\n"
      );
    }
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    console.error("\n❌ Failed to build registry:", errorMessage);
    process.exit(1);
  }
}

main();
