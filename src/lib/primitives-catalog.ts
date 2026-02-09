export type PrimitiveCatalogSection = "foundation" | "primitive";
export type PrimitiveFigmaAvailability = "yes" | "no" | "in-progress" | "unknown";

export type PrimitiveProgressStatus =
  | "ready-for-dc"
  | "in-progress"
  | "dev-check"
  | "needs-discussion"
  | "imported-from-fusion"
  | "untracked"
  | "coming-soon";

export const PRIMITIVE_PROGRESS_STATUS_ORDER: PrimitiveProgressStatus[] = [
  "ready-for-dc",
  "in-progress",
  "dev-check",
  "needs-discussion",
  "imported-from-fusion",
  "untracked",
  "coming-soon",
];

export interface PrimitiveCatalogEntry {
  slug: string;
  name: string;
  description: string;
  section: PrimitiveCatalogSection;
  progressStatus: PrimitiveProgressStatus;
  figmaAvailability: PrimitiveFigmaAvailability;
  figmaUrl?: string;
  eosGaRequired: boolean | null;
  duneGaRequired: boolean | null;
  implemented: boolean;
  comingSoon: boolean;
  aliases?: string[];
}

interface PrimitiveCatalogSeed {
  slug: string;
  name: string;
  description: string;
  section: PrimitiveCatalogSection;
  progressStatus: Exclude<PrimitiveProgressStatus, "coming-soon">;
  figmaUrl?: string;
  aliases?: string[];
}

type PrimitiveBadgeVariant = "success" | "inProgress" | "warning" | "gray";

const AURA_FIGMA_FALLBACK_URL =
  "https://www.figma.com/design/pMnMQvfErZDJzWgrcWCIwZ/WIP---Aura-library?node-id=2253-40628&p=f&t=brWPskYTnahu9phr-0";

