import type React from 'react';

import {
  CodeBlock,
  CodeBlockCopyButton,
} from '@/components/ui/aura/code-block';
import { cn } from '@/lib/utils';

interface ExamplePreviewProps {
  title: string;
  description?: string;
  component: React.ComponentType;
  sourceCode?: string;
}

export function ExamplePreview({
  title,
  description,
  component: Component,
  sourceCode,
}: ExamplePreviewProps) {
  return (
    <div className={cn('space-y-4', sourceCode && 'space-y-0')}>
      <div
        className={cn(
          'p-6 border rounded-lg',
          sourceCode && 'rounded-b-none border-b-0'
        )}
      >
        <h3 className="font-medium mb-2">{title}</h3>
        {description && (
          <p className="text-sm text-muted-foreground mb-4">{description}</p>
        )}
        <div className="flex items-center justify-center py-4">
          <Component />
        </div>
      </div>
      {sourceCode && (
        <div className="border rounded-lg rounded-t-none overflow-hidden border-t-0">
          <CodeBlock code={sourceCode} language="tsx" className="rounded-none">
            <CodeBlockCopyButton />
          </CodeBlock>
        </div>
      )}
    </div>
  );
}
