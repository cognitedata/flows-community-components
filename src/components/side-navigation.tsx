import { IconChevronRight } from '@tabler/icons-react';
import * as React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { type CogDocsPage, cogdocsPages } from 'virtual:cogdocs';

import { cn } from '@/lib/utils';

interface NavigationItem {
  href: string;
  label: string;
  isSubsection?: boolean;
  children?: NavigationItem[];
}

interface SideNavigationProps {
  items: NavigationItem[];
  className?: string;
}

const primitivesNavigation: NavigationItem[] = [
  {
    href: '#',
    label: 'Foundations',
    isSubsection: true,
    children: [
      { href: '/primitives/colors', label: 'Colors' },
      { href: '/primitives/effects', label: 'Effects' },
      // { href: '/primitives/icons', label: 'Icons' },
      { href: '/primitives/layouts', label: 'Layouts' },
      // { href: '/primitives/motion-design', label: 'Motion design' },
      // { href: '/primitives/theming', label: 'Theming' },
      { href: '/primitives/typography', label: 'Typography' },
    ],
  },
  {
    href: '#',
    label: 'Primitives',
    isSubsection: true,
    children: [
      { href: '/primitives/accordion', label: 'Accordion' },
      { href: '/primitives/alert', label: 'Alert' },
      { href: '/primitives/alert-dialog', label: 'Alert dialog' },
      { href: '/primitives/avatar', label: 'Avatar' },
      { href: '/primitives/badge', label: 'Badge' },
      { href: '/primitives/banner', label: 'Banner' },
      { href: '/primitives/breadcrumb', label: 'Breadcrumb' },
      { href: '/primitives/button', label: 'Button' },
      { href: '/primitives/button-group', label: 'Button group' },
      { href: '/primitives/calendar', label: 'Calendar' },
      { href: '/primitives/card', label: 'Card' },
      { href: '/primitives/chart', label: 'Chart' },
      { href: '/primitives/checkbox', label: 'Checkbox' },
      { href: '/primitives/collapsible', label: 'Collapsible' },
      { href: '/primitives/combobox', label: 'Combobox' },
      { href: '/primitives/command', label: 'Command' },
      { href: '/primitives/context-menu', label: 'Context menu' },
      { href: '/primitives/count', label: 'Count' },
      { href: '/primitives/date-picker', label: 'Date picker' },
      { href: '/primitives/dialog', label: 'Dialog' },
      { href: '/primitives/drawer', label: 'Drawer' },
      { href: '/primitives/dropdown-menu', label: 'Dropdown menu' },
      { href: '/primitives/helper-text', label: 'Helper text' },
      { href: '/primitives/hover-card', label: 'Hover card' },
      { href: '/primitives/input', label: 'Input' },
      { href: '/primitives/input-group', label: 'Input group' },
      { href: '/primitives/kbd', label: 'Kbd' },
      { href: '/primitives/label', label: 'Label' },
      { href: '/primitives/list', label: 'List' },
      { href: '/primitives/menubar', label: 'Menubar' },
      { href: '/primitives/pagination', label: 'Pagination' },
      { href: '/primitives/popover', label: 'Popover' },
      { href: '/primitives/progress', label: 'Progress' },
      { href: '/primitives/radio-group', label: 'Radio group' },
      { href: '/primitives/segmented-control', label: 'Segmented control' },
      { href: '/primitives/select', label: 'Select' },
      { href: '/primitives/separator', label: 'Separator' },
      { href: '/primitives/skeleton', label: 'Skeleton' },
      { href: '/primitives/sidebar', label: 'Sidebar' },
      { href: '/primitives/slider', label: 'Slider' },
      { href: '/primitives/sonner', label: 'Sonner' },
      { href: '/primitives/swap-slot', label: 'Swap slot' },
      { href: '/primitives/switch', label: 'Switch' },
      { href: '/primitives/table', label: 'Table' },
      { href: '/primitives/tabs', label: 'Tabs' },
      { href: '/primitives/textarea', label: 'Textarea' },
      { href: '/primitives/time-input', label: 'Time input' },
      { href: '/primitives/toggle', label: 'Toggle' },
      { href: '/primitives/tooltip', label: 'Tooltip' },
      { href: '/primitives/topbar', label: 'Topbar' },
      { href: '/primitives/treeview', label: 'TreeView' },
    ],
  },
  {
    href: '#',
    label: 'Artifacts',
    isSubsection: true,
    children: [
      { href: '/primitives/artifact-chart', label: 'Chart' },
      { href: '/primitives/artifact-count', label: 'Count' },
      { href: '/primitives/artifact-list', label: 'List' },
      { href: '/primitives/artifact-progress', label: 'Progress' },
    ],
  },
];

