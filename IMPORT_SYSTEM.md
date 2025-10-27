# Component Import & Publishing System

This document explains the complete import and publishing workflow for components in this project.

## Table of Contents
1. [Overview](#overview)
2. [Directory Structure](#directory-structure)
3. [How Imports Work](#how-imports-work)
4. [The Fallback System](#the-fallback-system)
5. [Development Workflow](#development-workflow)
6. [Publishing Workflow](#publishing-workflow)
7. [Common Scenarios](#common-scenarios)

---

## Overview

This project uses a **dual-directory system** with **automatic fallback** to separate draft components from production-ready components:

- **`/draft`** - All components (including work-in-progress)
- **`/cognite`** - Only production-ready components
- **Imports** - Always use `/cognite` path (fallback handles the rest)

**Key principle:** Write code once, promote components without refactoring imports.

---

## Directory Structure

```
src/components/ui/
├── cognite/              # Production-ready components (published)
│   └── badge.tsx         # ✅ Production ready
│
└── draft/                # All components (NOT published)
    ├── button.tsx        # 🚧 Work in progress
    ├── accordion.tsx     # 🚧 Work in progress
    ├── badge.tsx         # 🚧 Draft version (shadowed by /cognite)
    └── ... 41 more
```

---

## How Imports Work

### Rule #1: Always Import from `/cognite`

**Everywhere in your codebase:**

```tsx
// ✅ CORRECT - Always use /cognite path
import { Button } from "@/components/ui/cognite/button";
import { Badge } from "@/components/ui/cognite/badge";
import { Accordion } from "@/components/ui/cognite/accordion";
```

```tsx
// ❌ WRONG - Never import directly from /draft
import { Button } from "@/components/ui/draft/button";
```

### Rule #2: The System Handles Resolution

You don't need to know (or care) whether a component is in `/cognite` or `/draft`. The fallback system automatically finds it.

---

## The Fallback System

### How It Works

When you import from `/cognite`, the system follows this resolution order:

```
@/components/ui/cognite/button
    ↓
1. Check: /cognite/button.tsx exists?
    ├─ ✅ YES → Use it (production version)
    └─ ❌ NO  → Continue to step 2
    ↓
2. Check: /draft/button.tsx exists?
    ├─ ✅ YES → Use it (draft version)
    └─ ❌ NO  → Module not found error
```

### Configuration

The fallback is configured in two places:

**`tsconfig.json`** (TypeScript resolution):
```json
{
  "paths": {
    "@/components/ui/cognite/*": [
      "./src/components/ui/cognite/*",
      "./src/components/ui/draft/*"
    ]
  }
}
```

**`next.config.ts`** (Webpack resolution):
```ts
webpack: (config) => {
  config.resolve.alias = {
    '@/components/ui/cognite': [
      path.resolve(__dirname, './src/components/ui/cognite'),
      path.resolve(__dirname, './src/components/ui/draft'),
    ],
  };
  return config;
}
```

### Real-World Example

**Your import:**
```tsx
import { Button } from "@/components/ui/cognite/button";
```

**Current state:**
- `/cognite/button.tsx` → ❌ Doesn't exist
- `/draft/button.tsx` → ✅ Exists

**Resolution:** Uses `/draft/button.tsx`

**After promoting to production:**
```bash
cp src/components/ui/draft/button.tsx src/components/ui/cognite/button.tsx
```

**New state:**
- `/cognite/button.tsx` → ✅ Exists
- `/draft/button.tsx` → ✅ Still exists (but ignored)

**Resolution:** Now uses `/cognite/button.tsx` (production version)

**Your code:** No changes needed! Same import still works.

---

## Development Workflow

### 1. Creating a New Component

```bash
# Create in /draft
touch src/components/ui/draft/my-component.tsx
```

```tsx
// my-component.tsx
export function MyComponent() {
  return <div>My Component</div>;
}
```

### 2. Using the Component

```tsx
// Anywhere in your app
import { MyComponent } from "@/components/ui/cognite/my-component";
```

Even though the file is in `/draft`, you import from `/cognite`. The fallback system resolves it automatically.

### 3. Component Dependencies

If your component depends on other components, always use `/cognite` imports:

```tsx
// sidebar.tsx (in /draft)
import { Sheet } from "@/components/ui/cognite/sheet";
import { Skeleton } from "@/components/ui/cognite/skeleton";

export function Sidebar() {
  return (
    <Sheet>
      <Skeleton />
    </Sheet>
  );
}
```

This works regardless of whether `Sheet` and `Skeleton` are in `/cognite` or `/draft`.

---

## Publishing Workflow

### Step 1: Check Component is Ready

Make sure the component:
- ✅ Has no bugs
- ✅ Follows design guidelines
- ✅ Has proper TypeScript types
- ✅ Is documented

### Step 2: Check Dependencies

```bash
# Find all imports in your component
grep "from.*@/components/ui/cognite" src/components/ui/draft/sidebar.tsx
```

If it depends on other components (e.g., `sheet`, `skeleton`), **promote those first**.

### Step 3: Promote to Production

```bash
# Copy from /draft to /cognite
cp src/components/ui/draft/button.tsx src/components/ui/cognite/button.tsx
```

**Note:** Keep the file in `/draft` too. It won't be used (shadowed by `/cognite`), but it's fine to leave it.

### Step 4: Update Registry Dependencies (if needed)

If your component imports other components, declare them in `registry.template.json`:

```json
{
  "name": "sidebar",
  "registryDependencies": ["sheet", "skeleton"],
  "files": [...]
}
```

### Step 5: Build & Publish

```bash
# Generate registry.json (only includes /cognite components)
npm run registry:build
```

This script:
1. Scans `/cognite` directory
2. Filters `registry.template.json` to include only those components
3. Generates `registry.json`
4. Builds shadcn registry files to `/public/r/`

---

## Common Scenarios

### Scenario 1: All Components in Draft

**Files:**
```
/cognite/     (empty)
/draft/
  ├── button.tsx
  ├── badge.tsx
  └── accordion.tsx
```

**Imports work:**
```tsx
import { Button } from "@/components/ui/cognite/button";     // ✅ Resolves to /draft/button.tsx
import { Badge } from "@/components/ui/cognite/badge";       // ✅ Resolves to /draft/badge.tsx
import { Accordion } from "@/components/ui/cognite/accordion"; // ✅ Resolves to /draft/accordion.tsx
```

**Publishing:** `registry.json` contains 0 components (nothing to publish yet).

---

### Scenario 2: Mixed (Some Production, Some Draft)

**Files:**
```
/cognite/
  ├── button.tsx    ← Production ready
  └── badge.tsx     ← Production ready

/draft/
  ├── button.tsx    (shadowed)
  ├── badge.tsx     (shadowed)
  └── accordion.tsx
```

**Imports work:**
```tsx
import { Button } from "@/components/ui/cognite/button";     // ✅ Uses /cognite/button.tsx
import { Badge } from "@/components/ui/cognite/badge";       // ✅ Uses /cognite/badge.tsx
import { Accordion } from "@/components/ui/cognite/accordion"; // ✅ Uses /draft/accordion.tsx
```

**Publishing:** `registry.json` contains 2 components: `button`, `badge`.

---

### Scenario 3: Component with Dependencies

**Files:**
```
/cognite/
  ├── sidebar.tsx
  ├── sheet.tsx
  └── skeleton.tsx

/draft/
  └── ... (all components)
```

**sidebar.tsx:**
```tsx
import { Sheet } from "@/components/ui/cognite/sheet";
import { Skeleton } from "@/components/ui/cognite/skeleton";
```

**registry.template.json:**
```json
{
  "name": "sidebar",
  "registryDependencies": ["sheet", "skeleton"]
}
```

**Publishing:** When users install `sidebar`, they automatically get `sheet` and `skeleton` too.

---

### Scenario 4: Promoting a Component

**Before:**
```
/cognite/     (empty)
/draft/
  └── button.tsx
```

**Your code:**
```tsx
import { Button } from "@/components/ui/cognite/button";
// Resolves to: /draft/button.tsx
```

**Promote:**
```bash
cp src/components/ui/draft/button.tsx src/components/ui/cognite/button.tsx
```

**After:**
```
/cognite/
  └── button.tsx   ← NEW
/draft/
  └── button.tsx   (now shadowed)
```

**Your code:** (unchanged)
```tsx
import { Button } from "@/components/ui/cognite/button";
// Now resolves to: /cognite/button.tsx
```

**No refactoring needed!** The fallback system automatically switches to the production version.

---

## Benefits of This System

### ✅ **1. No Import Refactoring**
Promote components without changing a single import statement.

### ✅ **2. Gradual Migration**
Move components to production one at a time, at your own pace.

### ✅ **3. Consistent Codebase**
All imports use the same pattern, regardless of component status.

### ✅ **4. Safe Publishing**
Only components in `/cognite` get published - no accidental draft releases.

### ✅ **5. Clear Separation**
Easy to see what's production-ready (`/cognite`) vs work-in-progress (`/draft`).

### ✅ **6. Component Status Detection**
Documentation automatically shows "Production Ready" vs "Draft" based on file location.

---

## Key Files

| File | Purpose |
|------|---------|
| `tsconfig.json` | TypeScript path mapping for fallback |
| `next.config.ts` | Webpack alias for fallback |
| `registry.template.json` | Master list of all components with metadata |
| `registry.json` | Auto-generated list of production components only |
| `scripts/build-registry.js` | Generates `registry.json` from `/cognite` files |

---

## Quick Reference

### Always Do ✅
- Import from `/cognite` path
- Develop in `/draft` directory
- Promote by copying to `/cognite`
- Declare `registryDependencies` for component dependencies
- Run `npm run registry:build` before publishing

### Never Do ❌
- Import from `/draft` path
- Edit `registry.json` manually (it's auto-generated)
- Publish components with unmet dependencies
- Delete files from `/draft` after promoting

---

## Troubleshooting

### "Module not found: Can't resolve '@/components/ui/cognite/button'"

**Cause:** Component doesn't exist in `/cognite` OR `/draft`.

**Fix:** Create the component in `/draft` first:
```bash
touch src/components/ui/draft/button.tsx
```

### "Component imports are broken after promoting"

**Cause:** Dependencies weren't promoted with the component.

**Fix:** Check component imports and promote dependencies first:
```bash
# Find dependencies
grep "from.*@/components/ui/cognite" src/components/ui/cognite/sidebar.tsx

# Promote them first
cp src/components/ui/draft/sheet.tsx src/components/ui/cognite/
cp src/components/ui/draft/skeleton.tsx src/components/ui/cognite/
```

### "Registry build includes 0 components but I have files in /cognite"

**Cause:** Files might not have `.tsx` extension or directory doesn't exist.

**Fix:** Verify files:
```bash
ls -la src/components/ui/cognite/
```

---

## Summary

**Import System:**
```
Always use:  @/components/ui/cognite/*
Resolves to: /cognite/* (if exists) OR /draft/* (fallback)
```

**Publishing:**
```
/draft     → Work in progress (NOT published)
/cognite   → Production ready (PUBLISHED)
```

**Workflow:**
```
Create → Develop in /draft
       → Copy to /cognite when ready
       → npm run registry:build
       → Publish
```

**Result:** Zero refactoring, clean separation, safe publishing. 🚀

