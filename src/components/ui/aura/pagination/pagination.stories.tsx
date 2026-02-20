
import type { Meta, StoryObj } from '@storybook/react';
import { expect } from '@storybook/test';
import { useState } from 'react';

import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationFirst,
  PaginationItem,
  PaginationLast,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
  PaginationResultsPerPage,
  PaginationResultsPerPageLabel,
  PaginationSelectTrigger,
  PaginationStatus,
  PaginationTeleport,
} from './pagination';

import { Select, SelectContent, SelectItem, SelectValue } from '@/components/ui/aura/select';

const meta: Meta<typeof Pagination> = {
  title: 'Primitives/Pagination',
  component: Pagination,
  tags: ['autodocs'],
  argTypes: {
    className: {
      control: 'text',
      description: 'Additional CSS classes',
      table: {
        category: 'Variants / Styling',
      },
    },
  },
  parameters: {
    layout: 'centered',
  },
};

export default meta;
type Story = StoryObj<typeof Pagination>;

/**
 * Default pagination with first and last page buttons.
 */
export const Default: Story = {
  render: () => (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationFirst href="#" />
        </PaginationItem>
        <PaginationItem>
          <PaginationPrevious href="#" />
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href="#">1</PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href="#">2</PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationEllipsis />
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href="#" isActive>
            8
          </PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationNext href="#" />
        </PaginationItem>
        <PaginationItem>
          <PaginationLast href="#" />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  ),
  parameters: {
    order: 1,
    docs: {
      description: {
        story: 'Default pagination with page navigation, next and previous links.',
      },
    },
  },
  play: async ({ canvasElement }) => {
    const pagination = canvasElement.querySelector('[data-slot="pagination"]');
    await expect(pagination).toBeInTheDocument();

    // Verify active page
    const activeLink = canvasElement.querySelector('[data-active="true"]');
    await expect(activeLink).toHaveTextContent('8');
  },
};

/**
 * Small size variant for compact layouts.
 */
export const Small: Story = {
  render: () => (
    <Pagination>
      <PaginationContent size="small">
        <PaginationItem>
          <PaginationFirst href="#" />
        </PaginationItem>
        <PaginationItem>
          <PaginationPrevious href="#" />
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href="#">1</PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href="#">2</PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationEllipsis />
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href="#" isActive>
            8
          </PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationNext href="#" />
        </PaginationItem>
        <PaginationItem>
          <PaginationLast href="#" />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  ),
  parameters: {
    order: 2,
    docs: {
      description: {
        story: 'Small size variant for compact layouts.',
      },
    },
  },
  play: async ({ canvasElement }) => {
    const paginationContent = canvasElement.querySelector('[data-slot="pagination-content"]');
    await expect(paginationContent).toBeInTheDocument();

    // Verify small size attribute
    await expect(paginationContent).toHaveAttribute('data-size', 'small');

    // Verify active page
    const activeLink = canvasElement.querySelector('[data-active="true"]');
    await expect(activeLink).toHaveTextContent('8');

    // Verify all navigation buttons are present
    const firstButton = canvasElement.querySelector('[data-slot="pagination-first"]');
    const lastButton = canvasElement.querySelector('[data-slot="pagination-last"]');
    await expect(firstButton).toBeInTheDocument();
    await expect(lastButton).toBeInTheDocument();
  },
};

/**
 * Composition pattern: Results per page selector (default size).
 */
export const WithResultsPerPage: Story = {
  render: function WithResultsPerPageStory() {
    const [resultsPerPage, setResultsPerPage] = useState('25');

    return (
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationFirst href="#" />
          </PaginationItem>
          <PaginationItem>
            <PaginationPrevious href="#" />
          </PaginationItem>
          <PaginationItem>
            <PaginationLink href="#">1</PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationLink href="#">2</PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>
          <PaginationItem>
            <PaginationLink href="#" isActive>
              8
            </PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationNext href="#" />
          </PaginationItem>
          <PaginationItem>
            <PaginationLast href="#" />
          </PaginationItem>
          <PaginationResultsPerPage>
            <PaginationResultsPerPageLabel>Results per page</PaginationResultsPerPageLabel>
            <Select value={resultsPerPage} onValueChange={setResultsPerPage}>
              <PaginationSelectTrigger>
                <SelectValue />
              </PaginationSelectTrigger>
              <SelectContent>
                <SelectItem value="10">10</SelectItem>
                <SelectItem value="25">25</SelectItem>
                <SelectItem value="50">50</SelectItem>
                <SelectItem value="100">100</SelectItem>
              </SelectContent>
            </Select>
          </PaginationResultsPerPage>
        </PaginationContent>
      </Pagination>
    );
  },
  parameters: {
    order: 3,
    docs: {
      description: {
        story: 'Pagination with results per page selector (default size).',
      },
    },
  },
  play: async ({ canvasElement }) => {
    const pagination = canvasElement.querySelector('[data-slot="pagination"]');
    await expect(pagination).toBeInTheDocument();

    // Verify default size
    const paginationContent = canvasElement.querySelector('[data-slot="pagination-content"]');
    await expect(paginationContent).toHaveAttribute('data-size', 'default');

    // Verify "Results per page" label is present
    const resultsLabel = canvasElement.querySelector(
      '[data-slot="pagination-results-per-page-label"]'
    );
    await expect(resultsLabel).toHaveTextContent('Results per page');

    // Verify select trigger is present
    const selectTrigger = canvasElement.querySelector('[role="combobox"]');
    await expect(selectTrigger).toBeInTheDocument();

    // Verify active page
    const activeLink = canvasElement.querySelector('[data-active="true"]');
    await expect(activeLink).toHaveTextContent('8');
  },
};

