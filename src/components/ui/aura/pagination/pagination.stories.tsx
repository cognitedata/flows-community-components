import { useState } from "react";

import type { Meta, StoryObj } from "@storybook/react";
import { expect } from "@storybook/test";

import {
  Select,
  SelectContent,
  SelectItem,
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
  PaginationSelectTrigger,
  PaginationStatus,
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
        category: "Variants / Styling",
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
    order: 1,
    docs: {
      description: {
        story:
          "Default pagination with page navigation, next and previous links.",
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
    order: 2,
    docs: {
      description: {
        story: "Small size variant for compact layouts.",
      },
    },
  },
  play: async ({ canvasElement }) => {
    const paginationContent = canvasElement.querySelector(
      '[data-slot="pagination-content"]',
    );
    await expect(paginationContent).toBeInTheDocument();

    // Verify small size attribute
    await expect(paginationContent).toHaveAttribute("data-size", "small");

    // Verify active page
    const activeLink = canvasElement.querySelector('[data-active="true"]');
    await expect(activeLink).toHaveTextContent("5");

    // Verify all navigation buttons are present
    const firstButton = canvasElement.querySelector(
      '[data-slot="pagination-first"]',
    );
    const lastButton = canvasElement.querySelector(
      '[data-slot="pagination-last"]',
    );
    await expect(firstButton).toBeInTheDocument();
    await expect(lastButton).toBeInTheDocument();
  },
};

type PaginationStorySize = "default" | "small";

/**
 * Pagination with results per page selector (Default size).
 */
export const WithResultsPerPage: Story = {
  render: function WithResultsPerPageStory() {
    const [resultsPerPage, setResultsPerPage] = useState("25");

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
              5
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
              <span className="text-sm text-muted-foreground">
                Results per page
              </span>
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
            </div>
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    );
  },
  parameters: {
    order: 3,
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
    const paginationContent = canvasElement.querySelector(
      '[data-slot="pagination-content"]',
    );
    await expect(paginationContent).toHaveAttribute("data-size", "default");

    // Verify "Results per page" label is present
    const resultsLabel = canvasElement.querySelector(
      "span.text-muted-foreground",
    );
    await expect(resultsLabel).toHaveTextContent("Results per page");

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
  render: function WithResultsPerPageSmallStory() {
    const [resultsPerPage, setResultsPerPage] = useState("25");

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
              5
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
              <span className="text-sm text-muted-foreground">
                Results per page
              </span>
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
            </div>
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    );
  },
  parameters: {
    order: 4,
    docs: {
      description: {
        story: "Pagination with results per page selector (small size).",
      },
    },
  },
  play: async ({ canvasElement }) => {
    const paginationContent = canvasElement.querySelector(
      '[data-slot="pagination-content"]',
    );
    await expect(paginationContent).toBeInTheDocument();

    // Verify small size attribute
    await expect(paginationContent).toHaveAttribute("data-size", "small");

    // Verify "Results per page" label is present
    const resultsLabel = canvasElement.querySelector(
      "span.text-muted-foreground",
    );
    await expect(resultsLabel).toHaveTextContent("Results per page");

    // Verify select trigger is present with small size
    const selectTrigger = canvasElement.querySelector('[role="combobox"]');
    await expect(selectTrigger).toBeInTheDocument();

    // Verify active page
    const activeLink = canvasElement.querySelector('[data-active="true"]');
    await expect(activeLink).toHaveTextContent("5");
  },
};

/**
 * Teleportation mode - jump to specific page (Default size).
 */
