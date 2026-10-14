import {
  Button,
  Item,
  ItemGroup,
  ItemSectionHeader,
  ItemSectionHeaderTitle,
  ItemTitle,
  Search,
} from '@cognite/aura/components';
import { IconFilter } from '@tabler/icons-react';
import type { ReactNode } from 'react';

import { dashboardPanelGroups } from './dashboard-layouts.data';

function DashboardLayoutPanel({
  scope,
  onScopeChange,
}: {
  scope: string;
  onScopeChange: (scope: string) => void;
}): ReactNode {
  return (
    <aside
      aria-label="Dashboard navigation"
      className="flex w-[240px] shrink-0 flex-col gap-3 border-r bg-background p-3"
    >
      <div className="flex items-center gap-2">
        <Search placeholder="Search" className="min-w-0 flex-1" />
        <Button variant="ghost" size="icon" aria-label="Filter">
          <IconFilter size={16} stroke={1.5} />
        </Button>
      </div>
      <nav className="flex min-h-0 flex-1 flex-col gap-3 overflow-auto">
        {dashboardPanelGroups.map((group) => (
          <ItemGroup key={group.title}>
            <ItemSectionHeader>
              <ItemSectionHeaderTitle>{group.title}</ItemSectionHeaderTitle>
            </ItemSectionHeader>
            {group.links.map((link) => (
              <Item
                key={link}
                selected={scope === link}
                onClick={() => onScopeChange(link)}
              >
                <ItemTitle>{link}</ItemTitle>
              </Item>
            ))}
          </ItemGroup>
        ))}
      </nav>
    </aside>
  );
}

DashboardLayoutPanel.displayName = 'DashboardLayoutPanel';

export { DashboardLayoutPanel };
