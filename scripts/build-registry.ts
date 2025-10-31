#!/usr/bin/env node

/**
 * Dynamically builds registry.json from production-ready components in /cognite.
 *
 * This ensures only components that have actual implementations in /cognite
 * (not barrels or redirects) will be published to the registry.
 *
 * Components in /draft will never be published.
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
const aiCogniteDir = path.join(__dirname, "../src/components/ai-elements/cognite");
const registryTemplate = path.join(__dirname, "../registry.template.json");
const registryOutput = path.join(__dirname, "../registry.json");

// Get all production-ready components in /cognite directories
function getProductionComponents(): string[] {
  const components: string[] = [];
  
  // Scan UI components
  if (fs.existsSync(uiCogniteDir)) {
    const uiFiles = fs
      .readdirSync(uiCogniteDir)
      .filter((file: string) => file.endsWith(".tsx"))
      .map((file: string) => file.replace(".tsx", ""));
    components.push(...uiFiles);
    
    console.log(
      `\n✅ Found ${uiFiles.length} production-ready UI component(s) in ui/cognite:\n`
    );
    uiFiles.forEach((file: string) =>
      console.log(`   - ${file}`)
    );
  }
  
  // Scan AI components
  if (fs.existsSync(aiCogniteDir)) {
    const aiFiles = fs
      .readdirSync(aiCogniteDir)
      .filter((file: string) => file.endsWith(".tsx"))
      .map((file: string) => file.replace(".tsx", ""));
    components.push(...aiFiles);
    
    console.log(
      `\n✅ Found ${aiFiles.length} production-ready AI component(s) in ai-elements/cognite:\n`
    );
    aiFiles.forEach((file: string) =>
      console.log(`   - ${file}`)
    );
  }
  
  if (components.length === 0) {
    console.log("⚠️  No /cognite directories found. Creating empty registry.");
  }

  return components;
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

// Filter registry to only include production components
function buildRegistry(
  template: Registry,
  productionComponents: string[]
): Registry {
  const filteredItems = template.items.filter((item: RegistryItem) =>
    productionComponents.includes(item.name)
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

    // Get production components
    const productionComponents: string[] = getProductionComponents();

    if (productionComponents.length === 0) {
      console.log("\n⚠️  No production components found in /cognite");
      console.log("   Registry will be empty (no components to build)");
    }

    // Show what will be built
    console.log("\n" + "─".repeat(70));
    console.log("📋 COMPONENTS TO BE BUILT:");
    console.log("─".repeat(70));

    if (productionComponents.length > 0) {
      console.log(`\n   ${productionComponents.join(", ")}`);
      console.log(`\n   Total: ${productionComponents.length} component(s)`);
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
    const registry: Registry = buildRegistry(template, productionComponents);

    fs.writeFileSync(registryOutput, JSON.stringify(registry, null, 2) + "\n");

    console.log("✅ Successfully built registry.json");
    console.log(
      `📦 Registry contains ${registry.items.length} production component(s)`
    );

    if (productionComponents.length > 0) {
      console.log(
        `\n🎉 Components built: ${registry.items
          .map((i: RegistryItem) => i.name)
          .join(", ")}`
      );
    }

    console.log("\n" + "=".repeat(70));
    console.log("✨ BUILD COMPLETE");
    console.log("=".repeat(70) + "\n");

    if (productionComponents.length > 0) {
      console.log("📝 Next steps:");
      console.log("  1. The registry:build command will now:");
      console.log("     - Clean public/r/ directory");
      console.log("     - Run shadcn build to generate component .json files");
      console.log("  2. Commit and push the changes");
      console.log("  3. Deploy your site to make components available\n");
    } else {
      console.log(
        "ℹ️  Note: No components to build. Add .tsx files to src/components/ui/cognite/\n"
      );
    }
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    console.error("\n❌ Failed to build registry:", errorMessage);
    process.exit(1);
  }
}

main();
