import { Badge } from "@/components/ui/aura/badge";
import { Button } from "@/components/ui/aura/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/aura/card";
import { Input } from "@/components/ui/aura/input";
import { Label } from "@/components/ui/aura/label";
import { IconAlertTriangle, IconPlayerPlay } from "@tabler/icons-react";
import React from "react";

interface PresetComponentRendererProps {
  code: string;
  className?: string;
}

// Preset components that work reliably
const presetComponents = {
  // Basic Card
  BasicCard: () => (
    <Card className="w-full max-w-md">
      <CardContent className="p-6">
        <p>Hello World</p>
      </CardContent>
    </Card>
  ),

  // Card with Header
  CardWithHeader: () => (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle>Hello World</CardTitle>
      </CardHeader>
      <CardContent>
        <p>Content goes here</p>
      </CardContent>
    </Card>
  ),

  // Pricing Card
  PricingCard: () => (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          Pro Plan
          <Badge variant="secondary">Popular</Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <div className="text-3xl font-bold">$29</div>
          <p className="text-muted-foreground">per month</p>
        </div>
        <ul className="space-y-2 text-sm">
          <li>✓ Unlimited projects</li>
          <li>✓ Priority support</li>
          <li>✓ Advanced analytics</li>
        </ul>
        <Button className="w-full">Get Started</Button>
      </CardContent>
    </Card>
  ),

  // User Profile Card
  UserProfile: () => (
    <Card className="w-full max-w-md">
      <CardHeader>
        <div className="flex items-center space-x-4">
          <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
            <span className="text-lg font-semibold text-primary">JD</span>
          </div>
          <div>
            <CardTitle>John Doe</CardTitle>
            <p className="text-sm text-muted-foreground">Software Engineer</p>
          </div>
        </div>
        <Badge variant="secondary" className="w-fit">
          Active
        </Badge>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-sm text-muted-foreground">
          Passionate about building great user experiences with modern web technologies.
        </p>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            Message
          </Button>
          <Button size="sm">Follow</Button>
        </div>
      </CardContent>
    </Card>
  ),

  // Stats Widget
  StatsWidget: () => (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
          <Badge variant="secondary">+20.1%</Badge>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">$45,231.89</div>
          <p className="text-xs text-muted-foreground">+20.1% from last month</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Active Users</CardTitle>
          <Badge variant="secondary">+5.2%</Badge>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">2,543</div>
          <p className="text-xs text-muted-foreground">+5.2% from last month</p>
        </CardContent>
      </Card>
    </div>
  ),

  // Contact Form
  ContactForm: () => (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle>Contact Form</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <Label htmlFor="name">Name</Label>
          <Input id="name" placeholder="Enter your name" />
        </div>
        <div>
          <Label htmlFor="email">Email</Label>
          <Input id="email" type="email" placeholder="Enter your email" />
        </div>
        <Button className="w-full">Submit</Button>
      </CardContent>
    </Card>
  ),
};

// Pattern matching to determine which component to render
function detectComponentPattern(code: string): keyof typeof presetComponents | null {
  const lowerCode = code.toLowerCase();

  // Check for pricing-related patterns
  if (lowerCode.includes("pricing") || lowerCode.includes("price") || lowerCode.includes("plan")) {
    return "PricingCard";
  }

  // Check for profile-related patterns
  if (lowerCode.includes("profile") || lowerCode.includes("user") || lowerCode.includes("avatar")) {
    return "UserProfile";
  }

  // Check for dashboard/stats patterns
  if (
    lowerCode.includes("dashboard") ||
    lowerCode.includes("stats") ||
    lowerCode.includes("metric") ||
    lowerCode.includes("revenue")
  ) {
    return "StatsWidget";
  }

  // Check for form patterns
  if (lowerCode.includes("form") || (lowerCode.includes("input") && lowerCode.includes("label"))) {
    return "ContactForm";
  }

  // Check for card with header
  if (lowerCode.includes("cardheader") || lowerCode.includes("cardtitle")) {
    return "CardWithHeader";
  }

  // Check for basic card
  if (lowerCode.includes("card") && lowerCode.includes("cardcontent")) {
    return "BasicCard";
  }

  return null;
}

export function PresetComponentRenderer({ code, className }: PresetComponentRendererProps) {
  if (!code.trim()) {
    return (
      <div
        className={`flex items-center justify-center p-8 border-2 border-dashed border-muted-foreground/20 rounded-lg ${className}`}
      >
        <div className="text-center space-y-2">
          <IconPlayerPlay className="h-8 w-8 mx-auto text-muted-foreground" />
          <p className="text-sm text-muted-foreground">Enter component code to see live preview</p>
        </div>
      </div>
    );
  }

  const detectedPattern = detectComponentPattern(code);

  if (detectedPattern) {
    const PresetComponent = presetComponents[detectedPattern];

    return (
      <div className={`relative ${className}`}>
        <div className="w-full">
          <PresetComponent />
        </div>
        <div className="mt-4 p-2 bg-muted/30 rounded text-xs text-muted-foreground text-center">
          Rendering: {detectedPattern} (preset component)
        </div>
      </div>
    );
  }

  // Fallback for unrecognized patterns
  return (
    <div className={`p-6 border border-muted rounded-lg bg-muted/10 ${className}`}>
      <div className="flex items-center gap-2 text-muted-foreground mb-3">
        <IconAlertTriangle className="h-4 w-4" />
        <span className="font-medium">Preview Not Available</span>
      </div>
      <p className="text-sm text-muted-foreground mb-4">
        This component pattern isn&apos;t supported yet. Try one of these:
      </p>
      <div className="grid grid-cols-2 gap-2 text-xs">
        <div>
          <p className="font-medium text-muted-foreground">Available patterns:</p>
          <ul className="space-y-1 mt-1">
            <li>• Pricing cards</li>
            <li>• User profiles</li>
            <li>• Dashboard widgets</li>
          </ul>
        </div>
        <div>
          <p className="font-medium text-muted-foreground">Coming soon:</p>
          <ul className="space-y-1 mt-1">
            <li>• Custom forms</li>
            <li>• Navigation menus</li>
            <li>• Data tables</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
