"use client"

import * as React from "react"
import { usePathname } from "next/navigation"
import { SideNavigation, getSideNavigationForSection } from "@/components/side-navigation"
import { cn } from "@/lib/utils"

interface SectionLayoutProps {
  children: React.ReactNode
  className?: string
}

export function SectionLayout({ children, className }: SectionLayoutProps) {
  const pathname = usePathname()
  
  // Determine the current section from the pathname
  const section = pathname.split('/')[1] || 'overview'
  const sideNavItems = getSideNavigationForSection(section)

  // Don't show side navigation if there are no items
  if (sideNavItems.length === 0) {
    return (
      <div className="px-3 py-8">
        <div className={cn("max-w-4xl mx-auto", className)}>
          {children}
        </div>
      </div>
    )
  }

  return (
    <div className="py-8">
      <div className="flex gap-8">
        {/* Side Navigation */}
        <aside className="w-64 flex-shrink-0 pl-3">
          <div className="sticky top-24">
            <SideNavigation items={sideNavItems} />
          </div>
        </aside>

        {/* Main Content */}
        <main className={cn("flex-1 min-w-0 pr-3", className)}>
          <div className="max-w-4xl mx-auto">
            {children}
          </div>
        </main>
      </div>
    </div>
  )
}
