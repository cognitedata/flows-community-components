import {
  type CSSProperties,
  type ComponentProps,
  type ComponentType,
  type ReactNode,
  createContext,
  forwardRef,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

import { Collapsible as CollapsiblePrimitive } from "@base-ui/react/collapsible";
import { IconAlertTriangle, IconChevronDown, type IconProps } from "@tabler/icons-react";

import { Badge } from "@/components/ui/aura/badge";
import { cn } from "@/lib/utils";

type TreeItemStatus = "warning" | "error";

type TreeProps = ComponentProps<"div"> & {
  expanded?: string[];
  defaultExpanded?: string[];
  onExpandedChange?: (expanded: string[]) => void;
  type?: "single" | "multiple";
};

type TreeItemProps = Omit<ComponentProps<"div">, "children"> & {
  value: string;
  label: string;
  icon?: ComponentType<IconProps>;
  status?: TreeItemStatus;
  disabled?: boolean;
  children?: ReactNode;
};

type TreeContextValue = {
  expandedItems: Set<string>;
  toggleItem: (value: string) => void;
};

const TreeContext = createContext<TreeContextValue | null>(null);

type TreeItemContextValue = {
  value: string;
  depth: number;
  registerChildStatus: (childValue: string, status: TreeItemStatus) => void;
  unregisterChildStatus: (childValue: string) => void;
};

const TreeItemContext = createContext<TreeItemContextValue | null>(null);

function useTree() {
  const context = useContext(TreeContext);
  if (!context) {
    throw new Error("useTree must be used within a Tree component");
  }
  return context;
}

function useTreeItemContext() {
  return useContext(TreeItemContext);
}

function computeDerivedStatus(
  ownStatus: TreeItemStatus | undefined,
  childStatuses: Map<string, TreeItemStatus>
): TreeItemStatus | undefined {
  const allStatuses = [ownStatus, ...childStatuses.values()].filter(Boolean);
  if (allStatuses.includes("error")) return "error";
  if (allStatuses.includes("warning")) return "warning";
  return undefined;
}

const Tree = forwardRef<HTMLDivElement, TreeProps>(function Tree(
  {
    expanded,
    defaultExpanded = [],
    onExpandedChange,
    type = "multiple",
    className,
    children,
    ...props
  },
  ref
) {
  const isControlled = expanded !== undefined;
  const [internalExpanded, setInternalExpanded] = useState<Set<string>>(
    () => new Set(defaultExpanded)
  );

  const controlledSet = useMemo(() => new Set(expanded), [expanded]);
  const expandedItems = isControlled ? controlledSet : internalExpanded;

  const toggleItem = useCallback(
    (value: string) => {
      const updateExpanded = (prev: Set<string>) => {
        const next = new Set(prev);
        if (next.has(value)) {
          next.delete(value);
        } else {
          if (type === "single") next.clear();
          next.add(value);
        }
        return next;
      };

      if (isControlled) {
        const next = updateExpanded(new Set(expanded));
        onExpandedChange?.(Array.from(next));
      } else {
        setInternalExpanded((prev) => {
          const next = updateExpanded(prev);
          onExpandedChange?.(Array.from(next));
          return next;
        });
      }
    },
    [type, isControlled, expanded, onExpandedChange]
  );

  const contextValue = useMemo(
    () => ({
      expandedItems,
      toggleItem,
    }),
    [expandedItems, toggleItem]
  );

  return (
    <TreeContext.Provider value={contextValue}>
      <div
        ref={ref}
        data-slot="tree"
        role="tree"
        className={cn("w-full overflow-x-auto [--tree-indent:0.5rem]", className)}
        {...props}
      >
        {children}
      </div>
    </TreeContext.Provider>
  );
});

const TreeItem = forwardRef<HTMLDivElement, TreeItemProps>(function TreeItem(
  { value, label, icon: Icon, status, disabled = false, className, children, ...props },
  ref
) {
  const treeContext = useTree();
  const parentItem = useTreeItemContext();
  const depth = parentItem ? parentItem.depth + 1 : 0;

  const hasChildren = Boolean(children);
  const isOpen = treeContext.expandedItems.has(value);

  const childStatusesRef = useRef<Map<string, TreeItemStatus>>(new Map());
  const [derivedStatus, setDerivedStatus] = useState<TreeItemStatus | undefined>(status);

  useEffect(() => {
    if (parentItem && derivedStatus) {
      parentItem.registerChildStatus(value, derivedStatus);
      return () => parentItem.unregisterChildStatus(value);
    }
    if (parentItem && !derivedStatus) {
      parentItem.unregisterChildStatus(value);
    }
  }, [value, derivedStatus, parentItem]);

  useEffect(() => {
    setDerivedStatus(computeDerivedStatus(status, childStatusesRef.current));
  }, [status]);

  const registerChildStatus = useCallback(
    (childValue: string, childStatus: TreeItemStatus) => {
      childStatusesRef.current.set(childValue, childStatus);
      setDerivedStatus(computeDerivedStatus(status, childStatusesRef.current));
    },
    [status]
  );

  const unregisterChildStatus = useCallback(
    (childValue: string) => {
      childStatusesRef.current.delete(childValue);
      setDerivedStatus(computeDerivedStatus(status, childStatusesRef.current));
    },
    [status]
  );

  const itemContextValue = useMemo(
    () => ({
      value,
      depth,
      registerChildStatus,
      unregisterChildStatus,
    }),
    [value, depth, registerChildStatus, unregisterChildStatus]
  );

  const handleToggle = useCallback(() => {
    if (hasChildren && !disabled) {
      treeContext.toggleItem(value);
    }
  }, [hasChildren, disabled, treeContext, value]);

  const indentStyle: CSSProperties = {
    paddingInlineStart: `calc(${depth} * var(--tree-indent) + 0.5rem)`,
  };

  return (
    <TreeItemContext.Provider value={itemContextValue}>
      <div
        ref={ref}
        data-slot="tree-item"
        data-value={value}
        data-state={isOpen ? "open" : "closed"}
        data-status={derivedStatus}
        data-has-children={hasChildren}
        role="treeitem"
        aria-expanded={hasChildren ? isOpen : undefined}
        aria-disabled={disabled}
        className={cn("group/tree-item", className)}
        {...props}
      >
        {hasChildren ? (
          <CollapsiblePrimitive.Root open={isOpen} onOpenChange={() => handleToggle()}>
            <CollapsiblePrimitive.Trigger
              data-slot="tree-item-trigger"
              data-state={isOpen ? "open" : "closed"}
              disabled={disabled}
              className={cn(
                "group flex w-full min-w-0 items-center gap-2 rounded-md px-2 py-1.5 text-base text-muted-foreground font-medium",
                "hover:bg-accent hover:text-foreground",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                "disabled:pointer-events-none disabled:opacity-50",
                "touch-manipulation"
              )}
              style={indentStyle}
            >
              <IconChevronDown
                className={cn(
                  "size-4 shrink-0 text-muted-foreground group-hover:text-foreground transition-transform duration-200",
                  isOpen && "rotate-180",
                  "rtl:rotate-180 rtl:[&[data-state=open]]:rotate-0"
                )}
                data-state={isOpen ? "open" : "closed"}
                aria-hidden="true"
              />
              {Icon && (
                <span className="flex shrink-0">
                  <Icon className="size-4" />
                </span>
              )}
              <span className="flex-1 truncate text-start text-sm font-medium accent-foreground">
                {label}
              </span>
              {derivedStatus && <StatusBadge status={derivedStatus} />}
            </CollapsiblePrimitive.Trigger>
            <div
              data-slot="tree-item-content"
              role="group"
              className={cn(
                "grid transition-[grid-template-rows] duration-200 ease-out",
                isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
              )}
            >
              <div className="overflow-hidden">{children}</div>
            </div>
          </CollapsiblePrimitive.Root>
        ) : (
          <div
            data-slot="tree-item-leaf"
            className={cn(
              "flex w-full min-w-0 items-center gap-2 rounded-md px-2 py-1.5 text-base text-muted-foreground",
              "hover:bg-accent hover:text-foreground",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
              disabled ? "pointer-events-none opacity-50" : "cursor-pointer",
              "touch-manipulation"
            )}
            style={indentStyle}
          >
            <span className="size-4 shrink-0" aria-hidden="true" />
            {Icon && (
              <span className="flex shrink-0">
                <Icon className="size-4" />
              </span>
            )}
            <span className="flex-1 truncate text-start text-sm font-medium accent-foreground">
              {label}
            </span>
            {derivedStatus && <StatusBadge status={derivedStatus} />}
          </div>
        )}
      </div>
    </TreeItemContext.Provider>
  );
});

function StatusBadge({ status }: { status: TreeItemStatus }) {
  return (
    <Badge
      variant={status}
      outline
      size="icon"
      aria-label={status === "warning" ? "Warning" : "Error"}
    >
      <IconAlertTriangle className="size-3" aria-hidden="true" />
    </Badge>
  );
}

export { Tree, TreeItem };
