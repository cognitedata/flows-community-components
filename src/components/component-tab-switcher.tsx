"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"

interface TabSwitcherProps {
  previewContent: React.ReactNode
  codeContent: React.ReactNode
  markdownContent: React.ReactNode
}

export function ComponentTabSwitcher({ previewContent, codeContent, markdownContent }: TabSwitcherProps) {
  const [activeTab, setActiveTab] = useState<'preview' | 'code' | 'markdown'>('preview')

  return (
    <div className="space-y-6">
      {/* Button-based Tab Switcher */}
      <div className="flex space-x-1">
        <Button 
          variant={activeTab === 'preview' ? 'default' : 'ghost'}
          size="sm"
          onClick={() => setActiveTab('preview')}
        >
          Preview
        </Button>
        <Button 
          variant={activeTab === 'code' ? 'default' : 'ghost'}
          size="sm"
          onClick={() => setActiveTab('code')}
        >
          Code
        </Button>
        <Button 
          variant={activeTab === 'markdown' ? 'default' : 'ghost'}
          size="sm"
          onClick={() => setActiveTab('markdown')}
        >
          Markdown
        </Button>
      </div>

      {/* Content */}
      {activeTab === 'preview' && previewContent}
      {activeTab === 'code' && codeContent}
      {activeTab === 'markdown' && markdownContent}
    </div>
  )
}
