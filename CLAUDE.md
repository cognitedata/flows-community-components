# Development Rules

1. Make sure to run `pnpm lint` and `pnpm tsc` after any code changes you make in order to ensure there are no errors.
2. Record any learnings in the CLAUDE.md file. Make sure to keep a consistent style with the existing content and try to be concise and avoid duplication.

# Component Registry Rules

When you create or update ANY component, run: `pnpm run registry:build`

This command:
1. Scans `src/components/ui/aura/` for all component files
2. Auto-detects npm dependencies and registry dependencies from imports
3. Generates `registry.json` in the root
4. Runs `shadcn build` to generate individual component files in `public/r/*.json`

The registry build process is fully automated - no manual configuration needed.

# Building Components

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

## Component Code Quality Checklist

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

# Import Conventions

NEVER use `React.useState`, `React.useEffect`, etc.
ALWAYS import hooks directly: `import { useState, useEffect } from 'react'`
This applies to ALL React imports.

# Message Component Documentation

When you add a new Aura component to `MessageResponse` inside `message.tsx`:

- You MUST document it in the `message.examples.tsx` file under the 'MessageResponse (Streamdown)' example

# Special Files

- `reasoning-original.tsx` is NOT redundant - it will be used in the future, do not remove it

# Learnings

- Use `PaginationStatus` for inline pagination counters instead of ad hoc spans.
- Pagination subcomponents inherit size from `PaginationContent`.
- Use `PaginationSelectTrigger` to inherit pagination size for selects.
- When `ArtifactListHeader` is present, remove top padding from `ArtifactListContent` and use title margin for spacing.
- Biome formatting prefers inline JSX for short elements and props.
- Getting started instructions should link to the Dune creation docs site instead of inline steps.
- Consolidate docs content onto the root page instead of routing under `/docs`.

# Storybook Stories

Stories are the ONLY place for code examples. They're tested, interactive, and automatically documented. Never duplicate examples in `index.tsx` or `*.metadata.ts`.

## Story Ordering

All stories MUST have `parameters: { order: N }`. Start from 1, increment sequentially. Playground always uses `order: 99`.

### Standard Story Sequence

Include stories that apply, skip others. Keep incrementing order numbers.

1. **Basic** - Default use case
2. **Variants** - One story per variant
3. **All Variants** - Side-by-side comparison
4. **Composition** - `WithHeader`, `WithIcon`, etc. (only if optional features exist)
5. **Sizing/Styling** - Size/style variants
6. **Minimal** - Simplest usage (only if different from Basic)
7. **Interactive** - Stateful examples with `useState`
8. **Accessibility** - ARIA, keyboard nav
9. **Visual Regression** - Baseline for testing
10. **Edge Cases** - Empty, long text, special chars, icon-only, mixed content
11. **Playground** (optional) - `render: (args) => <Component {...args} />`, `order: 99`. Skip for simple/compositional components.

**Example:**

```tsx
export const Basic: Story = {
  render: () => <Badge variant="default">Label</Badge>,
  parameters: { order: 1 },
};

export const Fjord: Story = {
  render: () => <Badge variant="fjord">Observations</Badge>,
  parameters: { order: 2 },
};

export const AllVariants: Story = {
  render: () => (
    <div className="flex gap-2">
      <Badge variant="fjord">Fjord</Badge>
      <Badge variant="aurora">Aurora</Badge>
    </div>
  ),
  parameters: { order: 5 },
};

export const Playground: Story = {
  render: (args) => <Badge {...args} />,
  args: { variant: "fjord", children: "Badge" },
  parameters: { order: 99 },
};
```

## Render Functions

All stories MUST use explicit render functions with hardcoded props. Never use `{...args}` in example stories.

**Exception:** Only Playground uses `render: (args) => <Component {...args} />`.

**Never use helper components** - inline all JSX directly:

