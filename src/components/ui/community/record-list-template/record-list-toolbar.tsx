import {
  Badge,
  Button,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  Search,
  SegmentedControl,
  SegmentedControlButton,
  SegmentedControlList,
  Toggle,
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@cognite/aura/components';
import {
  IconColumns3,
  IconDotsVertical,
  IconFilter,
  IconLayoutGrid,
  IconList,
  IconListTree,
  IconTag,
  IconX,
} from '@tabler/icons-react';
import { type ReactNode, useState } from 'react';

import {
  recordListFilters,
  recordListGroupings,
  type RecordListColumnChip,
  type RecordListView,
} from './record-list-template.data';

function isRecordListView(value: unknown): value is RecordListView {
  return value === 'table' || value === 'cards';
}

function ColumnChip({
  chip,
  onRemove,
}: {
  chip: RecordListColumnChip;
  onRemove: (id: string) => void;
}): ReactNode {
  return (
    <Tooltip>
      <TooltipTrigger render={<span className="inline-flex" />}>
        <Badge
          variant="closable"
          render={<button type="button" />}
          onClick={() => onRemove(chip.id)}
        >
          {chip.column}
          <IconX size={12} stroke={1.5} aria-hidden="true" />
        </Badge>
      </TooltipTrigger>
      <TooltipContent>{chip.values.join(', ')}</TooltipContent>
    </Tooltip>
  );
}

function ChipGroup({
  label,
  chips,
  onRemove,
}: {
  label: string;
  chips: RecordListColumnChip[];
  onRemove: (id: string) => void;
}): ReactNode {
  if (chips.length === 0) {
    return null;
  }

  return (
    <div className="flex flex-wrap items-center gap-2">
      <span className="text-sm">{label}</span>
      <ul aria-label={label} className="flex flex-wrap gap-2">
        {chips.map((chip) => (
          <li key={chip.id}>
            <ColumnChip chip={chip} onRemove={onRemove} />
          </li>
        ))}
      </ul>
    </div>
  );
}

function RecordListToolbar({
  view,
  onViewChange,
}: {
  view: RecordListView;
  onViewChange: (view: RecordListView) => void;
}): ReactNode {
  const [filters, setFilters] = useState<RecordListColumnChip[]>(() => [
    ...recordListFilters,
  ]);
  const [groupings, setGroupings] = useState<RecordListColumnChip[]>(() => [
    ...recordListGroupings,
  ]);
  const [filtersPressed, setFiltersPressed] = useState(true);
  const [groupPressed, setGroupPressed] = useState(true);

  function removeFilter(id: string) {
    const next = filters.filter((chip) => chip.id !== id);
    setFilters(next);
    if (next.length === 0) {
      setFiltersPressed(false);
    }
  }

  function removeGrouping(id: string) {
    setGroupings((current) => current.filter((chip) => chip.id !== id));
  }

  const showFilters = filtersPressed && filters.length > 0;
  const showGroupings = groupPressed && groupings.length > 0;

  return (
    <div data-slot="record-list-toolbar" className="flex flex-col gap-3">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex min-w-0 flex-1 flex-wrap items-center gap-2">
          <Search
            aria-label="Search assets"
            placeholder="Search assets"
            className="w-full max-w-sm"
          />
          <Toggle
            pressed={filtersPressed}
            onPressedChange={setFiltersPressed}
            icon={<IconFilter size={16} stroke={1.5} />}
            label="Filter"
            count={filters.length > 0 ? filters.length : undefined}
          />
          <Toggle
            icon={<IconTag size={16} stroke={1.5} />}
            label="Criticality"
          />
          <Toggle
            pressed={groupPressed}
            onPressedChange={setGroupPressed}
            icon={<IconListTree size={16} stroke={1.5} />}
            label="Group by"
            count={groupings.length > 0 ? groupings.length : undefined}
          />
          <Toggle
            icon={<IconColumns3 size={16} stroke={1.5} />}
            label="Manage columns"
          />
        </div>
        <div className="flex items-center gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger
              render={<Button variant="ghost" size="icon-sm" />}
              aria-label="More actions"
            >
              <IconDotsVertical size={16} stroke={1.5} />
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>Export CSV</DropdownMenuItem>
              <DropdownMenuItem>Download report</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <SegmentedControl
            value={view}
            onValueChange={(value) => {
              if (isRecordListView(value)) {
                onViewChange(value);
              }
            }}
          >
            <SegmentedControlList size="small">
              <SegmentedControlButton
                value="table"
                tabContent="icon-only"
                aria-label="Table"
              >
                <IconList size={16} stroke={1.5} />
              </SegmentedControlButton>
              <SegmentedControlButton
                value="cards"
                tabContent="icon-only"
                aria-label="Cards"
              >
                <IconLayoutGrid size={16} stroke={1.5} />
              </SegmentedControlButton>
            </SegmentedControlList>
          </SegmentedControl>
        </div>
      </div>
      {showFilters || showGroupings ? (
        <TooltipProvider>
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
            {showFilters ? (
              <ChipGroup
                label="Filtered by:"
                chips={filters}
                onRemove={removeFilter}
              />
            ) : null}
            {showGroupings ? (
              <ChipGroup
                label="Grouped by:"
                chips={groupings}
                onRemove={removeGrouping}
              />
            ) : null}
          </div>
        </TooltipProvider>
      ) : null}
    </div>
  );
}

RecordListToolbar.displayName = 'RecordListToolbar';

export { RecordListToolbar };
