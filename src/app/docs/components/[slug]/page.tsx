import { notFound } from "next/navigation";
import { promises as fs } from "fs";
import path from "path";
import matter from "gray-matter";
import { MDXRemote } from "next-mdx-remote/rsc";
import { Button } from "@/components/ui/cognite/button";
import { Badge } from "@/components/ui/cognite/badge";
import { Separator } from "@/components/ui/cognite/separator";
import Link from "next/link";
import { ArrowLeft, Copy, ExternalLink } from "lucide-react";

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

  // Get MDX components for rendering
  const mdxComponents = {
    // Import all the components we need for MDX rendering
    Button,
    Badge,
    // Add other components as needed
  };

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
              <h1 className="text-4xl font-bold">{doc.meta.component}</h1>
              <p className="text-xl text-muted-foreground mt-2">
                {doc.meta.description}
              </p>
            </div>
          </div>

          {/* LLM Usage */}
          {doc.meta.llm_usage && (
            <div className="bg-muted/50 border border-muted-foreground/20 rounded-lg p-4">
              <div className="flex items-start gap-3">
                <div className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center mt-0.5">
                  <span className="text-xs font-mono text-primary">AI</span>
                </div>
                <div>
                  <h3 className="font-semibold text-sm mb-1">
                    LLM Usage Guide
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {doc.meta.llm_usage}
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Content */}
        <div className="prose prose-gray dark:prose-invert max-w-none">
          <MDXRemote source={doc.content} components={mdxComponents} />
        </div>

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
