'use client';

import type { Meta, StoryObj } from '@storybook/nextjs';
import { within, userEvent, waitFor } from '@storybook/testing-library';
import { expect } from '@storybook/jest';
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
  BreadcrumbEllipsis,
} from './breadcrumb';

const meta: Meta<typeof Breadcrumb> = {
  title: 'UI/Breadcrumb',
  component: Breadcrumb,
  tags: ['autodocs'],
  argTypes: {
    // Display
    className: {
      control: 'text',
      description: 'CSS classes for styling',
      table: {
        category: 'Display',
      },
    },
  },
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Displays the path to the current resource using a hierarchy of links. Helps users understand their location within the navigation hierarchy and provides a way to navigate back.',
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof Breadcrumb>;

/**
 * Basic breadcrumb navigation.
 * Matches the basic example from breadcrumb.examples.tsx
 */
export const Basic: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'Basic breadcrumb navigation showing the path to the current page. Uses BreadcrumbLink for navigable items and BreadcrumbPage for the current page.',
      },
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Verify breadcrumb structure
    const nav = canvas.getByLabelText('breadcrumb');
    await expect(nav).toBeInTheDocument();

    // Verify links are present and have correct href
    const homeLink = canvas.getByRole('link', { name: 'Home' });
    await expect(homeLink).toBeInTheDocument();
    await expect(homeLink).toHaveAttribute('href', '/');

    const componentsLink = canvas.getByRole('link', { name: 'Components' });
    await expect(componentsLink).toBeInTheDocument();
    await expect(componentsLink).toHaveAttribute('href', '/components');

    // Verify current page has aria-current
    const currentPage = canvas.getByRole('link', { name: 'Breadcrumb' });
    await expect(currentPage).toHaveAttribute('aria-current', 'page');
    await expect(currentPage).toHaveAttribute('aria-disabled', 'true');
  },
  render: function BreadcrumbBasicStory() {
    return (
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/">Home</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink href="/components">Components</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Breadcrumb</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
    );
  },
};

/**
 * Breadcrumb with long path.
 * Demonstrates breadcrumb with multiple levels.
 */
export const WithLongPath: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'Breadcrumb with a longer navigation path showing multiple hierarchy levels (5 levels). Tests how the component handles extended paths.',
      },
    },
  },
  render: function BreadcrumbWithLongPathStory() {
    return (
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/">Home</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink href="/docs">Documentation</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink href="/docs/components">Components</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink href="/docs/components/navigation">
              Navigation
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Breadcrumb</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
    );
  },
};

/**
 * Breadcrumb with ellipsis.
 * Shows how to use ellipsis for collapsed intermediate items.
 */
export const WithEllipsis: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'Breadcrumb with ellipsis (three dots) to collapse intermediate navigation items when the path is too long. The ellipsis includes accessible "More" text for screen readers.',
      },
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Verify ellipsis element is present
    const ellipsis = canvasElement.querySelector(
      '[data-slot="breadcrumb-ellipsis"]'
    );
    await expect(ellipsis).toBeInTheDocument();

    // Verify accessible "More" text is present (sr-only)
    const moreText = canvas.getByText('More');
    await expect(moreText).toBeInTheDocument();

    // Verify ellipsis has correct accessibility attributes
    await expect(ellipsis).toHaveAttribute('role', 'presentation');
    await expect(ellipsis).toHaveAttribute('aria-hidden', 'true');

    // Verify navigation still works
    const homeLink = canvas.getByRole('link', { name: 'Home' });
    await expect(homeLink).toHaveAttribute('href', '/');
  },
  render: function BreadcrumbWithEllipsisStory() {
    return (
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/">Home</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbEllipsis />
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink href="/docs/components/navigation">
              Navigation
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Breadcrumb</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
    );
  },
};

/**
 * Custom separators.
 * Demonstrates using custom separator icons.
 */
export const CustomSeparator: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'Breadcrumb with custom separator character. You can pass any React node as children to BreadcrumbSeparator to customize the separator icon.',
      },
    },
  },
  render: function BreadcrumbCustomSeparatorStory() {
    return (
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/">Home</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator>/</BreadcrumbSeparator>
          <BreadcrumbItem>
            <BreadcrumbLink href="/components">Components</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator>/</BreadcrumbSeparator>
          <BreadcrumbItem>
            <BreadcrumbPage>Breadcrumb</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
    );
  },
};

/**
 * Minimal breadcrumb.
 * Simple two-level breadcrumb.
 */
export const Minimal: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'Minimal breadcrumb with just two levels. Shows the simplest possible breadcrumb structure with home and current page.',
      },
    },
  },
  render: function BreadcrumbMinimalStory() {
    return (
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/">Home</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Dashboard</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
    );
  },
};

