import {
  Badge,
  Button,
  CheckboxItem,
  CheckboxItemControl,
  Search,
} from '@cognite/aura/components';
import { cn } from '@cognite/aura/utils';
import { IconFilter, IconPlus } from '@tabler/icons-react';
import type { ReactNode } from 'react';

import { DashboardKpiCards } from './dashboard-layout-cards';
import {
  dashboardPrimaryAction,
  dashboardStatusVariant,
  dashboardWorkOrders,
  type DashboardWorkOrder,
} from './dashboard-layouts.data';

function DashboardLayoutGrid({
  showCheckboxes,
  showPrimary,
  selectedId,
  checkedIds,
  onSelectRow,
  onToggleRow,
  onToggleAll,
}: {
  showCheckboxes: boolean;
  showPrimary: boolean;
  selectedId: string | null;
  checkedIds: ReadonlySet<string>;
  onSelectRow: (id: string) => void;
  onToggleRow: (id: string, checked: boolean) => void;
  onToggleAll: (checked: boolean) => void;
}): ReactNode {
  const allChecked = dashboardWorkOrders.every((row) => checkedIds.has(row.id));

  return (
    <div className="flex min-w-0 flex-col gap-4">
      <DashboardKpiCards />
      <div className="flex flex-wrap items-center gap-2">
        <Search placeholder="Search work orders" className="w-56" />
        <Button variant="secondary">
          <IconFilter size={16} stroke={1.5} />
          Filters
        </Button>
        {showPrimary ? (
          <Button className="ml-auto">
            <IconPlus size={16} stroke={1.5} />
            {dashboardPrimaryAction}
          </Button>
        ) : null}
      </div>
      <div className="min-w-0 overflow-auto rounded-lg border">
        <table aria-label="Work orders" className="w-full text-sm">
          <thead className="bg-muted-background text-left text-muted-foreground">
            <tr>
              {showCheckboxes ? (
                <th className="w-10 px-3 py-2">
                  <CheckboxItem>
                    <CheckboxItemControl
                      checked={allChecked}
                      aria-label="Select all work orders"
                      onCheckedChange={(checked) =>
                        onToggleAll(checked === true)
                      }
                    />
                  </CheckboxItem>
                </th>
              ) : null}
              <th className="px-3 py-2 font-medium">Work order</th>
              <th className="px-3 py-2 font-medium">Area</th>
              <th className="px-3 py-2 font-medium">Priority</th>
              <th className="px-3 py-2 font-medium">Status</th>
              <th className="px-3 py-2 font-medium">Owner</th>
              <th className="px-3 py-2 font-medium">Due</th>
            </tr>
          </thead>
          <tbody>
            {dashboardWorkOrders.map((row) => (
              <WorkOrderRow
                key={row.id}
                row={row}
                showCheckboxes={showCheckboxes}
                selected={selectedId === row.id}
                checked={checkedIds.has(row.id)}
                onSelect={() => onSelectRow(row.id)}
                onToggle={(checked) => onToggleRow(row.id, checked)}
              />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function WorkOrderRow({
  row,
  showCheckboxes,
  selected,
  checked,
  onSelect,
  onToggle,
}: {
  row: DashboardWorkOrder;
  showCheckboxes: boolean;
  selected: boolean;
  checked: boolean;
  onSelect: () => void;
  onToggle: (checked: boolean) => void;
}): ReactNode {
  return (
    <tr
      className={cn(
        'border-t',
        (selected || checked) && 'bg-accent-background',
        !showCheckboxes && 'cursor-pointer'
      )}
      onClick={showCheckboxes ? undefined : onSelect}
    >
      {showCheckboxes ? (
        <td className="px-3 py-2">
          <CheckboxItem>
            <CheckboxItemControl
              checked={checked}
              aria-label={`Select ${row.name}`}
              onCheckedChange={(value) => onToggle(value === true)}
            />
          </CheckboxItem>
        </td>
      ) : null}
      <td className="px-3 py-2">{row.name}</td>
      <td className="px-3 py-2">{row.area}</td>
      <td className="px-3 py-2">{row.priority}</td>
      <td className="px-3 py-2">
        <Badge variant={dashboardStatusVariant[row.status]} outline>
          {row.status}
        </Badge>
      </td>
      <td className="px-3 py-2">{row.owner}</td>
      <td className="px-3 py-2">{row.due}</td>
    </tr>
  );
}

DashboardLayoutGrid.displayName = 'DashboardLayoutGrid';

export { DashboardLayoutGrid };