```tsx
export const TeleportationMode: Story = {
  render: function TeleportationMode() {
    const [currentPage, setCurrentPage] = useState(1);
    return (
      <Pagination>
        <PaginationContent size="default">
          {/* full implementation */}
        </PaginationContent>
      </Pagination>
    );
  },
};
```

Duplicate code in each story if needed. Code examples > DRY principle.

## Polymorphic Title Components

For components with `as` prop for heading levels:

```tsx
export const SemanticHeadings: Story = {
  render: () => (
    <div className="flex flex-col gap-6">
      <Card>
        <CardTitle as="h2">Section Title (h2)</CardTitle>
      </Card>
      <Card>
        <CardTitle>Default (h3)</CardTitle>
      </Card>
      <Card>
        <CardTitle as="h4">Subsection (h4)</CardTitle>
      </Card>
    </div>
  ),
};
```

## Play Functions

Use `@storybook/test` utilities: `within`, `expect`, `userEvent`, `waitFor`.

**NO inline code comments in play functions.** Code should be self-explanatory.

```tsx
play: async ({ canvasElement }) => {
  const avatar = canvasElement.querySelector('[data-slot="avatar"]');
  await expect(avatar).toBeInTheDocument();
  
  const fallback = canvasElement.querySelector('[data-slot="avatar-fallback"]');
  await expect(fallback).toHaveTextContent("AB");
};
```

### Testing Buttons in Play Functions

- Use `await canvas.findAllByRole("button")` instead of `getAllByRole("button")` to wait for buttons to render
- Avoid querying by `data-slot="button"` - `TooltipTrigger` with `asChild` can override these attributes
- Role-based queries are more robust and semantic for testing interactive elements

### Testing Heading Levels

```tsx
play: async ({ canvasElement }) => {
  const canvas = within(canvasElement);
  const h2Title = canvas.getByRole("heading", { level: 2, name: "Section Title" });
  await expect(h2Title).toBeInTheDocument();
};
```

### Testing Portal Content

Storybook's canvas now handles portal content correctly. Use `canvas.findByTestId()` for all queries.

```tsx
import { expect, userEvent, waitFor, within } from "@storybook/test";

play: async ({ canvasElement }) => {
  const canvas = within(canvasElement);
  await userEvent.click(canvas.getByRole("button"));
  
  const confirmButton = await canvas.findByTestId("confirm");
  await userEvent.click(confirmButton);
};
```

## Styling in Stories

Use Tailwind design tokens, not arbitrary values:

```tsx
<div className="w-90 gap-2 p-4 text-sm leading-4.5">
```

Common conversions: `w-[360px]` → `w-90`, `gap-[8px]` → `gap-2`, `p-[16px]` → `p-4`

## argTypes

Organize into categories: Content, Variants/Styling, Behavior, Events, Advanced. Include descriptions and control types.

## Parameters & Descriptions

```tsx
parameters: {
  order: 1,
  docs: {
    description: {
      story: "Clear description"
    }
  }
}
```

**Story descriptions should be minimal and future-proof.** Avoid mentioning specific counts or implementation details that could become outdated.

```tsx
story: "Choose available sizes based on context and space constraints."

story: "Dialog using only DialogTitle without a description to demonstrate minimal headers."
```

**Story-level code comments** (in `/** ... */` above stories or in descriptions) should be minimal and explain WHAT the story demonstrates, not HOW it works internally.

## Deprecated Components

Avoid deprecated third-party components. Check library docs for deprecation warnings. Use modern alternatives like `shape` or `content` props.

```tsx
<Pie 
  data={data}
  shape={(props) => <CustomShape {...props} />}
/>
```

## Story Checklist

Before committing changes:
1. Run `pnpm lint` to check code quality
2. Run `pnpm tsc -b` to verify TypeScript types
3. Ensure all stories have `order` parameter
4. Verify play functions pass with no errors
5. Test interactive stories manually
6. No inline code comments in play functions
7. Story descriptions are minimal and future-proof
8. No deprecated third-party components used

