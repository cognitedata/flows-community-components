import React from 'react';
import { Badge } from '@/components/ui/aura/badge';
import type { ComponentExamples } from '@/lib/component-examples/types';
import {
  IconAlertHexagon,
  IconAlertTriangle,
  IconArchive,
  IconCircleCheck,
  IconCube,
  IconHexagon,
  IconInnerShadowTopLeft,
  IconSettings,
  IconStar,
  IconX,
} from '@tabler/icons-react';

function VariantsDemo() {
  const [showAsset, setShowAsset] = React.useState(true);

  return (
    <div>
      <div className="flex flex-wrap gap-3 mb-4">
        <Badge variant="fjord">Observations</Badge>
        <Badge variant="aurora">Troubleshooting</Badge>
        <Badge variant="mountain">
          <IconHexagon size={12} />
          Plans
        </Badge>
        <Badge variant="dusk">RCA</Badge>
        {showAsset && (
          <Badge variant="closable" onClick={() => setShowAsset(false)}>
            <IconHexagon className="rotate-90" size={12} />
            Asset
            <IconX size={12} />
          </Badge>
        )}
      </div>
      <div className="flex flex-wrap gap-3">
        <Badge variant="error" background={false}>
          <IconAlertHexagon size={12} />
          Error
        </Badge>
        <Badge variant="error" outline>
          <IconAlertHexagon size={12} />
          Error
        </Badge>
        <Badge variant="warning" background={false}>
          <IconAlertTriangle size={12} />
          Warning
        </Badge>
        <Badge variant="warning" outline>
          <IconAlertTriangle size={12} />
          Warning
        </Badge>
        <Badge variant="success" background={false}>
          <IconCircleCheck size={12} />
          Success
        </Badge>
        <Badge variant="inProgress" background={false}>
          <IconInnerShadowTopLeft size={12} />
          In progress
        </Badge>
        <Badge variant="archived" background={false}>
          <IconArchive size={12} />
          Archived
        </Badge>
      </div>
    </div>
  );
}
function MainComponentDemo() {
  const [showClosable, setShowClosable] = React.useState(true);

  return (
    <div className="flex flex-wrap gap-3 border-dashed border-2 border-gray-300 p-4 rounded-md items-center justify-center max-w-fit mx-auto">
      <Badge variant="default">
        <IconHexagon className="rotate-90" size={12} />
        Badge
      </Badge>
      {showClosable && (
        <Badge variant="closable" onClick={() => setShowClosable(false)}>
          <IconHexagon className="rotate-90" size={12} />
          Badge
          <IconX size={12} />
        </Badge>
      )}
      <Badge variant="error" background={false}>
        <IconHexagon className="rotate-90" size={12} />
        Badge
      </Badge>
      <Badge variant="error" dot>
        9
      </Badge>
      <Badge dot urgent />
      <Badge dot />
    </div>
  );
}