/**
 * Deep hierarchy.
 * Shows breadcrumb with many levels.
 */
export const DeepHierarchy: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'Breadcrumb with a deep navigation hierarchy (7 levels). Tests how the component handles very long paths. Consider using ellipsis for better UX in production.',
      },
    },
  },
  render: function BreadcrumbDeepHierarchyStory() {
    return (
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/">Home</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink href="/products">Products</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink href="/products/electronics">
              Electronics
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink href="/products/electronics/computers">
              Computers
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink href="/products/electronics/computers/laptops">
              Laptops
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink href="/products/electronics/computers/laptops/gaming">
              Gaming
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Product Details</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
    );
  },
};

/**
 * Interactive navigation.
 * Demonstrates clickable breadcrumb links.
 */
export const Interactive: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'Interactive breadcrumb demonstrating clickable navigation links with hover states. Click on any link to test navigation behavior.',
      },
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Find all navigable links
    const homeLink = canvas.getByRole('link', { name: 'Home' });
    const docsLink = canvas.getByRole('link', { name: 'Documentation' });
    const componentsLink = canvas.getByRole('link', { name: 'Components' });

    // Verify all links are present and have correct hrefs
    await expect(homeLink).toBeInTheDocument();
    await expect(homeLink).toHaveAttribute('href', '/');

    await expect(docsLink).toBeInTheDocument();
    await expect(docsLink).toHaveAttribute('href', '/docs');

    await expect(componentsLink).toBeInTheDocument();
    await expect(componentsLink).toHaveAttribute('href', '/docs/components');

    // Test hover state (don't click to avoid navigation)
    await userEvent.hover(docsLink);
    await userEvent.unhover(docsLink);

    // Verify current page
    const currentPage = canvas.getByRole('link', { name: 'Breadcrumb' });
    await expect(currentPage).toHaveAttribute('aria-current', 'page');
  },
  render: function BreadcrumbInteractiveStory() {
    return (
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/">Home</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink href="/docs">Documentation</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink href="/docs/components">Components</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Breadcrumb</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
    );
  },
};

/**
 * With long text.
 * Shows how breadcrumb handles long text that wraps.
 */
export const WithLongText: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'Breadcrumb with long text items demonstrating how the component handles text wrapping and break-word behavior. The breadcrumb uses flex-wrap to wrap items gracefully.',
      },
    },
  },
  render: function BreadcrumbWithLongTextStory() {
    return (
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/">Home</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink href="/very-long-section-name">
              Very Long Section Name That Might Wrap
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink href="/very-long-section-name/another-extremely-long-subsection">
              Another Extremely Long Subsection Name
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>
              Current Page With Very Long Title That Should Wrap Properly
            </BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
    );
  },
};

/**
 * Complex real-world example.
 * Combines ellipsis with deep navigation.
 */
export const Complex: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'Complex breadcrumb example combining ellipsis and multiple levels. Demonstrates a real-world admin navigation scenario where intermediate paths are collapsed.',
      },
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Verify structure
    const nav = canvas.getByLabelText('breadcrumb');
    await expect(nav).toBeInTheDocument();

    // Verify ellipsis is used
    const ellipsis = canvasElement.querySelector(
      '[data-slot="breadcrumb-ellipsis"]'
    );
    await expect(ellipsis).toBeInTheDocument();

    // Verify accessible links
    const homeLink = canvas.getByRole('link', { name: 'Home' });
    await expect(homeLink).toHaveAttribute('href', '/');

    const adminLink = canvas.getByRole('link', { name: 'Admin' });
    await expect(adminLink).toHaveAttribute('href', '/admin');

    const userMgmtLink = canvas.getByRole('link', {
      name: 'User Management',
    });
    await expect(userMgmtLink).toHaveAttribute('href', '/admin/settings/users');

    // Verify current page
    const currentPage = canvas.getByRole('link', { name: 'Edit User' });
    await expect(currentPage).toHaveAttribute('aria-current', 'page');
  },
  render: function BreadcrumbComplexStory() {
    return (
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/">Home</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink href="/admin">Admin</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbEllipsis />
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink href="/admin/settings/users">
              User Management
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Edit User</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
    );
  },
};

/**
 * Interactive playground for testing breadcrumb props.
 */
export const Playground: Story = {
  args: {},
  parameters: {
    docs: {
      description: {
        story:
          'Interactive playground to test different breadcrumb configurations. Use the controls panel to experiment with props.',
      },
    },
  },
  render: function BreadcrumbPlaygroundStory() {
    return (
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/">Home</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink href="/docs">Documentation</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Breadcrumb</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
    );
  },
};

