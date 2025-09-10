#!/bin/bash

# Safe development script that handles Next.js cache issues
# Usage: npm run dev:safe or ./scripts/dev-safe.sh

echo "🧹 Cleaning Next.js cache..."
rm -rf .next
rm -rf node_modules/.cache

echo "🚀 Starting Next.js development server..."
exec npm run dev
