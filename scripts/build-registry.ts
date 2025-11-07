#!/usr/bin/env node

/**
 * Dynamically builds registry.json from production-ready components in /cognite.
 *
 * This ensures only components that have actual implementations in /cognite
 * (not barrels or redirects) will be published to the registry.
 *
 * Components in /draft will never be published unless --all flag is used.
 * When --all is used, components from both /cognite and /draft are included.
 */

import * as fs from "fs";
import * as path from "path";
import { fileURLToPath } from "url";

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

const uiCogniteDir = path.join(__dirname, "../src/components/ui/cognite");
const uiDraftDir = path.join(__dirname, "../src/components/ui/draft");
const aiCogniteDir = path.join(
  __dirname,
  "../src/components/ai-elements/cognite"
);
const aiDraftDir = path.join(__dirname, "../src/components/ai-elements/draft");
const registryTemplate = path.join(__dirname, "../registry.template.json");
const registryOutput = path.join(__dirname, "../registry.json");

// Parse command-line arguments
const includeAll = process.argv.includes("--all");

// Get all components from cognite and optionally draft directories
function getComponents(includeDraft: boolean = false): string[] {
  const components: Set<string> = new Set();

  // Scan UI components from cognite
  if (fs.existsSync(uiCogniteDir)) {
    const uiFiles = fs
      .readdirSync(uiCogniteDir)
      .filter((file: string) => file.endsWith(".tsx"))
      .map((file: string) => file.replace(".tsx", ""));
    uiFiles.forEach((file: string) => components.add(file));

    console.log(
      `\n✅ Found ${uiFiles.length} production-ready UI component(s) in ui/cognite:\n`
    );
    uiFiles.forEach((file: string) => console.log(`   - ${file}`));
  }

  // Scan UI components from draft (if --all flag is set)
  if (includeDraft && fs.existsSync(uiDraftDir)) {
    const uiDraftFiles = fs
      .readdirSync(uiDraftDir)
      .filter((file: string) => file.endsWith(".tsx"))
      .map((file: string) => file.replace(".tsx", ""));
    uiDraftFiles.forEach((file: string) => components.add(file));

    console.log(
      `\n✅ Found ${uiDraftFiles.length} draft UI component(s) in ui/draft:\n`
    );
    uiDraftFiles.forEach((file: string) => console.log(`   - ${file}`));
  }

  // Scan AI components from cognite
  if (fs.existsSync(aiCogniteDir)) {
    const aiFiles = fs
      .readdirSync(aiCogniteDir)
      .filter((file: string) => file.endsWith(".tsx"))
      .map((file: string) => file.replace(".tsx", ""));
    aiFiles.forEach((file: string) => components.add(file));

    console.log(
      `\n✅ Found ${aiFiles.length} production-ready AI component(s) in ai-elements/cognite:\n`
    );
    aiFiles.forEach((file: string) => console.log(`   - ${file}`));
  }

  // Scan AI components from draft (if --all flag is set)
  if (includeDraft && fs.existsSync(aiDraftDir)) {
    const aiDraftFiles = fs
      .readdirSync(aiDraftDir)
      .filter((file: string) => file.endsWith(".tsx"))
      .map((file: string) => file.replace(".tsx", ""));
    aiDraftFiles.forEach((file: string) => components.add(file));

    console.log(
      `\n✅ Found ${aiDraftFiles.length} draft AI component(s) in ai-elements/draft:\n`
    );
    aiDraftFiles.forEach((file: string) => console.log(`   - ${file}`));
  }

  if (components.size === 0) {
    const sourceDirs = includeDraft ? "/cognite and /draft" : "/cognite";
    console.log(
      `⚠️  No components found in ${sourceDirs} directories. Creating empty registry.`
    );
  }

  return Array.from(components);
}

// Load the full registry template (includes all component metadata)
function loadRegistryTemplate(): Registry {
  if (!fs.existsSync(registryTemplate)) {
    console.error("❌ registry.template.json not found!");
    console.log(
      "\nPlease create registry.template.json with all component definitions."
    );
    process.exit(1);
  }

  const content = fs.readFileSync(registryTemplate, "utf8");
  return JSON.parse(content) as Registry;
}