/**
 * Composition pattern: Results per page selector (small size).
 */
export const WithResultsPerPageSmall: Story = {
  render: function WithResultsPerPageSmallStory() {
    const [resultsPerPage, setResultsPerPage] = useState('25');

    return (
      <Pagination>
        <PaginationContent size="small">
          <PaginationItem>
            <PaginationFirst href="#" />
          </PaginationItem>
          <PaginationItem>
            <PaginationPrevious href="#" />
          </PaginationItem>
          <PaginationItem>
            <PaginationLink href="#">1</PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationLink href="#">2</PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>
          <PaginationItem>
            <PaginationLink href="#" isActive>
              8
            </PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationNext href="#" />
          </PaginationItem>
          <PaginationItem>
            <PaginationLast href="#" />
          </PaginationItem>
          <PaginationResultsPerPage>
            <PaginationResultsPerPageLabel>Results per page</PaginationResultsPerPageLabel>
            <Select value={resultsPerPage} onValueChange={setResultsPerPage}>
              <PaginationSelectTrigger>
                <SelectValue />
              </PaginationSelectTrigger>
              <SelectContent>
                <SelectItem value="10">10</SelectItem>
                <SelectItem value="25">25</SelectItem>
                <SelectItem value="50">50</SelectItem>
                <SelectItem value="100">100</SelectItem>
              </SelectContent>
            </Select>
          </PaginationResultsPerPage>
        </PaginationContent>
      </Pagination>
    );
  },
  parameters: {
    order: 4,
    docs: {
      description: {
        story: 'Pagination with results per page selector (small size).',
      },
    },
  },
  play: async ({ canvasElement }) => {
    const paginationContent = canvasElement.querySelector('[data-slot="pagination-content"]');
    await expect(paginationContent).toBeInTheDocument();

    // Verify small size attribute
    await expect(paginationContent).toHaveAttribute('data-size', 'small');

    // Verify "Results per page" label is present
    const resultsLabel = canvasElement.querySelector('span.text-muted-foreground');
    await expect(resultsLabel).toHaveTextContent('Results per page');

    // Verify select trigger is present with small size
    const selectTrigger = canvasElement.querySelector('[role="combobox"]');
    await expect(selectTrigger).toBeInTheDocument();

    // Verify active page
    const activeLink = canvasElement.querySelector('[data-active="true"]');
    await expect(activeLink).toHaveTextContent('8');
  },
};

/**
 * Composition pattern: Teleportation mode with editable page input (default size).
 */
export const TeleportationMode: Story = {
  render: function TeleportationModeStory() {
    const [currentPage, setCurrentPage] = useState(1);
    const totalPages = 100;
    const [resultsPerPage, setResultsPerPage] = useState('25');

    return (
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationFirst
              href="#"
              onClick={(e) => {
                e.preventDefault();
                setCurrentPage(1);
              }}
            />
          </PaginationItem>
          <PaginationItem>
            <PaginationPrevious
              href="#"
              onClick={(e) => {
                e.preventDefault();
                if (currentPage > 1) setCurrentPage(currentPage - 1);
              }}
            />
          </PaginationItem>
          <PaginationItem>
            <PaginationTeleport
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
            />
          </PaginationItem>
          <PaginationItem>
            <PaginationNext
              href="#"
              onClick={(e) => {
                e.preventDefault();
                if (currentPage < totalPages) setCurrentPage(currentPage + 1);
              }}
            />
          </PaginationItem>
          <PaginationItem>
            <PaginationLast
              href="#"
              onClick={(e) => {
                e.preventDefault();
                setCurrentPage(totalPages);
              }}
            />
          </PaginationItem>
          <PaginationResultsPerPage>
            <PaginationResultsPerPageLabel>Results per page</PaginationResultsPerPageLabel>
            <Select value={resultsPerPage} onValueChange={setResultsPerPage}>
              <PaginationSelectTrigger>
                <SelectValue />
              </PaginationSelectTrigger>
              <SelectContent>
                <SelectItem value="10">10</SelectItem>
                <SelectItem value="25">25</SelectItem>
                <SelectItem value="50">50</SelectItem>
                <SelectItem value="100">100</SelectItem>
              </SelectContent>
            </Select>
          </PaginationResultsPerPage>
        </PaginationContent>
      </Pagination>
    );
  },
  parameters: {
    order: 5,
    docs: {
      description: {
        story:
          'Teleportation mode with editable page input - click the page number to jump to any page.',
      },
    },
  },
  play: async ({ canvasElement }) => {
    const pagination = canvasElement.querySelector('[data-slot="pagination"]');
    await expect(pagination).toBeInTheDocument();

    // Verify default size
    const paginationContent = canvasElement.querySelector('[data-slot="pagination-content"]');
    await expect(paginationContent).toHaveAttribute('data-size', 'default');

    // Verify teleportation input is present
    const teleportInput = canvasElement.querySelector('[data-slot="pagination-teleport"]');
    await expect(teleportInput).toBeInTheDocument();
    await expect(teleportInput).toHaveValue('1/100');

    // Verify navigation buttons are present
    const firstButton = canvasElement.querySelector('[data-slot="pagination-first"]');
    const lastButton = canvasElement.querySelector('[data-slot="pagination-last"]');
    await expect(firstButton).toBeInTheDocument();
    await expect(lastButton).toBeInTheDocument();

    // Verify "Results per page" selector is present
    const resultsLabel = canvasElement.querySelector(
      '[data-slot="pagination-results-per-page-label"]'
    );
    await expect(resultsLabel).toHaveTextContent('Results per page');
  },
};

