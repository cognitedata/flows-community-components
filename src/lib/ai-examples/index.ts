// Main registry export for AI element examples

import { messageExamples } from './message.examples';
import { conversationExamples } from './conversation.examples';
import { artifactExamples } from './artifact.examples';
import { actionsExamples } from './actions.examples';
import { loaderExamples } from './loader.examples';
import { suggestionExamples } from './suggestion.examples';
import { sourcesExamples } from './sources.examples';
import { responseExamples } from './response.examples';
import { panelExamples } from './panel.examples';
import { shimmerExamples } from './shimmer.examples';
import { inlineCitationExamples } from './inline-citation.examples';
import { imageExamples } from './image.examples';
import { branchExamples } from './branch.examples';
import { canvasExamples } from './canvas.examples';
import { chainOfThoughtExamples } from './chain-of-thought.examples';
import { codeBlockExamples } from './code-block.examples';
import { confirmationExamples } from './confirmation.examples';
import { connectionExamples } from './connection.examples';
import { contextExamples } from './context.examples';
import { controlsExamples } from './controls.examples';
import { edgeExamples } from './edge.examples';
import { nodeExamples } from './node.examples';
import { openInChatExamples } from './open-in-chat.examples';
import { planExamples } from './plan.examples';
import { promptInputExamples } from './prompt-input.examples';
import { queueExamples } from './queue.examples';
import { reasoningExamples } from './reasoning.examples';
import { taskExamples } from './task.examples';
import { toolExamples } from './tool.examples';
import { toolbarExamples } from './toolbar.examples';
import { webPreviewExamples } from './web-preview.examples';
import type { ComponentExamples } from '@/lib/component-examples/types';

export const aiExamples = {
  message: messageExamples,
  conversation: conversationExamples,
  artifact: artifactExamples,
  actions: actionsExamples,
  loader: loaderExamples,
  suggestion: suggestionExamples,
  sources: sourcesExamples,
  response: responseExamples,
  panel: panelExamples,
  shimmer: shimmerExamples,
  'inline-citation': inlineCitationExamples,
  image: imageExamples,
  branch: branchExamples,
  canvas: canvasExamples,
  'chain-of-thought': chainOfThoughtExamples,
  'code-block': codeBlockExamples,
  confirmation: confirmationExamples,
  connection: connectionExamples,
  context: contextExamples,
  controls: controlsExamples,
  edge: edgeExamples,
  node: nodeExamples,
  'open-in-chat': openInChatExamples,
  plan: planExamples,
  'prompt-input': promptInputExamples,
  queue: queueExamples,
  reasoning: reasoningExamples,
  task: taskExamples,
  tool: toolExamples,
  toolbar: toolbarExamples,
  'web-preview': webPreviewExamples,
} as const;

export type AIComponentSlug = keyof typeof aiExamples;

// Type-safe helper to get examples for an AI component
export function getAIComponentExamples(slug: string): ComponentExamples | null {
  if (slug in aiExamples) {
    return aiExamples[slug as AIComponentSlug];
  }
  return null;
}

// Export types
export type {
  ComponentExample,
  ComponentExamples,
} from '@/lib/component-examples/types';
