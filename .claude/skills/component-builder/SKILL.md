---
name: component-builder
description: Build accessible, consistent React components following Aura design system patterns. Use when creating or updating component files.
---

# Component Builder

Build accessible, consistent React components following Aura design system patterns.

## When to Use

- Creating new React components in `src/components/ui/aura/`
- Updating existing component files
- User mentions "component", "create component", "build component", or "update component"

## Radix UI & Accessibility

Use Radix for complex interactions (dropdowns, dialogs), keyboard navigation, ARIA states. Use native HTML for simple elements (lists, headings, divs).

```tsx
<div role="alert" aria-live="polite">Error message</div>

<IconCheck aria-hidden="true" className="size-4" />

<button onClick={handleClick} aria-label="Close dialog">
  <IconX aria-hidden="true" />
</button>
```

## Component Structure

**Exports at bottom, one per line:**
```tsx
export {
  Badge,
  badgeVariants,
};
```

**Inline prop typing, no export unless needed externally:**
```tsx
const Badge = ({ className, ...props }: ComponentProps<"div">) => { ... }
```

## Composition Over Configuration

```tsx
<Card>
  <CardHeader>
    <CardTitle>Title</CardTitle>
  </CardHeader>
  <CardContent>Content</CardContent>
</Card>
```

## Styling Conventions

**Always use cn() for className merging:**
```tsx
const Badge = ({ className, ...props }: ComponentProps<"div">) => (
  <div className={cn("inline-flex items-center", className)} {...props} />
);
```

**All components get data-slot:**
```tsx
<div data-slot="badge" className={cn(badgeVariants({ variant }))} />
```

**Use design tokens, not arbitrary values:**
```tsx
className="leading-4.5 text-sm gap-2"
```

## Variants with CVA

```tsx
const badgeVariants = cva(
  "inline-flex items-center rounded-md",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground",
        secondary: "bg-secondary text-secondary-foreground",
      },
      size: {
        sm: "text-xs px-2",
        md: "text-sm px-3",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "md",
    },
  }
);

export { badgeVariants };
```

## forwardRef Pattern

**CRITICAL: Use ComponentRef, never React.ElementRef**

`React.ElementRef` is deprecated. Always import and use `ComponentRef` directly from "react":

```tsx
import { type ComponentRef, type ComponentProps, forwardRef } from "react";

const Badge = forwardRef<HTMLDivElement, ComponentProps<"div">>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn(badgeVariants(), className)} {...props} />
  )
);
Badge.displayName = "Badge";

const AlertDialogTrigger = forwardRef<
  ComponentRef<typeof AlertDialogPrimitive.Trigger>,
  ComponentProps<typeof AlertDialogPrimitive.Trigger>
>((props, ref) => (
  <AlertDialogPrimitive.Trigger ref={ref} {...props} />
));
AlertDialogTrigger.displayName = "AlertDialogTrigger";

const CardHeader = forwardRef<HTMLDivElement, ComponentProps<"div">>(...)
CardHeader.displayName = "CardHeader";
```

## Semantic HTML & Polymorphic Components

Title components support polymorphic heading elements for proper document hierarchy, SEO, and screen reader accessibility.

```tsx
type HeadingElement = "h1" | "h2" | "h3" | "h4" | "h5" | "h6";

const CardTitle = forwardRef<
  HTMLHeadingElement,
  ComponentProps<"h3"> & { as?: HeadingElement }
>(({ className, as: Tag = "h3", ...props }, ref) => (
  <Tag
    ref={ref}
    data-slot="card-title"
    className={cn("font-semibold text-lg", className)}
    {...props}
  />
));
CardTitle.displayName = "CardTitle";

<CardTitle as="h2">Section Title</CardTitle>
<CardTitle>Default (h3)</CardTitle>
<CardTitle as="h4">Subsection</CardTitle>
```

## Component Naming

Clear, descriptive names: `InlineCitation`, `MessageAvatar`. Sub-components match parent: `Card` → `CardHeader`, `CardTitle`, `CardContent`.

## File Organization

```tsx
// 1. React
import { forwardRef } from "react";

// 2. Third-party
import { cva } from "class-variance-authority";
import { IconCheck } from "@tabler/icons-react";

// 3. Local utilities
import { cn } from "@/lib/utils";
```

**Definition order:** Components in dependency order, exports at bottom.

**Helper Functions:** Extract local helper functions to `@/lib/utils.ts` for reusability, testing, and centralized maintenance. Add proper error handling with try-catch.

```tsx
export function getStorybookImagePath(filename: string): string {
  if (typeof window === "undefined") return `/${filename}`;
  
  try {
    const pathname = (window.parent?.location || window.location).pathname;
    const match = pathname.match(/^(\/aura\/branches\/[^/]+\/storybook)/);
    if (match) return `${match[1]}/${filename}`;
    return `/${filename}`;
  } catch (error) {
    console.warn("Failed to determine path:", error);
    return `/${filename}`;
  }
}
```

## Code Comments & Documentation

**CRITICAL: NO code comments in component files**

Component files (`.tsx`) should contain ZERO comments - no single-line, no multi-line, no JSDoc. Component structure and TypeScript types should be self-documenting.

```tsx
const Badge = forwardRef<HTMLDivElement, BadgeProps>(...)
```

**index.tsx - brief description only:**
```tsx
/**
 * Badge Component
 *
 * A small status indicator component with multiple variants.
 * See Storybook for comprehensive examples and documentation.
 */
export { Badge, badgeVariants } from "./badge";
export { BadgeMetadata } from "./badge.metadata";
```

**Metadata file - LLM guidance only:**
```tsx
export const BadgeMetadata: ComponentMeta = {
  name: "Badge",
  status: "draft",
  description: "A small status indicator component.",
  llmUsage: "Use `<Badge variant='default'>Status</Badge>`. Variants: 'secondary', 'destructive', 'outline'.",
  importPath: "@/components/ui/aura/badge",
};
```

**CRITICAL:** ALL code examples live in Storybook stories only.

## Side Navigation

Add new components to `src/components/side-navigation.tsx`. Story meta `title` determines category:
- `Primitives/Colors|Effects|Layouts|Typography` → Foundations subsection
- `Primitives/[Name]` → Primitives subsection (alphabetically)
- `AI/[Name]` → AI Chat subsection
- `Patterns/[Name]` → Patterns subsection

## Post-Build Steps

After creating or modifying components:

1. Run linting and type checking: `bash scripts/check-quality.sh`
2. Update registry: `pnpm run registry:build`
3. Update side navigation if new component

## Checklist

Before committing changes:
1. Run `pnpm lint` to check code quality
2. Run `pnpm tsc -b` to verify TypeScript types
3. Ensure no linter errors, type safety, prop spreading
4. Verify accessibility (ARIA, keyboard nav, focus)
5. Update side navigation if adding new component
6. No code comments in component files
7. No eslint-disable comments
8. No !important in Tailwind classes
9. Proper error handling in all try-catch blocks
10. Ensure all class names work with Tailwind v4
