import {
  ChainOfThought,
  ChainOfThoughtHeader,
  ChainOfThoughtStep,
  ChainOfThoughtContent,
  ChainOfThoughtSearchResults,
  ChainOfThoughtSearchResult,
} from "@/components/ai-elements/cognite/chain-of-thought";
import type { ComponentExamples } from "@/lib/component-examples/types";

function BasicChainOfThoughtDemo() {
  return (
    <ChainOfThought>
      <ChainOfThoughtHeader>Analysis Process</ChainOfThoughtHeader>
      <ChainOfThoughtContent>
        <ChainOfThoughtStep label="Identify the problem" status="complete">
          Understanding user requirements
        </ChainOfThoughtStep>
        <ChainOfThoughtStep label="Gather information" status="complete">
          Collecting relevant data
        </ChainOfThoughtStep>
        <ChainOfThoughtStep label="Analyze solution" status="active">
          Processing options
        </ChainOfThoughtStep>
        <ChainOfThoughtStep label="Provide answer" status="pending" />
      </ChainOfThoughtContent>
    </ChainOfThought>
  );
}

function WithSearchResultsDemo() {
  return (
    <ChainOfThought>
      <ChainOfThoughtHeader>Research Process</ChainOfThoughtHeader>
      <ChainOfThoughtContent>
        <ChainOfThoughtStep label="Search for information" status="complete">
          <ChainOfThoughtSearchResults>
            <ChainOfThoughtSearchResult>Document 1</ChainOfThoughtSearchResult>
            <ChainOfThoughtSearchResult>Document 2</ChainOfThoughtSearchResult>
          </ChainOfThoughtSearchResults>
        </ChainOfThoughtStep>
        <ChainOfThoughtStep label="Extract key points" status="active" />
        <ChainOfThoughtStep label="Synthesise answer" status="pending" />
      </ChainOfThoughtContent>
    </ChainOfThought>
  );
}

export const chainOfThoughtExamples: ComponentExamples = {
  basic: {
    title: "Basic Chain of Thought",
    description: "Step-by-step reasoning process with collapsible steps",
    component: BasicChainOfThoughtDemo,
    difficulty: "beginner",
    code: `import {
  ChainOfThought,
  ChainOfThoughtHeader,
  ChainOfThoughtStep,
  ChainOfThoughtContent,
} from "@/components/ai-elements/cognite/chain-of-thought"

export function BasicChainOfThoughtDemo() {
  return (
    <ChainOfThought>
      <ChainOfThoughtHeader>Analysis Process</ChainOfThoughtHeader>
      <ChainOfThoughtContent>
        <ChainOfThoughtStep label="Step 1" status="complete" />
        <ChainOfThoughtStep label="Step 2" status="active" />
        <ChainOfThoughtStep label="Step 3" status="pending" />
      </ChainOfThoughtContent>
    </ChainOfThought>
  )
}`,
  },

  withSearchResults: {
    title: "With Search Results",
    description: "Chain of thought with embedded search results",
    component: WithSearchResultsDemo,
    difficulty: "intermediate",
    code: `import {
  ChainOfThought,
  ChainOfThoughtHeader,
  ChainOfThoughtStep,
  ChainOfThoughtContent,
  ChainOfThoughtSearchResults,
  ChainOfThoughtSearchResult,
} from "@/components/ai-elements/cognite/chain-of-thought"

export function ChainOfThoughtWithResultsDemo() {
  return (
    <ChainOfThought>
      <ChainOfThoughtHeader>Research</ChainOfThoughtHeader>
      <ChainOfThoughtContent>
        <ChainOfThoughtStep label="Search" status="complete">
          <ChainOfThoughtSearchResults>
            <ChainOfThoughtSearchResult>Result 1</ChainOfThoughtSearchResult>
          </ChainOfThoughtSearchResults>
        </ChainOfThoughtStep>
      </ChainOfThoughtContent>
    </ChainOfThought>
  )
}`,
  },
};

