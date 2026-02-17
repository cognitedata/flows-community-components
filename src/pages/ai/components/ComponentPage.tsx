import { InstallationCommand } from "@/components/installation-command";
import { StoriesRenderer } from "@/components/stories-renderer";
import { Badge } from "@/components/ui/aura/badge";
import { Button } from "@/components/ui/aura/button";
import { type AIComponentMeta, getAIComponentMeta } from "@/lib/ai-component-registry";
import {
  type ComponentStatusType,
  getComponentStatusClasses,
  getStatusLabel,
  getStatusMessage,
} from "@/lib/component-status";
import { IconArrowLeft, IconBrandFigma } from "@tabler/icons-react";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const AI_FIGMA_URL =
  "https://www.figma.com/design/pMnMQvfErZDJzWgrcWCIwZ/WIP---Aura-library?node-id=4383-36632&p=f&t=hvBYNAqgOvQH1REf-0";

// List of valid AI component slugs
const validSlugs = [
  "actions",
  "artifact",
  "branch",
  "canvas",
  "chain-of-thought",
  "code-block",
  "confirmation",
  "connection",
  "context",
  "controls",
  "conversation",
  "edge",
  "image",
  "inline-citation",
  "loader",
  "message",
  "node",
  "open-in-chat",
  "panel",
  "plan",
  "prompt-input",
  "queue",
  "reasoning",
  "response",
  "shimmer",
  "sources",
  "suggestion",
  "task",
  "tool",
  "toolbar",
];

function toTitleCase(str: string): string {
  return str
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

export default function AIComponentPage() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const [meta, setMeta] = useState<AIComponentMeta | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    async function loadMeta() {
      if (!slug) return;
      // Reset state when slug changes to avoid stale data
      if (!cancelled) {
        setMeta(null);
        setLoading(true);
      }
      try {
        const componentMeta = await getAIComponentMeta(slug);
        if (!cancelled) {
          setMeta(componentMeta);
        }
      } catch {
        // Component not found
      }
      if (!cancelled) {
        setLoading(false);
      }
    }
    loadMeta();

    return () => {
      cancelled = true;
    };
  }, [slug]);

  if (!slug || !validSlugs.includes(slug)) {
    return (
      <div className="max-w-4xl mx-auto py-10">
        <div className="space-y-4">
          <h1 className="text-2xl font-bold">Component not found</h1>
          <Button variant="secondary" size="sm" onClick={() => navigate("/ai")}>
            <IconArrowLeft className="h-4 w-4 mr-2" />
            Back to AI Elements
          </Button>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto py-10">
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-muted rounded w-1/4" />
          <div className="h-4 bg-muted rounded w-1/2" />
        </div>
      </div>
    );
  }

  const componentName = meta?.name || toTitleCase(slug);
  const componentStatus: ComponentStatusType = meta?.status || "draft";
  const statusClasses = getComponentStatusClasses(componentStatus);
  const statusLabel = getStatusLabel(componentStatus);
  const statusMessage = getStatusMessage(componentStatus);
  const description =
    meta?.description || "AI element component for building conversational interfaces";

  return (
    <div className="max-w-4xl mx-auto py-10">
      <div className="space-y-8">
        {/* Navigation */}
        <div className="flex items-center gap-4">
          <Button variant="secondary" size="sm" onClick={() => navigate("/ai")}>
            <IconArrowLeft className="h-4 w-4 mr-2" />
            Back to AI Elements
          </Button>
        </div>

        {/* Header */}
        <div className="space-y-4">
          <div className="flex items-center gap-3 mb-2">
            <h1 className="text-3xl font-bold tracking-tight">{componentName}</h1>
            <a
              href={AI_FIGMA_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center rounded-sm p-1 text-muted-foreground hover:text-foreground hover:bg-accent"
              title="Open in Figma"
              aria-label="Open in Figma"
            >
              <IconBrandFigma className="size-4" />
            </a>
            <Badge variant="inProgress" outline>
              AI Element
            </Badge>
            <Badge variant="secondary" className={statusClasses}>
              {statusLabel}
            </Badge>
          </div>
          <p className="text-lg text-muted-foreground">{description}</p>
          {componentStatus !== "stable" && componentStatus !== "ready-for-ga" && (
            <div className={`p-4 rounded-lg border ${statusClasses}`}>
              <p className="text-sm">
                <strong>Note:</strong> {statusMessage}
              </p>
            </div>
          )}
        </div>

        {/* Examples Section */}
        <section>
          <h2 className="text-2xl font-bold mb-6">Examples</h2>
          <StoriesRenderer slug={slug} />
        </section>

        {/* Installation Section */}
        <section>
          <h2 className="text-2xl font-bold mb-6">Installation</h2>
          <InstallationCommand component={slug} dependencies={[]} componentCode="" />
        </section>

        {/* Guidelines Section */}
        <section>
          <h2 className="text-2xl font-bold mb-6">Guidelines</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-3">
              <h3 className="font-semibold text-green-700 dark:text-green-400">Do</h3>
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
              <h3 className="font-semibold text-red-700 dark:text-red-400">Don&apos;t</h3>
              <div className="p-4 rounded-lg border bg-red-50 border-red-200 dark:bg-red-950/20 dark:border-red-800">
                <ul className="list-disc pl-5 text-sm text-muted-foreground space-y-1">
                  <li>Don&apos;t forget to handle error states.</li>
                  <li>Don&apos;t mix inconsistent message variants.</li>
                  <li>Don&apos;t omit source attribution for AI content.</li>
                  <li>Don&apos;t override component internals directly.</li>
                </ul>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
