"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { 
  Code, 
  Play, 
  Copy, 
  RotateCcw, 
  FileText,
  Eye
} from "lucide-react"
import { CodeCopyButton } from "@/components/code-copy-button"
import { DynamicComponentRenderer } from "@/components/dynamic-component-renderer"
import { PresetComponentRenderer } from "@/components/preset-component-renderer"
import { PreviewDebugger } from "@/components/preview-debugger"

interface SandboxEditorProps {
  code?: string
  onCodeChange?: (code: string) => void
}


export function SandboxEditor({ code = "", onCodeChange }: SandboxEditorProps) {
  const [currentCode, setCurrentCode] = useState(code)
  const [activeTab, setActiveTab] = useState("code")
  const [previewErrors, setPreviewErrors] = useState<string[]>([])
  const [retryKey, setRetryKey] = useState(0)
  const [useFallback, setUseFallback] = useState(false)

  const defaultCode = `import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

export function MyComponent() {
  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle>Hello World</CardTitle>
        <Badge variant="secondary">Custom Component</Badge>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground mb-4">
          Start building with our design system primitives!
        </p>
        <Button className="w-full">
          Get started
        </Button>
      </CardContent>
    </Card>
  )
}`

  const handleCodeChange = (newCode: string) => {
    setCurrentCode(newCode)
    onCodeChange?.(newCode)
  }

  const resetCode = () => {
    const codeToReset = code || defaultCode
    setCurrentCode(codeToReset)
    onCodeChange?.(codeToReset)
    setPreviewErrors([])
    setRetryKey(prev => prev + 1)
  }

  const handlePreviewError = (error: string) => {
    setPreviewErrors(prev => [...prev, error])
    // If we get an execution error, switch to fallback
    if (error.includes('Execution error')) {
      setUseFallback(true)
    }
  }

  const handleRetry = () => {
    setPreviewErrors([])
    setRetryKey(prev => prev + 1)
    setUseFallback(false) // Try dynamic renderer again
  }

  const displayCode = currentCode || code || defaultCode

  return (
    <Card className="h-full flex flex-col p-0">
      <CardContent className="flex-1 p-0">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="h-full flex flex-col">
          <div className="border-b px-4 py-4 flex items-center gap-4">
            <TabsList className="grid grid-cols-2 flex-1">
              <TabsTrigger value="code" className="flex items-center gap-2">
                <FileText className="h-4 w-4" />
                Code
              </TabsTrigger>
              <TabsTrigger value="preview" className="flex items-center gap-2">
                <Eye className="h-4 w-4" />
                Preview
              </TabsTrigger>
            </TabsList>
            <Button 
              variant="ghost" 
              size="sm"
              onClick={resetCode}
              className="text-muted-foreground hover:text-foreground flex-shrink-0"
            >
              <RotateCcw className="h-4 w-4" />
            </Button>
          </div>

          <div className="flex-1">
            <TabsContent value="code" className="h-full m-0 p-4">
              <div className="relative h-full">
                <div className="absolute top-2 right-2 z-10">
                  <CodeCopyButton code={displayCode} />
                </div>
                <div className="h-full border rounded-lg overflow-hidden">
                  <textarea
                    value={displayCode}
                    onChange={(e) => handleCodeChange(e.target.value)}
                    className="w-full h-full p-4 font-mono text-sm bg-muted/30 border-0 resize-none focus:outline-none focus:ring-2 focus:ring-ring leading-relaxed"
                    placeholder="Enter your component code here..."
                    spellCheck={false}
                    style={{
                      lineHeight: '1.6',
                      tabSize: '2',
                      fontSize: '14px',
                      fontFamily: 'ui-monospace, SFMono-Regular, "SF Mono", Monaco, "Inconsolata", "Fira Code", "Droid Sans Mono", Consolas, monospace'
                    }}
                  />
                </div>
              </div>
            </TabsContent>

            <TabsContent value="preview" className="h-full m-0 p-4">
              <div className="h-full grid grid-cols-1 lg:grid-cols-3 gap-4">
                {/* Preview Area - Takes 2/3 on large screens */}
                <div className="lg:col-span-2 border rounded-lg bg-background overflow-auto">
                  <div className="p-6">
                    <div className="mb-6 text-center">
                      <h3 className="text-lg font-semibold mb-2">Live Preview</h3>
                      <p className="text-sm text-muted-foreground">
                        Real-time component rendering with error handling
                      </p>
                    </div>
                    
                    {/* Component Renderer */}
                    <div className="min-h-[400px] rounded-lg border bg-muted/10">
                      {!useFallback ? (
                        <DynamicComponentRenderer 
                          key={retryKey}
                          code={displayCode} 
                          className="min-h-[400px] flex items-center justify-center p-8"
                          onError={handlePreviewError}
                        />
                      ) : (
                        <PresetComponentRenderer 
                          code={displayCode}
                          className="min-h-[400px] flex items-center justify-center p-8"
                        />
                      )}
                    </div>
                    
                    {/* Component Stats */}
                    <div className="mt-4 p-3 bg-muted/30 rounded-lg">
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-muted-foreground">Lines: {displayCode.split('\n').length}</span>
                        <span className="text-muted-foreground">Characters: {displayCode.length}</span>
                        <span className="text-muted-foreground">
                          Renderer: {useFallback ? 'Preset' : 'Dynamic'}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Debugger Panel - Takes 1/3 on large screens */}
                <div className="lg:col-span-1">
                  <PreviewDebugger 
                    code={displayCode}
                    errors={previewErrors}
                    onRetry={handleRetry}
                  />
                </div>
              </div>
            </TabsContent>
          </div>
        </Tabs>
      </CardContent>
    </Card>
  )
}