const patternsNavigation: NavigationItem[] = [
  {
    href: '#',
    label: 'Patterns',
    isSubsection: true,
    children: [
      { href: '/patterns/agent-chat', label: 'Agent chat' },
      { href: '/patterns/dashboards', label: 'Dashboards' },
    ],
  },
];

const sandboxNavigation: NavigationItem[] = [
  // To be populated later
];

const cogdocsNavigation: NavigationItem[] = [
  {
    href: '#',
    label: 'CogDocs',
    isSubsection: true,
    children: cogdocsPages.map((page: CogDocsPage) => ({
      href: `/cogdocs/${page.slug}`,
      label: page.title,
    })),
  },
];

const aiNavigation: NavigationItem[] = [
  {
    href: '#',
    label: 'AI Chat',
    isSubsection: true,
    children: [
      { href: '/ai/code-block', label: 'Code block' },
      { href: '/ai/confirmation', label: 'Confirmation' },
      { href: '/ai/conversation', label: 'Conversation' },
      { href: '/ai/inline-citation', label: 'Inline Citation' },
      { href: '/ai/loader', label: 'Loader' },
      { href: '/ai/message', label: 'Message' },
      { href: '/ai/prompt-input', label: 'Prompt input' },
      { href: '/ai/reasoning', label: 'Reasoning' },
      // { href: '/ai/reasoning-original', label: 'Reasoning (Original)' },
      { href: '/ai/shimmer', label: 'Shimmer' },
      { href: '/ai/sources', label: 'Sources' },
      { href: '/ai/suggestion', label: 'Suggestion' },
      { href: '/ai/tool', label: 'Tool' },
    ],
  },
  // {
  //   href: "#",
  //   label: "AI SDK Extras",
  //   isSubsection: true,
  //   children: [
  //     { href: "/ai/components/artifact", label: "Artifact" },
  //     { href: "/ai/components/canvas", label: "Canvas" },
  //     { href: "/ai/components/chain-of-thought", label: "Chain of thought" },
  //     { href: "/ai/components/confirmation", label: "Confirmation" },
  //     { href: "/ai/components/connection", label: "Connection" },
  //     { href: "/ai/components/context", label: "Context" },
  //     { href: "/ai/components/controls", label: "Controls" },
  //     { href: "/ai/components/edge", label: "Edge" },
  //     { href: "/ai/components/node", label: "Node" },
  //     { href: "/ai/components/open-in-chat", label: "Open in chat" },
  //     { href: "/ai/components/panel", label: "Panel" },
  //     { href: "/ai/components/plan", label: "Plan" },
  //     { href: "/ai/components/queue", label: "Queue" },
  //     { href: "/ai/components/shimmer", label: "Shimmer" },
  //     { href: "/ai/components/toolbar", label: "Toolbar" },
  //   ]
  // }
];

export const navigationMap = {
  primitives: primitivesNavigation,
  patterns: patternsNavigation,
  sandbox: sandboxNavigation,
  ai: aiNavigation,
  cogdocs: cogdocsNavigation,
};

function NavigationGroup({
  item,
  level = 0,
}: {
  item: NavigationItem;
  level?: number;
}) {
  const location = useLocation();
  const pathname = location.pathname;
  const [isOpen, setIsOpen] = React.useState(true);

  if (item.isSubsection) {
    return (
      <li className="space-y-1">
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center justify-between w-full text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground py-1.5 pr-1.5 hover:text-foreground transition-colors"
        >
          {item.label}
          <IconChevronRight
            className={cn(
              'h-3 w-3 transition-transform',
              isOpen && 'rotate-90'
            )}
          />
        </button>
        {isOpen && item.children && (
          <ul className="space-y-0.5 pl-2 border-l border-border">
            {item.children.map((child) => (
              <NavigationGroup
                key={child.href === '#' ? child.label : child.href}
                item={child}
                level={level + 1}
              />
            ))}
          </ul>
        )}
      </li>
    );
  }

  const isActive = pathname === item.href;

  return (
    <li>
      <Link
        to={item.href}
        className={cn(
          'inline-flex text-xs py-1 px-2 rounded-sm transition-colors',
          'hover:bg-accent hover:text-accent-foreground',
          isActive
            ? 'bg-accent text-accent-foreground font-medium'
            : 'text-muted-foreground'
        )}
      >
        {item.label}
      </Link>
    </li>
  );
}

export function SideNavigation({ items, className }: SideNavigationProps) {
  return (
    <nav className={cn('', className)}>
      <ul className="space-y-4">
        {items.map((item) => (
          <NavigationGroup
            key={item.href === '#' ? item.label : item.href || item.label}
            item={item}
          />
        ))}
      </ul>
    </nav>
  );
}

export function getSideNavigationForSection(section: string): NavigationItem[] {
  return navigationMap[section as keyof typeof navigationMap] || [];
}
