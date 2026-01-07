'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/aura/card';
import { CodeExample } from '@/components/code-example';

export default function AIPage() {
  const components = [
    {
      slug: 'actions',
      name: 'Actions',
      description: 'Action buttons for AI interfaces',
    },
    {
      slug: 'artifact',
      name: 'Artifact',
      description: 'Display AI-generated artifacts',
    },
    {
      slug: 'canvas',
      name: 'Canvas',
      description: 'Interactive canvas for AI outputs',
    },
    {
      slug: 'chain-of-thought',
      name: 'Chain of Thought',
      description: 'Reasoning process visualisation',
    },
    {
      slug: 'code-block',
      name: 'Code Block',
      description: 'Syntax-highlighted code blocks',
    },
    {
      slug: 'confirmation',
      name: 'Confirmation',
      description: 'Confirmation dialogs for AI actions',
    },
    {
      slug: 'connection',
      name: 'Connection',
      description: 'Connection visualisation',
    },
    {
      slug: 'context',
      name: 'Context',
      description: 'Contextual information display',
    },
    {
      slug: 'controls',
      name: 'Controls',
      description: 'Control elements for AI interfaces',
    },
    {
      slug: 'conversation',
      name: 'Conversation',
      description: 'Conversation container and management',
    },
    {
      slug: 'edge',
      name: 'Edge',
      description: 'Edge visualisation for graphs',
    },
    { slug: 'image', name: 'Image', description: 'Image display components' },
    {
      slug: 'inline-citation',
      name: 'Inline Citation',
      description: 'Citations within content',
    },
    { slug: 'loader', name: 'Loader', description: 'Loading indicators' },
    {
      slug: 'message',
      name: 'Message',
      description: 'Message display for chat interfaces',
    },
    {
      slug: 'node',
      name: 'Node',
      description: 'Node visualisation for graphs',
    },
    {
      slug: 'open-in-chat',
      name: 'Open in Chat',
      description: 'Chat integration button',
    },
    {
      slug: 'panel',
      name: 'Panel',
      description: 'Collapsible panel component',
    },
    {
      slug: 'plan',
      name: 'Plan',
      description: 'AI planning and step-by-step processes',
    },
    {
      slug: 'prompt-input',
      name: 'Prompt Input',
      description: 'Input field for prompts',
    },
    {
      slug: 'queue',
      name: 'Queue',
      description: 'Queue visualisation for batch operations',
    },
    {
      slug: 'reasoning',
      name: 'Reasoning',
      description: 'Reasoning visualisation',
    },
    {
      slug: 'shimmer',
      name: 'Shimmer',
      description: 'Loading shimmer effects',
    },
    {
      slug: 'sources',
      name: 'Sources',
      description: 'Source attribution components',
    },
    {
      slug: 'suggestion',
      name: 'Suggestion',
      description: 'Suggestion chips or buttons',
    },
    { slug: 'task', name: 'Task', description: 'Task display and management' },
    { slug: 'tool', name: 'Tool', description: 'Tool usage display' },
    {
      slug: 'toolbar',
      name: 'Toolbar',
      description: 'Toolbar for AI interfaces',
    },
  ];

  return (
    <div className="px-3 py-16">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="space-y-16 text-center"
        >
          {/* Header */}
          <div className="text-center space-y-4">
            <h1 className="text-3xl md:text-4xl font-bold">AI Elements</h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Specialised components for building AI-powered conversational
              interfaces. These components provide the building blocks for chat
              interfaces, agent interactions, and AI-driven experiences.
            </p>
          </div>

          {/* Quick Start */}
          <section className="space-y-8 text-left">
            <div className="text-center space-y-2">
              <h2 className="text-2xl font-bold">Quick Start</h2>
              <p className="text-muted-foreground">
                Get started with AI elements in your project
              </p>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Installation</CardTitle>
                <CardDescription>
                  AI elements are already available in the project
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <h4 className="font-semibold">Import</h4>
                  <CodeExample
                    title="Example"
                    code={`import { Message, MessageContent } from "@/components/ai-elements/cognite/message"
import { Conversation } from "@/components/ai-elements/cognite/conversation"

export function ChatInterface() {
  return (
    <Conversation>
      <Message>
        <MessageContent>
          Hello, AI!
        </MessageContent>
      </Message>
    </Conversation>
  )
}`}
                  />
                </div>
              </CardContent>
            </Card>
          </section>

          {/* Components Grid */}
          <section className="space-y-8 text-left">
            <div className="text-center space-y-2">
              <h2 className="text-2xl font-bold">Components</h2>
              <p className="text-muted-foreground">
                All available AI element components
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {components.map((component) => (
                <Link
                  key={component.slug}
                  href={`/ai/components/${component.slug}`}
                  className="group"
                >
                  <Card className="h-full transition-all hover:shadow-md hover:border-primary/50">
                    <CardHeader>
                      <CardTitle className="text-base">
                        {component.name}
                      </CardTitle>
                      <CardDescription className="text-sm">
                        {component.description}
                      </CardDescription>
                    </CardHeader>
                  </Card>
                </Link>
              ))}
            </div>
          </section>

          {/* Usage Guidelines */}
          <section className="space-y-8 text-left">
            <div className="text-center space-y-2">
              <h2 className="text-2xl font-bold">Usage Guidelines</h2>
              <p className="text-muted-foreground">
                Best practices for implementing AI components
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-green-700 dark:text-green-400">
                    Do&apos;s
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-start space-x-2">
                    <span className="text-green-500 mt-1">✓</span>
                    <span className="text-sm">
                      Use consistent message variants across your interface
                    </span>
                  </div>
                  <div className="flex items-start space-x-2">
                    <span className="text-green-500 mt-1">✓</span>
                    <span className="text-sm">
                      Provide clear visual distinction between user and
                      assistant messages
                    </span>
                  </div>
                  <div className="flex items-start space-x-2">
                    <span className="text-green-500 mt-1">✓</span>
                    <span className="text-sm">
                      Include loading states for async AI operations
                    </span>
                  </div>
                  <div className="flex items-start space-x-2">
                    <span className="text-green-500 mt-1">✓</span>
                    <span className="text-sm">
                      Display citations and sources for AI-generated content
                    </span>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-red-700 dark:text-red-400">
                    Don&apos;ts
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-start space-x-2">
                    <span className="text-red-500 mt-1">✗</span>
                    <span className="text-sm">
                      Don&apos;t mix different message variants inconsistently
                    </span>
                  </div>
                  <div className="flex items-start space-x-2">
                    <span className="text-red-500 mt-1">✗</span>
                    <span className="text-sm">
                      Don&apos;t forget to handle loading and error states
                    </span>
                  </div>
                  <div className="flex items-start space-x-2">
                    <span className="text-red-500 mt-1">✗</span>
                    <span className="text-sm">
                      Don&apos;t display AI content without source attribution
                    </span>
                  </div>
                  <div className="flex items-start space-x-2">
                    <span className="text-red-500 mt-1">✗</span>
                    <span className="text-sm">
                      Don&apos;t omit accessibility features like ARIA labels
                    </span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </section>
        </motion.div>
      </div>
    </div>
  );
}
