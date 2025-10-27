"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Search, Book, Component, Code2, Palette } from "lucide-react";
import { Button } from "@/components/ui/cognite/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/cognite/card";
import { Input } from "@/components/ui/cognite/input";
import { Badge } from "@/components/ui/cognite/badge";
import { useState } from "react";

const componentCategories = [
  {
    name: "Form Components",
    icon: Component,
    description: "Interactive form elements and controls",
    components: [
      {
        name: "Button",
        path: "/docs/components/button",
        description: "Interactive button component",
      },
      {
        name: "Input",
        path: "/docs/components/input",
        description: "Text input field",
      },
      {
        name: "Label",
        path: "/docs/components/label",
        description: "Form field labels",
      },
      {
        name: "Textarea",
        path: "/docs/components/textarea",
        description: "Multi-line text input",
      },
      {
        name: "Checkbox",
        path: "/docs/components/checkbox",
        description: "Checkbox input",
      },
      {
        name: "Switch",
        path: "/docs/components/switch",
        description: "Toggle switch",
      },
      {
        name: "Select",
        path: "/docs/components/select",
        description: "Dropdown selection",
      },
    ],
  },
  {
    name: "Layout Components",
    icon: Palette,
    description: "Structural components for organizing content",
    components: [
      {
        name: "Card",
        path: "/docs/components/card",
        description: "Content container",
      },
      {
        name: "Separator",
        path: "/docs/components/separator",
        description: "Visual divider",
      },
      {
        name: "Tabs",
        path: "/docs/components/tabs",
        description: "Tabbed interface",
      },
      {
        name: "Accordion",
        path: "/docs/components/accordion",
        description: "Collapsible panels",
      },
    ],
  },
  {
    name: "Feedback Components",
    icon: Code2,
    description: "Components for user feedback and status",
    components: [
      {
        name: "Badge",
        path: "/docs/components/badge",
        description: "Status indicator",
      },
      {
        name: "Progress",
        path: "/docs/components/progress",
        description: "Progress bar",
      },
      {
        name: "Skeleton",
        path: "/docs/components/skeleton",
        description: "Loading placeholder",
      },
      {
        name: "Sonner",
        path: "/docs/components/sonner",
        description: "Toast notifications",
      },
    ],
  },
  {
    name: "Overlay Components",
    icon: Book,
    description: "Modal and overlay components",
    components: [
      {
        name: "Dialog",
        path: "/docs/components/dialog",
        description: "Modal dialog",
      },
      {
        name: "Alert Dialog",
        path: "/docs/components/alert-dialog",
        description: "Confirmation dialog",
      },
      {
        name: "Popover",
        path: "/docs/components/popover",
        description: "Floating content",
      },
      {
        name: "Tooltip",
        path: "/docs/components/tooltip",
        description: "Contextual information",
      },
      {
        name: "Sheet",
        path: "/docs/components/sheet",
        description: "Slide-out panel",
      },
    ],
  },
];

const allComponents = componentCategories.flatMap(
  (category) => category.components
);

export default function DocsPage() {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredComponents = allComponents.filter(
    (component) =>
      component.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      component.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredCategories = componentCategories
    .map((category) => ({
      ...category,
      components: category.components.filter(
        (component) =>
          component.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          component.description
            .toLowerCase()
            .includes(searchQuery.toLowerCase())
      ),
    }))
    .filter((category) => category.components.length > 0);

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
            <h1 className="text-4xl md:text-6xl font-bold">
              Component Documentation
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Comprehensive documentation and live examples for all components
              in our design system. Copy code snippets and see components in
              action.
            </p>
          </div>

          {/* Search */}
          <div className="max-w-md mx-auto">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                type="text"
                placeholder="Search components..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl mx-auto">
            <Card>
              <CardContent className="flex flex-col items-center justify-center p-6">
                <div className="text-3xl font-bold">{allComponents.length}</div>
                <div className="text-muted-foreground">Components</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="flex flex-col items-center justify-center p-6">
                <div className="text-3xl font-bold">
                  {componentCategories.length}
                </div>
                <div className="text-muted-foreground">Categories</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="flex flex-col items-center justify-center p-6">
                <div className="text-3xl font-bold">100%</div>
                <div className="text-muted-foreground">TypeScript</div>
              </CardContent>
            </Card>
          </div>

          {/* Components by Category */}
          {searchQuery === "" ? (
            <div className="space-y-12">
              {componentCategories.map((category, categoryIndex) => (
                <motion.section
                  key={category.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: categoryIndex * 0.1 }}
                  className="space-y-6"
                >
                  <div className="flex items-center gap-3">
                    <category.icon className="h-6 w-6 text-primary" />
                    <div>
                      <h2 className="text-2xl font-bold">{category.name}</h2>
                      <p className="text-muted-foreground">
                        {category.description}
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {category.components.map((component, componentIndex) => (
                      <motion.div
                        key={component.name}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{
                          duration: 0.3,
                          delay: componentIndex * 0.05,
                        }}
                      >
                        <Link href={component.path}>
                          <Card className="hover:shadow-lg transition-shadow cursor-pointer h-full">
                            <CardHeader>
                              <CardTitle className="text-lg">
                                {component.name}
                              </CardTitle>
                              <CardDescription>
                                {component.description}
                              </CardDescription>
                            </CardHeader>
                            <CardContent>
                              <div className="flex justify-between items-center">
                                <Badge variant="secondary">Component</Badge>
                                <Button variant="ghost" size="sm">
                                  View docs →
                                </Button>
                              </div>
                            </CardContent>
                          </Card>
                        </Link>
                      </motion.div>
                    ))}
                  </div>
                </motion.section>
              ))}
            </div>
          ) : (
            /* Search Results */
            <div className="space-y-6">
              <div className="text-center">
                <h2 className="text-2xl font-bold">Search Results</h2>
                <p className="text-muted-foreground">
                  Found {filteredComponents.length} component
                  {filteredComponents.length !== 1 ? "s" : ""} matching &quot;
                  {searchQuery}&quot;
                </p>
              </div>

              {filteredCategories.length > 0 ? (
                <div className="space-y-8">
                  {filteredCategories.map((category) => (
                    <div key={category.name} className="space-y-4">
                      <h3 className="text-xl font-semibold">{category.name}</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {category.components.map((component) => (
                          <Link key={component.name} href={component.path}>
                            <Card className="hover:shadow-lg transition-shadow cursor-pointer">
                              <CardHeader>
                                <CardTitle className="text-lg">
                                  {component.name}
                                </CardTitle>
                                <CardDescription>
                                  {component.description}
                                </CardDescription>
                              </CardHeader>
                              <CardContent>
                                <div className="flex justify-between items-center">
                                  <Badge variant="secondary">Component</Badge>
                                  <Button variant="ghost" size="sm">
                                    View docs →
                                  </Button>
                                </div>
                              </CardContent>
                            </Card>
                          </Link>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <p className="text-muted-foreground">
                    No components found matching your search.
                  </p>
                </div>
              )}
            </div>
          )}

          {/* Getting Started */}
          <div className="text-center space-y-6 py-16 border-t">
            <h2 className="text-3xl font-bold">Getting started</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              All components are built with React, TypeScript, and Tailwind CSS.
              Copy the code examples and start building your next project.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" asChild>
                <Link href="/docs/installation">Installation Guide</Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="/docs/getting-started">
                  <Book className="mr-2 h-4 w-4" />
                  Getting Started
                </Link>
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
