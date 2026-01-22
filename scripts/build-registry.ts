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


/**
 * Build a dependency graph from all components by extracting registry dependencies.
 * Returns a Map where keys are component names and values are sets of dependency names.
 */
function buildDependencyGraph(components: string[]): Map<string, Set<string>> {
  const graph = new Map<string, Set<string>>();

  for (const componentName of components) {
    const componentPath = getComponentPath(componentName);
    const deps = extractRegistryDependenciesFromFile(componentPath);
    graph.set(componentName, new Set(deps));
  }

  return graph;
}

// Recursively collect all registry dependencies for a component
function collectRegistryDependencies(
  componentName: string,
  graph: Map<string, Set<string>>,
  collected: Set<string>
): void {
  if (collected.has(componentName)) {
    return; // Already collected
  }

  // Add this component to collected set
  collected.add(componentName);

  // Recursively collect dependencies from graph
  const deps = graph.get(componentName);
  if (deps) {
    for (const depName of deps) {
      // Remove @aura/ prefix if present to get clean component name
      const cleanDepName = depName.replace(/^@aura\//, "");
      if (graph.has(cleanDepName)) {
        collectRegistryDependencies(cleanDepName, graph, collected);
      }
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

/**
 * Process files for a component, resolving paths and adding targets for subfolder components.
 */
function processComponentFiles(
  files: RegistryFile[],
  componentName: string
): RegistryFile[] {
  return files.map((file: RegistryFile) => {
    // If file already has a target, preserve both path and target as-is
    if (file.target) {
      return file;
    }

    // Extract component name from file path
    const pathMatch = file.path.match(/src\/components\/ui\/aura\/([^\/]+)\.tsx$/);
    if (pathMatch) {
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
}

// Build registry entirely from filesystem discovery
function buildRegistry(components: string[]): Registry {
  // Build dependency graph from all components
  const graph = buildDependencyGraph(components);

  // Collect all components including transitive dependencies
  const allComponentsToInclude = new Set<string>();
  for (const componentName of components) {
    collectRegistryDependencies(componentName, graph, allComponentsToInclude);
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

  // Generate registry items from discovered components
  const registryItems: RegistryItem[] = Array.from(allComponentsToInclude).map(
    (componentName) => {
      const componentPath = getComponentPath(componentName);
      const baseFiles = autoDetectComponentFiles(componentName);
      const componentType = baseFiles.length > 0 ? inferComponentType(baseFiles[0].path) : "registry:component";
      const jsdocMetadata = extractJSDocMetadata(componentPath);

      // Extract npm package dependencies
      const itemWithFiles = { name: componentName, files: baseFiles };
      const extractedDeps = extractDependenciesForComponent(itemWithFiles);

      // Extract registry dependencies from graph
      const registryDepsFromGraph = graph.get(componentName) || new Set<string>();

      // Add 'css' to registry dependencies for all components (except css itself)
      const registryDependenciesRaw =
        componentType === "registry:component" && componentName !== "css"
          ? Array.from(new Set(["css", ...Array.from(registryDepsFromGraph)]))
          : Array.from(registryDepsFromGraph);

      const registryDependencies =
        registryDependenciesRaw.length > 0
          ? registryDependenciesRaw.map((dep) => {
              // If already qualified (e.g. "@aura/button") leave it alone
              if (dep.includes("/")) {
                return dep;
              }
              return `${registryDependencyNamespace}/${dep}`;
            })
          : undefined;

      // Process files
      const processedFiles = processComponentFiles(baseFiles, componentName);

      // Add globals.css to all component files (not hooks, libs, or misc items)
      const finalFiles = [...processedFiles];
      if (componentType === "registry:component" && componentName !== "css") {
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
        name: componentName,
        type: componentType,
        title: jsdocMetadata.title || componentName,
        description: jsdocMetadata.description || "",
        dependencies: extractedDeps.length > 0 ? extractedDeps : undefined,
        registryDependencies,
        files: finalFiles,
      };
    }
  );

  const miscItemNames = new Set(miscRegistryItems.map((i) => i.name));
  const itemsWithoutMiscNameClashes = registryItems.filter(
    (i) => !miscItemNames.has(i.name)
  );

  return {
    $schema: "https://ui.shadcn.com/schema/registry.json",
    name: registryName,
    homepage: registryHomepage,
    items: [...miscRegistryItems, ...itemsWithoutMiscNameClashes],
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

    // Build the registry entirely from filesystem discovery
    console.log("\n⏳ Building registry...");
    console.log("📦 Extracting dependencies from component files...");
    const registry: Registry = buildRegistry(components);

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
