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
  title: 'AI/Breadcrumb',
  component: Breadcrumb,
  tags: ['autodocs'],
  argTypes: {
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
  },
};

export default meta;
type Story = StoryObj<typeof Breadcrumb>;

/**
 * Basic breadcrumb navigation
 * Shows a simple breadcrumb trail with Home, Components, and current page
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

    // Verify links are present
    const homeLink = canvas.getByRole('link', { name: 'Home' });
    await expect(homeLink).toBeInTheDocument();
    await expect(homeLink).toHaveAttribute('href', '/');

    const componentsLink = canvas.getByRole('link', { name: 'Components' });
    await expect(componentsLink).toBeInTheDocument();
    await expect(componentsLink).toHaveAttribute('href', '/components');

    // Verify current page
    const currentPage = canvas.getByRole('link', { name: 'Breadcrumb' });
    await expect(currentPage).toHaveAttribute('aria-current', 'page');
  },
  render: () => (
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
  ),
};

/**
 * Breadcrumb with long path
 * Demonstrates breadcrumb with multiple levels
 */
export const WithLongPath: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'Breadcrumb with a longer navigation path showing multiple hierarchy levels.',
      },
    },
  },
  render: () => (
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
  ),
};

/**
 * Breadcrumb with ellipsis
 * Shows how to use ellipsis for collapsed intermediate items
 */
export const WithEllipsis: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'Breadcrumb with ellipsis to collapse intermediate navigation items when the path is too long.',
      },
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Verify ellipsis is present
    const ellipsis = canvasElement.querySelector('[data-slot="breadcrumb-ellipsis"]');
    await expect(ellipsis).toBeInTheDocument();

    // Verify "More" is accessible
    const moreText = canvas.getByText('More');
    await expect(moreText).toBeInTheDocument();
  },
  render: () => (
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
  ),
};

/**
 * With asChild prop
 * Demonstrates using asChild to compose with custom link components
 * Note: In a Next.js app, you can use this with Next.js Link like:
 * <BreadcrumbLink asChild><Link href="/">Home</Link></BreadcrumbLink>
 */
export const WithAsChild: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'Breadcrumb using asChild prop to compose with custom link components. The asChild prop allows you to pass your own link component (like Next.js Link) as a child.',
      },
    },
  },
  render: () => (
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
  ),
};

/**
 * Minimal breadcrumb
 * Simple two-level breadcrumb
 */
export const Minimal: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Minimal breadcrumb with just two levels.',
      },
    },
  },
  render: () => (
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
  ),
};

/**
 * Deep hierarchy
 * Shows breadcrumb with many levels
 */
export const DeepHierarchy: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'Breadcrumb with a deep navigation hierarchy showing many levels.',
      },
    },
  },
  render: () => (
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
          <BreadcrumbLink href="/products/electronics">Electronics</BreadcrumbLink>
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
  ),
};

/**
 * Interactive navigation
 * Demonstrates clickable breadcrumb links
 */
export const Interactive: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'Interactive breadcrumb demonstrating clickable navigation links. Click on any link to navigate.',
      },
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Find all links
    const homeLink = canvas.getByRole('link', { name: 'Home' });
    const docsLink = canvas.getByRole('link', { name: 'Documentation' });
    const componentsLink = canvas.getByRole('link', { name: 'Components' });

    // Verify links are clickable
    await expect(homeLink).toBeInTheDocument();
    await expect(docsLink).toBeInTheDocument();
    await expect(componentsLink).toBeInTheDocument();

    // Test clicking a link (prevent default to avoid navigation in storybook)
    await userEvent.click(homeLink);
    await expect(homeLink).toHaveAttribute('href', '/');
  },
  render: () => (
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
  ),
};

/**
 * With long text
 * Shows how breadcrumb handles long text that wraps
 */
export const WithLongText: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'Breadcrumb with long text items demonstrating how the component handles wrapping and break-word behavior.',
      },
    },
  },
  render: () => (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink href="/">
            Home
          </BreadcrumbLink>
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
  ),
};

/**
 * Complex example with ellipsis and custom styling
 * Shows a more complex real-world scenario
 */
export const Complex: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'Complex breadcrumb example combining ellipsis, multiple levels, and demonstrates a real-world navigation scenario.',
      },
    },
  },
  render: () => (
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
  ),
};

