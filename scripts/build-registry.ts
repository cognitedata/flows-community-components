#!/usr/bin/env node

/**
 * Builds registry.json from community components in:
 * - src/components/ui/community/
 *
 * Community items depend on @cognite/aura (NPM) and install under
 * src/components/ui/community/.
 */

import * as fs from 'node:fs';
import * as path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

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

const communityDir = path.join(__dirname, '../src/components/ui/community');
const registryOutput = path.join(__dirname, '../registry.json');

const registryName = '@aura';
const registryHomepage = 'https://cognitedata.github.io/aura/';
const registryDependencyNamespace = '@aura';

const miscRegistryItems: RegistryItem[] = [
  {
    name: 'theme',
    type: 'registry:file',
    title: 'Theme',
    description: 'Theme component.',
    files: [
      { path: 'src/styleScope.ts', type: 'registry:item' },
      { path: 'src/styleScope.d.ts', type: 'registry:item' },
    ],
  },
];

function toTitleCase(slug: string): string {
  return slug
    .split('-')
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(' ');
}

function getComponents(): string[] {
  if (!fs.existsSync(communityDir)) {
    console.log(
      '⚠️  No community directory found. Creating empty community registry.'
    );
    return [];
  }

  const folderComponents = fs
    .readdirSync(communityDir, { withFileTypes: true })
    .filter((entry) => entry.isDirectory())
    .filter((entry) =>
      fs.existsSync(path.join(communityDir, entry.name, `${entry.name}.tsx`))
    )
    .map((entry) => entry.name)
    .sort();

  console.log(
    `\n✅ Found ${folderComponents.length} community component(s):\n`
  );
  for (const name of folderComponents) {
    console.log(`   - ${name}`);
  }

  return folderComponents;
}

function getComponentSourcePath(componentName: string): string {
  return `src/components/ui/community/${componentName}/${componentName}.tsx`;
}

function getComponentTargetPath(componentName: string): string {
  return `src/components/ui/community/${componentName}.tsx`;
}

function normalizeNpmPackageName(importPath: string): string | null {
  if (
    importPath.startsWith('@/') ||
    importPath.startsWith('./') ||
    importPath.startsWith('../')
  ) {
    return null;
  }

  if (importPath === 'react' || importPath === 'react-dom') {
    return null;
  }

  if (
    importPath === '@cognite/aura' ||
    importPath.startsWith('@cognite/aura/')
  ) {
    return '@cognite/aura';
  }

  if (importPath.startsWith('@')) {
    const parts = importPath.split('/');
    return parts.length >= 2 ? `${parts[0]}/${parts[1]}` : importPath;
  }

  return importPath.split('/')[0] ?? importPath;
}

function extractDependenciesFromFile(filePath: string): string[] {
  const fullPath = path.join(__dirname, '..', filePath);

  if (!fs.existsSync(fullPath)) {
    return [];
  }

  try {
    const content = fs.readFileSync(fullPath, 'utf8');
    const dependencies = new Set<string>();
    const importRegex =
      /^import\s+(?:type\s+)?(?:\{[^}]*\}|\*\s+as\s+\w+|\w+(?:\s*,\s*\{[^}]*\})?)\s+from\s+["']([^"']+)["']/gm;

    let match: RegExpExecArray | null = importRegex.exec(content);
    while (match !== null) {
      const packageName = normalizeNpmPackageName(match[1] as string);
      if (packageName) {
        dependencies.add(packageName);
      }
      match = importRegex.exec(content);
    }

    // Side-effect imports, e.g. `import 'd3-transition';`.
    const sideEffectRegex = /^import\s+["']([^"']+)["']/gm;
    let sideEffect: RegExpExecArray | null = sideEffectRegex.exec(content);
    while (sideEffect !== null) {
      const packageName = normalizeNpmPackageName(sideEffect[1] as string);
      if (packageName) {
        dependencies.add(packageName);
      }
      sideEffect = sideEffectRegex.exec(content);
    }

    return Array.from(dependencies).sort();
  } catch (error) {
    console.warn(
      `⚠️  Failed to extract dependencies from ${filePath}: ${
        error instanceof Error ? error.message : String(error)
      }`
    );
    return [];
  }
}

