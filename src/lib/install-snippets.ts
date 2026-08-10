/** Shared install snippets for Flows Community docs. */

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
    "@aura": "https://cognitedata.github.io/aura/r/{name}.json"
  }
}`;

export const auraStylesCssExample = `@import '@cognite/aura/styles.source.css';

/* Scan installed community components so their utilities are generated */
@source './components/ui/community/**/*.{ts,tsx}';
`;

export const installCommandExample = 'pnpm dlx shadcn@latest add @aura/drawer';
