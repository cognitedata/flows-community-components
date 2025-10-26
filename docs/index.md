# Aura Component Library

A comprehensive collection of React components built with ShadCN/UI and Tailwind CSS.

## About This Library

This component library uses a **draft-to-production workflow**:

- 🚧 **Draft Components** - Work in progress components (in `/draft` directory)
- ✅ **Production Components** - Stable, tested components (in `/cognite` directory)

All components can be browsed in the documentation regardless of status. The documentation will indicate whether each component is "Draft" or "Production Ready".

## Components

Browse all components in the sidebar navigation or see individual component pages for:
- Interactive examples and previews
- Usage guidelines and best practices
- Code snippets and installation instructions
- Accessibility and design considerations

**Total Components:** 43

## Installation

### For End Users

Install components from the published registry:

```bash
# Install a specific component
npx shadcn add @cognite/aura/button

# The CLI will automatically install dependencies
```

**Note:** Only production-ready components are published to the registry.

## Usage

### Import Pattern

Always use the `/cognite` path for imports:

```tsx
import { Button } from "@/components/ui/cognite/button"
import { Badge } from "@/components/ui/cognite/badge"
```

**Why `/cognite`?** The system automatically resolves to production components when available, or draft components as a fallback. This means:
- No import changes needed when components are promoted to production
- Consistent import pattern across your entire codebase

### Basic Example

```tsx
import { Button } from "@/components/ui/cognite/button"
import { Badge } from "@/components/ui/cognite/badge"

export function MyComponent() {
  return (
    <div>
      <Badge>New</Badge>
      <Button>Click me</Button>
    </div>
  )
}
```

## Styling

Components use Tailwind CSS for styling and support both light and dark themes through CSS variables.

### Theme Customization

Customize component appearance through Tailwind configuration and CSS variables. See individual component pages for available variants and customization options.

## Component Status

Each component page shows its current status:

- **🟢 Production Ready** - Stable, tested, and published to the registry
- **🟡 Draft** - Work in progress, not yet published

Draft components are fully functional and can be used in development, but may change before being promoted to production.

## Development

For contributors and developers working on this library:

- See [IMPORT_SYSTEM.md](../IMPORT_SYSTEM.md) - Complete guide to the import and publishing system
- See [PUBLISHING_WORKFLOW.md](../PUBLISHING_WORKFLOW.md) - How to publish components
- See [DEVELOPMENT.md](../DEVELOPMENT.md) - Development setup and guidelines

## Support

- **Documentation Issues** - File an issue if you find problems with the docs
- **Component Requests** - Suggest new components or improvements
- **Bug Reports** - Report issues with specific components on their individual pages
