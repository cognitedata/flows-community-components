import { Badge } from '@/components/ui/aura/badge';
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from '@/components/ui/aura/hover-card';
import { Sources, Source } from '@/components/ui/aura/sources';
import {
  IconChartLine,
  IconPhoto,
  IconFile,
  IconBriefcase,
  IconDatabase,
  IconVideo,
  IconFileSpreadsheet,
  IconCube,
} from '@tabler/icons-react';
import type { ComponentExamples } from '@/lib/component-examples/types';

function BasicSourcesDemo() {
  return (
    <Sources>
      <Source
        href="https://example.com/21PT2019"
        title="21PT1019"
        icon={IconChartLine}
        target="_blank"
      />
      <Source
        href="https://example.com/pumpB.img"
        title="pumpB.img"
        icon={IconPhoto}
        target="_blank"
      />
      <Source
        href="https://example.com/PumpB.pdf"
        title="PumpB.pdf"
        icon={IconFile}
        target="_blank"
      />
      <Source
        href="https://example.com/120_oaoXR"
        title="120_oaoXR"
        icon={IconBriefcase}
        target="_blank"
      />
    </Sources>
  );
}

function SourcesWithHoverCardDemo() {
  return (
    <Sources>
      <Source
        href="https://example.com/21PT2019"
        title="21PT1019"
        icon={IconChartLine}
        target="_blank"
      />
      <Source
        href="https://example.com/pumpB.img"
        title="pumpB.img"
        icon={IconPhoto}
        target="_blank"
      />
      <Source
        href="https://example.com/PumpB.pdf"
        title="PumpB.pdf"
        icon={IconFile}
        target="_blank"
      />
      <Source
        href="https://example.com/120_oaoXR"
        title="120_oaoXR"
        icon={IconBriefcase}
        target="_blank"
      />
      <HoverCard openDelay={0} closeDelay={0}>
        <HoverCardTrigger asChild>
          <Badge variant="mountain">+4</Badge>
        </HoverCardTrigger>
        <HoverCardContent>
          <div className="flex flex-wrap gap-2">
            <Source
              href="https://example.com/33XT5421"
              title="33XT5421"
              icon={IconDatabase}
              target="_blank"
            />
            <Source
              href="https://example.com/motor_A.mp4"
              title="motor_A.mp4"
              icon={IconVideo}
              target="_blank"
            />
            <Source
              href="https://example.com/report_Q2.xlsx"
              title="report_Q2.xlsx"
              icon={IconFileSpreadsheet}
              target="_blank"
            />
            <Source
              href="https://example.com/model_3D"
              title="model_3D"
              icon={IconCube}
              target="_blank"
            />
          </div>
        </HoverCardContent>
      </HoverCard>
    </Sources>
  );
}

function SourcesWithIconDemo() {
  return (
    <Sources>
      <Source
        href="https://example.com/45RT8732"
        title="45RT8732"
        icon={IconChartLine}
        variant="mountain"
        target="_blank"
      />
      <Source
        href="https://example.com/valve_C.png"
        title="valve_C.png"
        icon={IconPhoto}
        variant="nordic"
        target="_blank"
      />
      <Source
        href="https://example.com/manual.pdf"
        title="manual.pdf"
        icon={IconFile}
        variant="fjord"
        target="_blank"
      />
    </Sources>
  );
}

export const sourcesExamples: ComponentExamples = {
  basic: {
    title: 'Basic Sources',
    description: 'Inline source citations displayed as badges',
    component: BasicSourcesDemo,
    difficulty: 'beginner',
    code: `import { Sources, Source } from "@/components/ui/aura/sources"
import { IconChartLine, IconPhoto, IconFile, IconBriefcase } from "@tabler/icons-react"

export function BasicSourcesDemo() {
  return (
    <Sources>
      <Source
        href="https://example.com/21PT2019"
        title="21PT1019"
        icon={IconChartLine}
        target="_blank"
      />
      <Source
        href="https://example.com/pumpB.img"
        title="pumpB.img"
        icon={IconPhoto}
        target="_blank"
      />
      <Source
        href="https://example.com/PumpB.pdf"
        title="PumpB.pdf"
        icon={IconFile}
        target="_blank"
      />
      <Source
        href="https://example.com/120_oaoXR"
        title="120_oaoXR"
        icon={IconBriefcase}
        target="_blank"
      />
    </Sources>
  )
}`,
  },

  withHoverCard: {
    title: 'With Hover Card',
    description: 'Sources with overflow hover card for additional citations',
    component: SourcesWithHoverCardDemo,
    difficulty: 'intermediate',
    code: `import { Badge } from "@/components/ui/aura/badge"
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/aura/hover-card"
import { Sources, Source } from "@/components/ui/aura/sources"
import {
  IconChartLine,
  IconPhoto,
  IconFile,
  IconBriefcase,
  IconDatabase,
  IconVideo,
  IconFileSpreadsheet,
  IconCube
} from "@tabler/icons-react"

export function SourcesWithHoverCardDemo() {
  return (
    <Sources>
      <Source
        href="https://example.com/21PT2019"
        title="21PT1019"
        icon={IconChartLine}
        target="_blank"
      />
      <Source
        href="https://example.com/pumpB.img"
        title="pumpB.img"
        icon={IconPhoto}
        target="_blank"
      />
      <Source
        href="https://example.com/PumpB.pdf"
        title="PumpB.pdf"
        icon={IconFile}
        target="_blank"
      />
      <Source
        href="https://example.com/120_oaoXR"
        title="120_oaoXR"
        icon={IconBriefcase}
        target="_blank"
      />
      <HoverCard openDelay={0} closeDelay={0}>
        <HoverCardTrigger asChild>
          <Badge variant="mountain">+4</Badge>
        </HoverCardTrigger>
        <HoverCardContent>
          <div className="flex flex-wrap gap-2">
            <Source
              href="https://example.com/33XT5421"
              title="33XT5421"
              icon={IconDatabase}
              target="_blank"
            />
            <Source
              href="https://example.com/motor_A.mp4"
              title="motor_A.mp4"
              icon={IconVideo}
              target="_blank"
            />
            <Source
              href="https://example.com/report_Q2.xlsx"
              title="report_Q2.xlsx"
              icon={IconFileSpreadsheet}
              target="_blank"
            />
            <Source
              href="https://example.com/model_3D"
              title="model_3D"
              icon={IconCube}
              target="_blank"
            />
          </div>
        </HoverCardContent>
      </HoverCard>
    </Sources>
  )
}`,
  },

  withVariants: {
    title: 'With Variants',
    description: 'Sources with different colour variants',
    component: SourcesWithIconDemo,
    difficulty: 'beginner',
    code: `import { Sources, Source } from "@/components/ui/aura/sources"
import { IconChartLine, IconPhoto, IconFile } from "@tabler/icons-react"

export function SourcesWithIconDemo() {
  return (
    <Sources>
      <Source
        href="https://example.com/45RT8732"
        title="45RT8732"
        icon={IconChartLine}
        variant="mountain"
        target="_blank"
      />
      <Source
        href="https://example.com/valve_C.png"
        title="valve_C.png"
        icon={IconPhoto}
        variant="nordic"
        target="_blank"
      />
      <Source
        href="https://example.com/manual.pdf"
        title="manual.pdf"
        icon={IconFile}
        variant="fjord"
        target="_blank"
      />
    </Sources>
  )
}`,
  },
};

// Component metadata - single source of truth for API documentation
export const sourcesMeta = {
  name: 'Sources',
  description:
    'A component that displays inline source citations as clickable badges, with support for overflow hover cards.',
  importPath: '@/components/ui/aura/sources',
};
