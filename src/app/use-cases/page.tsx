import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/cognite/card';
import { Badge } from '@/components/ui/cognite/badge';
import { Button } from '@/components/ui/cognite/button';
import {
  BarChart3,
  ShoppingBag,
  Users,
  FileText,
  Calendar,
  MessageSquare,
  Building,
  Zap,
  ArrowRight,
} from 'lucide-react';
import Link from 'next/link';

const useCases = [
  {
    icon: BarChart3,
    title: 'Data Dashboards',
    description:
      'Build comprehensive analytics and reporting interfaces with beautiful charts and KPI cards.',
    components: ['Card', 'Badge', 'Progress', 'Tabs', 'Table'],
    examples: [
      'Revenue analytics dashboard',
      'User engagement metrics',
      'Performance monitoring',
    ],
    href: '/sandbox?example=dashboard',
  },
  {
    icon: ShoppingBag,
    title: 'E-commerce Platforms',
    description:
      'Create modern shopping experiences with product cards, checkout flows, and user accounts.',
    components: ['Card', 'Button', 'Input', 'Badge', 'Dialog'],
    examples: [
      'Product listing pages',
      'Shopping cart interface',
      'Checkout forms',
    ],
    href: '/sandbox?example=ecommerce',
  },
  {
    icon: Users,
    title: 'User Management',
    description:
      'Design comprehensive user interfaces for team management, profiles, and permissions.',
    components: ['Table', 'Dialog', 'Form', 'Avatar', 'Badge'],
    examples: [
      'Team member directory',
      'User profile settings',
      'Role-based permissions',
    ],
    href: '/sandbox?example=users',
  },
  {
    icon: FileText,
    title: 'Content Management',
    description:
      'Build editorial interfaces for blogs, documentation, and content creation platforms.',
    components: ['Form', 'Textarea', 'Tabs', 'Card', 'Badge'],
    examples: [
      'Blog post editor',
      'Document management',
      'Content publishing workflow',
    ],
    href: '/sandbox?example=cms',
  },
  {
    icon: Calendar,
    title: 'Scheduling & Events',
    description:
      'Create appointment booking, event management, and calendar applications.',
    components: ['Calendar', 'Dialog', 'Form', 'Card', 'Badge'],
    examples: ['Appointment booking', 'Event management', 'Meeting scheduler'],
    href: '/sandbox?example=calendar',
  },
  {
    icon: MessageSquare,
    title: 'Communication Tools',
    description:
      'Design chat interfaces, messaging platforms, and collaboration tools.',
    components: ['ScrollArea', 'Input', 'Button', 'Card', 'Avatar'],
    examples: [
      'Team chat interface',
      'Customer support portal',
      'Real-time messaging',
    ],
    href: '/sandbox?example=chat',
  },
  {
    icon: Building,
    title: 'Business Applications',
    description:
      'Build enterprise software, CRM systems, and business process management tools.',
    components: ['Table', 'Form', 'Dialog', 'Tabs', 'Card'],
    examples: ['CRM dashboard', 'Invoice management', 'Project tracking'],
    href: '/sandbox?example=business',
  },
  {
    icon: Zap,
    title: 'API Documentation',
    description:
      'Create interactive API docs, developer portals, and technical documentation.',
    components: ['Tabs', 'Code', 'Card', 'Badge', 'Button'],
    examples: [
      'API reference pages',
      'Interactive code examples',
      'Developer onboarding',
    ],
    href: '/sandbox?example=docs',
  },
];

export default function UseCasesPage() {
  return (
    <div className="px-3 py-8">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Page Header */}
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Use Cases</h1>
          <p className="text-lg text-muted-foreground mt-2">
            Explore real-world applications and see how Aura components come
            together to build modern interfaces
          </p>
        </div>

        {/* Use Cases Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {useCases.map((useCase) => (
            <Card
              key={useCase.title}
              className="group hover:border-primary/50 transition-all duration-200"
            >
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                    <useCase.icon className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <CardTitle className="text-lg">{useCase.title}</CardTitle>
                  </div>
                </div>
                <CardDescription className="mt-2">
                  {useCase.description}
                </CardDescription>
              </CardHeader>

              <CardContent className="space-y-4">
                {/* Components Used */}
                <div>
                  <h4 className="text-sm font-medium mb-2">Key Components</h4>
                  <div className="flex flex-wrap gap-1">
                    {useCase.components.map((component) => (
                      <Badge
                        key={component}
                        variant="secondary"
                        className="text-xs"
                      >
                        {component}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Examples */}
                <div>
                  <h4 className="text-sm font-medium mb-2">Examples</h4>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    {useCase.examples.map((example) => (
                      <li key={example} className="flex items-center gap-2">
                        <div className="w-1 h-1 rounded-full bg-primary" />
                        {example}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* CTA */}
                <Button asChild className="w-full" variant="outline" size="sm">
                  <Link href={useCase.href}>
                    Try in Sandbox
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center py-12">
          <Card className="max-w-2xl mx-auto">
            <CardHeader>
              <CardTitle>Ready to Build?</CardTitle>
              <CardDescription>
                Start building your own applications with Aura components and
                our AI-powered sandbox
              </CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg">
                <Link href="/sandbox">
                  Open Sandbox
                  <Zap className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <Link href="/primitives">Browse Components</Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