/**
 * Composition pattern: Teleportation mode with editable page input (small size).
 */
export const TeleportationModeSmall: Story = {
  render: function TeleportationModeSmallStory() {
    const [currentPage, setCurrentPage] = useState(1);
    const totalPages = 10;
    const [resultsPerPage, setResultsPerPage] = useState('25');

    return (
      <Pagination>
        <PaginationContent size="small">
          <PaginationItem>
            <PaginationFirst
              href="#"
              onClick={(e) => {
                e.preventDefault();
                setCurrentPage(1);
              }}
            />
          </PaginationItem>
          <PaginationItem>
            <PaginationPrevious
              href="#"
              onClick={(e) => {
                e.preventDefault();
                if (currentPage > 1) setCurrentPage(currentPage - 1);
              }}
            />
          </PaginationItem>
          <PaginationItem>
            <PaginationTeleport
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
            />
          </PaginationItem>
          <PaginationItem>
            <PaginationNext
              href="#"
              onClick={(e) => {
                e.preventDefault();
                if (currentPage < totalPages) setCurrentPage(currentPage + 1);
              }}
            />
          </PaginationItem>
          <PaginationItem>
            <PaginationLast
              href="#"
              onClick={(e) => {
                e.preventDefault();
                setCurrentPage(totalPages);
              }}
            />
          </PaginationItem>
          <PaginationResultsPerPage>
            <PaginationResultsPerPageLabel>Results per page</PaginationResultsPerPageLabel>
            <Select value={resultsPerPage} onValueChange={setResultsPerPage}>
              <PaginationSelectTrigger>
                <SelectValue />
              </PaginationSelectTrigger>
              <SelectContent>
                <SelectItem value="10">10</SelectItem>
                <SelectItem value="25">25</SelectItem>
                <SelectItem value="50">50</SelectItem>
                <SelectItem value="100">100</SelectItem>
              </SelectContent>
            </Select>
          </PaginationResultsPerPage>
        </PaginationContent>
      </Pagination>
    );
  },
  parameters: {
    order: 6,
    docs: {
      description: {
        story: 'Teleportation mode with editable page input in small size.',
      },
    },
  },
  play: async ({ canvasElement }) => {
    const paginationContent = canvasElement.querySelector('[data-slot="pagination-content"]');
    await expect(paginationContent).toBeInTheDocument();

    // Verify small size attribute
    await expect(paginationContent).toHaveAttribute('data-size', 'small');

    // Verify teleportation input is present
    const teleportInput = canvasElement.querySelector('[data-slot="pagination-teleport"]');
    await expect(teleportInput).toBeInTheDocument();
    await expect(teleportInput).toHaveValue('1/10');

    // Verify navigation buttons are present
    const firstButton = canvasElement.querySelector('[data-slot="pagination-first"]');
    const lastButton = canvasElement.querySelector('[data-slot="pagination-last"]');
    await expect(firstButton).toBeInTheDocument();
    await expect(lastButton).toBeInTheDocument();

    // Verify "Results per page" selector is present
    const resultsLabel = canvasElement.querySelector(
      '[data-slot="pagination-results-per-page-label"]'
    );
    await expect(resultsLabel).toHaveTextContent('Results per page');
  },
};

/**
 * Composition pattern: Using ellipsis for large page ranges.
 */
export const WithEllipsis: Story = {
  render: () => (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationFirst href="#" />
        </PaginationItem>
        <PaginationItem>
          <PaginationPrevious href="#" />
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href="#">1</PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href="#">2</PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationEllipsis />
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href="#" isActive>
            8
          </PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationEllipsis />
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href="#">9</PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href="#">10</PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationNext href="#" />
        </PaginationItem>
        <PaginationItem>
          <PaginationLast href="#" />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  ),
  parameters: {
    order: 7,
    docs: {
      description: {
        story: 'Pagination with ellipsis for many pages.',
      },
    },
  },
  play: async ({ canvasElement }) => {
    const pagination = canvasElement.querySelector('[data-slot="pagination"]');
    await expect(pagination).toBeInTheDocument();

    // Verify ellipsis elements are present
    const ellipsisElements = canvasElement.querySelectorAll('[data-slot="pagination-ellipsis"]');
    await expect(ellipsisElements.length).toBe(2);

    // Verify active page
    const activeLink = canvasElement.querySelector('[data-active="true"]');
    await expect(activeLink).toHaveTextContent('8');

    // Verify page numbers are present
    const pageLinks = canvasElement.querySelectorAll('[data-slot="pagination-link"]');
    await expect(pageLinks.length).toBeGreaterThan(0);
  },
};

