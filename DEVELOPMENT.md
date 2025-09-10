# Development Guide

## Cache Management & Stability

This project has been optimized to prevent the common Next.js cache corruption issues that cause ENOENT errors during development.

### 🛠️ **Development Scripts**

| Script | Purpose | When to Use |
|--------|---------|-------------|
| `npm run dev` | Standard development (stable, no Turbopack) | ✅ **Default choice** - Most stable |
| `npm run dev:safe` | Auto-cleans cache then starts dev | 🔧 **When experiencing issues** |
| `npm run dev:turbo` | Development with Turbopack (experimental) | ⚡ **Only if you need speed** and accept instability |
| `npm run clean` | Clears Next.js and Node.js caches | 🧹 **When cache is corrupted** |
| `npm run clean:dev` | Cleans cache and starts development | 🚀 **Quick fix for cache issues** |
| `npm run reset` | Full reset: clean + reinstall + dev | 🔄 **Nuclear option** |

### 🚨 **If You Get Internal Server Errors**

**Quick Fix:**
```bash
npm run clean:dev
```

**If that doesn't work:**
```bash
npm run reset
```

### 🔧 **What We Fixed**

1. **Removed Turbopack by default** - Turbopack is experimental and causes cache corruption
2. **Improved Next.js config** - Better cache management and error handling
3. **Added cache cleaning scripts** - Easy recovery from cache issues
4. **Optimized package imports** - Reduced cache conflicts
5. **Better memory management** - Configured `onDemandEntries` for stability

### 📊 **Performance vs Stability**

- **`npm run dev`** (Default) - Stable, slightly slower startup
- **`npm run dev:turbo`** - Faster, but may require cache cleaning after layout changes
- **`npm run dev:safe`** - Always clean start, slower but guaranteed to work

### 🎯 **Best Practices**

1. **Use `npm run dev` by default** - Most stable for daily development
2. **Run `npm run clean:dev` after major layout changes** - Prevents cache issues
3. **Avoid `dev:turbo` when making frequent UI changes** - Turbopack doesn't handle layout changes well
4. **Keep the `scripts/` folder** - Contains useful development utilities

### 🔍 **Why This Happened**

The cache corruption was caused by:
- **Turbopack instability** with frequent layout changes
- **Build manifest corruption** during hot reloading
- **Cache conflicts** between different build states
- **Memory pressure** from keeping too many pages in cache

All of these issues are now resolved with the improved configuration.
