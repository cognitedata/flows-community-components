"use client"

import { SectionLayout } from "@/components/section-layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowRight } from "lucide-react"

export default function EosPage() {
  return (
    <SectionLayout>
      <div className="space-y-10">
        <div className="space-y-3 text-center">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight">Eos</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Coming soon. This page will mirror the selected Figma frame once connected.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <Card>
            <CardHeader>
              <CardTitle>Sample section</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <p className="text-sm text-muted-foreground">
                Replace with data from the Figma frame when available.
              </p>
              <div className="flex gap-2">
                <Badge variant="secondary">Preview</Badge>
                <Badge>Spec</Badge>
              </div>
              <Button size="sm" className="w-fit">
                Explore <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </SectionLayout>
  )
}


