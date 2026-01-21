import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { expect } from "@storybook/test";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/aura/select";
import { cn } from "@/lib/utils";
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
} from "./pagination";

const meta: Meta<typeof Pagination> = {
  title: "Primitives/Pagination",
  component: Pagination,
  tags: ["autodocs"],
  argTypes: {
    className: {
      control: "text",
      description: "Additional CSS classes",
      table: {
        category: "Styling",
      },
    },
  },
  parameters: {
    layout: "centered",
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
            5
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
    docs: {
      description: {
        story: "Default pagination with page navigation, next and previous links.",
      },
    },
  },
  play: async ({ canvasElement }) => {
    const pagination = canvasElement.querySelector('[data-slot="pagination"]');
    await expect(pagination).toBeInTheDocument();

    // Verify active page
    const activeLink = canvasElement.querySelector('[data-active="true"]');
    await expect(activeLink).toHaveTextContent("5");
  },
};

/**
 * Small size pagination variant.
 */
export const Small: Story = {
  render: () => (
    <Pagination>
      <PaginationContent size="small">
        <PaginationItem>
          <PaginationFirst href="#" size="small" />
        </PaginationItem>
        <PaginationItem>
          <PaginationPrevious href="#" size="small" />
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href="#" size="small">
            1
          </PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href="#" size="small">
            2
          </PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationEllipsis size="small" />
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href="#" isActive size="small">
            5
          </PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationNext href="#" size="small" />
        </PaginationItem>
        <PaginationItem>
          <PaginationLast href="#" size="small" />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  ),
  parameters: {
    docs: {
      description: {
        story: "Small size variant for compact layouts.",
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
    await expect(activeLink).toHaveTextContent("5");
    
    // Verify all navigation buttons are present
    const firstButton = canvasElement.querySelector('[data-slot="pagination-first"]');
    const lastButton = canvasElement.querySelector('[data-slot="pagination-last"]');
    await expect(firstButton).toBeInTheDocument();
    await expect(lastButton).toBeInTheDocument();
  },
};

type PaginationStorySize = "default" | "small";

const ResultsPerPageStory = ({ size }: { size: PaginationStorySize }) => {
  const [resultsPerPage, setResultsPerPage] = useState("25");
  const isSmall = size === "small";
  const triggerClassName = isSmall ? "h-7 w-[65px]" : "h-9 w-[73px]";

  return (
    <Pagination>
      <PaginationContent size={size}>
        <PaginationItem>
          <PaginationFirst href="#" size={size} />
        </PaginationItem>
        <PaginationItem>
          <PaginationPrevious href="#" size={size} />
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href="#" size={size}>
            1
          </PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href="#" size={size}>
            2
          </PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationEllipsis size={size} />
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href="#" isActive size={size}>
            5
          </PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationNext href="#" size={size} />
        </PaginationItem>
        <PaginationItem>
          <PaginationLast href="#" size={size} />
        </PaginationItem>
        <PaginationItem>
          <div className="flex items-center gap-2 pl-4">
            <span className="text-sm text-muted-foreground">Results per page</span>
            <Select value={resultsPerPage} onValueChange={setResultsPerPage}>
              <SelectTrigger className={triggerClassName}>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="10">10</SelectItem>
                <SelectItem value="25">25</SelectItem>
                <SelectItem value="50">50</SelectItem>
                <SelectItem value="100">100</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
};

/**
 * Pagination with results per page selector (Default size).
 */
export const WithResultsPerPage: Story = {
  render: () => <ResultsPerPageStory size="default" />,
  parameters: {
    docs: {
      description: {
        story: "Pagination with results per page selector (default size).",
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
    const resultsLabel = canvasElement.querySelector('span.text-muted-foreground');
    await expect(resultsLabel).toHaveTextContent('Results per page');
    
    // Verify select trigger is present
    const selectTrigger = canvasElement.querySelector('[role="combobox"]');
    await expect(selectTrigger).toBeInTheDocument();
    
    // Verify active page
    const activeLink = canvasElement.querySelector('[data-active="true"]');
    await expect(activeLink).toHaveTextContent("5");
  },
};

/**
 * Pagination with results per page selector (Small size).
 */
export const WithResultsPerPageSmall: Story = {
  render: () => <ResultsPerPageStory size="small" />,
  parameters: {
    docs: {
      description: {
        story: "Pagination with results per page selector (small size).",
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
    await expect(activeLink).toHaveTextContent("5");
  },
};

const TeleportationStory = ({ size }: { size: PaginationStorySize }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = 10;
  const [resultsPerPage, setResultsPerPage] = useState("25");
  const isSmall = size === "small";
  const displayClassName = cn(
    "flex w-20 items-center justify-center border border-input bg-background px-3 font-normal",
    isSmall ? "h-7 rounded text-sm" : "h-9 rounded-md text-base"
  );
  const triggerClassName = isSmall ? "h-7 w-[65px]" : "h-9 w-[73px]";

  return (
    <Pagination>
      <PaginationContent size={size}>
        <PaginationItem>
          <PaginationFirst
            href="#"
            size={size}
            onClick={(e) => {
              e.preventDefault();
              setCurrentPage(1);
            }}
          />
        </PaginationItem>
        <PaginationItem>
          <PaginationPrevious
            href="#"
            size={size}
            onClick={(e) => {
              e.preventDefault();
              if (currentPage > 1) setCurrentPage(currentPage - 1);
            }}
          />
        </PaginationItem>
        <PaginationItem>
          <div className={displayClassName}>
            {currentPage}/{totalPages}
          </div>
        </PaginationItem>
        <PaginationItem>
          <PaginationNext
            href="#"
            size={size}
            onClick={(e) => {
              e.preventDefault();
              if (currentPage < totalPages) setCurrentPage(currentPage + 1);
            }}
          />
        </PaginationItem>
        <PaginationItem>
          <PaginationLast
            href="#"
            size={size}
            onClick={(e) => {
              e.preventDefault();
              setCurrentPage(totalPages);
            }}
          />
        </PaginationItem>
        <PaginationItem>
          <div className="flex items-center gap-2 pl-4">
            <span className="text-sm text-muted-foreground">Results per page</span>
            <Select value={resultsPerPage} onValueChange={setResultsPerPage}>
              <SelectTrigger className={triggerClassName}>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="10">10</SelectItem>
                <SelectItem value="25">25</SelectItem>
                <SelectItem value="50">50</SelectItem>
                <SelectItem value="100">100</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
};

/**
 * Teleportation mode - jump to specific page (Default size).
 */
export const TeleportationMode: Story = {
  render: () => <TeleportationStory size="default" />,
  parameters: {
    docs: {
      description: {
        story: "Teleportation mode showing current page and total pages (default size).",
      },
    },
  },
  play: async ({ canvasElement }) => {
    const pagination = canvasElement.querySelector('[data-slot="pagination"]');
    await expect(pagination).toBeInTheDocument();
    
    // Verify default size
    const paginationContent = canvasElement.querySelector('[data-slot="pagination-content"]');
    await expect(paginationContent).toHaveAttribute('data-size', 'default');
    
    // Verify teleportation display shows current/total format
    const teleportDisplay = canvasElement.querySelector('.flex.h-9.w-20');
    await expect(teleportDisplay).toBeInTheDocument();
    await expect(teleportDisplay).toHaveTextContent(/1\/10/);
    
    // Verify navigation buttons are present
    const firstButton = canvasElement.querySelector('[data-slot="pagination-first"]');
    const lastButton = canvasElement.querySelector('[data-slot="pagination-last"]');
    await expect(firstButton).toBeInTheDocument();
    await expect(lastButton).toBeInTheDocument();
    
    // Verify "Results per page" selector is present
    const resultsLabel = canvasElement.querySelector('span.text-muted-foreground');
    await expect(resultsLabel).toHaveTextContent('Results per page');
  },
};

/**
 * Teleportation mode - jump to specific page (Small size).
 */
export const TeleportationModeSmall: Story = {
  render: () => <TeleportationStory size="small" />,
  parameters: {
    docs: {
      description: {
        story: "Teleportation mode showing current page and total pages (small size).",
      },
    },
  },
  play: async ({ canvasElement }) => {
    const paginationContent = canvasElement.querySelector('[data-slot="pagination-content"]');
    await expect(paginationContent).toBeInTheDocument();
    
    // Verify small size attribute
    await expect(paginationContent).toHaveAttribute('data-size', 'small');
    
    // Verify teleportation display shows current/total format with small size
    const teleportDisplay = canvasElement.querySelector('.flex.h-7.w-20');
    await expect(teleportDisplay).toBeInTheDocument();
    await expect(teleportDisplay).toHaveTextContent(/1\/10/);
    
    // Verify navigation buttons are present
    const firstButton = canvasElement.querySelector('[data-slot="pagination-first"]');
    const lastButton = canvasElement.querySelector('[data-slot="pagination-last"]');
    await expect(firstButton).toBeInTheDocument();
    await expect(lastButton).toBeInTheDocument();
    
    // Verify "Results per page" selector is present
    const resultsLabel = canvasElement.querySelector('span.text-muted-foreground');
    await expect(resultsLabel).toHaveTextContent('Results per page');
  },
};

/**
 * Pagination with ellipsis.
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
            5
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
    docs: {
      description: {
        story: "Pagination with ellipsis for many pages.",
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
    await expect(activeLink).toHaveTextContent("5");
    
    // Verify page numbers are present
    const pageLinks = canvasElement.querySelectorAll('[data-slot="pagination-link"]');
    await expect(pageLinks.length).toBeGreaterThan(0);
  },
};

/**
 * Controlled pagination.
 */
export const Controlled: Story = {
  render: function ControlledPagination() {
    const [currentPage, setCurrentPage] = useState(1);
    const totalPages = 10;

    const getPageNumbers = () => {
      const pages = [];
      const showEllipsis = totalPages > 7;

      if (!showEllipsis) {
        for (let i = 1; i <= totalPages; i++) {
          pages.push(i);
        }
      } else {
        if (currentPage <= 3) {
          pages.push(1, 2, 3, 4, "...", totalPages);
        } else if (currentPage >= totalPages - 2) {
          pages.push(1, "...", totalPages - 3, totalPages - 2, totalPages - 1, totalPages);
        } else {
          pages.push(1, "...", currentPage - 1, currentPage, currentPage + 1, "...", totalPages);
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
                {page === "..." ? (
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
        <p className="text-sm text-muted-foreground text-center">
          Page {currentPage} of {totalPages}
        </p>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: "Fully controlled pagination with state management.",
      },
    },
  },
  play: async ({ canvasElement }) => {
    const pagination = canvasElement.querySelector('[data-slot="pagination"]');
    await expect(pagination).toBeInTheDocument();
    
    // Verify active page (starts at page 1)
    const activeLink = canvasElement.querySelector('[data-active="true"]');
    await expect(activeLink).toHaveTextContent("1");
    
    // Verify page counter text is present
    const pageCounter = canvasElement.querySelector('p.text-muted-foreground');
    await expect(pageCounter).toHaveTextContent(/Page 1 of 10/);
    
    // Verify navigation buttons are present
    const prevButton = canvasElement.querySelector('[data-slot="pagination-previous"]');
    const nextButton = canvasElement.querySelector('[data-slot="pagination-next"]');
    await expect(prevButton).toBeInTheDocument();
    await expect(nextButton).toBeInTheDocument();
  },
};

/**
 * Simple pagination (prev/next only).
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
    docs: {
      description: {
        story: "Simple pagination with only previous and next buttons.",
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
 * First page state.
 */
export const FirstPage: Story = {
  render: () => (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious href="#" className="pointer-events-none opacity-50" />
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
    docs: {
      description: {
        story: "Pagination when on the first page (previous disabled).",
      },
    },
  },
  play: async ({ canvasElement }) => {
    const pagination = canvasElement.querySelector('[data-slot="pagination"]');
    await expect(pagination).toBeInTheDocument();
    
    // Verify active page is 1
    const activeLink = canvasElement.querySelector('[data-active="true"]');
    await expect(activeLink).toHaveTextContent("1");
    
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
 * Last page state.
 */
export const LastPage: Story = {
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
          <PaginationNext href="#" className="pointer-events-none opacity-50" />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  ),
  parameters: {
    docs: {
      description: {
        story: "Pagination when on the last page (next disabled).",
      },
    },
  },
  play: async ({ canvasElement }) => {
    const pagination = canvasElement.querySelector('[data-slot="pagination"]');
    await expect(pagination).toBeInTheDocument();
    
    // Verify active page is 10
    const activeLink = canvasElement.querySelector('[data-active="true"]');
    await expect(activeLink).toHaveTextContent("10");
    
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
 * Compact pagination.
 */
export const Compact: Story = {
  render: () => (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious href="#" />
        </PaginationItem>
        <PaginationItem>
          <span className="text-sm px-4">Page 3 of 10</span>
        </PaginationItem>
        <PaginationItem>
          <PaginationNext href="#" />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  ),
  parameters: {
    docs: {
      description: {
        story: "Compact pagination showing current position.",
      },
    },
  },
  play: async ({ canvasElement }) => {
    const pagination = canvasElement.querySelector('[data-slot="pagination"]');
    await expect(pagination).toBeInTheDocument();
    
    // Verify page counter text is present
    const pageText = canvasElement.querySelector('span.text-sm');
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
    const [resultsPerPage1, setResultsPerPage1] = useState("25");
    const [resultsPerPage2, setResultsPerPage2] = useState("25");
    const [resultsPerPage3, setResultsPerPage3] = useState("25");
    const [resultsPerPage4, setResultsPerPage4] = useState("25");
    const [teleportPage1, setTeleportPage1] = useState(1);
    const [teleportPage2, setTeleportPage2] = useState(1);

    return (
      <div className="space-y-8 p-4">
        {/* 1. Default size - Page navigation */}
        <div className="space-y-2">
          <h3 className="text-sm font-semibold text-muted-foreground">
            Teleportation=False, Size=Default
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
              <PaginationItem>
                <div className="flex items-center gap-2 pl-4">
                  <span className="text-sm text-muted-foreground">Results per page</span>
                  <Select value={resultsPerPage1} onValueChange={setResultsPerPage1}>
                    <SelectTrigger className="h-9 w-[73px]">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="10">10</SelectItem>
                      <SelectItem value="25">25</SelectItem>
                      <SelectItem value="50">50</SelectItem>
                      <SelectItem value="100">100</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>

        {/* 2. Small size - Page navigation */}
        <div className="space-y-2">
          <h3 className="text-sm font-semibold text-muted-foreground">
            Teleportation=False, Size=Small
          </h3>
          <Pagination>
            <PaginationContent size="small">
              <PaginationItem>
                <PaginationFirst href="#" size="small" />
              </PaginationItem>
              <PaginationItem>
                <PaginationPrevious href="#" size="small" />
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="#" size="small">
                  1
                </PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="#" size="small">
                  2
                </PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationEllipsis size="small" />
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="#" isActive size="small">
                  8
                </PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationNext href="#" size="small" />
              </PaginationItem>
              <PaginationItem>
                <PaginationLast href="#" size="small" />
              </PaginationItem>
              <PaginationItem>
                <div className="flex items-center gap-2 pl-4">
                  <span className="text-sm text-muted-foreground">Results per page</span>
                  <Select value={resultsPerPage2} onValueChange={setResultsPerPage2}>
                    <SelectTrigger className="h-7 w-[65px]">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="10">10</SelectItem>
                      <SelectItem value="25">25</SelectItem>
                      <SelectItem value="50">50</SelectItem>
                      <SelectItem value="100">100</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>

        {/* 3. Default size - Teleportation */}
        <div className="space-y-2">
          <h3 className="text-sm font-semibold text-muted-foreground">
            Teleportation=True, Size=Default
          </h3>
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationFirst
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    setTeleportPage1(1);
                  }}
                />
              </PaginationItem>
              <PaginationItem>
                <PaginationPrevious
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    if (teleportPage1 > 1) setTeleportPage1(teleportPage1 - 1);
                  }}
                />
              </PaginationItem>
              <PaginationItem>
                <div className="flex h-9 w-20 items-center justify-center rounded-md border border-input bg-background px-3 text-base font-normal">
                  {teleportPage1}/10
                </div>
              </PaginationItem>
              <PaginationItem>
                <PaginationNext
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    if (teleportPage1 < 10) setTeleportPage1(teleportPage1 + 1);
                  }}
                />
              </PaginationItem>
              <PaginationItem>
                <PaginationLast
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    setTeleportPage1(10);
                  }}
                />
              </PaginationItem>
              <PaginationItem>
                <div className="flex items-center gap-2 pl-4">
                  <span className="text-sm text-muted-foreground">Results per page</span>
                  <Select value={resultsPerPage3} onValueChange={setResultsPerPage3}>
                    <SelectTrigger className="h-9 w-[73px]">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="10">10</SelectItem>
                      <SelectItem value="25">25</SelectItem>
                      <SelectItem value="50">50</SelectItem>
                      <SelectItem value="100">100</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>

        {/* 4. Small size - Teleportation */}
        <div className="space-y-2">
          <h3 className="text-sm font-semibold text-muted-foreground">
            Teleportation=True, Size=Small
          </h3>
          <Pagination>
            <PaginationContent size="small">
              <PaginationItem>
                <PaginationFirst
                  href="#"
                  size="small"
                  onClick={(e) => {
                    e.preventDefault();
                    setTeleportPage2(1);
                  }}
                />
              </PaginationItem>
              <PaginationItem>
                <PaginationPrevious
                  href="#"
                  size="small"
                  onClick={(e) => {
                    e.preventDefault();
                    if (teleportPage2 > 1) setTeleportPage2(teleportPage2 - 1);
                  }}
                />
              </PaginationItem>
              <PaginationItem>
                <div className="flex h-7 w-20 items-center justify-center rounded border border-input bg-background px-3 text-sm font-normal">
                  {teleportPage2}/10
                </div>
              </PaginationItem>
              <PaginationItem>
                <PaginationNext
                  href="#"
                  size="small"
                  onClick={(e) => {
                    e.preventDefault();
                    if (teleportPage2 < 10) setTeleportPage2(teleportPage2 + 1);
                  }}
                />
              </PaginationItem>
              <PaginationItem>
                <PaginationLast
                  href="#"
                  size="small"
                  onClick={(e) => {
                    e.preventDefault();
                    setTeleportPage2(10);
                  }}
                />
              </PaginationItem>
              <PaginationItem>
                <div className="flex items-center gap-2 pl-4">
                  <span className="text-sm text-muted-foreground">Results per page</span>
                  <Select value={resultsPerPage4} onValueChange={setResultsPerPage4}>
                    <SelectTrigger className="h-7 w-[65px]">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="10">10</SelectItem>
                      <SelectItem value="25">25</SelectItem>
                      <SelectItem value="50">50</SelectItem>
                      <SelectItem value="100">100</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story:
          "Comprehensive visual overview showing all 4 variants from Figma: Default/Small sizes with regular and teleportation modes.",
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
    await expect(headings[0]).toHaveTextContent('Teleportation=False, Size=Default');
    await expect(headings[1]).toHaveTextContent('Teleportation=False, Size=Small');
    await expect(headings[2]).toHaveTextContent('Teleportation=True, Size=Default');
    await expect(headings[3]).toHaveTextContent('Teleportation=True, Size=Small');
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
    docs: {
      description: {
        story: "Interactive pagination example.",
      },
    },
  },
  play: async ({ canvasElement }) => {
    const pagination = canvasElement.querySelector('[data-slot="pagination"]');
    await expect(pagination).toBeInTheDocument();
    
    // Verify active page
    const activeLink = canvasElement.querySelector('[data-active="true"]');
    await expect(activeLink).toHaveTextContent("2");
    
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