function extractRegistryDependenciesFromFile(filePath: string): string[] {
  const fullPath = path.join(__dirname, '..', filePath);

  if (!fs.existsSync(fullPath)) {
    return [];
  }

  try {
    const content = fs.readFileSync(fullPath, 'utf8');
    const dependencies = new Set<string>();
    const currentComponent = filePath.match(
      /src\/components\/ui\/community\/([^/]+)/
    )?.[1];

    const localImportRegex =
      /import\s+(?:type\s+)?(?:[\s\S]*?)\s+from\s+["']@\/components\/ui\/community\/([^"']+)["']/g;

    let match: RegExpExecArray | null = localImportRegex.exec(content);
    while (match !== null) {
      const componentName = (match[1] as string).split('/')[0];
      if (componentName && componentName !== currentComponent) {
        dependencies.add(componentName);
      }
      match = localImportRegex.exec(content);
    }

    const importRegex =
      /^import\s+(?:type\s+)?(?:\{[^}]*\}|\*\s+as\s+\w+|\w+(?:\s*,\s*\{[^}]*\})?)\s+from\s+["']([^"']+)["']/gm;

    let relativeMatch: RegExpExecArray | null = importRegex.exec(content);
    while (relativeMatch !== null) {
      const importPath = relativeMatch[1] as string;

      if (!importPath.startsWith('./') && !importPath.startsWith('../')) {
        relativeMatch = importRegex.exec(content);
        continue;
      }

      const resolved = path.resolve(path.dirname(fullPath), importPath);
      const relativeToCommunity = path.relative(communityDir, resolved);

      if (
        relativeToCommunity.startsWith('..') ||
        path.isAbsolute(relativeToCommunity)
      ) {
        relativeMatch = importRegex.exec(content);
        continue;
      }

      const firstSegment = relativeToCommunity
        .split(path.sep)[0]
        ?.replace(/\.(tsx?|jsx?)$/, '');
      if (!firstSegment || firstSegment === currentComponent) {
        relativeMatch = importRegex.exec(content);
        continue;
      }

      const folderComponentPath = path.join(
        communityDir,
        firstSegment,
        `${firstSegment}.tsx`
      );
      if (fs.existsSync(folderComponentPath)) {
        dependencies.add(firstSegment);
      }

      relativeMatch = importRegex.exec(content);
    }

    return Array.from(dependencies).sort();
  } catch {
    return [];
  }
}

function autoDetectComponentFiles(componentName: string): RegistryFile[] {
  const files: RegistryFile[] = [
    {
      path: getComponentSourcePath(componentName),
      target: getComponentTargetPath(componentName),
      type: 'registry:component',
    },
  ];

  const componentDir = path.join(communityDir, componentName);
  if (!fs.existsSync(componentDir)) {
    return files;
  }

  const extraFiles = fs
    .readdirSync(componentDir)
    .filter((name) => name.endsWith('.ts') || name.endsWith('.tsx'))
    .filter(
      (name) =>
        name !== `${componentName}.tsx` &&
        name !== 'index.ts' &&
        name !== 'index.tsx' &&
        !name.includes('.stories.') &&
        !name.includes('.metadata.') &&
        !name.includes('.spec.') &&
        !name.includes('.test.')
    );

  for (const extra of extraFiles) {
    files.push({
      path: `src/components/ui/community/${componentName}/${extra}`,
      target: `src/components/ui/community/${extra}`,
      type: extra.endsWith('.tsx') ? 'registry:component' : 'registry:lib',
    });
  }

  // An optional agent skill ships alongside the component and installs where
  // Claude Code discovers project skills.
  const skillPath = path.join(componentDir, 'SKILL.md');
  if (fs.existsSync(skillPath)) {
    const skillName =
      fs
        .readFileSync(skillPath, 'utf8')
        .match(/^---[\s\S]*?^name:\s*([\w-]+)/m)?.[1] ?? componentName;
    files.push({
      path: `src/components/ui/community/${componentName}/SKILL.md`,
      target: `.claude/skills/${skillName}/SKILL.md`,
      type: 'registry:file',
    });
  }

  return files;
}

