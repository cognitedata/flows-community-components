"use client";

import { Button } from "@/components/ui/cognite/button";
import { toast } from "@/components/ui/cognite/sonner";
import type { ComponentExamples } from "./types";

function BasicDemo() {
  const handleSuccess = () => {
    toast.success("Success!", {
      description: "Your action was completed successfully.",
    });
  };

  const handleError = () => {
    toast.error("Error!", {
      description: "Something went wrong. Please try again.",
    });
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-2">
        <Button onClick={handleSuccess}>
          Show Success Toast
        </Button>
        <Button variant="destructive" onClick={handleError}>
          Show Error Toast
        </Button>
        <Button
          variant="outline"
          onClick={() => toast.info("Information", {
            description: "Here's some helpful information for you.",
          })}
        >
          Show Info Toast
        </Button>
        <Button
          variant="outline"
          onClick={() => toast.warning("Warning", {
            description: "Please be careful with this action.",
          })}
        >
          Show Warning Toast
        </Button>
      </div>
      
      <p className="text-sm text-muted-foreground">
        Click buttons to trigger interactive toast notifications that appear in the corner.
      </p>
    </div>
  );
}

export const sonnerExamples: ComponentExamples = {
  basic: {
    title: "Toast/Sonner Demo",
    description: "Interactive toast notifications with different types and descriptions",
    component: BasicDemo,
    difficulty: "intermediate",
    code: `"use client"

import { Button } from "@/components/ui/cognite/button"
import { toast } from "@/components/ui/cognite/sonner"

export function BasicDemo() {
  const handleSuccess = () => {
    toast.success("Success!", {
      description: "Your action was completed successfully.",
    });
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-2">
        <Button onClick={handleSuccess}>
          Show Success Toast
        </Button>
        <Button 
          variant="destructive" 
          onClick={() => toast.error("Error!", {
            description: "Something went wrong. Please try again.",
          })}
        >
          Show Error Toast
        </Button>
      </div>
    </div>
  )
}`,
  },
};