function BuildingBlocksDemo() {
  const [showClosable1, setShowClosable1] = React.useState(true);
  const [showClosable2, setShowClosable2] = React.useState(true);

  return (
    <div className="flex flex-col gap-3">
      <div className="flex flex-wrap gap-3 border-dashed border-2 border-gray-300 p-4 rounded-md">
        <Badge variant="mountain">
          <IconHexagon className="rotate-90" size={12} />
          Badge
        </Badge>
        <Badge variant="fjord">
          <IconHexagon className="rotate-90" size={12} />
          Badge
        </Badge>
        <Badge variant="nordic">
          <IconHexagon className="rotate-90" size={12} />
          Badge
        </Badge>
        <Badge variant="aurora">
          <IconHexagon className="rotate-90" size={12} />
          Badge
        </Badge>
        <Badge variant="dusk">
          <IconHexagon className="rotate-90" size={12} />
          Badge
        </Badge>
        <Badge variant="orange">
          <IconHexagon className="rotate-90" size={12} />
          Badge
        </Badge>
        <Badge variant="sky">
          <IconHexagon className="rotate-90" size={12} />
          Badge
        </Badge>
        <Badge variant="gray">
          <IconHexagon className="rotate-90" size={12} />
          Badge
        </Badge>
      </div>

      <div className="flex flex-wrap gap-3 border-dashed border-2 border-gray-300 p-4 rounded-md">
        <Badge variant="error" background={false}>
          <IconHexagon className="rotate-90" size={12} />
          Badge
        </Badge>
        <Badge variant="error" outline>
          <IconHexagon className="rotate-90" size={12} />
          Badge
        </Badge>
        <Badge variant="warning" background={false}>
          <IconHexagon className="rotate-90" size={12} />
          Badge
        </Badge>
        <Badge variant="warning" outline>
          <IconHexagon className="rotate-90" size={12} />
          Badge
        </Badge>
        <Badge variant="success" background={false}>
          <IconHexagon className="rotate-90" size={12} />
          Badge
        </Badge>
        <Badge variant="success" outline>
          <IconHexagon className="rotate-90" size={12} />
          Badge
        </Badge>
        <Badge variant="inProgress" background={false}>
          <IconHexagon className="rotate-90" size={12} />
          Badge
        </Badge>
        <Badge variant="inProgress" outline>
          <IconHexagon className="rotate-90" size={12} />
          Badge
        </Badge>
        <Badge variant="archived" background={false}>
          <IconHexagon className="rotate-90" size={12} />
          Badge
        </Badge>
        <Badge variant="archived" outline>
          <IconHexagon className="rotate-90" size={12} />
          Badge
        </Badge>
      </div>

      <div className="flex flex-wrap gap-3 border-dashed border-2 border-gray-300 p-4 rounded-md">
        {showClosable1 && (
          <Badge variant="closable" onClick={() => setShowClosable1(false)}>
            <IconHexagon className="rotate-90" size={12} />
            Badge
            <IconX size={12} />
          </Badge>
        )}
        {showClosable2 && (
          <Badge
            variant="closable"
            className="bg-secondary-hover"
            onClick={() => setShowClosable2(false)}
          >
            <IconHexagon className="rotate-90" size={12} />
            Badge
            <IconX size={12} />
          </Badge>
        )}
      </div>
    </div>
  );
}

function SizesDemo() {
  return (
    <div className="flex flex-col gap-4">
      <div>
        <p className="text-sm text-muted-foreground mb-2">Default size (with text)</p>
        <div className="flex flex-wrap gap-3">
          <Badge variant="mountain">
            <IconCube size={12} />
            3D Model
          </Badge>
          <Badge variant="fjord">
            <IconStar size={12} />
            Featured
          </Badge>
          <Badge variant="aurora">
            <IconSettings size={12} />
            Settings
          </Badge>
        </div>
      </div>
      <div>
        <p className="text-sm text-muted-foreground mb-2">Icon size (icon-only, square)</p>
        <div className="flex flex-wrap gap-3">
          <Badge variant="mountain" size="icon">
            <IconCube size={12} />
          </Badge>
          <Badge variant="fjord" size="icon">
            <IconStar size={12} />
          </Badge>
          <Badge variant="aurora" size="icon">
            <IconSettings size={12} />
          </Badge>
          <Badge variant="nordic" size="icon">
            <IconHexagon size={12} />
          </Badge>
          <Badge variant="dusk" size="icon">
            <IconCircleCheck size={12} />
          </Badge>
        </div>
      </div>
    </div>
  );
}

