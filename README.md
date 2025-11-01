This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.


## Publishing ShadCN Library

Running this command will publish all components referenced in registry.json with their dependencies.

```bash
pnpm registry:build
```
v0.0.1


# Storybook Testing Guide

This project includes comprehensive testing for UI components using Storybook's built-in testing tools.

## Types of Testing Implemented

### 1. Interaction Testing (Play Functions)

Stories can include automated tests that run in Storybook using the `play` function. These tests verify:
- Component rendering
- User interactions
- DOM queries
- Assertions

**Example:**
```typescript
export const WithAccessibilityTest: Story = {
  args: {
    variant: 'success',
    children: 'Verified',
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const badge = canvas.getByText('Verified');
    await expect(badge).toBeInTheDocument();
  },
};
```

### 2. Accessibility Testing

Automatic a11y testing runs on all stories using:
- `@storybook/addon-a11y` - Visual a11y panel in Storybook
- `axe-playwright` - Automated a11y testing in test runner

**View a11y results:**
- Open any story in Storybook
- Click the "Accessibility" tab at the bottom
- Review any violations or passes

### 3. Visual Testing

The test runner can be extended with visual regression testing using:
- Chromatic (official Storybook service)
- Percy
- Playwright screenshots

## Running Tests

### Interactive Testing (in Storybook UI)

```bash
pnpm storybook
```

Then navigate to any story with a `play` function. The test will run automatically and show:
- ✅ Green checkmark if passing
- ❌ Red X if failing
- Test results in the Interactions panel

### Automated Test Runner

Run all tests headlessly:

```bash
# Make sure Storybook is running first
pnpm storybook

# In another terminal:
pnpm test-storybook
```

### CI/CD Testing

For continuous integration (builds, starts server, runs tests, then tears down):

```bash
pnpm test-storybook:ci
```

This command:
1. Builds Storybook
2. Starts a local server
3. Runs all tests
4. Reports results
5. Tears down automatically

## Writing Tests

### Basic Test Structure

```typescript
import { expect, within, userEvent } from '@storybook/test';

export const MyTestedStory: Story = {
  args: {
    // Your component props
  },
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);
    
    // Query elements
    const button = canvas.getByRole('button');
    
    // Interact
    await userEvent.click(button);
    
    // Assert
    await expect(button).toHaveTextContent('Clicked');
  },
};
```

### Common Queries

```typescript
// By text content
canvas.getByText('Hello')

// By role (most accessible way)
canvas.getByRole('button', { name: 'Submit' })

// By test ID
canvas.getByTestId('my-element')

// By label
canvas.getByLabelText('Email')
```

### Common Assertions

```typescript
await expect(element).toBeInTheDocument()
await expect(element).toBeVisible()
await expect(element).toHaveTextContent('text')
await expect(element).toHaveClass('className')
await expect(element).toHaveAttribute('aria-label', 'value')
```

## Disabling A11y Tests

To skip a11y testing for a specific story:

```typescript
export const MyStory: Story = {
  parameters: {
    a11y: {
      disable: true,
    },
  },
};
```

## Best Practices

1. **Test user-facing behavior** - Not implementation details
2. **Use semantic queries** - Prefer `getByRole` over `getByTestId`
3. **Keep tests simple** - One concept per story
4. **Use descriptive names** - Story names should explain what's being tested
5. **Test critical paths** - Focus on important user interactions

## File Structure

```
.storybook/
├── main.ts              # Storybook config
├── preview.tsx          # Global decorators
├── test-runner.ts       # Test runner config (includes a11y)
└── TESTING.md          # This file

src/components/
└── ui/
    └── cognite/
        ├── badge.tsx
        └── badge.stories.tsx  # Stories with tests
```

## Resources

- [Storybook Interaction Testing](https://storybook.js.org/docs/writing-tests/interaction-testing)
- [Storybook Test Runner](https://storybook.js.org/docs/writing-tests/test-runner)
- [Testing Library Queries](https://testing-library.com/docs/queries/about)
- [Accessibility Testing](https://storybook.js.org/docs/writing-tests/accessibility-testing)

