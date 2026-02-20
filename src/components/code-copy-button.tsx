import { IconCheck, IconCopy } from '@tabler/icons-react';
import { useState } from 'react';

import { Button } from '@/components/ui/aura/button';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/aura/tooltip';

interface CodeCopyButtonProps {
  code: string;
}

export function CodeCopyButton({ code }: CodeCopyButtonProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger
          render={
            <Button
              variant="ghost"
              size="icon"
              className="absolute top-2 right-2 h-8 w-8"
              onClick={handleCopy}
            >
              {copied ? <IconCheck className="h-4 w-4" /> : <IconCopy className="h-4 w-4" />}
            </Button>
          }
        />
        <TooltipContent>
          <p>{copied ? 'Copied to clipboard' : 'Click to copy'}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
