'use client';

import React, { useState } from 'react';
import { Button } from '#aura/button';

interface TabSwitcherProps {
  previewContent: React.ReactNode;
  codeContent: React.ReactNode;
  guidelinesContent?: React.ReactNode;
  description?: string;
}

export function ComponentTabSwitcher({
  previewContent,
  codeContent,
  guidelinesContent,
  description,
}: TabSwitcherProps) {
  const [activeTab, setActiveTab] = useState<'preview' | 'guidelines' | 'code'>(
    'preview'
  );

  return (
    <div className="space-y-6">
      {/* Description */}
      {description && <p className="text-muted-foreground">{description}</p>}

      {/* Button-based Tab Switcher */}
      <div className="flex space-x-1">
        <Button
          variant={activeTab === 'preview' ? 'default' : 'ghost'}
          size="sm"
          onClick={() => setActiveTab('preview')}
        >
          Preview
        </Button>
        {guidelinesContent && (
          <Button
            variant={activeTab === 'guidelines' ? 'default' : 'ghost'}
            size="sm"
            onClick={() => setActiveTab('guidelines')}
          >
            Guidelines
          </Button>
        )}
        <Button
          variant={activeTab === 'code' ? 'default' : 'ghost'}
          size="sm"
          onClick={() => setActiveTab('code')}
        >
          Code
        </Button>
      </div>

      {/* Content */}
      {activeTab === 'preview' && <>{React.Children.toArray(previewContent)}</>}
      {activeTab === 'guidelines' && (
        <>{React.Children.toArray(guidelinesContent)}</>
      )}
      {activeTab === 'code' && <>{React.Children.toArray(codeContent)}</>}
    </div>
  );
}
