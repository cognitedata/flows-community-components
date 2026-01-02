import { Badge } from '@/components/ui/aura/badge';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/aura/popover';
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

function SourcesWithPopoverDemo() {
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
      <Popover>
        <PopoverTrigger asChild>
          <Badge variant="mountain" className="cursor-pointer">
            +4
          </Badge>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-3">
          <div className="flex flex-col gap-2">
            <p className="text-xs text-muted-foreground font-medium">
              4 more sources
            </p>
            <div className="flex flex-wrap flex-col gap-2">
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
          </div>
        </PopoverContent>
      </Popover>
    </Sources>
  );
}

function SourcesWithNineSourcesDemo() {
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
        title="This is a really long source to show how these items will wrap"
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
      <Source
        href="https://example.com/33XT5421"
        title="33XT5421"
        icon={IconDatabase}
        target="_blank"
      />
      <Popover>
        <PopoverTrigger asChild>
          <Badge variant="mountain" className="cursor-pointer">
            +6
          </Badge>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-3">
          <div className="flex flex-col gap-2">
            <p className="text-xs text-muted-foreground font-medium">
              6 more sources
            </p>
            <div className="flex flex-wrap flex-col gap-2">
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
              <Source
                href="https://example.com/incident_407.pdf"
                title="incident_407.pdf"
                icon={IconFile}
                target="_blank"
              />
              <Source
                href="https://example.com/ORB_1901.pdf"
                title="ORB_1901.pdf"
                icon={IconFile}
                target="_blank"
              />
              <Source
                href="https://example.com/LER_13FI2418N.Y-1728.pdf"
                title="LER_13FI2418N.Y-1728.pdf"
                icon={IconFile}
                target="_blank"
              />
            </div>
          </div>
        </PopoverContent>
      </Popover>
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

function SourcesWithoutTitleDemo() {
  return (
    <Sources title={false}>
      <Source
        href="https://example.com/21PT2019"
        title="21PT1019"
        icon={IconChartLine}
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

  withPopover: {
    title: 'With Popover',
    description: 'Sources with overflow popover for additional citations',
    component: SourcesWithPopoverDemo,
    difficulty: 'intermediate',
    code: `import { Badge } from "@/components/ui/aura/badge"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/aura/popover"
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

export function SourcesWithPopoverDemo() {
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
      <Popover>
        <PopoverTrigger asChild>
          <Badge variant="mountain" className="cursor-pointer">+4</Badge>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-3">
          <div className="flex flex-col gap-2">
            <p className="text-xs text-muted-foreground font-medium">
              4 more sources
            </p>
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
          </div>
        </PopoverContent>
      </Popover>
    </Sources>
  )
}`,
  },

  nineSources: {
    title: 'With 11 Sources',
    description: 'Five inline sources with six additional sources in a popover',
    component: SourcesWithNineSourcesDemo,
    difficulty: 'intermediate',
    code: `import { Badge } from "@/components/ui/aura/badge"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/aura/popover"
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

export function SourcesWithNineSourcesDemo() {
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
        title="This is a really long source to show how these items will wrap"
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
      <Source
        href="https://example.com/33XT5421"
        title="33XT5421"
        icon={IconDatabase}
        target="_blank"
      />
      <Popover>
        <PopoverTrigger asChild>
          <Badge variant="mountain" className="cursor-pointer">+6</Badge>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-3">
          <div className="flex flex-col gap-2">
            <p className="text-xs text-muted-foreground font-medium">
              6 more sources
            </p>
            <div className="flex flex-wrap gap-2">
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
              <Source
                href="https://example.com/incident_407.pdf"
                title="incident_407.pdf"
                icon={IconFile}
                target="_blank"
              />
              <Source
                href="https://example.com/ORB_1901.pdf"
                title="ORB_1901.pdf"
                icon={IconFile}
                target="_blank"
              />
              <Source
                href="https://example.com/LER_13FI2418N.Y-1728.pdf"
                title="LER_13FI2418N.Y-1728.pdf"
                icon={IconFile}
                target="_blank"
              />
            </div>
          </div>
        </PopoverContent>
      </Popover>
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

  withoutTitle: {
    title: 'Without Title',
    description: 'Opt out of the default title using `title={false}`',
    component: SourcesWithoutTitleDemo,
    difficulty: 'beginner',
    code: `import { Sources, Source } from "@/components/ui/aura/sources"
import { IconChartLine, IconFile, IconBriefcase } from "@tabler/icons-react"

export function SourcesWithoutTitleDemo() {
  return (
    <Sources title={false}>
      <Source
        href="https://example.com/21PT2019"
        title="21PT1019"
        icon={IconChartLine}
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
};

// Component metadata - single source of truth for API documentation
export const sourcesMeta = {
  name: 'Sources',
  description:
    'A component that displays inline source citations as clickable badges, with support for overflow popovers.',
  importPath: '@/components/ui/aura/sources',
};