const RAW_PRIMITIVES_CATALOG: PrimitiveCatalogSeed[] = [
  {
    slug: "colors",
    name: "Colors",
    description: "Color palette and tokens",
    section: "foundation",
    progressStatus: "untracked",
    aliases: ["color-tokens"],
  },
  {
    slug: "effects",
    name: "Effects",
    description: "Shadows and visual effects",
    section: "foundation",
    progressStatus: "untracked",
    aliases: ["shadow-effects"],
  },
  {
    slug: "layouts",
    name: "Layouts",
    description: "Grid and container systems",
    section: "foundation",
    progressStatus: "untracked",
    aliases: [
      "layout-default",
      "layout-dashboard",
      "layout-responsive-breakpoints",
      "layout-split-view",
    ],
  },
  {
    slug: "typography",
    name: "Typography",
    description: "Text styles and scales",
    section: "foundation",
    progressStatus: "untracked",
  },
  {
    slug: "icons",
    name: "Icons",
    description: "System iconography and usage guidance",
    section: "foundation",
    progressStatus: "untracked",
  },
  {
    slug: "illustrations",
    name: "Illustrations",
    description: "Illustration assets and guidance",
    section: "foundation",
    progressStatus: "untracked",
  },
  {
    slug: "document-icons",
    name: "Document icons",
    description: "File and document icon primitives",
    section: "foundation",
    progressStatus: "untracked",
  },
  {
    slug: "flex",
    name: "Flex",
    description: "Flex layout helpers and primitives",
    section: "foundation",
    progressStatus: "untracked",
  },
  {
    slug: "focus-and-focus-destructive-rings",
    name: "Focus rings",
    description: "Focus and destructive focus-ring tokens",
    section: "foundation",
    progressStatus: "untracked",
  },
  {
    slug: "logos",
    name: "Logos",
    description: "Product logos and brand marks",
    section: "foundation",
    progressStatus: "untracked",
  },

  {
    slug: "accordion",
    name: "Accordion",
    description: "Collapsible content sections",
    section: "primitive",
    progressStatus: "untracked",
  },
  {
    slug: "action-toolbar",
    name: "Action toolbar",
    description: "A compact toolbar for grouped actions",
    section: "primitive",
    progressStatus: "untracked",
  },
  {
    slug: "alert",
    name: "Alert",
    description: "Display important messages",
    section: "primitive",
    progressStatus: "in-progress",
  },
  {
    slug: "alert-dialog",
    name: "Alert dialog",
    description: "Modal confirmation dialogs",
    section: "primitive",
    progressStatus: "untracked",
  },
  {
    slug: "avatar",
    name: "Avatar",
    description: "User profile images",
    section: "primitive",
    progressStatus: "in-progress",
  },
  {
    slug: "badge",
    name: "Badge",
    description: "Small status indicators",
    section: "primitive",
    progressStatus: "in-progress",
  },
  {
    slug: "banner",
    name: "Banner",
    description: "Full-width notifications",
    section: "primitive",
    progressStatus: "untracked",
  },
  {
    slug: "breadcrumb",
    name: "Breadcrumb",
    description: "Navigation hierarchy",
    section: "primitive",
    progressStatus: "in-progress",
    aliases: ["breadcrumb-topbar"],
  },
  {
    slug: "topbar",
    name: "Topbar",
    description: "Application top bar",
    section: "primitive",
    progressStatus: "in-progress",
    aliases: ["breadcrumb-topbar"],
  },
  {
    slug: "button",
    name: "Button",
    description: "Clickable action elements",
    section: "primitive",
    progressStatus: "in-progress",
  },
  {
    slug: "button-group",
    name: "Button group",
    description: "Grouped button actions",
    section: "primitive",
    progressStatus: "in-progress",
  },
  {
    slug: "calendar",
    name: "Calendar",
    description: "Date selection interface",
    section: "primitive",
    progressStatus: "in-progress",
  },
  {
    slug: "card",
    name: "Card",
    description: "Grouped content container",
    section: "primitive",
    progressStatus: "untracked",
    aliases: ["card-artifact-widget"],
  },
  {
    slug: "checkbox",
    name: "Checkbox",
    description: "Multi-select input",
    section: "primitive",
    progressStatus: "untracked",
  },
  {
    slug: "collapsible",
    name: "Collapsible",
    description: "Expandable content",
    section: "primitive",
    progressStatus: "in-progress",
  },
  {
    slug: "combobox",
    name: "Combobox",
    description: "Searchable select input",
    section: "primitive",
    progressStatus: "ready-for-dc",
  },
  {
    slug: "command",
    name: "Command",
    description: "Command palette menu",
    section: "primitive",
    progressStatus: "in-progress",
  },
  {
    slug: "context-menu",
    name: "Context menu",
    description: "Right-click action menu",
    section: "primitive",
    progressStatus: "untracked",
  },
  {
    slug: "count",
    name: "Count",
    description: "Numeric counter primitives",
    section: "primitive",
    progressStatus: "ready-for-dc",
  },
  {
    slug: "date-picker",
    name: "Date picker",
    description: "Calendar date selector",
    section: "primitive",
    progressStatus: "imported-from-fusion",
  },
  {
    slug: "datetime-picker",
    name: "DateTime picker",
    description: "Combined date and time selector",
    section: "primitive",
    progressStatus: "untracked",
    aliases: ["datetime-input", "datetime-picker-range"],
  },
  {
    slug: "dialog",
    name: "Dialog",
    description: "Modal overlay windows",
    section: "primitive",
    progressStatus: "in-progress",
  },
  {
    slug: "drawer",
    name: "Drawer",
    description: "Slide-in side panel",
    section: "primitive",
    progressStatus: "untracked",
  },
  {
    slug: "dropdown-menu",
    name: "Dropdown menu",
    description: "Action menu list",
    section: "primitive",
    progressStatus: "in-progress",
  },
  {
    slug: "empty-state",
    name: "Empty state",
    description: "Empty-state illustrations and messaging",
    section: "primitive",
    progressStatus: "untracked",
  },
  {
    slug: "helper-text",
    name: "Helper text",
    description: "Input guidance text",
    section: "primitive",
    progressStatus: "in-progress",
  },
  {
    slug: "hover-card",
    name: "Hover card",
    description: "Preview content on hover",
    section: "primitive",
    progressStatus: "in-progress",
    aliases: ["hovercard"],
  },
  {
    slug: "input",
    name: "Input",
    description: "Text input field",
    section: "primitive",
    progressStatus: "in-progress",
  },
  {
    slug: "input-group",
    name: "Input group",
    description: "Composed input with controls",
    section: "primitive",
    progressStatus: "in-progress",
    aliases: ["input-group?"],
  },
  {
    slug: "item",
    name: "Item",
    description: "List item primitive",
    section: "primitive",
    progressStatus: "untracked",
  },
  {
    slug: "kbd",
    name: "Kbd",
    description: "Keyboard shortcut display",
    section: "primitive",
    progressStatus: "untracked",
  },
  {
    slug: "label",
    name: "Label",
    description: "Form field labels",
    section: "primitive",
    progressStatus: "dev-check",
  },
  {
    slug: "list",
    name: "List",
    description: "Structured list layouts",
    section: "primitive",
    progressStatus: "ready-for-dc",
  },
  {
    slug: "menubar",
    name: "Menubar",
    description: "Application menu bar",
    section: "primitive",
    progressStatus: "untracked",
    aliases: ["menu-bar"],
  },
  {
    slug: "page-loader",
    name: "Page loader",
    description: "Loading state for full-page transitions",
    section: "primitive",
    progressStatus: "needs-discussion",
  },
  {
    slug: "pagination",
    name: "Pagination",
    description: "Page navigation controls",
    section: "primitive",
    progressStatus: "ready-for-dc",
  },
  {
    slug: "popover",
    name: "Popover",
    description: "Floating content panel",
    section: "primitive",
    progressStatus: "in-progress",
  },
  {
    slug: "progress",
    name: "Progress",
    description: "Progress indicator bar",
    section: "primitive",
    progressStatus: "ready-for-dc",
  },
  {
    slug: "radio-group",
    name: "Radio group",
    description: "Single-select options",
    section: "primitive",
    progressStatus: "untracked",
    aliases: ["radio"],
  },
  {
    slug: "segmented-control",
    name: "Segmented control",
    description: "Exclusive segmented option control",
    section: "primitive",
    progressStatus: "untracked",
  },
  {
    slug: "select",
    name: "Select",
    description: "Dropdown selection",
    section: "primitive",
    progressStatus: "in-progress",
  },
  {
    slug: "select-panel",
    name: "Select panel",
    description: "Selection panel variant",
    section: "primitive",
    progressStatus: "untracked",
  },
  {
    slug: "separator",
    name: "Separator",
    description: "Visual content divider",
    section: "primitive",
    progressStatus: "in-progress",
  },
  {
    slug: "sidebar",
    name: "Sidebar",
    description: "Navigation side panel",
    section: "primitive",
    progressStatus: "untracked",
  },
  {
    slug: "skeleton",
    name: "Skeleton",
    description: "Loading placeholders",
    section: "primitive",
    progressStatus: "in-progress",
  },
  {
    slug: "slider",
    name: "Slider",
    description: "Range input control",
    section: "primitive",
    progressStatus: "untracked",
  },
  {
    slug: "sonner-toast",
    name: "Sonner",
    description: "Toast notifications",
    section: "primitive",
    progressStatus: "untracked",
    aliases: ["sonner"],
  },
  {
    slug: "swap-slot",
    name: "Swap slot",
    description: "Content transition primitive",
    section: "primitive",
    progressStatus: "untracked",
    aliases: ["swapslot", "swapslot-all-components"],
  },
  {
    slug: "switch",
    name: "Switch",
    description: "Toggle on/off control",
    section: "primitive",
    progressStatus: "untracked",
  },
  {
    slug: "table",
    name: "Table",
    description: "Structured data display",
    section: "primitive",
    progressStatus: "untracked",
  },
  {
    slug: "tabs",
    name: "Tabs",
    description: "Tabbed content panels",
    section: "primitive",
    progressStatus: "untracked",
  },
  {
    slug: "textarea",
    name: "Textarea",
    description: "Multi-line text input",
    section: "primitive",
    progressStatus: "in-progress",
  },
  {
    slug: "time-input",
    name: "Time input",
    description: "Time selection field",
    section: "primitive",
    progressStatus: "untracked",
    aliases: ["time-picker", "time-picker-single"],
  },
  {
    slug: "time-picker-range",
    name: "Time picker (range)",
    description: "Range-based time selection",
    section: "primitive",
    progressStatus: "untracked",
  },
  {
    slug: "toggle",
    name: "Toggle",
    description: "Binary state button",
    section: "primitive",
    progressStatus: "dev-check",
  },
  {
    slug: "toolbar",
    name: "Toolbar",
    description: "Action toolbar with grouped controls",
    section: "primitive",
    progressStatus: "untracked",
  },
  {
    slug: "tooltip",
    name: "Tooltip",
    description: "Contextual help text",
    section: "primitive",
    progressStatus: "in-progress",
  },
  {
    slug: "tree-view",
    name: "Tree view",
    description: "Hierarchical tree navigation",
    section: "primitive",
    progressStatus: "in-progress",
  },
];

