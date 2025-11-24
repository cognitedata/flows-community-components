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
  IconDownload as Download,
  IconPalette as Palette,
  IconPhoto as LucideImage,
} from '@tabler/icons-react';

const illustrationCategories = [
  {
    name: 'Brand illustrations',
    description: 'Core brand illustrations for marketing and onboarding',
    count: 24,
    status: 'Available',
  },
  {
    name: 'Empty states',
    description: 'Friendly illustrations for empty states and error pages',
    count: 12,
    status: 'Available',
  },
  {
    name: 'Onboarding',
    description: 'Step-by-step illustrations for user onboarding flows',
    count: 8,
    status: 'In progress',
  },
  {
    name: 'Feature highlights',
    description: 'Product feature illustrations for marketing pages',
    count: 16,
    status: 'Available',
  },
];

export default function IllustrationsPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold mb-4">Illustrations</h1>
        <p className="text-lg text-muted-foreground max-w-3xl">
          A collection of cohesive illustrations that support our brand identity
          and enhance user experience across different touchpoints.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {illustrationCategories.map((category, index) => (
          <Card key={index} className="relative">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-muted">
                    <LucideImage className="h-5 w-5" />
                  </div>
                  <div>
                    <CardTitle className="text-lg">{category.name}</CardTitle>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-sm text-muted-foreground">
                        {category.count} illustrations
                      </span>
                      <Badge
                        variant={
                          category.status === 'Available'
                            ? 'default'
                            : 'secondary'
                        }
                      >
                        {category.status}
                      </Badge>
                    </div>
                  </div>
                </div>
              </div>
              <CardDescription>{category.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  disabled={category.status !== 'Available'}
                >
                  <Palette className="h-4 w-4 mr-2" />
                  Preview
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  disabled={category.status !== 'Available'}
                >
                  <Download className="h-4 w-4 mr-2" />
                  Download
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="border-dashed">
        <CardContent className="flex items-center justify-center py-12">
          <div className="text-center space-y-4">
            <h3 className="font-medium">Need custom illustrations?</h3>
            <p className="text-sm text-muted-foreground max-w-md">
              Our design team can create custom illustrations that match our
              brand style. Reach out to discuss your specific needs.
            </p>
            <Button variant="outline">Contact design team</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
