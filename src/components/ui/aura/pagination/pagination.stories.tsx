import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { expect, userEvent, waitFor, within } from 'storybook/test';

import { Select, SelectContent, SelectItem, SelectValue } from '../select';

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

const meta: Meta<typeof Pagination> = {
  title: 'Primitives/Pagination',
  component: Pagination,
  tags: ['autodocs'],
  argTypes: {
    className: {
      control: 'text',
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
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(
      canvas.getByRole('navigation', { name: /pagination/i })
    ).toBeInTheDocument();
    await expect(canvas.getByRole('button', { name: '8' })).toHaveAttribute(
      'aria-current',
      'page'
    );
  },
};
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
  },
};
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
            <PaginationResultsPerPageLabel>
              Results per page
            </PaginationResultsPerPageLabel>
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
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByText('Results per page')).toBeInTheDocument();
    await expect(canvas.getByRole('combobox')).toBeInTheDocument();
  },
};
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
            <PaginationResultsPerPageLabel>
              Results per page
            </PaginationResultsPerPageLabel>
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
  },
};
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
            <PaginationResultsPerPageLabel>
              Results per page
            </PaginationResultsPerPageLabel>
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
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const teleportInput = canvas.getByRole('textbox', {
      name: /current page, page 1 of 100/i,
    });
    await userEvent.click(teleportInput);
    await userEvent.keyboard('12{Enter}');
    await waitFor(() => {
      expect(teleportInput).toHaveValue('12/100');
    });
  },
};
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
            <PaginationResultsPerPageLabel>
              Results per page
            </PaginationResultsPerPageLabel>
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
  },
};
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
  },
};
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
          pages.push(
            1,
            '...',
            totalPages - 3,
            totalPages - 2,
            totalPages - 1,
            totalPages
          );
        } else {
          pages.push(
            1,
            '...',
            currentPage - 1,
            currentPage,
            currentPage + 1,
            '...',
            totalPages
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
                {page === '...' ? (
                  <PaginationEllipsis />
                ) : (
                  <PaginationLink
                    href="#"
                    isActive={page === currentPage}
                    onClick={(e) => {
                      e.preventDefault();
                      if (typeof page === 'number') {
                        setCurrentPage(page);
                      }
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
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByText('Page 1 of 100')).toBeInTheDocument();
    await userEvent.click(
      canvas.getByRole('button', { name: /go to next page/i })
    );
    await waitFor(() => {
      expect(canvas.getByText('Page 2 of 100')).toBeInTheDocument();
    });
  },
};
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
  },
};
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
  },
};
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
  },
};
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
  },
};
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
                <PaginationResultsPerPageLabel>
                  Results per page
                </PaginationResultsPerPageLabel>
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
              </PaginationResultsPerPage>
            </PaginationContent>
          </Pagination>
        </div>

        <div className="space-y-2">
          <h3 className="text-sm font-semibold text-muted-foreground">
            Counter=False, Size=Small
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
              <PaginationResultsPerPage>
                <PaginationResultsPerPageLabel>
                  Results per page
                </PaginationResultsPerPageLabel>
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
              </PaginationResultsPerPage>
            </PaginationContent>
          </Pagination>
        </div>

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
                    if (teleportPage1 > 1)
                      updateTeleportPage1(teleportPage1 - 1);
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
              <PaginationResultsPerPage>
                <PaginationResultsPerPageLabel>
                  Results per page
                </PaginationResultsPerPageLabel>
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
              </PaginationResultsPerPage>
            </PaginationContent>
          </Pagination>
        </div>

        <div className="space-y-2">
          <h3 className="text-sm font-semibold text-muted-foreground">
            Counter=True, Size=Small
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
              <PaginationResultsPerPage>
                <PaginationResultsPerPageLabel>
                  Results per page
                </PaginationResultsPerPageLabel>
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
              </PaginationResultsPerPage>
            </PaginationContent>
          </Pagination>
        </div>
      </div>
    );
  },
  parameters: {
    order: 13,
    chromatic: {
      disableSnapshot: false,
    },
  },
};
export const EdgeCaseLargePageCount: Story = {
  render: function EdgeCaseLargePageCountStory() {
    const [currentPage, setCurrentPage] = useState(1);
    const totalPages = 5000;
    const [resultsPerPage, setResultsPerPage] = useState('25');
    return (
      <div className="space-y-8">
        <div className="space-y-2">
          <h3 className="text-sm font-semibold text-muted-foreground">
            Default Size (5000 pages)
          </h3>
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
                    if (currentPage < totalPages)
                      setCurrentPage(currentPage + 1);
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
                <PaginationResultsPerPageLabel>
                  Results per page
                </PaginationResultsPerPageLabel>
                <Select
                  value={resultsPerPage}
                  onValueChange={setResultsPerPage}
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
              </PaginationResultsPerPage>
            </PaginationContent>
          </Pagination>
        </div>

        <div className="space-y-2">
          <h3 className="text-sm font-semibold text-muted-foreground">
            Small Size (5000 pages)
          </h3>
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
                    if (currentPage < totalPages)
                      setCurrentPage(currentPage + 1);
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
                <PaginationResultsPerPageLabel>
                  Results per page
                </PaginationResultsPerPageLabel>
                <Select
                  value={resultsPerPage}
                  onValueChange={setResultsPerPage}
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
              </PaginationResultsPerPage>
            </PaginationContent>
          </Pagination>
        </div>
      </div>
    );
  },
  parameters: {
    order: 14,
  },
};
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
  },
};
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
            <PaginationResultsPerPageLabel>
              Results per page
            </PaginationResultsPerPageLabel>
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
  },
};
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
  },
};
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
  },
};
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
  },
};
