import {
  Banner,
  BannerIcon,
  BannerTitle,
  BannerAction,
  BannerClose,
} from "@/components/ui/cognite/banner";
import type { ComponentExamples } from "./types";
import {
  AlertCircle,
  CheckCircle2,
  Info,
  AlertTriangle,
  Bell,
} from "lucide-react";

function VariantsDemo() {
  return (
    <div className="space-y-4">
      <Banner>
        <BannerTitle>This is a simple banner message</BannerTitle>
      </Banner>

      <Banner>
        <BannerIcon icon={Info} />
        <BannerTitle>Banner with an icon</BannerTitle>
      </Banner>

      <Banner>
        <BannerIcon icon={AlertCircle} />
        <BannerTitle>Banner with icon and close button</BannerTitle>
        <BannerClose />
      </Banner>

      <Banner>
        <BannerIcon icon={CheckCircle2} />
        <BannerTitle>Banner with action button</BannerTitle>
        <BannerAction>Action</BannerAction>
      </Banner>

      <Banner>
        <BannerIcon icon={AlertTriangle} />
        <BannerTitle>Banner with action and close button</BannerTitle>
        <BannerAction>Action</BannerAction>
        <BannerClose />
      </Banner>

      <Banner inset>
        <BannerIcon icon={Bell} />
        <BannerTitle>Banner with inset styling</BannerTitle>
        <BannerClose />
      </Banner>
    </div>
  );
}

function MainComponentDemo() {
  return (
    <div className="space-y-4">
      <Banner>
        <BannerIcon icon={Info} />
        <BannerTitle>Welcome! This is the main banner component</BannerTitle>
        <BannerAction>Learn More</BannerAction>
        <BannerClose />
      </Banner>
    </div>
  );
}

export const bannerExamples: ComponentExamples = {
  variants: {
    title: "Banner Variants",
    description: "Different banner configurations with icons, actions, and close buttons",
    component: VariantsDemo,
    difficulty: "beginner",
    code: `import {
  Banner,
  BannerIcon,
  BannerTitle,
  BannerAction,
  BannerClose,
} from "@/components/ui/cognite/banner"
import {
  AlertCircle,
  CheckCircle2,
  Info,
  AlertTriangle,
  Bell,
} from "lucide-react"

export function VariantsDemo() {
  return (
    <div className="space-y-4">
      <Banner>
        <BannerTitle>This is a simple banner message</BannerTitle>
      </Banner>

      <Banner>
        <BannerIcon icon={Info} />
        <BannerTitle>Banner with an icon</BannerTitle>
      </Banner>

      <Banner>
        <BannerIcon icon={AlertCircle} />
        <BannerTitle>Banner with icon and close button</BannerTitle>
        <BannerClose />
      </Banner>

      <Banner>
        <BannerIcon icon={CheckCircle2} />
        <BannerTitle>Banner with action button</BannerTitle>
        <BannerAction>Action</BannerAction>
      </Banner>

      <Banner>
        <BannerIcon icon={AlertTriangle} />
        <BannerTitle>Banner with action and close button</BannerTitle>
        <BannerAction>Action</BannerAction>
        <BannerClose />
      </Banner>

      <Banner inset>
        <BannerIcon icon={Bell} />
        <BannerTitle>Banner with inset styling</BannerTitle>
        <BannerClose />
      </Banner>
    </div>
  )
}`,
  },

  mainComponent: {
    title: "Main component",
    description: "",
    component: MainComponentDemo,
    difficulty: "beginner",
    code: `import {
  Banner,
  BannerIcon,
  BannerTitle,
  BannerAction,
  BannerClose,
} from "@/components/ui/cognite/banner"
import { Info } from "lucide-react"

export function MainComponentDemo() {
  return (
    <div className="space-y-4">
      <Banner>
        <BannerIcon icon={Info} />
        <BannerTitle>Welcome! This is the main banner component</BannerTitle>
        <BannerAction>Learn More</BannerAction>
        <BannerClose />
      </Banner>
    </div>
  )
}`,
  },
};

// Component metadata - single source of truth for API documentation
export const bannerMeta = {
  name: "Banner",
  description: "A flexible banner component for displaying important messages, notifications, or announcements with optional icons, actions, and close functionality.",
  llmUsage: "When displaying important messages or notifications, use `<Banner>` with `<BannerTitle>` for the message. Add `<BannerIcon>` for visual context, `<BannerAction>` for interactive buttons, and `<BannerClose>` for dismissible banners. Use the `inset` prop for rounded corners in contained layouts.",
  importPath: "@/components/ui/cognite/banner",
};

