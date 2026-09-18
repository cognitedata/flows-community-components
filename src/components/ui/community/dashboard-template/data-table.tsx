import {
  Badge,
  Button,
  CheckboxItem,
  CheckboxItemControl,
  CheckboxItemLabel,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  EmptyState,
  EmptyStateDescription,
  EmptyStateTitle,
  Input,
  Label,
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
  PaginationStatus,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Tabs,
  TabsList,
  TabsPanel,
  TabsTrigger,
  toast,
} from '@cognite/aura/components';
import {
  IconCircleCheck,
  IconDotsVertical,
  IconLoader,
  IconPlus,
} from '@tabler/icons-react';
import { type FormEvent, type ReactNode, useMemo, useState } from 'react';

import { type DocumentRow } from './dashboard-template.data';

const PAGE_SIZE = 10;
const REVIEWERS = ['Eddie Lake', 'Jamik Tashpulatov', 'Emily Whalen'];

function saveRowValue(header: string): void {
  toast.promise(new Promise((resolve) => setTimeout(resolve, 800)), {
    loading: `Saving ${header}`,
    success: 'Done',
    error: 'Error',
  });
}

function DocumentTable({ data }: { data: DocumentRow[] }): ReactNode {
  const [pageIndex, setPageIndex] = useState(0);
  const [selectedIds, setSelectedIds] = useState<ReadonlySet<number>>(
    () => new Set()
  );

  const pageCount = Math.max(1, Math.ceil(data.length / PAGE_SIZE));
  const pageRows = useMemo(
    () => data.slice(pageIndex * PAGE_SIZE, pageIndex * PAGE_SIZE + PAGE_SIZE),
    [data, pageIndex]
  );
  const pageSelectedCount = pageRows.filter((row) =>
    selectedIds.has(row.id)
  ).length;
  const allPageSelected =
    pageRows.length > 0 && pageSelectedCount === pageRows.length;
  const somePageSelected = pageSelectedCount > 0 && !allPageSelected;

  function toggleAllPageRows(checked: boolean) {
    setSelectedIds((current) => {
      const next = new Set(current);
      for (const row of pageRows) {
        if (checked) {
          next.add(row.id);
        } else {
          next.delete(row.id);
        }
      }
      return next;
    });
  }

  function toggleRow(id: number, checked: boolean) {
    setSelectedIds((current) => {
      const next = new Set(current);
      if (checked) {
        next.add(id);
      } else {
        next.delete(id);
      }
      return next;
    });
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="overflow-x-auto rounded-xl border">
        <table className="w-full min-w-250 text-sm">
          <caption className="sr-only">Document outline</caption>
          <thead className="bg-muted-bg text-left text-muted-fg">
            <tr className="border-b">
              <th className="w-10 px-3 py-2 font-medium">
                <CheckboxItem>
                  <CheckboxItemControl
                    checked={allPageSelected}
                    indeterminate={somePageSelected}
                    onCheckedChange={(checked) =>
                      toggleAllPageRows(checked === true)
                    }
                  />
                  <CheckboxItemLabel className="sr-only">
                    Select all
                  </CheckboxItemLabel>
                </CheckboxItem>
              </th>
              <th className="px-3 py-2 font-medium">Header</th>
              <th className="px-3 py-2 font-medium">Section Type</th>
              <th className="px-3 py-2 font-medium">Status</th>
              <th className="px-3 py-2 text-right font-medium">Target</th>
              <th className="px-3 py-2 text-right font-medium">Limit</th>
              <th className="px-3 py-2 font-medium">Reviewer</th>
              <th className="w-10 px-3 py-2">
                <span className="sr-only">Actions</span>
              </th>
            </tr>
          </thead>
          <tbody>
            {pageRows.map((row) => {
              const isAssigned = row.reviewer !== 'Assign reviewer';
              return (
                <tr key={row.id} className="border-b last:border-b-0">
                  <td className="px-3 py-2">
                    <CheckboxItem>
                      <CheckboxItemControl
                        checked={selectedIds.has(row.id)}
                        onCheckedChange={(checked) =>
                          toggleRow(row.id, checked === true)
                        }
                      />
                      <CheckboxItemLabel className="sr-only">
                        Select {row.header}
                      </CheckboxItemLabel>
                    </CheckboxItem>
                  </td>
                  <td className="px-3 py-2 font-medium">{row.header}</td>
                  <td className="px-3 py-2">
                    <Badge variant="gray" outline>
                      {row.type}
                    </Badge>
                  </td>
                  <td className="px-3 py-2">
                    <Badge
                      variant={row.status === 'Done' ? 'success' : 'inProgress'}
                      outline
                    >
                      {row.status === 'Done' ? (
                        <IconCircleCheck size={14} stroke={1.5} />
                      ) : (
                        <IconLoader size={14} stroke={1.5} />
                      )}
                      {row.status}
                    </Badge>
                  </td>
                  <td className="px-3 py-2">
                    <form
                      className="flex justify-end"
                      onSubmit={(event: FormEvent<HTMLFormElement>) => {
                        event.preventDefault();
                        saveRowValue(row.header);
                      }}
                    >
                      <Label htmlFor={`${row.id}-target`} className="sr-only">
                        Target
                      </Label>
                      <Input
                        id={`${row.id}-target`}
                        defaultValue={row.target}
                        className="h-8 w-16 text-right"
                      />
                    </form>
                  </td>
                  <td className="px-3 py-2">
                    <form
                      className="flex justify-end"
                      onSubmit={(event: FormEvent<HTMLFormElement>) => {
                        event.preventDefault();
                        saveRowValue(row.header);
                      }}
                    >
                      <Label htmlFor={`${row.id}-limit`} className="sr-only">
                        Limit
                      </Label>
                      <Input
                        id={`${row.id}-limit`}
                        defaultValue={row.limit}
                        className="h-8 w-16 text-right"
                      />
                    </form>
                  </td>
                  <td className="px-3 py-2">
                    {isAssigned ? (
                      row.reviewer
                    ) : (
                      <>
                        <Label
                          htmlFor={`${row.id}-reviewer`}
                          className="sr-only"
                        >
                          Reviewer
                        </Label>
                        <Select>
                          <SelectTrigger
                            id={`${row.id}-reviewer`}
                            size="sm"
                            className="w-48"
                          >
                            <SelectValue placeholder="Assign reviewer" />
                          </SelectTrigger>
                          <SelectContent>
                            {REVIEWERS.map((reviewer) => (
                              <SelectItem key={reviewer} value={reviewer}>
                                {reviewer}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </>
                    )}
                  </td>
                  <td className="px-3 py-2">
                    <DropdownMenu>
                      <DropdownMenuTrigger
                        render={<Button variant="ghost" size="icon-sm" />}
                      >
                        <IconDotsVertical size={16} stroke={1.5} />
                        <span className="sr-only">Open menu</span>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>Edit</DropdownMenuItem>
                        <DropdownMenuItem>Make a copy</DropdownMenuItem>
                        <DropdownMenuItem>Favorite</DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem variant="destructive">
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <div className="flex flex-col gap-3 @2xl/main:flex-row @2xl/main:items-center @2xl/main:justify-between">
        <p className="text-sm text-muted-fg">
          {selectedIds.size} of {data.length} row(s) selected.
        </p>
        <Pagination>
          <PaginationStatus>
            Page {pageIndex + 1} of {pageCount}
          </PaginationStatus>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                href="#dashboard-documents"
                isDisabled={pageIndex === 0}
                onClick={(event) => {
                  event.preventDefault();
                  setPageIndex((current) => Math.max(0, current - 1));
                }}
              />
            </PaginationItem>
            <PaginationItem>
              <PaginationNext
                href="#dashboard-documents"
                isDisabled={pageIndex >= pageCount - 1}
                onClick={(event) => {
                  event.preventDefault();
                  setPageIndex((current) =>
                    Math.min(pageCount - 1, current + 1)
                  );
                }}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </div>
  );
}

export function DataTable({ data }: { data: DocumentRow[] }): ReactNode {
  return (
    <Tabs defaultValue="outline" className="flex w-full flex-col gap-4">
      <div className="flex flex-col gap-3 @2xl/main:flex-row @2xl/main:items-center @2xl/main:justify-between">
        <TabsList className="max-w-full justify-start overflow-x-auto">
          <TabsTrigger value="outline">Outline</TabsTrigger>
          <TabsTrigger value="past-performance" badge="3">
            Past Performance
          </TabsTrigger>
          <TabsTrigger value="key-personnel" badge="2">
            Key Personnel
          </TabsTrigger>
          <TabsTrigger value="focus-documents">Focus Documents</TabsTrigger>
        </TabsList>
        <Button size="sm">
          <IconPlus size={16} stroke={1.5} />
          Add Section
        </Button>
      </div>
      <TabsPanel value="outline" id="dashboard-documents">
        <DocumentTable data={data} />
      </TabsPanel>
      <TabsPanel value="past-performance">
        <EmptyState type="no-results">
          <EmptyStateTitle>Past performance</EmptyStateTitle>
          <EmptyStateDescription>
            This tab is a placeholder. Use it for historical metrics once data
            is connected.
          </EmptyStateDescription>
        </EmptyState>
      </TabsPanel>
      <TabsPanel value="key-personnel">
        <EmptyState type="no-results">
          <EmptyStateTitle>Key personnel</EmptyStateTitle>
          <EmptyStateDescription>
            This tab is a placeholder. Use it for people assigned to the
            document.
          </EmptyStateDescription>
        </EmptyState>
      </TabsPanel>
      <TabsPanel value="focus-documents">
        <EmptyState type="no-results">
          <EmptyStateTitle>Focus documents</EmptyStateTitle>
          <EmptyStateDescription>
            This tab is a placeholder. Use it for documents that need attention.
          </EmptyStateDescription>
        </EmptyState>
      </TabsPanel>
    </Tabs>
  );
}
