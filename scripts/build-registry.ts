#!/usr/bin/env node

/**
 * Dynamically builds registry.json from draft components in /draft.
 *
 * This ensures only components that have actual implementations in /draft
 * (not barrels or redirects) will be published to the registry.
 *
 * Components in /cognite are production-ready.
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

const draftDir = path.join(__dirname, "../src/components/ui/draft");
const registryTemplate = path.join(__dirname, "../registry.template.json");
const registryOutput = path.join(__dirname, "../registry.json");

// Get all draft components in /draft
function getDraftComponents(): string[] {
  if (!fs.existsSync(draftDir)) {
    console.log("⚠️  No /draft directory found. Creating empty registry.");
    return [];
  }

  const files = fs
    .readdirSync(draftDir)
    .filter((file: string) => file.endsWith(".tsx"));

  console.log(
    `\n✅ Found ${files.length} draft component(s) in /draft:\n`
  );
  files.forEach((file: string) =>
    console.log(`   - ${file.replace(".tsx", "")}`)
  );

  return files.map((file: string) => file.replace(".tsx", ""));
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

// Filter registry to only include draft components
function buildRegistry(
  template: Registry,
  draftComponents: string[]
): Registry {
  const filteredItems = template.items.filter((item: RegistryItem) =>
    draftComponents.includes(item.name)
  );

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
    console.log("=".repeat(70));

    // Get draft components
    const draftComponents: string[] = getDraftComponents();

    if (draftComponents.length === 0) {
      console.log("\n⚠️  No draft components found in /draft");
      console.log("   Registry will be empty (no components to build)");
    }

    // Show what will be built
    console.log("\n" + "─".repeat(70));
    console.log("📋 COMPONENTS TO BE BUILT:");
    console.log("─".repeat(70));

    if (draftComponents.length > 0) {
      console.log(`\n   ${draftComponents.join(", ")}`);
      console.log(`\n   Total: ${draftComponents.length} component(s)`);
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
    const registry: Registry = buildRegistry(template, draftComponents);

    fs.writeFileSync(registryOutput, JSON.stringify(registry, null, 2) + "\n");

    console.log("✅ Successfully built registry.json");
    console.log(
      `📦 Registry contains ${registry.items.length} draft component(s)`
    );

    if (draftComponents.length > 0) {
      console.log(
        `\n🎉 Components built: ${registry.items
          .map((i: RegistryItem) => i.name)
          .join(", ")}`
      );
    }

    console.log("\n" + "=".repeat(70));
    console.log("✨ BUILD COMPLETE");
    console.log("=".repeat(70) + "\n");

    if (draftComponents.length > 0) {
      console.log("📝 Next steps:");
      console.log("  1. The registry:build command will now:");
      console.log("     - Clean public/r/ directory");
      console.log("     - Run shadcn build to generate component .json files");
      console.log("  2. Commit and push the changes");
      console.log("  3. Deploy your site to make components available\n");
    } else {
      console.log(
        "ℹ️  Note: No components to build. Add .tsx files to src/components/ui/draft/\n"
      );
    }
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    console.error("\n❌ Failed to build registry:", errorMessage);
    process.exit(1);
  }
}

main();
