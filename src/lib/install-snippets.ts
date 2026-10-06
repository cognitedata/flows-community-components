/** Shared install snippets for Flows Community docs. */

export const AURA_REGISTRY_NAMESPACE = '@aura';

/** Where `pnpm run registry:build` output (`public/r/`) is published. */
export const AURA_REGISTRY_BASE_URL =
  'https://cognitedata.github.io/flows-community-components/r';

export const AURA_REGISTRY_URL = `${AURA_REGISTRY_BASE_URL}/{name}.json`;

export const PACKAGE_MANAGERS = ['npm', 'pnpm', 'yarn', 'bun'] as const;

export type PackageManager = (typeof PACKAGE_MANAGERS)[number];

export const DEFAULT_PACKAGE_MANAGER: PackageManager = 'npm';

const shadcnRunner: Record<PackageManager, string> = {
  npm: 'npx shadcn@latest',
  pnpm: 'pnpm dlx shadcn@latest',
  yarn: 'yarn dlx shadcn@latest',
  bun: 'bunx --bun shadcn@latest',
};

const packageInstaller: Record<PackageManager, string> = {
  npm: 'npm install',
  pnpm: 'pnpm add',
  yarn: 'yarn add',
  bun: 'bun add',
};

export type PackageManagerCommands = Record<PackageManager, string>;

function forEachManager(
  build: (manager: PackageManager) => string
): PackageManagerCommands {
  return {
    npm: build('npm'),
    pnpm: build('pnpm'),
    yarn: build('yarn'),
    bun: build('bun'),
  };
}

/** `shadcn add @aura/<name>` — needs the `@aura` registry in components.json. */
export function getInstallCommands(name: string): PackageManagerCommands {
  return forEachManager(
    (manager) =>
      `${shadcnRunner[manager]} add ${AURA_REGISTRY_NAMESPACE}/${name}`
  );
}

/** `shadcn add <url>` — works without configuring the `@aura` namespace. */
export function getInstallFromUrlCommands(
  name: string
): PackageManagerCommands {
  return forEachManager(
    (manager) =>
      `${shadcnRunner[manager]} add ${AURA_REGISTRY_BASE_URL}/${name}.json`
  );
}

/** Writes the `@aura` entry into an existing components.json. */
export const registryAddCommands: PackageManagerCommands = forEachManager(
  (manager) =>
    `${shadcnRunner[manager]} registry add "${AURA_REGISTRY_NAMESPACE}=${AURA_REGISTRY_URL}"`
);

export const auraPackageInstallCommands: PackageManagerCommands =
  forEachManager((manager) => `${packageInstaller[manager]} @cognite/aura`);

export const registriesJsonExample = `{
  "registries": {
    "${AURA_REGISTRY_NAMESPACE}": "${AURA_REGISTRY_URL}"
  }
}`;

export const componentsJsonExample = `{
  "$schema": "https://ui.shadcn.com/schema.json",
  "style": "new-york",
  "rsc": false,
  "tsx": true,
  "tailwind": {
    "config": "",
    "css": "src/styles.css",
    "baseColor": "zinc",
    "cssVariables": true,
    "prefix": ""
  },
  "iconLibrary": "lucide",
  "aliases": {
    "components": "@/components",
    "utils": "@/lib/utils",
    "ui": "@/components/ui",
    "lib": "@/lib",
    "hooks": "@/hooks"
  },
  "registries": {
    "${AURA_REGISTRY_NAMESPACE}": "${AURA_REGISTRY_URL}"
  }
}`;

export const auraStylesCssExample = `@import '@cognite/aura/styles.source.css';

/* Scan installed community components so their utilities are generated */
@source './components/ui/community/**/*.{ts,tsx}';
`;

export const unknownRegistryErrorExample = `Unknown registry "${AURA_REGISTRY_NAMESPACE}". Make sure it is defined under "registries" in your components.json or package.json file`;
