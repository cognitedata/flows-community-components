"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/cognite/button";

interface TabSwitcherProps {
  previewContent: React.ReactNode;
  codeContent: React.ReactNode;
  guidelinesContent?: React.ReactNode;
}

export function ComponentTabSwitcher({
  previewContent,
  codeContent,
  guidelinesContent,
}: TabSwitcherProps) {
  const [activeTab, setActiveTab] = useState<
    "preview" | "guidelines" | "code"
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
      </div>

      {/* Content */}
      {activeTab === "preview" && <>{React.Children.toArray(previewContent)}</>}
      {activeTab === "guidelines" && (
        <>{React.Children.toArray(guidelinesContent)}</>
      )}
      {activeTab === "code" && <>{React.Children.toArray(codeContent)}</>}
    </div>
  );
}
