"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { ChevronRight } from "lucide-react"

interface NavigationItem {
  href: string
  label: string
  isSubsection?: boolean
  children?: NavigationItem[]
}

interface SideNavigationProps {
  items: NavigationItem[]
  className?: string
}

const docsNavigation: NavigationItem[] = [
  { href: "/docs/installation", label: "Installation" },
  { href: "/docs/about", label: "About" },
  { href: "/docs/getting-started", label: "Getting started" },
  { href: "/docs/releases", label: "Releases" },
  {
    href: "#",
    label: "Components",
    isSubsection: true,
    children: [
      { href: "/docs/components/accordion", label: "Accordion" },
      { href: "/docs/components/alert", label: "Alert" },
      { href: "/docs/components/alert-dialog", label: "Alert dialog" },
      { href: "/docs/components/avatar", label: "Avatar" },
      { href: "/docs/components/badge", label: "Badge" },
      { href: "/docs/components/breadcrumb", label: "Breadcrumb" },
      { href: "/docs/components/button", label: "Button" },
      { href: "/docs/components/calendar", label: "Calendar" },
      { href: "/docs/components/card", label: "Card" },
      { href: "/docs/components/checkbox", label: "Checkbox" },
      { href: "/docs/components/collapsible", label: "Collapsible" },
      { href: "/docs/components/combobox", label: "Combobox" },
      { href: "/docs/components/command", label: "Command" },
      { href: "/docs/components/context-menu", label: "Context menu" },
      { href: "/docs/components/date-picker", label: "Date picker" },
      { href: "/docs/components/dialog", label: "Dialog" },
      { href: "/docs/components/drawer", label: "Drawer" },
      { href: "/docs/components/dropdown-menu", label: "Dropdown menu" },
      { href: "/docs/components/input", label: "Input" },
      { href: "/docs/components/kbd", label: "Kbd" },
      { href: "/docs/components/label", label: "Label" },
      { href: "/docs/components/menubar", label: "Menubar" },
      { href: "/docs/components/pagination", label: "Pagination" },
      { href: "/docs/components/popover", label: "Popover" },
      { href: "/docs/components/progress", label: "Progress" },
      { href: "/docs/components/radio-group", label: "Radio group" },
      { href: "/docs/components/select", label: "Select" },
      { href: "/docs/components/separator", label: "Separator" },
      { href: "/docs/components/sidebar", label: "Sidebar" },
      { href: "/docs/components/slider", label: "Slider" },
      { href: "/docs/components/sonner", label: "Sonner" },
      { href: "/docs/components/swap-slot", label: "Swap slot" },
      { href: "/docs/components/switch", label: "Switch" },
      { href: "/docs/components/tabs", label: "Tabs" },
      { href: "/docs/components/textarea", label: "Textarea" },
      { href: "/docs/components/time-input", label: "Time input" },
      { href: "/docs/components/toggle", label: "Toggle" },
      { href: "/docs/components/tooltip", label: "Tooltip" },
      { href: "/docs/components/topbar", label: "Topbar" },
    ]
  }
]

// Keep for backward compatibility during migration
const overviewNavigation: NavigationItem[] = docsNavigation

