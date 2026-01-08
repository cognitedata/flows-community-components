import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/aura/card';
import { Button } from '@/components/ui/aura/button';
import { Badge } from '@/components/ui/aura/badge';
import type { ComponentExamples } from './types';
import {
  IconChartLine,
  IconDotsVertical,
  IconGauge,
  IconReportAnalytics,
  IconCube,
} from '@tabler/icons-react';
import Image from 'next/image';
import { SwapSlot } from '@/components/ui/aura/swap-slot';

function BasicDemo() {
  return (
    <Card className="w-[362px]">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>21PT1019</CardTitle>
          <Button variant="ghost" size="icon-sm">
            <IconDotsVertical />
          </Button>
        </div>
        <CardDescription>Pressure over last 24 hours</CardDescription>
      </CardHeader>
      <CardContent></CardContent>
      <CardFooter className="flex gap-2">
        <Badge variant="fjord">
          <IconChartLine size={12} /> Time series
        </Badge>
        <Badge variant="nordic">
          <IconGauge size={12} /> Value
        </Badge>
        <Badge variant="aurora">
          <IconReportAnalytics size={12} /> RCA
        </Badge>
      </CardFooter>
    </Card>
  );
}

function TextInFooterDemo() {
  return (
    <Card className="w-[362px]">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>21PT1019</CardTitle>
          <Button variant="ghost" size="icon-sm">
            <IconDotsVertical />
          </Button>
        </div>
        <CardDescription>Pressure over last 24 hours</CardDescription>
      </CardHeader>
      <CardContent></CardContent>
      <CardFooter className="gap-1 flex-col">
        <div className="flex items-center text-sm font-medium text-foreground tracking-normal">
          Trending up by 5.2% this month <IconChartLine size={16} />
        </div>
        <div className="text-sm font-normal text-muted-foreground tracking-normal">
          No alerts
        </div>
      </CardFooter>
    </Card>
  );
}

function BadgeInHeaderDemo() {
  return (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex gap-1.5 items-baseline">
            <Badge variant="mountain">
              <IconCube size={12} />
            </Badge>
            <div>
              <CardTitle>Skarv</CardTitle>
              <CardDescription>Point cloud scene</CardDescription>
            </div>
          </div>
          <Button variant="ghost" size="icon-sm">
            <IconDotsVertical />
          </Button>
        </div>
      </CardHeader>
      <CardContent className="">
        <div className="text-base text-secondary-foreground tracking-tightest pb-2">
          Model ID: 4602269428617841
        </div>
        <Image
          src="/card-example.png"
          alt="card example"
          width={330}
          height={200}
        />
      </CardContent>
      <CardFooter>
        <Button variant="secondary" size="sm">
          View scene
        </Button>
      </CardFooter>
    </Card>
  );
}

//Input example coming soon. Input component still draft.