/**
 * Interactive example: Fully controlled pagination with dynamic page generation.
 */
export const Controlled: Story = {
  render: function ControlledPagination() {
    const [currentPage, setCurrentPage] = useState(1);
    const totalPages = 100;

    const getPageNumbers = () => {
      const pages = [];
      const showEllipsis = totalPages > 7;

      if (!showEllipsis) {
        for (let i = 1; i <= totalPages; i++) {
          pages.push(i);
        }
      } else {
        if (currentPage <= 3) {
          pages.push(1, 2, 3, 4, '...', totalPages);
        } else if (currentPage >= totalPages - 2) {
          pages.push(1, '...', totalPages - 3, totalPages - 2, totalPages - 1, totalPages);
        } else {
          pages.push(1, '...', currentPage - 1, currentPage, currentPage + 1, '...', totalPages);
        }
      }

      return pages;
    };

    return (
      <div className="space-y-4">
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  if (currentPage > 1) setCurrentPage(currentPage - 1);
                }}
              />
            </PaginationItem>
            {getPageNumbers().map((page, index) => (
              <PaginationItem key={index}>
                {page === '...' ? (
                  <PaginationEllipsis />
                ) : (
                  <PaginationLink
                    href="#"
                    isActive={page === currentPage}
                    onClick={(e) => {
                      e.preventDefault();
                      setCurrentPage(page as number);
                    }}
                  >
                    {page}
                  </PaginationLink>
                )}
              </PaginationItem>
            ))}
            <PaginationItem>
              <PaginationNext
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  if (currentPage < totalPages) setCurrentPage(currentPage + 1);
                }}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
        <output className="text-sm text-muted-foreground text-center">
          Page {currentPage} of {totalPages}
        </output>
      </div>
    );
  },
  parameters: {
    order: 8,
    docs: {
      description: {
        story: 'Fully controlled pagination with state management.',
      },
    },
  },
  play: async ({ canvasElement }) => {
    const pagination = canvasElement.querySelector('[data-slot="pagination"]');
    await expect(pagination).toBeInTheDocument();

    // Verify active page (starts at page 1)
    const activeLink = canvasElement.querySelector('[data-active="true"]');
    await expect(activeLink).toHaveTextContent('1');

    // Verify page counter text is present
    const pageCounter = canvasElement.querySelector('output.text-muted-foreground');
    await expect(pageCounter).toHaveTextContent(/Page 1 of 100/);

    // Verify navigation buttons are present
    const prevButton = canvasElement.querySelector('[data-slot="pagination-previous"]');
    const nextButton = canvasElement.querySelector('[data-slot="pagination-next"]');
    await expect(prevButton).toBeInTheDocument();
    await expect(nextButton).toBeInTheDocument();
  },
};

/**
 * Minimal example: Simple pagination with only prev/next buttons.
 */
export const Simple: Story = {
  render: () => (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious href="#" />
        </PaginationItem>
        <PaginationItem>
          <PaginationNext href="#" />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  ),
  parameters: {
    order: 9,
    docs: {
      description: {
        story: 'Simple pagination with only previous and next buttons.',
      },
    },
  },
  play: async ({ canvasElement }) => {
    const pagination = canvasElement.querySelector('[data-slot="pagination"]');
    await expect(pagination).toBeInTheDocument();

    // Verify only prev/next buttons are present (no page numbers)
    const prevButton = canvasElement.querySelector('[data-slot="pagination-previous"]');
    const nextButton = canvasElement.querySelector('[data-slot="pagination-next"]');
    await expect(prevButton).toBeInTheDocument();
    await expect(nextButton).toBeInTheDocument();

    // Verify no page links present
    const pageLinks = canvasElement.querySelectorAll('[data-slot="pagination-link"]');
    await expect(pageLinks.length).toBe(0);
  },
};

/**
 * State example: First page with disabled previous button.
 */
export const StateFirstPage: Story = {
  render: () => (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious href="#" isDisabled />
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href="#" isActive>
            1
          </PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href="#">2</PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href="#">3</PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationEllipsis />
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href="#">10</PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationNext href="#" />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  ),
  parameters: {
    order: 10,
    docs: {
      description: {
        story: 'Pagination when on the first page (previous disabled).',
      },
    },
  },
  play: async ({ canvasElement }) => {
    const pagination = canvasElement.querySelector('[data-slot="pagination"]');
    await expect(pagination).toBeInTheDocument();

    // Verify active page is 1
    const activeLink = canvasElement.querySelector('[data-active="true"]');
    await expect(activeLink).toHaveTextContent('1');

    // Verify previous button is disabled
    const prevButton = canvasElement.querySelector('[data-slot="pagination-previous"]');
    await expect(prevButton).toHaveClass('opacity-50');
    await expect(prevButton).toHaveClass('pointer-events-none');

    // Verify next button is enabled
    const nextButton = canvasElement.querySelector('[data-slot="pagination-next"]');
    await expect(nextButton).toBeInTheDocument();
    await expect(nextButton).not.toHaveClass('opacity-50');
  },
};

/**
 * State example: Last page with disabled next button.
 */
