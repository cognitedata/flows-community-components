import { notFound } from "next/navigation";
import { promises as fs } from "fs";
import path from "path";
import matter from "gray-matter";
// import { MDXRemote } from "next-mdx-remote/rsc"
import { Button } from "@/components/ui/cognite/button";
import { Badge } from "@/components/ui/cognite/badge";
import { Separator } from "@/components/ui/cognite/separator";
import Link from "next/link";
import { ArrowLeft, Copy, ExternalLink } from "lucide-react";
import { ComponentTabSwitcher } from "@/components/component-tab-switcher";
import { MarkdownCopyBlock } from "@/components/markdown-copy-block";
import { ComponentExamplesRenderer } from "@/components/component-examples-renderer";
import { CodeExamplesRenderer } from "@/components/code-examples-renderer";
import { processMarkdownExamples } from "@/lib/markdown-processor";
import { getComponentStatus } from "@/lib/component-status";

interface ComponentPageProps {
  params: Promise<{
    slug: string;
  }>;
}

interface ComponentMeta {
  component: string;
  description: string;
  llm_usage: string;
}

async function getComponentDoc(slug: string) {
  try {
    const filePath = path.join(
      process.cwd(),
      "docs",
      "components",
      `${slug}.md`
    );
    const fileContent = await fs.readFile(filePath, "utf8");
    const { data, content } = matter(fileContent);

    return {
      meta: data as ComponentMeta,
      content,
    };
  } catch {
    return null;
  }
}


export async function generateStaticParams() {
  const docsDir = path.join(process.cwd(), "docs", "components");

  try {
    const files = await fs.readdir(docsDir);
    const markdownFiles = files.filter((file) => file.endsWith(".md"));

    return markdownFiles.map((file) => ({
      slug: file.replace(".md", ""),
    }));
  } catch {
    return [];
  }
}

export async function generateMetadata({ params }: ComponentPageProps) {
  const { slug } = await params;
  const doc = await getComponentDoc(slug);

  if (!doc) {
    return {
      title: "Component Not Found",
    };
  }

  return {
    title: `${doc.meta.component} Component - Documentation`,
    description: doc.meta.description,
  };
}

export default async function ComponentPage({ params }: ComponentPageProps) {
  const { slug } = await params;
  const doc = await getComponentDoc(slug);

  if (!doc) {
    notFound();
  }

  // Get component status (draft/production)
  const componentStatus = getComponentStatus(slug);

  // Process markdown to inject code examples from the registry
  const processedMarkdown = await processMarkdownExamples(doc.content, slug);

  // Get MDX components for rendering
  // const mdxComponents = {
  //   Button,
  //   Badge,
  //   Separator,
  //   Tabs,
  //   TabsContent,
  //   TabsList,
  //   TabsTrigger,
  // }

  return (
    <div className="px-3 py-8">
      <div className="max-w-4xl mx-auto">
        {/* Navigation */}
        <div className="flex items-center gap-4 mb-8">
          <Button variant="ghost" size="sm" asChild>
            <Link href="/docs">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Docs
            </Link>
          </Button>
          <Separator orientation="vertical" className="h-4" />
          <div className="flex items-center gap-2">
            <Badge variant="outline">Component</Badge>
            <span className="text-sm text-muted-foreground">
              {doc.meta.component}
            </span>
          </div>
        </div>

        {/* Header */}
        <div className="space-y-4 mb-8">
          <div className="flex items-start justify-between">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <h1 className="text-4xl font-bold">{doc.meta.component}</h1>
                {componentStatus === "production" && (
                  <Badge variant="default" className="bg-green-100 text-green-800 border-green-200 dark:bg-green-900/20 dark:text-green-400 dark:border-green-800">
                    Production Ready
                  </Badge>
                )}
                {componentStatus === "draft" && (
                  <Badge variant="secondary" className="bg-yellow-100 text-yellow-800 border-yellow-200 dark:bg-yellow-900/20 dark:text-yellow-400 dark:border-yellow-800">
                    Draft
                  </Badge>
                )}
              </div>
              <p className="text-xl text-muted-foreground mt-2">
                {doc.meta.description}
              </p>
              {componentStatus === "draft" && (
                <div className="mt-3 p-3 rounded-lg border border-yellow-200 bg-yellow-50 dark:border-yellow-800 dark:bg-yellow-950/20">
                  <p className="text-sm text-yellow-800 dark:text-yellow-400">
                    <strong>Note:</strong> This component is currently in draft status. It may not be production-ready and could undergo changes.
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
              {/* Component Examples from Registry */}
              <ComponentExamplesRenderer slug={slug} />
            </div>
          }
          guidelinesContent={
            <div className="space-y-4">
              <h2 className="text-2xl font-semibold">Guidelines</h2>
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
            </div>
          }
          codeContent={
            <div className="space-y-6">
              <div className="space-y-4">
                <p className="text-muted-foreground">
                  Code examples and implementation details for{" "}
                  {doc.meta.component}.
                </p>

                {/* Component Code Examples from Registry */}
                <CodeExamplesRenderer slug={slug} />
              </div>
            </div>
          }
          markdownContent={<MarkdownCopyBlock content={processedMarkdown} />}
        />

        {/* Footer */}
        <div className="border-t pt-8 mt-12">
          <div className="flex items-center justify-between">
            <div className="text-sm text-muted-foreground">
              Found an issue with this documentation?{" "}
              <Button variant="link" className="p-0 h-auto">
                <ExternalLink className="h-3 w-3 mr-1" />
                Edit on GitHub
              </Button>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm">
                <Copy className="h-4 w-4 mr-2" />
                Copy import
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
