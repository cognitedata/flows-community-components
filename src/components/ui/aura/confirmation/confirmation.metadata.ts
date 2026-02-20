import type { ComponentMeta } from "../../../../lib/types";

export const ConfirmationMetadata: ComponentMeta = {
  name: "Confirmation",
  status: "in-progress-code-review",
  description:
    "A confirmation dialog component for AI approval workflows, with support for request, accepted, and rejected states.",
  llmUsage:
    "Use `<Confirmation>` with `<ConfirmationRequest>`, `<ConfirmationAccepted>`, `<ConfirmationRejected>`, and `<ConfirmationActions>` for AI approval flows.",
};
