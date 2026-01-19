import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/aura/button';
import { Badge } from '@/components/ui/aura/badge';
import { IconArrowLeft } from '@tabler/icons-react';
import { ComponentTabSwitcher } from '@/components/component-tab-switcher';
import { AIExamplesRenderer } from '@/components/ai-examples-renderer';
import { AICodeExamplesRenderer } from '@/components/ai-code-examples-renderer';
import { getStatusMessage, getComponentStatusClasses, getStatusLabel, type ComponentStatusType } from '@/lib/component-status';
import { getAIComponentMeta, type AIComponentMeta } from '@/lib/ai-component-registry';
import { InstallationCommand } from '@/components/installation-command';
import { useEffect, useState } from 'react';

// List of valid AI component slugs
const validSlugs = [
  'actions',
  'artifact',
  'branch',
  'canvas',
  'chain-of-thought',
  'code-block',
  'confirmation',
  'connection',
  'context',
  'controls',
  'conversation',
  'edge',
  'image',
  'inline-citation',
  'loader',
  'message',
  'node',
  'open-in-chat',
  'panel',
  'plan',
  'prompt-input',
  'queue',
  'reasoning',
  'response',
  'shimmer',
  'sources',
  'suggestion',
  'task',
  'tool',
  'toolbar',
];

function toTitleCase(str: string): string {
  return str
    .split('-')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

export default function AIComponentPage() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const [meta, setMeta] = useState<AIComponentMeta | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Reset state when slug changes to avoid stale data
    setMeta(null);
    setLoading(true);

    async function loadMeta() {
      if (!slug) return;
      try {
        const componentMeta = await getAIComponentMeta(slug);
        setMeta(componentMeta);
      } catch {
        // Component not found
      }
      setLoading(false);
    }
    loadMeta();
  }, [slug]);

  if (!slug || !validSlugs.includes(slug)) {
    return (
      <div className="px-3 py-8">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-2xl font-bold">Component not found</h1>
          <Button variant="secondary" size="sm" onClick={() => navigate('/ai')} className="mt-4">
            <IconArrowLeft className="h-4 w-4 mr-2" />
            Back to AI Elements
          </Button>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="px-3 py-8">
        <div className="max-w-7xl mx-auto">
          <div className="animate-pulse space-y-4">
            <div className="h-8 bg-muted rounded w-1/4"></div>
            <div className="h-4 bg-muted rounded w-1/2"></div>
          </div>
        </div>
      </div>
    );
  }

  const componentName = meta?.name || toTitleCase(slug);
  const componentStatus: ComponentStatusType = meta?.status || 'draft';
  const statusClasses = getComponentStatusClasses(componentStatus);
  const statusLabel = getStatusLabel(componentStatus);
  const statusMessage = getStatusMessage(componentStatus);
  const description =
    meta?.description ||
    'AI element component for building conversational interfaces';

  return (
    <div className="px-3 py-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex gap-8">
          {/* Main content */}
          <div className="flex-1 max-w-4xl">
            {/* Navigation */}
            <div className="flex items-center gap-4 mb-8">
              <Button variant="secondary" size="sm" onClick={() => navigate('/ai')}>
                <IconArrowLeft className="h-4 w-4 mr-2" />
                Back to AI Elements
              </Button>
            </div>

            {/* Header */}
            <div className="space-y-4 mb-8">
              <div className="flex items-start justify-between">
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <h1 className="text-3xl font-bold">{componentName}</h1>
                    <Badge variant="default" outline>
                      AI Element
                    </Badge>
                    <Badge
                      variant="secondary"
                      className={statusClasses}
                    >
                      {statusLabel}
                    </Badge>
                  </div>
                  <p className="text-xl text-muted-foreground mt-2">
                    {description}
                  </p>
                  {componentStatus !== 'production' && componentStatus !== 'done' && (
                    <div className={`mt-3 p-3 rounded-lg border ${statusClasses}`}>
                      <p className="text-sm">
                        <strong>Note:</strong> {statusMessage}
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
                      Code examples and implementation details for{' '}
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
              <InstallationCommand
                component={slug}
                dependencies={[]}
                componentCode=""
              />
            </section>

            {/* Usage Section */}
            <section id="usage" className="scroll-mt-20 mt-12">
              <h2 className="text-2xl font-bold mb-6">Usage</h2>
              <div className="space-y-6">
                <AICodeExamplesRenderer slug={slug} />
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
                      <li>Don&apos;t forget to handle error states.</li>
                      <li>Don&apos;t mix inconsistent message variants.</li>
                      <li>
                        Don&apos;t omit source attribution for AI content.
                      </li>
                      <li>Don&apos;t override component internals directly.</li>
                    </ul>
                  </div>
                </div>
              </div>
            </section>
          </div>

          {/* Sidebar with anchor links */}
          <aside className="hidden lg:block w-64 shrink-0">
            <div className="sticky top-20">
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
