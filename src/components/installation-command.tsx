"use client";

import { Copy } from "lucide-react";
import { Button } from "@/components/ui/cognite/button";
import { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark, oneLight } from "react-syntax-highlighter/dist/esm/styles/prism";

interface InstallationCommandProps {
  component: string;
  dependencies?: string[];
  componentCode?: string;
}

type TabType = "cli" | "manual";
type PackageManager = "pnpm" | "npm" | "yarn" | "bun";

export function InstallationCommand({ component, dependencies = [], componentCode }: InstallationCommandProps) {
  const [copied, setCopied] = useState(false);
  const [activeTab, setActiveTab] = useState<TabType>("cli");
  const [packageManager, setPackageManager] = useState<PackageManager>("pnpm");
  const [copyingCode, setCopyingCode] = useState(false);
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Prevent hydration mismatch
  useEffect(() => {
     
    setMounted(true);
  }, []);

  const cliCommands: Record<PackageManager, string> = {
    pnpm: `pnpm dlx shadcn@latest add ${component}`,
    npm: `npx shadcn@latest add ${component}`,
    yarn: `yarn dlx shadcn@latest add ${component}`,
    bun: `bunx shadcn@latest add ${component}`,
  };

  // Build manual installation commands based on actual dependencies
  const dependenciesString = dependencies.join(" ");
  const manualCommands: Record<PackageManager, string> = {
    pnpm: dependencies.length ? `pnpm add ${dependenciesString}` : "No dependencies required",
    npm: dependencies.length ? `npm install ${dependenciesString}` : "No dependencies required",
    yarn: dependencies.length ? `yarn add ${dependenciesString}` : "No dependencies required",
    bun: dependencies.length ? `bun add ${dependenciesString}` : "No dependencies required",
  };

  const currentCommand = activeTab === "cli" 
    ? cliCommands[packageManager] 
    : manualCommands[packageManager];

  const handleCopy = async () => {
    await navigator.clipboard.writeText(currentCommand);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleCopyCode = async () => {
    if (componentCode) {
      await navigator.clipboard.writeText(componentCode);
      setCopyingCode(true);
      setTimeout(() => setCopyingCode(false), 2000);
    }
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
          <div className="space-y-4">
            {dependencies.length > 0 && (
              <div className="space-y-3">
                <p className="text-sm font-medium">
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
                <code className="block text-sm font-mono bg-background/50 p-3 rounded border">
                  {currentCommand}
                </code>
              </div>
            )}
            
            {componentCode && (
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium">
                    Copy and paste the following code into your project.
                  </p>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-8"
                    onClick={handleCopyCode}
                  >
                    {copyingCode ? (
                      <span className="text-xs">✓ Copied</span>
                    ) : (
                      <>
                        <Copy className="h-4 w-4 mr-2" />
                        Copy
                      </>
                    )}
                  </Button>
                </div>
                <div className="relative rounded-lg border overflow-hidden">
                  <div className="absolute top-3 left-3 z-10 flex items-center gap-2 text-xs">
                    <span className="bg-muted px-2 py-0.5 rounded font-mono text-muted-foreground">TS</span>
                    <span className="font-mono text-muted-foreground">components/ui/{component}.tsx</span>
                  </div>
                  <div className="pt-10">
                    {mounted && (
                      <SyntaxHighlighter
                        language="typescript"
                        style={resolvedTheme === "dark" ? oneDark : oneLight}
                        customStyle={{
                          margin: 0,
                          borderRadius: 0,
                          fontSize: "0.875rem",
                          background: "transparent",
                        }}
                        showLineNumbers={true}
                      >
                        {componentCode}
                      </SyntaxHighlighter>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

