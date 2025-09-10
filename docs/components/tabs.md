---
component: Tabs
description: "A tabbed interface component for organizing content into multiple panels with accessible keyboard navigation."
llm_usage: "When creating tabbed interfaces, use `<Tabs defaultValue='tab1'>` with `<TabsList>`, `<TabsTrigger>`, and `<TabsContent>` components for proper accessibility and functionality."
---

# Tabs

A set of layered sections of content—known as tab panels—that are displayed one at a time. Built with Radix UI for full accessibility support.

## Import

```tsx
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
```

## Usage

### Basic Tabs

```tsx
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export function TabsDemo() {
  return (
    <Tabs defaultValue="account" className="w-96">
      <TabsList>
        <TabsTrigger value="account">Account</TabsTrigger>
        <TabsTrigger value="password">Password</TabsTrigger>
      </TabsList>
      <TabsContent value="account">
        <p>Make changes to your account here.</p>
      </TabsContent>
      <TabsContent value="password">
        <p>Change your password here.</p>
      </TabsContent>
    </Tabs>
  )
}
```

### Tabs with Cards

```tsx
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export function TabsWithCards() {
  return (
    <Tabs defaultValue="account" className="w-96">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="account">Account</TabsTrigger>
        <TabsTrigger value="password">Password</TabsTrigger>
      </TabsList>
      
      <TabsContent value="account">
        <Card>
          <CardHeader>
            <CardTitle>Account</CardTitle>
            <CardDescription>
              Make changes to your account here. Click save when you&apos;re done.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="space-y-1">
              <Label htmlFor="name">Name</Label>
              <Input id="name" defaultValue="Pedro Duarte" />
            </div>
            <div className="space-y-1">
              <Label htmlFor="username">Username</Label>
              <Input id="username" defaultValue="@peduarte" />
            </div>
            <Button>Save changes</Button>
          </CardContent>
        </Card>
      </TabsContent>
      
      <TabsContent value="password">
        <Card>
          <CardHeader>
            <CardTitle>Password</CardTitle>
            <CardDescription>
              Change your password here. After saving, you&apos;ll be logged out.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="space-y-1">
              <Label htmlFor="current">Current password</Label>
              <Input id="current" type="password" />
            </div>
            <div className="space-y-1">
              <Label htmlFor="new">New password</Label>
              <Input id="new" type="password" />
            </div>
            <Button>Save password</Button>
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  )
}
```

### Vertical Tabs

```tsx
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export function VerticalTabs() {
  return (
    <Tabs defaultValue="general" orientation="vertical" className="flex w-96 h-96">
      <TabsList className="flex flex-col h-full w-48">
        <TabsTrigger value="general" className="w-full justify-start">
          General
        </TabsTrigger>
        <TabsTrigger value="security" className="w-full justify-start">
          Security
        </TabsTrigger>
        <TabsTrigger value="integrations" className="w-full justify-start">
          Integrations
        </TabsTrigger>
        <TabsTrigger value="support" className="w-full justify-start">
          Support
        </TabsTrigger>
      </TabsList>
      
      <div className="flex-1 ml-4">
        <TabsContent value="general" className="mt-0">
          <h3 className="text-lg font-medium">General settings</h3>
          <p className="text-muted-foreground">
            Configure your general application settings here.
          </p>
        </TabsContent>
        
        <TabsContent value="security" className="mt-0">
          <h3 className="text-lg font-medium">Security settings</h3>
          <p className="text-muted-foreground">
            Manage your security preferences and authentication methods.
          </p>
        </TabsContent>
        
        <TabsContent value="integrations" className="mt-0">
          <h3 className="text-lg font-medium">Integrations</h3>
          <p className="text-muted-foreground">
            Connect with third-party services and applications.
          </p>
        </TabsContent>
        
        <TabsContent value="support" className="mt-0">
          <h3 className="text-lg font-medium">Support</h3>
          <p className="text-muted-foreground">
            Get help and contact our support team.
          </p>
        </TabsContent>
      </div>
    </Tabs>
  )
}
```

### Controlled Tabs

```tsx
import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"

export function ControlledTabs() {
  const [activeTab, setActiveTab] = useState("tab1")

  return (
    <div className="w-96 space-y-4">
      <div className="flex gap-2">
        <Button
          variant={activeTab === "tab1" ? "default" : "outline"}
          onClick={() => setActiveTab("tab1")}
          size="sm"
        >
          Go to Tab 1
        </Button>
        <Button
          variant={activeTab === "tab2" ? "default" : "outline"}
          onClick={() => setActiveTab("tab2")}
          size="sm"
        >
          Go to Tab 2
        </Button>
      </div>
      
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="tab1">Tab 1</TabsTrigger>
          <TabsTrigger value="tab2">Tab 2</TabsTrigger>
          <TabsTrigger value="tab3">Tab 3</TabsTrigger>
        </TabsList>
        
        <TabsContent value="tab1">
          <p>Content for tab 1. Current tab: {activeTab}</p>
        </TabsContent>
        <TabsContent value="tab2">
          <p>Content for tab 2. Current tab: {activeTab}</p>
        </TabsContent>
        <TabsContent value="tab3">
          <p>Content for tab 3. Current tab: {activeTab}</p>
        </TabsContent>
      </Tabs>
    </div>
  )
}
```

## API Reference

### Tabs

The root container for the tabs component.

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `defaultValue` | `string` | - | The default active tab |
| `value` | `string` | - | The controlled active tab |
| `onValueChange` | `(value: string) => void` | - | Callback when tab changes |
| `orientation` | `"horizontal" \| "vertical"` | `"horizontal"` | Tab orientation |
| `className` | `string` | - | Additional CSS classes |

### TabsList

Container for the tab triggers.

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `className` | `string` | - | Additional CSS classes |

### TabsTrigger

Individual tab button.

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `value` | `string` | - | The value that activates this tab |
| `disabled` | `boolean` | `false` | Whether the tab is disabled |
| `className` | `string` | - | Additional CSS classes |

### TabsContent

Content panel for each tab.

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `value` | `string` | - | The value that shows this content |
| `className` | `string` | - | Additional CSS classes |

## Accessibility

- Full keyboard navigation support
- Screen reader compatible
- ARIA attributes included
- Focus management
- Supports both horizontal and vertical orientation
- Automatic activation or manual activation modes
