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
    code: `import { Button } from "@/components/ui/cognite/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/cognite/dialog"

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
  )
}`,
  },
  delete: {
    title: "Delete Dialog Demo",
    description:
      "Interactive modal dialogs for forms, confirmations, and detailed content",
    component: DeleteDemo,
    difficulty: "intermediate",
    code: `import { Button } from "@/components/ui/cognite/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/cognite/dialog"
import { IconTrash } from "@tabler/icons-react"

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