export const StateLastPage: Story = {
  render: () => (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious href="#" />
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href="#">1</PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationEllipsis />
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href="#">8</PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href="#">9</PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href="#" isActive>
            10
          </PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationNext href="#" isDisabled />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  ),
  parameters: {
    order: 11,
    docs: {
      description: {
        story: 'Pagination when on the last page (next disabled).',
      },
    },
  },
  play: async ({ canvasElement }) => {
    const pagination = canvasElement.querySelector('[data-slot="pagination"]');
    await expect(pagination).toBeInTheDocument();

    // Verify active page is 10
    const activeLink = canvasElement.querySelector('[data-active="true"]');
    await expect(activeLink).toHaveTextContent('10');

    // Verify next button is disabled
    const nextButton = canvasElement.querySelector('[data-slot="pagination-next"]');
    await expect(nextButton).toHaveClass('opacity-50');
    await expect(nextButton).toHaveClass('pointer-events-none');

    // Verify previous button is enabled
    const prevButton = canvasElement.querySelector('[data-slot="pagination-previous"]');
    await expect(prevButton).toBeInTheDocument();
    await expect(prevButton).not.toHaveClass('opacity-50');
  },
};

/**
 * Minimal example: Compact pagination without first/last buttons.
 */
export const Compact: Story = {
  render: () => (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious href="#" />
        </PaginationItem>
        <PaginationItem>
          <PaginationStatus>Page 3 of 10</PaginationStatus>
        </PaginationItem>
        <PaginationItem>
          <PaginationNext href="#" />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  ),
  parameters: {
    order: 12,
    docs: {
      description: {
        story: 'Compact pagination showing current position.',
      },
    },
  },
  play: async ({ canvasElement }) => {
    const pagination = canvasElement.querySelector('[data-slot="pagination"]');
    await expect(pagination).toBeInTheDocument();

    // Verify page counter text is present
    const pageText = canvasElement.querySelector('[data-slot="pagination-status"]');
    await expect(pageText).toHaveTextContent('Page 3 of 10');

    // Verify navigation buttons are present
    const prevButton = canvasElement.querySelector('[data-slot="pagination-previous"]');
    const nextButton = canvasElement.querySelector('[data-slot="pagination-next"]');
    await expect(prevButton).toBeInTheDocument();
    await expect(nextButton).toBeInTheDocument();

    // Verify no page links present
    const pageLinks = canvasElement.querySelectorAll('[data-slot="pagination-link"]');
    await expect(pageLinks.length).toBe(0);
  },
};

/**
 * Visual regression testing - All variants from Figma.
 */