function CardHoverDemo() {
  return (
    <Card className="w-[362px]">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex gap-1.5 items-baseline">
            <Badge variant="mountain">
              <IconCube size={12} />
            </Badge>
            <div>
              <CardTitle>Title</CardTitle>
              <CardDescription>Subtitle</CardDescription>
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent className="gap-2">
        <div className="text-base text-secondary-foreground tracking-tightest">
          Description
        </div>
        {/* Swapslot coming soon. Implementation pending. */}
      </CardContent>
      <CardFooter className="gap-1 flex-col">
        <div className="flex items-center text-sm font-medium text-foreground tracking-normal">
          Trending up by 5.2% this month <IconChartLine size={16} />
        </div>
        <div className="text-sm font-normal text-muted-foreground tracking-normal">
          No alerts
        </div>
      </CardFooter>
    </Card>
  );
}
export const cardExamples: ComponentExamples = {
  basic: {
    title: 'Basic Card',
    description: 'A simple card with header and content',
    component: BasicDemo,
    difficulty: 'beginner',
    code: `import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/aura/card"
import { Button } from "@/components/ui/aura/button"
import { Badge } from "@/components/ui/aura/badge"
import { IconChartLine, IconDotsVertical, IconGauge, IconReportAnalytics } from "@tabler/icons-react"

export function BasicDemo() {
  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>21PT1019</CardTitle>
          <Button variant="ghost" size="icon-sm">
            <IconDotsVertical />
          </Button>
        </div>
        <CardDescription>Pressure over last 24 hours</CardDescription>
      </CardHeader>
      <CardContent></CardContent>
      <CardFooter className="flex gap-2">
        <Badge variant="fjord">
          <IconChartLine size={12} /> Time series
        </Badge>
        <Badge variant="nordic">
          <IconGauge size={12} /> Value
        </Badge>
        <Badge variant="aurora">
          <IconReportAnalytics size={12} /> RCA
        </Badge>
      </CardFooter>
    </Card>
  )
}`,
  },
  withFooter: {
    title: 'Card with Text Footer',
    description: 'Card with text content in the footer',
    component: TextInFooterDemo,
    difficulty: 'beginner',
    code: `import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/aura/card"
import { Button } from "@/components/ui/aura/button"
import { IconChartLine, IconDotsVertical } from "@tabler/icons-react"

export function TextInFooterDemo() {
  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>21PT1019</CardTitle>
          <Button variant="ghost" size="icon-sm">
            <IconDotsVertical />
          </Button>
        </div>
        <CardDescription>Pressure over last 24 hours</CardDescription>
      </CardHeader>
      <CardContent></CardContent>
      <CardFooter className="gap-1 flex-col">
        <div className="flex items-center text-sm font-medium text-foreground tracking-normal">
          Trending up by 5.2% this month <IconChartLine size={16} />
        </div>
        <div className="text-sm font-normal text-muted-foreground tracking-normal">
          No alerts
        </div>
      </CardFooter>
    </Card>
  )
}`,
  },
  badgeInHeader: {
    title: 'Card with Badge in Header',
    description: 'Card with badge in the header and image content',
    component: BadgeInHeaderDemo,
    difficulty: 'beginner',
    code: `import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/aura/card"
import { Button } from "@/components/ui/aura/button"
import { Badge } from "@/components/ui/aura/badge"
import { IconCube, IconDotsVertical } from "@tabler/icons-react"
import Image from "next/image"

export function BadgeInHeaderDemo() {
  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex gap-1.5">
            <Badge variant="mountain">
              <IconCube size={16} />
            </Badge>
            <CardTitle>Skarv</CardTitle>
          </div>
          <Button variant="ghost" size="icon-sm">
            <IconDotsVertical />
          </Button>
        </div>
        <CardDescription>Point cloud scene</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="text-base text-secondary-foreground tracking-tightest">
          Model ID: 4602269428617841
        </div>
        <Image
          src="/images/card-example.png"
          alt="card example"
          width={330}
          height={200}
        />
      </CardContent>
      <CardFooter className="gap-1 flex-col">
        <Button variant="outline">View scene</Button>
      </CardFooter>
    </Card>
  )
}`,
  },
  //   signUpCard: {
  //     title: 'Sign Up Card',
  //     description: 'Card with sign up form',
  //     component: SignUpCardDemo,
  //     difficulty: 'beginner',
  //     code: `import {
  //       Card,
  //       CardContent,
  //       CardDescription,
  //       CardFooter,
  //       CardHeader,
  //       CardTitle,
  //     } from "@/components/ui/aura/card"
  //     import { Button } from "@/components/ui/aura/button"
  //     import { Badge } from "@/components/ui/aura/badge"
  //     import { IconRocket, IconDotsVertical } from "@tabler/icons-react"
  //     import { Input } from "@/components/ui/aura/input"
  //     import { Label } from "@/components/ui/aura/label"

  // export function SignUpCardDemo() {
  //   return (
  //     <Card className="w-full max-w-sm">
  //       <CardHeader>
  //         <Badge variant="mountain">
  //           <IconRocket size={16} />
  //         </Badge>
  //         <CardTitle>Sign in</CardTitle>
  //       </CardHeader>
  //       <CardContent>
  //         <Label htmlFor="email">Email</Label>
  //         <Input id="email" placeholder="Email" />
  //         <Label htmlFor="password">Password</Label>
  //         <Input id="password" placeholder="Password" />
  //       </CardContent>
  //     </Card>
  //                       )
  //   }
  // }
  // }`,
  // },
  cardHover: {
    title: 'Card Hover',
    description: 'Card with hover effect',
    component: CardHoverDemo,
    difficulty: 'beginner',
    code: `import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/aura/card"
    import { Button } from "@/components/ui/aura/button"
    import { Badge } from "@/components/ui/aura/badge"
    import { IconChartLine, IconDotsVertical, IconGauge, IconReportAnalytics } from "@tabler/icons-react"

    export function CardHoverDemo() {
      return (
        <Card className="w-full max-w-md">
            <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>21PT1019</CardTitle>
              <Button variant="ghost" size="icon-sm">
                <IconDotsVertical />
              </Button>
            </div>
            <CardDescription>Pressure over last 24 hours</CardDescription>
          </CardHeader>
          <CardContent></CardContent>
          <CardFooter className="flex gap-2">
            <Badge variant="fjord">
              <IconChartLine size={12} /> Time series
            </Badge>
            <Badge variant="nordic">
              <IconGauge size={12} /> Value
            </Badge>
            <Badge variant="aurora">
              <IconReportAnalytics size={12} /> RCA
            </Badge>
          </CardFooter>
        </Card>
      );
    }
    }`,
  },
};

export const cardMeta = {
  name: 'Card',
  description:
    'A flexible card component with header, content, and footer sections for organizing and displaying content.',
  llmUsage:
    'When creating content containers, use `<Card>` with `<CardHeader>`, `<CardContent>`, and `<CardFooter>` subcomponents. Use `<CardTitle>` and `<CardDescription>` for header content.',
  importPath: '@/components/ui/aura/card',
};
