import { useParams, useNavigate } from "react-router-dom";
import { Badge } from "@/components/ui/aura/badge";
import { Button } from "@/components/ui/aura/button";
import { StoriesRenderer } from "@/components/stories-renderer";
import {
  getStatusMessage,
  getComponentStatusClasses,
  type ComponentStatusType,
} from "@/lib/component-status";
import { getStatusLabel } from "@/lib/component-status";
import { InstallationCommand } from "@/components/installation-command";
import { getComponentMeta } from "@/lib/component-registry";
import { IconArrowLeft } from "@tabler/icons-react";
import { useEffect, useState } from "react";
import type { ComponentMeta } from "@/lib/component-examples";

function toTitleCase(str: string): string {
  return str
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

export default function ComponentPage() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const [meta, setMeta] = useState<ComponentMeta | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadMeta() {
      if (!slug) return;
      try {
        const componentMeta = await getComponentMeta(slug);
        setMeta(componentMeta);
      } catch {
        // Component not found
      }
      setLoading(false);
    }
    loadMeta();
  }, [slug]);

  if (!slug) {
    return null;
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
  const description = meta?.description || "Component documentation";

  return (
    <div className="max-w-4xl mx-auto py-10">
      <div className="space-y-8">
        {/* Navigation */}
        <div className="flex items-center gap-4">
          <Button variant="secondary" size="sm" onClick={() => navigate("/primitives")}>
            <IconArrowLeft className="h-4 w-4 mr-2" />
            Back to Components
          </Button>
        </div>

        {/* Header */}
        <div className="space-y-4">
          <div className="flex items-center gap-3 mb-2">
            <h1 className="text-3xl font-bold tracking-tight">{componentName}</h1>
            <Badge variant="secondary">Component</Badge>
            <Badge variant="secondary" className={statusClasses}>
              {statusLabel}
            </Badge>
          </div>
          <p className="text-lg text-muted-foreground">{description}</p>
          {componentStatus !== "production" && componentStatus !== "done" && (
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
                  <li>Use semantic variants and sizes appropriately.</li>
                  <li>Ensure accessible labels and focus states.</li>
                  <li>Follow spacing and radius tokens.</li>
                </ul>
              </div>
            </div>
            <div className="space-y-3">
              <h3 className="font-semibold text-red-700 dark:text-red-400">Don&apos;t</h3>
              <div className="p-4 rounded-lg border bg-red-50 border-red-200 dark:bg-red-950/20 dark:border-red-800">
                <ul className="list-disc pl-5 text-sm text-muted-foreground space-y-1">
                  <li>Don&apos;t override tokens with hard-coded colors.</li>
                  <li>Don&apos;t remove focus-visible outlines.</li>
                  <li>Don&apos;t mix padding that breaks alignment.</li>
                </ul>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
