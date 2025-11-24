'use client';

import { useState, useEffect, startTransition } from 'react';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/cognite/card';
import { Button } from '@/components/ui/cognite/button';
import { Badge } from '@/components/ui/cognite/badge';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/cognite/tabs';
import {
  IconAlertTriangle,
  IconBolt,
  IconBug,
  IconCircleCheck,
  IconCode,
  IconRefresh,
} from '@tabler/icons-react';

interface PreviewDebuggerProps {
  code: string;
  errors?: string[];
  onRetry?: () => void;
}

interface CodeAnalysis {
  hasValidExport: boolean;
  componentName: string | null;
  imports: string[];
  usedComponents: string[];
  warnings: string[];
  suggestions: string[];
}

export function PreviewDebugger({
  code,
  errors = [],
  onRetry,
}: PreviewDebuggerProps) {
  const [analysis, setAnalysis] = useState<CodeAnalysis | null>(null);

  // Analyze the code for common issues and patterns
  useEffect(() => {
    if (!code.trim()) {
      startTransition(() => {
        setAnalysis(null);
      });
      return;
    }

    const analyzeCode = (): CodeAnalysis => {
      const analysis: CodeAnalysis = {
        hasValidExport: false,
        componentName: null,
        imports: [],
        usedComponents: [],
        warnings: [],
        suggestions: [],
      };

      // Check for export function
      const exportMatch = code.match(/export\s+function\s+(\w+)/);
      if (exportMatch) {
        analysis.hasValidExport = true;
        analysis.componentName = exportMatch[1];
      } else {
        analysis.warnings.push('No export function found');
        analysis.suggestions.push(
          "Add 'export function ComponentName() { ... }'"
        );
      }

      // Extract imports
      const importMatches = code.matchAll(
        /import\s+\{([^}]+)\}\s+from\s+["']([^"']+)["']/g
      );
      for (const match of importMatches) {
        const components = match[1].split(',').map((c) => c.trim());
        analysis.imports.push(...components);
      }

      // Find used components
      const componentRegex = /<(\w+)/g;
      const componentMatches = code.matchAll(componentRegex);
      for (const match of componentMatches) {
        if (!analysis.usedComponents.includes(match[1])) {
          analysis.usedComponents.push(match[1]);
        }
      }

      // Check for missing imports
      analysis.usedComponents.forEach((component) => {
        if (
          !analysis.imports.includes(component) &&
          component !== 'div' &&
          component !== 'span' &&
          component !== 'p'
        ) {
          analysis.warnings.push(
            `Component '${component}' may not be imported`
          );
          analysis.suggestions.push(
            `Import ${component} from the appropriate UI library`
          );
        }
      });

      // Check for JSX structure
      if (!code.includes('return')) {
        analysis.warnings.push('No return statement found');
        analysis.suggestions.push("Add 'return (' followed by your JSX");
      }

      // Check for common patterns
      if (code.includes('useState') && !analysis.imports.includes('useState')) {
        analysis.warnings.push('useState used but not imported');
        analysis.suggestions.push('useState is available as React.useState');
      }

      return analysis;
    };

    startTransition(() => {
      setAnalysis(analyzeCode());
    });
  }, [code]);

  if (!code.trim()) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <IconCode className="h-4 w-4" />
            Code Analysis
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground text-sm">
            Enter component code to see analysis and debugging information
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <IconBug className="h-4 w-4" />
          Preview Debugger
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="analysis" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="analysis">Analysis</TabsTrigger>
            <TabsTrigger value="errors">Errors</TabsTrigger>
            <TabsTrigger value="help">Help</TabsTrigger>
          </TabsList>

          <TabsContent value="analysis" className="space-y-4">
            {analysis && (
              <>
                {/* Component Status */}
                <div className="space-y-2">
                  <h4 className="font-medium">Component Status</h4>
                  <div className="flex items-center gap-2">
                    {analysis.hasValidExport ? (
                      <IconCircleCheck className="h-4 w-4 text-green-600" />
                    ) : (
                      <IconAlertTriangle className="h-4 w-4 text-yellow-600" />
                    )}
                    <span className="text-sm">
                      {analysis.hasValidExport
                        ? `Export found: ${analysis.componentName}`
                        : 'No valid export function'}
                    </span>
                  </div>
                </div>

                {/* Imports */}
                {analysis.imports.length > 0 && (
                  <div className="space-y-2">
                    <h4 className="font-medium">Imported Components</h4>
                    <div className="flex flex-wrap gap-1">
                      {analysis.imports.map((imp, index) => (
                        <Badge
                          key={index}
                          variant="secondary"
                          className="text-xs"
                        >
                          {imp}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}

                {/* Used Components */}
                {analysis.usedComponents.length > 0 && (
                  <div className="space-y-2">
                    <h4 className="font-medium">Components Used</h4>
                    <div className="flex flex-wrap gap-1">
                      {analysis.usedComponents.map((comp, index) => (
                        <Badge
                          key={index}
                          variant={
                            analysis.imports.includes(comp)
                              ? 'default'
                              : 'error'
                          }
                          className="text-xs"
                        >
                          {comp}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}

                {/* Warnings */}
                {analysis.warnings.length > 0 && (
                  <div className="space-y-2">
                    <h4 className="font-medium text-yellow-600">Warnings</h4>
                    <ul className="space-y-1">
                      {analysis.warnings.map((warning, index) => (
                        <li
                          key={index}
                          className="text-xs text-muted-foreground flex items-center gap-2"
                        >
                          <IconAlertTriangle className="h-3 w-3 text-yellow-600" />
                          {warning}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Suggestions */}
                {analysis.suggestions.length > 0 && (
                  <div className="space-y-2">
                    <h4 className="font-medium text-blue-600">Suggestions</h4>
                    <ul className="space-y-1">
                      {analysis.suggestions.map((suggestion, index) => (
                        <li
                          key={index}
                          className="text-xs text-muted-foreground flex items-center gap-2"
                        >
                          <IconBolt className="h-3 w-3 text-blue-600" />
                          {suggestion}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </>
            )}
          </TabsContent>

          <TabsContent value="errors" className="space-y-4">
            {errors.length > 0 ? (
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <h4 className="font-medium text-destructive">
                    Runtime Errors
                  </h4>
                  {onRetry && (
                    <Button variant="outline" size="sm" onClick={onRetry}>
                      <IconRefresh className="h-3 w-3 mr-1" />
                      Retry
                    </Button>
                  )}
                </div>
                <ul className="space-y-2">
                  {errors.map((error, index) => (
                    <li
                      key={index}
                      className="p-3 bg-destructive/5 border border-destructive/20 rounded text-sm"
                    >
                      {error}
                    </li>
                  ))}
                </ul>
              </div>
            ) : (
              <div className="text-center py-8">
                <IconCircleCheck className="h-8 w-8 mx-auto text-green-600 mb-2" />
                <p className="text-sm text-muted-foreground">
                  No errors detected
                </p>
              </div>
            )}
          </TabsContent>

          <TabsContent value="help" className="space-y-4">
            <div className="space-y-4">
              <div>
                <h4 className="font-medium mb-2">Component Format</h4>
                <pre className="text-xs bg-muted p-3 rounded overflow-x-auto">
                  {`export function MyComponent() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Hello World</CardTitle>
      </CardHeader>
      <CardContent>
        <p>Component content</p>
        <Button>Click me</Button>
      </CardContent>
    </Card>
  )
}`}
                </pre>
              </div>

              <div>
                <h4 className="font-medium mb-2">Available Components</h4>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div>
                    <p className="font-medium text-muted-foreground">Layout</p>
                    <ul className="space-y-1">
                      <li>Card, CardHeader, CardTitle, CardContent</li>
                      <li>Tabs, TabsList, TabsTrigger, TabsContent</li>
                    </ul>
                  </div>
                  <div>
                    <p className="font-medium text-muted-foreground">
                      Components
                    </p>
                    <ul className="space-y-1">
                      <li>Button, Badge</li>
                      <li>Input, Label</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="font-medium mb-2">React Hooks</h4>
                <p className="text-xs text-muted-foreground">
                  Use React.useState, React.useEffect, etc. for stateful
                  components
                </p>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