export const badgeExamples: ComponentExamples = {
  variants: {
    title: 'Badge Variants',
    description: 'Different badge styles for various semantic meanings',
    component: VariantsDemo,
    difficulty: 'beginner',
    code: `import * as React from "react"
import { Badge } from "@/components/ui/aura/badge"
import {
  IconAlertHexagon,
  IconAlertTriangle,
  IconArchive,
  IconCircleCheck,
  IconHexagon,
  IconInnerShadowTopLeft,
  IconX,
} from "@tabler/icons-react"

export function VariantsDemo() {
  const [showAsset, setShowAsset] = React.useState(true);

  return (
    <div>
      <div className="flex flex-wrap gap-3 mb-4">
        <Badge variant="fjord">Observations</Badge>
        <Badge variant="aurora">Troubleshooting</Badge>
        <Badge variant="mountain">
          <IconHexagon size={12} />
          Plans
        </Badge>
        <Badge variant="dusk">RCA</Badge>
        {showAsset && (
          <Badge variant="closable" onClick={() => setShowAsset(false)}>
            <IconHexagon className="rotate-90" size={12} />
            Asset
            <IconX size={12} />
          </Badge>
        )}
      </div>
      <div className="flex flex-wrap gap-3">
        <Badge variant="error" background={false}>
          <IconAlertHexagon size={12} />
          Error
        </Badge>
        <Badge variant="error" outline>
          <IconAlertHexagon size={12} />
          Error
        </Badge>
        <Badge variant="warning" background={false}>
          <IconAlertTriangle size={12} />
          Warning
        </Badge>
        <Badge variant="warning" outline>
          <IconAlertTriangle size={12} />
          Warning
        </Badge>
        <Badge variant="success" background={false}>
          <IconCircleCheck size={12} />
          Success
        </Badge>
        <Badge variant="inProgress" background={false}>
          <IconInnerShadowTopLeft size={12} />
          In progress
        </Badge>
        <Badge variant="archived" background={false}>
          <IconArchive size={12} />
          Archived
        </Badge>
      </div>
    </div>
  )
}`,
  },

  sizes: {
    title: 'Badge Sizes',
    description:
      'Badges support different sizes. Use default for badges with text, or icon for square icon-only badges.',
    component: SizesDemo,
    difficulty: 'beginner',
    code: `import { Badge } from "@/components/ui/aura/badge"
import { IconCube, IconStar, IconSettings, IconHexagon, IconCircleCheck } from "@tabler/icons-react"

export function SizesDemo() {
  return (
    <div className="flex flex-col gap-4">
      <div>
        <p className="text-sm text-muted-foreground mb-2">Default size (with text)</p>
        <div className="flex flex-wrap gap-3">
          <Badge variant="mountain">
            <IconCube size={12} />
            3D Model
          </Badge>
          <Badge variant="fjord">
            <IconStar size={12} />
            Featured
          </Badge>
          <Badge variant="aurora">
            <IconSettings size={12} />
            Settings
          </Badge>
        </div>
      </div>
      <div>
        <p className="text-sm text-muted-foreground mb-2">Icon size (icon-only, square)</p>
        <div className="flex flex-wrap gap-3">
          <Badge variant="mountain" size="icon">
            <IconCube size={12} />
          </Badge>
          <Badge variant="fjord" size="icon">
            <IconStar size={12} />
          </Badge>
          <Badge variant="aurora" size="icon">
            <IconSettings size={12} />
          </Badge>
          <Badge variant="nordic" size="icon">
            <IconHexagon size={12} />
          </Badge>
          <Badge variant="dusk" size="icon">
            <IconCircleCheck size={12} />
          </Badge>
        </div>
      </div>
    </div>
  )
}`,
  },

  mainComponent: {
    title: 'Main component',
    description: '',
    component: MainComponentDemo,
    difficulty: 'beginner',
    code: `import * as React from "react"
import { Badge } from "@/components/ui/aura/badge"
import { IconHexagon, IconX } from "@tabler/icons-react";

export function MainComponentDemo() {
  const [showClosable, setShowClosable] = React.useState(true);

  return (
    <div className="flex flex-wrap gap-3 border-dashed border-2 border-gray-300 p-4 rounded-md items-center justify-center max-w-fit mx-auto">
      <Badge variant="default">
        <IconHexagon className="rotate-90" size={12} />
        Badge
      </Badge>
      {showClosable && (
        <Badge variant="closable" onClick={() => setShowClosable(false)}>
          <IconHexagon className="rotate-90" size={12} />
          Badge
          <IconX size={12} />
        </Badge>
      )}
      <Badge variant="error" background={false}>
        <IconHexagon className="rotate-90" size={12} />
        Badge
      </Badge>
      <Badge variant="error" dot>
        9
      </Badge>
      <Badge dot urgent />
      <Badge dot />
    </div>
  )
}`,
  },

  buildingBlocks: {
    title: 'Building blocks',
    description: '',
    component: BuildingBlocksDemo,
    difficulty: 'beginner',
    code: `import * as React from "react"
import { Badge } from "@/components/ui/aura/badge"
import { IconHexagon, IconX } from "@tabler/icons-react";

export function BuildingBlocksDemo() {
  const [showClosable1, setShowClosable1] = React.useState(true);
  const [showClosable2, setShowClosable2] = React.useState(true);

  return (
    <div className="flex flex-col gap-3">
      <div className="flex flex-wrap gap-3 border-dashed border-2 border-gray-300 p-4 rounded-md">
        <Badge variant="mountain">
          <IconHexagon className="rotate-90" size={12} />
          Badge
        </Badge>
        <Badge variant="fjord">
          <IconHexagon className="rotate-90" size={12} />
          Badge
        </Badge>
        <Badge variant="nordic">
          <IconHexagon className="rotate-90" size={12} />
          Badge
        </Badge>
        <Badge variant="aurora">
          <IconHexagon className="rotate-90" size={12} />
          Badge
        </Badge>
        <Badge variant="dusk">
          <IconHexagon className="rotate-90" size={12} />
          Badge
        </Badge>
        <Badge variant="orange">
          <IconHexagon className="rotate-90" size={12} />
          Badge
        </Badge>
        <Badge variant="sky">
          <IconHexagon className="rotate-90" size={12} />
          Badge
        </Badge>
        <Badge variant="gray">
          <IconHexagon className="rotate-90" size={12} />
          Badge
        </Badge>
      </div>

      <div className="flex flex-wrap gap-3 border-dashed border-2 border-gray-300 p-4 rounded-md">
        <Badge variant="error" background={false}>
          <IconHexagon className="rotate-90" size={12} />
          Badge
        </Badge>
        <Badge variant="error" outline>
          <IconHexagon className="rotate-90" size={12} />
          Badge
        </Badge>
        <Badge variant="warning" background={false}>
          <IconHexagon className="rotate-90" size={12} />
          Badge
        </Badge>
        <Badge variant="warning" outline>
          <IconHexagon className="rotate-90" size={12} />
          Badge
        </Badge>
        <Badge variant="success" background={false}>
          <IconHexagon className="rotate-90" size={12} />
          Badge
        </Badge>
        <Badge variant="success" outline>
          <IconHexagon className="rotate-90" size={12} />
          Badge
        </Badge>
        <Badge variant="inProgress" background={false}>
          <IconHexagon className="rotate-90" size={12} />
          Badge
        </Badge>
        <Badge variant="inProgress" outline>
          <IconHexagon className="rotate-90" size={12} />
          Badge
        </Badge>
        <Badge variant="archived" background={false}>
          <IconHexagon className="rotate-90" size={12} />
          Badge
        </Badge>
        <Badge variant="archived" outline>
          <IconHexagon className="rotate-90" size={12} />
          Badge
        </Badge>
      </div>

      <div className="flex flex-wrap gap-3 border-dashed border-2 border-gray-300 p-4 rounded-md">
        {showClosable1 && (
          <Badge variant="closable" onClick={() => setShowClosable1(false)}>
            <IconHexagon className="rotate-90" size={12} />
            Badge
            <IconX size={12} />
          </Badge>
        )}
        {showClosable2 && (
          <Badge
            variant="closable"
            className="bg-secondary-hover"
            onClick={() => setShowClosable2(false)}
          >
            <IconHexagon className="rotate-90" size={12} />
            Badge
            <IconX size={12} />
          </Badge>
        )}
      </div>
    </div>
  )
}`,
  },
};

// Component metadata - single source of truth for API documentation
export const badgeMeta = {
  name: 'Badge',
  description:
    'A small status indicator component with multiple variants for displaying labels, counts, and statuses.',
  llmUsage:
    "When showing status or labels, use `<Badge variant='default'>Status</Badge>` instead of custom spans. Use variants like 'secondary', 'destructive', or 'outline' for different meanings.",
  importPath: '@/components/ui/aura/badge',
};
