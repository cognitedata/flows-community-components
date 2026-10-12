import {
  Button,
  Item,
  ItemCheckbox,
  ItemGroup,
  ItemSectionHeader,
  ItemSectionHeaderTitle,
  ItemTitle,
  Search,
  Tree,
} from '@cognite/aura/components';
import { IconFilter } from '@tabler/icons-react';
import { type ReactNode, useState } from 'react';

import {
  mapLayerDefaultChecked,
  mapLayerDefaultExpanded,
  mapLayerNodes,
  mapLayerRootId,
  type MapLayerListView,
  type MapLayerNode,
} from './map-layout-template.data';

function LayerTree(): ReactNode {
  return (
    <Tree<MapLayerNode>
      rootItemId={mapLayerRootId}
      items={mapLayerNodes}
      getChildren={(item) => [...item.children]}
      getItemName={(item) => item.name}
      defaultExpandedItems={mapLayerDefaultExpanded}
      checkboxes
      defaultCheckedItems={mapLayerDefaultChecked}
    >
      {(item) => <ItemTitle>{item.getItemName()}</ItemTitle>}
    </Tree>
  );
}

function LayerItems({
  ids,
  depth,
  checkedIds,
  onToggle,
}: {
  ids: readonly string[];
  depth: number;
  checkedIds: ReadonlySet<string>;
  onToggle: (id: string) => void;
}): ReactNode {
  return ids.map((id) => {
    const node = mapLayerNodes[id];
    if (!node) {
      return null;
    }
    return (
      <LayerItemRows
        key={id}
        id={id}
        node={node}
        depth={depth}
        checkedIds={checkedIds}
        onToggle={onToggle}
      />
    );
  });
}

function LayerItemRows({
  id,
  node,
  depth,
  checkedIds,
  onToggle,
}: {
  id: string;
  node: MapLayerNode;
  depth: number;
  checkedIds: ReadonlySet<string>;
  onToggle: (id: string) => void;
}): ReactNode {
  return (
    <>
      <Item>
        {Array.from({ length: depth }, (_, index) => (
          <span
            key={`${id}-indent-${index}`}
            aria-hidden="true"
            className="w-4 shrink-0"
          />
        ))}
        <ItemCheckbox
          aria-label={`Select ${node.name}`}
          checked={checkedIds.has(id)}
          onCheckedChange={() => onToggle(id)}
        />
        <ItemTitle>{node.name}</ItemTitle>
      </Item>
      {node.children.length > 0 && (
        <LayerItems
          ids={node.children}
          depth={depth + 1}
          checkedIds={checkedIds}
          onToggle={onToggle}
        />
      )}
    </>
  );
}

function LayerItemList(): ReactNode {
  const [checkedIds, setCheckedIds] = useState<ReadonlySet<string>>(
    () => new Set(mapLayerDefaultChecked)
  );
  const groups = mapLayerNodes[mapLayerRootId]?.children ?? [];

  function toggle(id: string): void {
    setCheckedIds((current) => {
      const next = new Set(current);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  }

  return (
    <div className="flex flex-col gap-2">
      {groups.map((groupId) => {
        const group = mapLayerNodes[groupId];
        if (!group) {
          return null;
        }
        return (
          <section key={groupId}>
            <ItemSectionHeader>
              <ItemSectionHeaderTitle>{group.name}</ItemSectionHeaderTitle>
            </ItemSectionHeader>
            <ItemGroup>
              <LayerItems
                ids={group.children}
                depth={0}
                checkedIds={checkedIds}
                onToggle={toggle}
              />
            </ItemGroup>
          </section>
        );
      })}
    </div>
  );
}

function MapLayoutLeftPanel({
  list = 'tree',
}: {
  list?: MapLayerListView;
}): ReactNode {
  return (
    <aside
      data-slot="map-left-panel"
      aria-label="Layers"
      className="flex w-[282px] shrink-0 flex-col border-r"
    >
      <div className="flex items-center gap-2 px-3 py-3">
        <Search
          aria-label="Search layers"
          placeholder="Search layers"
          className="flex-1"
        />
        <Button variant="secondary" size="icon" aria-label="Filter">
          <IconFilter size={16} stroke={1.5} />
        </Button>
      </div>
      <div className="flex flex-1 flex-col overflow-y-auto px-1 pb-3">
        {list === 'item' ? <LayerItemList /> : <LayerTree />}
      </div>
    </aside>
  );
}

MapLayoutLeftPanel.displayName = 'MapLayoutLeftPanel';

export { MapLayoutLeftPanel };
