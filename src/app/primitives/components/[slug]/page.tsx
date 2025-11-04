import { notFound } from "next/navigation";
import { promises as fs } from "fs";
import path from "path";
import { Badge } from "@/components/ui/cognite/badge";
import { ComponentTabSwitcher } from "@/components/component-tab-switcher";
import { ComponentExamplesRenderer } from "@/components/component-examples-renderer";
import { CodeExamplesRenderer } from "@/components/code-examples-renderer";
import { getComponentStatus } from "@/lib/component-status";
import { InstallationCommand } from "@/components/installation-command";
import { getComponentMeta } from "@/lib/component-registry";

interface ComponentPageProps {
  params: Promise<{
    slug: string;
  }>;
}

// Generate static params from component examples files
export async function generateStaticParams() {
  const examplesDir = path.join(
    process.cwd(),
    "src",
    "lib",
    "component-examples"
  );

  try {
    const files = await fs.readdir(examplesDir);
    const exampleFiles = files.filter(
      (file) => file.endsWith(".examples.tsx") || file.endsWith(".examples.ts")
    );

    return exampleFiles.map((file) => ({
      slug: file.replace(".examples.tsx", "").replace(".examples.ts", ""),
    }));
  } catch {
    return [];
  }
}

export async function generateMetadata({ params }: ComponentPageProps) {
  const { slug } = await params;
  const meta = await getComponentMeta(slug);

  if (!meta) {
    return {
      title: "Component Not Found",
    };
  }

  return {
    title: `${meta.name} Component - Documentation`,
    description: meta.description,
  };
}

// Helper function to get component dependencies from registry
async function getComponentDependencies(slug: string): Promise<string[]> {
  try {
    const registryPath = path.join(process.cwd(), "registry.template.json");
    const registryContent = await fs.readFile(registryPath, "utf-8");
    const registry = JSON.parse(registryContent);

    const component = registry.items?.find(
      (item: { name: string }) => item.name === slug
    );
    return component?.dependencies || [];
  } catch {
    return [];
  }
}

export default async function ComponentPage({ params }: ComponentPageProps) {
  const { slug } = await params;
  const meta = await getComponentMeta(slug);

  if (!meta) {
    notFound();
  }

  // Get component status (draft/production)
  const componentStatus = getComponentStatus(slug);

  // Get component dependencies from registry
  const dependencies = await getComponentDependencies(slug);

  // Get component source code for manual installation
  let componentCode = "";
  try {
    // Try to read from draft directory (where most components are)
    const draftPath = path.join(
      process.cwd(),
      "src",
      "components",
      "ui",
      "draft",
      `${slug}.tsx`
    );
    componentCode = await fs.readFile(draftPath, "utf-8");
  } catch {
    try {
      // Fallback to cognite directory for production components
      const cognitePath = path.join(
        process.cwd(),
        "src",
        "components",
        "ui",
        "cognite",
        `${slug}.tsx`
      );
      componentCode = await fs.readFile(cognitePath, "utf-8");
    } catch {
      // Component code not found, leave empty
    }
  }

  return (
    <div className="px-3 py-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Main content */}
          <div className="flex-1 max-w-4xl">
            {/* Header */}
            <div className="space-y-4 mb-8">
              <div className="flex items-start justify-between">
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-3 mb-2">
                    <h1 className="text-2xl sm:text-3xl font-bold wrap-break-word">
                      {meta.name}
                    </h1>
                    <Badge variant="secondary">Component</Badge>
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
                    {meta.description}
                  </p>
                  {componentStatus === "draft" && (
                    <div className="mt-3 p-3 rounded-lg border border-yellow-200 bg-yellow-50 dark:border-yellow-800 dark:bg-yellow-950/20">
                      <p className="text-sm text-yellow-800 dark:text-yellow-400">
                        <strong>Note:</strong> This component is currently in
                        draft status. It may not be production-ready and could
                        undergo changes.
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
                  <ComponentExamplesRenderer slug={slug} />
                </div>
              }
              codeContent={
                <div className="space-y-6">
                  <div className="space-y-4">
                    <p className="text-muted-foreground">
                      Code examples and implementation details for {meta.name}.
                    </p>
                    <CodeExamplesRenderer slug={slug} />
                  </div>
                </div>
              }
            />

            {/* Installation Section */}
            <section id="installation" className="scroll-mt-20 mt-12">
              <h2 className="text-2xl font-bold mb-6">Installation</h2>
              <InstallationCommand
                component={slug}
                dependencies={dependencies}
                componentCode={componentCode}
              />
            </section>

            {/* Usage Section */}
            <section id="usage" className="scroll-mt-20 mt-12">
              <h2 className="text-2xl font-bold mb-6">Usage</h2>
              <div className="space-y-6">
                <CodeExamplesRenderer slug={slug} />
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
                      <li>Use semantic variants and sizes appropriately.</li>
                      <li>Ensure accessible labels and focus states.</li>
                      <li>Follow spacing and radius tokens.</li>
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
                        Don&apos;t override tokens with hard-coded colors.
                      </li>
                      <li>Don&apos;t remove focus-visible outlines.</li>
                      <li>Don&apos;t mix padding that breaks alignment.</li>
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
