"use client"

import { SectionLayout } from "@/components/section-layout"
import Image from "next/image"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, Bell, Sun, Moon, BarChart3, Shapes, AppWindow, Grid, Paperclip, Settings, Mic, Send, ChevronDown } from "lucide-react"
import { useTheme } from "next-themes"
import React from "react"

export default function EosPage() {
  const { theme, setTheme } = useTheme()
  const [prompt, setPrompt] = React.useState("I want to analyze vibrations and frequency data on @21PT1019")

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

      {/* Content area with background image */}
      <div className="relative min-h-[calc(100vh-48px)]">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 -z-10 bg-[url('/eos-background.png')] bg-cover bg-center bg-no-repeat"
        />
        <SectionLayout>
        <div className="mx-auto max-w-[680px] py-10 space-y-4">
          {/* Greeting (no container or shadow) */}
          <div className="text-center space-y-2 py-6">
            <h2 className="text-2xl font-medium">
              Hello, <span className="text-[var(--ns-aurora-500)]">Mike H.</span>
            </h2>
            <p className="text-muted-foreground">What can Atlas help you with today?</p>
          </div>

          {/* Input + buttons */}
          <Card className="bg-background/60 border backdrop-blur-sm">
            <CardContent className="px-4 py-0 space-y-3">
              <Textarea
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                className="min-h-[72px] resize-y bg-transparent border-0 shadow-none focus-visible:ring-0 focus-visible:ring-offset-0"
                spellCheck={false}
              />
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Button variant="ghost" size="icon" className="h-8 w-8"><Paperclip className="h-4 w-4" /></Button>
                  <Button variant="ghost" size="icon" className="h-8 w-8"><Settings className="h-4 w-4" /></Button>
                  <Button variant="ghost" size="icon" className="h-8 w-8"><AppWindow className="h-4 w-4" /></Button>
                </div>
                <div className="flex items-center gap-2">
                  <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground"><Mic className="h-4 w-4" /></Button>
                  <Button size="icon" className="h-8 w-8"><Send className="h-4 w-4" /></Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Quick starts */}
          <div className="flex items-center justify-center gap-2">
            <Select defaultValue="incident">
              <SelectTrigger className="w-[210px]">
                <SelectValue placeholder="Incident investigation" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="incident">Incident investigation</SelectItem>
                <SelectItem value="safety">Safety audit</SelectItem>
                <SelectItem value="inspection">Inspection planning</SelectItem>
              </SelectContent>
            </Select>
            <Select defaultValue="analyze">
              <SelectTrigger className="w-[210px]">
                <SelectValue placeholder="Analyze and act" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="analyze">Analyze and act</SelectItem>
                <SelectItem value="summarize">Summarize</SelectItem>
                <SelectItem value="notify">Notify team</SelectItem>
              </SelectContent>
            </Select>
            <Select defaultValue="maintenance">
              <SelectTrigger className="w-[230px]">
                <SelectValue placeholder="Optimize maintenance" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="maintenance">Optimize maintenance</SelectItem>
                <SelectItem value="uptime">Improve uptime</SelectItem>
                <SelectItem value="energy">Reduce energy cost</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        </SectionLayout>
      </div>
    </>
  )
}


