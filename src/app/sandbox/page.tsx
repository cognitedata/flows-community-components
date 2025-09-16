"use client"

import { useState } from "react"
import { SectionLayout } from "@/components/section-layout"
import { SandboxChat } from "@/components/sandbox-chat"
import { SandboxEditor } from "@/components/sandbox-editor"
import { Badge } from "@/components/ui/badge"
import { Sparkles, Code } from "lucide-react"

export default function SandboxPage() {
  const [generatedCode, setGeneratedCode] = useState("")

  const handleCodeGenerated = (code: string) => {
    setGeneratedCode(code)
  }

  return (
    <div className="w-full max-w-[1800px] mx-auto px-3 py-8">
      <div className="space-y-6">
        {/* Header */}
        <div className="text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Sparkles className="h-8 w-8 text-primary" />
            <h1 className="text-4xl font-bold">Sandbox</h1>
          </div>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Build custom components with AI assistance using your design system primitives. 
            Describe what you want, and watch as the AI generates code using your components.
          </p>
        </div>

        {/* Main Interface */}
        <div className="flex flex-col lg:flex-row gap-6 h-[800px]">
          {/* Chat Interface */}
          <div className="h-full max-w-[600px] mx-auto lg:mx-0 flex-shrink-0">
            <SandboxChat onCodeGenerated={handleCodeGenerated} />
          </div>

          {/* Code Editor */}
          <div className="h-full flex-1">
            <SandboxEditor 
              code={generatedCode} 
              onCodeChange={setGeneratedCode}
            />
          </div>
        </div>

        {/* Quick Info */}
        <div className="text-center text-sm text-muted-foreground">
          <p>
            This is an experimental AI assistant. Generated code uses your design system components and patterns.
          </p>
        </div>
      </div>
    </div>
  )
}
