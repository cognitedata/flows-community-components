#!/bin/bash
# Check code quality after component changes

set -e

echo "🔍 Checking code quality..."

# Run linter
echo "📋 Running linter..."
pnpm lint

# Run TypeScript compiler
echo "🔧 Running TypeScript check..."
pnpm tsc -b

echo "✅ All quality checks passed!"