const FIGMA_AVAILABILITY_BY_SLUG: Partial<Record<string, PrimitiveFigmaAvailability>> = {
  colors: "yes",
  effects: "yes",
  layouts: "in-progress",
  typography: "yes",
  icons: "yes",
  illustrations: "yes",
  "document-icons": "yes",
  flex: "no",
  "focus-and-focus-destructive-rings": "yes",
  logos: "yes",
  accordion: "yes",
  "action-toolbar": "no",
  alert: "yes",
  "alert-dialog": "yes",
  avatar: "yes",
  badge: "yes",
  banner: "yes",
  breadcrumb: "yes",
  topbar: "yes",
  button: "yes",
  "button-group": "yes",
  calendar: "yes",
  card: "unknown",
  checkbox: "yes",
  collapsible: "yes",
  combobox: "yes",
  command: "yes",
  "context-menu": "yes",
  count: "yes",
  "date-picker": "yes",
  "datetime-picker": "yes",
  dialog: "yes",
  drawer: "yes",
  "dropdown-menu": "yes",
  "empty-state": "yes",
  "helper-text": "yes",
  "hover-card": "no",
  input: "yes",
  "input-group": "yes",
  item: "yes",
  kbd: "yes",
  label: "yes",
  list: "yes",
  menubar: "yes",
  "page-loader": "no",
  pagination: "yes",
  popover: "yes",
  progress: "yes",
  "radio-group": "yes",
  "segmented-control": "in-progress",
  select: "yes",
  "select-panel": "no",
  separator: "yes",
  sidebar: "unknown",
  skeleton: "no",
  slider: "yes",
  "sonner-toast": "yes",
  "swap-slot": "yes",
  switch: "yes",
  table: "unknown",
  tabs: "yes",
  textarea: "yes",
  "time-input": "unknown",
  "time-picker-range": "unknown",
  toggle: "yes",
  toolbar: "in-progress",
  tooltip: "yes",
  "tree-view": "yes",
};

