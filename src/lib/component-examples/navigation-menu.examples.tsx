import type { ComponentExamples } from "./types";

function BasicDemo() {
  return (
    <div className="border rounded bg-background p-2 max-w-md">
      <div className="flex space-x-1">
        <div className="px-3 py-2 rounded hover:bg-muted text-sm cursor-pointer">
          Home
        </div>
        <div className="px-3 py-2 rounded hover:bg-muted text-sm cursor-pointer">
          Products
        </div>
        <div className="px-3 py-2 rounded hover:bg-muted text-sm cursor-pointer">
          About
        </div>
        <div className="px-3 py-2 rounded hover:bg-muted text-sm cursor-pointer">
          Contact
        </div>
      </div>
    </div>
  );
}

export const navigationMenuExamples: ComponentExamples = {
  basic: {
    title: "Navigation Menu Demo",
    description:
      "Horizontal navigation menu (requires interactive implementation)",
    component: BasicDemo,
    difficulty: "intermediate",
    code: `import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/cognite/navigation-menu"

export function BasicDemo() {
  return (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuLink href="/">Home</NavigationMenuLink>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuLink href="/products">Products</NavigationMenuLink>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuLink href="/about">About</NavigationMenuLink>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuLink href="/contact">Contact</NavigationMenuLink>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  )
}`,
  },
};

