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
import { type ReactNode, useRef, useState } from 'react';

import {
  mapLayerDefaultChecked,
  mapLayerDefaultExpanded,
  mapLayerNodes,
  mapLayerRootId,
  type MapLayerListView,
  type MapLayerNode,
} from './map-layout-template.data';

function LayerTree({
  selectedId,
  onSelect,
  onDeselect,
}: {
  selectedId: string | null;
  onSelect: (id: string) => void;
  onDeselect: (id: string) => void;
}): ReactNode {
  const checkedIds = useRef(new Set(mapLayerDefaultChecked));

  return (
    <Tree<MapLayerNode>
      rootItemId={mapLayerRootId}
      items={mapLayerNodes}
      getChildren={(item) => [...item.children]}
      getItemName={(item) => item.name}
      defaultExpandedItems={mapLayerDefaultExpanded}
      checkboxes
      defaultCheckedItems={mapLayerDefaultChecked}
      onCheckedItemsChange={(checked) => {
        const next = new Set(checked);
        const added = checked.filter((id) => !checkedIds.current.has(id));
        const removed = [...checkedIds.current].filter((id) => !next.has(id));
        checkedIds.current = next;
        const selectedId = added[added.length - 1];
        if (selectedId) {
          onSelect(selectedId);
          return;
        }
        removed.forEach(onDeselect);
      }}
    >
      {(item) => (
        <ItemTitle
          className="flex-1 cursor-pointer"
          onClick={(event) => {
            event.stopPropagation();
            const id = item.getId();
            if (id === selectedId) {
              onDeselect(id);
            } else {
              onSelect(id);
            }
          }}
        >
          {item.getItemName()}
        </ItemTitle>
      )}
    </Tree>
  );
}

function LayerItems({
  ids,
  depth,
  checkedIds,
  selectedId,
  onSelect,
  onDeselect,
  onCheckedChange,
}: {
  ids: readonly string[];
  depth: number;
  checkedIds: ReadonlySet<string>;
  selectedId: string | null;
  onSelect: (id: string) => void;
  onDeselect: (id: string) => void;
  onCheckedChange: (id: string, checked: boolean) => void;
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
        selectedId={selectedId}
        onSelect={onSelect}
        onDeselect={onDeselect}
        onCheckedChange={onCheckedChange}
      />
    );
  });
}

function LayerItemRows({
  id,
  node,
  depth,
  checkedIds,
  selectedId,
  onSelect,
  onDeselect,
  onCheckedChange,
}: {
  id: string;
  node: MapLayerNode;
  depth: number;
  checkedIds: ReadonlySet<string>;
  selectedId: string | null;
  onSelect: (id: string) => void;
  onDeselect: (id: string) => void;
  onCheckedChange: (id: string, checked: boolean) => void;
}): ReactNode {
  const selected = selectedId === id;
  return (
    <>
      <Item
        selected={selected}
        onClick={() => (selected ? onDeselect(id) : onSelect(id))}
      >
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
          onClick={(event) => event.stopPropagation()}
          onCheckedChange={(checked) => onCheckedChange(id, checked === true)}
        />
        <ItemTitle>{node.name}</ItemTitle>
      </Item>
      {node.children.length > 0 && (
        <LayerItems
          ids={node.children}
          depth={depth + 1}
          checkedIds={checkedIds}
          selectedId={selectedId}
          onSelect={onSelect}
          onDeselect={onDeselect}
          onCheckedChange={onCheckedChange}
        />
      )}
    </>
  );
}

function LayerItemList({
  selectedId,
  onSelect,
  onDeselect,
}: {
  selectedId: string | null;
  onSelect: (id: string) => void;
  onDeselect: (id: string) => void;
}): ReactNode {
  const [checkedIds, setCheckedIds] = useState<ReadonlySet<string>>(
    () => new Set(mapLayerDefaultChecked)
  );
  const groups = mapLayerNodes[mapLayerRootId]?.children ?? [];

  function changeChecked(id: string, checked: boolean): void {
    setCheckedIds((current) => {
      const next = new Set(current);
      if (checked) {
        next.add(id);
      } else {
        next.delete(id);
      }
      return next;
    });
    if (checked) {
      onSelect(id);
    } else {
      onDeselect(id);
    }
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
                selectedId={selectedId}
                onSelect={onSelect}
                onDeselect={onDeselect}
                onCheckedChange={changeChecked}
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
  selectedId = null,
  onSelect,
  onDeselect,
}: {
  list?: MapLayerListView;
  selectedId?: string | null;
  onSelect: (id: string) => void;
  onDeselect: (id: string) => void;
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
        {list === 'item' ? (
          <LayerItemList
            selectedId={selectedId}
            onSelect={onSelect}
            onDeselect={onDeselect}
          />
        ) : (
          <LayerTree
            selectedId={selectedId}
            onSelect={onSelect}
            onDeselect={onDeselect}
          />
        )}
      </div>
    </aside>
  );
}

MapLayoutLeftPanel.displayName = 'MapLayoutLeftPanel';

export { MapLayoutLeftPanel };
