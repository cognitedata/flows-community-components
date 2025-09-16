"use client"

import { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { 
  Send, 
  Bot, 
  User, 
  Copy, 
  ThumbsUp, 
  ThumbsDown,
  MoreHorizontal,
  Code,
  RefreshCw,
  MessageSquare,
  ChevronDown,
  Edit,
  Share,
  Trash2
} from "lucide-react"

interface Message {
  id: string
  role: "user" | "assistant"
  content: string
  timestamp: Date
  isTyping?: boolean
  reactions?: string[]
  isCode?: boolean
}

const initialMessages: Message[] = [
  {
    id: "1",
    role: "assistant",
    content: "Hello! I'm your AI assistant. I can help you with coding questions, design problems, or general tasks. What would you like to work on today?",
    timestamp: new Date(Date.now() - 300000)
  }
]


function TypingIndicator() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      className="flex items-center gap-2"
    >
      <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
        <Bot className="h-4 w-4 text-primary" />
      </div>
      <div className="bg-muted rounded-lg px-4 py-2">
        <div className="flex items-center gap-1">
          <div className="flex space-x-1">
            <motion.div 
              className="w-2 h-2 bg-current rounded-full"
              animate={{ opacity: [0.4, 1, 0.4] }}
              transition={{ duration: 1.5, repeat: Infinity, delay: 0 }}
            />
            <motion.div 
              className="w-2 h-2 bg-current rounded-full"
              animate={{ opacity: [0.4, 1, 0.4] }}
              transition={{ duration: 1.5, repeat: Infinity, delay: 0.2 }}
            />
            <motion.div 
              className="w-2 h-2 bg-current rounded-full"
              animate={{ opacity: [0.4, 1, 0.4] }}
              transition={{ duration: 1.5, repeat: Infinity, delay: 0.4 }}
            />
          </div>
          <span className="text-xs text-muted-foreground ml-2">AI is thinking...</span>
        </div>
      </div>
    </motion.div>
  )
}

function MessageBubble({ message, onReact }: { message: Message; onReact: (messageId: string, reaction: string) => void }) {
  const [showActions, setShowActions] = useState(false)
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      className={`flex gap-3 items-start ${
        message.role === "user" ? "justify-end" : "justify-start"
      }`}
      onMouseEnter={() => setShowActions(true)}
      onMouseLeave={() => setShowActions(false)}
    >
      {message.role === "assistant" && (
        <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
          <Bot className="h-4 w-4 text-primary" />
        </div>
      )}
      
      <div className={`max-w-[80%] ${
        message.role === "user" 
          ? "bg-primary text-primary-foreground" 
          : "bg-muted"
      } rounded-lg p-3 relative group`}>
        <div className="whitespace-pre-wrap text-sm">
          {message.isCode ? (
            <div className="bg-background/10 rounded p-2 font-mono text-xs">
              <div className="flex items-center gap-2 mb-2">
                <Code className="h-3 w-3" />
                <span className="text-xs opacity-70">Code example</span>
              </div>
              {message.content}
            </div>
          ) : (
            message.content
          )}
        </div>
        
        {/* Message Actions */}
        <AnimatePresence>
          {showActions && message.role === "assistant" && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="absolute -bottom-8 left-0 flex items-center gap-1 bg-background border rounded-lg p-1 shadow-lg"
            >
              <Button
                variant="ghost"
                size="sm"
                className="h-6 w-6 p-0"
                onClick={() => onReact(message.id, "👍")}
              >
                <ThumbsUp className="h-3 w-3" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="h-6 w-6 p-0"
                onClick={() => onReact(message.id, "👎")}
              >
                <ThumbsDown className="h-3 w-3" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="h-6 w-6 p-0"
                onClick={() => navigator.clipboard.writeText(message.content)}
              >
                <Copy className="h-3 w-3" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="h-6 w-6 p-0"
              >
                <MoreHorizontal className="h-3 w-3" />
              </Button>
            </motion.div>
          )}
        </AnimatePresence>
        
        {/* Reactions */}
        {message.reactions && message.reactions.length > 0 && (
          <div className="flex items-center gap-1 mt-2">
            {message.reactions.map((reaction, index) => (
              <motion.div
                key={index}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="text-xs bg-background/20 rounded px-1"
              >
                {reaction}
              </motion.div>
            ))}
          </div>
        )}
      </div>

      {message.role === "user" && (
        <div className="w-8 h-8 rounded-lg bg-muted flex items-center justify-center flex-shrink-0">
          <User className="h-4 w-4" />
        </div>
      )}
    </motion.div>
  )
}

