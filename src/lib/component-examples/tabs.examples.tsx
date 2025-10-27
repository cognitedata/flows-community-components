import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/cognite/tabs";
import type { ComponentExamples } from "./types";

function BasicDemo() {
  return (
    <Tabs defaultValue="tab1" className="w-full max-w-md">
      <TabsList className="grid w-full grid-cols-3">
        <TabsTrigger value="tab1">Account</TabsTrigger>
        <TabsTrigger value="tab2">Password</TabsTrigger>
        <TabsTrigger value="tab3">Settings</TabsTrigger>
      </TabsList>
      <TabsContent value="tab1" className="mt-4 p-4 border rounded">
        <h4 className="font-medium mb-2">Account Information</h4>
        <p className="text-sm text-muted-foreground">
          Manage your account details here.
        </p>
      </TabsContent>
      <TabsContent value="tab2" className="mt-4 p-4 border rounded">
        <h4 className="font-medium mb-2">Password Settings</h4>
        <p className="text-sm text-muted-foreground">
          Change your password and security settings.
        </p>
      </TabsContent>
      <TabsContent value="tab3" className="mt-4 p-4 border rounded">
        <h4 className="font-medium mb-2">General Settings</h4>
        <p className="text-sm text-muted-foreground">
          Configure your preferences and options.
        </p>
      </TabsContent>
    </Tabs>
  );
}

export const tabsExamples: ComponentExamples = {
  basic: {
    title: "Interactive Tabs",
    description: "Tabbed interface for organizing related content",
    component: BasicDemo,
    difficulty: "beginner",
    code: `import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/cognite/tabs"

export function BasicDemo() {
  return (
    <Tabs defaultValue="tab1" className="w-full max-w-md">
      <TabsList className="grid w-full grid-cols-3">
        <TabsTrigger value="tab1">Account</TabsTrigger>
        <TabsTrigger value="tab2">Password</TabsTrigger>
        <TabsTrigger value="tab3">Settings</TabsTrigger>
      </TabsList>
      <TabsContent value="tab1" className="mt-4 p-4 border rounded">
        <h4 className="font-medium mb-2">Account Information</h4>
        <p className="text-sm text-muted-foreground">
          Manage your account details here.
        </p>
      </TabsContent>
      <TabsContent value="tab2" className="mt-4 p-4 border rounded">
        <h4 className="font-medium mb-2">Password Settings</h4>
        <p className="text-sm text-muted-foreground">
          Change your password and security settings.
        </p>
      </TabsContent>
      <TabsContent value="tab3" className="mt-4 p-4 border rounded">
        <h4 className="font-medium mb-2">General Settings</h4>
        <p className="text-sm text-muted-foreground">
          Configure your preferences and options.
        </p>
      </TabsContent>
    </Tabs>
  )
}`,
  },
};

