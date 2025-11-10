import { Button } from "@/components/ui/cognite/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/cognite/dialog";
import { IconTrash } from "@tabler/icons-react";
import type { ComponentExamples } from "./types";

function BasicDemo() {
  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        <Dialog>
          <DialogTrigger asChild>
            <Button>Open dialog</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Title</DialogTitle>
            </DialogHeader>
            <div className="grid">
              <DialogDescription>Description</DialogDescription>
            </div>
            <DialogFooter>
              <Button variant="outline">Exit</Button>
              <Button type="submit">Continue</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
function DeleteDemo() {
  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="destructive">Delete</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Delete?</DialogTitle>
            </DialogHeader>
            <div className="grid">
              <DialogDescription>
                This action cannot be undone.
              </DialogDescription>
            </div>
            <DialogFooter>
              <Button variant="outline">Cancel</Button>
              <Button type="submit" variant="destructive">
                <IconTrash /> Delete
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}

export const dialogExamples: ComponentExamples = {
  basic: {
    title: "Dialog Demo",
    description:
      "Interactive modal dialogs for forms, confirmations, and detailed content",
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
  delete: {
    title: "Delete Dialog Demo",
    description:
      "Interactive modal dialogs for forms, confirmations, and detailed content",
    component: DeleteDemo,
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

export function DeleteDemo() {
  return (
      <Dialog>
          <DialogTrigger asChild>
            <Button variant="destructive">Delete</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Delete?</DialogTitle>
            </DialogHeader>
            <div className="grid">
              <DialogDescription>This action cannot be undone.</DialogDescription>
            </div>
            <DialogFooter>
              <Button variant="outline">Cancel</Button>
              <Button type="submit" variant="destructive"><IconTrash /> Delete</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
  )
}`,
  },
};

// Component metadata - single source of truth for API documentation
export const dialogMeta = {
  name: "Dialog",
  description:
    "A window overlaid on either the primary window or another dialog window, rendering the content underneath inert.",
  llmUsage:
    "When asked for a dialog, use `<Dialog>` for modal windows, forms, and detailed content overlays.",
  importPath: "@/components/ui/cognite/dialog",
};
