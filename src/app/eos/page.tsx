"use client"

import { SectionLayout } from "@/components/section-layout"
import EosFigmaFrame from "@/components/eos-figma-frame"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import * as Recharts from "recharts"
import { BarChart3, Shapes, AppWindow, Paperclip, Settings, Mic, Send, ChevronDown, Plus, Pencil } from "lucide-react"

const efficiencyData = [
  { month: "Jan", target: 90, actual: 91 },
  { month: "Feb", target: 90, actual: 92 },
  { month: "Mar", target: 90, actual: 93 },
  { month: "Apr", target: 90, actual: 94 },
  { month: "May", target: 90, actual: 95 },
  { month: "Jun", target: 90, actual: 95 },
]

const oeeData = [
  { month: "Jan", value: 70 },
  { month: "Feb", value: 71 },
  { month: "Mar", value: 73 },
  { month: "Apr", value: 72 },
  { month: "May", value: 74 },
  { month: "Jun", value: 74 },
]

export default function EosPage() {
  return (
    <SectionLayout>
      {/* Exact frame rendering from Figma (requires local asset server) */}
      <div className="hidden lg:block">
        <EosFigmaFrame />
      </div>
      {/* Responsive approximation for smaller screens */}
      <div className="mx-auto max-w-[1100px] space-y-10 lg:hidden">
        {/* Top tabs mimic */}
        <div className="flex items-center justify-center gap-2">
          <Button variant="secondary" size="sm" className="h-8">
            <BarChart3 className="mr-2 h-4 w-4" /> Overview
          </Button>
          <Button variant="ghost" size="sm" className="h-8 text-muted-foreground">
            <Shapes className="mr-2 h-4 w-4" /> Views
          </Button>
          <Button variant="ghost" size="sm" className="h-8 text-muted-foreground">
            <AppWindow className="mr-2 h-4 w-4" /> App library
          </Button>
        </div>

        {/* Hero */}
        <div className="text-center space-y-2">
          <h2 className="text-2xl font-medium tracking-tight text-foreground">
            Hello, <span className="text-[var(--ns-aurora-500)]">Mike H.</span>
          </h2>
          <p className="text-muted-foreground">What can Atlas help you with today?</p>
        </div>

        {/* Prompt input */}
        <div className="mx-auto max-w-[760px] space-y-3">
          <div className="rounded-md border border-slate-800 bg-background p-4">
            <p className="text-sm text-slate-400">
              I want to analyze vibrations and frequency data on @21PT1019
            </p>
            <div className="mt-4 flex items-center justify-between">
              <div className="flex items-center gap-3 text-muted-foreground">
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <Paperclip className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <Settings className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <AppWindow className="h-4 w-4" />
                </Button>
              </div>
              <div className="flex items-center gap-2">
                <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground">
                  <Mic className="h-4 w-4" />
                </Button>
                <Button size="icon" className="h-8 w-8 bg-muted text-background">
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>

          {/* Quick starts */}
          <div className="flex flex-wrap items-center justify-center gap-2">
            <Button variant="outline" size="sm" className="h-8">
              Incident investigation <ChevronDown className="ml-2 h-3 w-3" />
            </Button>
            <Button variant="outline" size="sm" className="h-8">
              Analyze and act <ChevronDown className="ml-2 h-3 w-3" />
            </Button>
            <Button variant="outline" size="sm" className="h-8">
              Optimize maintenance <ChevronDown className="ml-2 h-3 w-3" />
            </Button>
          </div>
        </div>

        {/* Toolbar above cards */}
        <div className="mx-auto flex w-full max-w-[1100px] items-center justify-between">
          <Button variant="outline" size="sm" className="h-8">
            Executive overview <ChevronDown className="ml-2 h-3 w-3" />
          </Button>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" className="h-8">
              <Plus className="mr-2 h-4 w-4" /> Add
            </Button>
            <Button variant="outline" size="sm" className="h-8">
              <Pencil className="mr-2 h-4 w-4" /> Edit
            </Button>
          </div>
        </div>

        {/* KPI cards */}
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {/* Energy efficiency vs target */}
          <Card className="backdrop-blur-sm bg-background/60 border-slate-800">
            <CardContent className="p-3">
              <div className="flex items-center gap-2">
                <div className="rounded-[2px] bg-indigo-950 p-1" />
                <div className="text-sm font-medium text-foreground">Energy efficiency vs target</div>
                <div className="ml-auto text-xs text-muted-foreground">Last 6 months</div>
              </div>
              <div className="mt-2">
                <ChartContainer
                  className="h-[160px]"
                  config={{
                    target: { label: "Target", color: "hsl(var(--muted-foreground))" },
                    actual: { label: "Actual", color: "#a9f853" },
                  }}
                >
                  <Recharts.AreaChart data={efficiencyData} margin={{ left: 6, right: 6, top: 6, bottom: 0 }}>
                    <Recharts.CartesianGrid vertical={false} strokeOpacity={0.15} />
                    <Recharts.XAxis dataKey="month" tickLine={false} axisLine={false} dy={6} tick={{ fontSize: 12 }} />
                    <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
                    <Recharts.Area type="monotone" dataKey="target" stroke="hsl(var(--muted-foreground))" fill="hsl(var(--muted-foreground))" fillOpacity={0.15} />
                    <Recharts.Area type="monotone" dataKey="actual" stroke="#a9f853" fill="#a9f853" fillOpacity={0.2} />
                  </Recharts.AreaChart>
                </ChartContainer>
              </div>
              <div className="mt-2 flex items-center gap-2">
                <Badge variant="secondary" className="bg-[#1b2536] text-[var(--ns-glacier-300)]">Target: 90%</Badge>
                <Badge className="bg-[#223211] text-[#cbfb98]">Actual: 95%</Badge>
              </div>
            </CardContent>
          </Card>

          {/* Progress radial */}
          <Card className="backdrop-blur-sm bg-background/60 border-slate-800">
            <CardContent className="p-3">
              <div className="flex items-center gap-2">
                <div className="rounded-[2px] bg-indigo-950 p-1" />
                <div className="text-sm font-medium text-foreground">Progress</div>
                <div className="ml-auto text-xs text-muted-foreground">Last 6 months</div>
              </div>
              <div className="mt-4 flex items-center justify-center">
                <Recharts.RadialBarChart width={180} height={180} innerRadius={60} outerRadius={80} data={[{ name: "value", value: 65, fill: "#223211" }]} startAngle={90} endAngle={-270}>
                  <Recharts.RadialBar minAngle={15} background clockWise dataKey="value" cornerRadius={10} fill="#a9f853" />
                </Recharts.RadialBarChart>
              </div>
              <div className="mt-2 text-xs text-muted-foreground">Increase of 4% in the last 30 days</div>
              <div className="mt-2 inline-flex rounded-[2px] bg-[#223211] px-1.5 py-0.5 text-xs text-[#cbfb98]">65%</div>
            </CardContent>
          </Card>

          {/* OEE line */}
          <Card className="backdrop-blur-sm bg-background/60 border-slate-800">
            <CardContent className="p-3">
              <div className="flex items-center gap-2">
                <div className="rounded-[2px] bg-indigo-950 p-1" />
                <div className="text-sm font-medium text-foreground">Overall equipment effectiveness</div>
                <div className="ml-auto text-xs text-muted-foreground">Last 6 months</div>
              </div>
              <div className="mt-2">
                <ChartContainer className="h-[160px]" config={{ value: { label: "OEE", color: "#a5d2e7" } }}>
                  <Recharts.AreaChart data={oeeData} margin={{ left: 6, right: 6, top: 6, bottom: 0 }}>
                    <Recharts.CartesianGrid vertical={false} strokeOpacity={0.15} />
                    <Recharts.XAxis dataKey="month" tickLine={false} axisLine={false} dy={6} tick={{ fontSize: 12 }} />
                    <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
                    <Recharts.Area type="monotone" dataKey="value" stroke="#a5d2e7" fill="#a5d2e7" fillOpacity={0.2} />
                  </Recharts.AreaChart>
                </ChartContainer>
              </div>
              <div className="mt-2 text-xs text-muted-foreground">Remains steady</div>
            </CardContent>
          </Card>
        </div>
      </div>
    </SectionLayout>
  )
}