const EOS_GA_REQUIRED_BY_SLUG: Partial<Record<string, boolean | null>> = {
  colors: true,
  effects: true,
  layouts: true,
  typography: true,
  icons: true,
  illustrations: true,
  "document-icons": false,
  flex: true,
  "focus-and-focus-destructive-rings": true,
  logos: true,
  accordion: true,
  "action-toolbar": true,
  alert: true,
  "alert-dialog": false,
  avatar: true,
  badge: true,
  banner: true,
  breadcrumb: true,
  topbar: true,
  button: true,
  "button-group": null,
  calendar: true,
  card: null,
  checkbox: false,
  collapsible: true,
  combobox: true,
  command: false,
  "context-menu": false,
  count: true,
  "date-picker": false,
  "datetime-picker": false,
  dialog: true,
  drawer: false,
  "dropdown-menu": true,
  "empty-state": true,
  "helper-text": true,
  "hover-card": true,
  input: false,
  "input-group": true,
  item: false,
  kbd: false,
  label: true,
  list: null,
  menubar: false,
  "page-loader": true,
  pagination: true,
  popover: true,
  progress: true,
  "radio-group": false,
  "segmented-control": null,
  select: true,
  "select-panel": false,
  separator: true,
  sidebar: null,
  skeleton: true,
  slider: false,
  "sonner-toast": true,
  "swap-slot": null,
  switch: true,
  table: null,
  tabs: false,
  textarea: false,
  "time-input": null,
  "time-picker-range": null,
  toggle: true,
  toolbar: true,
  tooltip: true,
  "tree-view": true,
};

