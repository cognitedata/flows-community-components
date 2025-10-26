"use client";

import { Copy } from "lucide-react";
import { Button } from "@/components/ui/cognite/button";
import { useState } from "react";

interface InstallationCommandProps {
  component: string;
}

type TabType = "cli" | "manual";
type PackageManager = "pnpm" | "npm" | "yarn" | "bun";

export function InstallationCommand({ component }: InstallationCommandProps) {
  const [copied, setCopied] = useState(false);
  const [activeTab, setActiveTab] = useState<TabType>("cli");
  const [packageManager, setPackageManager] = useState<PackageManager>("pnpm");

  const cliCommands: Record<PackageManager, string> = {
    pnpm: `pnpm dlx shadcn@latest add ${component}`,
    npm: `npx shadcn@latest add ${component}`,
    yarn: `npx shadcn@latest add ${component}`,
    bun: `bunx shadcn@latest add ${component}`,
  };

  const manualCommands: Record<PackageManager, string> = {
    pnpm: `pnpm add @radix-ui/react-slot`,
    npm: `npm install @radix-ui/react-slot`,
    yarn: `yarn add @radix-ui/react-slot`,
    bun: `bun add @radix-ui/react-slot`,
  };

  const currentCommand = activeTab === "cli" 
    ? cliCommands[packageManager] 
    : manualCommands[packageManager];

  const handleCopy = async () => {
    await navigator.clipboard.writeText(currentCommand);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-3">
      <h3 className="text-sm font-semibold">Installation</h3>
      <div className="rounded-lg border bg-muted/50 p-4">
        <div className="flex items-center justify-between gap-2 mb-3">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setActiveTab("cli")}
              className={`text-xs font-medium px-3 py-1.5 rounded-md transition-colors ${
                activeTab === "cli"
                  ? "bg-background text-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              CLI
            </button>
            <button
              onClick={() => setActiveTab("manual")}
              className={`text-xs font-medium px-3 py-1.5 rounded-md transition-colors ${
                activeTab === "manual"
                  ? "bg-background text-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              Manual
            </button>
          </div>
          <Button
            variant="ghost"
            size="sm"
            className="h-8 w-8 p-0"
            onClick={handleCopy}
          >
            {copied ? (
              <span className="text-xs">✓</span>
            ) : (
              <Copy className="h-4 w-4" />
            )}
          </Button>
        </div>

        {activeTab === "cli" && (
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              {(["pnpm", "npm", "yarn", "bun"] as PackageManager[]).map((pm) => (
                <button
                  key={pm}
                  onClick={() => setPackageManager(pm)}
                  className={`text-xs font-mono px-2 py-1 rounded border transition-colors ${
                    packageManager === pm
                      ? "bg-background border-foreground/20"
                      : "bg-background/50 border-border text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {pm}
                </button>
              ))}
            </div>
            <code className="block text-sm font-mono">{currentCommand}</code>
          </div>
        )}

        {activeTab === "manual" && (
          <div className="space-y-3">
            <p className="text-sm text-muted-foreground">
              Install the following dependencies:
            </p>
            <div className="flex items-center gap-2">
              {(["pnpm", "npm", "yarn", "bun"] as PackageManager[]).map((pm) => (
                <button
                  key={pm}
                  onClick={() => setPackageManager(pm)}
                  className={`text-xs font-mono px-2 py-1 rounded border transition-colors ${
                    packageManager === pm
                      ? "bg-background border-foreground/20"
                      : "bg-background/50 border-border text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {pm}
                </button>
              ))}
            </div>
            <code className="block text-sm font-mono">{currentCommand}</code>
          </div>
        )}
      </div>
    </div>
  );
}

