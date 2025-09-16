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

const overviewNavigation: NavigationItem[] = [
  { href: "/overview/about", label: "About" },
  { href: "/overview/getting-started", label: "Getting started" },
  { href: "/overview/releases", label: "Releases" },
]

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
      { href: "/primitives/components/alert-dialog", label: "Alert dialog" },
      { href: "/primitives/components/badge", label: "Badge" },
      { href: "/primitives/components/button", label: "Button" },
      { href: "/primitives/components/calendar", label: "Calendar" },
      { href: "/primitives/components/card", label: "Card" },
      { href: "/primitives/components/checkbox", label: "Checkbox" },
      { href: "/primitives/components/dialog", label: "Dialog" },
      { href: "/primitives/components/dropdown-menu", label: "Dropdown menu" },
      { href: "/primitives/components/input", label: "Input" },
      { href: "/primitives/components/label", label: "Label" },
      { href: "/primitives/components/navigation-menu", label: "Navigation menu" },
      { href: "/primitives/components/popover", label: "Popover" },
      { href: "/primitives/components/progress", label: "Progress" },
      { href: "/primitives/components/select", label: "Select" },
      { href: "/primitives/components/separator", label: "Separator" },
      { href: "/primitives/components/sheet", label: "Sheet" },
      { href: "/primitives/components/skeleton", label: "Skeleton" },
      { href: "/primitives/components/sonner", label: "Sonner" },
      { href: "/primitives/components/switch", label: "Switch" },
      { href: "/primitives/components/table", label: "Table" },
      { href: "/primitives/components/tabs", label: "Tabs" },
      { href: "/primitives/components/textarea", label: "Textarea" },
      { href: "/primitives/components/tooltip", label: "Tooltip" },
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
  overview: overviewNavigation,
  primitives: primitivesNavigation,
  blocks: blocksNavigation,
  sandbox: sandboxNavigation,
}

function NavigationGroup({ item, level = 0 }: { item: NavigationItem; level?: number }) {
  const pathname = usePathname()
  const [isOpen, setIsOpen] = React.useState(true)

  if (item.isSubsection) {
    return (
      <div className="space-y-2">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center justify-between w-full text-left text-sm font-semibold text-foreground py-2"
        >
          {item.label}
          <ChevronRight 
            className={cn(
              "h-4 w-4 transition-transform", 
              isOpen && "rotate-90"
            )} 
          />
        </button>
        {isOpen && item.children && (
          <div className="space-y-1 pl-3 border-l border-border">
            {item.children.map((child, index) => (
              <NavigationGroup key={index} item={child} level={level + 1} />
            ))}
          </div>
        )}
      </div>
    )
  }

  const isActive = pathname === item.href

  return (
    <Link
      href={item.href}
      className={cn(
        "block text-sm py-2 px-3 rounded-md transition-colors",
        "hover:bg-accent hover:text-accent-foreground",
        isActive
          ? "bg-accent text-accent-foreground font-medium"
          : "text-muted-foreground"
      )}
    >
      {item.label}
    </Link>
  )
}

export function SideNavigation({ items, className }: SideNavigationProps) {
  return (
    <nav className={cn("space-y-2", className)}>
      {items.map((item, index) => (
        <NavigationGroup key={index} item={item} />
      ))}
    </nav>
  )
}

export function getSideNavigationForSection(section: string): NavigationItem[] {
  return navigationMap[section as keyof typeof navigationMap] || []
}
