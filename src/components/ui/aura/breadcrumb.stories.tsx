'use client';

import type { Meta, StoryObj } from '@storybook/nextjs';
import { within, userEvent, waitFor } from '@storybook/testing-library';
import { expect } from '@storybook/jest';
import { useState, Fragment } from 'react';
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
  BreadcrumbEllipsis,
} from './breadcrumb';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuItem,
} from './dropdown-menu';
import {
  IconPencil,
  IconTag,
  IconCircleArrowDown,
  IconTrash,
} from '@tabler/icons-react';

type BreadcrumbItem = {
  label: string;
  href?: string;
  isCurrentPage?: boolean;
  isEllipsis?: boolean;
};

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
    // Playground controls
    items: {
      control: 'object',
      description: 'Array of breadcrumb items to display',
      table: {
        category: 'Playground',
        type: {
          summary: 'BreadcrumbItem[]',
        },
      },
    },
  } as any,
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
type Story = StoryObj<typeof Breadcrumb & { items?: BreadcrumbItem[] }>;

/**
 * Basic breadcrumb navigation.
 * Matches the basic example from breadcrumb.examples.tsx
 */
export const Basic: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'Basic breadcrumb navigation showing the path to the current page. Includes ellipsis for collapsed intermediate items and a dropdown menu on the current page for actions.',
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

    const canvasLink = canvas.getByRole('link', { name: 'Canvas' });
    await expect(canvasLink).toBeInTheDocument();
    await expect(canvasLink).toHaveAttribute('href', '/canvas');

    // Verify ellipsis element is present
    const ellipsis = canvasElement.querySelector(
      '[data-slot="breadcrumb-ellipsis"]'
    );
    await expect(ellipsis).toBeInTheDocument();

    // Verify current page with dropdown
    const currentPage = canvas.getByRole('button', { name: /Test canvas/i });
    await expect(currentPage).toBeInTheDocument();

    // Click to open the dropdown menu
    await userEvent.click(currentPage);

    // Wait for menu to appear (menu is rendered in a portal, so check document)
    await waitFor(
      () => {
        const menu = document.querySelector(
          '[data-slot="dropdown-menu-content"]'
        );
        expect(menu).toBeInTheDocument();
        expect(menu).toBeVisible();
      },
      { timeout: 1000 }
    );

    // Verify dropdown menu items (menu is in portal, so use document.body)
    const renameOption = within(document.body).getByRole('menuitem', {
      name: /Rename/i,
    });
    await expect(renameOption).toBeInTheDocument();

    const addTagsOption = within(document.body).getByRole('menuitem', {
      name: /Add tags/i,
    });
    await expect(addTagsOption).toBeInTheDocument();

    const downloadOption = within(document.body).getByRole('menuitem', {
      name: /Download as PDF/i,
    });
    await expect(downloadOption).toBeInTheDocument();

    const deleteOption = within(document.body).getByRole('menuitem', {
      name: /Delete/i,
    });
    await expect(deleteOption).toBeInTheDocument();
  },
  render: function BreadcrumbBasicStory(args) {
    const [pageName, setPageName] = useState('Test canvas');

    return (
      <Breadcrumb {...args}>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/">Home</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbEllipsis />
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink href="/canvas">Canvas</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem className="has-[button[data-state=open]]:bg-accent has-[button[data-state=open]]:text-foreground">
            <DropdownMenu>
              <DropdownMenuTrigger className="flex items-center gap-1">
                <BreadcrumbPage>{pageName}</BreadcrumbPage>
                <span className="sr-only">Toggle menu</span>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" className="w-[280px] p-0">
                <div className="p-1">
                  <DropdownMenuItem
                    className="p-2"
                    onClick={() => setPageName('Renamed canvas')}
                  >
                    <IconPencil aria-hidden="true" /> Rename
                  </DropdownMenuItem>
                  <DropdownMenuItem className="p-2">
                    <IconTag aria-hidden="true" /> Add tags
                  </DropdownMenuItem>
                  <DropdownMenuItem className="p-2">
                    <IconCircleArrowDown aria-hidden="true" /> Download as PDF
                  </DropdownMenuItem>
                  <DropdownMenuItem variant="destructive" className="p-2">
                    <IconTrash aria-hidden="true" />
                    Delete
                  </DropdownMenuItem>
                </div>
              </DropdownMenuContent>
            </DropdownMenu>
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
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Verify breadcrumb structure
    const nav = canvas.getByLabelText('breadcrumb');
    await expect(nav).toBeInTheDocument();

    // Verify links are present and have correct href
    const homeLink = canvas.getByRole('link', { name: 'Home' });
    await expect(homeLink).toBeInTheDocument();
    await expect(homeLink).toHaveAttribute('href', '/');

    const docsLink = canvas.getByRole('link', { name: 'Documentation' });
    await expect(docsLink).toBeInTheDocument();
    await expect(docsLink).toHaveAttribute('href', '/docs');

    const componentsLink = canvas.getByRole('link', { name: 'Components' });
    await expect(componentsLink).toBeInTheDocument();
    await expect(componentsLink).toHaveAttribute('href', '/docs/components');

    const navigationLink = canvas.getByRole('link', { name: 'Navigation' });
    await expect(navigationLink).toBeInTheDocument();
    await expect(navigationLink).toHaveAttribute(
      'href',
      '/docs/components/navigation'
    );

    // Verify current page
    const currentPage = canvas.getByRole('link', { name: 'Breadcrumb' });
    await expect(currentPage).toBeInTheDocument();
    await expect(currentPage).toHaveAttribute('aria-current', 'page');
    await expect(currentPage).toHaveAttribute('aria-disabled', 'true');
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
    await expect(currentPage).toHaveAttribute('aria-disabled', 'true');
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
    await expect(currentPage).toHaveAttribute('aria-disabled', 'true');
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
  args: {
    items: [
      { label: 'Home', href: '/' },
      { label: 'Documentation', href: '/docs' },
      { label: 'Breadcrumb', isCurrentPage: true },
    ] as BreadcrumbItem[],
  } as any,
  parameters: {
    docs: {
      description: {
        story:
          'Interactive playground to test different breadcrumb configurations. Use the controls panel to experiment with props.',
      },
    },
  },
  render: function BreadcrumbPlaygroundStory(args) {
    const { items, ...breadcrumbProps } = args as typeof args & {
      items?: BreadcrumbItem[];
    };
    const breadcrumbItems = items || [];

    return (
      <Breadcrumb {...breadcrumbProps}>
        <BreadcrumbList>
          {breadcrumbItems.map((item, index) => {
            if (item.isEllipsis) {
              return (
                <Fragment key={`ellipsis-${index}`}>
                  <BreadcrumbSeparator />
                  <BreadcrumbItem>
                    <BreadcrumbEllipsis />
                  </BreadcrumbItem>
                </Fragment>
              );
            }

            return (
              <Fragment key={`item-${index}`}>
                {index > 0 && <BreadcrumbSeparator />}
                <BreadcrumbItem>
                  {item.isCurrentPage ? (
                    <BreadcrumbPage>{item.label}</BreadcrumbPage>
                  ) : (
                    <BreadcrumbLink href={item.href || '#'}>
                      {item.label}
                    </BreadcrumbLink>
                  )}
                </BreadcrumbItem>
              </Fragment>
            );
          })}
        </BreadcrumbList>
      </Breadcrumb>
    );
  },
};
