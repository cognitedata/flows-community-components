import type { ComponentStatusType } from './component-status-config';

export type PrimitiveCatalogSection = 'foundation' | 'primitive';
export type PrimitiveFigmaAvailability = 'yes' | 'unknown';

export interface PrimitiveCatalogEntry {
  slug: string;
  name: string;
  description: string;
  section: PrimitiveCatalogSection;
  status: ComponentStatusType;
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
  figmaUrl?: string;
  eosGaRequired: boolean | null;
  duneGaRequired: boolean | null;
  implemented: boolean;
  comingSoon: boolean;
  aliases?: string[];
}

type PrimitiveBadgeVariant = 'success' | 'warning' | 'gray';

const RAW_PRIMITIVES_CATALOG: PrimitiveCatalogSeed[] = [
  {
    slug: 'accordion',
    name: 'Accordion',
    description: 'Collapsible content sections',
    section: 'primitive',
    figmaUrl:
      'https://www.figma.com/design/pMnMQvfErZDJzWgrcWCIwZ/WIP---Aura-library?node-id=3620-25275&p=f&t=xt4XWsicLCdF8Uu1-0',
    eosGaRequired: true,
    duneGaRequired: true,
    implemented: true,
    comingSoon: false,
  },
  {
    slug: 'action-toolbar',
    name: 'Action toolbar',
    description: '',
    section: 'primitive',
    figmaUrl:
      'https://www.figma.com/design/pMnMQvfErZDJzWgrcWCIwZ/WIP---Aura-library?node-id=9131-21139&p=f&t=EaagDmzJhhlMjHU8-0',
    eosGaRequired: true,
    duneGaRequired: true,
    implemented: false,
    comingSoon: true,
  },
  {
    slug: 'alert',
    name: 'Alert',
    description: 'Display important messages',
    section: 'primitive',
    figmaUrl:
      'https://www.figma.com/design/pMnMQvfErZDJzWgrcWCIwZ/WIP---Aura-library?node-id=3772-28021&p=f&m=dev',
    eosGaRequired: true,
    duneGaRequired: true,
    implemented: true,
    comingSoon: false,
  },
  {
    slug: 'alert-dialog',
    name: 'Alert dialog',
    description: 'Modal confirmation dialogs',
    section: 'primitive',
    figmaUrl:
      'https://www.figma.com/design/pMnMQvfErZDJzWgrcWCIwZ/WIP---Aura-library?node-id=3772-28244&p=f&m=dev',
    eosGaRequired: false,
    duneGaRequired: true,
    implemented: true,
    comingSoon: false,
  },
  {
    slug: 'assets',
    name: 'Assets',
    description: 'Logos, illustrations, and related brand assets.',
    section: 'foundation',
    figmaUrl:
      'https://www.figma.com/design/pMnMQvfErZDJzWgrcWCIwZ/WIP---Aura-library?node-id=1711-16008&p=f&t=EaagDmzJhhlMjHU8-0',
    eosGaRequired: true,
    duneGaRequired: true,
    implemented: true,
    comingSoon: false,
  },
  {
    slug: 'avatar',
    name: 'Avatar',
    description: 'User profile images',
    section: 'primitive',
    figmaUrl:
      'https://www.figma.com/design/pMnMQvfErZDJzWgrcWCIwZ/WIP---Aura-library?node-id=2029-42286&m=dev',
    eosGaRequired: true,
    duneGaRequired: true,
    implemented: true,
    comingSoon: false,
  },
  {
    slug: 'badge',
    name: 'Badge',
    description: 'Small status indicators',
    section: 'primitive',
    figmaUrl:
      'https://www.figma.com/design/pMnMQvfErZDJzWgrcWCIwZ/WIP---Aura-library?node-id=6245-3107&p=f&m=dev',
    eosGaRequired: true,
    duneGaRequired: true,
    implemented: true,
    comingSoon: false,
  },
  {
    slug: 'banner',
    name: 'Banner',
    description: 'Full-width notifications',
    section: 'primitive',
    figmaUrl:
      'https://www.figma.com/design/pMnMQvfErZDJzWgrcWCIwZ/WIP---Aura-library?node-id=4631-19225&p=f&m=dev',
    eosGaRequired: true,
    duneGaRequired: true,
    implemented: true,
    comingSoon: false,
  },
  {
    slug: 'breadcrumb',
    name: 'Breadcrumb',
    description: 'Navigation hierarchy',
    section: 'primitive',
    figmaUrl:
      'https://www.figma.com/design/pMnMQvfErZDJzWgrcWCIwZ/WIP---Aura-library?node-id=4644-31870&p=f&m=dev',
    eosGaRequired: true,
    duneGaRequired: true,
    implemented: true,
    comingSoon: false,
    aliases: ['breadcrumb-topbar'],
  },
  {
    slug: 'button',
    name: 'Button',
    description: 'Clickable action elements',
    section: 'primitive',
    figmaUrl:
      'https://www.figma.com/design/pMnMQvfErZDJzWgrcWCIwZ/WIP---Aura-library?node-id=6245-15440&p=f&m=dev',
    eosGaRequired: true,
    duneGaRequired: true,
    implemented: true,
    comingSoon: false,
  },
  {
    slug: 'button-group',
    name: 'Button group',
    description: 'Grouped button actions',
    section: 'primitive',
    eosGaRequired: true,
    duneGaRequired: true,
    implemented: true,
    comingSoon: false,
  },
  {
    slug: 'calendar',
    name: 'Calendar',
    description: 'Date selection interface',
    section: 'primitive',
    figmaUrl:
      'https://www.figma.com/design/pMnMQvfErZDJzWgrcWCIwZ/WIP---Aura-library?node-id=4592-23048&p=f&m=dev',
    eosGaRequired: true,
    duneGaRequired: true,
    implemented: true,
    comingSoon: false,
  },
  {
    slug: 'card',
    name: 'Card',
    description: 'Grouped content container',
    section: 'primitive',
    figmaUrl:
      'https://www.figma.com/design/pMnMQvfErZDJzWgrcWCIwZ/WIP---Aura-library?node-id=5179-22207&p=f&m=dev',
    eosGaRequired: true,
    duneGaRequired: true,
    implemented: true,
    comingSoon: false,
    aliases: ['card-artifact-widget'],
  },
  {
    slug: 'checkbox',
    name: 'Checkbox',
    description: 'Multi-select input',
    section: 'primitive',
    figmaUrl:
      'https://www.figma.com/design/pMnMQvfErZDJzWgrcWCIwZ/WIP---Aura-library?node-id=6245-19596&p=f&m=dev',
    eosGaRequired: false,
    duneGaRequired: true,
    implemented: true,
    comingSoon: false,
  },
  {
    slug: 'collapsible',
    name: 'Collapsible',
    description: 'Expandable content',
    section: 'primitive',
    figmaUrl:
      'https://www.figma.com/design/pMnMQvfErZDJzWgrcWCIwZ/WIP---Aura-library?node-id=5848-12094&p=f&m=dev',
    eosGaRequired: true,
    duneGaRequired: true,
    implemented: true,
    comingSoon: false,
  },
  {
    slug: 'colors',
    name: 'Colors',
    description: 'Color palette and tokens',
    section: 'foundation',
    figmaUrl:
      'https://www.figma.com/design/pMnMQvfErZDJzWgrcWCIwZ/WIP---Aura-library?node-id=6494-23804&m=dev',
    eosGaRequired: true,
    duneGaRequired: true,
    implemented: true,
    comingSoon: false,
    aliases: ['color-tokens'],
  },
  {
    slug: 'combobox',
    name: 'Combobox',
    description: 'Searchable select input',
    section: 'primitive',
    figmaUrl:
      'https://www.figma.com/design/pMnMQvfErZDJzWgrcWCIwZ/WIP---Aura-library?node-id=6245-19783&p=f&m=dev',
    eosGaRequired: true,
    duneGaRequired: true,
    implemented: true,
    comingSoon: false,
  },
  {
    slug: 'command',
    name: 'Command',
    description: 'Command palette menu',
    section: 'primitive',
    figmaUrl:
      'https://www.figma.com/design/pMnMQvfErZDJzWgrcWCIwZ/WIP---Aura-library?node-id=6245-19094&p=f&m=dev',
    eosGaRequired: false,
    duneGaRequired: true,
    implemented: true,
    comingSoon: false,
  },
  {
    slug: 'context-menu',
    name: 'Context menu',
    description: 'Right-click action menu',
    section: 'primitive',
    figmaUrl:
      'https://www.figma.com/design/pMnMQvfErZDJzWgrcWCIwZ/WIP---Aura-library?node-id=6245-20850&p=f&m=dev',
    eosGaRequired: false,
    duneGaRequired: true,
    implemented: true,
    comingSoon: false,
  },
  {
    slug: 'count',
    name: 'Count',
    description: 'Numeric counter primitives',
    section: 'primitive',
    eosGaRequired: true,
    duneGaRequired: true,
    implemented: true,
    comingSoon: false,
  },
  {
    slug: 'date-picker',
    name: 'Date picker',
    description: 'Calendar date selector',
    section: 'primitive',
    figmaUrl:
      'https://www.figma.com/design/pMnMQvfErZDJzWgrcWCIwZ/WIP---Aura-library?node-id=4598-4912&p=f&m=dev',
    eosGaRequired: false,
    duneGaRequired: true,
    implemented: true,
    comingSoon: false,
  },
  {
    slug: 'datetime-picker',
    name: 'DateTime picker',
    description: 'Combined date and time selector',
    section: 'primitive',
    figmaUrl:
      'https://www.figma.com/design/pMnMQvfErZDJzWgrcWCIwZ/WIP---Aura-library?node-id=4598-4912&p=f&m=dev',
    eosGaRequired: false,
    duneGaRequired: true,
    implemented: false,
    comingSoon: true,
    aliases: ['datetime-input', 'datetime-picker-range'],
  },
  {
    slug: 'dialog',
    name: 'Dialog',
    description: 'Modal overlay windows',
    section: 'primitive',
    figmaUrl:
      'https://www.figma.com/design/pMnMQvfErZDJzWgrcWCIwZ/WIP---Aura-library?node-id=6245-22085&p=f&m=dev',
    eosGaRequired: true,
    duneGaRequired: true,
    implemented: true,
    comingSoon: false,
  },
  {
    slug: 'drawer',
    name: 'Drawer',
    description: 'Slide-in side panel',
    section: 'primitive',
    figmaUrl:
      'https://www.figma.com/design/pMnMQvfErZDJzWgrcWCIwZ/WIP---Aura-library?node-id=430-2779&m=dev',
    eosGaRequired: false,
    duneGaRequired: true,
    implemented: true,
    comingSoon: false,
  },
  {
    slug: 'dropdown-menu',
    name: 'Dropdown menu',
    description: 'Action menu list',
    section: 'primitive',
    figmaUrl:
      'https://www.figma.com/design/pMnMQvfErZDJzWgrcWCIwZ/WIP---Aura-library?node-id=6245-20850&p=f&m=dev',
    eosGaRequired: true,
    duneGaRequired: true,
    implemented: true,
    comingSoon: false,
  },
  {
    slug: 'effects',
    name: 'Effects',
    description: 'Shadows and visual effects',
    section: 'foundation',
    figmaUrl:
      'https://www.figma.com/design/pMnMQvfErZDJzWgrcWCIwZ/WIP---Aura-library?node-id=2236-53188&p=f&m=dev',
    eosGaRequired: true,
    duneGaRequired: true,
    implemented: true,
    comingSoon: false,
    aliases: ['shadow-effects'],
  },
  {
    slug: 'empty-state',
    name: 'Empty state',
    description: 'Empty-state illustrations and messaging',
    section: 'primitive',
    figmaUrl:
      'https://www.figma.com/design/pMnMQvfErZDJzWgrcWCIwZ/WIP---Aura-library?node-id=4652-32441&p=f&m=dev',
    eosGaRequired: true,
    duneGaRequired: true,
    implemented: false,
    comingSoon: true,
  },
  {
    slug: 'file-upload',
    name: 'File upload',
    description: '',
    section: 'primitive',
    figmaUrl:
      'https://www.figma.com/design/pMnMQvfErZDJzWgrcWCIwZ/WIP---Aura-library?node-id=9131-7927&p=f&t=EaagDmzJhhlMjHU8-0',
    eosGaRequired: true,
    duneGaRequired: true,
    implemented: false,
    comingSoon: true,
  },
  {
    slug: 'helper-text',
    name: 'Helper text',
    description: 'Input guidance text',
    section: 'primitive',
    figmaUrl:
      'https://www.figma.com/design/pMnMQvfErZDJzWgrcWCIwZ/WIP---Aura-library?node-id=5242-17162&p=f&m=dev',
    eosGaRequired: true,
    duneGaRequired: true,
    implemented: true,
    comingSoon: false,
  },
  {
    slug: 'hover-card',
    name: 'Hover card',
    description: 'Preview content on hover',
    section: 'primitive',
    eosGaRequired: true,
    duneGaRequired: true,
    implemented: true,
    comingSoon: false,
    aliases: ['hovercard'],
  },
  {
    slug: 'icons',
    name: 'Icons',
    description: 'System iconography and usage guidance',
    section: 'foundation',
    figmaUrl:
      'https://www.figma.com/design/pMnMQvfErZDJzWgrcWCIwZ/WIP---Aura-library?node-id=1711-16008&p=f&t=EaagDmzJhhlMjHU8-0',
    eosGaRequired: true,
    duneGaRequired: true,
    implemented: false,
    comingSoon: true,
  },
  {
    slug: 'input',
    name: 'Input',
    description: 'Text input field',
    section: 'primitive',
    figmaUrl:
      'https://www.figma.com/design/pMnMQvfErZDJzWgrcWCIwZ/WIP---Aura-library?node-id=6328-14086&m=dev',
    eosGaRequired: false,
    duneGaRequired: true,
    implemented: true,
    comingSoon: false,
  },
  {
    slug: 'input-group',
    name: 'Input group',
    description: 'Composed input with controls',
    section: 'primitive',
    eosGaRequired: true,
    duneGaRequired: true,
    implemented: true,
    comingSoon: false,
    aliases: ['input-group?'],
  },
  {
    slug: 'kbd',
    name: 'Kbd',
    description: 'Keyboard shortcut display',
    section: 'primitive',
    figmaUrl:
      'https://www.figma.com/design/pMnMQvfErZDJzWgrcWCIwZ/WIP---Aura-library?node-id=5296-21337&p=f&m=dev',
    eosGaRequired: false,
    duneGaRequired: true,
    implemented: true,
    comingSoon: false,
  },
  {
    slug: 'label',
    name: 'Label',
    description: 'Form field labels',
    section: 'primitive',
    figmaUrl:
      'https://www.figma.com/design/pMnMQvfErZDJzWgrcWCIwZ/WIP---Aura-library?node-id=5296-18977&p=f&m=dev',
    eosGaRequired: true,
    duneGaRequired: true,
    implemented: true,
    comingSoon: false,
  },
  {
    slug: 'layouts',
    name: 'Layout',
    description: 'Grid and container systems',
    section: 'foundation',
    figmaUrl:
      'https://www.figma.com/design/pMnMQvfErZDJzWgrcWCIwZ/WIP---Aura-library?node-id=5240-31641&p=f&m=dev',
    eosGaRequired: true,
    duneGaRequired: true,
    implemented: false,
    comingSoon: true,
    aliases: [
      'layout-default',
      'layout-dashboard',
      'layout-responsive-breakpoints',
      'layout-split-view',
    ],
  },
  {
    slug: 'list',
    name: 'List',
    description: 'Structured list layouts',
    section: 'primitive',
    eosGaRequired: true,
    duneGaRequired: true,
    implemented: true,
    comingSoon: false,
  },
  {
    slug: 'menubar',
    name: 'Menubar',
    description: 'Application menu bar',
    section: 'primitive',
    figmaUrl:
      'https://www.figma.com/design/pMnMQvfErZDJzWgrcWCIwZ/WIP---Aura-library?node-id=6245-20850&p=f&m=dev',
    eosGaRequired: false,
    duneGaRequired: true,
    implemented: true,
    comingSoon: false,
    aliases: ['menu-bar'],
  },
  {
    slug: 'page-loader',
    name: 'Page loader',
    description: 'Loading state for full-page transitions',
    section: 'primitive',
    eosGaRequired: true,
    duneGaRequired: true,
    implemented: false,
    comingSoon: true,
  },
  {
    slug: 'pagination',
    name: 'Pagination',
    description: 'Page navigation controls',
    section: 'primitive',
    figmaUrl:
      'https://www.figma.com/design/pMnMQvfErZDJzWgrcWCIwZ/WIP---Aura-library?node-id=6328-15085&p=f&m=dev',
    eosGaRequired: true,
    duneGaRequired: true,
    implemented: true,
    comingSoon: false,
  },
  {
    slug: 'popover',
    name: 'Popover',
    description: 'Floating content panel',
    section: 'primitive',
    figmaUrl:
      'https://www.figma.com/design/pMnMQvfErZDJzWgrcWCIwZ/WIP---Aura-library?node-id=6328-15276&p=f&m=dev',
    eosGaRequired: true,
    duneGaRequired: true,
    implemented: true,
    comingSoon: false,
  },
  {
    slug: 'progress',
    name: 'Progress',
    description: 'Progress indicator bar',
    section: 'primitive',
    figmaUrl:
      'https://www.figma.com/design/pMnMQvfErZDJzWgrcWCIwZ/WIP---Aura-library?node-id=6328-15343&p=f&m=dev',
    eosGaRequired: true,
    duneGaRequired: true,
    implemented: true,
    comingSoon: false,
  },
  {
    slug: 'radio-group',
    name: 'Radio group',
    description: 'Single-select options',
    section: 'primitive',
    figmaUrl:
      'https://www.figma.com/design/pMnMQvfErZDJzWgrcWCIwZ/WIP---Aura-library?node-id=6328-15426&p=f&m=dev',
    eosGaRequired: false,
    duneGaRequired: true,
    implemented: true,
    comingSoon: false,
    aliases: ['radio'],
  },
  {
    slug: 'select',
    name: 'Select',
    description: 'Dropdown selection',
    section: 'primitive',
    figmaUrl:
      'https://www.figma.com/design/pMnMQvfErZDJzWgrcWCIwZ/WIP---Aura-library?node-id=6328-15573&p=f&m=dev',
    eosGaRequired: true,
    duneGaRequired: true,
    implemented: true,
    comingSoon: false,
  },
  {
    slug: 'select-panel',
    name: 'Select panel',
    description: '',
    section: 'primitive',
    figmaUrl:
      'https://www.figma.com/design/pMnMQvfErZDJzWgrcWCIwZ/WIP---Aura-library?node-id=9131-21635&p=f&t=EaagDmzJhhlMjHU8-0',
    eosGaRequired: false,
    duneGaRequired: true,
    implemented: false,
    comingSoon: true,
  },
  {
    slug: 'separator',
    name: 'Separator',
    description: 'Visual content divider',
    section: 'primitive',
    figmaUrl:
      'https://www.figma.com/design/pMnMQvfErZDJzWgrcWCIwZ/WIP---Aura-library?node-id=6328-16069&p=f&m=dev',
    eosGaRequired: true,
    duneGaRequired: true,
    implemented: true,
    comingSoon: false,
  },
  {
    slug: 'sidebar',
    name: 'Sidebar',
    description: 'Navigation side panel',
    section: 'primitive',
    figmaUrl:
      'https://www.figma.com/design/pMnMQvfErZDJzWgrcWCIwZ/WIP---Aura-library?node-id=6328-16171&p=f&m=dev',
    eosGaRequired: null,
    duneGaRequired: true,
    implemented: true,
    comingSoon: false,
  },
  {
    slug: 'skeleton',
    name: 'Skeleton',
    description: 'Loading placeholders',
    section: 'primitive',
    eosGaRequired: true,
    duneGaRequired: true,
    implemented: true,
    comingSoon: false,
  },
  {
    slug: 'slider',
    name: 'Slider',
    description: 'Range input control',
    section: 'primitive',
    figmaUrl:
      'https://www.figma.com/design/pMnMQvfErZDJzWgrcWCIwZ/WIP---Aura-library?node-id=6331-21430&p=f&m=dev',
    eosGaRequired: false,
    duneGaRequired: true,
    implemented: true,
    comingSoon: false,
  },
  {
    slug: 'sonner-toast',
    name: 'Sonner',
    description: 'Toast notifications',
    section: 'primitive',
    figmaUrl:
      'https://www.figma.com/design/pMnMQvfErZDJzWgrcWCIwZ/WIP---Aura-library?node-id=6331-21307&p=f&m=dev',
    eosGaRequired: true,
    duneGaRequired: true,
    implemented: true,
    comingSoon: false,
    aliases: ['sonner'],
  },
  {
    slug: 'swap-slot',
    name: 'Swap slot',
    description: 'Content transition primitive',
    section: 'primitive',
    figmaUrl:
      'https://www.figma.com/design/pMnMQvfErZDJzWgrcWCIwZ/WIP---Aura-library?node-id=6331-21178&p=f&m=dev',
    eosGaRequired: null,
    duneGaRequired: true,
    implemented: true,
    comingSoon: false,
    aliases: ['swapslot', 'swapslot-all-components'],
  },
  {
    slug: 'switch',
    name: 'Switch',
    description: 'Toggle on/off control',
    section: 'primitive',
    figmaUrl:
      'https://www.figma.com/design/pMnMQvfErZDJzWgrcWCIwZ/WIP---Aura-library?node-id=6331-21063&p=f&m=dev',
    eosGaRequired: true,
    duneGaRequired: true,
    implemented: true,
    comingSoon: false,
  },
  {
    slug: 'table',
    name: 'Table',
    description: 'Structured data display',
    section: 'primitive',
    figmaUrl:
      'https://www.figma.com/design/pMnMQvfErZDJzWgrcWCIwZ/WIP---Aura-library?node-id=5840-14746&p=f&m=dev',
    eosGaRequired: null,
    duneGaRequired: null,
    implemented: true,
    comingSoon: false,
  },
  {
    slug: 'tabs',
    name: 'Tabs',
    description: 'Tabbed content panels',
    section: 'primitive',
    figmaUrl:
      'https://www.figma.com/design/pMnMQvfErZDJzWgrcWCIwZ/WIP---Aura-library?node-id=6331-20783&p=f&m=dev',
    eosGaRequired: false,
    duneGaRequired: true,
    implemented: true,
    comingSoon: false,
  },
  {
    slug: 'textarea',
    name: 'Textarea',
    description: 'Multi-line text input',
    section: 'primitive',
    figmaUrl:
      'https://www.figma.com/design/pMnMQvfErZDJzWgrcWCIwZ/WIP---Aura-library?node-id=6328-19593&p=f&m=dev',
    eosGaRequired: false,
    duneGaRequired: true,
    implemented: true,
    comingSoon: false,
  },
  {
    slug: 'time-input',
    name: 'Time input',
    description: 'Time selection field',
    section: 'primitive',
    figmaUrl:
      'https://www.figma.com/design/pMnMQvfErZDJzWgrcWCIwZ/WIP---Aura-library?node-id=4598-4912&p=f&m=dev',
    eosGaRequired: null,
    duneGaRequired: null,
    implemented: true,
    comingSoon: false,
    aliases: ['time-picker', 'time-picker-single'],
  },
  {
    slug: 'time-picker-range',
    name: 'Time picker (range)',
    description: 'Range-based time selection',
    section: 'primitive',
    figmaUrl:
      'https://www.figma.com/design/pMnMQvfErZDJzWgrcWCIwZ/WIP---Aura-library?node-id=4598-4912&p=f&m=dev',
    eosGaRequired: null,
    duneGaRequired: null,
    implemented: false,
    comingSoon: true,
  },
  {
    slug: 'toggle',
    name: 'Toggle',
    description: 'Binary state button',
    section: 'primitive',
    figmaUrl:
      'https://www.figma.com/design/pMnMQvfErZDJzWgrcWCIwZ/WIP---Aura-library?node-id=6331-20464&p=f&m=dev',
    eosGaRequired: true,
    duneGaRequired: true,
    implemented: true,
    comingSoon: false,
  },
  {
    slug: 'toolbar',
    name: 'Toolbar',
    description: 'Action toolbar with grouped controls',
    section: 'primitive',
    figmaUrl:
      'https://www.figma.com/design/pMnMQvfErZDJzWgrcWCIwZ/WIP---Aura-library?node-id=6985-10104&p=f&m=dev',
    eosGaRequired: true,
    duneGaRequired: true,
    implemented: true,
    comingSoon: false,
  },
  {
    slug: 'tooltip',
    name: 'Tooltip',
    description: 'Contextual help text',
    section: 'primitive',
    figmaUrl:
      'https://www.figma.com/design/pMnMQvfErZDJzWgrcWCIwZ/WIP---Aura-library?node-id=6331-20385&p=f&m=dev',
    eosGaRequired: true,
    duneGaRequired: true,
    implemented: true,
    comingSoon: false,
  },
  {
    slug: 'topbar',
    name: 'Topbar',
    description: 'Application top bar',
    section: 'primitive',
    figmaUrl:
      'https://www.figma.com/design/pMnMQvfErZDJzWgrcWCIwZ/WIP---Aura-library?node-id=5291-14625&p=f&m=dev',
    eosGaRequired: true,
    duneGaRequired: true,
    implemented: true,
    comingSoon: false,
    aliases: ['breadcrumb-topbar'],
  },
  {
    slug: 'treeview',
    name: 'TreeView',
    description: 'Hierarchical tree navigation',
    section: 'primitive',
    figmaUrl:
      'https://www.figma.com/design/pMnMQvfErZDJzWgrcWCIwZ/WIP---Aura-library?node-id=6331-19698&p=f&t=GliNjcCWyFkWS9tg-0',
    eosGaRequired: true,
    duneGaRequired: true,
    implemented: true,
    comingSoon: false,
    aliases: ['tree-view'],
  },
  {
    slug: 'typography',
    name: 'Typography',
    description: 'Text styles and scales',
    section: 'foundation',
    figmaUrl:
      'https://www.figma.com/design/pMnMQvfErZDJzWgrcWCIwZ/WIP---Aura-library?node-id=2236-53187&p=f&m=dev',
    eosGaRequired: true,
    duneGaRequired: true,
    implemented: true,
    comingSoon: false,
  },
];

