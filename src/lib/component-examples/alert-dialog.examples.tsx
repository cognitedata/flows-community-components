import { Button } from "@/components/ui/cognite/button";
import type { ComponentExamples } from "./types";

function BasicDemo() {
  return (
    <div className="space-y-3">
      <Button>Open Alert Dialog</Button>
      <Button variant="destructive">Delete Item</Button>
      <p className="text-sm text-muted-foreground">
        Click buttons to trigger alert dialogs for confirmation flows.
      </p>
    </div>
  );
}

export const alertDialogExamples: ComponentExamples = {
  basic: {
    title: "Alert Dialog Demo",
    description:
      "Alert dialogs for critical confirmations (requires interactive implementation)",
    component: BasicDemo,
    difficulty: "intermediate",
    code: `import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/cognite/alert-dialog"
import { Button } from "@/components/ui/cognite/button"

export function BasicDemo() {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="destructive">Delete Account</Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your
            account and remove your data from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction>Continue</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}`,
  },
};

