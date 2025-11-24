import { SectionLayout } from '@/components/section-layout';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/cognite/card';
import { Badge } from '@/components/ui/cognite/badge';
import { IconCalendarStats as CalendarDays, IconGitCommit as GitCommit } from '@tabler/icons-react';

const releases = [
  {
    version: 'v1.0.0',
    date: 'December 2024',
    status: 'Latest',
    description:
      'Initial release with comprehensive component documentation system',
    features: [
      '24 ShadCN components with full documentation',
      'Base UI-style documentation system',
      'Live component previews and code examples',
      'Searchable component library',
      'LLM-friendly documentation structure',
      'MDX rendering with syntax highlighting',
    ],
  },
  {
    version: 'v0.9.0',
    date: 'November 2024',
    status: 'Beta',
    description: 'Pre-release with core design system components',
    features: [
      'Design tokens implementation',
      'Motion guidelines and animations',
      'Core UI primitives',
      'Layout patterns',
      'Theme system',
    ],
  },
];

export default function ReleasesPage() {
  return (
    <SectionLayout>
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold mb-4">Releases</h1>
          <p className="text-lg text-muted-foreground max-w-3xl">
            Track the evolution of our design system with detailed release
            notes, new features, and breaking changes.
          </p>
        </div>

        <div className="space-y-6">
          {releases.map((release) => (
            <Card key={release.version} className="relative">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <CardTitle className="text-2xl">
                      {release.version}
                    </CardTitle>
                    <Badge
                      variant={
                        release.status === 'Latest' ? 'default' : 'secondary'
                      }
                    >
                      {release.status}
                    </Badge>
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <CalendarDays className="h-4 w-4" />
                    <span className="text-sm">{release.date}</span>
                  </div>
                </div>
                <CardDescription className="text-base">
                  {release.description}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <h4 className="font-medium flex items-center gap-2">
                    <GitCommit className="h-4 w-4" />
                    What&apos;s new
                  </h4>
                  <ul className="space-y-2">
                    {release.features.map((feature, featureIndex) => (
                      <li
                        key={featureIndex}
                        className="flex items-start gap-2 text-sm"
                      >
                        <span className="text-green-500 mt-1">•</span>
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <Card className="border-dashed">
          <CardContent className="flex items-center justify-center py-12">
            <div className="text-center space-y-2">
              <h3 className="font-medium">More releases coming soon</h3>
              <p className="text-sm text-muted-foreground">
                We&apos;re continuously improving the design system
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </SectionLayout>
  );
}
