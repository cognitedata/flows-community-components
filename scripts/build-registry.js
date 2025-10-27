#!/usr/bin/env node

/**
 * Dynamically builds registry.json from production-ready components in /cognite.
 * 
 * This ensures only components that have actual implementations in /cognite
 * (not barrels or redirects) will be published to the registry.
 * 
 * Components in /draft will never be published.
 */

const fs = require('fs');
const path = require('path');

// Load environment variables from .env.local
require('dotenv').config({ path: path.join(__dirname, '../.env.local') });

const cogniteDir = path.join(__dirname, '../src/components/ui/cognite');
const registryTemplate = path.join(__dirname, '../registry.template.json');
const registryOutput = path.join(__dirname, '../registry.json');

// Get registry URL from environment or use default
function getRegistryUrl() {
  const registryUrl = process.env.REGISTRY_URL || 'https://cognite-one.vercel.app';
  // Remove trailing slash if present
  return registryUrl.replace(/\/$/, '');
}


// Get all production-ready components in /cognite
function getProductionComponents() {
  if (!fs.existsSync(cogniteDir)) {
    console.log('⚠️  No /cognite directory found. Creating empty registry.');
    return [];
  }

  const files = fs.readdirSync(cogniteDir).filter(file => file.endsWith('.tsx'));
  
  console.log(`\n✅ Found ${files.length} production-ready component(s) in /cognite:\n`);
  files.forEach(file => console.log(`   - ${file.replace('.tsx', '')}`));
  
  return files.map(file => file.replace('.tsx', ''));
}

// Load the full registry template (includes all component metadata)
function loadRegistryTemplate() {
  if (!fs.existsSync(registryTemplate)) {
    console.error('❌ registry.template.json not found!');
    console.log('\nPlease create registry.template.json with all component definitions.');
    process.exit(1);
  }

  return JSON.parse(fs.readFileSync(registryTemplate, 'utf8'));
}

// Filter registry to only include production components
function buildRegistry(template, productionComponents) {
  const filteredItems = template.items.filter(item => 
    productionComponents.includes(item.name)
  );

  return {
    ...template,
    items: filteredItems,
  };
}

// Main execution
async function main() {
  try {
    // Get registry URL
    const registryUrl = getRegistryUrl();
    const isDefault = !process.env.REGISTRY_URL;
    
    // Display build information
    console.log('\n' + '='.repeat(70));
    console.log('🔨 BUILDING COMPONENT REGISTRY');
    console.log('='.repeat(70));
    
    // Get production components
    const productionComponents = getProductionComponents();
    
    if (productionComponents.length === 0) {
      console.log('\n⚠️  No production components found in /cognite');
      console.log('   Registry will be empty (no components to build)');
    }
    
    // Show what will be built
    console.log('\n' + '─'.repeat(70));
    console.log('📋 COMPONENTS TO BE BUILT:');
    console.log('─'.repeat(70));
    
    if (productionComponents.length > 0) {
      console.log(`\n   ${productionComponents.join(', ')}`);
      console.log(`\n   Total: ${productionComponents.length} component(s)`);
    } else {
      console.log('\n   (none)');
    }
    
    console.log('\n' + '─'.repeat(70));
    console.log('📁 OUTPUT:');
    console.log('─'.repeat(70));
    console.log('\n   registry.json → Root directory');
    console.log('   Component files → public/r/*.json (via shadcn build)');
    
    // Build the registry
    console.log('\n⏳ Building registry...');
    const template = loadRegistryTemplate();
    const registry = buildRegistry(template, productionComponents);

    fs.writeFileSync(registryOutput, JSON.stringify(registry, null, 2) + '\n');

    console.log('✅ Successfully built registry.json');
    console.log(`📦 Registry contains ${registry.items.length} production component(s)`);
    
    if (productionComponents.length > 0) {
      console.log(`\n🎉 Components built: ${registry.items.map(i => i.name).join(', ')}`);
    }
    
    console.log('\n' + '='.repeat(70));
    console.log('✨ BUILD COMPLETE');
    console.log('='.repeat(70) + '\n');
    
    if (productionComponents.length > 0) {
      console.log('📝 Next steps:');
      console.log('  1. The registry:build command will now:');
      console.log('     - Clean public/r/ directory');
      console.log('     - Run shadcn build to generate component .json files');
      console.log('  2. Commit and push the changes');
      console.log('  3. Deploy your site to make components available\n');
    } else {
      console.log('ℹ️  Note: No components to build. Add .tsx files to src/components/ui/cognite/\n');
    }
    
  } catch (error) {
    console.error('\n❌ Failed to build registry:', error.message);
    process.exit(1);
  }
}

main();

