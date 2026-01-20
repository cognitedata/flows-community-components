import { useState } from "react";
import { Button } from "@/components/ui/aura/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/aura/tooltip";
import { IconCheck, IconCopy } from "@tabler/icons-react";

interface MarkdownCopyBlockProps {
  content: string;
}

export function MarkdownCopyBlock({ content }: MarkdownCopyBlockProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(content);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy text: ", err);
    }
  };

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <p className="text-muted-foreground">
          Share the markdown with AI assistants to explain Aura UI concepts and APIs.
        </p>
        <div className="relative bg-muted/50 rounded-lg p-4">
          {/* Copy Button with Tooltip */}
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute top-2 right-2 h-8 w-8"
                  onClick={handleCopy}
                >
                  {copied ? <IconCheck className="h-4 w-4" /> : <IconCopy className="h-4 w-4" />}
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>{copied ? "Copied to clipboard" : "Click to copy"}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>

          {/* Markdown Content */}
          <pre className="text-sm overflow-x-auto whitespace-pre-wrap pr-12">
            <code>{content}</code>
          </pre>
        </div>
      </div>
    </div>
  );
}
