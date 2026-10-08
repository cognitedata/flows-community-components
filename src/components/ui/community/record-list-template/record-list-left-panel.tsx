import { Search } from '@cognite/aura/components';
import { cn } from '@cognite/aura/utils';
import type { ReactNode } from 'react';

import { recordListGroups } from './record-list-template.data';

function RecordListLeftPanel({
  selectedGroupId,
  onSelectGroup,
}: {
  selectedGroupId: string;
  onSelectGroup: (groupId: string) => void;
}): ReactNode {
  return (
    <aside
      data-slot="record-list-left-panel"
      aria-label="Equipment"
      className="flex w-64 shrink-0 flex-col gap-3 border-r p-4"
    >
      <Search aria-label="Search areas" placeholder="Search areas" />
      <div className="flex flex-col gap-4">
        {recordListGroups.map((group) => (
          <section key={group.id} className="flex flex-col gap-1">
            <h3 className="px-2 text-sm font-medium">{group.label}</h3>
            <ul className="flex flex-col">
              {group.items.map((item) => {
                const selected = item.id === selectedGroupId;
                return (
                  <li key={item.id}>
                    <button
                      type="button"
                      aria-pressed={selected}
                      className={cn(
                        'w-full rounded-md px-2 py-1.5 text-left text-sm',
                        selected
                          ? 'bg-muted-background font-medium'
                          : 'hover:bg-muted-background'
                      )}
                      onClick={() => onSelectGroup(item.id)}
                    >
                      {item.label}
                    </button>
                  </li>
                );
              })}
            </ul>
          </section>
        ))}
      </div>
    </aside>
  );
}

RecordListLeftPanel.displayName = 'RecordListLeftPanel';

export { RecordListLeftPanel };
