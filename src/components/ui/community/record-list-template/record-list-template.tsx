import {
  ActionToolbar,
  ActionToolbarActionClear,
  ActionToolbarActions,
  ActionToolbarPrimaryAction,
  ActionToolbarSelection,
  ActionToolbarSelectionSummary,
  Button,
  Separator,
  Tabs,
  TabsList,
  TabsTrigger,
} from '@cognite/aura/components';
import { IconBuildingFactory, IconPlus } from '@tabler/icons-react';
import { type ReactNode, useState } from 'react';

import { RecordListCards } from './record-list-cards';
import { RecordListLeftPanel } from './record-list-left-panel';
import { RecordListPagination } from './record-list-pagination';
import { RecordListPreview } from './record-list-preview';
import { RecordListTable } from './record-list-table';
import {
  recordListPageDescription,
  recordListPageTitle,
  recordListPrimaryAction,
  recordListSecondaryAction,
  recordListBulkAction,
  recordListTabs,
  defaultRecordListGroupId,
  rowsForGroup,
  type RecordListLayout,
  type RecordListSampleRow,
  type RecordListView,
} from './record-list-template.data';
import { RecordListToolbar } from './record-list-toolbar';

function layoutBody(layout: RecordListLayout): 'full' | 'left' | 'right' {
  if (layout.startsWith('left-panel')) {
    return 'left';
  }
  if (layout.startsWith('right-panel')) {
    return 'right';
  }
  return 'full';
}

function PageActions(): ReactNode {
  return (
    <div className="flex shrink-0 items-center gap-2">
      <Button variant="secondary">{recordListSecondaryAction}</Button>
      <Button>
        <IconPlus size={16} stroke={1.5} />
        {recordListPrimaryAction}
      </Button>
    </div>
  );
}

function RecordListTemplate({
  layout,
}: {
  layout: RecordListLayout;
}): ReactNode {
  const body = layoutBody(layout);
  const usesTabs = layout.endsWith('tabs');
  const [tab, setTab] = useState<(typeof recordListTabs)[number]>(
    recordListTabs[0]
  );
  const [view, setView] = useState<RecordListView>('table');
  const [groupId, setGroupId] = useState(defaultRecordListGroupId);
  const [selectedIds, setSelectedIds] = useState<ReadonlySet<string>>(
    () => new Set()
  );
  const [selectedRowId, setSelectedRowId] = useState<string | null>(() =>
    layout.startsWith('right-panel')
      ? (rowsForGroup(defaultRecordListGroupId)[0]?.id ?? null)
      : null
  );

  const rows = rowsForGroup(
    body === 'left' ? groupId : defaultRecordListGroupId
  );
  const selectedRow = rows.find((row) => row.id === selectedRowId) ?? null;
  const showPreview = body === 'right' && selectedRow !== null;

  function toggleRow(id: string, checked: boolean) {
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

  function toggleAll(checked: boolean) {
    setSelectedIds((current) => {
      const next = new Set(current);
      for (const row of rows) {
        if (checked) {
          next.add(row.id);
        } else {
          next.delete(row.id);
        }
      }
      return next;
    });
  }

  function selectRow(row: RecordListSampleRow) {
    setSelectedRowId((current) => (current === row.id ? null : row.id));
  }

  return (
    <div
      id="record-list"
      data-slot="record-list-template"
      className="relative flex h-[52rem] w-full min-w-0 flex-col overflow-hidden rounded-xl border bg-background"
    >
      <div className="flex min-h-0 flex-1">
        {body === 'left' ? (
          <RecordListLeftPanel
            selectedGroupId={groupId}
            onSelectGroup={setGroupId}
          />
        ) : null}
        <div className="flex min-h-0 min-w-0 flex-1 flex-col gap-4 p-6">
          {usesTabs ? (
            <div className="flex flex-wrap items-center justify-between gap-3">
              <Tabs
                value={tab}
                onValueChange={(value) => {
                  const next = recordListTabs.find((item) => item === value);
                  if (next) {
                    setTab(next);
                  }
                }}
              >
                <TabsList>
                  {recordListTabs.map((item) => (
                    <TabsTrigger key={item} value={item}>
                      {item}
                    </TabsTrigger>
                  ))}
                </TabsList>
              </Tabs>
            </div>
          ) : (
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="flex min-w-0 items-center gap-3">
                <span className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-muted-background text-muted-foreground">
                  <IconBuildingFactory size={18} stroke={1.5} />
                </span>
                <div className="min-w-0">
                  <h2 className="text-base font-medium leading-5">
                    {recordListPageTitle}
                  </h2>
                  <p className="text-sm text-muted-foreground">
                    {recordListPageDescription}
                  </p>
                </div>
              </div>
              <PageActions />
            </div>
          )}
          <Separator />
          <RecordListToolbar view={view} onViewChange={setView} />
          <div className="flex min-h-0 min-w-0 flex-1 flex-col gap-3">
            {view === 'cards' ? (
              <RecordListCards rows={rows} />
            ) : (
              <RecordListTable
                rows={rows}
                selectedIds={selectedIds}
                selectedRowId={selectedRow?.id ?? null}
                showCheckboxes={body !== 'right'}
                onToggleRow={toggleRow}
                onToggleAll={toggleAll}
                onRowClick={body === 'right' ? selectRow : undefined}
                onClearSelection={
                  body === 'right' ? () => setSelectedRowId(null) : undefined
                }
              />
            )}
            <RecordListPagination />
          </div>
        </div>
        {showPreview ? <RecordListPreview row={selectedRow} /> : null}
      </div>
      {body === 'right' ? null : (
        <div className="pointer-events-none absolute inset-x-0 bottom-10 z-10 flex justify-center overflow-hidden">
          <ActionToolbar
            selectedCount={selectedIds.size}
            className="pointer-events-auto"
          >
            <ActionToolbarSelection>
              <ActionToolbarSelectionSummary />
              <ActionToolbarActionClear
                onClick={() => {
                  setSelectedIds(new Set());
                }}
              />
            </ActionToolbarSelection>
            <ActionToolbarActions>
              <ActionToolbarPrimaryAction>
                {recordListBulkAction}
              </ActionToolbarPrimaryAction>
            </ActionToolbarActions>
          </ActionToolbar>
        </div>
      )}
    </div>
  );
}

RecordListTemplate.displayName = 'RecordListTemplate';

export { RecordListTemplate };
