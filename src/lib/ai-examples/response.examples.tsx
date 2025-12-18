'use client';

import { Response } from '@/components/ui/aura/response';
import type { ComponentExamples } from '@/lib/component-examples/types';
import { useEffect, useState } from 'react';

const tokens = [
  '# Heading',
  ' 1',
  '\n\n',
  'This',
  ' is',
  ' a',
  ' paragraph',
  ' with',
  ' **bold',
  ' text**',
  ' and',
  ' *italic',
  ' text*.',
  ' You',
  ' can',
  ' also',
  ' use',
  ' __bold__',
  ' and',
  ' _italic_',
  ' syntax.',
  '\n\n',
  '## Heading',
  ' 2',
  '\n\n',
  'Here',
  ' is',
  ' a',
  ' [link',
  ' to',
  ' Cognite]',
  '(https://cognite.ai)',
  ' in',
  ' the',
  ' middle',
  ' of',
  ' a',
  ' sentence.',
  '\n\n',
  '### Heading',
  ' 3',
  '\n\n',
  'Unordered',
  ' lists',
  ' work',
  ' like',
  ' this:',
  '\n\n',
  '- Unordered',
  ' list',
  '\n',
  '- Unordered',
  ' list',
  '\n',
  '- Unordered',
  ' list',
  '\n',
  '  - Nested',
  ' item',
  '\n',
  '  - Another',
  ' nested',
  ' item',
  '\n\n',
  '#### Heading',
  ' 4',
  '\n\n',
  'Ordered',
  ' lists',
  ' are',
  ' similar:',
  '\n\n',
  '1. Ordered',
  ' list',
  '\n',
  '2. Ordered',
  ' list',
  '\n',
  '3. Ordered',
  ' list',
  '\n',
  '   1. Sub-step',
  '\n',
  '   2. Another',
  ' sub-step',
  '\n\n',
  '##### Heading',
  ' 5',
  '\n\n',
  'Here',
  ' is',
  ' some',
  ' `inline',
  ' code`',
  ' in',
  ' the',
  ' middle',
  ' of',
  ' a',
  ' sentence.',
  '\n\n',
  '###### Heading',
  ' 6',
  '\n\n',
  'Code',
  ' blocks',
  ' look',
  ' like',
  ' this:',
  '\n\n',
  '```',
  'javascript',
  '\n',
  'function greet(name: string) {',
  '\n',
  '  return `Hello, ${name}!`;',
  '\n',
  '}',
  '\n\n',
  'greet(\'World\');',
  '\n',
  '```',
  '\n\n',
  '---',
  '\n\n',
  '> This',
  ' is',
  ' a',
  ' blockquote.',
  ' It',
  ' can',
  ' contain',
  ' **formatted**',
  ' text',
  ' and',
  ' `code`.',
  '\n',
  '>',
  '\n',
  '> Multiple',
  ' paragraphs',
  ' are',
  ' supported.',
  '\n\n',
  '## Tables',
  '\n\n',
  '| Column',
  ' 1',
  ' | Column',
  ' 2',
  ' | Column',
  ' 3',
  ' |',
  '\n',
  '|----------|----------|----------|',
  '\n',
  '| Row',
  ' 1,',
  ' Col',
  ' 1',
  ' | Row',
  ' 1,',
  ' Col',
  ' 2',
  ' | Row',
  ' 1,',
  ' Col',
  ' 3',
  ' |',
  '\n',
  '| Row',
  ' 2,',
  ' Col',
  ' 1',
  ' | Row',
  ' 2,',
  ' Col',
  ' 2',
  ' | Row',
  ' 2,',
  ' Col',
  ' 3',
  ' |',
  '\n',
  '| Row',
  ' 3,',
  ' Col',
  ' 1',
  ' | Row',
  ' 3,',
  ' Col',
  ' 2',
  ' | Row',
  ' 3,',
  ' Col',
  ' 3',
  ' |',
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
      'The Response component renders a Markdown response from a large language model. It uses Streamdown under the hood to render the markdown, and includes custom code block rendering with syntax highlighting and interactive features.',
    component: StreamingResponseDemo,
    difficulty: 'beginner',
    code: `"use client"
import { Response } from "@/components/ai-elements/cognite/response"
import { useEffect, useState } from "react"

const tokens = [
  "### Hello",
  " World",
  "\\n\\n",
  "This is a streaming response with code blocks.",
  "\\n\\n",
  "\`\`\`",
  "javascript",
  "\\n",
  "const greeting = 'Hello, world!';",
  "\\n",
  "console.log(greeting);",
  "\\n",
  "\`\`\`",
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
