"use client";

import { Badge } from "@/components/ui/aura/badge/badge";
import { AIChatDemo } from "@/lib/ai-examples/ai-chat-demo";
import { IconMessageCircle as MessageSquare } from "@tabler/icons-react";

export default function AgentChatPage() {
  return (
    <div className="max-w-5xl mx-auto py-10">
      <div className="space-y-8">
        {/* Page Header */}
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
              <MessageSquare className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h1 className="text-3xl font-bold tracking-tight">Agent chat</h1>
              <p className="text-lg text-muted-foreground">
                A complete AI conversation demonstrating all components working together
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 flex-wrap">
            <Badge variant="secondary">Conversation</Badge>
            <Badge variant="secondary">Message</Badge>
            <Badge variant="secondary">PromptInput</Badge>
            <Badge variant="secondary">Shimmer</Badge>
            <Badge variant="secondary">Tool</Badge>
            <Badge variant="secondary">Reasoning</Badge>
            <Badge variant="secondary">InlineCitation</Badge>
            <Badge variant="secondary">Sources</Badge>
            <Badge variant="secondary">Suggestion</Badge>
          </div>

          <div className="bg-muted/50 border rounded-lg p-4">
            <p className="text-sm text-muted-foreground">
              This pattern showcases the full AI response flow: empty state with suggestions, user
              messages with inline citations, thinking state with shimmer, streaming responses,
              sources, expandable tool calls with reasoning, and message actions. Watch the
              automatic demo play out or click &quot;Replay demo&quot; to restart.
            </p>
          </div>
        </div>

        {/* Demo */}
        <div>
          <AIChatDemo />
        </div>
      </div>
    </div>
  );
}
