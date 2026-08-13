import {
  IconAdjustments,
  IconAdjustmentsHorizontal,
  IconAlertOctagon,
  IconAlertTriangle,
  IconArrowsMoveVertical,
  IconAspectRatio,
  IconBellRinging,
  IconBinaryTree2,
  IconCalendar,
  IconCalendarStats,
  IconChartBar,
  IconChevronRight,
  IconChevronsDown,
  IconClick,
  IconClockHour4,
  IconClockStop,
  IconCode,
  IconCommand,
  IconDots,
  IconForms,
  IconGhost,
  IconId,
  IconInfoCircle,
  IconKeyboard,
  IconLayoutGrid,
  IconLayoutNavbar,
  IconLayoutSidebarRightCollapse,
  IconList,
  IconListSearch,
  IconLoader2,
  IconMenu,
  IconMenu2,
  IconMoodEmpty,
  IconRefresh,
  IconSearch,
  IconSelect,
  IconSeparatorHorizontal,
  IconSpeakerphone,
  IconSquare,
  IconSquareCheck,
  IconTable,
  IconTag,
  IconTextWrap,
  IconToggleLeft,
  IconToggleRight,
  IconUpload,
  IconUserCircle,
  type Icon as TablerIcon,
} from '@tabler/icons-react';

import { slugify } from '@/lib/utils';

