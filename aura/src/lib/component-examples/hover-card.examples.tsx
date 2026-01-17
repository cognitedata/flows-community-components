import { Button } from '@/components/ui/aura/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/aura/avatar';
import { Badge } from '@/components/ui/aura/badge';
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from '@/components/ui/aura/hover-card';
import type { ComponentExamples } from './types';

function BasicDemo() {
  return (
    <div className="flex justify-center items-center min-h-[200px]">
      <HoverCard>
        <HoverCardTrigger asChild>
          <Button variant="link">@nextjs</Button>
        </HoverCardTrigger>
        <HoverCardContent className="w-80">
          <div className="flex justify-between space-x-4">
            <Avatar>
              <AvatarImage src="https://github.com/vercel.png" />
              <AvatarFallback>VC</AvatarFallback>
            </Avatar>
            <div className="space-y-1">
              <h4 className="text-sm font-semibold">@nextjs</h4>
              <p className="text-sm">
                The React Framework – created and maintained by @vercel.
              </p>
              <div className="flex items-center pt-2">
                <span className="text-xs text-muted-foreground">
                  Joined December 2021
                </span>
              </div>
            </div>
          </div>
        </HoverCardContent>
      </HoverCard>
    </div>
  );
}

function WithBadgesDemo() {
  return (
    <div className="flex justify-center items-center gap-4 min-h-[200px]">
      <HoverCard>
        <HoverCardTrigger asChild>
          <Button variant="outline">Product Manager</Button>
        </HoverCardTrigger>
        <HoverCardContent className="w-80">
          <div className="space-y-2">
            <h4 className="text-sm font-semibold">Product Manager</h4>
            <p className="text-sm text-muted-foreground">
              Lead product strategy and roadmap for the design system
            </p>
            <div className="flex flex-wrap gap-2 pt-2">
              <Badge variant="secondary">Strategy</Badge>
              <Badge variant="secondary">Planning</Badge>
              <Badge variant="secondary">Research</Badge>
            </div>
          </div>
        </HoverCardContent>
      </HoverCard>

      <HoverCard>
        <HoverCardTrigger asChild>
          <Button variant="outline">Senior Developer</Button>
        </HoverCardTrigger>
        <HoverCardContent className="w-80">
          <div className="space-y-2">
            <h4 className="text-sm font-semibold">Senior Developer</h4>
            <p className="text-sm text-muted-foreground">
              Full-stack engineer specialising in React and Node.js
            </p>
            <div className="flex flex-wrap gap-2 pt-2">
              <Badge variant="secondary">React</Badge>
              <Badge variant="secondary">TypeScript</Badge>
              <Badge variant="secondary">Node.js</Badge>
            </div>
          </div>
        </HoverCardContent>
      </HoverCard>
    </div>
  );
}

function PositionsDemo() {
  return (
    <div className="flex flex-col items-center justify-center gap-16 min-h-[400px]">
      <HoverCard>
        <HoverCardTrigger asChild>
          <Button variant="outline">Top position</Button>
        </HoverCardTrigger>
        <HoverCardContent side="top" className="w-80">
          <div className="space-y-2">
            <h4 className="text-sm font-semibold">Hover card on top</h4>
            <p className="text-sm text-muted-foreground">
              This hover card appears above the trigger element.
            </p>
          </div>
        </HoverCardContent>
      </HoverCard>

      <div className="flex gap-16">
        <HoverCard>
          <HoverCardTrigger asChild>
            <Button variant="outline">Left position</Button>
          </HoverCardTrigger>
          <HoverCardContent side="left" className="w-80">
            <div className="space-y-2">
              <h4 className="text-sm font-semibold">Hover card on left</h4>
              <p className="text-sm text-muted-foreground">
                This hover card appears to the left of the trigger element.
              </p>
            </div>
          </HoverCardContent>
        </HoverCard>

        <HoverCard>
          <HoverCardTrigger asChild>
            <Button variant="outline">Right position</Button>
          </HoverCardTrigger>
          <HoverCardContent side="right" className="w-80">
            <div className="space-y-2">
              <h4 className="text-sm font-semibold">Hover card on right</h4>
              <p className="text-sm text-muted-foreground">
                This hover card appears to the right of the trigger element.
              </p>
            </div>
          </HoverCardContent>
        </HoverCard>
      </div>

      <HoverCard>
        <HoverCardTrigger asChild>
          <Button variant="outline">Bottom position</Button>
        </HoverCardTrigger>
        <HoverCardContent side="bottom" className="w-80">
          <div className="space-y-2">
            <h4 className="text-sm font-semibold">Hover card on bottom</h4>
            <p className="text-sm text-muted-foreground">
              This hover card appears below the trigger element.
            </p>
          </div>
        </HoverCardContent>
      </HoverCard>
    </div>
  );
}

