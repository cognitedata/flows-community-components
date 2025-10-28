import { notFound } from "next/navigation";
import { promises as fs } from "fs";
import path from "path";
import { Button } from "@/components/ui/cognite/button";
import { Badge } from "@/components/ui/cognite/badge";
import { Separator } from "@/components/ui/cognite/separator";
import Link from "next/link";
import { IconArrowLeft } from "@tabler/icons-react";
import { ComponentTabSwitcher } from "@/components/component-tab-switcher";
import { AIExamplesRenderer } from "@/components/ai-examples-renderer";
import { AICodeExamplesRenderer } from "@/components/ai-code-examples-renderer";
import { getAIComponentStatus } from "@/lib/ai-component-status";
import { CodeExample } from "@/components/code-example";

interface ComponentPageProps {
  params: Promise<{
    slug: string;
  }>;
}

// List of valid AI component slugs
const validSlugs = [
  "actions", "artifact", "branch", "canvas", "chain-of-thought",
  "code-block", "confirmation", "connection", "context", "controls", "conversation",
  "edge", "image", "inline-citation", "loader", "message", "node",
  "open-in-chat", "panel", "plan", "prompt-input", "queue", "reasoning", "response",
  "shimmer", "sources", "suggestion", "task", "tool", "toolbar", "web-preview"
];

export async function generateStaticParams() {
  return validSlugs.map((slug) => ({
    slug,
  }));
}

