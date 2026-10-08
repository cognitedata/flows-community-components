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
  Select,
  SelectContent,
  SelectItem,
  SelectValue,
} from '@cognite/aura/components';
import type { MouseEvent, ReactNode } from 'react';

function keepPage(event: MouseEvent<HTMLAnchorElement>) {
  event.preventDefault();
}

function RecordListPagination(): ReactNode {
  return (
    <div
      data-slot="record-list-pagination"
      className="mt-auto flex w-full shrink-0 items-center justify-between gap-3"
    >
      <Pagination aria-label="Pagination" className="mx-0 w-auto justify-start">
        <PaginationContent>
          <PaginationItem>
            <PaginationFirst href="#record-list" onClick={keepPage} />
          </PaginationItem>
          <PaginationItem>
            <PaginationPrevious href="#record-list" onClick={keepPage} />
          </PaginationItem>
          <PaginationItem>
            <PaginationLink href="#record-list" onClick={keepPage}>
              1
            </PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationLink href="#record-list" isActive onClick={keepPage}>
              2
            </PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>
          <PaginationItem>
            <PaginationLink href="#record-list" onClick={keepPage}>
              8
            </PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationNext href="#record-list" onClick={keepPage} />
          </PaginationItem>
          <PaginationItem>
            <PaginationLast href="#record-list" onClick={keepPage} />
          </PaginationItem>
          <PaginationResultsPerPage>
            <PaginationResultsPerPageLabel>
              Results per page
            </PaginationResultsPerPageLabel>
            <Select value="100" onValueChange={() => undefined}>
              <PaginationSelectTrigger size="sm" aria-label="Results per page">
                <SelectValue />
              </PaginationSelectTrigger>
              <SelectContent>
                <SelectItem value="10">10</SelectItem>
                <SelectItem value="50">50</SelectItem>
                <SelectItem value="100">100</SelectItem>
              </SelectContent>
            </Select>
          </PaginationResultsPerPage>
        </PaginationContent>
      </Pagination>
      <PaginationStatus className="shrink-0 whitespace-nowrap">
        Showing 10 of 128 assets
      </PaginationStatus>
    </div>
  );
}

RecordListPagination.displayName = 'RecordListPagination';

export { RecordListPagination };