export const TeleportationMode: Story = {
  render: function TeleportationModeStory() {
    const [currentPage, setCurrentPage] = useState(1);
    const totalPages = 100;
    const [resultsPerPage, setResultsPerPage] = useState("25");
    const displayClassName = cn(
      "flex items-center justify-center gap-1 border border-input bg-background font-normal",
      "h-9 w-20 rounded-md text-base",
    );

    const updatePage = (nextPage: number) => {
      setCurrentPage(nextPage);
    };

    return (
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationFirst
              href="#"
              onClick={(e) => {
                e.preventDefault();
                updatePage(1);
              }}
            />
          </PaginationItem>
          <PaginationItem>
            <PaginationPrevious
              href="#"
              onClick={(e) => {
                e.preventDefault();
                if (currentPage > 1) updatePage(currentPage - 1);
              }}
            />
          </PaginationItem>
          <PaginationItem>
            <div
              className={displayClassName}
              data-slot="pagination-teleport-display"
            >
              <output className="tabular-nums">
                {currentPage}/{totalPages}
              </output>
            </div>
          </PaginationItem>
          <PaginationItem>
            <PaginationNext
              href="#"
              onClick={(e) => {
                e.preventDefault();
                if (currentPage < totalPages) updatePage(currentPage + 1);
              }}
            />
          </PaginationItem>
          <PaginationItem>
            <PaginationLast
              href="#"
              onClick={(e) => {
                e.preventDefault();
                updatePage(totalPages);
              }}
            />
          </PaginationItem>
          <PaginationItem>
            <div className="flex items-center gap-2 pl-4">
              <span className="text-sm text-muted-foreground">
                Results per page
              </span>
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
            </div>
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    );
  },
  parameters: {
    order: 5,
    docs: {
      description: {
        story:
          "Teleportation mode showing current page and total pages (default size).",
      },
    },
  },
  play: async ({ canvasElement }) => {
    const pagination = canvasElement.querySelector('[data-slot="pagination"]');
    await expect(pagination).toBeInTheDocument();

    // Verify default size
    const paginationContent = canvasElement.querySelector(
      '[data-slot="pagination-content"]',
    );
    await expect(paginationContent).toHaveAttribute("data-size", "default");

    // Verify teleportation display shows current/total format
    const teleportDisplay = canvasElement.querySelector(
      '[data-slot="pagination-teleport-display"]',
    );
    await expect(teleportDisplay).toBeInTheDocument();
    const teleportOutput = teleportDisplay?.querySelector("output");
    await expect(teleportOutput).toHaveTextContent("1/100");

    // Verify navigation buttons are present
    const firstButton = canvasElement.querySelector(
      '[data-slot="pagination-first"]',
    );
    const lastButton = canvasElement.querySelector(
      '[data-slot="pagination-last"]',
    );
    await expect(firstButton).toBeInTheDocument();
    await expect(lastButton).toBeInTheDocument();

    // Verify "Results per page" selector is present
    const resultsLabels = Array.from(
      canvasElement.querySelectorAll("span.text-muted-foreground"),
    );
    const resultsLabel = resultsLabels.find((label) =>
      label.textContent?.includes("Results per page"),
    );
    await expect(resultsLabel).toBeTruthy();
  },
};

/**
 * Teleportation mode - jump to specific page (Small size).
 */
export const TeleportationModeSmall: Story = {
  render: function TeleportationModeSmallStory() {
    const [currentPage, setCurrentPage] = useState(1);
    const totalPages = 10;
    const [resultsPerPage, setResultsPerPage] = useState("25");
    const displayClassName = cn(
      "flex items-center justify-center gap-1 border border-input bg-background font-normal",
      "h-7 w-20 rounded text-sm",
    );

    const updatePage = (nextPage: number) => {
      setCurrentPage(nextPage);
    };

    return (
      <Pagination>
        <PaginationContent size="small">
          <PaginationItem>
            <PaginationFirst
              href="#"
              onClick={(e) => {
                e.preventDefault();
                updatePage(1);
              }}
            />
          </PaginationItem>
          <PaginationItem>
            <PaginationPrevious
              href="#"
              onClick={(e) => {
                e.preventDefault();
                if (currentPage > 1) updatePage(currentPage - 1);
              }}
            />
          </PaginationItem>
          <PaginationItem>
            <div
              className={displayClassName}
              data-slot="pagination-teleport-display"
            >
              <output className="tabular-nums">
                {currentPage}/{totalPages}
              </output>
            </div>
          </PaginationItem>
          <PaginationItem>
            <PaginationNext
              href="#"
              onClick={(e) => {
                e.preventDefault();
                if (currentPage < totalPages) updatePage(currentPage + 1);
              }}
            />
          </PaginationItem>
          <PaginationItem>
            <PaginationLast
              href="#"
              onClick={(e) => {
                e.preventDefault();
                updatePage(totalPages);
              }}
            />
          </PaginationItem>
          <PaginationItem>
            <div className="flex items-center gap-2 pl-4">
              <span className="text-sm text-muted-foreground">
                Results per page
              </span>
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
            </div>
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    );
  },
  parameters: {
    order: 6,
    docs: {
      description: {
        story:
          "Teleportation mode showing current page and total pages (small size).",
      },
    },
  },
  play: async ({ canvasElement }) => {
    const paginationContent = canvasElement.querySelector(
      '[data-slot="pagination-content"]',
    );
    await expect(paginationContent).toBeInTheDocument();

    // Verify small size attribute
    await expect(paginationContent).toHaveAttribute("data-size", "small");

    // Verify teleportation display shows current/total format with small size
    const teleportDisplay = canvasElement.querySelector(
      '[data-slot="pagination-teleport-display"]',
    );
    await expect(teleportDisplay).toBeInTheDocument();
    const teleportOutput = teleportDisplay?.querySelector("output");
    await expect(teleportOutput).toHaveTextContent("1/25");

    // Verify navigation buttons are present
    const firstButton = canvasElement.querySelector(
      '[data-slot="pagination-first"]',
    );
    const lastButton = canvasElement.querySelector(
      '[data-slot="pagination-last"]',
    );
    await expect(firstButton).toBeInTheDocument();
    await expect(lastButton).toBeInTheDocument();

    // Verify "Results per page" selector is present
    const resultsLabels = Array.from(
      canvasElement.querySelectorAll("span.text-muted-foreground"),
    );
    const resultsLabel = resultsLabels.find((label) =>
      label.textContent?.includes("Results per page"),
    );
    await expect(resultsLabel).toBeTruthy();
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
    order: 7,
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
    const ellipsisElements = canvasElement.querySelectorAll(
      '[data-slot="pagination-ellipsis"]',
    );
    await expect(ellipsisElements.length).toBe(2);

    // Verify active page
    const activeLink = canvasElement.querySelector('[data-active="true"]');
    await expect(activeLink).toHaveTextContent("5");

    // Verify page numbers are present
    const pageLinks = canvasElement.querySelectorAll(
      '[data-slot="pagination-link"]',
    );
    await expect(pageLinks.length).toBeGreaterThan(0);
  },
};