export const hoverCardExamples: ComponentExamples = {
  basic: {
    title: 'Hover Card Demo',
    description:
      'Rich contextual information displayed in a card when hovering over an element',
    component: BasicDemo,
    difficulty: 'beginner',
    code: `import { Button } from "@/components/ui/aura/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/aura/avatar"
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/aura/hover-card"

export function BasicDemo() {
  return (
    <div className="flex justify-center items-center min-h-[200px]">
      <HoverCard>
        <HoverCardTrigger asChild>
          <Button variant="link">@nextjs</Button>
        </HoverCardTrigger>
        <HoverCardContent className="w-80">
          <div className="flex justify-between space-x-4">
            <Avatar>
              <AvatarImage src="https://github.com/vercel.png" />
              <AvatarFallback>VC</AvatarFallback>
            </Avatar>
            <div className="space-y-1">
              <h4 className="text-sm font-semibold">@nextjs</h4>
              <p className="text-sm">
                The React Framework – created and maintained by @vercel.
              </p>
              <div className="flex items-center pt-2">
                <span className="text-xs text-muted-foreground">
                  Joined December 2021
                </span>
              </div>
            </div>
          </div>
        </HoverCardContent>
      </HoverCard>
    </div>
  )
}`,
  },
  withBadges: {
    title: 'With Badges',
    description: 'Hover cards can include badges to show tags or categories',
    component: WithBadgesDemo,
    difficulty: 'beginner',
    code: `import { Button } from "@/components/ui/aura/button"
import { Badge } from "@/components/ui/aura/badge"
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/aura/hover-card"

export function WithBadgesDemo() {
  return (
    <div className="flex justify-center items-center gap-4 min-h-[200px]">
      <HoverCard>
        <HoverCardTrigger asChild>
          <Button variant="outline">Product Manager</Button>
        </HoverCardTrigger>
        <HoverCardContent className="w-80">
          <div className="space-y-2">
            <h4 className="text-sm font-semibold">Product Manager</h4>
            <p className="text-sm text-muted-foreground">
              Lead product strategy and roadmap for the design system
            </p>
            <div className="flex flex-wrap gap-2 pt-2">
              <Badge variant="secondary">Strategy</Badge>
              <Badge variant="secondary">Planning</Badge>
              <Badge variant="secondary">Research</Badge>
            </div>
          </div>
        </HoverCardContent>
      </HoverCard>

      <HoverCard>
        <HoverCardTrigger asChild>
          <Button variant="outline">Senior Developer</Button>
        </HoverCardTrigger>
        <HoverCardContent className="w-80">
          <div className="space-y-2">
            <h4 className="text-sm font-semibold">Senior Developer</h4>
            <p className="text-sm text-muted-foreground">
              Full-stack engineer specialising in React and Node.js
            </p>
            <div className="flex flex-wrap gap-2 pt-2">
              <Badge variant="secondary">React</Badge>
              <Badge variant="secondary">TypeScript</Badge>
              <Badge variant="secondary">Node.js</Badge>
            </div>
          </div>
        </HoverCardContent>
      </HoverCard>
    </div>
  )
}`,
  },
  positions: {
    title: 'Positions',
    description: 'Hover cards can be positioned on any side of the trigger',
    component: PositionsDemo,
    difficulty: 'beginner',
    code: `import { Button } from "@/components/ui/aura/button"
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/aura/hover-card"

export function PositionsDemo() {
  return (
    <div className="flex flex-col items-center justify-center gap-16 min-h-[400px]">
      <HoverCard>
        <HoverCardTrigger asChild>
          <Button variant="outline">Top position</Button>
        </HoverCardTrigger>
        <HoverCardContent side="top" className="w-80">
          <div className="space-y-2">
            <h4 className="text-sm font-semibold">Hover card on top</h4>
            <p className="text-sm text-muted-foreground">
              This hover card appears above the trigger element.
            </p>
          </div>
        </HoverCardContent>
      </HoverCard>

      <div className="flex gap-16">
        <HoverCard>
          <HoverCardTrigger asChild>
            <Button variant="outline">Left position</Button>
          </HoverCardTrigger>
          <HoverCardContent side="left" className="w-80">
            <div className="space-y-2">
              <h4 className="text-sm font-semibold">Hover card on left</h4>
              <p className="text-sm text-muted-foreground">
                This hover card appears to the left of the trigger element.
              </p>
            </div>
          </HoverCardContent>
        </HoverCard>

        <HoverCard>
          <HoverCardTrigger asChild>
            <Button variant="outline">Right position</Button>
          </HoverCardTrigger>
          <HoverCardContent side="right" className="w-80">
            <div className="space-y-2">
              <h4 className="text-sm font-semibold">Hover card on right</h4>
              <p className="text-sm text-muted-foreground">
                This hover card appears to the right of the trigger element.
              </p>
            </div>
          </HoverCardContent>
        </HoverCard>
      </div>

      <HoverCard>
        <HoverCardTrigger asChild>
          <Button variant="outline">Bottom position</Button>
        </HoverCardTrigger>
        <HoverCardContent side="bottom" className="w-80">
          <div className="space-y-2">
            <h4 className="text-sm font-semibold">Hover card on bottom</h4>
            <p className="text-sm text-muted-foreground">
              This hover card appears below the trigger element.
            </p>
          </div>
        </HoverCardContent>
      </HoverCard>
    </div>
  )
}`,
  },
};

// Component metadata - single source of truth for API documentation
export const hoverCardMeta = {
  name: 'Hover Card',
  description:
    'For sighted users to preview content available behind a link. Used for rich contextual previews that appear on hover.',
  llmUsage:
    'When asked for a hover card, use `<HoverCard>` to provide rich contextual information on hover.',
  importPath: '@/components/ui/aura/hover-card',
};
