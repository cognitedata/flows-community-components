"use client";

import { getComponentExamples, type ComponentExample } from "@/lib/component-examples";
import { CodeExample } from "./code-example";

interface CodeExamplesRendererProps {
  slug: string;
}

export function CodeExamplesRenderer({ slug }: CodeExamplesRendererProps) {
  const examples = getComponentExamples(slug);

  if (!examples) {
    return (
      <div className="p-6 border rounded-lg bg-muted/20">
        <p className="text-sm text-muted-foreground">
          No code examples available for this component yet.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {Object.entries(examples).map(([key, example]: [string, ComponentExample]) => (
        <CodeExample
          key={key}
          title={example.title}
          code={example.code}
        />
      ))}
    </div>
  );
}

