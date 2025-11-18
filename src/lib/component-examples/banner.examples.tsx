import {
  Banner,
  BannerIcon,
  BannerTitle,
  BannerStatus,
  BannerActions,
  BannerAction,
} from '@/components/ui/cognite/banner';
import type { ComponentExamples } from './types';
import { IconInfoCircle, IconCopy } from '@tabler/icons-react';

function VariantsDemo() {
  return (
    <div className="w-full space-y-4">
      <Banner>
        <BannerIcon icon={IconInfoCircle} />
        <BannerTitle>Read only. Duplicate to make changes.</BannerTitle>
        <BannerActions>
          <BannerAction variant="ghost">
            <IconCopy />
            <span>Duplicate</span>
          </BannerAction>
        </BannerActions>
      </Banner>

      <Banner variant="neutral">
        <BannerIcon icon={IconInfoCircle} />
        <BannerTitle>Workflow has been published.</BannerTitle>
        <BannerStatus>Published</BannerStatus>
        <BannerActions>
          <BannerAction variant="ghost">Request review</BannerAction>
        </BannerActions>
      </Banner>
    </div>
  );
}

function MainComponentDemo() {
  return (
    <div className="w-full space-y-4">
      <Banner>
        <BannerIcon icon={IconInfoCircle} />
        <BannerTitle>Banner title</BannerTitle>
        <BannerActions>
          <BannerAction variant="ghost">
            <span>Button</span>
          </BannerAction>
          <BannerAction variant="ghost">
            <span>Button</span>
          </BannerAction>
        </BannerActions>
      </Banner>

      <Banner variant="neutral">
        <BannerIcon icon={IconInfoCircle} />
        <BannerTitle>Banner title</BannerTitle>
        <BannerActions>
          <BannerAction variant="ghost">
            <span>Button</span>
          </BannerAction>
          <BannerAction variant="ghost">
            <span>Button</span>
          </BannerAction>
        </BannerActions>
      </Banner>

      <Banner variant="destructive">
        <BannerIcon icon={IconInfoCircle} />
        <BannerTitle>Banner title</BannerTitle>
        <BannerActions>
          <BannerAction variant="ghost">
            <span>Button</span>
          </BannerAction>
          <BannerAction variant="ghost">
            <span>Button</span>
          </BannerAction>
        </BannerActions>
      </Banner>

      <Banner variant="warning">
        <BannerIcon icon={IconInfoCircle} />
        <BannerTitle>Banner title</BannerTitle>
        <BannerActions>
          <BannerAction variant="ghost">
            <span>Button</span>
          </BannerAction>
          <BannerAction variant="ghost">
            <span>Button</span>
          </BannerAction>
        </BannerActions>
      </Banner>
    </div>
  );
}

export const bannerExamples: ComponentExamples = {
  variants: {
    title: 'Banner Variants',
    description:
      'Different banner configurations with icons, actions, and close buttons',
    component: VariantsDemo,
    difficulty: 'beginner',
    code: `import {
  Banner,
  BannerIcon,
  BannerTitle,
  BannerStatus,
  BannerActions,
  BannerAction,
} from "@/components/ui/cognite/banner"
import { IconInfoCircle, IconCopy } from "@tabler/icons-react"

export function VariantsDemo() {
  return (
    <div className="w-full space-y-4">
      <Banner>
        <BannerIcon icon={IconInfoCircle} />
        <BannerTitle>
          Read only. Duplicate to make changes.
        </BannerTitle>
        <BannerActions>
          <BannerAction variant="ghost">
            <IconCopy />
            <span>Duplicate</span>
          </BannerAction>
        </BannerActions>
      </Banner>

      <Banner variant="neutral">
        <BannerIcon icon={IconInfoCircle} />
        <BannerTitle>Workflow has been published.</BannerTitle>
        <BannerStatus>Published</BannerStatus>
        <BannerActions>
          <BannerAction variant="ghost">Request review</BannerAction>
        </BannerActions>
      </Banner>
    </div>
  )
}`,
  },

  mainComponent: {
    title: 'Main component',
    description: '',
    component: MainComponentDemo,
    difficulty: 'beginner',
    code: `import {
  Banner,
  BannerIcon,
  BannerTitle,
  BannerActions,
  BannerAction,
} from "@/components/ui/cognite/banner"
import { IconInfoCircle } from "@tabler/icons-react"

export function MainComponentDemo() {
  return (
    <div className="w-full space-y-4">
      <Banner>
        <BannerIcon icon={IconInfoCircle} />
        <BannerTitle>
          Banner title
        </BannerTitle>
        <BannerActions>
          <BannerAction variant="ghost">
            <span>Button</span>
          </BannerAction>
          <BannerAction variant="ghost">
            <span>Button</span>
          </BannerAction>
        </BannerActions>
      </Banner>

      <Banner variant="neutral">
        <BannerIcon icon={IconInfoCircle} />
        <BannerTitle>
          Banner title
        </BannerTitle>
        <BannerActions>
          <BannerAction variant="ghost">
            <span>Button</span>
          </BannerAction>
          <BannerAction variant="ghost">
            <span>Button</span>
          </BannerAction>
        </BannerActions>
      </Banner>

      <Banner variant="destructive">
        <BannerIcon icon={IconInfoCircle} />
        <BannerTitle>
          Banner title
        </BannerTitle>
        <BannerActions>
          <BannerAction variant="ghost">
            <span>Button</span>
          </BannerAction>
          <BannerAction variant="ghost">
            <span>Button</span>
          </BannerAction>
        </BannerActions>
      </Banner>

      <Banner variant="warning">
        <BannerIcon icon={IconInfoCircle} />
        <BannerTitle>
          Banner title
        </BannerTitle>
        <BannerActions>
          <BannerAction variant="ghost">
            <span>Button</span>
          </BannerAction>
          <BannerAction variant="ghost">
            <span>Button</span>
          </BannerAction>
        </BannerActions>
      </Banner>
    </div>
  )
}`,
  },
};

// Component metadata - single source of truth for API documentation
export const bannerMeta = {
  name: 'Banner',
  description:
    'A flexible banner component for displaying important messages, notifications, or announcements with optional icons, actions, and close functionality.',
  llmUsage:
    'When displaying important messages or notifications, use `<Banner>` with `<BannerTitle>` for the message. Add `<BannerIcon>` for visual context. Group action buttons and close button inside `<BannerActions>` to position them on the right. Use `<BannerAction>` for interactive buttons and `<BannerClose>` for dismissible banners. Use the `inset` prop for rounded corners in contained layouts.',
  importPath: '@/components/ui/cognite/banner',
};