function extractJSDocMetadata(filePath: string): {
  title?: string;
  description?: string;
  status?: string;
} {
  const metadataPath = filePath.replace(/\.tsx?$/, '.metadata.ts');
  const fullMetadataPath = path.join(__dirname, '..', metadataPath);

  if (fs.existsSync(fullMetadataPath)) {
    try {
      const content = fs.readFileSync(fullMetadataPath, 'utf8');
      const nameMatch = content.match(/name:\s*["']([^"']+)["']/);
      const descriptionMatch = content.match(/description:\s*["']([^"']+)["']/);
      const statusMatch = content.match(/status:\s*["']([^"']+)["']/);

      const metadata: {
        title?: string;
        description?: string;
        status?: string;
      } = {};
      if (nameMatch) {
        metadata.title = nameMatch[1];
      }
      if (descriptionMatch) {
        metadata.description = descriptionMatch[1];
      }
      if (statusMatch) {
        metadata.status = statusMatch[1];
      }

      if (metadata.title || metadata.description || metadata.status) {
        return metadata;
      }
    } catch {
      // Fall through
    }
  }

  return {};
}

function buildRegistry(components: string[]): Registry {
  const registryItems: RegistryItem[] = components.map((componentName) => {
    const componentPath = getComponentSourcePath(componentName);
    const files = autoDetectComponentFiles(componentName);
    const jsdocMetadata = extractJSDocMetadata(componentPath);
    const dependencies = new Set<string>();

    for (const file of files.filter((entry) => /\.tsx?$/.test(entry.path))) {
      for (const dep of extractDependenciesFromFile(file.path)) {
        dependencies.add(dep);
      }
    }

    const registryDeps = extractRegistryDependenciesFromFile(componentPath).map(
      (dep) =>
        dep.includes('/') ? dep : `${registryDependencyNamespace}/${dep}`
    );

    return {
      name: componentName,
      type:
        jsdocMetadata.status === 'pattern'
          ? 'registry:block'
          : 'registry:component',
      title: jsdocMetadata.title || toTitleCase(componentName),
      description: jsdocMetadata.description || '',
      dependencies:
        dependencies.size > 0 ? Array.from(dependencies).sort() : undefined,
      registryDependencies: registryDeps.length > 0 ? registryDeps : undefined,
      files,
    };
  });

  const miscItemNames = new Set(miscRegistryItems.map((item) => item.name));
  const itemsWithoutMiscNameClashes = registryItems.filter(
    (item) => !miscItemNames.has(item.name)
  );

  return {
    $schema: 'https://ui.shadcn.com/schema/registry.json',
    name: registryName,
    homepage: registryHomepage,
    items: [...miscRegistryItems, ...itemsWithoutMiscNameClashes],
  };
}

async function main(): Promise<void> {
  try {
    console.log(`\n${'='.repeat(70)}`);
    console.log('BUILDING COMMUNITY COMPONENT REGISTRY');
    console.log('   Source: src/components/ui/community/');
    console.log('   Output: src/components/ui/community/');
    console.log('='.repeat(70));

    const components = getComponents();
    const registry = buildRegistry(components);

    fs.writeFileSync(registryOutput, `${JSON.stringify(registry, null, 2)}\n`);

    console.log('\nSuccessfully built registry.json');
    console.log(`Registry contains ${registry.items.length} item(s)`);
    console.log(`Community components: ${components.join(', ') || '(none)'}`);
    console.log(`\n${'='.repeat(70)}\n`);
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    console.error('\nFailed to build registry:', errorMessage);
    process.exit(1);
  }
}

main();