export const VisualRegression: Story = {
  render: () => {
    const [resultsPerPage1, setResultsPerPage1] = useState('25');
    const [resultsPerPage2, setResultsPerPage2] = useState('25');
    const [resultsPerPage3, setResultsPerPage3] = useState('25');
    const [resultsPerPage4, setResultsPerPage4] = useState('25');
    const [teleportPage1, setTeleportPage1] = useState(1);
    const [teleportPage2, setTeleportPage2] = useState(1);
    const totalPages = 100;

    const updateTeleportPage1 = (nextPage: number) => {
      setTeleportPage1(nextPage);
    };

    const updateTeleportPage2 = (nextPage: number) => {
      setTeleportPage2(nextPage);
    };

    return (
      <div className="space-y-8 p-4">
        {/* 1. Default size - Page navigation */}
        <div className="space-y-2">
          <h3 className="text-sm font-semibold text-muted-foreground">
            Counter=False, Size=Default
          </h3>
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationFirst href="#" />
              </PaginationItem>
              <PaginationItem>
                <PaginationPrevious href="#" />
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="#">1</PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="#">2</PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationEllipsis />
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="#" isActive>
                  8
                </PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationNext href="#" />
              </PaginationItem>
              <PaginationItem>
                <PaginationLast href="#" />
              </PaginationItem>
              <PaginationResultsPerPage>
                <PaginationResultsPerPageLabel>Results per page</PaginationResultsPerPageLabel>
                <Select value={resultsPerPage1} onValueChange={setResultsPerPage1}>
                  <PaginationSelectTrigger>
                    <SelectValue />
                  </PaginationSelectTrigger>
                  <SelectContent>
                    <SelectItem value="10">10</SelectItem>
                    <SelectItem value="25">25</SelectItem>
                    <SelectItem value="50">50</SelectItem>
                    <SelectItem value="100">100</SelectItem>
                  </SelectContent>
                </Select>
              </PaginationResultsPerPage>
            </PaginationContent>
          </Pagination>
        </div>

        {/* 2. Small size - Page navigation */}
        <div className="space-y-2">
          <h3 className="text-sm font-semibold text-muted-foreground">Counter=False, Size=Small</h3>
          <Pagination>
            <PaginationContent size="small">
              <PaginationItem>
                <PaginationFirst href="#" />
              </PaginationItem>
              <PaginationItem>
                <PaginationPrevious href="#" />
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="#">1</PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="#">2</PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationEllipsis />
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="#" isActive>
                  8
                </PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationNext href="#" />
              </PaginationItem>
              <PaginationItem>
                <PaginationLast href="#" />
              </PaginationItem>
              <PaginationResultsPerPage>
                <PaginationResultsPerPageLabel>Results per page</PaginationResultsPerPageLabel>
                <Select value={resultsPerPage2} onValueChange={setResultsPerPage2}>
                  <PaginationSelectTrigger>
                    <SelectValue />
                  </PaginationSelectTrigger>
                  <SelectContent>
                    <SelectItem value="10">10</SelectItem>
                    <SelectItem value="25">25</SelectItem>
                    <SelectItem value="50">50</SelectItem>
                    <SelectItem value="100">100</SelectItem>
                  </SelectContent>
                </Select>
              </PaginationResultsPerPage>
            </PaginationContent>
          </Pagination>
        </div>

        {/* 3. Default size - Counter */}
        <div className="space-y-2">
          <h3 className="text-sm font-semibold text-muted-foreground">
            Counter=True, Size=Default
          </h3>
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationFirst
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    updateTeleportPage1(1);
                  }}
                />
              </PaginationItem>
              <PaginationItem>
                <PaginationPrevious
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    if (teleportPage1 > 1) updateTeleportPage1(teleportPage1 - 1);
                  }}
                />
              </PaginationItem>
              <PaginationItem>
                <PaginationTeleport
                  currentPage={teleportPage1}
                  totalPages={totalPages}
                  onPageChange={updateTeleportPage1}
                />
              </PaginationItem>
              <PaginationItem>
                <PaginationNext
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    if (teleportPage1 < totalPages) updateTeleportPage1(teleportPage1 + 1);
                  }}
                />
              </PaginationItem>
              <PaginationItem>
                <PaginationLast
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    updateTeleportPage1(totalPages);
                  }}
                />
              </PaginationItem>
              <PaginationResultsPerPage>
                <PaginationResultsPerPageLabel>Results per page</PaginationResultsPerPageLabel>
                <Select value={resultsPerPage3} onValueChange={setResultsPerPage3}>
                  <PaginationSelectTrigger>
                    <SelectValue />
                  </PaginationSelectTrigger>
                  <SelectContent>
                    <SelectItem value="10">10</SelectItem>
                    <SelectItem value="25">25</SelectItem>
                    <SelectItem value="50">50</SelectItem>
                    <SelectItem value="100">100</SelectItem>
                  </SelectContent>
                </Select>
              </PaginationResultsPerPage>
            </PaginationContent>
          </Pagination>
        </div>

        {/* 4. Small size - Counter */}
        <div className="space-y-2">
          <h3 className="text-sm font-semibold text-muted-foreground">Counter=True, Size=Small</h3>
          <Pagination>
            <PaginationContent size="small">
              <PaginationItem>
                <PaginationFirst
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    updateTeleportPage2(1);
                  }}
                />
              </PaginationItem>
              <PaginationItem>
                <PaginationPrevious
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    if (teleportPage2 > 1) updateTeleportPage2(teleportPage2 - 1);
                  }}
                />
              </PaginationItem>
              <PaginationItem>
                <PaginationTeleport
                  currentPage={teleportPage2}
                  totalPages={totalPages}
                  onPageChange={updateTeleportPage2}
                />
              </PaginationItem>
              <PaginationItem>
                <PaginationNext
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    if (teleportPage2 < totalPages) updateTeleportPage2(teleportPage2 + 1);
                  }}
                />
              </PaginationItem>
              <PaginationItem>
                <PaginationLast
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    updateTeleportPage2(totalPages);
                  }}
                />
              </PaginationItem>
              <PaginationResultsPerPage>
                <PaginationResultsPerPageLabel>Results per page</PaginationResultsPerPageLabel>
                <Select value={resultsPerPage4} onValueChange={setResultsPerPage4}>
                  <PaginationSelectTrigger>
                    <SelectValue />
                  </PaginationSelectTrigger>
                  <SelectContent>
                    <SelectItem value="10">10</SelectItem>
                    <SelectItem value="25">25</SelectItem>
                    <SelectItem value="50">50</SelectItem>
                    <SelectItem value="100">100</SelectItem>
                  </SelectContent>
                </Select>
              </PaginationResultsPerPage>
            </PaginationContent>
          </Pagination>
        </div>
      </div>
    );
  },
  parameters: {
    order: 13,
    docs: {
      description: {
        story:
          'Comprehensive visual overview showing all 4 variants from Figma: Default/Small sizes with regular and teleportation modes.',
      },
    },
    chromatic: {
      disableSnapshot: false,
    },
  },
  play: async ({ canvasElement }) => {
    const pagination = canvasElement.querySelector('[data-slot="pagination"]');
    await expect(pagination).toBeInTheDocument();

    // Verify all 4 variants are rendered
    const paginationContents = canvasElement.querySelectorAll('[data-slot="pagination-content"]');
    await expect(paginationContents.length).toBe(4);

    // Verify size attributes
    await expect(paginationContents[0]).toHaveAttribute('data-size', 'default');
    await expect(paginationContents[1]).toHaveAttribute('data-size', 'small');
    await expect(paginationContents[2]).toHaveAttribute('data-size', 'default');
    await expect(paginationContents[3]).toHaveAttribute('data-size', 'small');

    // Verify headings are present
    const headings = canvasElement.querySelectorAll('h3');
    await expect(headings.length).toBe(4);
    await expect(headings[0]).toHaveTextContent('Counter=False, Size=Default');
    await expect(headings[1]).toHaveTextContent('Counter=False, Size=Small');
    await expect(headings[2]).toHaveTextContent('Counter=True, Size=Default');
    await expect(headings[3]).toHaveTextContent('Counter=True, Size=Small');
  },
};

