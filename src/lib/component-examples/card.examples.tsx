import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/cognite/card";
import { Button } from "@/components/ui/cognite/button";
import type { ComponentExamples } from "./types";

function BasicDemo() {
  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle>Card Title</CardTitle>
        <CardDescription>Card Description</CardDescription>
      </CardHeader>
      <CardContent>
        <p>Card content goes here. This is a simple card example.</p>
      </CardContent>
    </Card>
  );
}

function WithFooterDemo() {
  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle>Project Details</CardTitle>
        <CardDescription>View and manage project information</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground">
          This card includes a footer with action buttons.
        </p>
      </CardContent>
      <CardFooter className="flex gap-2">
        <Button variant="outline">Cancel</Button>
        <Button>Save Changes</Button>
      </CardFooter>
    </Card>
  );
}

export const cardExamples: ComponentExamples = {
  basic: {
    title: "Basic Card",
    description: "A simple card with header and content",
    component: BasicDemo,
    difficulty: "beginner",
    code: `import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/cognite/card"

export function BasicDemo() {
  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle>Card Title</CardTitle>
        <CardDescription>Card Description</CardDescription>
      </CardHeader>
      <CardContent>
        <p>Card content goes here. This is a simple card example.</p>
      </CardContent>
    </Card>
  )
}`,
  },

  withFooter: {
    title: "Card with Footer",
    description: "Card with action buttons in the footer",
    component: WithFooterDemo,
    difficulty: "beginner",
    code: `import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/cognite/card"
import { Button } from "@/components/ui/cognite/button"

export function WithFooterDemo() {
  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle>Project Details</CardTitle>
        <CardDescription>View and manage project information</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground">
          This card includes a footer with action buttons.
        </p>
      </CardContent>
      <CardFooter className="flex gap-2">
        <Button variant="outline">Cancel</Button>
        <Button>Save Changes</Button>
      </CardFooter>
    </Card>
  )
}`,
  },
};