function toTitleCase(str: string): string {
  return str
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

// Convert slug to proper component name (PascalCase for imports)
function toComponentName(str: string): string {
  return str
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join("");
}

// Get component description based on slug
function getComponentDescription(slug: string): string {
  const descriptions: Record<string, string> = {
    "actions": "Action buttons and controls for AI interfaces",
    "artifact": "Display and interact with AI-generated artifacts",
    "branch": "Conversation branching visualisation",
    "canvas": "Interactive canvas for AI outputs and visualisations",
    "chain-of-thought": "Visualise AI reasoning and thought processes",
    "code-block": "Syntax-highlighted code blocks with copy functionality",
    "confirmation": "Confirmation dialogs for AI actions",
    "connection": "Connection visualisation for graph-based interfaces",
    "context": "Display contextual information in AI conversations",
    "controls": "Control elements for managing AI interactions",
    "conversation": "Container and management for conversational interfaces",
    "edge": "Edge visualisation for graph and flow representations",
    "image": "Image display and interaction components",
    "inline-citation": "Citations and source references within content",
    "loader": "Loading indicators for AI operations",
    "message": "Message display for chat and conversational interfaces",
    "node": "Node visualisation for graph-based representations",
    "open-in-chat": "Integration button to open content in chat",
    "panel": "Collapsible panel for additional information",
    "plan": "Display AI planning and step-by-step processes",
    "prompt-input": "Input field for AI prompts and queries",
    "queue": "Queue visualisation for batch operations",
    "reasoning": "Visualise AI reasoning steps and logic",
    "response": "Display AI responses with rich formatting",
    "shimmer": "Loading shimmer effects for AI content",
    "sources": "Source attribution and citation components",
    "suggestion": "Suggestion chips and quick action buttons",
    "task": "Task display and management interface",
    "tool": "Tool usage display and interaction",
    "toolbar": "Toolbar for AI interface actions",
    "web-preview": "Web page preview and embedding component",
  };
  return descriptions[slug] || "AI element component for building conversational interfaces";
}

export async function generateMetadata({ params }: ComponentPageProps) {
  const { slug } = await params;
  const componentName = toTitleCase(slug);
  
  return {
    title: `${componentName} Component - AI Elements Documentation`,
    description: getComponentDescription(slug),
  };
}

async function getComponentCode(slug: string): Promise<string> {
  try {
    const filePath = path.join(
      process.cwd(),
      "src",
      "components",
      "ai-elements",
      "draft",
      `${slug}.tsx`
    );
    const fileContent = await fs.readFile(filePath, "utf8");
    return fileContent;
  } catch {
    return "";
  }
}

export default async function ComponentPage({ params }: ComponentPageProps) {
  const { slug } = await params;
  
  // Validate slug
  if (!validSlugs.includes(slug)) {
    notFound();
  }

  const componentCode = await getComponentCode(slug);
  const componentName = toTitleCase(slug);
  const componentImportName = toComponentName(slug);
  const componentStatus = getAIComponentStatus(slug);
  const description = getComponentDescription(slug);

  return (
    <div className="px-3 py-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex gap-8">
          {/* Main content */}
          <div className="flex-1 max-w-4xl">
            {/* Navigation */}
            <div className="flex items-center gap-4 mb-8">
              <Button variant="secondary" size="sm" asChild>
                <Link href="/ai">
                  <IconArrowLeft className="h-4 w-4 mr-2" />
                  Back to AI Elements
                </Link>
              </Button>
              <Separator orientation="vertical" className="h-4" />
              <div className="flex items-center gap-2">
                <Badge variant="outline">Component</Badge>
                <span className="text-sm text-muted-foreground">
                  {componentName}
                </span>
              </div>
            </div>

            {/* Header */}
            <div className="space-y-4 mb-8">
              <div className="flex items-start justify-between">
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <h1 className="text-3xl font-bold">{componentName}</h1>
                    {componentStatus === "production" && (
                      <Badge
                        variant="default"
                        className="bg-green-100 text-green-800 border-green-200 dark:bg-green-900/20 dark:text-green-400 dark:border-green-800"
                      >
                        Production Ready
                      </Badge>
                    )}
                    {componentStatus === "draft" && (
                      <Badge
                        variant="secondary"
                        className="bg-yellow-100 text-yellow-800 border-yellow-200 dark:bg-yellow-900/20 dark:text-yellow-400 dark:border-yellow-800"
                      >
                        Draft
                      </Badge>
                    )}
                  </div>
                  <p className="text-xl text-muted-foreground mt-2">
                    {description}
                  </p>
                  {componentStatus === "draft" && (
                    <div className="mt-3 p-3 rounded-lg border border-yellow-200 bg-yellow-50 dark:border-yellow-800 dark:bg-yellow-950/20">
                      <p className="text-sm text-yellow-800 dark:text-yellow-400">
                        <strong>Note:</strong> This component is currently in draft
                        status. It may not be production-ready and could undergo
                        changes.
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Enhanced Content with Custom Tab Switcher */}
            <ComponentTabSwitcher
              previewContent={
                <div className="space-y-8">
                  <AIExamplesRenderer slug={slug} />
                </div>
              }
              codeContent={
                <div className="space-y-6">
                  <div className="space-y-4">
                    <p className="text-muted-foreground">
                      Code examples and implementation details for{" "}
                      {componentName}.
                    </p>
                    <AICodeExamplesRenderer slug={slug} />
                  </div>
                </div>
              }
            />

            {/* Installation Section */}
            <section id="installation" className="scroll-mt-20 mt-12">
              <h2 className="text-2xl font-bold mb-6">Installation</h2>
              <div className="space-y-4">
                <p className="text-muted-foreground">
                  AI elements are included in the project. Copy the component source code to use it:
                </p>
                {componentCode && (
                  <CodeExample 
                    title={`src/components/ai-elements/${slug}.tsx`}
                    code={componentCode}
                  />
                )}
              </div>
            </section>

            {/* Usage Section */}
            <section id="usage" className="scroll-mt-20 mt-12">
              <h2 className="text-2xl font-bold mb-6">Usage</h2>
              <div className="space-y-6">
                <AICodeExamplesRenderer slug={slug} />
                {!componentCode && (
                  <CodeExample 
                    title="Basic Usage" 
                    code={`import { ${componentImportName} } from "@/components/ai-elements/cognite/${slug}"

export function Example() {
  return <${componentImportName} />
}`} 
                  />
                )}
              </div>
            </section>

            {/* Guidelines Section */}
            <section id="guidelines" className="scroll-mt-20 mt-12">
              <h2 className="text-2xl font-bold mb-6">Guidelines</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-3">
                  <h3 className="font-semibold text-green-700 dark:text-green-400">
                    Do
                  </h3>
                  <div className="p-4 rounded-lg border bg-green-50 border-green-200 dark:bg-green-950/20 dark:border-green-800">
                    <ul className="list-disc pl-5 text-sm text-muted-foreground space-y-1">
                      <li>Use consistent styling across AI components.</li>
                      <li>Provide clear visual feedback for AI operations.</li>
                      <li>Include loading states for async AI actions.</li>
                      <li>Ensure proper accessibility with ARIA labels.</li>
                    </ul>
                  </div>
                </div>
                <div className="space-y-3">
                  <h3 className="font-semibold text-red-700 dark:text-red-400">
                    Don&apos;t
                  </h3>
                  <div className="p-4 rounded-lg border bg-red-50 border-red-200 dark:bg-red-950/20 dark:border-red-800">
                    <ul className="list-disc pl-5 text-sm text-muted-foreground space-y-1">
                      <li>
                        Don&apos;t forget to handle error states.
                      </li>
                      <li>Don&apos;t mix inconsistent message variants.</li>
                      <li>Don&apos;t omit source attribution for AI content.</li>
                      <li>Don&apos;t override component internals directly.</li>
                    </ul>
                  </div>
                </div>
              </div>
            </section>
          </div>

          {/* Sidebar with anchor links */}
          <aside className="hidden lg:block w-64 shrink-0">
            <div className="sticky top-8">
              <div className="mb-8">
                <h2 className="text-sm font-semibold mb-4">On This Page</h2>
                <nav className="space-y-2">
                  <a
                    href="#installation"
                    className="block text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    Installation
                  </a>
                  <a
                    href="#usage"
                    className="block text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    Usage
                  </a>
                  <a
                    href="#guidelines"
                    className="block text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    Guidelines
                  </a>
                </nav>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
