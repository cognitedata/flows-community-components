import { Switch } from "@/components/ui/cognite/switch";
import { Label } from "@/components/ui/cognite/label";
import type { ComponentExamples } from "./types";

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
    title: "Switch Examples",
    description: "Toggle switches for on/off settings",
    component: BasicDemo,
    difficulty: "beginner",
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