/**
 * Controlled pagination.
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
          pages.push(1, 2, 3, 4, "...", totalPages);
        } else if (currentPage >= totalPages - 2) {
          pages.push(
            1,
            "...",
            totalPages - 3,
            totalPages - 2,
            totalPages - 1,
            totalPages,
          );
        } else {
          pages.push(
            1,
            "...",
            currentPage - 1,
            currentPage,
            currentPage + 1,
            "...",
            totalPages,
          );
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
    const pageCounter = canvasElement.querySelector("p.text-muted-foreground");
    await expect(pageCounter).toHaveTextContent(/Page 1 of 10/);

    // Verify navigation buttons are present
    const prevButton = canvasElement.querySelector(
      '[data-slot="pagination-previous"]',
    );
    const nextButton = canvasElement.querySelector(
      '[data-slot="pagination-next"]',
    );
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
    order: 9,
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
    const prevButton = canvasElement.querySelector(
      '[data-slot="pagination-previous"]',
    );
    const nextButton = canvasElement.querySelector(
      '[data-slot="pagination-next"]',
    );
    await expect(prevButton).toBeInTheDocument();
    await expect(nextButton).toBeInTheDocument();

    // Verify no page links present
    const pageLinks = canvasElement.querySelectorAll(
      '[data-slot="pagination-link"]',
    );
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
    const prevButton = canvasElement.querySelector(
      '[data-slot="pagination-previous"]',
    );
    await expect(prevButton).toHaveClass("opacity-50");
    await expect(prevButton).toHaveClass("pointer-events-none");

    // Verify next button is enabled
    const nextButton = canvasElement.querySelector(
      '[data-slot="pagination-next"]',
    );
    await expect(nextButton).toBeInTheDocument();
    await expect(nextButton).not.toHaveClass("opacity-50");
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
          <PaginationNext href="#" isDisabled />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  ),
  parameters: {
    order: 11,
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
    const nextButton = canvasElement.querySelector(
      '[data-slot="pagination-next"]',
    );
    await expect(nextButton).toHaveClass("opacity-50");
    await expect(nextButton).toHaveClass("pointer-events-none");

    // Verify previous button is enabled
    const prevButton = canvasElement.querySelector(
      '[data-slot="pagination-previous"]',
    );
    await expect(prevButton).toBeInTheDocument();
    await expect(prevButton).not.toHaveClass("opacity-50");
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
        story: "Compact pagination showing current position.",
      },
    },
  },
  play: async ({ canvasElement }) => {
    const pagination = canvasElement.querySelector('[data-slot="pagination"]');
    await expect(pagination).toBeInTheDocument();

    // Verify page counter text is present
    const pageText = canvasElement.querySelector(
      '[data-slot="pagination-status"]',
    );
    await expect(pageText).toHaveTextContent("Page 3 of 10");

    // Verify navigation buttons are present
    const prevButton = canvasElement.querySelector(
      '[data-slot="pagination-previous"]',
    );
    const nextButton = canvasElement.querySelector(
      '[data-slot="pagination-next"]',
    );
    await expect(prevButton).toBeInTheDocument();
    await expect(nextButton).toBeInTheDocument();

    // Verify no page links present
    const pageLinks = canvasElement.querySelectorAll(
      '[data-slot="pagination-link"]',
    );
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
                  <span className="text-sm text-muted-foreground">
                    Results per page
                  </span>
                  <Select
                    value={resultsPerPage1}
                    onValueChange={setResultsPerPage1}
                  >
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
                  <span className="text-sm text-muted-foreground">
                    Results per page
                  </span>
                  <Select
                    value={resultsPerPage2}
                    onValueChange={setResultsPerPage2}
                  >
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
                    updateTeleportPage1(1);
                  }}
                />
              </PaginationItem>
              <PaginationItem>
                <PaginationPrevious
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    if (teleportPage1 > 1)
                      updateTeleportPage1(teleportPage1 - 1);
                  }}
                />
              </PaginationItem>
              <PaginationItem>
                <div className="flex h-9 w-20 items-center justify-center rounded-md border border-input bg-background text-base font-normal">
                  <output className="tabular-nums">
                    {teleportPage1}/{totalPages}
                  </output>
                </div>
              </PaginationItem>
              <PaginationItem>
                <PaginationNext
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    if (teleportPage1 < totalPages)
                      updateTeleportPage1(teleportPage1 + 1);
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
              <PaginationItem>
                <div className="flex items-center gap-2 pl-4">
                  <span className="text-sm text-muted-foreground">
                    Results per page
                  </span>
                  <Select
                    value={resultsPerPage3}
                    onValueChange={setResultsPerPage3}
                  >
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
                    if (teleportPage2 > 1)
                      updateTeleportPage2(teleportPage2 - 1);
                  }}
                />
              </PaginationItem>
              <PaginationItem>
                <div className="flex h-7 w-20 items-center justify-center rounded border border-input bg-background text-sm font-normal">
                  <output className="tabular-nums">
                    {teleportPage2}/{totalPages}
                  </output>
                </div>
              </PaginationItem>
              <PaginationItem>
                <PaginationNext
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    if (teleportPage2 < totalPages)
                      updateTeleportPage2(teleportPage2 + 1);
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
              <PaginationItem>
                <div className="flex items-center gap-2 pl-4">
                  <span className="text-sm text-muted-foreground">
                    Results per page
                  </span>
                  <Select
                    value={resultsPerPage4}
                    onValueChange={setResultsPerPage4}
                  >
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
                </div>
              </PaginationItem>
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
    const paginationContents = canvasElement.querySelectorAll(
      '[data-slot="pagination-content"]',
    );
    await expect(paginationContents.length).toBe(4);

    // Verify size attributes
    await expect(paginationContents[0]).toHaveAttribute("data-size", "default");
    await expect(paginationContents[1]).toHaveAttribute("data-size", "small");
    await expect(paginationContents[2]).toHaveAttribute("data-size", "default");
    await expect(paginationContents[3]).toHaveAttribute("data-size", "small");

    // Verify headings are present
    const headings = canvasElement.querySelectorAll("h3");
    await expect(headings.length).toBe(4);
    await expect(headings[0]).toHaveTextContent(
      "Teleportation=False, Size=Default",
    );
    await expect(headings[1]).toHaveTextContent(
      "Teleportation=False, Size=Small",
    );
    await expect(headings[2]).toHaveTextContent(
      "Teleportation=True, Size=Default",
    );
    await expect(headings[3]).toHaveTextContent(
      "Teleportation=True, Size=Small",
    );
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
    const prevButton = canvasElement.querySelector(
      '[data-slot="pagination-previous"]',
    );
    const nextButton = canvasElement.querySelector(
      '[data-slot="pagination-next"]',
    );
    await expect(prevButton).toBeInTheDocument();
    await expect(nextButton).toBeInTheDocument();

    // Verify page numbers and ellipsis
    const pageLinks = canvasElement.querySelectorAll(
      '[data-slot="pagination-link"]',
    );
    const ellipsis = canvasElement.querySelector(
      '[data-slot="pagination-ellipsis"]',
    );
    await expect(pageLinks.length).toBeGreaterThan(0);
    await expect(ellipsis).toBeInTheDocument();
  },
};
