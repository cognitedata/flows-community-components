"use client"

import { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { 
  Send, 
  Sparkles, 
  User, 
  Bot, 
  Code, 
  Copy, 
  RefreshCw,
  Lightbulb,
  Zap
} from "lucide-react"
import { componentRegistry, generateImportStatement, getComponentSuggestions } from "@/lib/component-registry"

interface Message {
  id: string
  role: "user" | "assistant"
  content: string
  timestamp: Date
  type?: "text" | "code"
}

interface SandboxChatProps {
  onCodeGenerated?: (code: string) => void
}

export function SandboxChat({ onCodeGenerated }: SandboxChatProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      role: "assistant",
      content: "Hi! I&apos;m your AI component assistant. I can help you build custom components using your design system primitives. Try asking me to create a pricing card, dashboard widget, or any other component!",
      timestamp: new Date(),
      type: "text"
    }
  ])
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const scrollAreaRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    if (scrollAreaRef.current) {
      const scrollContainer = scrollAreaRef.current.querySelector('[data-radix-scroll-area-viewport]')
      if (scrollContainer) {
        scrollContainer.scrollTop = scrollContainer.scrollHeight
      }
    }
  }, [messages])

  // Example prompts for quick start
  const examplePrompts = [
    "Create a pricing card with badges",
    "Build a dashboard stats widget",
    "Make a user profile card",
    "Design a feature comparison table"
  ]

  const handleSendMessage = async () => {
    if (!input.trim() || isLoading) return

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: input.trim(),
      timestamp: new Date(),
      type: "text"
    }

    setMessages(prev => [...prev, userMessage])
    setInput("")
    setIsLoading(true)

    // Enhanced AI response with component registry
    try {
      // Call the Gemini API
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: input.trim(),
          components: componentRegistry
        }),
      })
      
      let aiResponseContent: string
      
      if (response.ok) {
        const data = await response.json()
        aiResponseContent = data.message
      } else {
        // Fallback to local generation if API fails
        aiResponseContent = generateSmartResponse(input.trim())
      }
      
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: aiResponseContent,
        timestamp: new Date(),
        type: "text"
      }
      
      setMessages(prev => [...prev, aiMessage])
      // Prefer fenced code block if present; otherwise pass full content
      const fenced = extractFirstCodeBlock(aiResponseContent)
      onCodeGenerated?.(fenced || aiResponseContent)
      setIsLoading(false)
    } catch (error) {
      console.error('Error calling AI API:', error)
      
      // Fallback to local generation
      const fallbackResponse = generateSmartResponse(input.trim())
      
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant", 
        content: `⚠️ AI service unavailable - using fallback:\n\n${fallbackResponse}`,
        timestamp: new Date(),
        type: "text"
      }
      
      setMessages(prev => [...prev, aiMessage])
      const fenced = extractFirstCodeBlock(fallbackResponse)
      onCodeGenerated?.(fenced || fallbackResponse)
      setIsLoading(false)
    }
  }

  const generateSmartResponse = (userInput: string): string => {
        const lowerInput = userInput.toLowerCase()
        
        // Check for specific component requests
        const requestedComponents = componentRegistry.filter(comp => 
          lowerInput.includes(comp.name.toLowerCase())
        )
        
        if (requestedComponents.length > 0) {
          const comp = requestedComponents[0]
          const imports = generateImportStatement([comp.name])
          
          return `I&apos;ll help you create a ${comp.name} component! Here&apos;s what you can do with it:

**${comp.description}**

\`\`\`tsx
${imports}

export function My${comp.name}() {
  return (
    ${comp.examples.basic}
  )
}
\`\`\`

${comp.variants ? `**Available variants:** ${comp.variants.join(', ')}\n\n` : ''}This component is perfect for your design system and follows all accessibility guidelines.`
        }
        
        // Pattern-based responses
        if (lowerInput.includes('pricing') || lowerInput.includes('price')) {
          const components = ['Card', 'CardContent', 'CardHeader', 'CardTitle', 'Button', 'Badge']
          const imports = generateImportStatement(components)
          
          return `I&apos;ll create a pricing card component for you:

\`\`\`tsx
${imports}

export function PricingCard() {
  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          Pro Plan
          <Badge variant="secondary">Popular</Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <div className="text-3xl font-bold">$29</div>
          <p className="text-muted-foreground">per month</p>
        </div>
        <ul className="space-y-2 text-sm">
          <li>✓ Unlimited projects</li>
          <li>✓ Priority support</li>
          <li>✓ Advanced analytics</li>
        </ul>
        <Button className="w-full">
          Get Started
        </Button>
      </CardContent>
    </Card>
  )
}
\`\`\`

This pricing card uses your design system primitives with proper spacing and typography.`
        }
        
        if (lowerInput.includes('dashboard') || lowerInput.includes('stats') || lowerInput.includes('metric')) {
          const components = ['Card', 'CardContent', 'CardHeader', 'CardTitle', 'Badge']
          const imports = generateImportStatement(components)
          
          return `I&apos;ll create a dashboard stats widget for you:

\`\`\`tsx
${imports}

export function StatsWidget() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
          <Badge variant="secondary">+20.1%</Badge>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">$45,231.89</div>
          <p className="text-xs text-muted-foreground">
            +20.1% from last month
          </p>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Active Users</CardTitle>
          <Badge variant="outline">+5.2%</Badge>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">2,543</div>
          <p className="text-xs text-muted-foreground">
            +5.2% from last month
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
\`\`\`

This creates responsive dashboard cards with metrics and trend indicators.`
        }
        
        if (lowerInput.includes('profile') || lowerInput.includes('user')) {
          const components = ['Card', 'CardContent', 'CardHeader', 'CardTitle', 'Button', 'Badge']
          const imports = generateImportStatement(components)
          
          return `I&apos;ll create a user profile card for you:

\`\`\`tsx
${imports}

export function UserProfile() {
  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <div className="flex items-center space-x-4">
          <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
            <span className="text-lg font-semibold text-primary">JD</span>
          </div>
          <div>
            <CardTitle>John Doe</CardTitle>
            <p className="text-sm text-muted-foreground">Software Engineer</p>
          </div>
        </div>
        <Badge variant="outline" className="w-fit">Active</Badge>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <p className="text-sm text-muted-foreground">
            Passionate about building great user experiences with modern web technologies.
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">Message</Button>
          <Button size="sm">Follow</Button>
        </div>
      </CardContent>
    </Card>
  )
}
\`\`\`

This profile card includes avatar placeholder, status badges, and action buttons.`
        }
        
        // Generic fallback
        const components = ['Card', 'CardContent', 'CardHeader', 'CardTitle', 'Button', 'Badge']
        const imports = generateImportStatement(components)
        
        return `I&apos;ll help you create "${userInput.trim()}". Here&apos;s a component built with your design system primitives:

\`\`\`tsx
${imports}

export function CustomComponent() {
  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle>Generated Component</CardTitle>
        <Badge variant="secondary">AI Generated</Badge>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground mb-4">
          This component was generated based on your request: "${userInput.trim()}"
        </p>
        <Button className="w-full">
          Try it out
        </Button>
      </CardContent>
    </Card>
  )
}
\`\`\`

This component uses your design system primitives with proper styling and structure. Want me to customize it further?`
      
      return fallback
    }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  const handleExamplePrompt = (prompt: string) => {
    setInput(prompt)
    inputRef.current?.focus()
  }

  const clearChat = () => {
    setMessages([{
      id: "welcome",
      role: "assistant",
      content: "Hi! I&apos;m your AI component assistant. I can help you build custom components using your design system primitives. Try asking me to create a pricing card, dashboard widget, or any other component!",
      timestamp: new Date(),
      type: "text"
    }])
  }

  // Extract first fenced code block (```tsx ... ``` or ``` ... ```)
  const extractFirstCodeBlock = (text: string): string | null => {
    const regex = /```(?:tsx|ts|jsx|js)?\n([\s\S]*?)\n```/m
    const match = text.match(regex)
    if (match && match[1]) {
      return match[1].trim()
    }
    return null
  }

  const copyMessage = (content: string) => {
    navigator.clipboard.writeText(content)
  }

  return (
    <Card className="h-full flex flex-col p-0 overflow-hidden">
      <div className="border-b p-4 flex-shrink-0">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-primary/10">
              <Sparkles className="h-5 w-5 text-primary" />
            </div>
            <div>
              <h3 className="text-lg font-semibold">AI Component Assistant</h3>
              <p className="text-sm text-muted-foreground">
                Generate components with your design system
              </p>
            </div>
          </div>
          <Button 
            variant="ghost" 
            size="sm"
            onClick={clearChat}
            className="text-muted-foreground hover:text-foreground"
          >
            <RefreshCw className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <CardContent className="flex-1 flex flex-col p-0 min-h-0 overflow-hidden">
        {/* Messages */}
        <ScrollArea className="flex-1 h-0" ref={scrollAreaRef}>
          <div className="p-4 space-y-4">
            <AnimatePresence>
              {messages.map((message) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className={`flex gap-3 items-start ${
                    message.role === "user" ? "justify-end" : "justify-start"
                  }`}
                >
                  {message.role === "assistant" && (
                    <div className="w-8 h-8 min-w-[2rem] min-h-[2rem] rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0 self-start">
                      <Bot className="h-4 w-4 text-primary flex-shrink-0" />
                    </div>
                  )}
                  
                  <div className={`max-w-[80%] min-w-0 flex-1 ${
                    message.role === "user" 
                      ? "bg-primary text-primary-foreground" 
                      : "bg-muted"
                  } rounded-lg p-3 relative group overflow-hidden`}>
                    <div className="whitespace-pre-wrap text-sm break-words overflow-wrap-anywhere">
                      {message.content}
                    </div>
                    
                    {/* Copy button */}
                    <Button
                      variant="ghost"
                      size="sm"
                      className="absolute top-1 right-1 opacity-0 group-hover:opacity-100 h-6 w-6 p-0"
                      onClick={() => copyMessage(message.content)}
                    >
                      <Copy className="h-3 w-3" />
                    </Button>
                  </div>

                  {message.role === "user" && (
                    <div className="w-8 h-8 min-w-[2rem] min-h-[2rem] rounded-lg bg-muted flex items-center justify-center flex-shrink-0 self-start">
                      <User className="h-4 w-4 flex-shrink-0" />
                    </div>
                  )}
                </motion.div>
              ))}
            </AnimatePresence>

            {/* Loading indicator */}
            {isLoading && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex gap-3 items-start justify-start"
              >
                <div className="w-8 h-8 min-w-[2rem] min-h-[2rem] rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0 self-start">
                  <Bot className="h-4 w-4 text-primary flex-shrink-0" />
                </div>
                <div className="bg-muted rounded-lg p-3">
                  <div className="flex items-center gap-2">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-current rounded-full animate-bounce [animation-delay:-0.3s]"></div>
                      <div className="w-2 h-2 bg-current rounded-full animate-bounce [animation-delay:-0.15s]"></div>
                      <div className="w-2 h-2 bg-current rounded-full animate-bounce"></div>
                    </div>
                    <span className="text-sm text-muted-foreground">Generating component...</span>
                  </div>
                </div>
              </motion.div>
            )}
          </div>
        </ScrollArea>

        {/* Example prompts */}
        {messages.length === 1 && (
          <div className="p-4 border-t bg-muted/30 flex-shrink-0">
            <div className="flex items-center gap-2 mb-3">
              <Lightbulb className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm font-medium text-muted-foreground">Try these examples:</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {examplePrompts.map((prompt, index) => (
                <Button
                  key={index}
                  variant="outline"
                  size="sm"
                  onClick={() => handleExamplePrompt(prompt)}
                  className="text-xs"
                >
                  <Zap className="h-3 w-3 mr-1" />
                  {prompt}
                </Button>
              ))}
            </div>
          </div>
        )}

        {/* Input */}
        <div className="p-4 border-t flex-shrink-0">
          <div className="flex gap-2">
            <Input
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Describe the component you want to build..."
              disabled={isLoading}
              className="flex-1"
            />
            <Button 
              onClick={handleSendMessage}
              disabled={!input.trim() || isLoading}
              size="sm"
            >
              <Send className="h-4 w-4" />
            </Button>
          </div>
          <p className="text-xs text-muted-foreground mt-2">
            Press Enter to send, Shift+Enter for new line
          </p>
        </div>
      </CardContent>
    </Card>
  )
}
