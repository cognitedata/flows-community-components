"use client"

import { SectionLayout } from "@/components/section-layout"
import Image from "next/image"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Search, Bell, Sun, Moon, BarChart3, Shapes, AppWindow, Grid } from "lucide-react"
import { useTheme } from "next-themes"

export default function EosPage() {
  const { theme, setTheme } = useTheme()

  return (
    <>
      {/* Local page topbar (edge-to-edge) */}
      <div className="w-full border-b border-border bg-background">
        <div className="h-12 px-3 flex items-center justify-between gap-3">
          {/* Left: brand */}
          <div className="flex items-center gap-2">
            <Image src="/cognite-logo.png" alt="Cognite" width={24} height={24} className="rounded" />
          </div>

          {/* Center: tabs */}
          <div className="hidden md:flex">
            <Tabs defaultValue="overview">
              <TabsList className="grid grid-cols-3">
                <TabsTrigger value="overview" className="flex items-center gap-2">
                  <BarChart3 className="h-4 w-4" />
                  Overview
                </TabsTrigger>
                <TabsTrigger value="views" className="flex items-center gap-2">
                  <Shapes className="h-4 w-4" />
                  Views
                </TabsTrigger>
                <TabsTrigger value="apps" className="flex items-center gap-2">
                  <AppWindow className="h-4 w-4" />
                  App library
                </TabsTrigger>
              </TabsList>
            </Tabs>
          </div>

          {/* Right controls */}
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <Search className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <Bell className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8"
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            >
              {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </Button>
            <Image
              src="/user-avatar.png"
              alt="User"
              width={28}
              height={28}
              className="rounded"
            />
          </div>
        </div>
      </div>

      <SectionLayout>
        <div className="min-h-[60vh]" />
      </SectionLayout>
    </>
  )
}