// Get the actual file path for a component (cognite takes precedence over draft)
function getComponentFilePath(
  componentName: string,
  componentType: "ui" | "ai" = "ui"
): string | null {
  const baseDir =
    componentType === "ui"
      ? path.join(__dirname, "../src/components/ui")
      : path.join(__dirname, "../src/components/ai-elements");

  // Check cognite first (takes precedence)
  const cognitePath = path.join(baseDir, "cognite", `${componentName}.tsx`);
  if (fs.existsSync(cognitePath)) {
    return componentType === "ui"
      ? `src/components/ui/cognite/${componentName}.tsx`
      : `src/components/ai-elements/cognite/${componentName}.tsx`;
  }

  // Check draft if cognite doesn't exist
  const draftPath = path.join(baseDir, "draft", `${componentName}.tsx`);
  if (fs.existsSync(draftPath)) {
    return componentType === "ui"
      ? `src/components/ui/draft/${componentName}.tsx`
      : `src/components/ai-elements/draft/${componentName}.tsx`;
  }

  return null;
}

// Filter registry to only include specified components and update file paths
function buildRegistry(
  template: Registry,
  components: string[]
): Registry {
  const filteredItems = template.items
    .filter((item: RegistryItem) => components.includes(item.name))
    .map((item: RegistryItem) => {
      // Determine if this is a UI or AI component based on the original path
      const originalPath = item.files[0]?.path || "";
      const isAIComponent = originalPath.includes("ai-elements");
      const componentType: "ui" | "ai" = isAIComponent ? "ai" : "ui";

      // Get the actual file path (cognite takes precedence)
      const actualPath = getComponentFilePath(item.name, componentType);

      if (actualPath) {
        // Update the file path to point to the correct location
        return {
          ...item,
          files: item.files.map((file: RegistryFile) => ({
            ...file,
            path: actualPath,
          })),
        };
      }

      // If path not found, return item as-is (shouldn't happen, but just in case)
      return item;
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
    console.log("\n" + "=".repeat(70));
    console.log("🔨 BUILDING COMPONENT REGISTRY");
    if (includeAll) {
      console.log("   Mode: Including components from /cognite and /draft");
    } else {
      console.log("   Mode: Production only (components from /cognite)");
      console.log("   Use --all flag to include draft components");
    }
    console.log("=".repeat(70));

    // Get components (from cognite and optionally draft)
    const components: string[] = getComponents(includeAll);

    if (components.length === 0) {
      const sourceDirs = includeAll ? "/cognite and /draft" : "/cognite";
      console.log(`\n⚠️  No components found in ${sourceDirs}`);
      console.log("   Registry will be empty (no components to build)");
    }

    // Show what will be built
    console.log("\n" + "─".repeat(70));
    console.log("📋 COMPONENTS TO BE BUILT:");
    console.log("─".repeat(70));

    if (components.length > 0) {
      console.log(`\n   ${components.join(", ")}`);
      console.log(`\n   Total: ${components.length} component(s)`);
    } else {
      console.log("\n   (none)");
    }

    console.log("\n" + "─".repeat(70));
    console.log("📁 OUTPUT:");
    console.log("─".repeat(70));
    console.log("\n   registry.json → Root directory");
    console.log("   Component files → public/r/*.json (via shadcn build)");

    // Build the registry
    console.log("\n⏳ Building registry...");
    const template: Registry = loadRegistryTemplate();
    const registry: Registry = buildRegistry(template, components);

    fs.writeFileSync(registryOutput, JSON.stringify(registry, null, 2) + "\n");

    console.log("✅ Successfully built registry.json");
    const componentType = includeAll ? "component" : "production component";
    console.log(
      `📦 Registry contains ${registry.items.length} ${componentType}(s)`
    );

    if (components.length > 0) {
      console.log(
        `\n🎉 Components built: ${registry.items
          .map((i: RegistryItem) => i.name)
          .join(", ")}`
      );
    }

    console.log("\n" + "=".repeat(70));
    console.log("✨ BUILD COMPLETE");
    console.log("=".repeat(70) + "\n");

    if (components.length > 0) {
      console.log("📝 Next steps:");
      console.log("  1. The registry:build command will now:");
      console.log("     - Clean public/r/ directory");
      console.log("     - Run shadcn build to generate component .json files");
      console.log("  2. Commit and push the changes");
      console.log("  3. Deploy your site to make components available\n");
    } else {
      const sourceDirs = includeAll
        ? "src/components/ui/cognite/ or src/components/ui/draft/"
        : "src/components/ui/cognite/";
      console.log(
        `ℹ️  Note: No components to build. Add .tsx files to ${sourceDirs}\n`
      );
    }
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    console.error("\n❌ Failed to build registry:", errorMessage);
    process.exit(1);
  }
}

main();
