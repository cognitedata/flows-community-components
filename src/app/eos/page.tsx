"use client"

import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/cognite/card"

export default function TemplatesPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <Link href="/eos/shift-handover-app">
          <Card className="hover:shadow-md transition-shadow">
            <CardHeader>
              <CardTitle>Shift handover app</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">Open the shift handover template</p>
            </CardContent>
          </Card>
        </Link>
      </div>
    </div>
  )
}
