'use client';

import React from 'react';
import { useTheme } from 'next-themes';
import { CodeCopyButton } from '#components/code-copy-button';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import {
  vscDarkPlus,
  vs,
} from 'react-syntax-highlighter/dist/esm/styles/prism';

interface CodeExampleProps {
  title: string;
  code: string;
}

export function CodeExample({ title, code }: CodeExampleProps) {
  const { resolvedTheme } = useTheme();

  // Custom style that adapts to the theme
  const customStyle = {
    margin: 0,
    padding: '1rem',
    paddingRight: '3rem',
    fontSize: '0.875rem',
    lineHeight: '1.5',
    borderRadius: '0',
  };

  // Use resolvedTheme directly - the suppressHydrationWarning should handle this
  const isDark = resolvedTheme === 'dark';

  return (
    <div className="bg-muted/50 rounded-lg p-4">
      <h4 className="font-medium mb-2">{title}</h4>
      <div className="relative">
        <CodeCopyButton code={code} />
        <div className="rounded border overflow-hidden">
          <SyntaxHighlighter
            language="tsx"
            style={isDark ? vscDarkPlus : vs}
            customStyle={customStyle}
            codeTagProps={{
              style: {
                fontFamily:
                  'ui-monospace, SFMono-Regular, "SF Mono", Menlo, Consolas, "Liberation Mono", monospace',
              },
            }}
            showLineNumbers={false}
          >
            {code}
          </SyntaxHighlighter>
        </div>
      </div>
    </div>
  );
}
