# Publishing Workflow

## Overview

The registry build system automatically generates and maintains component definitions for distribution. It synchronises three locations:

1. **`/cognite/`** - Production-ready component source files
2. **`registry.json`** - Component metadata index
3. **`public/r/`** - Published JSON files that users download

## Build Process

The `registry:build` command performs three steps:

```bash
npm run registry:build
```

1. **Generate** `registry.json` from files in `/cognite`
2. **Clean** all existing files in `public/r/`
3. **Build** fresh JSON files from `registry.json`

This ensures `public/r/` always matches what's in `/cognite/`, removing stale files automatically.

## Component Lifecycle

### Publishing

Add a new component to production:

```bash
# Create component in cognite folder
vim src/components/ui/aura/button.tsx
npm run registry:build
```

### Unpublishing

Remove a component from production:

```bash
rm src/components/ui/aura/button.tsx
npm run registry:build
```

The component is removed from `public/r/` automatically.

### Updating

Edit a production component:

```bash
# Edit the file
vim src/components/ui/aura/button.tsx

# Rebuild to update published version
npm run registry:build
```

## File Management

### Generated Files

The `public/r/` directory contains auto-generated component definitions that are tracked in git alongside the source files.

### What Gets Cleaned

When `registry:build` runs, it removes:

- All `public/r/*.json` files (component definitions)
- `public/r/registry.json` (registry index)

Everything else in `public/` is preserved (images, assets, etc.).

### Manual Cleanup

To clean without rebuilding:

```bash
npm run registry:clean
```

## Verification

After building, verify the output:

```bash
# Check what's in cognite
ls src/components/ui/aura/

# Check what's in registry.json
grep '"name":' registry.json

# Check what's published
ls public/r/
```

All three should match.

## Commands

- **`npm run registry:build`** - Full build (clean + generate + publish)
- **`npm run registry:clean`** - Clean only (removes `public/r/`)

## Build Flow

```
/cognite/*.tsx → registry.json → public/r/*.json → Deploy
```

The `public/r/` directory is always rebuilt from scratch to reflect whatever is currently in `/cognite`.
