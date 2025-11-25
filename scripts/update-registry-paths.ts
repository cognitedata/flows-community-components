#!/usr/bin/env node

/**
 * Updates all JSON files in public/r/ to change paths from
 * src/components/ui/cognite/ to src/components/ui/aura/
 */

import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';

// Get __dirname equivalent in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

interface RegistryFile {
  path: string;
  type: string;
  content?: string;
}

interface RegistryItem {
  $schema?: string;
  name: string;
  type: string;
  title?: string;
  description?: string;
  dependencies?: string[];
  registryDependencies?: string[];
  files: RegistryFile[];
}

const publicRDir = path.join(__dirname, '../public/r');

function updateRegistryPaths(): void {
  if (!fs.existsSync(publicRDir)) {
    console.error(`❌ Directory not found: ${publicRDir}`);
    process.exit(1);
  }

  const files = fs.readdirSync(publicRDir).filter((file) => file.endsWith('.json'));

  if (files.length === 0) {
    console.log('⚠️  No JSON files found in public/r/');
    return;
  }

  console.log(`\n📁 Found ${files.length} JSON file(s) in public/r/\n`);

  let updatedCount = 0;
  let skippedCount = 0;

  for (const file of files) {
    const filePath = path.join(publicRDir, file);

    try {
      const content = fs.readFileSync(filePath, 'utf8');
      const data: RegistryItem = JSON.parse(content);

      // Check if files array exists and has at least one element
      if (!data.files || data.files.length === 0) {
        console.log(`⏭️  Skipping ${file} (no files array or empty)`);
        skippedCount++;
        continue;
      }

      const oldPath = data.files[0].path;
      let hasChanges = false;
      
      // Update path if it contains cognite
      if (oldPath && oldPath.includes('src/components/ui/cognite/')) {
        const newPath = oldPath.replace('src/components/ui/cognite/', 'src/components/ui/aura/');
        data.files[0].path = newPath;
        hasChanges = true;
        console.log(`   Path: ${oldPath} → ${newPath}`);
      }
      
      // Update content imports from @/lib/utils to #common/utils
      if (data.files[0].content) {
        const oldContent = data.files[0].content;
        // Replace @/lib/utils with #common/utils using regex
        const newContent = oldContent.replace(/@\/lib\/utils/g, '#common/utils');
        if (oldContent !== newContent) {
          data.files[0].content = newContent;
          hasChanges = true;
          console.log(`   Content: Updated imports from @/lib/utils to #common/utils`);
        }
      }
      
      // Write updated JSON back to file if there were changes
      if (hasChanges) {
        fs.writeFileSync(filePath, JSON.stringify(data, null, 2) + '\n', 'utf8');
        console.log(`✅ Updated ${file}`);
        updatedCount++;
      } else {
        console.log(`⏭️  Skipping ${file} (no changes needed)`);
        skippedCount++;
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : String(error);
      console.error(`❌ Error processing ${file}: ${errorMessage}`);
    }
  }

  console.log(`\n${'='.repeat(70)}`);
  console.log(`✨ Update complete!`);
  console.log(`   Updated: ${updatedCount} file(s)`);
  console.log(`   Skipped: ${skippedCount} file(s)`);
  console.log(`${'='.repeat(70)}\n`);
}

// Main execution
updateRegistryPaths();

