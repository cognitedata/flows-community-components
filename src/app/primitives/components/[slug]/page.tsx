import { notFound } from "next/navigation";
import { promises as fs } from "fs";
import path from "path";
import matter from "gray-matter";
// import { MDXRemote } from "next-mdx-remote/rsc"
import { Button } from "@/components/ui/cognite/button";
import { Badge } from "@/components/ui/cognite/badge";
import { Separator } from "@/components/ui/cognite/separator";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/cognite/tabs";
import Link from "next/link";
import { IconArrowLeft, IconBookmark, IconCopy, IconAlertHexagon, IconExternalLink, IconLoader2, IconMail, IconPlus, IconTrash, IconAlertTriangle,IconCircleCheck,IconInnerShadowTopLeft,IconArchive } from '@tabler/icons-react';
import { ComponentTabSwitcher } from "@/components/component-tab-switcher";
import { MarkdownCopyBlock } from "@/components/markdown-copy-block";
import { CodeCopyButton } from "@/components/code-copy-button";

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
          <Button variant="secondary" size="sm" asChild>
            <Link href="/docs">
              <IconArrowLeft className="h-4 w-4 mr-2" />
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
        </div>

        {/* Enhanced Content with Custom Tab Switcher */}
        <ComponentTabSwitcher
          previewContent={
            <div className="space-y-8">
              {/* Component-specific interactive demos */}
              <div className="space-y-4">
                {slug === "button" && (
                  <div className="space-y-6">
                    <div className="p-6 border rounded-lg bg-muted/20">
                      <h3 className="font-medium mb-4">
                        All Variants & States
                      </h3>
                      <div className="space-y-4">
                        <div className="flex flex-wrap gap-3">
                          <Button variant="default" size="icon"><IconPlus /></Button>
                          <Button variant="secondary" size="icon"><IconBookmark /></Button>
                          <Button variant="destructive" size="icon"><IconTrash /></Button>
                          <Button variant="default"><IconPlus /> Add data</Button>
                          <Button variant="secondary">Explore more<IconExternalLink /></Button>
                          <Button variant="destructive"><IconTrash />Delete</Button>
                        </div>
                        <Separator />
                        <div className="flex flex-wrap gap-3">
                          <Button size="sm">Small</Button>
                          <Button size="default">Default</Button>
                          <Button size="lg">Large</Button>
                          <Button size="icon">
                            <IconMail className="h-4 w-4" />
                          </Button>
                        </div>
                        <Separator />
                        <div className="flex flex-wrap gap-3">
                          <Button disabled>Disabled</Button>
                          <Button disabled>
                            <IconLoader2 className="mr-2 h-4 w-4 animate-spin" />
                            Loading...
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {slug === "badge" && (
                  <div className="space-y-6">
                    <div className="p-6 border rounded-lg bg-muted/20">
                      <h3 className="font-medium mb-4">Badge Variants</h3>
                      <div className="flex flex-wrap gap-3">
                        {/* <Badge variant="default">Default</Badge> */}
                        <Badge variant="error"><IconAlertHexagon />Error</Badge>
                        <Badge variant="warning"><IconAlertTriangle />Warning</Badge>
                        <Badge variant="success"><IconCircleCheck />Success</Badge>
                        <Badge variant="inProgress"><IconInnerShadowTopLeft />In progress</Badge>
                        <Badge variant="archived"><IconArchive />Archived</Badge>
                      </div>
                    </div>
                  </div>
                )}

                {slug === "card" && (
                  <div className="space-y-6">
                    <div className="p-6 border rounded-lg bg-muted/20">
                      <h3 className="font-medium mb-4">Card Examples</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="p-4 border rounded-lg bg-background">
                          <h4 className="font-semibold mb-2">Simple Card</h4>
                          <p className="text-sm text-muted-foreground">
                            Basic card with content
                          </p>
                        </div>
                        <div className="p-4 border rounded-lg bg-background">
                          <h4 className="font-semibold mb-2">
                            Card with Button
                          </h4>
                          <p className="text-sm text-muted-foreground mb-3">
                            Card with action
                          </p>
                          <Button size="sm">Action</Button>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {slug === "input" && (
                  <div className="space-y-6">
                    <div className="p-6 border rounded-lg bg-muted/20">
                      <h3 className="font-medium mb-4">Input Examples</h3>
                      <div className="space-y-4 max-w-sm">
                        <div>
                          <label className="text-sm font-medium">
                            Default Input
                          </label>
                          <input
                            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                            placeholder="Enter text..."
                          />
                        </div>
                        <div>
                          <label className="text-sm font-medium">
                            Disabled Input
                          </label>
                          <input
                            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm opacity-50"
                            placeholder="Disabled"
                            disabled
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {slug === "tabs" && (
                  <div className="space-y-6">
                    <div className="p-6 border rounded-lg bg-muted/20">
                      <h3 className="font-medium mb-4">Interactive Tabs</h3>
                      <Tabs defaultValue="tab1" className="w-full">
                        <TabsList className="grid w-full grid-cols-3">
                          <TabsTrigger value="tab1">Account</TabsTrigger>
                          <TabsTrigger value="tab2">Password</TabsTrigger>
                          <TabsTrigger value="tab3">Settings</TabsTrigger>
                        </TabsList>
                        <TabsContent
                          value="tab1"
                          className="mt-4 p-4 border rounded"
                        >
                          <h4 className="font-medium mb-2">
                            Account Information
                          </h4>
                          <p className="text-sm text-muted-foreground">
                            Manage your account details here.
                          </p>
                        </TabsContent>
                        <TabsContent
                          value="tab2"
                          className="mt-4 p-4 border rounded"
                        >
                          <h4 className="font-medium mb-2">
                            Password Settings
                          </h4>
                          <p className="text-sm text-muted-foreground">
                            Change your password and security settings.
                          </p>
                        </TabsContent>
                        <TabsContent
                          value="tab3"
                          className="mt-4 p-4 border rounded"
                        >
                          <h4 className="font-medium mb-2">General Settings</h4>
                          <p className="text-sm text-muted-foreground">
                            Configure your preferences and options.
                          </p>
                        </TabsContent>
                      </Tabs>
                    </div>
                  </div>
                )}

                {slug === "accordion" && (
                  <div className="space-y-6">
                    <div className="p-6 border rounded-lg bg-muted/20">
                      <h3 className="font-medium mb-4">Accordion Demo</h3>
                      <div className="space-y-2">
                        <div className="border rounded p-3">
                          <div className="font-medium">Section 1</div>
                          <div className="text-sm text-muted-foreground mt-1">
                            Collapsible content here
                          </div>
                        </div>
                        <div className="border rounded p-3">
                          <div className="font-medium">Section 2</div>
                          <div className="text-sm text-muted-foreground mt-1">
                            More collapsible content
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {slug === "alert-dialog" && (
                  <div className="space-y-6">
                    <div className="p-6 border rounded-lg bg-muted/20">
                      <h3 className="font-medium mb-4">Alert Dialog Demo</h3>
                      <div className="space-y-3">
                        <Button>Open Alert Dialog</Button>
                        <Button variant="destructive">Delete Item</Button>
                        <p className="text-sm text-muted-foreground">
                          Click buttons to trigger alert dialogs for
                          confirmation flows.
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                {slug === "calendar" && (
                  <div className="space-y-6">
                    <div className="p-6 border rounded-lg bg-muted/20">
                      <h3 className="font-medium mb-4">Calendar Demo</h3>
                      <div className="max-w-sm">
                        <div className="border rounded p-4 bg-background">
                          <div className="text-center font-medium mb-4">
                            December 2024
                          </div>
                          <div className="grid grid-cols-7 gap-1 text-sm">
                            <div
                              key="sun"
                              className="p-2 text-center text-muted-foreground"
                            >
                              S
                            </div>
                            <div
                              key="mon"
                              className="p-2 text-center text-muted-foreground"
                            >
                              M
                            </div>
                            <div
                              key="tue"
                              className="p-2 text-center text-muted-foreground"
                            >
                              T
                            </div>
                            <div
                              key="wed"
                              className="p-2 text-center text-muted-foreground"
                            >
                              W
                            </div>
                            <div
                              key="thu"
                              className="p-2 text-center text-muted-foreground"
                            >
                              T
                            </div>
                            <div
                              key="fri"
                              className="p-2 text-center text-muted-foreground"
                            >
                              F
                            </div>
                            <div
                              key="sat"
                              className="p-2 text-center text-muted-foreground"
                            >
                              S
                            </div>
                            <div key="day-1" className="p-2 text-center">
                              1
                            </div>
                            <div key="day-2" className="p-2 text-center">
                              2
                            </div>
                            <div key="day-3" className="p-2 text-center">
                              3
                            </div>
                            <div key="day-4" className="p-2 text-center">
                              4
                            </div>
                            <div key="day-5" className="p-2 text-center">
                              5
                            </div>
                            <div key="day-6" className="p-2 text-center">
                              6
                            </div>
                            <div key="day-7" className="p-2 text-center">
                              7
                            </div>
                            <div key="day-8" className="p-2 text-center">
                              8
                            </div>
                            <div key="day-9" className="p-2 text-center">
                              9
                            </div>
                            <div
                              key="day-10"
                              className="p-2 text-center bg-primary text-primary-foreground rounded"
                            >
                              10
                            </div>
                            <div key="day-11" className="p-2 text-center">
                              11
                            </div>
                            <div key="day-12" className="p-2 text-center">
                              12
                            </div>
                            <div key="day-13" className="p-2 text-center">
                              13
                            </div>
                            <div key="day-14" className="p-2 text-center">
                              14
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {slug === "checkbox" && (
                  <div className="space-y-6">
                    <div className="p-6 border rounded-lg bg-muted/20">
                      <h3 className="font-medium mb-4">Checkbox Examples</h3>
                      <div className="space-y-3">
                        <div className="flex items-center space-x-2">
                          <input
                            type="checkbox"
                            className="rounded border-input"
                            id="check1"
                          />
                          <label htmlFor="check1" className="text-sm">
                            Default checkbox
                          </label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <input
                            type="checkbox"
                            className="rounded border-input"
                            id="check2"
                            checked
                            readOnly
                          />
                          <label htmlFor="check2" className="text-sm">
                            Checked checkbox
                          </label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <input
                            type="checkbox"
                            className="rounded border-input opacity-50"
                            id="check3"
                            disabled
                          />
                          <label
                            htmlFor="check3"
                            className="text-sm opacity-50"
                          >
                            Disabled checkbox
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {slug === "dialog" && (
                  <div className="space-y-6">
                    <div className="p-6 border rounded-lg bg-muted/20">
                      <h3 className="font-medium mb-4">Dialog Demo</h3>
                      <div className="space-y-3">
                        <Button>Open Dialog</Button>
                        <Button variant="secondary">Settings Dialog</Button>
                        <p className="text-sm text-muted-foreground">
                          Dialogs for forms, confirmations, and detailed
                          content.
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                {slug === "dropdown-menu" && (
                  <div className="space-y-6">
                    <div className="p-6 border rounded-lg bg-muted/20">
                      <h3 className="font-medium mb-4">Dropdown Menu Demo</h3>
                      <div className="space-y-3">
                        <Button>Menu Trigger</Button>
                        <div className="border rounded p-2 bg-background max-w-xs">
                          <div className="p-2 hover:bg-muted rounded text-sm cursor-pointer">
                            Profile
                          </div>
                          <div className="p-2 hover:bg-muted rounded text-sm cursor-pointer">
                            Settings
                          </div>
                          <Separator className="my-1" />
                          <div className="p-2 hover:bg-muted rounded text-sm cursor-pointer text-destructive">
                            Logout
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {slug === "label" && (
                  <div className="space-y-6">
                    <div className="p-6 border rounded-lg bg-muted/20">
                      <h3 className="font-medium mb-4">Label Examples</h3>
                      <div className="space-y-4 max-w-sm">
                        <div>
                          <label className="text-sm font-medium">
                            Email Address
                          </label>
                          <input
                            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm mt-1"
                            placeholder="Enter email..."
                          />
                        </div>
                        <div>
                          <label className="text-sm font-medium text-destructive">
                            Required Field *
                          </label>
                          <input
                            className="flex h-10 w-full rounded-md border border-destructive bg-background px-3 py-2 text-sm mt-1"
                            placeholder="Required..."
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {slug === "navigation-menu" && (
                  <div className="space-y-6">
                    <div className="p-6 border rounded-lg bg-muted/20">
                      <h3 className="font-medium mb-4">Navigation Menu Demo</h3>
                      <div className="border rounded bg-background p-2">
                        <div className="flex space-x-1">
                          <div className="px-3 py-2 rounded hover:bg-muted text-sm cursor-pointer">
                            Home
                          </div>
                          <div className="px-3 py-2 rounded hover:bg-muted text-sm cursor-pointer">
                            Products
                          </div>
                          <div className="px-3 py-2 rounded hover:bg-muted text-sm cursor-pointer">
                            About
                          </div>
                          <div className="px-3 py-2 rounded hover:bg-muted text-sm cursor-pointer">
                            Contact
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {slug === "popover" && (
                  <div className="space-y-6">
                    <div className="p-6 border rounded-lg bg-muted/20">
                      <h3 className="font-medium mb-4">Popover Demo</h3>
                      <div className="space-y-3">
                        <Button>Open Popover</Button>
                        <div className="border rounded p-3 bg-background max-w-xs">
                          <h4 className="font-medium mb-2">Popover Content</h4>
                          <p className="text-sm text-muted-foreground">
                            This is the content inside a popover.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {slug === "progress" && (
                  <div className="space-y-6">
                    <div className="p-6 border rounded-lg bg-muted/20">
                      <h3 className="font-medium mb-4">Progress Examples</h3>
                      <div className="space-y-4">
                        <div>
                          <div className="flex justify-between text-sm mb-1">
                            <span>25% Complete</span>
                            <span>25%</span>
                          </div>
                          <div className="w-full bg-muted rounded-full h-2">
                            <div
                              className="bg-primary h-2 rounded-full"
                              style={{ width: "25%" }}
                            ></div>
                          </div>
                        </div>
                        <div>
                          <div className="flex justify-between text-sm mb-1">
                            <span>75% Complete</span>
                            <span>75%</span>
                          </div>
                          <div className="w-full bg-muted rounded-full h-2">
                            <div
                              className="bg-primary h-2 rounded-full"
                              style={{ width: "75%" }}
                            ></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {slug === "select" && (
                  <div className="space-y-6">
                    <div className="p-6 border rounded-lg bg-muted/20">
                      <h3 className="font-medium mb-4">Select Examples</h3>
                      <div className="space-y-4 max-w-sm">
                        <div>
                          <label className="text-sm font-medium">
                            Choose Option
                          </label>
                          <select className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm mt-1">
                            <option>Option 1</option>
                            <option>Option 2</option>
                            <option>Option 3</option>
                          </select>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {slug === "separator" && (
                  <div className="space-y-6">
                    <div className="p-6 border rounded-lg bg-muted/20">
                      <h3 className="font-medium mb-4">Separator Examples</h3>
                      <div className="space-y-4">
                        <div>
                          <p className="text-sm">Content above separator</p>
                          <Separator className="my-4" />
                          <p className="text-sm">Content below separator</p>
                        </div>
                        <div className="flex items-center space-x-4">
                          <Button size="sm">Left</Button>
                          <Separator orientation="vertical" className="h-4" />
                          <Button size="sm">Right</Button>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {slug === "sheet" && (
                  <div className="space-y-6">
                    <div className="p-6 border rounded-lg bg-muted/20">
                      <h3 className="font-medium mb-4">Sheet Demo</h3>
                      <div className="space-y-3">
                        <Button>Open Sheet</Button>
                        <Button variant="secondary">Settings Sheet</Button>
                        <p className="text-sm text-muted-foreground">
                          Slide-out panels for navigation, forms, and content.
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                {slug === "skeleton" && (
                  <div className="space-y-6">
                    <div className="p-6 border rounded-lg bg-muted/20">
                      <h3 className="font-medium mb-4">Skeleton Examples</h3>
                      <div className="space-y-4">
                        <div className="animate-pulse">
                          <div className="h-4 bg-muted rounded w-3/4"></div>
                          <div className="h-4 bg-muted rounded w-1/2 mt-2"></div>
                          <div className="h-4 bg-muted rounded w-5/6 mt-2"></div>
                        </div>
                        <div className="animate-pulse flex space-x-4">
                          <div className="rounded-full bg-muted h-10 w-10"></div>
                          <div className="flex-1 space-y-2">
                            <div className="h-4 bg-muted rounded w-3/4"></div>
                            <div className="h-4 bg-muted rounded w-1/2"></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {slug === "switch" && (
                  <div className="space-y-6">
                    <div className="p-6 border rounded-lg bg-muted/20">
                      <h3 className="font-medium mb-4">Switch Examples</h3>
                      <div className="space-y-3">
                        <div className="flex items-center space-x-2">
                          <div className="w-11 h-6 bg-muted rounded-full relative">
                            <div className="w-5 h-5 bg-background rounded-full absolute top-0.5 left-0.5 transition-transform"></div>
                          </div>
                          <label className="text-sm">Off Switch</label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <div className="w-11 h-6 bg-primary rounded-full relative">
                            <div className="w-5 h-5 bg-background rounded-full absolute top-0.5 right-0.5 transition-transform"></div>
                          </div>
                          <label className="text-sm">On Switch</label>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {slug === "table" && (
                  <div className="space-y-6">
                    <div className="p-6 border rounded-lg bg-muted/20">
                      <h3 className="font-medium mb-4">Table Example</h3>
                      <div className="border rounded overflow-hidden">
                        <table className="w-full">
                          <thead className="bg-muted">
                            <tr>
                              <th className="text-left p-2 text-sm font-medium">
                                Name
                              </th>
                              <th className="text-left p-2 text-sm font-medium">
                                Status
                              </th>
                              <th className="text-left p-2 text-sm font-medium">
                                Action
                              </th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr className="border-t">
                              <td className="p-2 text-sm">John Doe</td>
                              <td className="p-2 text-sm">
                                <Badge variant="default">Active</Badge>
                              </td>
                              <td className="p-2 text-sm">
                                <Button size="sm">Edit</Button>
                              </td>
                            </tr>
                            <tr className="border-t">
                              <td className="p-2 text-sm">Jane Smith</td>
                              <td className="p-2 text-sm">
                                <Badge variant="secondary">Pending</Badge>
                              </td>
                              <td className="p-2 text-sm">
                                <Button size="sm">Edit</Button>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                )}

                {slug === "textarea" && (
                  <div className="space-y-6">
                    <div className="p-6 border rounded-lg bg-muted/20">
                      <h3 className="font-medium mb-4">Textarea Examples</h3>
                      <div className="space-y-4 max-w-sm">
                        <div>
                          <label className="text-sm font-medium">Message</label>
                          <textarea
                            className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm mt-1"
                            placeholder="Enter your message..."
                            rows={3}
                          />
                        </div>
                        <div>
                          <label className="text-sm font-medium">
                            Disabled Textarea
                          </label>
                          <textarea
                            className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm mt-1 opacity-50"
                            placeholder="Disabled textarea"
                            disabled
                            rows={2}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {slug === "tooltip" && (
                  <div className="space-y-6">
                    <div className="p-6 border rounded-lg bg-muted/20">
                      <h3 className="font-medium mb-4">Tooltip Demo</h3>
                      <div className="space-y-3">
                        <Button>Hover for tooltip</Button>
                        <div className="border rounded p-2 bg-background text-sm max-w-xs">
                          Tooltip content appears here
                        </div>
                        <p className="text-sm text-muted-foreground">
                          Helpful information shown on hover or focus.
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                {slug === "sonner" && (
                  <div className="space-y-6">
                    <div className="p-6 border rounded-lg bg-muted/20">
                      <h3 className="font-medium mb-4">Toast/Sonner Demo</h3>
                      <div className="space-y-3">
                        <Button>Show Success Toast</Button>
                        <Button variant="destructive">Show Error Toast</Button>
                        <div className="border rounded p-3 bg-background max-w-xs">
                          <div className="flex items-center space-x-2">
                            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                            <span className="text-sm">
                              Success notification!
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
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

                {/* Component Variants Code Examples */}
                {slug === "button" && (
                  <div className="space-y-4">
                    <div className="bg-muted/50 rounded-lg p-4">
                      <h4 className="font-medium mb-2">Default Button</h4>
                      <div className="relative">
                        <CodeCopyButton
                          code={`import { Button } from "@/components/ui/button"

export function ButtonDemo() {
  return <Button>Button</Button>
}`}
                        />
                        <pre className="text-sm overflow-x-auto bg-background rounded p-3 border pr-12">
                          <code>{`import { Button } from "@/components/ui/button"

export function ButtonDemo() {
  return <Button>Button</Button>
}`}</code>
                        </pre>
                      </div>
                    </div>

                    <div className="bg-muted/50 rounded-lg p-4">
                      <h4 className="font-medium mb-2">Secondary Button</h4>
                      <div className="relative">
                        <CodeCopyButton
                          code={`import { Button } from "@/components/ui/button"

export function ButtonSecondary() {
  return <Button variant="secondary">Secondary</Button>
}`}
                        />
                        <pre className="text-sm overflow-x-auto bg-background rounded p-3 border pr-12">
                          <code>{`import { Button } from "@/components/ui/button"

export function ButtonSecondary() {
  return <Button variant="secondary">Secondary</Button>
}`}</code>
                        </pre>
                      </div>
                    </div>

                    <div className="bg-muted/50 rounded-lg p-4">
                      <h4 className="font-medium mb-2">Outline Button</h4>
                      <div className="relative">
                        <CodeCopyButton
                          code={`import { Button } from "@/components/ui/button"

export function ButtonOutline() {
  return <Button variant="outline">Outline</Button>
}`}
                        />
                        <pre className="text-sm overflow-x-auto bg-background rounded p-3 border pr-12">
                          <code>{`import { Button } from "@/components/ui/button"

export function ButtonOutline() {
  return <Button variant="outline">Outline</Button>
}`}</code>
                        </pre>
                      </div>
                    </div>

                    <div className="bg-muted/50 rounded-lg p-4">
                      <h4 className="font-medium mb-2">Ghost Button</h4>
                      <div className="relative">
                        <CodeCopyButton
                          code={`import { Button } from "@/components/ui/button"

export function ButtonGhost() {
  return <Button variant="ghost">Ghost</Button>
}`}
                        />
                        <pre className="text-sm overflow-x-auto bg-background rounded p-3 border pr-12">
                          <code>{`import { Button } from "@/components/ui/button"

export function ButtonGhost() {
  return <Button variant="ghost">Ghost</Button>
}`}</code>
                        </pre>
                      </div>
                    </div>

                    <div className="bg-muted/50 rounded-lg p-4">
                      <h4 className="font-medium mb-2">Destructive Button</h4>
                      <div className="relative">
                        <CodeCopyButton
                          code={`import { Button } from "@/components/ui/button"

export function ButtonDestructive() {
  return <Button variant="destructive">Destructive</Button>
}`}
                        />
                        <pre className="text-sm overflow-x-auto bg-background rounded p-3 border pr-12">
                          <code>{`import { Button } from "@/components/ui/button"

export function ButtonDestructive() {
  return <Button variant="destructive">Destructive</Button>
}`}</code>
                        </pre>
                      </div>
                    </div>
                  </div>
                )}

                {slug === "badge" && (
                  <div className="space-y-4">
                    <div className="bg-muted/50 rounded-lg p-4">
                      <h4 className="font-medium mb-2">Default Badge</h4>
                      <div className="relative">
                        <CodeCopyButton
                          code={`import { Badge } from "@/components/ui/badge"

export function BadgeDemo() {
  return <Badge>Badge</Badge>
}`}
                        />
                        <pre className="text-sm overflow-x-auto bg-background rounded p-3 border pr-12">
                          <code>{`import { Badge } from "@/components/ui/badge"

export function BadgeDemo() {
  return <Badge>Badge</Badge>
}`}</code>
                        </pre>
                      </div>
                    </div>

                    <div className="bg-muted/50 rounded-lg p-4">
                      <h4 className="font-medium mb-2">Secondary Badge</h4>
                      <div className="relative">
                        <CodeCopyButton
                          code={`import { Badge } from "@/components/ui/badge"

export function BadgeSecondary() {
  return <Badge variant="secondary">Secondary</Badge>
}`}
                        />
                        <pre className="text-sm overflow-x-auto bg-background rounded p-3 border pr-12">
                          <code>{`import { Badge } from "@/components/ui/badge"

export function BadgeSecondary() {
  return <Badge variant="secondary">Secondary</Badge>
}`}</code>
                        </pre>
                      </div>
                    </div>

                    <div className="bg-muted/50 rounded-lg p-4">
                      <h4 className="font-medium mb-2">Outline Badge</h4>
                      <div className="relative">
                        <CodeCopyButton
                          code={`import { Badge } from "@/components/ui/badge"

export function BadgeOutline() {
  return <Badge variant="outline">Outline</Badge>
}`}
                        />
                        <pre className="text-sm overflow-x-auto bg-background rounded p-3 border pr-12">
                          <code>{`import { Badge } from "@/components/ui/badge"

export function BadgeOutline() {
  return <Badge variant="outline">Outline</Badge>
}`}</code>
                        </pre>
                      </div>
                    </div>

                    <div className="bg-muted/50 rounded-lg p-4">
                      <h4 className="font-medium mb-2">Destructive Badge</h4>
                      <div className="relative">
                        <CodeCopyButton
                          code={`import { Badge } from "@/components/ui/badge"

export function BadgeDestructive() {
  return <Badge variant="destructive">Destructive</Badge>
}`}
                        />
                        <pre className="text-sm overflow-x-auto bg-background rounded p-3 border pr-12">
                          <code>{`import { Badge } from "@/components/ui/badge"

export function BadgeDestructive() {
  return <Badge variant="destructive">Destructive</Badge>
}`}</code>
                        </pre>
                      </div>
                    </div>
                  </div>
                )}

                {slug === "card" && (
                  <div className="space-y-4">
                    <div className="bg-muted/50 rounded-lg p-4">
                      <h4 className="font-medium mb-2">Basic Card</h4>
                      <div className="relative">
                        <CodeCopyButton
                          code={`import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

export function CardDemo() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Card Title</CardTitle>
        <CardDescription>Card Description</CardDescription>
      </CardHeader>
      <CardContent>
        <p>Card Content</p>
      </CardContent>
    </Card>
  )
}`}
                        />
                        <pre className="text-sm overflow-x-auto bg-background rounded p-3 border pr-12">
                          <code>{`import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

export function CardDemo() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Card Title</CardTitle>
        <CardDescription>Card Description</CardDescription>
      </CardHeader>
      <CardContent>
        <p>Card Content</p>
      </CardContent>
    </Card>
  )
}`}</code>
                        </pre>
                      </div>
                    </div>

                    <div className="bg-muted/50 rounded-lg p-4">
                      <h4 className="font-medium mb-2">Card with Footer</h4>
                      <div className="relative">
                        <CodeCopyButton
                          code={`import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export function CardWithFooter() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Card Title</CardTitle>
      </CardHeader>
      <CardContent>
        <p>Card content</p>
      </CardContent>
      <CardFooter>
        <Button>Action</Button>
      </CardFooter>
    </Card>
  )
}`}
                        />
                        <pre className="text-sm overflow-x-auto bg-background rounded p-3 border pr-12">
                          <code>{`import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export function CardWithFooter() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Card Title</CardTitle>
      </CardHeader>
      <CardContent>
        <p>Card content</p>
      </CardContent>
      <CardFooter>
        <Button>Action</Button>
      </CardFooter>
    </Card>
  )
}`}</code>
                        </pre>
                      </div>
                    </div>
                  </div>
                )}

                {slug === "input" && (
                  <div className="space-y-4">
                    <div className="bg-muted/50 rounded-lg p-4">
                      <h4 className="font-medium mb-2">Basic Input</h4>
                      <div className="relative">
                        <CodeCopyButton
                          code={`import { Input } from "@/components/ui/input"

export function InputDemo() {
  return <Input placeholder="Email" />
}`}
                        />
                        <pre className="text-sm overflow-x-auto bg-background rounded p-3 border pr-12">
                          <code>{`import { Input } from "@/components/ui/input"

export function InputDemo() {
  return <Input placeholder="Email" />
}`}</code>
                        </pre>
                      </div>
                    </div>

                    <div className="bg-muted/50 rounded-lg p-4">
                      <h4 className="font-medium mb-2">Input with Label</h4>
                      <div className="relative">
                        <CodeCopyButton
                          code={`import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export function InputWithLabel() {
  return (
    <div className="grid w-full max-w-sm items-center gap-1.5">
      <Label htmlFor="email">Email</Label>
      <Input type="email" id="email" placeholder="Email" />
    </div>
  )
}`}
                        />
                        <pre className="text-sm overflow-x-auto bg-background rounded p-3 border pr-12">
                          <code>{`import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export function InputWithLabel() {
  return (
    <div className="grid w-full max-w-sm items-center gap-1.5">
      <Label htmlFor="email">Email</Label>
      <Input type="email" id="email" placeholder="Email" />
    </div>
  )
}`}</code>
                        </pre>
                      </div>
                    </div>

                    <div className="bg-muted/50 rounded-lg p-4">
                      <h4 className="font-medium mb-2">Disabled Input</h4>
                      <div className="relative">
                        <CodeCopyButton
                          code={`import { Input } from "@/components/ui/input"

export function InputDisabled() {
  return <Input disabled placeholder="Email" />
}`}
                        />
                        <pre className="text-sm overflow-x-auto bg-background rounded p-3 border pr-12">
                          <code>{`import { Input } from "@/components/ui/input"

export function InputDisabled() {
  return <Input disabled placeholder="Email" />
}`}</code>
                        </pre>
                      </div>
                    </div>
                  </div>
                )}

                {/* Default fallback for other components */}
                {!["button", "badge", "card", "input"].includes(slug) && (
                  <div className="space-y-4">
                    <div className="bg-muted/50 rounded-lg p-4">
                      <h4 className="font-medium mb-2">Basic Usage</h4>
                      <div className="relative">
                        <CodeCopyButton
                          code={`import { ${doc.meta.component} } from "@/components/ui/${slug}"

export function ${doc.meta.component}Demo() {
  return <${doc.meta.component} />
}`}
                        />
                        <pre className="text-sm overflow-x-auto bg-background rounded p-3 border pr-12">
                          <code>{`import { ${doc.meta.component} } from "@/components/ui/${slug}"

export function ${doc.meta.component}Demo() {
  return <${doc.meta.component} />
}`}</code>
                        </pre>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          }
          markdownContent={<MarkdownCopyBlock content={doc.content} />}
        />

        {/* Footer */}
        <div className="border-t pt-8 mt-12">
          <div className="flex items-center justify-between">
            <div className="text-sm text-muted-foreground">
              Found an issue with this documentation?{" "}
              <Button variant="secondary" className="p-0 h-auto">
                <IconExternalLink className="h-3 w-3 mr-1" />
                Edit on GitHub
              </Button>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="secondary" size="sm">
                <IconCopy className="h-4 w-4 mr-2" />
                Copy import
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