const DUNE_GA_REQUIRED_BY_SLUG: Partial<Record<string, boolean | null>> = {
  colors: true,
  effects: true,
  layouts: true,
  typography: true,
  icons: true,
  illustrations: true,
  "document-icons": true,
  flex: true,
  "focus-and-focus-destructive-rings": true,
  logos: true,
  accordion: true,
  "action-toolbar": true,
  alert: true,
  "alert-dialog": true,
  avatar: true,
  badge: true,
  banner: true,
  breadcrumb: true,
  topbar: true,
  button: true,
  "button-group": null,
  calendar: true,
  card: null,
  checkbox: true,
  collapsible: true,
  combobox: true,
  command: true,
  "context-menu": true,
  count: null,
  "date-picker": true,
  "datetime-picker": true,
  dialog: true,
  drawer: true,
  "dropdown-menu": true,
  "empty-state": true,
  "helper-text": true,
  "hover-card": true,
  input: true,
  "input-group": true,
  item: true,
  kbd: true,
  label: true,
  list: null,
  menubar: true,
  "page-loader": true,
  pagination: true,
  popover: true,
  progress: true,
  "radio-group": true,
  "segmented-control": null,
  select: true,
  "select-panel": true,
  separator: true,
  sidebar: null,
  skeleton: true,
  slider: true,
  "sonner-toast": true,
  "swap-slot": true,
  switch: true,
  table: null,
  tabs: true,
  textarea: true,
  "time-input": null,
  "time-picker-range": null,
  toggle: true,
  toolbar: true,
  tooltip: true,
  "tree-view": true,
};

const metadataModules = import.meta.glob("@/components/ui/aura/*/*.metadata.ts", { eager: false });
const storyModules = import.meta.glob("@/components/ui/aura/*/*.stories.tsx", { eager: false });

function slugFromPath(path: string, extension: "metadata" | "stories"): string | null {
  const regex =
    extension === "metadata" ? /\/([^/]+)\/\1\.metadata\.ts$/ : /\/([^/]+)\/\1\.stories\.tsx$/;
  const match = path.match(regex);
  return match ? match[1] : null;
}

function getImplementedSlugs(): Set<string> {
  const metadataSlugs = Object.keys(metadataModules)
    .map((path) => slugFromPath(path, "metadata"))
    .filter((slug): slug is string => Boolean(slug));

  const storySlugs = Object.keys(storyModules)
    .map((path) => slugFromPath(path, "stories"))
    .filter((slug): slug is string => Boolean(slug));

  return new Set([...metadataSlugs, ...storySlugs]);
}

const IMPLEMENTED_SLUGS = getImplementedSlugs();

function isImplemented(seed: PrimitiveCatalogSeed): boolean {
  if (IMPLEMENTED_SLUGS.has(seed.slug)) {
    return true;
  }

  return seed.aliases?.some((alias) => IMPLEMENTED_SLUGS.has(alias)) ?? false;
}

export const PRIMITIVES_CATALOG: PrimitiveCatalogEntry[] = RAW_PRIMITIVES_CATALOG.map((seed) => {
  const implemented = isImplemented(seed);
  const resolvedProgressStatus: PrimitiveProgressStatus = !implemented
    ? "coming-soon"
    : seed.progressStatus === "untracked"
      ? "in-progress"
      : seed.progressStatus;

  return {
    ...seed,
    implemented,
    comingSoon: !implemented,
    progressStatus: resolvedProgressStatus,
    figmaAvailability: FIGMA_AVAILABILITY_BY_SLUG[seed.slug] || "unknown",
    eosGaRequired: EOS_GA_REQUIRED_BY_SLUG[seed.slug] ?? null,
    duneGaRequired: DUNE_GA_REQUIRED_BY_SLUG[seed.slug] ?? null,
  };
});

