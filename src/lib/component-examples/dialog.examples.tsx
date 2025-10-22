import { Button } from "@/components/ui/cognite/button";
import type { ComponentExamples } from "./types";

function BasicDemo() {
  return (
    <div className="space-y-3">
      <Button>Open Dialog</Button>
      <Button variant="outline">Settings Dialog</Button>
      <p className="text-sm text-muted-foreground">
        Dialogs for forms, confirmations, and detailed content.
      </p>
    </div>
  );
}

export const dialogExamples: ComponentExamples = {
  basic: {
    title: "Dialog Demo",
    description:
      "Modal dialogs for forms and content (requires interactive implementation)",
    component: BasicDemo,
    difficulty: "intermediate",
    code: `import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/cognite/dialog"
import { Button } from "@/components/ui/cognite/button"
import { Input } from "@/components/ui/cognite/input"
import { Label } from "@/components/ui/cognite/label"

export function BasicDemo() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Edit Profile</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit profile</DialogTitle>
          <DialogDescription>
            Make changes to your profile here. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="name">Name</Label>
            <Input id="name" placeholder="Enter your name" />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" placeholder="Enter your email" />
          </div>
        </div>
        <DialogFooter>
          <Button type="submit">Save changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}`,
  },
};