const metadataModules = import.meta.glob<{
  [key: string]: { status?: ComponentStatusType };
}>('@/components/ui/aura/*/*.metadata.ts', { eager: true });

function toPascalCase(slug: string): string {
  return slug
    .split('-')
    .filter((part) => part.length > 0)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join('');
}

function getStatusFromMetadata(
  seed: PrimitiveCatalogSeed
): ComponentStatusType {
  const candidates = [seed.slug, ...(seed.aliases ?? [])];
  for (const candidate of candidates) {
    const metadataPath = `/src/components/ui/aura/${candidate}/${candidate}.metadata.ts`;
    const metadataModule = metadataModules[metadataPath];
    if (!metadataModule) continue;
    const exportName = `${toPascalCase(candidate)}Metadata`;
    const meta = metadataModule[exportName as keyof typeof metadataModule] as
      | { status?: ComponentStatusType }
      | undefined;
    if (meta?.status) return meta.status;
  }
  return 'draft';
}

export const PRIMITIVES_CATALOG: PrimitiveCatalogEntry[] =
  RAW_PRIMITIVES_CATALOG.map((seed) => ({
    ...seed,
    status: getStatusFromMetadata(seed),
    figmaAvailability: seed.figmaUrl ? 'yes' : 'unknown',
  }));