/**
 * Edge case: Teleportation mode with large page count (1000+ pages) tests dynamic width.
 */
export const EdgeCaseLargePageCount: Story = {
  render: function EdgeCaseLargePageCountStory() {
    const [currentPage, setCurrentPage] = useState(1);
    const totalPages = 5000;
    const [resultsPerPage, setResultsPerPage] = useState('25');

    return (
      <div className="space-y-8">
        {/* Default size with large page count */}
        <div className="space-y-2">
          <h3 className="text-sm font-semibold text-muted-foreground">Default Size (5000 pages)</h3>
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationFirst
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    setCurrentPage(1);
                  }}
                />
              </PaginationItem>
              <PaginationItem>
                <PaginationPrevious
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    if (currentPage > 1) setCurrentPage(currentPage - 1);
                  }}
                />
              </PaginationItem>
              <PaginationItem>
                <PaginationTeleport
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={setCurrentPage}
                />
              </PaginationItem>
              <PaginationItem>
                <PaginationNext
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
                  }}
                />
              </PaginationItem>
              <PaginationItem>
                <PaginationLast
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    setCurrentPage(totalPages);
                  }}
                />
              </PaginationItem>
              <PaginationResultsPerPage>
                <PaginationResultsPerPageLabel>Results per page</PaginationResultsPerPageLabel>
                <Select value={resultsPerPage} onValueChange={setResultsPerPage}>
                  <PaginationSelectTrigger>
                    <SelectValue />
                  </PaginationSelectTrigger>
                  <SelectContent>
                    <SelectItem value="10">10</SelectItem>
                    <SelectItem value="25">25</SelectItem>
                    <SelectItem value="50">50</SelectItem>
                    <SelectItem value="100">100</SelectItem>
                  </SelectContent>
                </Select>
              </PaginationResultsPerPage>
            </PaginationContent>
          </Pagination>
        </div>

        {/* Small size with large page count */}
        <div className="space-y-2">
          <h3 className="text-sm font-semibold text-muted-foreground">Small Size (5000 pages)</h3>
          <Pagination>
            <PaginationContent size="small">
              <PaginationItem>
                <PaginationFirst
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    setCurrentPage(1);
                  }}
                />
              </PaginationItem>
              <PaginationItem>
                <PaginationPrevious
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    if (currentPage > 1) setCurrentPage(currentPage - 1);
                  }}
                />
              </PaginationItem>
              <PaginationItem>
                <PaginationTeleport
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={setCurrentPage}
                />
              </PaginationItem>
              <PaginationItem>
                <PaginationNext
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
                  }}
                />
              </PaginationItem>
              <PaginationItem>
                <PaginationLast
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    setCurrentPage(totalPages);
                  }}
                />
              </PaginationItem>
              <PaginationResultsPerPage>
                <PaginationResultsPerPageLabel>Results per page</PaginationResultsPerPageLabel>
                <Select value={resultsPerPage} onValueChange={setResultsPerPage}>
                  <PaginationSelectTrigger>
                    <SelectValue />
                  </PaginationSelectTrigger>
                  <SelectContent>
                    <SelectItem value="10">10</SelectItem>
                    <SelectItem value="25">25</SelectItem>
                    <SelectItem value="50">50</SelectItem>
                    <SelectItem value="100">100</SelectItem>
                  </SelectContent>
                </Select>
              </PaginationResultsPerPage>
            </PaginationContent>
          </Pagination>
        </div>
      </div>
    );
  },
  parameters: {
    order: 14,
    docs: {
      description: {
        story:
          'Teleportation mode with large page counts (1000+) uses wider containers to accommodate the numbers.',
      },
    },
  },
  play: async ({ canvasElement }) => {
    const pagination = canvasElement.querySelector('[data-slot="pagination"]');
    await expect(pagination).toBeInTheDocument();

    // Verify both size variants are present
    const paginationContents = canvasElement.querySelectorAll('[data-slot="pagination-content"]');
    await expect(paginationContents.length).toBe(2);

    // Verify teleportation components show large page counts
    const teleportDisplays = canvasElement.querySelectorAll('[data-slot="pagination-teleport"]');
    await expect(teleportDisplays.length).toBe(2);
    await expect(teleportDisplays[0]).toHaveValue('1/5000');
    await expect(teleportDisplays[1]).toHaveValue('1/5000');
  },
};

/**
 * Edge case: Disabled teleportation input state.
 */
export const EdgeCaseDisabledTeleport: Story = {
  render: function EdgeCaseDisabledTeleportStory() {
    const [currentPage] = useState(3);
    const totalPages = 100;

    return (
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationFirst href="#" isDisabled />
          </PaginationItem>
          <PaginationItem>
            <PaginationPrevious href="#" isDisabled />
          </PaginationItem>
          <PaginationItem>
            <PaginationTeleport
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={() => {}}
              disabled
            />
          </PaginationItem>
          <PaginationItem>
            <PaginationNext href="#" isDisabled />
          </PaginationItem>
          <PaginationItem>
            <PaginationLast href="#" isDisabled />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    );
  },
  parameters: {
    order: 15,
    docs: {
      description: {
        story: 'Teleportation input in disabled state with proper styling and cursor behavior.',
      },
    },
  },
  play: async ({ canvasElement }) => {
    const teleportInput = canvasElement.querySelector('[data-slot="pagination-teleport"]');
    await expect(teleportInput).toBeInTheDocument();
    await expect(teleportInput).toBeDisabled();
    // disabled:opacity-50 class applies opacity when disabled
  },
};

