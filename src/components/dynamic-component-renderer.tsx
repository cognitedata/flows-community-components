"use client";

import React, { useState, useEffect, useMemo } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/cognite/card";
import { Button } from "@/components/ui/cognite/button";
import { Badge } from "@/components/ui/cognite/badge";
import { Input } from "@/components/ui/cognite/input";
import { Label } from "@/components/ui/cognite/label";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/cognite/tabs";
import {
  IconAlertTriangle,
  IconPlayerPlay,
  IconRefresh,
} from "@tabler/icons-react";

interface DynamicComponentRendererProps {
  code: string;
  className?: string;
  onError?: (error: string) => void;
}

// Available components for dynamic rendering
const availableComponents = {
  React,
  createElement: React.createElement,
  Fragment: React.Fragment,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  Button,
  Badge,
  Input,
  Label,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
  useState: React.useState,
  useEffect: React.useEffect,
  useMemo: React.useMemo,
};

// Safe component execution with error boundaries
function SafeComponentWrapper({
  children,
  onError,
}: {
  children: React.ReactNode;
  onError: (error: Error) => void;
}) {
  return (
    <React.Suspense
      fallback={
        <div className="p-4 text-center text-muted-foreground">
          Loading component...
        </div>
      }
    >
      <ErrorBoundary onError={onError}>{children}</ErrorBoundary>
    </React.Suspense>
  );
}

class ErrorBoundary extends React.Component<
  { children: React.ReactNode; onError: (error: Error) => void },
  { hasError: boolean; error?: Error }
> {
  constructor(props: {
    children: React.ReactNode;
    onError: (error: Error) => void;
  }) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error) {
    this.props.onError(error);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="p-4 border border-destructive/20 rounded-lg bg-destructive/5">
          <div className="flex items-center gap-2 text-destructive mb-2">
            <IconAlertTriangle className="h-4 w-4" />
            <span className="font-medium">Component Error</span>
          </div>
          <p className="text-sm text-muted-foreground">
            {this.state.error?.message || "Failed to render component"}
          </p>
        </div>
      );
    }

    return this.props.children;
  }
}