export interface ComponentCatalogEntry {
  name: string;
  description: string;
  icon: TablerIcon;
  /** Storybook story id, e.g. "primitives-button--basic" — omitted if no story exists yet */
  storybookId?: string;
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
        storybookId: 'primitives-button--all-variants',
      },
      {
        name: 'Segmented Control',
        description:
          'Lets people switch between a small set of mutually exclusive views.',
        icon: IconToggleLeft,
        storybookId: 'primitives-segmented-control--default',
      },
      {
        name: 'Toggle',
        description:
          'A two-state button for switching a single setting on or off.',
        icon: IconToggleRight,
        storybookId: 'primitives-toggle--default',
      },
      {
        name: 'Toggle Group',
        description:
          'A set of toggles where one or more options can be selected at once.',
        icon: IconAdjustmentsHorizontal,
      },
      {
        name: 'Toolbar',
        description:
          'Groups related buttons and controls into a single, compact row.',
        icon: IconLayoutNavbar,
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
        storybookId: 'primitives-avatar--basic',
      },
      {
        name: 'Badge',
        description:
          'A small label for status, count, or category next to other content.',
        icon: IconTag,
        storybookId: 'primitives-badge--all-variants',
      },
      {
        name: 'Charts',
        description:
          'Categorical and status-mapped series for visualizing data at a glance.',
        icon: IconChartBar,
        storybookId: 'primitives-chart--bar-chart-story',
      },
      {
        name: 'Code Block',
        description:
          'Displays formatted, syntax-highlighted source code in a document.',
        icon: IconCode,
      },
      {
        name: 'Data Grid',
        description:
          'A dense, sortable table for browsing and editing large datasets.',
        icon: IconTable,
        storybookId: 'primitives-datagrid--basic',
      },
      {
        name: 'List',
        description: 'Presents a vertical collection of related items or rows.',
        icon: IconList,
      },
      {
        name: 'Progress',
        description:
          'Shows the completion state of a task that takes a known amount of time.',
        icon: IconLoader2,
        storybookId: 'primitives-progress--default',
      },
      {
        name: 'Tree View',
        description:
          'Displays hierarchical data as an expandable, nested list.',
        icon: IconBinaryTree2,
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
        storybookId: 'primitives-alert--basic',
      },
      {
        name: 'Alert Dialog',
        description:
          'Interrupts the user to confirm a decision before proceeding.',
        icon: IconAlertOctagon,
      },
      {
        name: 'Banner',
        description:
          'A full-width message for announcements or system-level notices.',
        icon: IconSpeakerphone,
        storybookId: 'primitives-banner--basic',
      },
      {
        name: 'Empty State',
        description:
          'Fills the space where content would normally appear with helpful guidance.',
        icon: IconMoodEmpty,
        storybookId: 'primitives-emptystate--sizes',
      },
      {
        name: 'Page Loader',
        description:
          'A full-page loading indicator shown while a route or view initializes.',
        icon: IconRefresh,
        storybookId: 'primitives-loader--page-loader',
      },
      {
        name: 'Skeleton',
        description:
          'A placeholder shape that mimics loading content before it renders.',
        icon: IconGhost,
        storybookId: 'primitives-skeleton--basic',
      },
      {
        name: 'Toast',
        description:
          'A brief, non-blocking message that appears temporarily to confirm an action.',
        icon: IconBellRinging,
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
        storybookId: 'primitives-checkbox--default',
      },
      {
        name: 'Combobox',
        description:
          'A searchable input paired with a list of selectable suggestions.',
        icon: IconListSearch,
        storybookId: 'primitives-combobox--basic',
      },
      {
        name: 'Date Picker',
        description:
          'Lets people select a single date from a calendar or text input.',
        icon: IconCalendar,
        storybookId: 'primitives-datepicker--default',
      },
      {
        name: 'Date Range Picker',
        description:
          'Lets people select a start and end date as a single range.',
        icon: IconCalendarStats,
        storybookId: 'primitives-daterangepicker--default',
      },
      {
        name: 'Date Time Picker',
        description:
          'Combines date and time selection into a single, unified control.',
        icon: IconClockHour4,
      },
      {
        name: 'Date Time Range Picker',
        description:
          'Lets people select a start and end date and time as one range.',
        icon: IconClockStop,
        storybookId: 'primitives-datetimerangepicker--default',
      },
      {
        name: 'File Upload',
        description: 'Lets people select or drag and drop files to upload.',
        icon: IconUpload,
      },
      {
        name: 'Input',
        description:
          'A single-line field for entering and editing short text values.',
        icon: IconForms,
        storybookId: 'primitives-input--default',
      },
      {
        name: 'Radio',
        description:
          'Lets people select exactly one option from a set of choices.',
        icon: IconAdjustments,
        storybookId: 'primitives-radio-group--default',
      },
      {
        name: 'Search',
        description:
          'An input optimized for querying and filtering content as you type.',
        icon: IconSearch,
        storybookId: 'primitives-search--basic',
      },
      {
        name: 'Select',
        description:
          'Lets people choose one option from a list in a compact control.',
        icon: IconSelect,
        storybookId: 'primitives-select--default',
      },
      {
        name: 'Slider',
        description:
          'Lets people choose a value or range from a continuous or stepped scale.',
        icon: IconAdjustmentsHorizontal,
        storybookId: 'primitives-slider--default',
      },
      {
        name: 'Switch',
        description:
          'A single control for toggling a setting immediately on or off.',
        icon: IconToggleRight,
        storybookId: 'primitives-switch--default',
      },
      {
        name: 'Text Area',
        description:
          'A multi-line field for entering and editing longer blocks of text.',
        icon: IconTextWrap,
        storybookId: 'primitives-textarea--default',
      },
      {
        name: 'Time Range Picker',
        description:
          'Lets people select a start and end time as a single range.',
        icon: IconClockStop,
        storybookId: 'primitives-timepicker--default',
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
        storybookId: 'primitives-accordion--basic',
      },
      {
        name: 'Aspect Ratio',
        description:
          'Constrains content to a consistent width-to-height ratio.',
        icon: IconAspectRatio,
      },
      {
        name: 'Card',
        description:
          'A flexible container for grouping related content and actions.',
        icon: IconId,
        storybookId: 'primitives-card--basic',
      },
      {
        name: 'Collapsible',
        description: 'Shows or hides a single section of content on demand.',
        icon: IconLayoutSidebarRightCollapse,
        storybookId: 'primitives-collapsible--basic',
      },
      {
        name: 'Dropdown Menu',
        description:
          'Displays a list of actions or options triggered from a button.',
        icon: IconMenu2,
        storybookId: 'primitives-dropdown-menu--basic',
      },
      {
        name: 'Menu Bar',
        description:
          'A persistent horizontal menu for grouping related commands.',
        icon: IconMenu,
      },
      {
        name: 'Separator',
        description:
          'A thin line that visually divides content into distinct groups.',
        icon: IconSeparatorHorizontal,
        storybookId: 'primitives-separator--default',
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
        storybookId: 'primitives-breadcrumb--basic',
      },
      {
        name: 'Pagination',
        description:
          'Lets people navigate between pages of a large result set.',
        icon: IconDots,
        storybookId: 'primitives-pagination--sizes',
      },
      {
        name: 'Tabs',
        description:
          'Organizes content into separate views shown one at a time.',
        icon: IconLayoutGrid,
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
        storybookId: 'primitives-command--basic',
      },
      {
        name: 'Context Menu',
        description:
          "Shows relevant actions at the pointer's position on right-click.",
        icon: IconMenu2,
      },
      {
        name: 'Dialog',
        description:
          'A modal window that focuses attention on a single task or decision.',
        icon: IconSquare,
        storybookId: 'primitives-dialog--default',
      },
      {
        name: 'Popover',
        description:
          'Shows supplementary content anchored to a triggering element.',
        icon: IconInfoCircle,
        storybookId: 'primitives-popover--basic',
      },
      {
        name: 'Select Panel',
        description:
          'A rich, searchable panel for choosing one or more items from a list.',
        icon: IconListSearch,
      },
      {
        name: 'Tooltip',
        description:
          'Shows a brief, contextual hint when hovering or focusing an element.',
        icon: IconInfoCircle,
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
        storybookId: 'primitives-helper-text--basic',
      },
      {
        name: 'Kbd',
        description:
          'Renders a keyboard shortcut or key combination as visual text.',
        icon: IconKeyboard,
        storybookId: 'primitives-kbd--default',
      },
      {
        name: 'Label',
        description:
          'Identifies a form field or control for both sighted and assistive use.',
        icon: IconTag,
        storybookId: 'primitives-label--basic',
      },
      {
        name: 'Scroll',
        description: 'A styled, cross-browser-consistent scrollable container.',
        icon: IconArrowsMoveVertical,
        storybookId: 'primitives-scrollarea--vertical',
      },
    ],
  },
];

export interface ComponentCatalogListItem {
  name: string;
  slug: string;
  storybookId?: string;
}

/** Every component across all sections, flattened and sorted alphabetically by name. */
export const ALL_COMPONENTS: ComponentCatalogListItem[] =
  COMPONENT_CATALOG_SECTIONS.flatMap((section) => section.components)
    .map((component) => ({
      name: component.name,
      slug: slugify(component.name),
      storybookId: component.storybookId,
    }))
    .sort((a, b) => a.name.localeCompare(b.name));

export function getComponentBySlug(slug: string) {
  return (
    COMPONENT_CATALOG_SECTIONS.flatMap((section) => section.components).find(
      (component) => slugify(component.name) === slug
    ) ?? null
  );
}
