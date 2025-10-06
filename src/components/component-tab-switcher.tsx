"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/cognite/button";

interface TabSwitcherProps {
  previewContent: React.ReactNode;
  codeContent: React.ReactNode;
  markdownContent: React.ReactNode;
  guidelinesContent?: React.ReactNode;
}

export function ComponentTabSwitcher({
  previewContent,
  codeContent,
  markdownContent,
  guidelinesContent,
}: TabSwitcherProps) {
  const [activeTab, setActiveTab] = useState<
    "preview" | "guidelines" | "code" | "markdown"
  >("preview");

  return (
    <div className="space-y-6">
      {/* Button-based Tab Switcher */}
      <div className="flex space-x-1">
        <Button
          variant={activeTab === "preview" ? "default" : "ghost"}
          size="sm"
          onClick={() => setActiveTab("preview")}
        >
          Preview
        </Button>
        {guidelinesContent && (
          <Button
            variant={activeTab === "guidelines" ? "default" : "ghost"}
            size="sm"
            onClick={() => setActiveTab("guidelines")}
          >
            Guidelines
          </Button>
        )}
        <Button
          variant={activeTab === "code" ? "default" : "ghost"}
          size="sm"
          onClick={() => setActiveTab("code")}
        >
          Code
        </Button>
        <Button
          variant={activeTab === "markdown" ? "default" : "ghost"}
          size="sm"
          onClick={() => setActiveTab("markdown")}
        >
          Markdown
        </Button>
      </div>

      {/* Content */}
      {activeTab === "preview" && <>{React.Children.toArray(previewContent)}</>}
      {activeTab === "guidelines" && (
        <>{React.Children.toArray(guidelinesContent)}</>
      )}
      {activeTab === "code" && <>{React.Children.toArray(codeContent)}</>}
      {activeTab === "markdown" && (
        <>{React.Children.toArray(markdownContent)}</>
      )}
    </div>
  );
}
