import { Button } from "@/components/ui/cognite/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/cognite/card";
import { Badge } from "@/components/ui/cognite/badge";
import {
  MessageSquare,
  BarChart3,
  Users,
  Palette,
  MessageCircle,
  ArrowRight,
  Sparkles,
} from "lucide-react";
import Link from "next/link";

const blockCategories = [
  {
    icon: MessageSquare,
    title: "Agent chat",
    description:
      "Interactive AI chat interfaces with real-time responses, typing indicators, and message threading.",
    href: "/blocks/agent-chat",
    features: [
      "Typing indicators",
      "Message threading",
      "AI responses",
      "Code highlighting",
    ],
    status: "Interactive",
  },
  {
    icon: Palette,
    title: "Canvas",
    description:
      "Creative workspace blocks with drawing tools, collaborative editing, and real-time sync.",
    href: "/blocks/canvas",
    features: [
      "Drawing tools",
      "Collaborative editing",
      "Shape library",
      "Export options",
    ],
    status: "Interactive",
  },
  {
    icon: MessageCircle,
    title: "Commenting",
    description:
      "Rich commenting and annotation blocks with threaded discussions and mentions.",
    href: "/blocks/commenting",
    features: ["Threaded replies", "Mentions", "Rich text", "Reactions"],
    status: "Interactive",
  },
  {
    icon: BarChart3,
    title: "Dashboards",
    description:
      "Dynamic data visualization blocks with charts, KPIs, and real-time updates.",
    href: "/blocks/dashboards",
    features: [
      "Live charts",
      "KPI cards",
      "Data filtering",
      "Responsive layouts",
    ],
    status: "Interactive",
  },
  {
    icon: Users,
    title: "Shift handover",
    description:
      "Collaborative workflow blocks for team transitions and task management.",
    href: "/blocks/shift-handover",
    features: [
      "Task lists",
      "Team updates",
      "Status tracking",
      "Notifications",
    ],
    status: "Interactive",
  },
];

export default function BlocksPage() {
  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div className="space-y-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">About</h1>
          <p className="text-lg text-muted-foreground mt-2">
            Complete UI components with animations, interactions, and real-world
            use cases
          </p>
        </div>

        <div className="bg-muted/50 border rounded-lg p-4">
          <p className="text-sm text-muted-foreground">
            Each component demonstrates advanced interactions, micro-animations,
            and state management patterns. Perfect for understanding how
            components work together in real applications.
          </p>
        </div>
      </div>

      {/* Components Section */}
      <div className="space-y-6">
        <h2 className="text-2xl font-bold tracking-tight">Components</h2>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {blockCategories.map((block) => (
            <Card
              key={block.title}
              className="group hover:border-primary/50 transition-all duration-200 hover:shadow-lg"
            >
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                      <block.icon className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <CardTitle className="text-lg">{block.title}</CardTitle>
                      <Badge variant="secondary" className="mt-1 text-xs">
                        {block.status}
                      </Badge>
                    </div>
                  </div>
                </div>
                <CardDescription className="mt-2">
                  {block.description}
                </CardDescription>
              </CardHeader>

              <CardContent className="space-y-4">
                {/* Features */}
                <div>
                  <h4 className="text-sm font-medium mb-2">Key Features</h4>
                  <div className="grid grid-cols-2 gap-1">
                    {block.features.map((feature) => (
                      <div
                        key={feature}
                        className="flex items-center gap-2 text-xs text-muted-foreground"
                      >
                        <div className="w-1 h-1 rounded-full bg-primary" />
                        {feature}
                      </div>
                    ))}
                  </div>
                </div>

                {/* CTA */}
                <Button
                  variant="secondary"
                  asChild
                  className="w-full"
                  size="sm"
                >
                  <Link href={block.href}>
                    Explore component
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Bottom Section */}
      <div className="bg-linear-to-r from-primary/5 to-primary/10 border rounded-lg p-6">
        <div className="text-center space-y-4">
          <h2 className="text-2xl font-bold">
            Building interactive experiences
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            These components showcase advanced interaction patterns, smooth
            animations, and real-time functionality. Each example demonstrates
            best practices for motion design, state management, and user
            experience.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild>
              <Link href="/sandbox">
                Build your own
                <Sparkles className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button variant="outline" asChild>
              <Link href="/primitives">View components</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