export default function AgentChatBlock() {
  const [messages, setMessages] = useState<Message[]>(initialMessages)
  const [input, setInput] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const scrollAreaRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight
    }
  }, [messages, isTyping])

  const handleSendMessage = async () => {
    if (!input.trim()) return

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: input.trim(),
      timestamp: new Date()
    }

    setMessages(prev => [...prev, userMessage])
    setInput("")
    setIsTyping(true)

    // Simulate AI response
    setTimeout(() => {
      setIsTyping(false)
      const responses = [
        "Here's a great solution for that! Let me break it down for you...",
        "I can help you with that. Here's what I recommend:",
        "That's an interesting challenge. Let me show you how to approach it:",
        "```jsx\nfunction Button({ children, onClick }) {\n  return (\n    <button \n      onClick={onClick}\n      className=\"px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600\"\n    >\n      {children}\n    </button>\n  )\n}\n```",
      ]
      
      const response = responses[Math.floor(Math.random() * responses.length)]
      const isCodeResponse = response.includes("```")
      
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: isCodeResponse ? response.replace(/```jsx|```/g, "").trim() : response,
        timestamp: new Date(),
        isCode: isCodeResponse
      }

      setMessages(prev => [...prev, aiMessage])
    }, 1500 + Math.random() * 1000)
  }

  const handleReaction = (messageId: string, reaction: string) => {
    setMessages(prev => prev.map(msg => 
      msg.id === messageId 
        ? { ...msg, reactions: [...(msg.reactions || []), reaction] }
        : msg
    ))
  }

  const clearChat = () => {
    setMessages(initialMessages)
    setIsTyping(false)
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="space-y-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
            <MessageSquare className="h-6 w-6 text-primary" />
          </div>
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Agent chat</h1>
            <p className="text-lg text-muted-foreground">
              Interactive AI chat with typing indicators, reactions, and smooth animations
            </p>
          </div>
        </div>
        
        <div className="flex items-center gap-4">
          <Badge variant="secondary">Real-time messaging</Badge>
          <Badge variant="secondary">Typing indicators</Badge>
          <Badge variant="secondary">Message reactions</Badge>
          <Badge variant="secondary">Code highlighting</Badge>
        </div>
      </div>

      {/* Interactive Demo */}
      <div className="max-w-4xl mx-auto">
        {/* Chat Interface */}
        <div>
          <Card className="h-[600px] flex flex-col bg-zinc-800 rounded-lg py-0">
            <CardHeader className="border-b p-3">
              <div className="flex items-center justify-between">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="flex items-center gap-2 p-2 h-auto">
                      <span className="text-lg font-semibold">Pump 4B troubleshooting</span>
                      <ChevronDown className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="start">
                    <DropdownMenuItem>
                      <Edit className="h-4 w-4 mr-2" />
                      Rename
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Share className="h-4 w-4 mr-2" />
                      Share
                    </DropdownMenuItem>
                    <DropdownMenuItem className="text-destructive">
                      <Trash2 className="h-4 w-4 mr-2" />
                      Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
                <Button variant="ghost" size="sm" onClick={clearChat}>
                  <RefreshCw className="h-4 w-4" />
                </Button>
              </div>
            </CardHeader>
            
            <CardContent className="flex-1 flex flex-col p-0">
              {/* Messages */}
              <ScrollArea className="flex-1 p-3" ref={scrollAreaRef}>
                <div className="space-y-4">
                  <AnimatePresence>
                    {messages.map((message) => (
                      <MessageBubble 
                        key={message.id} 
                        message={message} 
                        onReact={handleReaction}
                      />
                    ))}
                  </AnimatePresence>
                  
                  {isTyping && <TypingIndicator />}
                </div>
              </ScrollArea>

              {/* Input */}
              <div className="p-3 border-t">
                <div className="flex gap-2">
                  <Input
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                    placeholder="Ask me anything..."
                    className="flex-1"
                  />
                  <Button variant="default" onClick={handleSendMessage} disabled={!input.trim()}>
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
