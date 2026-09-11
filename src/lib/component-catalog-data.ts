import {
  IconAlertOctagon,
  IconAlertTriangle,
  IconAdjustmentsHorizontal,
  IconAppWindow,
  IconArrowsMoveVertical,
  IconAspectRatio,
  IconBadge,
  IconBell,
  IconBinaryTree2,
  IconBoxMultiple,
  IconCalendar,
  IconCalendarEvent,
  IconCalendarStats,
  IconCalendarTime,
  IconChartBar,
  IconChevronsDown,
  IconChevronRight,
  IconCircleDot,
  IconClick,
  IconClock,
  IconClockHour4,
  IconCode,
  IconCommand,
  IconDots,
  IconFolders,
  IconForms,
  IconGhost,
  IconHelp,
  IconId,
  IconInfoCircle,
  IconKeyboard,
  IconLayoutDistributeHorizontal,
  IconLayoutNavbar,
  IconLayoutSidebar,
  IconLayoutSidebarRight,
  IconLayoutSidebarRightCollapse,
  IconList,
  IconListCheck,
  IconListSearch,
  IconLoader2,
  IconMenu,
  IconMenu2,
  IconMessage2,
  IconMoodEmpty,
  IconPointer,
  IconProgress,
  IconSearch,
  IconSelect,
  IconSeparatorHorizontal,
  IconSpeakerphone,
  IconSquareCheck,
  IconTable,
  IconTag,
  IconTextWrap,
  IconToggleLeft,
  IconToggleRight,
  IconTools,
  IconUpload,
  IconUserCircle,
  type Icon as TablerIcon,
} from '@tabler/icons-react';

import { slugify } from '@/lib/utils';

export type PrimitiveStatus = 'v1.0.0' | 'coming-soon';

export interface ComponentCatalogEntry {
  name: string;
  description: string;
  icon: TablerIcon;
  status: PrimitiveStatus;
  /** Storybook story id, e.g. "primitives-button--basic" — omitted if no story exists yet */
  storybookId?: string;
  /** Hide from the catalog and sidebar when the component is not in Aura Storybook. */
  hidden?: boolean;
}

export interface ComponentCatalogSection {
  id: string;
  title: string;
  components: ComponentCatalogEntry[];
}

