# Publishing Workflow

## Understanding the Build Process

The publishing system has **three key locations** that must stay in sync:

1. **`/cognite/`** - Production-ready component source files
2. **`registry.json`** - Component metadata (what to publish)
3. **`public/r/`** - Published JSON files (what users download)

## The Problem

When you move a component from `/cognite` back to `/draft`, the old files in `public/r/` **don't automatically disappear**. This means:

```bash
# You move button back to draft
mv src/components/ui/cognite/button.tsx src/components/ui/draft/

# But this still exists (stale file!)
public/r/button.json
```

Users could still install the old version even though you've unpublished it.

## The Solution

The `registry:build` command now **automatically cleans** `public/r/` before building:

```bash
npm run registry:build
```

**What happens:**
1. `node scripts/build-registry.js` - Generates `registry.json` from `/cognite` files
2. `npm run registry:clean` - **Removes all files in `public/r/`**
3. `shadcn build` - Generates fresh `public/r/` files from `registry.json`

## Complete Workflow

### Scenario 1: Publishing a Component

```bash
# 1. Move component to production
cp src/components/ui/draft/button.tsx src/components/ui/cognite/

# 2. Build registry (with automatic cleanup)
npm run registry:build

# 3. Deploy
# The public/r/button.json file is now available
```

### Scenario 2: Unpublishing a Component

```bash
# 1. Move component back to draft
mv src/components/ui/cognite/button.tsx src/components/ui/draft/

# 2. Rebuild registry (with automatic cleanup)
npm run registry:build

# 3. Deploy
# The public/r/button.json file is now GONE (cleaned up)
```

### Scenario 3: Updating a Component

```bash
# 1. Edit the production file
vim src/components/ui/cognite/button.tsx

# 2. Rebuild registry (with automatic cleanup)
npm run registry:build

# 3. Deploy
# The public/r/button.json file is updated
```

## Important: `public/r/` is Gitignored

The `public/r/` directory is **not committed to git** because:
- ✅ It's auto-generated from `registry.json`
- ✅ It's a build artifact (like `.next/` or `dist/`)
- ✅ It can be regenerated anytime with `npm run registry:build`

**What this means:**
- Don't commit files in `public/r/`
- They're listed in `.gitignore`
- Each deployment regenerates them fresh

## What Gets Cleaned

The `registry:clean` command does:

```bash
rm -rf public/r      # Remove all old files
mkdir -p public/r    # Recreate empty directory
```

**Files removed:**
- ✅ All `public/r/*.json` files (component definitions)
- ✅ `public/r/registry.json` (main registry index)
- ✅ Any other files that were manually added

**Files preserved:**
- ✅ All other `public/` files (images, assets, etc.)
- ✅ `/cognite/` source files
- ✅ `/draft/` source files
- ✅ `registry.json` (root level, not in public/r/)
- ✅ `registry.template.json`

## Manual Cleanup

If you need to clean the registry without rebuilding:

```bash
npm run registry:clean
```

This is useful for:
- Testing
- Resetting after accidental builds
- Clearing stale files before deployment

## Verification

After running `registry:build`, verify the state:

```bash
# Check what's in cognite
ls src/components/ui/cognite/

# Check what's in registry.json
grep '"name":' registry.json

# Check what's published
ls public/r/
```

All three should match:
- Component in `/cognite` → Entry in `registry.json` → File in `public/r/`

## Common Issues

### Issue: Old components still show up after unpublishing

**Cause:** You deployed without running `registry:build`

**Fix:**
```bash
npm run registry:build  # This cleans and rebuilds
# Then redeploy
```

### Issue: `public/r/` is empty but should have files

**Cause:** `registry.json` is empty (no components in `/cognite`)

**Fix:**
```bash
# Make sure you have components in /cognite
ls src/components/ui/cognite/

# If they're in /draft, move them to /cognite
cp src/components/ui/draft/button.tsx src/components/ui/cognite/

# Rebuild
npm run registry:build
```

### Issue: Registry has wrong URL

**Cause:** Wrong `REGISTRY_URL` in `.env.local`

**Fix:**
```bash
# Edit .env.local
REGISTRY_URL=http://localhost:3000

# Rebuild (script will show the URL and ask for confirmation)
npm run registry:build
```

## Best Practices

### ✅ DO:

1. **Always run `registry:build` after moving components**
   - Moving to `/cognite` → run build
   - Moving back to `/draft` → run build
   - Updating `/cognite` files → run build

2. **Verify before deploying**
   - Check `registry.json` contents
   - Check `public/r/` directory
   - Confirm URL in build output

3. **Use `.env.local` for local development**
   ```bash
   # .env.local
   REGISTRY_URL=http://localhost:3000
   ```

4. **Clean start if confused**
   ```bash
   npm run registry:clean
   npm run registry:build
   ```

### ❌ DON'T:

1. **Don't manually edit `public/r/` files**
   - They'll be deleted on next build
   - Edit source files in `/cognite` instead

2. **Don't skip `registry:build` before deploying**
   - Old files will remain published
   - New files won't be added

3. **Don't edit `registry.json` manually**
   - It's auto-generated from `/cognite`
   - Edit `registry.template.json` for metadata

4. **Don't forget to check the URL**
   - Build script shows URL and asks for confirmation
   - Wrong URL = components published to wrong location

## Summary

**Key Commands:**
```bash
# Full build (recommended)
npm run registry:build

# Just clean (for testing)
npm run registry:clean
```

**The Flow:**
```
/cognite/*.tsx → registry.json → public/r/*.json → Deploy
     ↑                                ↓
     └────── (automatic cleanup) ─────┘
```

**Remember:** `public/r/` is **always rebuilt from scratch** - it reflects whatever is in `/cognite` at build time.

