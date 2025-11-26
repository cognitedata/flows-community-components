'use client';

import { Response } from '@/components/ui/aura/response';
import type { ComponentExamples } from '@/lib/component-examples/types';
import { useEffect, useState } from 'react';

const tokens = [
  '### Hello',
  ' World',
  '\n\n',
  'This',
  ' is',
  ' a',
  ' **mark',
  'down',
  '**',
  ' response',
  ' from',
  ' an',
  ' AI',
  ' model',
  '.',
  '\n\n',
  '---',
  '\n\n',
  '## Tables',
  '\n\n',
  '| Column 1',
  ' | Column 2',
  ' | Column 3',
  ' |',
  '\n',
  '|----------|----------|----------|',
  '\n',
  '| Row 1, Col 1',
  ' | Row 1, Col 2',
  ' | Row 1, Col 3',
  ' |',
  '\n',
  '| Row 2, Col 1',
  ' | Row 2, Col 2',
  ' | Row 2, Col 3',
  ' |',
  '\n',
  '| Row 3, Col 1',
  ' | Row 3, Col 2',
  ' | Row 3, Col 3',
  ' |',
  '\n\n',
  '## Blockquotes',
  '\n\n',
  '> This',
  ' is',
  ' a',
  ' blockquote.',
  ' It',
  ' can',
  ' contain',
  ' multiple',
  ' lines',
  ' and',
  ' **formatted**',
  ' text.',
  '\n',
  '>',
  '\n',
  '> It',
  ' can',
  ' even',
  ' have',
  ' multiple',
  ' paragraphs.',
  '\n\n',
  '## Inline',
  ' Code',
  '\n\n',
  'Here',
  ' is',
  ' some',
  ' text',
  ' with',
  ' `inline',
  ' code`',
  ' in',
  ' the',
  ' middle',
  ' of',
  ' a',
  ' sentence.',
  ' You',
  ' can',
  ' also',
  ' use',
  ' `const',
  ' x',
  ' =',
  ' 42`',
  ' for',
  ' variable',
  ' declarations.',
  '\n\n',
  '## Code',
  ' Blocks',
  '\n\n',
  '```',
  'javascript',
  '\n',
  'const',
  ' greeting',
  ' = ',
  "'Hello, world!'",
  ';',
  '\n',
  'console',
  '.',
  'log',
  '(',
  'greeting',
  ')',
  ';',
  '\n',
  '```',
];

function StreamingResponseDemo() {
  const [content, setContent] = useState('');

  useEffect(() => {
    let currentContent = '';
    let index = 0;

    const interval = setInterval(() => {
      if (index < tokens.length) {
        currentContent += tokens[index];
        setContent(currentContent);
        index++;
      } else {
        clearInterval(interval);
      }
    }, 100);

    return () => clearInterval(interval);
  }, []);

  return <Response className="h-[500px] overflow-auto">{content}</Response>;
}

export const responseExamples: ComponentExamples = {
  streaming: {
    title: 'Response',
    description:
      'The Resaaponse component renders a Markdown response from a large language model. It uses Streamdown under the hood to render the markdown.',
    component: StreamingResponseDemo,
    difficulty: 'beginner',
    code: `"use client"
import { Response } from "@/components/ai-elements/cognite/response"
import { useEffect, useState } from "react"

const tokens = [
  "### Hello",
  " World",
  "\\n\\n",
  "This is a streaming response.",
]

export function StreamingResponseDemo() {
  const [content, setContent] = useState("")

  useEffect(() => {
    let currentContent = ""
    let index = 0

    const interval = setInterval(() => {
      if (index < tokens.length) {
        currentContent += tokens[index]
        setContent(currentContent)
        index++
      } else {
        clearInterval(interval)
      }
    }, 100)

    return () => clearInterval(interval)
  }, [])

  return <Response className="h-[500px] overflow-auto">{content}</Response>
}`,
  },
};

// Component metadata - single source of truth for API documentation
export const responseMeta = {
  name: 'Response',
  description:
    'A component that renders a Markdown response from a large language model.',
  llmUsage:
    'When asked for a markdown response, use the `<Response>` component and pass the markdown content as children.',
  importPath: '@/components/ai-elements/cognite/response',
  apiReference: {
    props: [
      {
        name: 'children',
        type: 'string',
        required: true,
        description:
          'A component that renders streaming Markdown responses from large language models.',
      },
      {
        name: 'className',
        type: 'string',
        description: 'Additional CSS classes to apply to the component.',
      },
    ],
  },
  notes: [
    'Uses Streamdown under the hood to render markdown',
    'Supports streaming content updates',
    'Automatically handles markdown formatting',
  ],
};
