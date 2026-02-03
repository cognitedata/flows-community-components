import * as React from "react";

export function getRenderPropFromAsChild(children: React.ReactNode, asChild?: boolean) {
  if (!asChild) return undefined;
  if (!React.isValidElement(children)) {
    throw new Error("`asChild` expects a single valid React element child.");
  }
  return children;
}