export function getPrimitiveCatalogBySection(
  section: PrimitiveCatalogSection
): PrimitiveCatalogEntry[] {
  return PRIMITIVES_CATALOG.filter((entry) => entry.section === section).sort((a, b) =>
    a.name.localeCompare(b.name)
  );
}

export function getPrimitiveCatalogEntry(slug: string): PrimitiveCatalogEntry | null {
  const normalizedSlug = slug.toLowerCase();

  return (
    PRIMITIVES_CATALOG.find((entry) => {
      if (entry.slug === normalizedSlug) {
        return true;
      }

      return entry.aliases?.some((alias) => alias.toLowerCase() === normalizedSlug) ?? false;
    }) || null
  );
}

export function getPrimitiveProgressLabel(status: PrimitiveProgressStatus): string {
  switch (status) {
    case "ready-for-dc":
      return "Ready for DC";
    case "in-progress":
      return "In progress";
    case "dev-check":
      return "Dev check";
    case "needs-discussion":
      return "Needs discussion";
    case "imported-from-fusion":
      return "Imported from Fusion";
    case "untracked":
      return "Untracked";
    case "coming-soon":
      return "Coming soon";
    default:
      return "Untracked";
  }
}

export function getPrimitiveProgressBadgeProps(status: PrimitiveProgressStatus): {
  variant: PrimitiveBadgeVariant;
  outline: boolean;
  className?: string;
} {
  switch (status) {
    case "ready-for-dc":
      return { variant: "success", outline: false };
    case "in-progress":
      return { variant: "warning", outline: false };
    case "dev-check":
      return { variant: "inProgress", outline: false };
    case "needs-discussion":
      return { variant: "warning", outline: false, className: "ring-1 ring-inset" };
    case "imported-from-fusion":
      return { variant: "gray", outline: true };
    case "coming-soon":
      return {
        variant: "gray",
        outline: true,
        className: "border-dashed font-medium text-muted-foreground",
      };
    default:
      return { variant: "gray", outline: true };
  }
}

export function getPrimitiveFigmaLabel(availability: PrimitiveFigmaAvailability): string {
  switch (availability) {
    case "yes":
      return "Figma";
    case "no":
      return "No Figma";
    case "in-progress":
      return "Figma in progress";
    default:
      return "Figma unknown";
  }
}

export function getPrimitiveFigmaBadgeProps(availability: PrimitiveFigmaAvailability): {
  variant: PrimitiveBadgeVariant;
  outline: boolean;
  className?: string;
} {
  switch (availability) {
    case "yes":
      return { variant: "gray", outline: true };
    case "in-progress":
      return { variant: "warning", outline: true };
    case "no":
      return { variant: "gray", outline: true, className: "opacity-75" };
    default:
      return { variant: "gray", outline: true, className: "border-dashed opacity-75" };
  }
}

export function getPrimitiveGaLabel(required: boolean | null, product: "Eos" | "Dune"): string {
  if (required === true) {
    return `${product} GA: Required`;
  }
  if (required === false) {
    return `${product} GA: Not required`;
  }
  return `${product} GA: Unknown`;
}

export function getPrimitiveGaBadgeProps(required: boolean | null): {
  variant: PrimitiveBadgeVariant;
  outline: boolean;
  className?: string;
} {
  if (required === true) {
    return { variant: "success", outline: true };
  }
  if (required === false) {
    return { variant: "gray", outline: true, className: "opacity-80" };
  }
  return { variant: "gray", outline: true, className: "border-dashed opacity-80" };
}

export function getPrimitiveFigmaUrl(entry: PrimitiveCatalogEntry): string | null {
  if (entry.figmaUrl) {
    return entry.figmaUrl;
  }
  if (entry.figmaAvailability === "yes") {
    return AURA_FIGMA_FALLBACK_URL;
  }
  return null;
}