export function DynamicComponentRenderer({
  code,
  className,
  onError,
}: DynamicComponentRendererProps) {
  const [renderError, setRenderError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [, setRetryKey] = useState(0);

  // Parse and prepare the component code
  const componentResult = useMemo(() => {
    if (!code.trim()) {
      return { error: "No code provided", component: null };
    }

    try {
      setIsLoading(true);
      setRenderError(null);

      // Clean the code first - remove markdown code blocks and extract just the JSX
      let cleanCode = code.trim();

      // Prefer extracting the first fenced code block if present
      const fencedMatch = cleanCode.match(
        /```(?:tsx|ts|jsx|js)?\n([\s\S]*?)\n```/m
      );
      if (fencedMatch && fencedMatch[1]) {
        cleanCode = fencedMatch[1].trim();
      } else {
        // Otherwise, strip any stray backticks that might wrap code
        cleanCode = cleanCode
          .replace(/^```[\s\S]*?\n/, "")
          .replace(/\n```\s*$/, "")
          .trim();
      }

      // Remove any import statements (we provide components directly)
      cleanCode = cleanCode
        .replace(/^import\s+.*?from\s+.*?[;"']$/gm, "")
        .trim();

      // Extract the export function/component from the code
      // Try multiple patterns to be more forgiving
      let exportMatch = cleanCode.match(
        /export\s+function\s+(\w+)\s*\([^)]*\)\s*\{([\s\S]*)\}/
      );

      // If no export function found, try to find any function
      if (!exportMatch) {
        exportMatch = cleanCode.match(
          /function\s+(\w+)\s*\([^)]*\)\s*\{([\s\S]*)\}/
        );
      }

      // If still no function, try to extract just JSX content
      if (!exportMatch) {
        // Look for JSX that starts with < and create a wrapper function
        const jsxMatch = cleanCode.match(
          /^\s*(<[\s\S]*>[\s\S]*<\/[\s\S]*>)\s*$/m
        );
        if (jsxMatch) {
          // Create a wrapper function around the JSX
          const jsxContent = jsxMatch[1];
          exportMatch = ["", "GeneratedComponent", `return (${jsxContent})`];
        }
      }

      if (!exportMatch) {
        // Provide more helpful error message with actual code snippet
        const codePreview =
          cleanCode.length > 100
            ? cleanCode.substring(0, 100) + "..."
            : cleanCode;
        return {
          error: `No valid export function found. 

**Received code:**
\`\`\`
${codePreview}
\`\`\`

**Expected format:**
\`\`\`tsx
export function ComponentName() {
  return (
    <Card>
      <CardContent>Hello World</CardContent>
    </Card>
  )
}
\`\`\``,
          component: null,
        };
      }

      const [, componentName, componentBody] = exportMatch;

      // Clean up the component body
      const cleanBody = componentBody
        .replace(/^\s*return\s*\(?\s*/, "") // Remove 'return (' from start
        .replace(/\s*\)?\s*$/, "") // Remove ')' from end
        .trim();

      // Simple JSX to React.createElement transformation
      // const transformJSX = (jsxString: string): string => {
      //   // This is a very basic JSX transformation - in a real app you'd use Babel
      //   let transformed = jsxString;

      //   // Handle self-closing tags first
      //   transformed = transformed.replace(
      //     /<(\w+)([^>]*?)\/>/g,
      //     'React.createElement("$1", {$2})'
      //   );

      //   // Handle opening and closing tags
      //   transformed = transformed.replace(
      //     /<(\w+)([^>]*?)>(.*?)<\/\1>/gs,
      //     (match, tag, attrs, children) => {
      //       const hasChildren = children.trim();
      //       if (hasChildren) {
      //         return `React.createElement(${tag}, {${attrs}}, ${children})`;
      //       } else {
      //         return `React.createElement(${tag}, {${attrs}})`;
      //       }
      //     }
      //   );

      //   return transformed;
      // };

      // Create a safe function using React.createElement
      try {
        // Convert JSX to React.createElement calls for basic cases
        let processedBody = cleanBody;

        // Handle simple cases like <Card><CardContent>text</CardContent></Card>
        // This is a very basic transformation - only handles simple nested structures
        if (
          processedBody.includes("<Card>") &&
          processedBody.includes("<CardContent>")
        ) {
          // Simple regex replacement for the most common pattern
          processedBody = processedBody
            .replace(
              /<Card([^>]*)>/g,
              "React.createElement(Card, $1 ? {$1} : null,"
            )
            .replace(/<\/Card>/g, ")")
            .replace(
              /<CardContent([^>]*)>/g,
              "React.createElement(CardContent, $1 ? {$1} : null,"
            )
            .replace(/<\/CardContent>/g, ")")
            .replace(
              /<CardHeader([^>]*)>/g,
              "React.createElement(CardHeader, $1 ? {$1} : null,"
            )
            .replace(/<\/CardHeader>/g, ")")
            .replace(
              /<CardTitle([^>]*)>/g,
              "React.createElement(CardTitle, $1 ? {$1} : null,"
            )
            .replace(/<\/CardTitle>/g, ")")
            .replace(
              /<Button([^>]*)>/g,
              "React.createElement(Button, $1 ? {$1} : null,"
            )
            .replace(/<\/Button>/g, ")")
            .replace(
              /<Badge([^>]*)>/g,
              "React.createElement(Badge, $1 ? {$1} : null,"
            )
            .replace(/<\/Badge>/g, ")");
        }

        const functionBody = `
          "use strict";
          try {
            return function ${componentName}() {
              return ${processedBody};
            };
          } catch (error) {
            throw new Error('Component execution error: ' + error.message);
          }
        `;

        // Use Function constructor with React and components in scope
        const componentFunction = new Function(
          ...Object.keys(availableComponents),
          functionBody
        )(...Object.values(availableComponents));

        return { component: componentFunction, error: null };
      } catch (execError) {
        return {
          error: `Execution error: ${
            execError instanceof Error ? execError.message : "Unknown error"
          }

**Processed code:**
\`\`\`tsx
export function ${componentName}() {
  return (${cleanBody});
}
\`\`\`

This usually means there's a syntax error in the JSX. Check for missing closing tags, unmatched parentheses, or invalid JSX syntax.`,
          component: null,
        };
      }
    } catch (parseError) {
      return {
        error: `Parse error: ${
          parseError instanceof Error ? parseError.message : "Unknown error"
        }`,
        component: null,
      };
    } finally {
      setIsLoading(false);
    }
  }, [code]);

  const handleError = (error: Error) => {
    const errorMessage = error.message;
    setRenderError(errorMessage);
    onError?.(errorMessage);
  };

  const handleRetry = () => {
    setRetryKey((prev) => prev + 1);
    setRenderError(null);
  };

  useEffect(() => {
    setRenderError(null);
  }, [code]);

  // Show loading state
  if (isLoading) {
    return (
      <div className={`flex items-center justify-center p-8 ${className}`}>
        <div className="flex items-center gap-2 text-muted-foreground">
          <IconRefresh className="h-4 w-4 animate-spin" />
          <span>Rendering component...</span>
        </div>
      </div>
    );
  }

  // Show parse error
  if (componentResult.error) {
    return (
      <div
        className={`p-6 border border-destructive/20 rounded-lg bg-destructive/5 ${className}`}
      >
        <div className="flex items-center gap-2 text-destructive mb-3">
          <IconAlertTriangle className="h-4 w-4" />
          <span className="font-medium">Code Error</span>
        </div>
        <p className="text-sm text-muted-foreground mb-4">
          {componentResult.error}
        </p>
        <div className="text-xs text-muted-foreground space-y-1">
          <p>
            <strong>Expected format:</strong>
          </p>
          <pre className="bg-muted p-2 rounded text-xs overflow-x-auto">
            {`export function MyComponent() {
  return (
    <Card>
      <CardContent>Hello World</CardContent>
    </Card>
  )
}`}
          </pre>
        </div>
      </div>
    );
  }

  // Show runtime error
  if (renderError) {
    return (
      <div
        className={`p-6 border border-destructive/20 rounded-lg bg-destructive/5 ${className}`}
      >
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2 text-destructive">
          <IconAlertTriangle className="h-4 w-4" />
            <span className="font-medium">Runtime Error</span>
          </div>
          <Button variant="outline" size="sm" onClick={handleRetry}>
            <IconRefresh className="h-3 w-3 mr-1" />
            Retry
          </Button>
        </div>
        <p className="text-sm text-muted-foreground">{renderError}</p>
      </div>
    );
  }

  // Render the component
  if (componentResult.component) {
    const DynamicComponent = componentResult.component;

    return (
      <div className={`relative ${className}`}>
        <SafeComponentWrapper onError={handleError}>
          <div className="w-full">
            <DynamicComponent />
          </div>
        </SafeComponentWrapper>
      </div>
    );
  }

  // Empty state
  return (
    <div
      className={`flex items-center justify-center p-8 border-2 border-dashed border-muted-foreground/20 rounded-lg ${className}`}
    >
      <div className="text-center space-y-2">
        <IconPlayerPlay className="h-8 w-8 mx-auto text-muted-foreground" />
        <p className="text-sm text-muted-foreground">
          Enter component code to see live preview
        </p>
      </div>
    </div>
  );
}
