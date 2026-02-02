---
name: story-builder
description: Write comprehensive Storybook stories for Aura components. Use when creating or updating .stories.tsx files.
---

# Story Builder

Write comprehensive, tested Storybook stories for Aura components.

## When to Use

- Creating new `.stories.tsx` files
- Updating existing story files
- User mentions "story", "storybook", "stories", or "examples"

## Core Principle

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

## Post-Build Steps

After creating or modifying stories, run: `bash scripts/check-quality.sh`

## Checklist

Before committing changes:
1. Run `pnpm lint` to check code quality
2. Run `pnpm tsc -b` to verify TypeScript types
3. Ensure all stories have `order` parameter
4. Verify play functions pass with no errors
5. Test interactive stories manually
6. No inline code comments in play functions
7. Story descriptions are minimal and future-proof
8. No deprecated third-party components used