/**
 * Edge case: Limited width container.
 */
export const EdgeCaseLimitedWidth: Story = {
  render: () => (
    <div className="w-96 border border-border rounded-md p-4">
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationFirst href="#" />
          </PaginationItem>
          <PaginationItem>
            <PaginationPrevious href="#" />
          </PaginationItem>
          <PaginationItem>
            <PaginationLink href="#">1</PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationLink href="#" isActive>
              2
            </PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationLink href="#">3</PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>
          <PaginationItem>
            <PaginationLink href="#">10</PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationNext href="#" />
          </PaginationItem>
          <PaginationItem>
            <PaginationLast href="#" />
          </PaginationItem>
          <PaginationResultsPerPage>
            <PaginationResultsPerPageLabel>Results per page</PaginationResultsPerPageLabel>
            <Select value="25" onValueChange={() => {}}>
              <PaginationSelectTrigger>
                <SelectValue />
              </PaginationSelectTrigger>
              <SelectContent>
                <SelectItem value="10">10</SelectItem>
                <SelectItem value="25">25</SelectItem>
                <SelectItem value="50">50</SelectItem>
                <SelectItem value="100">100</SelectItem>
              </SelectContent>
            </Select>
          </PaginationResultsPerPage>
        </PaginationContent>
      </Pagination>
    </div>
  ),
  parameters: {
    order: 16,
    docs: {
      description: {
        story: 'Pagination in a constrained width container (384px) to test overflow behavior.',
      },
    },
  },
  play: async ({ canvasElement }) => {
    const pagination = canvasElement.querySelector('[data-slot="pagination"]');
    await expect(pagination).toBeInTheDocument();
  },
};

/**
 * Edge case: Single page.
 */
export const EdgeCaseSinglePage: Story = {
  render: () => (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious href="#" isDisabled />
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href="#" isActive>
            1
          </PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationNext href="#" isDisabled />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  ),
  parameters: {
    order: 17,
    docs: {
      description: {
        story: 'Pagination with only a single page (both navigation buttons disabled).',
      },
    },
  },
  play: async ({ canvasElement }) => {
    const pagination = canvasElement.querySelector('[data-slot="pagination"]');
    await expect(pagination).toBeInTheDocument();

    // Verify only one page link
    const pageLinks = canvasElement.querySelectorAll('[data-slot="pagination-link"]');
    await expect(pageLinks.length).toBe(1);

    // Verify both nav buttons are disabled
    const prevButton = canvasElement.querySelector('[data-slot="pagination-previous"]');
    const nextButton = canvasElement.querySelector('[data-slot="pagination-next"]');
    await expect(prevButton).toHaveClass('opacity-50');
    await expect(nextButton).toHaveClass('opacity-50');
  },
};

/**
 * Edge case: Two pages only.
 */
export const EdgeCaseTwoPages: Story = {
  render: () => (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious href="#" isDisabled />
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href="#" isActive>
            1
          </PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href="#">2</PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationNext href="#" />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  ),
  parameters: {
    order: 18,
    docs: {
      description: {
        story: 'Pagination with only two pages (no ellipsis needed).',
      },
    },
  },
  play: async ({ canvasElement }) => {
    const pagination = canvasElement.querySelector('[data-slot="pagination"]');
    await expect(pagination).toBeInTheDocument();

    // Verify two page links
    const pageLinks = canvasElement.querySelectorAll('[data-slot="pagination-link"]');
    await expect(pageLinks.length).toBe(2);

    // Verify no ellipsis
    const ellipsis = canvasElement.querySelector('[data-slot="pagination-ellipsis"]');
    await expect(ellipsis).not.toBeInTheDocument();
  },
};

/**
 * Interactive playground.
 */
export const Playground: Story = {
  render: () => (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious href="#" />
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href="#">1</PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href="#" isActive>
            2
          </PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href="#">3</PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationEllipsis />
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href="#">10</PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationNext href="#" />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  ),
  parameters: {
    order: 99,
    docs: {
      description: {
        story: 'Interactive pagination example.',
      },
    },
  },
  play: async ({ canvasElement }) => {
    const pagination = canvasElement.querySelector('[data-slot="pagination"]');
    await expect(pagination).toBeInTheDocument();

    // Verify active page
    const activeLink = canvasElement.querySelector('[data-active="true"]');
    await expect(activeLink).toHaveTextContent('2');

    // Verify navigation buttons
    const prevButton = canvasElement.querySelector('[data-slot="pagination-previous"]');
    const nextButton = canvasElement.querySelector('[data-slot="pagination-next"]');
    await expect(prevButton).toBeInTheDocument();
    await expect(nextButton).toBeInTheDocument();

    // Verify page numbers and ellipsis
    const pageLinks = canvasElement.querySelectorAll('[data-slot="pagination-link"]');
    const ellipsis = canvasElement.querySelector('[data-slot="pagination-ellipsis"]');
    await expect(pageLinks.length).toBeGreaterThan(0);
    await expect(ellipsis).toBeInTheDocument();
  },
};