const primitivesNavigation: NavigationItem[] = [
  {
    href: "#",
    label: "Styling & assets",
    isSubsection: true,
    children: [
      { href: "/primitives/colors", label: "Colors" },
      { href: "/primitives/icons", label: "Icons" },
      { href: "/primitives/illustrations", label: "Illustrations" },
      { href: "/primitives/layouts", label: "Layouts" },
      { href: "/primitives/motion-design", label: "Motion design" },
      { href: "/primitives/theming", label: "Theming" },
    ]
  },
  {
    href: "#",
    label: "Components",
    isSubsection: true,
    children: [
      { href: "/primitives/components/accordion", label: "Accordion" },
      { href: "/primitives/components/alert", label: "Alert" },
      { href: "/primitives/components/alert-dialog", label: "Alert dialog" },
      { href: "/primitives/components/avatar", label: "Avatar" },
      { href: "/primitives/components/badge", label: "Badge" },
      { href: "/primitives/components/breadcrumb", label: "Breadcrumb" },
      { href: "/primitives/components/button", label: "Button" },
      { href: "/primitives/components/calendar", label: "Calendar" },
      { href: "/primitives/components/card", label: "Card" },
      { href: "/primitives/components/checkbox", label: "Checkbox" },
      { href: "/primitives/components/collapsible", label: "Collapsible" },
      { href: "/primitives/components/combobox", label: "Combobox" },
      { href: "/primitives/components/command", label: "Command" },
      { href: "/primitives/components/context-menu", label: "Context menu" },
      { href: "/primitives/components/date-picker", label: "Date picker" },
      { href: "/primitives/components/dialog", label: "Dialog" },
      { href: "/primitives/components/drawer", label: "Drawer" },
      { href: "/primitives/components/dropdown-menu", label: "Dropdown menu" },
      { href: "/primitives/components/input", label: "Input" },
      { href: "/primitives/components/kbd", label: "Kbd" },
      { href: "/primitives/components/label", label: "Label" },
      { href: "/primitives/components/menubar", label: "Menubar" },
      { href: "/primitives/components/pagination", label: "Pagination" },
      { href: "/primitives/components/popover", label: "Popover" },
      { href: "/primitives/components/progress", label: "Progress" },
      { href: "/primitives/components/radio-group", label: "Radio group" },
      { href: "/primitives/components/select", label: "Select" },
      { href: "/primitives/components/separator", label: "Separator" },
      { href: "/primitives/components/sidebar", label: "Sidebar" },
      { href: "/primitives/components/slider", label: "Slider" },
      { href: "/primitives/components/sonner", label: "Sonner" },
      { href: "/primitives/components/swap-slot", label: "Swap slot" },
      { href: "/primitives/components/switch", label: "Switch" },
      { href: "/primitives/components/tabs", label: "Tabs" },
      { href: "/primitives/components/textarea", label: "Textarea" },
      { href: "/primitives/components/time-input", label: "Time input" },
      { href: "/primitives/components/toggle", label: "Toggle" },
      { href: "/primitives/components/tooltip", label: "Tooltip" },
      { href: "/primitives/components/topbar", label: "Topbar" },
    ]
  }
]

const blocksNavigation: NavigationItem[] = [
  { href: "/blocks", label: "About" },
  {
    href: "#",
    label: "Blocks",
    isSubsection: true,
    children: [
      { href: "/blocks/agent-chat", label: "Agent chat" },
      { href: "/blocks/canvas", label: "Canvas" },
      { href: "/blocks/commenting", label: "Commenting" },
      { href: "/blocks/dashboards", label: "Dashboards" },
      { href: "/blocks/shift-handover", label: "Shift handover" },
    ]
  }
]

const sandboxNavigation: NavigationItem[] = [
  // To be populated later
]

export const navigationMap = {
  docs: docsNavigation,
  overview: overviewNavigation, // Keep for backward compatibility
  primitives: primitivesNavigation,
  blocks: blocksNavigation,
  sandbox: sandboxNavigation,
}

function NavigationGroup({ item, level = 0 }: { item: NavigationItem; level?: number }) {
  const pathname = usePathname()
  const [isOpen, setIsOpen] = React.useState(true)

  if (item.isSubsection) {
    return (
      <li className="space-y-1">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center justify-between w-full text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground py-1.5 pr-1.5 hover:text-foreground transition-colors"
        >
          {item.label}
          <ChevronRight 
            className={cn(
              "h-3 w-3 transition-transform", 
              isOpen && "rotate-90"
            )} 
          />
        </button>
        {isOpen && item.children && (
          <ul className="space-y-0.5 pl-2 border-l border-border">
            {item.children.map((child, index) => (
              <NavigationGroup key={index} item={child} level={level + 1} />
            ))}
          </ul>
        )}
      </li>
    )
  }

  const isActive = pathname === item.href

  return (
    <li>
      <Link
        href={item.href}
        className={cn(
          "inline-flex text-xs py-1 px-2 rounded-sm transition-colors",
          "hover:bg-accent hover:text-accent-foreground",
          isActive
            ? "bg-accent text-accent-foreground font-medium"
            : "text-muted-foreground"
        )}
      >
        {item.label}
      </Link>
    </li>
  )
}

export function SideNavigation({ items, className }: SideNavigationProps) {
  return (
    <nav className={cn("", className)}>
      <ul className="space-y-4">
        {items.map((item, index) => (
          <NavigationGroup key={index} item={item} />
        ))}
      </ul>
    </nav>
  )
}

export function getSideNavigationForSection(section: string): NavigationItem[] {
  return navigationMap[section as keyof typeof navigationMap] || []
}