export function getPrimitiveCatalogBySection(
  section: PrimitiveCatalogSection
): PrimitiveCatalogEntry[] {
  return PRIMITIVES_CATALOG.filter((entry) => entry.section === section).sort(
    (a, b) => a.name.localeCompare(b.name)
  );
}

export function getPrimitiveCatalogEntry(
  slug: string
): PrimitiveCatalogEntry | null {
  const normalizedSlug = slug.toLowerCase();
  return (
    PRIMITIVES_CATALOG.find((entry) => {
      if (entry.slug === normalizedSlug) return true;
      return (
        entry.aliases?.some(
          (alias) => alias.toLowerCase() === normalizedSlug
        ) ?? false
      );
    }) || null
  );
}

export function getPrimitiveFigmaLabel(
  availability: PrimitiveFigmaAvailability
): string {
  switch (availability) {
    case 'yes':
      return 'Figma';
    default:
      return 'Figma unknown';
  }
}

export function getPrimitiveFigmaBadgeProps(
  availability: PrimitiveFigmaAvailability
): {
  variant: PrimitiveBadgeVariant;
  outline: boolean;
  className?: string;
} {
  if (availability === 'yes') {
    return { variant: 'gray', outline: true };
  }
  return {
    variant: 'gray',
    outline: true,
    className: 'border-dashed opacity-75',
  };
}

export function getPrimitiveGaLabel(
  required: boolean | null,
  product: 'Eos' | 'Dune'
): string {
  if (required === true) return `${product} GA: Required`;
  if (required === false) return `${product} GA: Not required`;
  return `${product} GA: Unknown`;
}

export function getPrimitiveGaBadgeProps(required: boolean | null): {
  variant: PrimitiveBadgeVariant;
  outline: boolean;
  className?: string;
} {
  if (required === true) return { variant: 'success', outline: true };
  if (required === false)
    return { variant: 'gray', outline: true, className: 'opacity-80' };
  return {
    variant: 'gray',
    outline: true,
    className: 'border-dashed opacity-80',
  };
}

export function getPrimitiveFigmaUrl(
  entry: PrimitiveCatalogEntry
): string | null {
  return entry.figmaUrl || null;
}
