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
      <div className={cn("container mx-auto px-4 py-8", className)}>
        {children}
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex gap-8">
        {/* Side Navigation */}
        <aside className="w-64 flex-shrink-0">
          <div className="sticky top-24">
            <SideNavigation items={sideNavItems} />
          </div>
        </aside>

        {/* Main Content */}
        <main className={cn("flex-1 min-w-0", className)}>
          {children}
        </main>
      </div>
    </div>
  )
}
