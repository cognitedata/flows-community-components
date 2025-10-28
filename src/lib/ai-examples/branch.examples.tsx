import {
  Branch,
  BranchMessages,
  BranchSelector,
  BranchPrevious,
  BranchNext,
  BranchPage,
} from "@/components/ai-elements/cognite/branch";
import { Message } from "@/components/ai-elements/cognite/message";
import type { ComponentExamples } from "@/lib/component-examples/types";

function BasicBranchDemo() {
  return (
    <Branch>
      <BranchMessages>
        <Message from="user">First message</Message>
      </BranchMessages>
      <BranchMessages>
        <Message from="user">Alternative first message</Message>
      </BranchMessages>
      <BranchSelector from="user">
        <BranchPrevious />
        <BranchPage />
        <BranchNext />
      </BranchSelector>
    </Branch>
  );
}

function WithMultipleBranchesDemo() {
  return (
    <Branch defaultBranch={2}>
      <BranchMessages>
        <Message from="assistant">Response option 1</Message>
      </BranchMessages>
      <BranchMessages>
        <Message from="assistant">Response option 2</Message>
      </BranchMessages>
      <BranchMessages>
        <Message from="assistant">Response option 3</Message>
      </BranchMessages>
      <BranchSelector from="assistant">
        <BranchPrevious />
        <BranchPage />
        <BranchNext />
      </BranchSelector>
    </Branch>
  );
}

export const branchExamples: ComponentExamples = {
  basic: {
    title: "Basic Branch",
    description: "Multiple conversation branches with navigation controls",
    component: BasicBranchDemo,
    difficulty: "beginner",
    code: `import {
  Branch,
  BranchMessages,
  BranchSelector,
  BranchPrevious,
  BranchNext,
  BranchPage,
} from "@/components/ai-elements/cognite/branch"
import { Message } from "@/components/ai-elements/cognite/message"

export function BasicBranchDemo() {
  return (
    <Branch>
      <BranchMessages>
        <Message from="user">First message</Message>
      </BranchMessages>
      <BranchMessages>
        <Message from="user">Alternative message</Message>
      </BranchMessages>
      <BranchSelector from="user">
        <BranchPrevious />
        <BranchPage />
        <BranchNext />
      </BranchSelector>
    </Branch>
  )
}`,
  },

  multipleBranches: {
    title: "Multiple Branches",
    description: "Branching with three or more alternative responses",
    component: WithMultipleBranchesDemo,
    difficulty: "intermediate",
    code: `import {
  Branch,
  BranchMessages,
  BranchSelector,
  BranchPrevious,
  BranchNext,
  BranchPage,
} from "@/components/ai-elements/cognite/branch"
import { Message } from "@/components/ai-elements/cognite/message"

export function MultipleBranchesDemo() {
  return (
    <Branch defaultBranch={2}>
      <BranchMessages>
        <Message from="assistant">Response option 1</Message>
      </BranchMessages>
      <BranchMessages>
        <Message from="assistant">Response option 2</Message>
      </BranchMessages>
      <BranchMessages>
        <Message from="assistant">Response option 3</Message>
      </BranchMessages>
      <BranchSelector from="assistant">
        <BranchPrevious />
        <BranchPage />
        <BranchNext />
      </BranchSelector>
    </Branch>
  )
}`,
  },
};