export const COMPONENT_CATALOG_SECTIONS: ComponentCatalogSection[] = [
  {
    id: 'actions',
    title: 'Actions',
    components: [
      {
        name: 'Button',
        description:
          'Prompts the most common actions in a UI, from primary to ghost.',
        icon: IconClick,
        status: 'v1.0.0',
        storybookId: 'primitives-button--all-variants',
      },
      {
        name: 'Segmented Control',
        description:
          'Lets people switch between a small set of mutually exclusive views.',
        icon: IconLayoutDistributeHorizontal,
        status: 'v1.0.0',
        storybookId: 'primitives-segmented-control--default',
      },
      {
        name: 'Toggle',
        description:
          'A two-state button for switching a single setting on or off.',
        icon: IconToggleLeft,
        status: 'v1.0.0',
        storybookId: 'primitives-toggle--default',
      },
      {
        name: 'Toggle Group',
        description:
          'A set of toggles where one or more options can be selected at once.',
        icon: IconBoxMultiple,
        status: 'coming-soon',
        hidden: true,
      },
      {
        name: 'Toolbar',
        description:
          'Groups related buttons and controls into a single, compact row.',
        icon: IconTools,
        status: 'v1.0.0',
        storybookId: 'primitives-actiontoolbar--basic',
      },
    ],
  },
  {
    id: 'data-display',
    title: 'Data display',
    components: [
      {
        name: 'Avatar',
        description:
          'Represents a person or entity with an image, icon, or initials.',
        icon: IconUserCircle,
        status: 'v1.0.0',
        storybookId: 'primitives-avatar--basic',
      },
      {
        name: 'Badge',
        description:
          'A small label for status, count, or category next to other content.',
        icon: IconBadge,
        status: 'v1.0.0',
        storybookId: 'primitives-badge--all-variants',
      },
      {
        name: 'Chart',
        description:
          'Flexible data visualizations for patterns, trends, and comparisons.',
        icon: IconChartBar,
        status: 'v1.0.0',
        storybookId: 'primitives-chart--stacked-area-chart',
        hidden: true,
      },
      {
        name: 'Code Block',
        description:
          'Displays formatted, syntax-highlighted source code in a document.',
        icon: IconCode,
        status: 'coming-soon',
        hidden: true,
      },
      {
        name: 'Data Grid',
        description:
          'A dense, sortable table for browsing and editing large datasets.',
        icon: IconTable,
        status: 'v1.0.0',
        storybookId: 'primitives-datagrid--basic',
      },
      {
        name: 'List',
        description: 'Presents a vertical collection of related items or rows.',
        icon: IconList,
        status: 'coming-soon',
        hidden: true,
      },
      {
        name: 'Progress',
        description:
          'Shows the completion state of a task that takes a known amount of time.',
        icon: IconProgress,
        status: 'v1.0.0',
        storybookId: 'primitives-progress--default',
      },
      {
        name: 'Tree View',
        description:
          'Displays hierarchical data as an expandable, nested list.',
        icon: IconBinaryTree2,
        status: 'coming-soon',
        hidden: true,
      },
    ],
  },
  {
    id: 'feedback',
    title: 'Feedback',
    components: [
      {
        name: 'Alert',
        description:
          'Calls attention to important information inline within a page.',
        icon: IconAlertTriangle,
        status: 'v1.0.0',
        storybookId: 'primitives-alert--basic',
      },
      {
        name: 'Alert Dialog',
        description:
          'Interrupts the user to confirm a decision before proceeding.',
        icon: IconAlertOctagon,
        status: 'coming-soon',
        hidden: true,
      },
      {
        name: 'Banner',
        description:
          'A full-width message for announcements or system-level notices.',
        icon: IconSpeakerphone,
        status: 'v1.0.0',
        storybookId: 'primitives-banner--basic',
      },
      {
        name: 'Empty State',
        description:
          'Fills the space where content would normally appear with helpful guidance.',
        icon: IconMoodEmpty,
        status: 'v1.0.0',
        storybookId: 'primitives-emptystate--sizes',
      },
      {
        name: 'Page Loader',
        description:
          'A full-page loading indicator shown while a route or view initializes.',
        icon: IconLoader2,
        status: 'v1.0.0',
        storybookId: 'primitives-loader--page-loader',
      },
      {
        name: 'Skeleton',
        description:
          'A placeholder shape that mimics loading content before it renders.',
        icon: IconGhost,
        status: 'v1.0.0',
        storybookId: 'primitives-skeleton--basic',
      },
      {
        name: 'Sonner',
        description:
          'A brief toast notification that appears at the bottom of the screen and auto-dismisses.',
        icon: IconBell,
        status: 'v1.0.0',
        storybookId: 'primitives-sonner-toast--default',
      },
    ],
  },
  {
    id: 'inputs',
    title: 'Inputs',
    components: [
      {
        name: 'Checkbox',
        description: 'Lets people select one or more options from a set.',
        icon: IconSquareCheck,
        status: 'v1.0.0',
        storybookId: 'primitives-checkbox--default',
      },
      {
        name: 'Combobox',
        description:
          'A searchable input paired with a list of selectable suggestions.',
        icon: IconListSearch,
        status: 'v1.0.0',
        storybookId: 'primitives-combobox--basic',
      },
      {
        name: 'Date and time picker',
        description:
          'Combines date and time selection into a single, unified control.',
        icon: IconCalendarTime,
        status: 'v1.0.0',
        storybookId: 'primitives-datepicker--default',
        hidden: true,
      },
      {
        name: 'Date Picker',
        description:
          'Lets people select a single date from a calendar or text input.',
        icon: IconCalendar,
        status: 'v1.0.0',
        storybookId: 'primitives-datepicker--default',
      },
      {
        name: 'Date Range Picker',
        description:
          'Lets people select a start and end date as a single range.',
        icon: IconCalendarStats,
        status: 'v1.0.0',
        storybookId: 'primitives-daterangepicker--default',
      },
      {
        name: 'Date Time Range Picker',
        description:
          'Lets people select a start and end date and time as one range.',
        icon: IconCalendarEvent,
        status: 'v1.0.0',
        storybookId: 'primitives-datetimerangepicker--default',
      },
      {
        name: 'File Upload',
        description: 'Lets people select or drag and drop files to upload.',
        icon: IconUpload,
        status: 'coming-soon',
        hidden: true,
      },
      {
        name: 'Input',
        description:
          'A single-line field for entering and editing short text values.',
        icon: IconForms,
        status: 'v1.0.0',
        storybookId: 'primitives-input--default',
      },
      {
        name: 'Radio',
        description:
          'Lets people select exactly one option from a list of mutually exclusive choices.',
        icon: IconCircleDot,
        status: 'v1.0.0',
        storybookId: 'primitives-radio-group--default',
      },
      {
        name: 'Search',
        description:
          'An input optimized for querying and filtering content as you type.',
        icon: IconSearch,
        status: 'v1.0.0',
        storybookId: 'primitives-search--basic',
      },
      {
        name: 'Select',
        description:
          'Lets people choose one option from a list in a compact control.',
        icon: IconSelect,
        status: 'v1.0.0',
        storybookId: 'primitives-select--default',
      },
      {
        name: 'Slider',
        description:
          'Lets people choose a value or range from a continuous or stepped scale.',
        icon: IconAdjustmentsHorizontal,
        status: 'v1.0.0',
        storybookId: 'primitives-slider--default',
      },
      {
        name: 'Switch',
        description:
          'A single control for toggling a setting immediately on or off.',
        icon: IconToggleRight,
        status: 'v1.0.0',
        storybookId: 'primitives-switch--default',
      },
      {
        name: 'Text Area',
        description:
          'A multi-line field for entering and editing longer blocks of text.',
        icon: IconTextWrap,
        status: 'v1.0.0',
        storybookId: 'primitives-textarea--default',
      },
      {
        name: 'Time Picker',
        description: 'A visual time selector for hour and minute input.',
        icon: IconClock,
        status: 'v1.0.0',
        storybookId: 'primitives-timepicker--default',
      },
      {
        name: 'Time Range Picker',
        description:
          'Lets people select a start and end time as a single range.',
        icon: IconClockHour4,
        status: 'v1.0.0',
        storybookId: 'primitives-timerangepicker--default',
      },
    ],
  },
  {
    id: 'layout',
    title: 'Layout',
    components: [
      {
        name: 'Accordion',
        description:
          'Organizes content into expandable and collapsible sections.',
        icon: IconChevronsDown,
        status: 'v1.0.0',
        storybookId: 'primitives-accordion--basic',
      },
      {
        name: 'Aspect Ratio',
        description:
          'Constrains content to a consistent width-to-height ratio.',
        icon: IconAspectRatio,
        status: 'coming-soon',
        hidden: true,
      },
      {
        name: 'Card',
        description:
          'A flexible container for grouping related content and actions.',
        icon: IconId,
        status: 'v1.0.0',
        storybookId: 'primitives-card--basic',
      },
      {
        name: 'Collapsible',
        description: 'Shows or hides a single section of content on demand.',
        icon: IconLayoutSidebarRightCollapse,
        status: 'v1.0.0',
        storybookId: 'primitives-collapsible--basic',
      },
      {
        name: 'Dropdown Menu',
        description:
          'Displays a list of actions or options triggered from a button.',
        icon: IconMenu2,
        status: 'v1.0.0',
        storybookId: 'primitives-dropdown-menu--basic',
      },
      {
        name: 'Menu Bar',
        description:
          'A persistent horizontal menu for grouping related commands.',
        icon: IconMenu,
        status: 'coming-soon',
        hidden: true,
      },
      {
        name: 'Scroll',
        description: 'A styled, cross-browser-consistent scrollable container.',
        icon: IconArrowsMoveVertical,
        status: 'v1.0.0',
        storybookId: 'primitives-scrollarea--vertical',
      },
      {
        name: 'Separator',
        description:
          'A thin line that visually divides content into distinct groups.',
        icon: IconSeparatorHorizontal,
        status: 'v1.0.0',
        storybookId: 'primitives-separator--default',
      },
      {
        name: 'Topbar',
        description:
          'The persistent navigation bar at the top of authenticated apps.',
        icon: IconLayoutNavbar,
        status: 'v1.0.0',
        storybookId: 'primitives-topbar--docs',
      },
    ],
  },
  {
    id: 'navigation',
    title: 'Navigation',
    components: [
      {
        name: 'Breadcrumb',
        description:
          "Shows a user's location within a hierarchy and a path back to its root.",
        icon: IconChevronRight,
        status: 'v1.0.0',
        storybookId: 'primitives-breadcrumb--basic',
      },
      {
        name: 'Pagination',
        description:
          'Lets people navigate between pages of a large result set.',
        icon: IconDots,
        status: 'v1.0.0',
        storybookId: 'primitives-pagination--sizes',
      },
      {
        name: 'Sidebar',
        description:
          'Primary side navigation for moving between sections, modules, or apps.',
        icon: IconLayoutSidebar,
        status: 'coming-soon',
        hidden: true,
      },
      {
        name: 'Tabs',
        description:
          'Organizes content into separate views shown one at a time.',
        icon: IconFolders,
        status: 'v1.0.0',
        storybookId: 'primitives-tabs--basic',
      },
    ],
  },
  {
    id: 'overlays',
    title: 'Overlays',
    components: [
      {
        name: 'Command',
        description:
          'A searchable, keyboard-driven list of actions and commands.',
        icon: IconCommand,
        status: 'v1.0.0',
        storybookId: 'primitives-command--basic',
      },
      {
        name: 'Context Menu',
        description:
          "Shows relevant actions at the pointer's position on right-click.",
        icon: IconPointer,
        status: 'coming-soon',
        hidden: true,
      },
      {
        name: 'Drawer',
        description:
          'A panel that slides in from the edge of the screen for secondary tasks.',
        icon: IconLayoutSidebarRight,
        status: 'coming-soon',
        hidden: true,
      },
      {
        name: 'Dialog',
        description:
          'A modal window that focuses attention on a single task or decision.',
        icon: IconAppWindow,
        status: 'v1.0.0',
        storybookId: 'primitives-dialog--default',
      },
      {
        name: 'Popover',
        description:
          'Shows supplementary content anchored to a triggering element.',
        icon: IconMessage2,
        status: 'v1.0.0',
        storybookId: 'primitives-popover--basic',
      },
      {
        name: 'Select Panel',
        description:
          'A rich, searchable panel for choosing one or more items from a list.',
        icon: IconListCheck,
        status: 'coming-soon',
        hidden: true,
      },
      {
        name: 'Tooltip',
        description:
          'Shows a brief, contextual hint when hovering or focusing an element.',
        icon: IconHelp,
        status: 'v1.0.0',
        storybookId: 'primitives-tooltip--basic',
      },
    ],
  },
  {
    id: 'utilities',
    title: 'Utilities',
    components: [
      {
        name: 'Helper Text',
        description:
          'Provides supporting guidance or validation messages below a field.',
        icon: IconInfoCircle,
        status: 'v1.0.0',
        storybookId: 'primitives-helper-text--basic',
      },
      {
        name: 'KBD',
        description:
          'Renders a keyboard shortcut or key combination as visual text.',
        icon: IconKeyboard,
        status: 'v1.0.0',
        storybookId: 'primitives-kbd--default',
      },
      {
        name: 'Label',
        description:
          'Identifies a form field or control for both sighted and assistive use.',
        icon: IconTag,
        status: 'v1.0.0',
        storybookId: 'primitives-label--basic',
      },
    ],
  },
];

const SLUG_ALIASES: Record<string, string> = {
  toast: 'sonner',
  charts: 'chart',
  'date-time-picker': 'date-and-time-picker',
  kbd: 'kbd',
};

export interface ComponentCatalogListItem {
  name: string;
  slug: string;
  storybookId?: string;
}

/** Visible catalog components, flattened and sorted alphabetically by name. */
export const ALL_COMPONENTS: ComponentCatalogListItem[] =
  COMPONENT_CATALOG_SECTIONS.flatMap((section) => section.components)
    .filter((component) => !component.hidden)
    .map((component) => ({
      name: component.name,
      slug: slugify(component.name),
      storybookId: component.storybookId,
    }))
    .sort((a, b) => a.name.localeCompare(b.name));

export function getComponentBySlug(slug: string) {
  const resolved = SLUG_ALIASES[slug] ?? slug;
  return (
    COMPONENT_CATALOG_SECTIONS.flatMap((section) => section.components).find(
      (component) => slugify(component.name) === resolved
    ) ?? null
  );
}
