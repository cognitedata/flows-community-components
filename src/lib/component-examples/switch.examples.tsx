import { Switch } from '@/components/ui/cognite/switch';
import { Label } from '@/components/ui/cognite/label';
import type { ComponentExamples } from './types';

function BasicDemo() {
  return (
    <div className="space-y-3 max-w-sm">
      <div className="flex items-center justify-between">
        <Label htmlFor="airplane">Airplane mode</Label>
        <Switch id="airplane" />
      </div>
      <div className="flex items-center justify-between">
        <Label htmlFor="notifications">Notifications</Label>
        <Switch id="notifications" defaultChecked />
      </div>
      <div className="flex items-center justify-between">
        <Label htmlFor="disabled" className="opacity-50">
          Disabled switch
        </Label>
        <Switch id="disabled" disabled />
      </div>
    </div>
  );
}

export const switchExamples: ComponentExamples = {
  basic: {
    title: 'Switch Examples',
    description: 'Toggle switches for on/off settings',
    component: BasicDemo,
    difficulty: 'beginner',
    code: `import { Switch } from "@/components/ui/cognite/switch"
import { Label } from "@/components/ui/cognite/label"

export function BasicDemo() {
  return (
    <div className="space-y-3 max-w-sm">
      <div className="flex items-center justify-between">
        <Label htmlFor="airplane">Airplane mode</Label>
        <Switch id="airplane" />
      </div>
      <div className="flex items-center justify-between">
        <Label htmlFor="notifications">Notifications</Label>
        <Switch id="notifications" defaultChecked />
      </div>
      <div className="flex items-center justify-between">
        <Label htmlFor="disabled" className="opacity-50">
          Disabled switch
        </Label>
        <Switch id="disabled" disabled />
      </div>
    </div>
  )
}`,
  },
};

// Component metadata - single source of truth for API documentation
export const switchMeta = {
  name: 'Switch',
  description:
    'A control that allows the user to toggle between checked and not checked.',
  llmUsage:
    'When asked for a switch or toggle, use `<Switch>` for on/off settings and preferences.',
  importPath: '@/components/ui/cognite/switch',
};
